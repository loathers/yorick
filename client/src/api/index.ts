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

export async function getProperties(
  properties: string[]
): Promise<{ [name: string]: string }> {
  const response = await apiCall({ properties: properties });
  const propertyValues = response.properties ?? {};
  return Object.fromEntries(
    properties.map((name) => [name, propertyValues[name] ?? ""])
  );
}

export function getProperty(name: string): Promise<string> {
  return getProperties([name]).then((propertyValues) => propertyValues[name]);
}

export function callFunction(name: string, ...args: unknown[]) {
  return apiCall({ functions: [{ name, args }] });
}
