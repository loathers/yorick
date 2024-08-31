import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { canAdventure, haveEquipped, myAscensions, myPath } from "kolmafia";
import { $item, $locations, get, questStep } from "libram";
import { ReactNode } from "react";

import DynamicItemLink from "../../../components/DynamicItemLinks";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";

const CandyCaneSwordCane = () => {
  const candyCaneSwordCane = $item`candy cane sword cane`;
  const ccscEquipped = haveEquipped(candyCaneSwordCane);
  const ccscEquipStatement = ccscEquipped
    ? "Keep your Candy Cane Sword Cane equipped!"
    : "Equip your Candy Cane Sword Cane!";

  const inRun = get("kingLiberated") === false;
  const pathCheck = ![
    "Community Service",
    "Grey Goo",
    "Avatar of Boris",
  ].includes(myPath().name);

  const options: ReactNode[] = [];

  if (!get("_candyCaneSwordLyle")) {
    options.push(<ListItem>Bonus: Lyle's Monorail Buff (+40% init).</ListItem>);
  }

  if (!get("candyCaneSwordBlackForest") && questStep("questL11Black") < 2) {
    options.push(
      <ListItem>Bonus: The Black Forest (+8 exploration).</ListItem>,
    );
  }

  if (!get("candyCaneSwordDailyDungeon") && !get("dailyDungeonDone")) {
    options.push(
      <ListItem>Bonus: Daily Dungeon (+1 fat loot token).</ListItem>,
    );
  }

  if (
    !get("candyCaneSwordApartmentBuilding") &&
    get("hiddenApartmentProgress") < 8
  ) {
    options.push(<ListItem>Bonus: Hidden Apartment (+1 Curse).</ListItem>);
  }

  if (
    !get("candyCaneSwordBowlingAlley") &&
    get("hiddenBowlingAlleyProgress") < 7
  ) {
    options.push(
      <ListItem>Bonus: Hidden Bowling Alley (+1 free bowl).</ListItem>,
    );
  }

  if (!get("candyCaneSwordShore") && get("lastIslandUnlock") < myAscensions()) {
    options.push(
      <ListItem>Alternate: Shore (2 scrips for the price of 1).</ListItem>,
    );
  }

  if (
    !$locations`Wartime Hippy Camp, Wartime Frat House`.some((l) =>
      canAdventure(l),
    ) &&
    questStep("questL12War") < 1
  ) {
    options.push(
      <ListItem>
        Alternate: Hippy Camp (Redirect to the War Start NC).
      </ListItem>,
    );
  }

  if (get("zeppelinProtestors") < 80) {
    options.push(
      <ListItem>
        Alternate: Zeppelin Protesters{" "}
        <Text as="span" color="purple.500">
          (double Sleaze damage!)
        </Text>
        .
      </ListItem>,
    );
  }

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: ccscEquipped && (
        <Tile
          header="Candy Cane Sword Cane"
          imageUrl="/images/itemimages/candycanesword.gif"
        >
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
          <Line>{ccscEquipStatement}</Line>
        </Tile>
      ),
    }),
    [ccscEquipStatement, ccscEquipped],
  );

  if (!inRun || !pathCheck || options.length === 0) {
    return null;
  }

  return (
    <Tile header="Candy Cane Sword Cane NCs" linkedContent={candyCaneSwordCane}>
      <Line>Ensure your CCSC is equipped for useful NCs:</Line>
      <UnorderedList>{options}</UnorderedList>
      {!ccscEquipped && (
        <Line>
          <AdviceTooltip
            text="This is important!"
            label="Equip the Candy Cane Sword Cane!"
          />
        </Line>
      )}
      <Line>
        <DynamicItemLink linkedContent={candyCaneSwordCane}>
          Manage your CCSC
        </DynamicItemLink>
        .
      </Line>
    </Tile>
  );
};

export default CandyCaneSwordCane;
