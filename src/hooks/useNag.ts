import { ReactNode, useCallback, useContext, useEffect } from "react";

import NagContext from "../contexts/NagContext";
import RefreshContext from "../contexts/RefreshContext";

const NAGS_ENABLED = true;

/**
 * Hook to create a nag for display in the NagSection at the top.
 * @param id Unique ID for this nag.
 * @param priority Priority of nag; use definition of NagPriority.
 * @param node Node to use as a nag. Should be an instance of Tile.
 */
function useNag(
  callback: () => {
    id: string;
    priority: number;
    node: ReactNode;
  },
  dependencies: unknown[],
): void {
  if (!NAGS_ENABLED) return;

  const { softRefreshCount } = useContext(RefreshContext);
  const { withNag } = useContext(NagContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedCallback = useCallback(callback, [
    ...dependencies,
    softRefreshCount,
  ]);

  useEffect(() => {
    const { id, priority, node } = memoizedCallback();
    withNag(id, priority, node);
  }, [memoizedCallback, withNag]);
}

export default useNag;
