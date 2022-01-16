// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import * as kolmafia from "kolmafia";
import { useEffect, useState } from "react";
import { apiCall } from "../api";

function batchFunction(
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

function useFunctionInternal<T>(name: string, args: unknown[], default_: T) {
  const [returnValue, setReturnValue] = useState<T>(default_);
  useEffect(() => {
    functionsLoader.load({ name, args }).then((value) => {
      setReturnValue(value as T);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, JSON.stringify(args)]);

  return returnValue;
}

export const useFunction = new Proxy(
  {} as {
    [K in keyof typeof kolmafia]: <T>(args: unknown[], default_: T) => T;
  },
  {
    get(target, property) {
      if (typeof property === "symbol") return undefined;
      return <T>(args: unknown[], default_: T) =>
        useFunctionInternal(property, args, default_);
    },
  }
);

function makeUseFunction<T>(default_: T): {
  [K in keyof typeof kolmafia]: (...args: unknown[]) => T;
} {
  return new Proxy(
    {} as {
      [K in keyof typeof kolmafia]: (...args: unknown[]) => T;
    },
    {
      get(target, property) {
        if (typeof property === "symbol") return undefined;
        return (args: unknown[]) =>
          useFunctionInternal(property, args, default_);
      },
    }
  );
}

export const useBooleanFunction = makeUseFunction(false);
export const useNumericFunction = makeUseFunction(0);
export const useStringFunction = makeUseFunction("");
export const useObjectFunction = makeUseFunction({});
