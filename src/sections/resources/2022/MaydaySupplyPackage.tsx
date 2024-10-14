import { $item } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";

const MayDayPackage = () => {
  const mayDayPackage = $item`MayDay™ supply package`;

  if (!haveUnrestricted(mayDayPackage)) return null;

  return (
    <Tile linkedContent={mayDayPackage}>
      <Line>
        Use for 30 adventures of +100% initiative as well as useful seeded
        drops.
      </Line>
    </Tile>
  );
};

export default MayDayPackage;
