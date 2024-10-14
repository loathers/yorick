import { useInterval } from "@chakra-ui/react";
import { markRemoteCallCacheDirty } from "kolmafia";
import { isEqual } from "lodash";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { apiCall, outstandingCalls } from "../api/base";
import { makePlaceholder } from "../kolmafia/placeholder";
import { getHash } from "../util/hash";
import RefreshContext from "./RefreshContext";
import SoftRefreshQueuer from "./SoftRefreshQueuer";

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
  const functions = [
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
  ];
  const response = await apiCall({ functions }, await getHash());
  if (!response || !response.functions) {
    throw new Error("API call failed for some reason.");
  }
  return Object.fromEntries(
    response?.functions?.map((result, index) => {
      const { name, args } = functions[index];
      return [JSON.stringify([name, args]), result];
    }),
  );
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
const RefreshContextProvider: React.FC<RefreshContextProviderProps> = ({
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

  // Refresh trigger for dev prefs/etc override interface.
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
    SoftRefreshQueuer.queueSoftRefresh = () => {
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

export default RefreshContextProvider;
