import { ReactNode, useCallback, useContext, useEffect, useId } from "react";

import NagContext from "../contexts/NagContext";

/**
 * Hook to create a nag for display in the NagSection at the top.
 * Only use this once per component.
 * @param priority Priority of nag; use definition of NagPriority.
 * @param node Node to use as a nag. Should be an instance of Tile.
 */
function useNag(
  callback: () => {
    priority: number;
    node: ReactNode;
  },
  dependencies: unknown[],
): void {
  const { withNag } = useContext(NagContext);
  const id = useId();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(() => {
    const { priority, node } = memoizedCallback();
    withNag(id, priority, node);
  }, [id, memoizedCallback, withNag]);
}

export default useNag;
