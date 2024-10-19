import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, toItem } from "kolmafia";
import {
  $effect,
  $item,
  $items,
  $location,
  $skill,
  get,
  have,
  questStep,
} from "libram";
import { Fragment, ReactNode } from "react";

import AsyncLink from "../../components/AsyncLink";
import Line from "../../components/Line";
import MainLink from "../../components/MainLink";
import Tile from "../../components/Tile";
import { NagPriority } from "../../contexts/NagContext";
import useNag from "../../hooks/useNag";
import { haveUnrestricted } from "../../util/available";
import { inventoryLink, parentPlaceLink, skillLink } from "../../util/links";
import { pluralJustDescItem } from "../../util/text";

const luckyAdventureSources: [string, () => ReactNode][] = [
  [
    "Hermit",
    () => {
      const clover = $item`11-leaf clover`;
      const cloversAvailableToday = 3 - get("_cloversPurchased");
      const cloversInInventory = availableAmount(clover);
      if (cloversAvailableToday <= 0 && cloversInInventory === 0) return null;
      return (
        <Line>
          <MainLink href={inventoryLink(clover)}>
            <Text as="b">{cloversInInventory}</Text>x{" "}
            {pluralJustDescItem(clover)}
          </MainLink>
          {cloversAvailableToday > 0 && (
            <>
              {" "}
              <AsyncLink
                command={`coinmaster buy hermit ${cloversAvailableToday} 11-leaf clover`}
              >
                (can grab {cloversAvailableToday} more from Hermit)
              </AsyncLink>
            </>
          )}
          .
        </Line>
      );
    },
  ],
  [
    "Apriling Sax",
    () => {
      const saxophone = $item`Apriling band saxophone`;
      const saxophoneUses = 3 - get("_aprilBandSaxophoneUses");
      if (!haveUnrestricted(saxophone) || saxophoneUses <= 0) return null;
      return (
        <Line href={inventoryLink(saxophone)}>
          <Text as="b">{saxophoneUses}</Text>x Apriling Sax uses.
        </Line>
      );
    },
  ],
  [
    "August Scepter",
    () => {
      const aug2Skill = $skill`Aug. 2nd: Find an Eleven-Leaf Clover Day`;
      const aug2Used = get("_aug2Cast");
      if (!haveUnrestricted(aug2Skill) || aug2Used) return null;
      return (
        <Line href={skillLink(aug2Skill)}>
          <Text as="b">{aug2Used ? 0 : 1}</Text>x August 16th uses.
        </Line>
      );
    },
  ],
  [
    "Energy Drinks",
    () => {
      const carton = $item`[10882]carton of astral energy drinks`;
      const drink = $item`[10883]astral energy drink`;
      const energyDrinks = 6 * availableAmount(carton) + availableAmount(drink);
      if (energyDrinks <= 0) return null;
      return (
        <Line href={inventoryLink(have(drink) ? drink : carton)}>
          <Text as="b">{energyDrinks}</Text>x energy drinks
        </Line>
      );
    },
  ],
];

const WAND_INGREDIENTS = $items`ruby W, metallic A, lowercase N, heavy D`;
const luckyAdventureUses: [string, () => ReactNode][] = [
  [
    "Wand",
    () => {
      const haveWand = have($item`Wand of Nagamar`);
      const haveIngredients = WAND_INGREDIENTS.every((item) => have(item));
      const basement = $location`The Castle in the Clouds in the Sky (Basement)`;

      return (
        !haveWand &&
        !haveIngredients && (
          <MainLink href={parentPlaceLink(basement)}>
            Castle Basement: Wand of Nagamar ingredients.
          </MainLink>
        )
      );
    },
  ],
  [
    "Zeppelin",
    () => {
      if (questStep("questL11Ron") >= 2) return null;
      return (
        <MainLink
          href={parentPlaceLink($location`A Mob of Zeppelin Protesters`)}
        >
          Zeppelin Mob: Choose NC (sleaze, Whatshisname, lynyrdness).
        </MainLink>
      );
    },
  ],
  [
    "A-Boo Peak",
    () =>
      !get("booPeakLit") && (
        <MainLink href={parentPlaceLink($location`A-Boo Peak`)}>
          A-Boo Peak: Get 2 A-Boo clues.
        </MainLink>
      ),
  ],
  [
    "Smut Orc Logging Camp",
    () =>
      get("chasmBridgeProgress") < 30 && (
        <MainLink href={parentPlaceLink($location`The Smut Orc Logging Camp`)}>
          Smut Orcs: Get 3 lumber and 3 fasteners.
        </MainLink>
      ),
  ],
  [
    "Itznotyerzitz Mine",
    () =>
      questStep("questL08Trapper") <= 1 &&
      availableAmount(toItem(get("trapperOre") || "none")) < 3 && (
        <MainLink href={parentPlaceLink($location`Itznotyerzitz Mine`)}>
          Mine: Get one of each type of ore.
        </MainLink>
      ),
  ],
  [
    "Castle Top Floor",
    () =>
      get("sidequestNunsCompleted") === "none" && (
        <MainLink
          href={parentPlaceLink(
            $location`The Castle in the Clouds in the Sky (Top Floor)`,
          )}
        >
          Castle Top Floor: Get inhaler, +200% meat potion for Nuns.
        </MainLink>
      ),
  ],
  [
    "Oasis",
    () =>
      get("desertExploration") < 100 && (
        <MainLink href={parentPlaceLink($location`The Oasis`)}>
          Oasis: Get 20 turns of Ultrahydrated.
        </MainLink>
      ),
  ],
];

const LuckyAdventures: React.FC = () => {
  // TODO: suggest actual uses for adventures

  const isLucky = have($effect`Lucky!`);

  useNag(
    () => ({
      id: "lucky-adventures-nag",
      priority: NagPriority.HIGH,
      node: isLucky && (
        <Tile
          header="You're lucky!"
          imageUrl="/images/itemimages/11leafclover.gif"
        >
          <Line color="green.500">Next adventure will be a lucky one.</Line>
        </Tile>
      ),
    }),
    [isLucky],
  );

  const renderedSources = luckyAdventureSources.map(([name, source]) => {
    const rendered = source();
    return rendered ? <Fragment key={name}>{rendered}</Fragment> : false;
  });

  const renderedUses = luckyAdventureUses.map(([name, use]) => {
    const rendered = use();
    return rendered ? <ListItem key={name}>{rendered}</ListItem> : false;
  });

  return renderedSources.some((source) => source) ? (
    <Tile
      header="Lucky Adventures"
      imageUrl="/images/itemimages/11leafclover.gif"
    >
      {renderedSources}
      {renderedUses.some((use) => use) ? (
        <>
          <Line>Ideas for uses:</Line>
          <UnorderedList>{renderedUses}</UnorderedList>
        </>
      ) : (
        <Line>No ideas for how to use these. Get creative!</Line>
      )}
    </Tile>
  ) : null;
};

export default LuckyAdventures;
