import { myMeat } from "kolmafia";
import { AsdonMartin } from "libram";
import Line from "../components/Line";
import Tile from "../components/Tile";

const Meat = () => {
  return (
    <Tile header="Meat">
      <Line>You have {myMeat()} meat, which is a skill.</Line>
      <Line>Asdon Martin installed: {AsdonMartin.installed() || "false"}</Line>
    </Tile>
  );
};

export default Meat;
