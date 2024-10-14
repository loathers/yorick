// FIXME: should be some way to import this from Vite.
declare global {
  interface ImportMeta {
    env: {
      MODE: string;
      BASE_URL: string;
      PROD: boolean;
      DEV: boolean;
      SSR: boolean;
    };
  }
}

export function inDevMode(): boolean {
  return import.meta.env.DEV;
}
