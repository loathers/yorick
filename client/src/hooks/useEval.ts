import { useFunctionInternal } from "./useCall";

const useEval = <T>(code: string): T | undefined => {
  const codeGlobal = `Object.assign(globalThis, require("kolmafia")); ${code}`;
  return useFunctionInternal("eval", [codeGlobal], undefined) as T | undefined;
};

export default useEval;
