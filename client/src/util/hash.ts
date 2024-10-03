declare global {
  interface Window {
    mainpane?: Window;
    pwd?: string;
  }
}

const PWD_RE = /pwd:\s+"([0-9a-f]+)"/m;
let lastHash: string | null = null;
export function getHashIfAvailable(): string {
  const current =
    window.parent.frames.mainpane?.document?.body?.innerHTML?.match(
      PWD_RE,
    )?.[1];
  if (current !== undefined) {
    lastHash = current;
  } else {
    const initial = window.parent.pwd;
    if (initial !== undefined) {
      lastHash = initial;
    }
  }
  return lastHash ?? "";
}

export async function getHash(): Promise<string> {
  const attempt = getHashIfAvailable();
  if (attempt === "") {
    const main = await fetch("/main.php").then((response) => response.text());
    lastHash = main.match(PWD_RE)?.[1] ?? null;
    return lastHash ?? "";
  } else {
    return attempt;
  }
}
