import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";
import useCall from "../../hooks/useCall";
import useHave from "../../hooks/useHave";
import useGet from "../../hooks/useGet";

const CursedMagnifyingGlass = () => {
  const _voidFreeFights = useGet("_voidFreeFights");
  const cursedMagnifyingGlassCount = useGet("cursedMagnifyingGlassCount");
  const haveEquipped = useCall.haveEquipped($item`cursed magnifying glass`);

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
        {plural(5-_voidFreeFights, "free void monster")} remaining today.
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
