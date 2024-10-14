import { getHashIfAvailable, updateHashFromServer } from "../util/hash";

type ApiRequest = {
  properties?: string[];
  functions?: readonly { name: string; args: unknown[] }[];
};

type ApiResponse = {
  properties?: string[];
  functions?: unknown[];
};

let outstandingIdentifier = 0;
export const outstandingCalls = new Set<number>();
export const uniqueCalls = new Map<string, number>();

let globalErrorHandler = (error: unknown) => console.error(error);
export function setGlobalErrorHandler(handler: (error: unknown) => void) {
  globalErrorHandler = handler;
}

export async function apiCall(
  request: ApiRequest,
  pwd: string | null = null,
  retry = true,
): Promise<ApiResponse | undefined> {
  const identifier = outstandingIdentifier;
  outstandingIdentifier++;
  outstandingCalls.add(identifier);
  for (const { name, args } of request.functions ?? []) {
    const key = `${name}(${JSON.stringify(args)})`;
    uniqueCalls.set(key, 1 + (uniqueCalls.get(key) ?? 0));
  }
  try {
    const response = await fetch("/KoLmafia/jsonApi", {
      method: "post",
      body: new URLSearchParams({
        body: JSON.stringify(request),
        pwd: pwd ?? getHashIfAvailable(),
      }),
      headers: {
        // Mafia only accepts this format.
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.status === 500 && retry) {
      // Probably a relog. Try again.
      await updateHashFromServer();
      return apiCall(request, getHashIfAvailable(), false);
    }
    const json = await response.json();
    if ("error" in json) {
      globalErrorHandler(json.error);
      return;
    }
    return json;
  } catch (error) {
    globalErrorHandler(error);
  } finally {
    outstandingCalls.delete(identifier);
  }
}
