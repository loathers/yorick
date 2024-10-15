import { haveEquipped } from "kolmafia";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const CursedMagnifyingGlass = () => {
  const cursedMagnifyingGlass = $item`cursed magnifying glass`;
  const haveCmg = haveUnrestricted(cursedMagnifyingGlass);
  const haveCmgEquipped = haveEquipped(cursedMagnifyingGlass);
  const voidFreeFights = get("_voidFreeFights");
  const cursedMagnifyingGlassCount = get("cursedMagnifyingGlassCount");

  const turnsToVoid = 13 - cursedMagnifyingGlassCount;

  useNag(
    () => ({
      id: "cursed-magnifying-glass-nag",
      priority: NagPriority.HIGH,
      node: haveCmg && voidFreeFights < 5 && turnsToVoid === 0 && (
        <Tile
          linkedContent={cursedMagnifyingGlass}
          id="cursed-magnifying-glass-nag"
        >
          <Line fontWeight={haveCmgEquipped ? "bold" : undefined}>
            Void monster fight now!
          </Line>
          {!haveCmgEquipped && <Line>Equip cursed magnifying glass.</Line>}
        </Tile>
      ),
    }),
    [
      cursedMagnifyingGlass,
      haveCmg,
      haveCmgEquipped,
      turnsToVoid,
      voidFreeFights,
    ],
  );

  if (!haveCmg || voidFreeFights >= 5) return null;

  return (
    <Tile linkedContent={cursedMagnifyingGlass}>
      <Line>
        {plural(5 - voidFreeFights, "free void monster")} remaining today.
      </Line>
      <Line>
        Void monster fight{" "}
        {turnsToVoid === 0
          ? "available now"
          : `in ${plural(turnsToVoid, "turn")}`}
        .
      </Line>
    </Tile>
  );
};

export default CursedMagnifyingGlass;
