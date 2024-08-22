// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";

import { batchFunction } from "../api/function";
import { triggerSoftRefresh } from "../contexts/RefreshContext";
import singletonize, { isIdentified, serialize } from "./singletonize";

const remoteFunctionsLoader = new DataLoader(batchFunction);

// Map from JSON.stringify(args) to return value.
const cachedValues = new Map<string, unknown>();
const dirtyCachedValues = new Set<string>();
let clearCount = 0;

export function markRemoteCallCacheDirty(): void {
  for (const key of Array.from(cachedValues.keys())) {
    dirtyCachedValues.add(key);
  }
  clearCount++;
}

let refreshCount = 0;
function fetchResult(name: string, args: unknown[]): void {
  const initialClearCount = clearCount;
  remoteFunctionsLoader.load({ name, args: serialize(args) }).then((value) => {
    value = singletonize(value);
    const key = JSON.stringify([name, serialize(args)]);
    cachedValues.set(key, value);

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
 */
export function remoteCall(name: string, args: unknown[]): void;
export function remoteCall<T>(name: string, args: unknown[], default_: T): T;
export function remoteCall<T>(
  name: string,
  args: unknown[],
  default_?: T
): void | T {
  const key = JSON.stringify([name, serialize(args)]);
  const firstArg = args[0];
  if (name === "getProperty" && typeof args[0] === "string") {
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
  }

  const cached = cachedValues.get(key);
  if (cached === undefined || dirtyCachedValues.has(key)) {
    setTimeout(() => fetchResult(name, args));
  }
  return cached !== undefined ? (cached as T) : default_;
}
