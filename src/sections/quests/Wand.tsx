import { canAdventure } from "kolmafia";
import { $effect, $item, $items, $location, have } from "libram";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { inventoryLink, parentPlaceLink } from "../../util/links";
import { commaAnd } from "../../util/text";

const INGREDIENTS = $items`ruby W, metallic A, lowercase N, heavy D`;

const Wand: React.FC = () => {
  const haveWand = have($item`Wand of Nagamar`);
  const haveIngredients = INGREDIENTS.every((item) => have(item));
  const basement = $location`The Castle in the Clouds in the Sky (Basement)`;
  return (
    !haveWand && (
      <QuestTile
        header="Get the Wand of Nagamar"
        imageUrl="/images/itemimages/wand.gif"
      >
        {haveIngredients ? (
          <Line command="create Wand of Nagamar">
            You have the ingredients. Make a Wand of Nagamar.
          </Line>
        ) : (
          <Line
            href={
              have($effect`Lucky!`)
                ? parentPlaceLink(basement)
                : canAdventure(basement)
                  ? inventoryLink($item`11-leaf clover`)
                  : undefined
            }
          >
            Need {commaAnd(INGREDIENTS.filter((item) => !have(item)))}. Clover
            the Castle Basement
            {canAdventure(basement) ? "" : " (once it's available)"}.
          </Line>
        )}
      </QuestTile>
    )
  );
};

export default Wand;
