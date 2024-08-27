// Needed for DataLoader.
import "setimmediate";

import { apiCall } from "./base";

export function batchFunction(
  functions: readonly { name: string; args: unknown[] }[],
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
          ])}.`,
        );
      }
      return value;
    }),
  );
}
