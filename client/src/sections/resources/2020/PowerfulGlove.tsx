import { Text } from "@chakra-ui/react";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

/**
 * Summarizes # of glove charges remaining, gives pixel status
 * @returns A tile describing the Powerful Glove
 */

const PowerfulGlove = () => {
  const batteryUsed = get("_powerfulGloveBatteryPowerUsed");

  if (!haveUnrestricted($item`Powerful Glove`) || batteryUsed === 100) {
    return null;
  }

  return (
    <Tile
      header="Powerful Glove"
      imageUrl="/images/itemimages/pglove.gif"
      linkedContent={$item`Powerful Glove`}
    >
      <Line>
        {100 - batteryUsed}% charge{" "}
        {batteryUsed <= 90 && (
          <Text as="span" color="gray.500">
            {`(can replace ${plural(
              Math.floor((100 - batteryUsed) / 10),
              "monster",
            )})`}
          </Text>
        )}
        .
      </Line>
    </Tile>
  );
};

export default PowerfulGlove;
