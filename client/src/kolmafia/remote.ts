// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";

import { batchFunction } from "../api/batch";
import { queueSoftRefresh } from "../contexts/RefreshContext";
import singletonize, {
  isIdentified,
  serialize,
  transformPropertyNames,
} from "./singletonize";

const remoteFunctionsLoader = new DataLoader(batchFunction, {
  maxBatchSize: 500,
});

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
    const overrideValue = localStorage.getItem(
      `$location[${value.identifierString}].turns_spent`,
    );
    if (overrideValue !== null) {
      return {
        overrideApplied: true,
        value: { ...value, turnsSpent: overrideValue },
      };
    }
  }

  return { overrideApplied: false, value };
}

/**
 * Trigger a reload of function value from the server.
 * This will queue a soft UI refresh if the value is different.
 * @param name Name of function.
 * @param serializedArgs Arguments.
 * @param key Key for looking up function call in cache (could recompute, but no reason).
 */
function fetchResult(
  name: string,
  serializedArgs: unknown[],
  key: string,
): void {
  const initialClearCount = clearCount;

  remoteFunctionsLoader.load({ name, args: serializedArgs }).then((value) => {
    value = transformPropertyNames(value);
    value = singletonize(value);
    const { overrideApplied, value: overriddenValue } = processOverrides(value);
    cachedValues.set(key, value);
    if (overrideApplied) {
      overriddenCachedValues.set(value, overriddenValue);
    }

    if (clearCount === initialClearCount) {
      dirtyCachedValues.delete(key);
      queueSoftRefresh();
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
    typeof firstArg === "string"
  ) {
    const override = localStorage.getItem(firstArg);
    if (override !== null) return override as T;
  } else if (
    !ignoreOverrides &&
    name === "availableAmount" &&
    typeof firstArg === "object" &&
    isIdentified(firstArg)
  ) {
    const override = localStorage.getItem(
      `available_amount($item[${firstArg.identifierString}])`,
    );
    if (override !== null) return parseInt(override) as T;
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
    setTimeout(() => fetchResult(name, args, key));
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
