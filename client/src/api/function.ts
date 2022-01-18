// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import type * as kolmafia from "kolmafia";
import { apiCall } from "./base";

export function batchFunction(
  functions: readonly { name: string; args: unknown[] }[]
) {
  const allFunctions = new Map(functions.map((f) => [JSON.stringify(f), f]));
  return apiCall({
    functions: Array.from(allFunctions.values()),
  }).then((returnValues) =>
    functions.map(({ name, args }) => {
      const value = returnValues.functions?.[JSON.stringify([name, ...args])];
      if (value === undefined) {
        throw new Error(
          `Unable to find return value for function ${JSON.stringify([
            name,
            ...args,
          ])}.`
        );
      }
      return value;
    })
  );
}

const functionsLoader = new DataLoader(batchFunction, {
  batchScheduleFn: (callback) => setTimeout(callback, 50),
});

function callFunctionInternal<T>(name: string, args: unknown[]): Promise<T> {
  return functionsLoader.load({ name, args }).then((value) => value as T);
}

export const call = new Proxy(
  {} as {
    [K in keyof typeof kolmafia]: typeof kolmafia[K];
  },
  {
    get(target, property) {
      if (typeof property === "symbol") return undefined;
      return (...args: unknown[]) => callFunctionInternal(property, args);
    },
  }
);
