// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";

import { batchFunction } from "../api/function";
import { triggerSoftRefresh } from "../contexts/RefreshContext";
import singletonize, {
  isIdentified,
  serialize,
  transformPropertyNames,
} from "./singletonize";

const remoteFunctionsLoader = new DataLoader(batchFunction);

// Map from JSON.stringify(args) to return value.
const cachedValues = new Map<string, unknown>();
const dirtyCachedValues = new Set<string>();
// Map from cached value to value with overrides.
const overriddenCachedValues = new Map<unknown, unknown>();

let clearCount = 0;

export function markRemoteCallCacheDirty(): void {
  for (const key of Array.from(cachedValues.keys())) {
    dirtyCachedValues.add(key);
  }
  clearCount++;
}

function processOverrides<T>(value: T): { overrideApplied: boolean; value: T } {
  if (
    isIdentified(value) &&
    value.objectType === "Location" &&
    value.identifierString !== undefined
  ) {
    const overrideValue = localStorage.getItem(value.identifierString);
    if (overrideValue !== null) {
      return {
        overrideApplied: true,
        value: { ...value, turnsSpent: overrideValue },
      };
    }
  }

  return { overrideApplied: false, value };
}

let refreshCount = 0;
function fetchResult(name: string, args: unknown[]): void {
  const initialClearCount = clearCount;
  remoteFunctionsLoader.load({ name, args: serialize(args) }).then((value) => {
    value = transformPropertyNames(value);
    value = singletonize(value);
    const { overrideApplied, value: overriddenValue } = processOverrides(value);
    const key = JSON.stringify([name, serialize(args)]);
    cachedValues.set(key, value);
    if (overrideApplied) {
      overriddenCachedValues.set(value, overriddenValue);
    }

    if (clearCount === initialClearCount) {
      dirtyCachedValues.delete(key);
      const initialRefreshCount = refreshCount;
      setTimeout(() => {
        // If we haven't triggered a refresh yet, trigger one.
        if (refreshCount === initialRefreshCount) {
          refreshCount++;
          triggerSoftRefresh();
        }
      });
    }
  });
}

/**
 * Main interface for performing remote function calls to the mafia runtime.
 * @param name Name of function.
 * @param args Arguments.
 * @param default_ Default return value, while we wait for a response.
 * @param processOverrides If true, ignore values overridden (development mode). If this is true, may not return singletonized value.
 */
export function remoteCall(name: string, args: unknown[]): void;
export function remoteCall<T>(
  name: string,
  args: unknown[],
  default_: T,
  ignoreOverrides?: boolean,
): T;
export function remoteCall<T>(
  name: string,
  args: unknown[],
  default_?: T,
  ignoreOverrides = false,
): void | T {
  const key = JSON.stringify([name, serialize(args)]);
  const firstArg = args[0];
  if (
    !ignoreOverrides &&
    name === "getProperty" &&
    typeof args[0] === "string"
  ) {
    const override = localStorage.getItem(args[0]);
    if (override !== null) return override as unknown as T;
  } else if (
    name === "toInt" &&
    firstArg !== null &&
    typeof firstArg === "object" &&
    isIdentified(firstArg) &&
    (firstArg.identifierNumber ?? -1) >= 0
  ) {
    return firstArg.identifierNumber as T;
  } else if (
    name === "toString" &&
    firstArg !== null &&
    typeof firstArg === "object" &&
    isIdentified(firstArg)
  ) {
    return firstArg.identifierString as T;
  }

  const cached = cachedValues.get(key);
  if (cached === undefined || dirtyCachedValues.has(key)) {
    setTimeout(() => fetchResult(name, args));
  }

  // Unfortunately, if there's a development override, the result won't be singletonized.
  // So we maintain a separate cache for that purpose.
  if (cached !== undefined && !ignoreOverrides) {
    const overrideCached = overriddenCachedValues.get(cached);
    if (overrideCached !== undefined) {
      return overrideCached as T;
    }
  }

  return cached !== undefined ? (cached as T) : default_;
}
