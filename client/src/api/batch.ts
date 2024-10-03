import { getHash } from "../util/hash";
import { apiCall } from "./base";

export async function batchFunction(
  functions: readonly { name: string; args: unknown[] }[],
) {
  const returnValues = await apiCall({
    pwd: await getHash(),
    functions,
  });
  const result = functions.map(
    ({ name, args }) =>
      returnValues?.functions?.[JSON.stringify([name, ...args])] ?? null,
  );
  const missing = result
    .map((returnValue, index) => (returnValue === null ? index : -1))
    .filter((x) => x > 0);
  if (missing.length > 0) {
    console.error(
      `Unable to find return value for functions: ${missing
        .map((index) =>
          JSON.stringify([functions[index].name, ...functions[index].args]),
        )
        .join("; ")}.`,
    );
    throw new Error("Server communication error.");
  }
  return result;
}
