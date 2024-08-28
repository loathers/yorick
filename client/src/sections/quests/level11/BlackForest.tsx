import { myLocation } from "kolmafia";
import { $familiar, $item, $location, get, have, questStep } from "libram";
import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import {
  combatRateModifier,
  haveEquipped,
  myFamiliar,
  npcPrice,
} from "../../../kolmafia/functions";
import { atStep, Step } from "../../../util/quest";

const BlackForest = () => {
  const step = questStep("questL11Black");
  const forestProgress = get("blackForestProgress");

  const familiar = myFamiliar();
  const haveBlackbird = have($familiar`Reassembled Blackbird`);
  const haveBlackbirdHatchling = have($item`reassembled blackbird`);
  const haveGaloshes = have($item`blackberry galoshes`);
  const haveGaloshesEquipped = haveEquipped($item`blackberry galoshes`);
  const combatRate = combatRateModifier();
  useNag(() => {
    const possibleNags: [boolean, ReactNode][] = [
      [
        haveBlackbird &&
          !haveBlackbirdHatchling &&
          familiar !== $familiar`Reassembled Blackbird`,
        <Line>Take your Reassembled Blackbird.</Line>,
      ],
      [
        haveBlackbirdHatchling && familiar === $familiar`Reassembled Blackbird`,
        <Line>Don't need blackbird anymore - change familiars.</Line>,
      ],
      [
        haveGaloshes && !haveGaloshesEquipped,
        <Line>Equip your blackberry galoshes.</Line>,
      ],
      [combatRate < 5, <Line>Ensure you have +5% combat.</Line>],
    ];
    return {
      priority: NagPriority.HIGH,
      node:
        possibleNags.every(([show]) => !show) ||
        myLocation() !== $location`The Black Forest` ||
        step >= 2 ? null : (
          <QuestTile
            header="Find the Black Market"
            imageUrl="/images/itemimages/documents.gif"
          >
            {possibleNags.map(
              ([show, node], index) =>
                show && <Fragment key={index}>{node}</Fragment>,
            )}
          </QuestTile>
        ),
    };
  }, [
    combatRate,
    familiar,
    haveBlackbird,
    haveBlackbirdHatchling,
    haveGaloshes,
    haveGaloshesEquipped,
    step,
  ]);

  return (
    <QuestTile
      header={
        have($item`forged identification documents`)
          ? "Vacation at the Shore"
          : "Find the Black Market"
      }
      imageUrl={
        have($item`forged identification documents`)
          ? "/images/itemimages/book2.gif"
          : "/images/itemimages/documents.gif"
      }
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/woods.php"],
        [
          2,
          have($item`forged identification documents`)
            ? "/adventure.php?snarfblat=355"
            : "/shop.php?whichshop=blackmarket",
        ],
        [3, "/adventure.php?snarfblat=355"],
      ])}
      minLevel={11}
      hide={step === Step.FINISHED}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <>
            {!haveGaloshes && (
              <Line>
                Bring 3 blackberries to the cobbler for blackberry galoshes.
              </Line>
            )}
            <Line>Black Forest exploration: ~{forestProgress * 20}%.</Line>
          </>,
        ],
        [
          2,
          have($item`forged identification documents`) ? (
            <Line>Take a trip at The Shore, Inc.</Line>
          ) : (
            <>
              <Line>
                Buy the forged identification documents for{" "}
                {npcPrice($item`forged identification documents`)} meat.
              </Line>
              <Line>
                Consider buying a can of black paint for desert exploration.
              </Line>
            </>
          ),
        ],
        [3, <Line>Take a trip at The Shore, Inc.</Line>],
      ])}
    </QuestTile>
  );
};

export default BlackForest;
