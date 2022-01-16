import { useEffect, useState } from "react";
import { callFunction } from "../api";

function useFunction<T>(name: string, ...args: unknown[]) {
  const [returnValue, setReturnValue] = useState<T | undefined>();
  useEffect(() => {
    callFunction(name, ...args).then((returnValues) => {
      const value = returnValues.functions?.[name];
      if (!value) {
        throw new Error(`Unable to find return value for function ${name}.`);
      }
      setReturnValue(value as T);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, ...args]);

  return returnValue;
}

export default useFunction;
