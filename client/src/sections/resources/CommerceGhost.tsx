import { myFamiliar, myLevel } from "kolmafia";
import { $familiar, get } from "libram";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { haveUnrestricted } from "../../util/available";

const CommerceGhost = () => {
  const commerceGhostCombats = get("commerceGhostCombats");
  const commerceGhostItem = get("commerceGhostItem");
  const currentLevel = myLevel();
  const commerceGhostEquipped =
    myFamiliar() === $familiar`Ghost of Crimbo Commerce`;

  return (
    <Tile
      header="Ghost of Crimbo Commerce"
      imageUrl="/images/itemimages/cghost_commerce.gif"
      hide={
        !haveUnrestricted($familiar`Ghost of Crimbo Commerce`) ||
        currentLevel >= 12
      }
    >
      {commerceGhostItem !== "" ? (
        <Line
          href={`/mall.php?justitems=0&pudnuggler=%22${commerceGhostItem}%22`}
        >
          Buy a {commerceGhostItem} from the mall, then use the commerce ghost
          in a combat for {20 * currentLevel} - {25 * currentLevel} of each
          substat.
        </Line>
      ) : (
        <Line>
          The commerce ghost will request a new item from the mall in{" "}
          {10 - commerceGhostCombats} combats.
        </Line>
      )}
      {!commerceGhostEquipped && (
        <Line href="/familiar.php">
          Take the commerce ghost with you into combat to generate bonus stats.
        </Line>
      )}
    </Tile>
  );
};

export default CommerceGhost;
