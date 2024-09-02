type ApiRequest = {
  properties?: string[];
  functions?: { name: string; args: unknown[] }[];
};

type ApiResponse = {
  properties?: { [index: string]: string };
  functions?: { [index: string]: unknown };
};

let outstandingIdentifier = 0;
export const outstandingCalls = new Set<number>();
export const uniqueCalls = new Map<string, number>();

export function apiCall(request: ApiRequest): Promise<ApiResponse | undefined> {
  const identifier = outstandingIdentifier;
  outstandingIdentifier++;
  outstandingCalls.add(identifier);
  for (const { name, args } of request.functions ?? []) {
    const key = `${name}(${JSON.stringify(args)})`;
    uniqueCalls.set(key, 1 + (uniqueCalls.get(key) ?? 0));
  }
  return fetch("/yorick.js?relay=true", {
    method: "post",
    body: new URLSearchParams({ body: JSON.stringify(request) }),
    headers: {
      // Mafia only accepts this format.
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
    .finally(() => {
      outstandingCalls.delete(identifier);
    }) as Promise<ApiResponse | undefined>;
}
