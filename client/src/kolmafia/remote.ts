// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import { batchFunction } from "../api/function";
import { triggerSoftRefresh } from "../contexts/RefreshContext";
import { Full, Placeholder, PlaceholderTypes } from "../util/makeValue";
import singletonize from "./singletonize";

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
  remoteFunctionsLoader.load({ name: name, args }).then((value) => {
    value = singletonize(value);
    const key = JSON.stringify([name, args]);
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

export function remoteCall(name: string, args: unknown[]): void;
export function remoteCall<T>(name: string, args: unknown[], default_: T): T;
export function remoteCall<T>(
  name: string,
  args: unknown[],
  default_?: T
): void | T {
  const key = JSON.stringify([name, args]);
  if (name === "getProperty" && typeof args[0] === "string") {
    const override = localStorage.getItem(args[0]);
    if (override !== null) return override as unknown as T;
  }

  const cached = cachedValues.get(key);
  if (cached === undefined || dirtyCachedValues.has(key)) {
    setTimeout(() => fetchResult(name, args));
  }
  return cached !== undefined ? (cached as T) : default_;
}

export function fillPlaceholder<T extends PlaceholderTypes>(
  arg: Placeholder<T>
): Full<T> {
  return remoteCall("identity", [arg], arg as unknown as Full<T>);
}
