import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import {
  canAdventure,
  haveEquipped,
  myAscensions,
  myLocation,
  myPath,
} from "kolmafia";
import { $item, $location, $locations, get, have, questStep } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";

const CandyCaneSwordCane = () => {
  const candyCaneSwordCane = $item`candy cane sword cane`;
  const haveCcsc = have(candyCaneSwordCane);
  const ccscEquipped = haveEquipped(candyCaneSwordCane);

  const inRun = get("kingLiberated") === false;
  const pathCheck = ![
    "Community Service",
    "Grey Goo",
    "Avatar of Boris",
  ].includes(myPath().name);

  const candyCaneSwordOptions = [
    {
      available: !get("_candyCaneSwordLyle"),
      node: (
        <ListItem key="lyle">Bonus: Lyle's Monorail Buff (+40% init).</ListItem>
      ),
      location: null,
    },
    {
      available:
        !get("candyCaneSwordBlackForest") && questStep("questL11Black") < 2,
      node: (
        <ListItem key="black">
          Bonus: The Black Forest (+8 exploration).
        </ListItem>
      ),
      location: $location`The Black Forest`,
    },
    {
      available: !get("candyCaneSwordDailyDungeon") && !get("dailyDungeonDone"),
      node: (
        <ListItem key="daily">
          Bonus: Daily Dungeon (+1 fat loot token).
        </ListItem>
      ),
      location: $location`The Daily Dungeon`,
    },
    {
      available:
        !get("candyCaneSwordApartmentBuilding") &&
        get("hiddenApartmentProgress") < 8,
      node: (
        <ListItem key="apartment">Bonus: Hidden Apartment (+1 Curse).</ListItem>
      ),
      location: $location`The Hidden Apartment Building`,
    },
    {
      available:
        !get("candyCaneSwordBowlingAlley") &&
        get("hiddenBowlingAlleyProgress") < 7,
      node: (
        <ListItem key="bowl">
          Bonus: Hidden Bowling Alley (+1 free bowl).
        </ListItem>
      ),
      location: $location`The Hidden Bowling Alley`,
    },
    {
      available:
        !get("candyCaneSwordShore") && get("lastIslandUnlock") < myAscensions(),
      node: (
        <ListItem key="shore">
          Alternate: Shore (2 scrips for the price of 1).
        </ListItem>
      ),
      location: $location`The Shore, Inc. Travel Agency`,
    },
    {
      available:
        !$locations`Wartime Hippy Camp, Wartime Frat House`.some((l) =>
          canAdventure(l),
        ) && questStep("questL12War") < 1,
      node: (
        <ListItem key="hippy">
          Alternate: Hippy Camp (Redirect to the War Start NC).
        </ListItem>
      ),
      location: $location`Wartime Hippy Camp`,
    },
    {
      available: get("zeppelinProtestors") < 80,
      node: (
        <ListItem key="zeppelin">
          Alternate: Zeppelin Protesters{" "}
          <Text as="span" color="purple.500">
            (double Sleaze damage!)
          </Text>
          .
        </ListItem>
      ),
      location: $location`A Mob of Zeppelin Protesters`,
    },
  ];

  const availableOptions = candyCaneSwordOptions.filter(
    ({ available }) => available,
  );

  const current = myLocation();
  const displayNag = availableOptions.some(
    ({ location }) => current === location,
  );

  // FIXME: Actually check if we're in a CCSC zone??
  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveCcsc && pathCheck && displayNag && (
        <Tile linkedContent={candyCaneSwordCane}>
          <Line>
            <Text as="span" color="red.500">
              You're
            </Text>{" "}
            <Text as="span" color="green.500">
              in a
            </Text>{" "}
            <Text as="span" color="red.500">
              candy
            </Text>{" "}
            <Text as="span" color="green.500">
              cane
            </Text>{" "}
            <Text as="span" color="red.500">
              sword
            </Text>{" "}
            <Text as="span" color="green.500">
              cane
            </Text>{" "}
            <Text as="span" color="red.500">
              noncom
            </Text>{" "}
            <Text as="span" color="green.500">
              zone!
            </Text>
          </Line>
          <Line>
            {ccscEquipped
              ? "Keep your Candy Cane Sword Cane equipped!"
              : "Equip your Candy Cane Sword Cane!"}
          </Line>
        </Tile>
      ),
    }),
    [haveCcsc, pathCheck, displayNag, candyCaneSwordCane, ccscEquipped],
  );

  if (!inRun || !pathCheck || availableOptions.length === 0) {
    return null;
  }

  return (
    <Tile header="Candy Cane Sword Cane NCs" linkedContent={candyCaneSwordCane}>
      <Line>Ensure your CCSC is equipped for useful NCs:</Line>
      <UnorderedList>{availableOptions.map(({ node }) => node)}</UnorderedList>
      {!ccscEquipped && (
        <Line>
          <AdviceTooltip
            text="This is important!"
            label="Equip the Candy Cane Sword Cane!"
          />
        </Line>
      )}
    </Tile>
  );
};

export default CandyCaneSwordCane;
