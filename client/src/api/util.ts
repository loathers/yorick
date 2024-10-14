import { apiCall } from "./base";

export function remoteCliExecute(command: string) {
  return apiCall({
    functions: [{ name: "cliExecute", args: [command] }],
  });
}
