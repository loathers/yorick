import { Text } from "@chakra-ui/react";
import { availableAmount } from "kolmafia";
import { $effect, $item, $skill, get, have } from "libram";
import React, { Fragment } from "react";

import Line from "../../components/Line";
import MainLink from "../../components/MainLink";
import { Quantity } from "../../components/Quantity";
import Tile from "../../components/Tile";
import { NagPriority } from "../../contexts/NagContext";
import useNag from "../../hooks/useNag";
import { haveUnrestricted } from "../../util/available";
import { inventoryLink, skillLink } from "../../util/links";

const luckyAdventureSources: [string, () => React.ReactNode][] = [
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
            <Quantity count={cloversInInventory} thing={clover} />
          </MainLink>
          {cloversAvailableToday > 0 && (
            <>
              {" "}
              <MainLink href="/hermit.php">
                (can grab {cloversAvailableToday} more from Hermit)
              </MainLink>
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
          <Quantity count={saxophoneUses} thing={saxophone} verb="use" />
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
          <Quantity count={!aug2Used} thing={aug2Skill} />
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
          <Text as="b">{energyDrinks}</Text> energy drinks
        </Line>
      );
    },
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

  return renderedSources.some((source) => source) ? (
    <Tile
      header="Lucky Adventures"
      imageUrl="/images/itemimages/11leafclover.gif"
    >
      {renderedSources}
    </Tile>
  ) : (
    <></>
  );
};

export default LuckyAdventures;
