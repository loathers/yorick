import { haveOutfit, myAscensions, myLevel } from "kolmafia";
import { get, questStep } from "libram";
import React from "react";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { turnsToSeeNoncombat } from "../../util/calc";
import { atStep, Step } from "../../util/quest";
import { plural } from "../../util/text";
import Arena from "./level12/Arena";
import Farm from "./level12/Farm";
import Junkyard from "./level12/Junkyard";
import Lighthouse from "./level12/Lighthouse";
import Nuns from "./level12/Nuns";
import Orchard from "./level12/Orchard";

const ISLAND_WAR_URL = "/bigisland.php";

function pluralEnemyCount(
  count: number,
  description: string | null,
  side: "hippy" | "frat boy",
) {
  return plural(
    count,
    `${description ? `${description} ` : ""}${side}`,
    `${description ? `${description} ` : ""}${side === "frat boy" ? "frat boys" : "hippies"}`,
  );
}

const Level12: React.FC = () => {
  const islandUnlocked = get("lastIslandUnlock") === myAscensions();
  if (!islandUnlocked) {
    return (
      <QuestTile
        header={
          myLevel() < 12
            ? "Island War Quest (level 12)"
            : "Island War Quest (unlock island)"
        }
        imageUrl="/images/itemimages/fmedbeta.gif"
        href={ISLAND_WAR_URL}
        disabled={true}
      />
    );
  }

  const step = questStep("questL12War");
  const hippiesDefeated = get("hippiesDefeated");
  const fratboysDefeated = get("fratboysDefeated");
  const haveHippyFatigues = haveOutfit("War Hippy Fatigues");
  const haveFratFatigues = haveOutfit("War Frat Fatigues");

  const sideQuestNames = [
    "Lighthouse",
    "Junkyard",
    "Arena",
    "Orchard",
    "Nuns",
    "Farm",
  ] as const;
  const sideQuests = sideQuestNames.map((name) => `sidequest${name}Completed`);

  const remainingSidequestNames = sideQuestNames.filter(
    (name) => get(`sidequest${name}Completed`) === "none",
  );
  const completedHippyQuests = sideQuests.filter(
    (quest) => get(quest) === "hippy",
  ).length;
  const completedFratQuests = sideQuests.filter(
    (quest) => get(quest) === "fratboy",
  ).length;

  const hippiesLeft = 1000 - hippiesDefeated;
  const fratboysLeft = 1000 - fratboysDefeated;

  const mySide = (() => {
    if (completedFratQuests > 0) return "frat boy";
    if (completedHippyQuests > 0) return "hippy";
    if (haveFratFatigues) return "frat boy";
    if (haveHippyFatigues) return "hippy";
    return hippiesLeft > fratboysLeft ? "hippy" : "frat boy";
  })();
  const otherSide = mySide === "hippy" ? "frat boy" : "hippy";
  const completedMySideQuests =
    mySide === "hippy" ? completedHippyQuests : completedFratQuests;
  const otherSideLeft = mySide === "hippy" ? fratboysLeft : hippiesLeft;
  const otherSideDefeated = 1000 - otherSideLeft;
  const defeatedPerCombat = 1 << completedMySideQuests;

  const thresholds = [64, 192, 458, 1000] as const;
  const nextThreshold =
    thresholds.findIndex((threshold) => otherSideDefeated < threshold) ?? 3;
  const enemiesToThreshold = thresholds[nextThreshold] - otherSideDefeated;
  const turnsToThreshold = Math.ceil(enemiesToThreshold / defeatedPerCombat);
  const nextQuest =
    nextThreshold === 3
      ? null // past last sidequest.
      : mySide === "hippy"
        ? sideQuestNames[3 - nextThreshold]
        : sideQuestNames[3 + nextThreshold];
  const openQuests =
    mySide === "hippy"
      ? sideQuestNames.slice(3 - nextThreshold)
      : sideQuestNames.slice(0, 3 + nextThreshold);

  if (step === Step.FINISHED) return null;

  return (
    <>
      <QuestTile
        header="Island War Quest"
        imageUrl="/images/itemimages/fmedbeta.gif"
        href={ISLAND_WAR_URL}
        minLevel={12}
      >
        {atStep(step, [
          [Step.UNSTARTED, <Line>Visit the Council to start the quest.</Line>],
          [
            Step.STARTED,
            <>
              {!haveHippyFatigues && !haveFratFatigues ? (
                <Line>
                  Acquire either war hippy fatigues or frat warrior fatigues.
                </Line>
              ) : (
                <Line>Start the war!</Line>
              )}
              <Line>Run -combat and adventure in the enemy camp.</Line>
              <Line>
                {turnsToSeeNoncombat(85, 3).toFixed(1)} turns expected.
              </Line>
            </>,
          ],
          [
            1,
            <>
              <Line>
                Defeat {pluralEnemyCount(otherSideLeft, "more", otherSide)}. (
                {plural(Math.ceil(otherSideLeft / defeatedPerCombat), "turn")}{" "}
                remaining).
              </Line>
              {remainingSidequestNames.length > 0 && (
                <>
                  <Line>
                    Quests to complete: {remainingSidequestNames.join(", ")}.
                  </Line>
                  {nextQuest && (
                    <Line>
                      {plural(turnsToThreshold, "turn")} (
                      {pluralEnemyCount(enemiesToThreshold, null, otherSide)}){" "}
                      until {nextQuest} opens.
                    </Line>
                  )}
                </>
              )}
            </>,
          ],
        ])}
      </QuestTile>
      {step >= 1 && (
        <>
          {get("sidequestArenaCompleted") === "none" && (
            <Arena disabled={openQuests.includes("Arena")} />
          )}
          {get("sidequestJunkyardCompleted") === "none" && <Junkyard />}
          {get("sidequestLighthouseCompleted") === "none" && <Lighthouse />}
          {get("sidequestOrchardCompleted") === "none" && <Orchard />}
          {get("sidequestNunsCompleted") === "none" && (
            <Nuns disabled={openQuests.includes("Nuns")} />
          )}
          {get("sidequestFarmCompleted") === "none" && <Farm />}
        </>
      )}
    </>
  );
};

export default Level12;
