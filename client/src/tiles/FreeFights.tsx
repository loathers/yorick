import Line from "../components/Line";
import Tile from "../components/Tile";
import { $item } from "../util/makeValue";
import { plural } from "../util/text";
import useHave from "../hooks/useHave";
import useProperties from "../hooks/useProperties";
import { useBooleanFunction } from "../hooks/useFunction";

const FreeFights: React.FC = () => {
  const { _witchessFights, _neverendingPartyFreeTurns, _voidFreeFights } =
    useProperties({
      _witchessFights: 0,
      _neverendingPartyFreeTurns: 0,
      _voidFreeFights: 0,
    });

  const haveCmg = useHave($item`cursed magnifying glass`);
  const haveCmgEquipped = useBooleanFunction.haveEquipped(
    $item`cursed magnifying glass`
  );

  return (
    <Tile header="Free Fights">
      {_neverendingPartyFreeTurns < 10 && (
        <Line href="/place.php?whichplace=town_wrong">
          {plural(10 - _neverendingPartyFreeTurns, "free NEP fight")}.
        </Line>
      )}
      {_witchessFights < 5 && (
        <Line href="/campground.php?action=witchess">
          {plural(5 - _witchessFights, "Witchess fight")}.
        </Line>
      )}
      {haveCmg && _voidFreeFights < 5 && (
        <Line
          href={
            haveCmgEquipped
              ? undefined
              : "/inventory.php?ftext=cursed magnifying glass"
          }
        >
          {plural(5 - _voidFreeFights, "free void fight")}.
        </Line>
      )}
    </Tile>
  );
};

export default FreeFights;
