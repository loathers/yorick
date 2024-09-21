import { getHash } from "../util/hash";
import { apiCall } from "./base";

export function batchFunction(
  functions: readonly { name: string; args: unknown[] }[],
) {
  const allFunctions = new Map(functions.map((f) => [JSON.stringify(f), f]));
  return apiCall({
    pwd: getHash(),
    functions: Array.from(allFunctions.values()),
  }).then((returnValues) => {
    if (returnValues === undefined) {
      return functions.map(() => null);
    }
    return functions.map(({ name, args }) => {
      const value = returnValues.functions?.[JSON.stringify([name, ...args])];
      if (value === undefined) {
        console.error(
          `Unable to find return value for function ${JSON.stringify([
            name,
            ...args,
          ])}.`,
        );
      }
      return value;
    });
  });
}
