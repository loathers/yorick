import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";
import { useNumericFunction } from "../../hooks/useFunction";
import useHave from "../../hooks/useHave";
import { useGet } from "../../hooks/useProperties";

/**
 * Summarizes # of glove charges remaining, gives pixel status
 * @returns A tile describing the Powerful Glove
 */

const PowerfulGlove = () => {
  const batteryUsed = useGet('_powerfulGloveBatteryPowerUsed');
  const numReds = useNumericFunction.availableAmount($item`red pixel`);
  const numBlues = useNumericFunction.availableAmount($item`blue pixel`);
  const numGreens = useNumericFunction.availableAmount($item`green pixel`);
  const numWhites = useNumericFunction.availableAmount($item`white pixel`);
  const numDigitalKey = useNumericFunction.availableAmount($item`digital key`);

  // Remove tile if the user does not have a glove.
  if (!useHave($item`Powerful Glove`)) {
    return <></>;
  }

  // How many whites you'd have if you converted all RBG pixels
  const possibleWhites = Math.min(numReds, numBlues, numGreens) + numWhites;

  return (
    <Tile
      header="Powerful Glove"
      imageUrl="/images/itemimages/Pglove.gif"
    >
      {batteryUsed < 100 && (<Line>
        {100-batteryUsed}% charge remaining today.
      </Line>)}
      {batteryUsed < 95 && (<Line>
        <text style={{color:"#a3a3a3"}}>{Math.floor((100-batteryUsed)/10)} shots of replace monster.</text>
      </Line>)}
      
      {possibleWhites < 30 && (<Line>
                  Pixels: <text style={{color:"#CC0000"}}>{numReds}R, </text> 
                          <text style={{color:"#0050d1"}}>{numBlues}B, </text> 
                          <text style={{color:"#00631b"}}>{numGreens}G</text></Line>)}
      {possibleWhites < 30 && (<Line>Overall, {plural(numWhites, "white")} ({possibleWhites} if you convert RBG.)</Line>)}    
      {possibleWhites > 30 && (numDigitalKey < 1) && (<Line href="/place.php?whichplace=forestvillage&action=fv_mystic">You have enough white pixels! Go make a key.</Line>)}

  </Tile>
  );
};

export default PowerfulGlove;
