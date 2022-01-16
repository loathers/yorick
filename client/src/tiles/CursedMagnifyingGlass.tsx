import Line from "../components/Line";
import Tile from "../components/Tile";
import { $item } from "../util/makeValue";
import { plural } from "../util/text";
import { useBooleanFunction } from "../hooks/useFunction";
import useHave from "../hooks/useHave";
import { useProperties } from "../hooks/useProperties";

const CursedMagnifyingGlass = () => {
  const { _voidFreeFights, cursedMagnifyingGlassCount } = useProperties({
    _voidFreeFights: 0,
    cursedMagnifyingGlassCount: 0,
  });
  const haveEquipped = useBooleanFunction.haveEquipped(
    $item`cursed magnifying glass`
  );

  if (!useHave($item`cursed magnifying glass`) || _voidFreeFights >= 5) {
    return <></>;
  }

  const turnsToVoid = 13 - cursedMagnifyingGlassCount;

  return (
    <Tile
      header="Cursed Magnifying Glass"
      imageUrl="/images/itemimages/cursedmag.gif"
    >
      <Line>
        {plural(_voidFreeFights, "free void monster")} remaining today.
      </Line>
      <Line>
        Void monster fight{" "}
        {turnsToVoid === 0
          ? "available now"
          : `in ${plural(turnsToVoid, "turn")}`}
        .
      </Line>
      {!haveEquipped && (
        <Line href="/inventory.php?ftext=cursed magnifying glass">
          Equip cursed magnifying glass.
        </Line>
      )}
    </Tile>
  );
};

export default CursedMagnifyingGlass;
