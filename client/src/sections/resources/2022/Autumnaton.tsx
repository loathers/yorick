import {
  Heading,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import {
  availableAmount,
  canAdventure,
  inBadMoon,
  isUnrestricted,
  myPath,
  totalTurnsPlayed,
} from "kolmafia";
import { $item, $location, $path, get, have, questStep } from "libram";

import DynamicItemLinks from "../../../components/DynamicItemLinks";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";

const Autumnaton = () => {
  const autumnatonItem = $item`autumn-aton`;
  const haveAutumnatonItem = have(autumnatonItem);
  const hasAutumnaton = get("hasAutumnaton");
  const currentPath = myPath();
  const autobotsToday = get("_autumnatonQuests");
  const turncountWhereAutobotReturns = get("autumnatonQuestTurn");
  const autumnatonUpgrades = get("autumnatonUpgrades");
  const autumnatonQuestLocation = get("autumnatonQuestLocation");

  let adjustedAutobotsToday = autobotsToday;
  if (autumnatonUpgrades.includes("leftleg1")) {
    adjustedAutobotsToday -= 1;
  }
  if (autumnatonUpgrades.includes("rightleg1")) {
    adjustedAutobotsToday -= 1;
  }

  const autobotsReturnTime =
    adjustedAutobotsToday < 1 ? 11 : adjustedAutobotsToday * 11;

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveAutumnatonItem && (
        <Tile
          header="Use your autumn-aton"
          imageUrl="/images/itemimages/autumn-aton.gif"
        >
          <Line>
            Next use will take{" "}
            <Text as="b" color="red.500">
              {autobotsReturnTime}
            </Text>{" "}
            adventures.
          </Line>
        </Tile>
      ),
    }),
    [autobotsReturnTime, haveAutumnatonItem],
  );

  if (
    !hasAutumnaton ||
    !isUnrestricted(autumnatonItem) ||
    currentPath === $path`Legacy of Loathing` ||
    currentPath.id === 37 ||
    inBadMoon()
  ) {
    return null;
  }

  const description: JSX.Element[] = [];

  description.push(
    <Line>Autobot grabs items from a zone you've previously visited.</Line>,
  );

  if (have(autumnatonItem)) {
    description.push(
      <Line>
        Next use will take{" "}
        <Text as="span" fontWeight="bold" color="red.500">
          {autobotsReturnTime}
        </Text>{" "}
        adventures.
      </Line>,
    );
  } else if (turncountWhereAutobotReturns > totalTurnsPlayed()) {
    description.push(
      <Line>
        Will return in{" "}
        <Text as="span" fontWeight="bold" color="red.500">
          {turncountWhereAutobotReturns + 1 - totalTurnsPlayed()}
        </Text>{" "}
        adventures.
      </Line>,
    );
    description.push(
      <Line>
        <Text as="b">
          Currently exploring: {autumnatonQuestLocation?.identifierString}
        </Text>
      </Line>,
    );
  } else if (turncountWhereAutobotReturns <= totalTurnsPlayed()) {
    description.push(
      <Line>
        Next mission takes{" "}
        <Text as="span" fontWeight="bold" color="red.500">
          {autobotsReturnTime}
        </Text>{" "}
        adventures.
      </Line>,
    );
  }

  const upgradesToGet: string[] = [];
  if (!autumnatonUpgrades.includes("cowcatcher")) {
    upgradesToGet.push(
      "Visit mid underground for +1 autumn item (Cyrpt zone, Daily Dungeon?)",
    );
  }
  if (!autumnatonUpgrades.includes("leftarm1")) {
    upgradesToGet.push("Visit low indoor for +1 item (Haunted Pantry?)");
  }
  if (!autumnatonUpgrades.includes("rightarm1")) {
    upgradesToGet.push(
      "Visit mid outdoor for +1 item (Vanya's Castle, Smut Orc Camp?)",
    );
  }
  if (!autumnatonUpgrades.includes("leftleg1")) {
    upgradesToGet.push("Visit low underground for -11 cooldown (Ratbats?)");
  }
  if (!autumnatonUpgrades.includes("rightleg1")) {
    upgradesToGet.push("Visit mid indoor for -11 cooldown (Haunted Library?)");
  }

  if (upgradesToGet.length > 0) {
    description.push(
      <UnorderedList>
        {upgradesToGet.map((text) => (
          <ListItem key={text}>{text}</ListItem>
        ))}
      </UnorderedList>,
    );
  }

  const potentialTargets: [string, string][] = [];
  if (get("_inRunBool") && currentPath.id !== 25) {
    if (
      canAdventure($location`Sonofa Beach`) &&
      get("sidequestLighthouseCompleted") === "none" &&
      availableAmount($item`barrel of gunpowder`) < 5
    ) {
      potentialTargets.push(["barrel of gunpowder", "Sonofa Beach"]);
    }
    if (
      !canAdventure($location`Twin Peak`) &&
      get("chasmBridgeProgress") < 30
    ) {
      potentialTargets.push(["bridge parts", "The Smut Orc Logging Camp"]);
    }
    if (
      get("hiddenBowlingAlleyProgress") + availableAmount($item`bowling ball`) <
      6
    ) {
      potentialTargets.push(["bowling balls", "The Hidden Bowling Alley"]);
    }
    if (
      get("twinPeakProgress") < 14 &&
      availableAmount($item`jar of oil`) < 1 &&
      availableAmount($item`bubblin' crude`) < 12
    ) {
      potentialTargets.push(["bubblin' crude", "Oil Peak"]);
    }
    if (
      get("desertExploration") < 100 &&
      availableAmount($item`killing jar`) < 1 &&
      (get("gnasirProgress") & 4) === 0
    ) {
      potentialTargets.push(["killing jar", "The Haunted Library"]);
    }
    if (canAdventure($location`The Oasis`) && get("desertExploration") < 100) {
      potentialTargets.push(["drum machine", "An Oasis"]);
    }
    if (questStep("questL11Ron") < 5) {
      potentialTargets.push(["glark cables", "The Red Zeppelin"]);
    }
  }

  if (potentialTargets.length > 0) {
    description.push(
      <AdviceTooltip
        text={
          <VStack align="start">
            <Heading size="sm">Potential Targets</Heading>
            {potentialTargets.map(([item, location]) => (
              <Text key={item}>
                <DynamicItemLinks linkedContent={$item`${item}`} /> ({location})
              </Text>
            ))}
          </VStack>
        }
        label="Potential Autumnaton Targets"
      />,
    );
  }

  return (
    <Tile
      header="Autumn-aton"
      imageUrl="/images/itemimages/autumn-aton.gif"
      linkedContent={autumnatonItem}
    >
      {description}
    </Tile>
  );
};

export default Autumnaton;
