import { Text } from "@chakra-ui/react";
import { round } from "kolmafia";
import { $familiar, $item, $skill, clamp, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";

const JillOfAllTrades = () => {
  const jillOfAllTrades = $familiar`Jill-of-All-Trades`;
  const mapsDropped = get("_mapToACandyRichBlockDrops");
  const estimatedMapProbability = 35 * 0.05 ** clamp(mapsDropped, 0, 3);
  const turnsToMap = 1 / (estimatedMapProbability / 100);
  const habitatRecallsLeft = clamp(3 - get("_monsterHabitatsRecalled"), 0, 3);
  const haveBookOfFacts = haveUnrestricted($skill`Just the Facts`);
  const ledCandleDropped = get("ledCandleDropped");
  const haveLEDCandle = have($item`LED candle`);

  if (!haveUnrestricted(jillOfAllTrades)) return null;

  return (
    <Tile linkedContent={jillOfAllTrades}>
      {mapsDropped === 0 && (
        <Line>
          You haven't gotten a map to halloween town yet! Try using your Jill
          for a map at ~{round(estimatedMapProbability)}% chance, or
          approximately {turnsToMap.toFixed(1)} turns.
        </Line>
      )}
      {mapsDropped < 2 && mapsDropped > 0 && (
        <Line>
          You have a map; the next map is at a ~{round(estimatedMapProbability)}
          % chance, or approximately {turnsToMap.toFixed(1)} turns.
        </Line>
      )}
      {habitatRecallsLeft > 0 &&
        (have($skill`Just the Facts`) || haveBookOfFacts) && (
          <Line>
            Halloween monsters make excellent targets for{" "}
            <Text as="b">Recall Habitat</Text> from BoFA.
          </Line>
        )}
      {!ledCandleDropped && !haveLEDCandle && (
        <Line>Fight a dude for an LED candle, to tune your Jill!</Line>
      )}
    </Tile>
  );
};

export default JillOfAllTrades;
