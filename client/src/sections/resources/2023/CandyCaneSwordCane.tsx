import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { canAdventure, haveEquipped, myAscensions, myPath } from "kolmafia";
import { $item, $locations, get, have, questStep } from "libram";
import { ReactNode } from "react";

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

  const options: ReactNode[] = [];

  if (!get("_candyCaneSwordLyle")) {
    options.push(
      <ListItem key="lyle">Bonus: Lyle's Monorail Buff (+40% init).</ListItem>,
    );
  }

  if (!get("candyCaneSwordBlackForest") && questStep("questL11Black") < 2) {
    options.push(
      <ListItem key="black">
        Bonus: The Black Forest (+8 exploration).
      </ListItem>,
    );
  }

  if (!get("candyCaneSwordDailyDungeon") && !get("dailyDungeonDone")) {
    options.push(
      <ListItem key="daily">
        Bonus: Daily Dungeon (+1 fat loot token).
      </ListItem>,
    );
  }

  if (
    !get("candyCaneSwordApartmentBuilding") &&
    get("hiddenApartmentProgress") < 8
  ) {
    options.push(
      <ListItem key="apartment">Bonus: Hidden Apartment (+1 Curse).</ListItem>,
    );
  }

  if (
    !get("candyCaneSwordBowlingAlley") &&
    get("hiddenBowlingAlleyProgress") < 7
  ) {
    options.push(
      <ListItem key="bowl">
        Bonus: Hidden Bowling Alley (+1 free bowl).
      </ListItem>,
    );
  }

  if (!get("candyCaneSwordShore") && get("lastIslandUnlock") < myAscensions()) {
    options.push(
      <ListItem key="shore">
        Alternate: Shore (2 scrips for the price of 1).
      </ListItem>,
    );
  }

  if (
    !$locations`Wartime Hippy Camp, Wartime Frat House`.some((l) =>
      canAdventure(l),
    ) &&
    questStep("questL12War") < 1
  ) {
    options.push(
      <ListItem key="hippy">
        Alternate: Hippy Camp (Redirect to the War Start NC).
      </ListItem>,
    );
  }

  if (get("zeppelinProtestors") < 80) {
    options.push(
      <ListItem key="zeppelin">
        Alternate: Zeppelin Protesters{" "}
        <Text as="span" color="purple.500">
          (double Sleaze damage!)
        </Text>
        .
      </ListItem>,
    );
  }

  // FIXME: Actually check if we're in a CCSC zone??
  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveCcsc && pathCheck && (
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
    [haveCcsc, pathCheck, candyCaneSwordCane, ccscEquipped],
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
    </Tile>
  );
};

export default CandyCaneSwordCane;
