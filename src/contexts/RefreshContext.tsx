import { createContext } from "react";

const RefreshContext = createContext({
  // Re-render without invalidating our cached server function calls.
  softRefreshCount: 0,
  // Re-render and go back to the server on everything.
  hardRefreshCount: 0,
  triggerHardRefresh: () => {},
});

export default RefreshContext;
