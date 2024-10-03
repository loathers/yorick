import isEqual from "lodash/isEqual";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { apiCall, outstandingCalls } from "../api/base";
import useInterval from "../hooks/useInterval";
import { makePlaceholder } from "../kolmafia/placeholder";
import { markRemoteCallCacheDirty } from "../kolmafia/remote";
import { getHash } from "../util/hash";

export let queueSoftRefresh = () => {};

const RefreshContext = createContext({
  // Re-render without invalidating our cached server function calls.
  softRefreshCount: 0,
  // Re-render and go back to the server on everything.
  hardRefreshCount: 0,
  triggerHardRefresh: () => {},
});

const trackedSlots = [
  "hat",
  "back",
  "shirt",
  "pants",
  "weapon",
  "off-hand",
  "acc1",
  "acc2",
  "acc3",
  "familiar",
];

async function getCharacterState() {
  return apiCall({
    pwd: await getHash(),
    functions: [
      { name: "myHash", args: [] },
      { name: "myTurncount", args: [] },
      { name: "myMeat", args: [] },
      { name: "myHp", args: [] },
      { name: "myMp", args: [] },
      { name: "myFamiliar", args: [] },
      { name: "myAdventures", args: [] },
      { name: "myEffects", args: [] },
      ...trackedSlots.map((slot) => ({
        name: "equippedItem",
        args: [makePlaceholder("Slot", slot)],
      })),
    ],
  }).then((response) => response?.functions);
}

type CharacterState = Record<string, unknown>;

interface RefreshContextProviderProps {
  children?: ReactNode;
}

// let renderCount = 0;
// Interval (ms) at which to check character state and possibly hard refresh.
const CHARACTER_STATE_INTERVAL = 2000;
let lastCharacterState: CharacterState | null = null;
// Wait this long max for a queued soft refresh.
const SOFT_REFRESH_MAX_WAIT = 6000;
let softRefreshQueued = false;
let lastSoftRefresh = Date.now();
/**
 * Refresh context for KoLmafia remote calls.
 * MUST ONLY BE CREATED ONCE.
 * @param props.children Child nodes.
 */
export const RefreshContextProvider: React.FC<RefreshContextProviderProps> = ({
  children,
}) => {
  const [softRefreshCount, setSoftRefreshCount] = useState(0);
  const [hardRefreshCount, setHardRefreshCount] = useState(0);

  softRefreshQueued = false;
  lastSoftRefresh = Date.now();

  // renderCount++;
  // console.log(
  //   `Refresh: ${softRefreshCount} soft, ${hardRefreshCount} hard. ${renderCount} renders.`,
  // );
  // console.log(`> ${uniqueCalls.size} unique calls.`);

  const triggerHardRefresh = useCallback(() => {
    markRemoteCallCacheDirty();
    setHardRefreshCount((count) => count + 1);
  }, []);

  useInterval(async () => {
    if (outstandingCalls.size === 0) {
      const characterState = await getCharacterState();

      if (
        characterState !== undefined &&
        lastCharacterState !== null &&
        !isEqual(characterState, lastCharacterState)
      ) {
        lastCharacterState = characterState;
        triggerHardRefresh();
      }

      if (characterState !== undefined && lastCharacterState === null) {
        lastCharacterState = characterState;
      }
    }

    // Every six seconds, we make sure soft refresh happens irrespective of any outstanding calls.
    if (
      softRefreshQueued &&
      Date.now() - lastSoftRefresh > SOFT_REFRESH_MAX_WAIT
    ) {
      outstandingCalls.clear();
      setSoftRefreshCount((count) => count + 1);
    }
  }, CHARACTER_STATE_INTERVAL);

  useEffect(() => {
    const callback = (event: MessageEvent) => {
      if (
        event.origin === "http://localhost:3000" &&
        event.data === "refresh"
      ) {
        triggerHardRefresh();
      }
    };
    window.addEventListener("message", callback);
  }, [triggerHardRefresh]);

  useEffect(() => {
    queueSoftRefresh = () => {
      if (outstandingCalls.size === 0) {
        setSoftRefreshCount((count) => count + 1);
      } else {
        softRefreshQueued = true;
      }
    };
  }, []);

  return (
    <RefreshContext.Provider
      value={{
        softRefreshCount,
        hardRefreshCount,
        triggerHardRefresh,
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContext;
