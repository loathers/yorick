import { Em, List, Separator, Stack, Strong } from "@chakra-ui/react";
import {
  availableAmount,
  equippedItem,
  haveEquipped,
  initiativeModifier,
  itemDropModifier,
  itemType,
  myLocation,
} from "kolmafia";
import {
  $item,
  $location,
  $locations,
  $monster,
  $slot,
  get,
  have,
  questStep,
} from "libram";
import { FC, ReactNode } from "react";

import Line from "../../components/Line";
import LinkBlock from "../../components/LinkBlock";
import Monsters from "../../components/Monsters";
import QuestTile from "../../components/QuestTile";
import Tile from "../../components/Tile";
import { NagPriority } from "../../contexts/NagContext";
import useNag from "../../hooks/useNag";
import { monsterLevelWithPercent } from "../../util/calc";
import { atStep, Step } from "../../util/quest";
import { plural } from "../../util/text";

/**
 * Create the Element for a specific zone. Uses a zone specific message when evil is > 13 and a generic boss fight message when 0 > evil > 14.
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
): ReactNode | null => {
  if (evil === 0) return null;

  return (
    <LinkBlock href="/crypt.php">
      <Line>
        <Strong>{zone}:</Strong>{" "}
        {evil > 13 ? (
          <>
            {evil - 13}/37 evil to boss. <Em>{quickInfo}</Em>
          </>
        ) : (
          "Fight the boss."
        )}
      </Line>
      {evil > 13 && (
        <Stack direction="row">
          <Separator orientation="vertical" />
          <List.Root>
            {zoneStrategy.map((strat, index) => (
              <List.Item key={typeof strat === "string" ? strat : index}>
                {strat}
              </List.Item>
            ))}
          </List.Root>
        </Stack>
      )}
    </LinkBlock>
  );
};

const Level7: FC = () => {
  const evilEye = $item`evil eye`;
  const evilEyeCount = availableAmount(evilEye);
  const evilEyePlural =
    evilEyeCount === 1 ? "evil eye" : evilEyeCount > 1 ? "evil eyes" : "";
  const header = `Use your ${evilEyePlural}`;
  const retroCape = $item`unwrapped knock-off retro superhero cape`;
  const retroCapeEquipped = haveEquipped(retroCape);
  const haveRetroCape = have(retroCape);
  const swordEquipped = itemType(equippedItem($slot`weapon`)) === "sword";
  const inCyrpt =
    $locations`The Defiled Nook, The Defiled Niche, The Defiled Cranny, The Defiled Alcove`.includes(
      myLocation(),
    );

  // get all current evilness
  const nookEvil = get("cyrptNookEvilness");
  const nicheEvil = get("cyrptNicheEvilness");
  const crannyEvil = get("cyrptCrannyEvilness");
  const alcoveEvil = get("cyrptAlcoveEvilness");

  useNag(
    () => ({
      id: "level-7-evil-eye-nag",
      priority: NagPriority.MID,
      imageUrl: "/images/itemimages/zomboeye.gif",
      node: evilEyeCount > 0 && nookEvil > 13 && (
        <Tile header={header} imageUrl="/images/itemimages/zomboeye.gif">
          <Line command={`use ${evilEyeCount} evil eye`}>
            You have {plural(evilEyeCount, "evil eye")}. Use{" "}
            {evilEyeCount === 1 ? "it" : "them"} to reduce Nook evilness by{" "}
            {evilEyeCount * 3}.
          </Line>
        </Tile>
      ),
    }),
    [evilEyeCount, header, nookEvil],
  );

  useNag(
    () => ({
      id: "level-7-retrocape-nag",
      priority: NagPriority.IMMEDIATE,
      imageUrl: "/images/itemimages/retrocape1.gif",
      node: inCyrpt &&
        (nookEvil > 13 ||
          nicheEvil > 13 ||
          crannyEvil > 13 ||
          alcoveEvil > 13) &&
        haveRetroCape &&
        (!retroCapeEquipped || !swordEquipped) && (
          <Tile
            header="Slay the Dead"
            imageUrl="/images/itemimages/retrocape1.gif"
          >
            <Line>
              Equip your retro cape and a sword to clear additional evil.
            </Line>
          </Tile>
        ),
    }),
    [
      alcoveEvil,
      crannyEvil,
      haveRetroCape,
      inCyrpt,
      nicheEvil,
      nookEvil,
      retroCapeEquipped,
      swordEquipped,
    ],
  );

  // get quest status
  const step = questStep("questL07Cyrptic");

  // check if have fire extinguisher and if it's already been used in crypt
  const useFireExtinguisher =
    have($item`industrial fire extinguisher`) &&
    get("_fireExtinguisherCharge") > 20 &&
    !get("fireExtinguisherCyrptUsed");

  const dragonReady =
    nookEvil === 0 && nicheEvil === 0 && crannyEvil === 0 && alcoveEvil === 0;

  let mainElement = <Line>Kill the Bonerdagon.</Line>;

  if (!dragonReady) {
    mainElement = (
      <>
        {useFireExtinguisher && (
          <Line>
            Use Fire Extinguisher: Replace the Chill for -10 evil in one zone.
          </Line>
        )}
        {getZoneDisplay("Nook", nookEvil, "+item drop, banish", [
          `${Math.min(100, (1 + itemDropModifier() / 100) * 20).toFixed(
            0,
          )}% chance of evil eyes.`,
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
          `~${Math.max(3, Math.sqrt(Math.max(monsterLevelWithPercent(), 0))).toFixed(
            1,
          )} evil per swarm of ghuol whelps`,
          "Pick 4th option in NC.",
        ])}
        {getZoneDisplay("Alcove", alcoveEvil, "+init, -combat", [
          `${Math.min(100, (150 + initiativeModifier()) / 10).toFixed(
            1,
          )}% chance of modern zmobie (${Math.ceil(
            (alcoveEvil - 13) / 5,
          )} needed)`,
          "Pick 4th option in NC.",
        ])}
      </>
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
        [1, "/council.php"],
      ])}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [Step.STARTED, mainElement],
        [1, <Line>Visit Council to finish quest.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level7;
