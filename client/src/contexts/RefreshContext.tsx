import React, { createContext, useEffect, useState } from "react";
import { call } from "../api/function";
import useInterval from "../hooks/useInterval";
import { markRemoteCallCacheDirty } from "../kolmafia/remote";

export let triggerSoftRefresh = () => {};

const RefreshContext = createContext({
  // Re-render without going back to the server.
  softRefreshCount: 0,
  // Re-render and go back to the server.
  hardRefreshCount: 0,
});

async function getCharacterState() {
  const [myTurncount, myMeat, myHp, myMp, myFamiliar, myAdventures] =
    await Promise.all([
      call.myTurncount(),
      call.myMeat(),
      call.myHp(),
      call.myMp(),
      call.myFamiliar().name,
      call.myAdventures(),
    ]);
  return { myTurncount, myMeat, myHp, myMp, myFamiliar, myAdventures };
}

type CharacterState = Awaited<ReturnType<typeof getCharacterState>>;

export const RefreshContextProvider: React.FC = ({ children }) => {
  const [lastCharacterState, setLastCharacterState] = useState<
    Partial<CharacterState>
  >({});
  const [softRefreshCount, setSoftRefreshCount] = useState(0);
  const [hardRefreshCount, setHardRefreshCount] = useState(0);

  useInterval(async () => {
    const characterState = await getCharacterState();

    if (
      !Object.entries(characterState).every(
        ([key, value]) =>
          lastCharacterState[key as keyof CharacterState] === value
      )
    ) {
      setLastCharacterState(characterState);
      markRemoteCallCacheDirty();
      setHardRefreshCount((count) => count + 1);
    }
  }, 2000);

  useEffect(() => {
    const callback = (event: MessageEvent) => {
      if (
        event.origin === "http://localhost:3000" &&
        event.data === "refresh"
      ) {
        markRemoteCallCacheDirty();
        setSoftRefreshCount((count) => count + 1);
      }
    };
    window.addEventListener("message", callback);
  }, []);

  useEffect(() => {
    triggerSoftRefresh = () => {
      setSoftRefreshCount((count) => count + 1);
    };
  }, []);

  return (
    <RefreshContext.Provider value={{ softRefreshCount, hardRefreshCount }}>
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContext;
