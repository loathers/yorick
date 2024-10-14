import { getHash } from "../util/hash";
import { apiCall } from "./base";

export async function batchFunction(
  functions: readonly { name: string; args: unknown[] }[],
) {
  const result = await apiCall(
    {
      functions,
    },
    await getHash(),
  );
  if (!result?.functions) {
    throw new Error(
      result && "error" in result && typeof result.error === "string"
        ? result.error
        : undefined,
    );
  }
  return result?.functions;
}
