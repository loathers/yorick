// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import { useContext, useEffect, useState } from "react";
import { batchFunction } from "../api/function";
import RefreshContext from "../contexts/RefreshContext";
import { functions } from "../util/kolmafia";

const hookFunctionsLoader = new DataLoader(batchFunction);

export function useFunctionInternal<T>(
  name: string,
  args: unknown[],
  default_: T
) {
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

type FunctionName = keyof typeof functions;

const useCall = new Proxy(
  {} as {
    [K in FunctionName]: (
      ...args: Parameters<typeof functions[K]>
    ) => ReturnType<typeof functions[K]> | undefined;
  },
  {
    get(target, property) {
      if (typeof property === "symbol") return undefined;
      return <T>(...args: unknown[]) =>
        useFunctionInternal<T | undefined>(property, args, undefined);
    },
  }
);

export default useCall;
