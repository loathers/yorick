// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import type * as kolmafia from "kolmafia";
import { useContext, useEffect, useState } from "react";
import { batchFunction } from "../api/function";
import RefreshContext from "../contexts/RefreshContext";

const hookFunctionsLoader = new DataLoader(batchFunction);

function useFunctionInternal<T>(name: string, args: unknown[], default_: T) {
  const refreshCount = useContext(RefreshContext);
  const [returnValue, setReturnValue] = useState<T>(default_);
  useEffect(() => {
    hookFunctionsLoader.load({ name, args }).then((value) => {
      setReturnValue(value as T);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, JSON.stringify(args), refreshCount]);

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
        return (...args: unknown[]) =>
          useFunctionInternal(property, args, default_);
      },
    }
  );
}

export const useBooleanFunction: {
  [K in keyof typeof kolmafia]: (...args: unknown[]) => boolean;
} = makeUseFunction(false);
export const useNumericFunction: {
  [K in keyof typeof kolmafia]: (...args: unknown[]) => number;
} = makeUseFunction(0);
export const useStringFunction: {
  [K in keyof typeof kolmafia]: (...args: unknown[]) => string;
} = makeUseFunction("");
export const useObjectFunction: {
  [K in keyof typeof kolmafia]: (...args: unknown[]) => {
    [index: string]: unknown;
  };
} = makeUseFunction({});
