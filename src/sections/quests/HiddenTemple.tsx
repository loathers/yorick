import { Text } from "@chakra-ui/react";
import { hiddenTempleUnlocked, myMeat } from "kolmafia";
import { $item, have } from "libram";
import React from "react";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { inventoryLink } from "../../util/links";

const HiddenTemple: React.FC = () => {
  if (hiddenTempleUnlocked()) return null;

  const haveItems =
    have($item`Spooky Temple map`) &&
    have($item`Spooky-Gro fertilizer`) &&
    have($item`spooky sapling`);

  return (
    <QuestTile
      header="Find the Hidden Temple"
      imageUrl="/images/itemimages/map.gif"
      href={haveItems ? inventoryLink($item`Spooky Temple map`) : "/woods.php"}
    >
      {!have($item`tree-holed coin`) && !have($item`Spooky Temple map`) && (
        <Line>
          Explore the stream → Squeeze into the cave to obtain the tree-holed
          coin.
        </Line>
      )}
      {have($item`tree-holed coin`) && (
        <Line>
          Brave the dark thicket → Follow the coin → Insert coin to continue to
          obtain the Spooky Temple map.
        </Line>
      )}
      {!have($item`Spooky-Gro fertilizer`) && (
        <Line>
          Brave the dark thicket → Investigate the dense foliage to obtain
          Spooky-Gro fertilizer.
        </Line>
      )}
      {!have($item`spooky sapling`) && (
        <Line>
          Follow the old road → Talk to the hunter → Buy a tree for 100 Meat to
          obtain the spooky sapling.
          {myMeat() < 100 ? (
            <>
              {" "}
              <Text as="b" color="red.500">
                You need 100 meat!
              </Text>
            </>
          ) : null}
        </Line>
      )}
      {haveItems ? (
        <Line>Use your Spooky Temple map!</Line>
      ) : (
        <Line>Maximize -combat to speed things up.</Line>
      )}
    </QuestTile>
  );
};

export default HiddenTemple;
