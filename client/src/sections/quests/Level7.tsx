import {
  initiativeModifier,
  itemDropModifier,
  monsterLevelAdjustment,
} from "kolmafia";
import { $item, get, have, questStep } from "libram";
import { Divider, HStack, Link, List, ListItem, Stack } from "@chakra-ui/react";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";

/**
 * Create the Element for a specific zone. Uses a zone specific message when evil is > 25 and a generic boss fight message when 0 > evil > 25.
 * @param zone the zone
 * @param evil current evil count for the zone
 * @param zoneStrategy strategy text for the zone
 * @returns JSX.Element | undefined
 */
const getZoneDisplay = (
  zone: string,
  evil: number,
  quickInfo: string,
  zoneStrategy: string[]
): JSX.Element | undefined => {
  if (evil > 0) {
    return (
      <Link href="/crypt.php">
        <b>{zone}:</b> {evil}/50 evil. <i>{quickInfo}</i>
        <HStack>
          <Divider orientation="vertical" />
          {evil > 25 ? (
            <List>
              {zoneStrategy.map((strat) => (
                <ListItem key={strat}>{strat}</ListItem>
              ))}
            </List>
          ) : (
            <Line>Fight the boss.</Line>
          )}
        </HStack>
      </Link>
    );
  }
};

const Level7 = () => {
  // get quest status
  const step = questStep("questL07Cyrptic");

  // check if have fire extinguisher and if it's already been used in crypt
  const useFireExtinguisher =
    have($item`industrial fire extinguisher`) &&
    get("_fireExtinguisherCharge") > 20 &&
    !get("fireExtinguisherCyrptUsed");

  // get all current evilness
  const nookEvil = get("cyrptNookEvilness", 0);
  const nicheEvil = get("cyrptNicheEvilness", 0);
  const crannyEvil = get("cyrptCrannyEvilness", 0);
  const alcoveEvil = get("cyrptAlcoveEvilness", 0);

  const dragonReady =
    nookEvil === 0 && nicheEvil === 0 && crannyEvil === 0 && alcoveEvil === 0;

  let mainElement = <Line>Kill the Bonerdagon</Line>;
  if (!dragonReady) {
    mainElement = (
      <HStack>
        <Divider orientation="vertical" />
        <Stack>
          {useFireExtinguisher && (
            <Line>
              Use Fire Extinguisher: Replace the Chill for -10 evil in one zone.
            </Line>
          )}
          {getZoneDisplay("Nook", nookEvil, "+item drop, banish", [
            `${Math.min(100, (1 + itemDropModifier() / 100) * 20).toFixed(
              0
            )}% chance of evil eyes`,
          ])}
          {getZoneDisplay("Niche", nicheEvil, "sniff dirty old lihc, banish", [
            "banish all but dirty old lihc",
          ])}
          {getZoneDisplay("Cranny", crannyEvil, "+ML, -combat", [
            `~${Math.max(3, Math.sqrt(monsterLevelAdjustment())).toFixed(
              1
            )} evil per swarm of ghuol whelps`,
            "Pick 4th option in NC.",
          ])}
          {getZoneDisplay("Alcove", alcoveEvil, "+init, -combat", [
            `${Math.min(100, 15 + initiativeModifier() / 10).toFixed(
              0
            )}% chance of modern zmobie (${Math.ceil(
              (alcoveEvil - 25) / 5
            )} needed)`,
            "Pick 4th option in NC.",
          ])}
        </Stack>
      </HStack>
    );
  }

  return (
    <QuestTile
      header="Undefile the Cyrpt"
      imageUrl="/images/adventureimages/foss_wyrm.gif"
      minLevel={7}
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [
          Step.STARTED,
          get("cyrptTotalEvilness") === 0 ? "/crypt.php" : undefined,
        ],
        [Step.FINISHED, undefined],
      ])}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [Step.STARTED, mainElement],
      ])}
    </QuestTile>
  );
};

export default Level7;
