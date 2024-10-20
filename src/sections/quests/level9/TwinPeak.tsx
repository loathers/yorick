import {
  availableAmount,
  familiarEquippedEquipment,
  familiarWeight,
  initiativeModifier,
  itemDropModifier,
  myFamiliar,
  myHash,
  numericModifier,
} from "kolmafia";
import { $item, get, have, questStep } from "libram";

import Chevrons from "../../../components/Chevrons";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import Requirement from "../../../components/Requirement";

const TwinPeak = () => {
  const step = questStep("questL09Topping");
  const res = Math.floor(numericModifier("stench resistance"));
  const jars = availableAmount($item`jar of oil`);
  const init = initiativeModifier();
  const haveTrimmers = have($item`rusty hedge trimmers`);

  const progress = get("twinPeakProgress");
  const stenchDone = (progress & 1) > 0;
  const itemDone = (progress & 2) > 0;
  const jarDone = (progress & 4) > 0;
  const initDone = (progress & 8) > 0;

  const famWeight =
    familiarWeight(myFamiliar()) + numericModifier("familiar weight");
  const equipWeight = numericModifier(
    familiarEquippedEquipment(myFamiliar()),
    "familiar weight",
  );
  const famItemDrop = numericModifier(
    myFamiliar(),
    "item drop",
    famWeight - equipWeight,
    familiarEquippedEquipment(myFamiliar()),
  );
  const nonFamItemDrop =
    itemDropModifier() - famItemDrop + numericModifier("food drop");

  const myArr: number[] = [stenchDone, itemDone, jarDone, initDone].map(
    (done) => (done ? 1 : 0),
  );

  if (initDone) return null;

  return (
    <QuestTile
      header="Light Twin Peak"
      minLevel={9}
      href="/place.php?whichplace=highlands"
      imageUrl="/images/adventureimages/mansion.gif"
      disabled={step < 2}
    >
      <Line>
        <i>-combat, +item, olfact topiary animal</i>
      </Line>
      <Line display="flex" flex="row" flexWrap="wrap" gap={1} rowGap={1}>
        <Chevrons
          ml={2}
          mr={-1}
          usesLeft={myArr.reduce((prev, cur) => prev + cur, 0)}
          totalUses={4}
        />
        {!stenchDone && (
          <Requirement met={res >= 4}>{res}/4 stench res</Requirement>
        )}
        {!itemDone && (
          <Requirement met={nonFamItemDrop >= 50}>
            {nonFamItemDrop.toFixed(0)}/50 non-fam +item/food
          </Requirement>
        )}
        {!jarDone && (
          <Requirement met={jars >= 1}>{jars}/1 jar of oil</Requirement>
        )}
        {!initDone && (
          <Requirement met={init >= 40}>{init}/40 +init</Requirement>
        )}
      </Line>
      {haveTrimmers && (
        <Line href={`/inv_use.php?pwd=${myHash()}&which=3&whichitem=5115`}>
          Use hedge trimmers.
        </Line>
      )}
    </QuestTile>
  );
};

export default TwinPeak;
