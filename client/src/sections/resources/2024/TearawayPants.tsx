import { haveEquipped, myAscensions, myClass } from "kolmafia";
import { $classes, $item, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { inventoryLink } from "../../../util/links";

const TearawayPants = () => {
  const tearawayPants = $item`tearaway pants`;
  const havePantsEquipped = haveEquipped(tearawayPants);
  const isMoxieClass = $classes`Disco Bandit, Accordion Thief`.includes(
    myClass(),
  );

  if (
    !have(tearawayPants) ||
    !isMoxieClass ||
    myAscensions() <= get("lastGuildStoreOpen")
  ) {
    return null;
  }

  const url = havePantsEquipped ? "guild.php" : inventoryLink(tearawayPants);

  return (
    <Tile
      header="Tearaway Pants"
      imageUrl="/images/itemimages/tearaway.gif"
      href={url}
    >
      {havePantsEquipped ? (
        <Line>
          Visit the Department of Shadowy Arts and Crafts to unlock the guild!
        </Line>
      ) : (
        <Line>
          Visit the Department of Shadowy Arts and Crafts with your pants
          equipped to unlock the guild!
        </Line>
      )}
    </Tile>
  );
};

export default TearawayPants;
