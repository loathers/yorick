import { createContext, ReactNode } from "react";

export enum NagPriority {
  HIGH = 100,
  MID = 50,
  LOW = 0,
}

export type NagWithPriority = { priority: number; node: ReactNode };

export interface NagContextValue {
  // Map from priority to list of nodes at that priority.
  nags: Record<string, NagWithPriority>;
  withNag(id: string, priority: number, node: ReactNode): void;
}

const NagContext = createContext<NagContextValue>({
  nags: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  withNag() {},
});

export default NagContext;
