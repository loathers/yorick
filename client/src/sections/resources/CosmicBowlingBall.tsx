import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useNumericFunction, useObjectFunction } from "../../hooks/useFunction";
import { useGet } from "../../hooks/useProperties";

const CosmicBowlingBall = () => {
  return (
    <Tile
      header="Cosmic Bowling Ball"
      imageUrl="/images/itemimages/cmcabinet.gif"
    >
      <Line> Cosmic Bowling Ball </Line>
    </Tile>
  );
};

export default CosmicBowlingBall;
