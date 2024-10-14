import { myLevel } from "kolmafia";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";

const UnbreakableUmbrella = () => {
  if (!haveUnrestricted($item`unbreakable umbrella`)) {
    return null;
  }

  const umbrellaMode = get("umbrellaState");

  return (
    <Tile linkedContent={$item`unbreakable umbrella`}>
      <Line>Current Mode: {umbrellaMode}.</Line>
      {myLevel() < 13 && umbrellaMode !== "broken" && (
        <Line command="umbrella broken">
          Splaying it will increase ML by 25%.
        </Line>
      )}
      {umbrellaMode !== "bucket style" && (
        <Line command="umbrella bucket">
          Inverting it will increase item% by 25.
        </Line>
      )}
      {umbrellaMode !== "cocoon" && (
        <Line command="umbrella cocoon">
          Closing yourself inside will increase -combat% by 10.
        </Line>
      )}
    </Tile>
  );
};

export default UnbreakableUmbrella;
