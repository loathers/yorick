import { getHashIfAvailable } from "../util/hash";
import { apiCall } from "./base";

export function remoteCliExecute(command: string) {
  return apiCall({
    pwd: getHashIfAvailable(),
    functions: [{ name: "cliExecute", args: [command] }],
  });
}
