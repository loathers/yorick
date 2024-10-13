import {
  Divider,
  HStack,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import {
  availableAmount,
  initiativeModifier,
  itemDropModifier,
  monsterLevelAdjustment,
} from "kolmafia";
import { $item, $location, $monster, get, have, questStep } from "libram";
import { ReactNode } from "react";

import Line from "../../components/Line";
import MainLink from "../../components/MainLink";
import Monsters from "../../components/Monsters";
import QuestTile from "../../components/QuestTile";
import Tile from "../../components/Tile";
import { NagPriority } from "../../contexts/NagContext";
import useNag from "../../hooks/useNag";
import { atStep, Step } from "../../util/quest";
import { plural } from "../../util/text";

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
  zoneStrategy: ReactNode[],
): JSX.Element | undefined => {
  if (evil > 0) {
    return (
      <MainLink href="/crypt.php">
        <b>{zone}:</b> {evil}/50 evil. <i>{quickInfo}</i>
        <HStack>
          <Divider orientation="vertical" />
          {evil > 13 ? (
            <UnorderedList>
              {zoneStrategy.map((strat, index) => (
                <ListItem key={typeof strat === "string" ? strat : index}>
                  {strat}
                </ListItem>
              ))}
            </UnorderedList>
          ) : (
            <Line>Fight the boss.</Line>
          )}
        </HStack>
      </MainLink>
    );
  }
};

const Level7 = () => {
  const evilEye = $item`evil eye`;
  const evilEyeCount = availableAmount(evilEye);
  const evilEyePlural =
    evilEyeCount === 1 ? "evil eye" : evilEyeCount > 1 ? "evil eyes" : "";
  const header = `Use your ${evilEyePlural}`;
  const nookEvilness = get("cyrptNookEvilness");
  const cyrptBossEvilness = 13;

  useNag(
    () => ({
      id: "level-7-evil-eye-nag",
      priority: NagPriority.MID,
      node: evilEyeCount > 0 && nookEvilness > cyrptBossEvilness + 1 && (
        <Tile
          header={header}
          imageUrl="/images/itemimages/zomboeye.gif"
          linkedContent={$item`evil eye`}
        >
          <Line>
            You have {plural(evilEyeCount, "evil eye")}. Use{" "}
            {evilEyeCount === 1 ? "it" : "them"} to reduce Nook evilness by{" "}
            {evilEyeCount * 3}.
          </Line>
        </Tile>
      ),
    }),
    [cyrptBossEvilness, evilEyeCount, header, nookEvilness],
  );

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
        <Stack>
          {useFireExtinguisher && (
            <Line>
              Use Fire Extinguisher: Replace the Chill for -10 evil in one zone.
            </Line>
          )}
          {getZoneDisplay("Nook", nookEvil, "+item drop, banish", [
            `${Math.min(100, (1 + itemDropModifier() / 100) * 20).toFixed(
              0,
            )}% chance of evil eyes`,
          ])}
          {getZoneDisplay("Niche", nicheEvil, "sniff dirty old lihc, banish", [
            "banish all but dirty old lihc",
            // TODO: Something wrong with this...
            <Monsters
              location={$location`The Defiled Niche`}
              target={$monster`dirty old lihc`}
            />,
          ])}
          {getZoneDisplay("Cranny", crannyEvil, "+ML, -combat", [
            `~${Math.max(3, Math.sqrt(monsterLevelAdjustment())).toFixed(
              1,
            )} evil per swarm of ghuol whelps`,
            "Pick 4th option in NC.",
          ])}
          {getZoneDisplay("Alcove", alcoveEvil, "+init, -combat", [
            `${Math.min(100, 15 + initiativeModifier() / 10).toFixed(
              0,
            )}% chance of modern zmobie (${Math.ceil(
              (alcoveEvil - 25) / 5,
            )} needed)`,
            "Pick 4th option in NC.",
          ])}
        </Stack>
      </HStack>
    );
  }

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Undefile the Cyrpt"
      imageUrl="/images/adventureimages/foss_wyrm.gif"
      minLevel={7}
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [
          Step.STARTED,
          get("cyrptTotalEvilness") !== 0 ? "/crypt.php" : undefined,
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
