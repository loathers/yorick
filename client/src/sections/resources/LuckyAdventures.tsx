import { Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { availableAmount } from "kolmafia";
import { $item, get } from "libram";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { pluralJustDescItem } from "../../util/text";

const luckyAdventureSources: [string, () => React.ReactNode][] = [
  [
    "Hermit",
    () => {
      const cloversAvailableToday = 3 - Number(get("_cloversPurchased", false));
      const cloversInInventory = availableAmount($item`11-leaf clover`);
      if (cloversAvailableToday <= 0 && cloversInInventory == 0) return null;
      return (
        <Line>
          <Text as="b">{cloversInInventory}</Text>x {pluralJustDescItem($item`11-leaf clover`)} {cloversAvailableToday > 0 && (<Line as="span" href="/hermit.php">(can grab {cloversAvailableToday} more from Hermit)</Line>)}
        </Line>
      );
    }
  ]
]

const LuckyAdventures: React.FC = () => {
  // TODO: suggest actual uses for adventures

  const renderedSources = luckyAdventureSources.map(([name, source]) => {
    const rendered = source();
    return rendered ? <Fragment key={name}>{rendered}</Fragment> : false;
  });

  return renderedSources.some((source) => source) ? (
  <Tile
      header="Lucky Adventures"
      imageUrl="/images/itemimages/11leafclover.gif">
      {renderedSources}
  </Tile>
  ) : (<></>);
};

export default LuckyAdventures;