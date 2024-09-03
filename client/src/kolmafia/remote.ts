import DataLoader from "dataloader";

import { batchFunction } from "../api/batch";
import { queueSoftRefresh } from "../contexts/RefreshContext";
import { isIdentified } from "./identified";
import { isNumberPlaceholder } from "./placeholder";
import { serialize, singletonize, transformPropertyNames } from "./transform";

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
    value = singletonize(value, true);
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
    isNumberPlaceholder(firstArg) &&
    "identifierNumber" in firstArg &&
    (firstArg.identifierNumber ?? -1) >= 0
  ) {
    return firstArg.identifierNumber as T;
  } else if (
    name === "toString" &&
    firstArg !== null &&
    typeof firstArg === "object" &&
    "identifierString" in firstArg &&
    typeof firstArg.identifierString === "string" &&
    firstArg.identifierString !== ""
  ) {
    return firstArg.identifierString as T;
  }

  /**
   * Default value should be singletonized.
   * TODO: Logical inconsistency - singletonize is supposed to take server values (Identified).
   * How can it take a default value and process it using e.g. isIdentified?
   * This will cause (minor) problems if client code is looking up enumerated values via
   * numeric IDs rather than strings.
   * Solution: prefer string lookups. Maybe enforce using eslint.
   *
   * NB we need to put the default into the cache so that future calls get that default, and
   * we don't trigger many batches. fetchResult will overwrite with the actual value.
   */
  let processedDefault = default_;
  if (isIdentified(processedDefault)) {
    // Singletonize the default, but don't update the object cache.
    processedDefault = singletonize(processedDefault, false);
  }

  let cached = cachedValues.get(key);
  /**
   * Effectively, default_ only gets used for the first call of a function with given args.
   * Subsequent calls, even if the cache is dirty, use the prior cached value as the
   * default. For enumerated type values, the return value should always be singletonized.
   */
  if (cached === undefined || dirtyCachedValues.has(key)) {
    if (cached === undefined) {
      cached = processedDefault;
      const { overrideApplied, value: overriddenValue } =
        processOverrides(cached);
      cachedValues.set(key, cached);
      if (overrideApplied) {
        overriddenCachedValues.set(cached, overriddenValue);
      }
    }
    fetchResult(name, serialize(args), key);
  }

  /**
   * Unfortunately, if there's a development override, the result won't be singletonized.
   * So we maintain a separate cache for that purpose.
   */
  if (cached !== undefined && !ignoreOverrides) {
    const overrideCached = overriddenCachedValues.get(cached);
    if (overrideCached !== undefined) {
      return overrideCached as T;
    }
  }

  return cached as T;
}
