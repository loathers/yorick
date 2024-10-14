import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  availableAmount,
  getCampground,
  haveEquipped,
  isUnrestricted,
  myPath,
} from "kolmafia";
import { $item, $path, $skill, get, have } from "libram";
import React, { Fragment } from "react";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { AdviceTooltipIcon } from "../../components/Tooltips";
import { haveUnrestricted } from "../../util/available";
import { skillLink } from "../../util/links";
import { questStarted } from "../../util/quest";
import { plural } from "../../util/text";

const freeFights: [string, () => React.ReactNode][] = [
  [
    "NEP",
    () => {
      const nepToday = get("_neverendingPartyToday", false);
      const nepAlways = get("neverendingPartyAlways", false);
      const nepFreeTurns = get("_neverendingPartyFreeTurns");
      return (
        (nepToday || nepAlways) &&
        isUnrestricted($item`Neverending Party invitation envelope`) &&
        nepFreeTurns < 10 && (
          <Line href="/place.php?whichplace=town_wrong">
            {plural(10 - nepFreeTurns, "free NEP fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "Witchess",
    () => {
      const campground = getCampground() ?? {};

      const witchessFights = get("_witchessFights");

      return (
        !!campground["Witchess Set"] &&
        isUnrestricted($item`Witchess Set`) &&
        witchessFights < 5 && (
          <Line href="/campground.php?action=witchess">
            {plural(5 - witchessFights, "Witchess fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "CMG",
    () => {
      const voidFreeFights = get("_voidFreeFights");
      const haveCmg = have($item`cursed magnifying glass`);
      const haveCmgEquipped = haveEquipped($item`cursed magnifying glass`);
      return (
        haveCmg &&
        voidFreeFights < 5 && (
          <Line
            href={
              haveCmgEquipped
                ? undefined
                : "/inventory.php?ftext=cursed magnifying glass"
            }
          >
            {plural(5 - voidFreeFights, "free void fight")} (
            {get("cursedMagnifyingGlassCount")}/13 charge).
          </Line>
        )
      );
    },
  ],
  [
    "Burning Leaves",
    () => {
      const fightsRemaining = Math.max(0, 5 - get("_leafMonstersFought"));
      const leaves = availableAmount($item`inflammable leaf`);
      const leavesNeeded = 5 * fightsRemaining;
      return (
        getCampground()["A Guide to Burning Leaves"] &&
        fightsRemaining > 0 && (
          <Line href="/campground.php?preaction=burningleaves">
            {fightsRemaining} burning leaf fights
            {leaves < leavesNeeded ? ` (${leaves}/${leavesNeeded} leaves)` : ""}
            .
          </Line>
        )
      );
    },
  ],
  [
    "Forest Tentacle",
    () => {
      const larvaQuest = questStarted("questL02Larva");
      const groveQuest = questStarted("questG02Whitecastle");
      const tentacleFought = !get("_eldritchTentacleFought", false);
      return (
        (larvaQuest || groveQuest) &&
        tentacleFought && (
          <Line href="/place.php?whichplace=forestvillage&action=fv_scientest">
            1 free eldritch tentacle in the forest.
          </Line>
        )
      );
    },
  ],
  [
    "Evoke Horror",
    () => {
      const haveEvoke = haveUnrestricted($skill`Evoke Eldritch Horror`);
      const evoked = get("_eldritchHorrorEvoked", false);
      return (
        haveEvoke &&
        !evoked && (
          <Line href={skillLink($skill`Evoke Eldritch Horror`)}>
            1 free eldritch horror via Evoke Eldritch Horror.
          </Line>
        )
      );
    },
  ],
];

const FreeFights: React.FC = () => {
  if (myPath() === $path`Avant Guard`) return null;

  const renderedFights = freeFights.map(([name, fight]) => {
    const rendered = fight();
    return rendered ? <Fragment key={name}>{rendered}</Fragment> : false;
  });

  return renderedFights.some((fight) => fight) ? (
    <Tile
      header="Free Fights"
      imageUrl="/images/itemimages/shatter.gif"
      tooltip={
        <AdviceTooltipIcon
          text={`These are inherently free fights. They do not cost a turn, nor do they
            decrement your effects. Many of them are scaling fights; by stacking
            large +mainstat% modifiers, they will give increasing amounts of stats
            and allow you to level very quickly!`}
          icon={QuestionOutlineIcon}
        />
      }
    >
      {renderedFights}
    </Tile>
  ) : (
    <></>
  );
};

export default FreeFights;
