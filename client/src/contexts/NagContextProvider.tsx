import { ReactNode, useCallback, useState } from "react";

import NagContext, { NagWithPriority } from "./NagContext";

export interface NagContextProviderProps {
  children?: ReactNode;
}

const NagContextProvider: React.FC<NagContextProviderProps> = ({
  children,
}) => {
  const [nags, setNags] = useState<Record<string, NagWithPriority>>({});

  const withNag = useCallback(
    (id: string, priority: number, node: ReactNode) => {
      setNags((oldNags) => {
        if (node) {
          return { ...oldNags, [id]: { priority, node } };
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [id]: _, ...rest } = oldNags;
          return rest;
        }
      });
    },
    [setNags],
  );

  return (
    <NagContext.Provider value={{ nags, withNag }}>
      {children}
    </NagContext.Provider>
  );
};

export default NagContextProvider;
