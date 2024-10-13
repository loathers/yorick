import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { combatRateModifier, myHash, myLocation } from "kolmafia";
import { $location, $skill, have, questStep } from "libram";

import Chevrons from "../../components/Chevrons";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { turnsToSeeSingleNoncombatCapped } from "../../util/calc";
import { atStep, Step } from "../../util/quest";

const Level6: React.FC = () => {
  const step = questStep("questL06Friar");
  const hash = myHash();
  const hasCartography = have($skill`Comprehensive Cartography`);
  const combatModifier = combatRateModifier() ?? 0;

  const darkNeck = $location`The Dark Neck of the Woods`;
  const darkHeart = $location`The Dark Heart of the Woods`;
  const darkElbow = $location`The Dark Elbow of the Woods`;

  const friarZones = {
    "Dark Neck": darkNeck,
    "Dark Heart": darkHeart,
    "Dark Elbow": darkElbow,
  };

  const inZone = [darkNeck, darkHeart, darkElbow].includes(myLocation());

  const listItems = Object.entries(friarZones).map(([zoneName, zone]) => {
    const zoneQueue = zone.noncombatQueue?.split(";")?.filter((s) => s) ?? [];
    const ncCompleted =
      zoneQueue.length + (zone === darkNeck && hasCartography ? 1 : 0);

    const progress = Math.max(
      0,
      zone.turnsSpent - zone.lastNoncombatTurnsSpent,
    );
    const cap = Math.max(0, (zoneQueue.length === 0 ? 6 : 5) - progress);
    const expectedThisNc = turnsToSeeSingleNoncombatCapped(95, cap - progress);
    const expected =
      expectedThisNc +
      Math.max(0, 3 - ncCompleted) * turnsToSeeSingleNoncombatCapped(95, 5);
    return (
      <ListItem key={zoneName} pl="1">
        <ListIcon as={Chevrons} usesLeft={ncCompleted} totalUses={4} />
        <b>{zoneName}:</b>{" "}
        {`${zoneQueue.length}/4 NCs (~${expected.toFixed(1)} turns remaining)`}
      </ListItem>
    );
  });

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Deep Fat Friars"
      imageUrl="/images/itemimages/dodecagram.gif"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, `/friars.php?action=friars&pwd=${hash}`], // I don't know why this requires a hash, but it does.
        [1, "/friars.php?"],
        [2, `/friars.php?action=ritual&pwd=${hash}`],
        [Step.FINISHED, undefined],
      ])}
      minLevel={6}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED && 1,
          <>
            {inZone && combatModifier > -25 && (
              <Line fontWeight="bold" color="red.500">
                Your -combat% is less than 25%, you want more!
              </Line>
            )}
            <List>{listItems}</List>
          </>,
        ],
        [2, <Line>Conduct the ritual to finish the quest.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level6;
