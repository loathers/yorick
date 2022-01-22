import React from "react";
import { Text, HStack, VStack, Image } from "@chakra-ui/react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useGetCampground, useHaveEquipped } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { useQuestStarted } from "../../hooks/useQuest";
import { $item, $skill } from "../../util/makeValue";
import { plural } from "../../util/text";

const freeFightTooltip: React.ReactNode = [
  <HStack px={2}>
    <Image
      src={"images/itemimages/yorick.gif"}
      alt={"Yorick, the Skeleton"}
      boxSize="30px"
      fit="contain"
    />
    <VStack align="stretch" spacing={0.3}>
      <HStack>
        <Text bg="gray.200" p="4" rounded="md" fontSize={"12"}>
          These are inherently free fights. They do not cost a turn, nor do they
          decrement your effects. Many of them are scaling fights; by stacking
          large +mainstat% modifiers, they will give increasing amounts of stats
          and allow you to level very quickly!
        </Text>
        ,
      </HStack>
    </VStack>
  </HStack>,
];

const freeFights: [string, () => React.ReactNode][] = [
  [
    "NEP",
    () => {
      const nepToday = useGet("_neverendingPartyToday", false);
      const nepAlways = useGet("neverendingPartyAlways", false);
      const nepFreeTurns = useGet("_neverendingPartyFreeTurns");
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
    "Witchess",
    () => {
      const campground = useGetCampground() ?? {};

      const witchessFights = useGet("_witchessFights");

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
      const voidFreeFights = useGet("_voidFreeFights");
      const haveCmg = useHave($item`cursed magnifying glass`);
      const haveCmgEquipped = useHaveEquipped($item`cursed magnifying glass`);
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
            {plural(5 - voidFreeFights, "free void fight")}.
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
      const tentacleFought = !useGet("_eldritchTentacleFought", false);
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
      const evoked = !useGet("_eldritchHorrorEvoked", false);
      return (
        haveEvoke &&
        !evoked && <Line>Free eldritch horror via Evoke Eldritch Horror.</Line>
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
    <Tile
      header="Free Fights"
      imageUrl="/images/itemimages/shatter.gif"
      tooltip={freeFightTooltip}
    >
      {renderedFights}
    </Tile>
  ) : (
    <></>
  );
};

export default FreeFights;
