import Line from "../components/Line";
import Tile from "../components/Tile";
import { $item } from "../util/makeValue";
import useFunction from "../util/useFunction";
import useProperties from "../util/useProperties";

const CursedMagnifyingGlass = () => {
  const { _voidFreeFights, cursedMagnifyingGlassCount } = useProperties({
    _voidFreeFights: 0,
    cursedMagnifyingGlassCount: 0,
  });
  const availableAmount =
    useFunction<number>("availableAmount", $item`cursed magnifying glass`) ?? 0;

  if (availableAmount === 0) return <></>;

  const turnsToVoid = 13 - cursedMagnifyingGlassCount;

  return (
    <Tile
      header="Cursed Magnifying Glass"
      imageUrl="/images/itemimages/cursedmag.gif"
    >
      <Line>
        Fought {_voidFreeFights} void monsters today. Next one is{" "}
        {_voidFreeFights >= 5 ? "NOT free" : "free"}.
      </Line>
      <Line>
        Void monster fight{" "}
        {turnsToVoid === 0 ? "available now" : `in ${turnsToVoid} turns`}.
      </Line>
    </Tile>
  );
};

export default CursedMagnifyingGlass;
