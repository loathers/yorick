import { Text } from "@chakra-ui/react";
import { availableAmount } from "kolmafia";
import { $item, $skill, get } from "libram";
import React, { Fragment } from "react";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { inventoryLink, skillLink } from "../../util/links";
import { pluralJustDescItem } from "../../util/text";

const luckyAdventureSources: [string, () => React.ReactNode][] = [
  [
    "Hermit",
    () => {
      const cloversAvailableToday = 3 - get("_cloversPurchased");
      const cloversInInventory = availableAmount($item`11-leaf clover`);
      if (cloversAvailableToday <= 0 && cloversInInventory === 0) return null;
      return (
        <Line>
          <Text as="b">{cloversInInventory}</Text>x{" "}
          {pluralJustDescItem($item`11-leaf clover`)}{" "}
          {cloversAvailableToday > 0 && (
            <Line as="span" href="/hermit.php">
              (can grab {cloversAvailableToday} more from Hermit)
            </Line>
          )}
        </Line>
      );
    },
  ],
  [
    "Apriling Sax",
    () => {
      const saxophoneUses = 3 - get("_aprilBandSaxophoneUses");
      if (saxophoneUses <= 0) return null;
      return (
        <Line href={inventoryLink($item`Apriling band saxophone`)}>
          <Text as="b">{saxophoneUses}</Text>x Apriling Sax uses
        </Line>
      );
    },
  ],
  [
    "August Scepter",
    () => {
      const scepterUsed = get("_aug2Cast");
      if (scepterUsed) return null;
      return (
        <Line
          href={skillLink($skill`Aug. 2nd: Find an Eleven-Leaf Clover Day`)}
        >
          <Text as="b">{scepterUsed ? 0 : 1}</Text>x August 16th uses
        </Line>
      );
    },
  ],
  [
    "Energy Drinks",
    () => {
      const energyDrinks =
        6 * availableAmount($item`[10882]carton of astral energy drinks`) +
        availableAmount($item`[10883]astral energy drink`);
      if (energyDrinks <= 0) return null;
      return <Line>{energyDrinks}x energy drinks</Line>;
    },
  ],
];

const LuckyAdventures: React.FC = () => {
  // TODO: suggest actual uses for adventures

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
