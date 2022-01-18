type ApiRequest = {
  properties?: string[];
  functions?: { name: string; args: unknown[] }[];
};

type ApiResponse = {
  properties?: { [index: string]: string };
  functions?: { [index: string]: unknown };
};

export function apiCall(request: ApiRequest): Promise<ApiResponse> {
  return fetch("/yorick.js?relay=true", {
    method: "post",
    body: new URLSearchParams({ body: JSON.stringify(request) }),
    headers: {
      // Mafia only accepts this format.
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => response.json()) as Promise<ApiResponse>;
}
