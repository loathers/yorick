import Line from "../components/Line";
import Tile from "../components/Tile";
import { $item } from "../util/makeValue";
import { plural } from "../util/text";
import useHave from "../hooks/useHave";
import { useProperty } from "../hooks/useProperties";
import { useBooleanFunction } from "../hooks/useFunction";

const FreeFights: React.FC = () => {
  const witchessFights = useProperty("_witchessFights", 0);
  const nepFreeTurns = useProperty("_neverendingPartyFreeTurns", 0);
  const voidFreeFights = useProperty("_voidFreeFights", 0);

  const haveCmg = useHave($item`cursed magnifying glass`);
  const haveCmgEquipped = useBooleanFunction.haveEquipped(
    $item`cursed magnifying glass`
  );

  return (
    <Tile header="Free Fights">
      {nepFreeTurns < 10 && (
        <Line href="/place.php?whichplace=town_wrong">
          {plural(10 - nepFreeTurns, "free NEP fight")}.
        </Line>
      )}
      {witchessFights < 5 && (
        <Line href="/campground.php?action=witchess">
          {plural(5 - witchessFights, "Witchess fight")}.
        </Line>
      )}
      {haveCmg && voidFreeFights < 5 && (
        <Line
          href={
            haveCmgEquipped
              ? undefined
              : "/inventory.php?ftext=cursed magnifying glass"
          }
        >
          {plural(5 - voidFreeFights, "free void fight")}.
        </Line>
      )}
    </Tile>
  );
};

export default FreeFights;
