import { Text } from "@chakra-ui/react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useAvailableAmount } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";

/**
 * Summarizes # of glove charges remaining, gives pixel status
 * @returns A tile describing the Powerful Glove
 */

const PowerfulGlove = () => {
  const batteryUsed = useGet("_powerfulGloveBatteryPowerUsed");
  const numReds = useAvailableAmount($item`red pixel`) ?? 0;
  const numBlues = useAvailableAmount($item`blue pixel`) ?? 0;
  const numGreens = useAvailableAmount($item`green pixel`) ?? 0;
  const numWhites = useAvailableAmount($item`white pixel`) ?? 0;
  const numDigitalKey = useAvailableAmount($item`digital key`) ?? 0;

  // How many whites you'd have if you converted all RBG pixels
  const possibleWhites = Math.min(numReds, numBlues, numGreens) + numWhites;

  return (
    <Tile
      header="Powerful Glove"
      imageUrl="/images/itemimages/Pglove.gif"
      linkedContent={$item`Powerful Glove`}
      hide={!useHave($item`Powerful Glove`)}
    >
      {batteryUsed < 100 && (
        <Line>{100 - batteryUsed}% charge remaining today.</Line>
      )}
      {batteryUsed < 95 && (
        <Line>
          <Text as="span" color="gray.500">
            {Math.floor((100 - batteryUsed) / 10)} shots of replace monster.
          </Text>
        </Line>
      )}

      {possibleWhites < 30 && (
        <Line>
          Pixels:{" "}
          <Text as="span" color="red.500">
            {numReds}R,{" "}
          </Text>
          <Text as="span" color="Blue.500">
            {numBlues}B,{" "}
          </Text>
          <Text as="span" color="Green.500">
            {numGreens}G
          </Text>
        </Line>
      )}
      {possibleWhites < 30 && (
        <Line>
          Overall, {plural(numWhites, "white")} ({possibleWhites} if you convert
          RBG.)
        </Line>
      )}
      {possibleWhites > 30 && numDigitalKey < 1 && (
        <Line href="/place.php?whichplace=forestvillage&action=fv_mystic">
          You have enough white pixels! Go make a key.
        </Line>
      )}
    </Tile>
  );
};

export default PowerfulGlove;
