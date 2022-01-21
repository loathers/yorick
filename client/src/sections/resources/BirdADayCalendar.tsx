import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $item } from "../../util/makeValue";

const BirdADayCalendar = () => {
  const favoriteBirdVisited = useGet("_favoriteBirdVisited");
  const todayBirdMPCost = 5 * 2 ** useGet("_birdsSoughtToday");
  const favoriteBirdMods = useGet("yourFavoriteBirdMods").split(",");
  const todayBirdMods = useGet("_birdOfTheDayMods").split(",");
  return (
    <Tile
      header="Bird-a-Day Calendar"
      imageUrl="/images/itemimages/birdcal.gif"
      itemToUse={$item`Bird-a-Day calendar`}
      itemUsableLinkHide={useGet("_canSeekBirds")}
      hide={!useHave($item`Bird-a-Day calendar`)}
    >
      {!useGet("_canSeekBirds") && <Line>Use your bird calendar.</Line>}
      {favoriteBirdMods.length !== 0 && !favoriteBirdVisited && (
        <>
          <Line>
            Favorite bird will cost 50 MP for 20 adventures (1/day) of:
          </Line>
          <Line paddingLeft={5}>{favoriteBirdMods[0]}</Line>
          <Line paddingLeft={5}>{favoriteBirdMods[1]}</Line>
          <Line paddingLeft={5}>{favoriteBirdMods[2]}</Line>
          <Line paddingLeft={5}>{favoriteBirdMods[3]}</Line>
          <Line paddingLeft={5}>{favoriteBirdMods[4]}</Line>
        </>
      )}
      {todayBirdMods.length !== 0 && (
        <>
          <Line>
            Today's {todayBirdMPCost !== 5 ? "next" : "first"} bird will cost{" "}
            {todayBirdMPCost} MP for 10 adventures of:
          </Line>
          <Line paddingLeft={5}>{todayBirdMods[0]}</Line>
          <Line paddingLeft={5}>{todayBirdMods[1]}</Line>
          <Line paddingLeft={5}>{todayBirdMods[2]}</Line>
          <Line paddingLeft={5}>{todayBirdMods[3]}</Line>
          <Line paddingLeft={5}>{todayBirdMods[4]}</Line>
        </>
      )}
    </Tile>
  );
};

export default BirdADayCalendar;
