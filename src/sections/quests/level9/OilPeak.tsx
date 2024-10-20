import { Text } from "@chakra-ui/react";
import {
  availableAmount,
  equippedAmount,
  itemDropModifier,
  monsterLevelAdjustment,
  myPathId,
} from "kolmafia";
import { $item, get, have, questStep } from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { commaSeparate } from "../../../util/text";

const OilPeak = () => {
  const step = questStep("questL09Topping");
  const lit = get("oilPeakLit");

  const ml = monsterLevelAdjustment();
  const pressure = get("oilPeakProgress");
  const needJar =
    availableAmount($item`jar of oil`) === 0 &&
    availableAmount($item`bubblin' crude`) < 12 &&
    get("twinPeakProgress", 0) < 4 &&
    myPathId() !== 4; // Bees Hate You

  let pressureReduction = 6.34;
  if (ml >= 100) {
    pressureReduction = 63.4;
  } else if (ml >= 50) {
    pressureReduction = 31.7;
  } else if (ml >= 20) {
    pressureReduction = 19.02;
  }
  if (equippedAmount($item`dress pants`) > 0) pressureReduction += 6.34;

  const dropRates = [100];
  if (ml >= 50) dropRates.push(30);
  if (ml >= 100 || (ml < 50 && ml >= 20)) dropRates.push(10);
  const itemDropRate = (100 + itemDropModifier()) / 100;
  const crudePA = dropRates.reduce(
    (prev, cur) => prev + Math.min(1, (cur / 100) * itemDropRate),
    0,
  );

  if (lit && !needJar) return null;

  return (
    <QuestTile
      header={!lit ? "Light Oil Peak" : "Find More Oil"}
      id="oil-peak-quest"
      imageUrl="/images/adventureimages/oilslick.gif"
      minLevel={9}
      href="/place.php?whichplace=highlands"
      disabled={step < 2}
    >
      <Line>
        <Text as="i">
          {commaSeparate([
            "100ML",
            needJar && "+item",
            needJar &&
              have($item`Duskwalker syringe`) &&
              "use Duskwalker syringe in combat",
          ])}
        </Text>
      </Line>
      {((needJar && ml < 100) || pressure > 0) && (
        <Line>
          {ml} ML{ml >= 100 ? null : " of 20/50/100"}.
          {pressure > 0 &&
            ` ${Math.ceil(pressure / pressureReduction)} turns left.`}
        </Line>
      )}
      {needJar && (
        <Line>
          +item for {} more bubbling' crude. ~{crudePA} crude/adv.
        </Line>
      )}
    </QuestTile>
  );
};

export default OilPeak;
