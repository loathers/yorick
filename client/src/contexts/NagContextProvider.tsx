import { ReactNode, useCallback, useState } from "react";

import NagContext, { NagWithPriority } from "./NagContext";

export interface NagContextProviderProps {
  children?: ReactNode;
}

// function findIndex<T>(array: T[], value: T, compare: (a: T, b: T) => number) {
//   let low = 0;
//   let high = array.length;
//   while (low < high) {
//     const mid = (low + high) >>> 1;
//     if (compare(array[mid], value) > 0) {
//       high = mid;
//     } else {
//       low = mid + 1;
//     }
//   }
//   return low;
// }

// function insertSorted<T>(
//   array: T[],
//   element: T,
//   compare: (a: T, b: T) => number
// ) {
//   const index = findIndex(array, element, compare);
//   return [...array.slice(0, index), element, ...array.slice(index)];
// }

const NagContextProvider: React.FC<NagContextProviderProps> = ({
  children,
}) => {
  const [nags, setNags] = useState<Record<string, NagWithPriority>>({});

  const withNag = useCallback(
    (id: string, priority: number, node: ReactNode) => {
      // Don't do anything if node is falsey.
      if (node) {
        setNags((oldNags) => ({ ...oldNags, [id]: { priority, node } }));
      }
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
