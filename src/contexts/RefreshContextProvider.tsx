import { useInterval } from "@chakra-ui/react";
import { markRemoteCallCacheDirty } from "kolmafia";
import { isEqual } from "lodash";
import { ReactNode, useCallback, useEffect, useState } from "react";

import { apiCall, outstandingCalls } from "../api/base";
import { makePlaceholder } from "../kolmafia/placeholder";
import { inDevMode } from "../util/env";
import { getHash } from "../util/hash";
import RefreshContext from "./RefreshContext";
import RerenderQueuer from "./RerenderQueuer";

const NO_REFRESH_URLS = [
  "/charpane.php",
  "/inventory.php",
  "/desc_item.php",
  "/desc_effect.php",
  "/desc_skill.php",
  "/desc_familiar.php",
];
const NO_REFRESH_IF_NO_PARAMS_URLS = ["/woods.php", "/town.php", "/main.php"];
function shouldRefreshOnLoad(urlObject: string | URL) {
  const url =
    typeof urlObject === "string"
      ? new URL(urlObject, window.location.href)
      : urlObject;
  return (
    !url.pathname.startsWith("/yorick") &&
    !NO_REFRESH_URLS.some((bad) => url.pathname.endsWith(bad)) &&
    // Don't refresh on place.php?whichplace=xxxxx
    !(
      url.pathname === "/place.php" &&
      url.searchParams.size === 1 &&
      url.searchParams.get("whichplace") !== null
    ) &&
    !(
      NO_REFRESH_IF_NO_PARAMS_URLS.includes(url.pathname) &&
      url.searchParams.size === 0
    )
  );
}

function instrumentXHR(
  targetName: "mainpane" | "charpane",
  callback: () => void,
) {
  const target = window.parent.parent.frames[targetName];
  if (!target) {
    console.error(`YORICK: Failed to instrument XHR in pane ${targetName}!`);
    return;
  }

  if (
    !(
      "instrumented" in target.XMLHttpRequest &&
      target.XMLHttpRequest.instrumented
    )
  ) {
    const openOld = target.XMLHttpRequest.prototype.open;
    const openNew = function (
      this: XMLHttpRequest,
      method: string,
      url: string | URL,
      async = true,
      username?: string | null,
      password?: string | null,
    ) {
      // Don't instrument description popup requests or similar.
      if (shouldRefreshOnLoad(url)) {
        this.addEventListener("readystatechange", () => {
          if (this.readyState === target.XMLHttpRequest.DONE) {
            const status = this.status;
            if (status === 0 || (status >= 200 && status < 400)) {
              callback();
            }
          }
        });
      }
      return openOld.call(this, method, url, async, username, password);
    };
    target.XMLHttpRequest.prototype.open = openNew;
    Object.assign(target.XMLHttpRequest, { instrumented: true });
  }
}

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
  // We have to do this using the raw API, since the refresh logic
  // shouldn't refresh its own values.
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

// Interval (ms) at which to check character state and possibly hard refresh.
const CHARACTER_STATE_INTERVAL = 2000;
let lastCharacterState: CharacterState | null = null;
// Wait this long max for a queued rerender.
const RERENDER_MAX_WAIT = 6000;
let rerenderQueued = false;
let lastRerender = Date.now();
/**
 * Refresh context for KoLmafia remote calls.
 * MUST ONLY BE CREATED ONCE.
 * @param props.children Child nodes.
 */
const RefreshContextProvider: React.FC<RefreshContextProviderProps> = ({
  children,
}) => {
  // Two kinds of refresh: "rerender" and "hard refresh."
  // A rerender is just a React rerender.
  // A hard refresh means we mark dirty all the remote cache data from
  // Mafia - so we have to make a big new request to get the value of
  // every function call from remote Mafia.
  // Rerenders largely happen as a result of new information
  // arriving from remote Mafia. Hard refreshes happen when game state
  // changes.
  const [rerenderCount, setRerenderCount] = useState(0);
  const [hardRefreshCount, setHardRefreshCount] = useState(0);

  rerenderQueued = false;
  lastRerender = Date.now();

  const triggerHardRefresh = useCallback(() => {
    lastCharacterState = null;
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

    // Every six seconds, we make sure rerender happens irrespective of any outstanding calls.
    if (rerenderQueued && Date.now() - lastRerender > RERENDER_MAX_WAIT) {
      outstandingCalls.clear();
      setRerenderCount((count) => count + 1);
    }
  }, CHARACTER_STATE_INTERVAL);

  useEffect(() => {
    if (inDevMode()) {
      // Refresh trigger for dev override interface.
      window.addEventListener("message", (event: MessageEvent) => {
        if (
          event.origin === "http://localhost:3000" &&
          event.data === "refresh"
        ) {
          triggerHardRefresh();
        }
      });
    }

    // Refresh any time the main or char panes navigate or AJAX.
    for (const pane of ["mainpane", "charpane"] as const) {
      const target = window.parent.parent.frames[pane];
      if (target) {
        instrumentXHR(pane, triggerHardRefresh);
        target?.frameElement?.addEventListener("load", () => {
          if (shouldRefreshOnLoad(target.location.href)) {
            triggerHardRefresh();
          }
          instrumentXHR(pane, triggerHardRefresh);
        });
      }
    }
  }, [triggerHardRefresh]);

  useEffect(() => {
    RerenderQueuer.queueRerender = () => {
      if (outstandingCalls.size === 0) {
        setRerenderCount((count) => count + 1);
      } else {
        rerenderQueued = true;
      }
    };
  }, []);

  return (
    <RefreshContext.Provider
      value={{
        rerenderCount,
        hardRefreshCount,
        triggerHardRefresh,
      }}
    >
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContextProvider;
