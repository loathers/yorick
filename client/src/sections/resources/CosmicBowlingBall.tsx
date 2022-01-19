import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { Text } from "@chakra-ui/react";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";
import useHave from "../../hooks/useHave";
import useGet from "../../hooks/useGet";

/**
 * Summarizes turns til next bowling banish & highlights when banish is available
 * @returns A tile describing the Cosmic Bowling Ball
 */

const CosmicBowlingBall = () => {
  const returnCombats = useGet("cosmicBowlingBallReturnCombats");
  const youHaveTheBall = useHave($item`cosmic bowling ball`);
  const currentZone = useGet("nextAdventure");
  const hasDarkJill = useHave($item`Dark Jill-O-Lantern`);

  // If they do not have the bowling ball and their returnCombats are < 0, do not show the tile.
  if (!youHaveTheBall && returnCombats < 0) {
    return <></>;
  }

  // To-Do list for this tile:
  //   - Add support for showing possible items & probability distribution from Bowl Backwards
  //   - Once mafia support exists, show the # of turns the banish is / expected stats from X turns in current zone with +50% stats, # of turns on buff etc
  //   - I'd like to figure out ways to make this info more compact
  //   - Conditional formatting to gray out others other than bowl backwards?
  return (
    <Tile
      header="Cosmic Bowling Ball"
      imageUrl="/images/itemimages/Cosmicball2.gif"
    >
      {currentZone === "The Hidden Bowling Alley" && (
        <Line>
          <Text as="span" color="teal.500" fontWeight={"bold"}>
            You're in the bowling alley; remember to bowl for pygmies!
          </Text>{" "}
        </Line>
      )}
      {youHaveTheBall && (
        <Line>
          <Text as="span" color="red.500" fontWeight={"bold"}>
            You've got your bowling ball; throw it!
          </Text>{" "}
        </Line>
      )}
      {youHaveTheBall && (
        <>
          <Line>
            <b>Bowl a Curveball:</b> Banish the monster, for free!
          </Line>
          <Line>
            <b>Bowl Sideways:</b> Gain ~ 1.5x stats within {currentZone}
          </Line>
          <Line>
            <b>Bowl Straight Up:</b> Gain +25% items / +50% meat
          </Line>
          <Line>
            <Text as="span" color="gray.400">
              <b>Bowl Backwards:</b> Pickpocket from the rest of your current
              CSV.
            </Text>
          </Line>
        </>
      )}
      {returnCombats > 0 && (
        <Line>
          Your Bowling Ball will return in {plural(returnCombats, "turn")}.{" "}
        </Line>
      )}
    </Tile>
  );
};

export default CosmicBowlingBall;
