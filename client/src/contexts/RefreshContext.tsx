import React, { createContext, useState } from "react";
import { call } from "../api/function";
import useInterval from "../hooks/useInterval";

const RefreshContext = createContext(0);

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
  const [refreshCount, setRefreshCount] = useState(0);

  useInterval(async () => {
    const characterState = await getCharacterState();

    if (
      !Object.entries(characterState).every(
        ([key, value]) =>
          lastCharacterState[key as keyof CharacterState] === value
      )
    ) {
      setLastCharacterState(characterState);
      setRefreshCount((count) => count + 1);
    }
  }, 2000);

  return (
    <RefreshContext.Provider value={refreshCount}>
      {children}
    </RefreshContext.Provider>
  );
};

export default RefreshContext;
