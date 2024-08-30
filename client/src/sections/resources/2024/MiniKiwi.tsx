import {
  availableAmount,
  familiarWeight,
  myPath,
  weightAdjustment,
} from "kolmafia";
import { $familiar, $item, $path, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const MiniKiwi = () => {
  const miniKiwi = $familiar`Mini Kiwi`;

  if (
    !haveUnrestricted(miniKiwi) ||
    myPath() !== $path`11 Things I Hate About U`
  ) {
    return null;
  }

  const miniKiwiItem = $item`mini kiwi`;
  const aviatorGoggles = $item`aviator goggles`;
  const miniKiwiBikini = $item`mini kiwi bikini`;

  const miniKiwiCount = availableAmount(miniKiwiItem);
  const kiwiWeight = familiarWeight(miniKiwi) + weightAdjustment();
  const kiwiModifier = have(aviatorGoggles) ? 0.75 : 0.5;

  const kiwiChance = Math.min(kiwiWeight * kiwiModifier, 100);
  const kiwiSpiritsBought = get("_miniKiwiIntoxicatingSpiritsBought");
  const miniKiwiBikiniCount = availableAmount(miniKiwiBikini);

  return (
    <Tile
      header={plural(
        miniKiwiCount,
        "mini-kiwi available",
        "mini-kiwis available",
      )}
      imageUrl="/images/itemimages/minikiwi.gif"
    >
      <Line>
        At {Math.floor(kiwiWeight)} weight, you have a{" "}
        <AdviceTooltip
          text="Chance of getting a mini-kiwi each fight"
          label={`${kiwiChance.toFixed(1)}%`}
        />{" "}
        chance of a mini-kiwi each fight.
      </Line>
      {!kiwiSpiritsBought && (
        <Line>
          Consider purchasing mini-kiwi intoxicating spirits, for 3 kiwis.
        </Line>
      )}
      {miniKiwiBikiniCount < 1 && get("zeppelinProtestors") < 80 && (
        <Line>
          Consider purchasing mini-kiwi bikinis, for the Zeppelin sleaze test.
        </Line>
      )}
    </Tile>
  );
};

export default MiniKiwi;
