import React from "react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { $item, $skill, $familiar, $class } from "../../util/makeValue";
import { plural } from "../../util/text";
import useHave from "../../hooks/useHave";
import { useProperty } from "../../hooks/useProperties";
import { useBooleanFunction, useObjectFunction, useStringFunction } from "../../hooks/useFunction";
import { useQuestStarted } from "../../hooks/useQuest";

// Free fights remaining to implement:
//   - Snojo; need to determine access and figure out good way to present
//   - Check if you have a freebie in chateau?
//   - Remaining hipster fights, possibly? This one is weird...
//   - Protopack probably shouldn't be here, but maybe, if it's active?

const freeFights: [string, () => React.ReactNode][] = [
  [
    "NEP",
    () => {
      const nepToday = useProperty("_neverendingPartyToday", false);
      const nepAlways = useProperty("neverendingPartyAlways", false);
      const nepFreeTurns = useProperty("_neverendingPartyFreeTurns", 0);
      return (
        (nepToday || nepAlways) &&
        nepFreeTurns < 10 && (
          <Line href="/place.php?whichplace=town_wrong">
            {plural(10 - nepFreeTurns, "free NEP fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "Piranha Plant",
    () => {
      const mushroomFights = useProperty("_mushroomGardenFights", 0);
      const haveSpores = useHave($item`packet of mushroom spores`);
      const mushroomGarden = useStringFunction.myGardenType() === "mushroom";
      const inPlumber = useObjectFunction.myClass().name === "Plumber";
      return (
        ( haveSpores || mushroomGarden) &&
        mushroomFights < (inPlumber? 5:1) && (
          <Line href="/place.php?whichplace=town_wrong">
            {plural( (inPlumber? 5:1) - mushroomFights, "free mushroom fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "Witchess",
    () => {
      const campground = useObjectFunction.getCampground();

      const witchessFights = useProperty("_witchessFights", 0);

      return (
        !!campground["Witchess Set"] &&
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
      const voidFreeFights = useProperty("_voidFreeFights", 0);
      const haveCmg = useHave($item`cursed magnifying glass`);
      const haveCmgEquipped = useBooleanFunction.haveEquipped(
        $item`cursed magnifying glass`
      );
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
            {plural(voidFreeFights, "free void fight")}.
          </Line>
        )
      );
    },
  ],
  [
    "Forest Tentacle",
    () => {
      const larvaQuest = useQuestStarted("questL02Larva");
      const groveQuest = useQuestStarted("questG02Whitecastle");
      const tentacleFought = !useProperty("_eldritchTentacleFought", false);
      return (
        (larvaQuest || groveQuest) &&
        tentacleFought && (
          <Line href="/place.php?whichplace=forestvillage&action=fv_scientest">
            Free eldritch tentacle in the forest.
          </Line>
        )
      );
    },
  ],
  [
    "Evoke Horror",
    () => {
      const haveEvoke = useHave($skill`Evoke Eldritch Horror`);
      const evoked = !useProperty("_eldritchHorrorEvoked", false);
      return (
        haveEvoke &&
        evoked && <Line>Free eldritch horror via Evoke Eldritch Horror.</Line>
      );
    },
  ],
  [
    "Deep Machine Tunnel",
    () => {
      const haveMachineElf = useHave($familiar`Machine Elf`);
      const machineElfFreeFights = useProperty("_machineTunnelsAdv",0);
      return (
        haveMachineElf &&
        machineElfFreeFights < 5 && 
        <Line href="/place.php?whichplace=dmt">
            {plural(5-machineElfFreeFights, "free Deep Machine Tunnel fight")}.
          </Line>
      );
    },
  ],
  [
    "Lynyrd Snares",
    () => {
      const haveLynyrdSnares = useHave($item`lynyrd snare`);
      const snaresUsed = useProperty("_lynyrdSnareUses",0);
      return (
        haveLynyrdSnares &&
        snaresUsed < 3 && 
        <Line href="/inventory.php?ftext=lynyrd snare">
            {plural(3-snaresUsed, "free lynyrd fight")}.
          </Line>
      );
    },
  ],
];

const FreeFights: React.FC = () => {
  const renderedFights = freeFights.map(([name, fight]) => {
    const rendered = fight();
    return rendered ? (
      <React.Fragment key={name}>{rendered}</React.Fragment>
    ) : (
      false
    );
  });

  return renderedFights.some((fight) => fight) ? (
    <Tile header="Free Fights" imageUrl="/images/itemimages/shatter.gif">
      {renderedFights}
    </Tile>
  ) : (
    <></>
  );
};

export default FreeFights;
