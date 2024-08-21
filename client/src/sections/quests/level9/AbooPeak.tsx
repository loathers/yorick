import {
  availableAmount,
  elementalResistance,
  itemDropModifier,
  Element,
  myHp,
} from "kolmafia";
import { $element, $item, get, questStep } from "libram";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";

//TODO: replace with libram method when it's live
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
  // const title =
  //   "Get down to 90% hauntedness, collect three a-boo clues, then use/survive each clue to finish quest.\nGet cans of black paint from the black market.";

  const damage = [13, 25, 50, 125, 250];
  const spookyDamage = damage
    .map((dmg) => elementalDamage(dmg, $element`Spooky`))
    .reduce((prev, current) => prev + current);
  const coldDamage = damage
    .map((dmg) => elementalDamage(dmg, $element`Cold`))
    .reduce((prev, current) => prev + current);

  return (
    <QuestTile
      header="A-boo Peak"
      minLevel={9}
      hide={step !== 1 || lit}
      href="/place.php?whichplace=highlands"
      imageUrl="/images/itemimages/map.gif"
    >
      {haunt === 0 ? (
        <Line>Light the fire!</Line>
      ) : (
        <>
          <Line>
            {haunt}% haunted. <i>+item drop</i>
          </Line>
          <Line>
            Have {clues} clue(s). {cluePerAdv} clues/adv at +
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
