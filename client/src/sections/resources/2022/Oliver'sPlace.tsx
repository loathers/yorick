import { clamp, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { plural } from "../../../util/text";

const OliversPlace = () => {
  const freeOliverFightsLeft = clamp(3 - get("_speakeasyFreeFights"), 0, 3);

  if (!get("ownsSpeakeasy") || freeOliverFightsLeft <= 0) return null;

  return (
    <Tile
      header={plural(
        freeOliverFightsLeft,
        `${get("speakeasyName", "Oliver's Tavern")} fight`,
      )}
      imageUrl="/images/itemimages/martini.gif"
      href="place.php?whichplace=speakeasy"
    >
      <Line>Consider dragging wanderers or habitats into the speakeasy.</Line>
    </Tile>
  );
};

export default OliversPlace;
