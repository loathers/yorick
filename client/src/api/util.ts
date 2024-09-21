import { getHash } from "../util/hash";
import { apiCall } from "./base";

export function remoteCliExecute(command: string) {
  return apiCall({
    pwd: getHash(),
    functions: [{ name: "cliExecute", args: [command] }],
  });
}
