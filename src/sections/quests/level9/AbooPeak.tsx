import { Text } from "@chakra-ui/react";
import {
  availableAmount,
  Element,
  elementalResistance,
  itemDropModifier,
  myHp,
} from "kolmafia";
import { $element, $item, get, questStep } from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { plural } from "../../../util/text";

// TODO: replace with libram method when it's live
const elementalDamage = (base: number, element: Element) => {
  if (base < 0) return 1;
  const res = elementalResistance(element);
  return Math.max(1, Math.ceil(base - (base * res) / 100));
};

const AbooPeak = () => {
  const step = questStep("questL09Topping");
  const haunt = get("booPeakProgress");
  const lit = get("booPeakLit");
  const clues = availableAmount($item`A-Boo clue`);
  const itemDrop = itemDropModifier();
  const cluePerAdv = (((100 + itemDrop) * 0.15) / 100).toFixed(2);

  const damage = [13, 25, 50, 125, 250];
  const spookyDamage = damage
    .map((dmg) => elementalDamage(dmg, $element`Spooky`))
    .reduce((prev, current) => prev + current);
  const coldDamage = damage
    .map((dmg) => elementalDamage(dmg, $element`Cold`))
    .reduce((prev, current) => prev + current);

  if (lit) return null;

  return (
    <QuestTile
      header="Light A-boo Peak"
      minLevel={9}
      href="/place.php?whichplace=highlands"
      imageUrl="/images/itemimages/map.gif"
      disabled={step < 2}
    >
      {haunt === 0 ? (
        <Line>Light the fire!</Line>
      ) : (
        <>
          <Line>
            {haunt}% haunted. <Text as="i">+item</Text>
          </Line>
          <Line>
            Have {plural(clues, "clue")}. {cluePerAdv} clues/adv at +
            {itemDrop.toFixed(0)}% item.
          </Line>
          <Line>
            Have {myHp()}/{spookyDamage + coldDamage} HP needed for{" "}
            {spookyDamage} spooky and {coldDamage} cold dmg.
          </Line>
        </>
      )}
    </QuestTile>
  );
};

export default AbooPeak;
