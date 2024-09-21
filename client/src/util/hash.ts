declare global {
  interface Window {
    mainpane?: Window;
    pwd?: string;
  }
}

let lastHash: string | null = null;
export function getHash(): string {
  const current =
    window.parent.frames.mainpane?.document?.body?.innerHTML?.match(
      /pwd:\s+"([0-9a-f]+)"/m,
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
