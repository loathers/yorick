declare global {
  interface Window {
    mainpane?: Window;
    pwd?: string;
  }
}

const PWD_RE = /pwd:\s+"([0-9a-f]+)"/m;
let lastHash: string | null = null;
export function getHashIfAvailable(): string {
  if (lastHash) return lastHash;

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

export async function updateHashFromServer(): Promise<void> {
  const response = await fetch("/api.php?what=status&for=YORICK");
  const apiObject = await response.json();
  const newHash = apiObject?.pwd ?? null;
  if (newHash) window.parent.pwd = newHash;
  lastHash = newHash;
}

export async function getHash(): Promise<string> {
  const attempt = getHashIfAvailable();
  if (attempt === "") {
    await updateHashFromServer();
    return lastHash ?? "";
  } else {
    return attempt;
  }
}
