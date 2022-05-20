import { haveEquipped, myHash, toLocation } from "kolmafia";
import { $item, get, have } from "libram";
import Line from "../../components/Line";
import Tile from "../../components/Tile";

const CrystalBall = () => {
  const currentPrediction = get("crystalBallPredictions")
    ?.split("|")
    .map((prediction) => {
      const data = prediction.split(":");
      if (data.length === 3) {
        // account for async data loading
        const url = haveEquipped($item`miniature crystal ball`)
          ? `/adventure.php?snarfblat=${toLocation(data[1]).id}&pwd=${myHash()}`
          : "";
        return (
          <Line key={data[1]} href={url}>
            {" "}
            {data[2]} in {data[1]}{" "}
          </Line>
        );
      } else {
        return "";
      }
    });

  return (
    <Tile
      header="Miniature Crystal Orb"
      imageUrl="/images/itemimages/famball.gif"
      hide={!have($item`miniature crystal ball`)}
      linkedContent={$item`miniature crystal ball`} // TODO: fails to equip if currently equipped by another fam
    >
      {!haveEquipped($item`miniature crystal ball`) ? (
        <b>Equip and then find:</b>
      ) : (
        ""
      )}
      {currentPrediction}
    </Tile>
  );
};

export default CrystalBall;
