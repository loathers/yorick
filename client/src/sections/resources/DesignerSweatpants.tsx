import { $item, get, have } from "libram";
import Line from "../../components/Line";
import Tile from "../../components/Tile";

const DesignerSweatpants = () => {
  const sweat = parseInt(get("sweat"));
  const liverCleansRemaining = 3 - parseInt(get("_sweatOutSomeBoozeUsed"));
  return (
    <Tile
      header="Designer Sweatpants"
      imageUrl="/images/itemimages/sweats.gif"
      linkedContent={$item`designer sweatpants`}
      hide={!have($item`designer sweatpants`)}
    >
      <Line>💦 You have {sweat} sweat. 💦</Line>
      {liverCleansRemaining > 0 && sweat >= 25 && (
        <Line>
          Use Sweat Out Some Booze to recover 1 liver space -{" "}
          {liverCleansRemaining} {liverCleansRemaining > 1 ? "uses" : "use"}{" "}
          remaining.
        </Line>
      )}
      {liverCleansRemaining === 0 && sweat > 90 && (
        <Line>
          You have a lot of sweat, maybe restore some MP or make sweatade.
        </Line>
      )}
    </Tile>
  );
};

export default DesignerSweatpants;
