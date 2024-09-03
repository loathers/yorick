import { Box, Text } from "@chakra-ui/react";
import { haveEquipped, myPath, numericModifier } from "kolmafia";
import { $item, get, have } from "libram";
import React from "react";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { NagPriority } from "../../contexts/NagContext";
import useNag from "../../hooks/useNag";
import { plural } from "../../util/text";

const MYSTIC_URL = "/place.php?whichplace=forestvillage&action=fv_mystic";
const EIGHT_BIT_URL = "place.php?whichplace=8bit";
const TREASURE_HOUSE_URL = "place.php?whichplace=8bit&action=8treasure";

const DigitalKey: React.FC = () => {
  const continuumTransfunctioner = $item`continuum transfunctioner`;
  const digitalKey = $item`digital key`;
  const inRun = get("_inRun");
  const isInCommunityService = myPath().id === 25;
  const isInKingdomOfExploathing = myPath().id === 52;
  const haveDigitalKey = have(digitalKey);
  const turnedInDigitalKey = get("questL13Final") === "finished";
  const currentScore = get("8BitScore");
  const currentColor = get("8BitColor") || "black";
  const bonusTurnsRemaining = 5 - get("8BitBonusTurns");

  const helpfulModifier: Record<string, string> = {
    black: "Initiative",
    red: "Meat Drop",
    blue: "Damage Absorption",
    green: "Item Drop",
  };

  const minimumToAddPoints: Record<string, number> = {
    black: 300,
    red: 150,
    blue: 300,
    green: 100,
  };

  const zoneMap: Record<string, string> = {
    black: "Vanya's Castle",
    red: "The Fungus Plains",
    blue: "Megalo-City",
    green: "Hero's Field",
  };

  const nextColor: Record<string, string> = {
    black: "blue",
    red: "black",
    blue: "green",
    green: "red",
  };

  const userModifier: Record<string, number> = Object.fromEntries(
    Object.entries(helpfulModifier).map(([key, value]) => [
      key,
      numericModifier(value),
    ]),
  );

  const expectedPoints: Record<string, number> = Object.fromEntries(
    Object.entries(helpfulModifier).map(([key]) => {
      const isCurrentZoneBonus = currentColor === key;
      const addedBonus = isCurrentZoneBonus ? 100 : 50;
      const denominator = isCurrentZoneBonus ? 10 : 20;
      const rawPoints = Math.min(
        300,
        Math.max(0, userModifier[key] - minimumToAddPoints[key]),
      );
      return [key, addedBonus + Math.round(rawPoints / denominator) * 10];
    }),
  );

  const highestPointColor = Object.entries(expectedPoints).reduce(
    (max, [key, value]) => (value > expectedPoints[max] ? key : max),
    currentColor,
  );

  // const shouldHighlight = (
  //   $locations`Vanya's Castle, The Fungus Plains, Megalo-City, Hero's Field` as (Location | null)[]
  // ).includes(get("nextAdventure"));

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: (
        <Tile
          header="Digital Key Quest"
          imageUrl="/images/itemimages/digitalkey.gif"
        >
          <Line>
            Gain{" "}
            {plural(
              Math.max(10000 - currentScore, 0),
              "more point",
              "more points",
            )}{" "}
            to get your digital key.
          </Line>
        </Tile>
      ),
    }),
    [currentScore],
  );

  if (
    !inRun ||
    isInCommunityService ||
    isInKingdomOfExploathing ||
    haveDigitalKey ||
    turnedInDigitalKey
  ) {
    return null;
  }

  return (
    <Tile
      header="Digital Key"
      imageUrl={`/images/adventureimages/${zoneMap[currentColor].toLowerCase().replace(/\s/g, "")}.gif`}
      href={EIGHT_BIT_URL}
    >
      <Line>
        Gain {plural(Math.max(10000 - currentScore, 0), "more point")} to get
        your digital key.
      </Line>
      {!have(continuumTransfunctioner) ? (
        <Line href={MYSTIC_URL}>
          Visit the crackpot mystic for your transfunctioner.
        </Line>
      ) : currentScore < 10000 ? (
        <>
          <Text as="b">
            BONUS ZONE: {zoneMap[currentColor]} (
            {plural(bonusTurnsRemaining, "more fight")})
          </Text>
          <Line>
            {expectedPoints[currentColor] === 400 ? (
              <Box color={currentColor}>
                <Text as="b">MAXIMUM POINTS!</Text>
                <br />
                Adventure in <Text as="b">{zoneMap[currentColor]}</Text> for 400
                points per turn!
              </Box>
            ) : (
              <>
                Current expected points: {expectedPoints[currentColor]}
                <br />
                Consider buffing{" "}
                <Text as="b" color={currentColor}>
                  {helpfulModifier[currentColor]}
                </Text>{" "}
                for more points.
                <br />
                You need{" "}
                {minimumToAddPoints[currentColor] +
                  300 -
                  userModifier[currentColor]}
                {helpfulModifier[currentColor] !== "Damage Absorption"
                  ? "%"
                  : ""}{" "}
                more for max points.
              </>
            )}
          </Line>
          <Line>
            In {plural(bonusTurnsRemaining, "more fight", "more fights")}, bonus
            zone will be{" "}
            <Text as="b" color={nextColor[currentColor]}>
              {zoneMap[nextColor[currentColor]]}
            </Text>
            .
          </Line>
          {highestPointColor !== currentColor && (
            <Line color="gray.500">
              Alternate Route: At current stats, you'd earn{" "}
              <Text as="b">{expectedPoints[highestPointColor]} points</Text> per
              fight at <Text as="b">{zoneMap[highestPointColor]}</Text>. Not
              recommended!
            </Line>
          )}
          {!haveEquipped(continuumTransfunctioner) && (
            <Line color="red.500">
              Equip your transfunctioner to access the realm.
            </Line>
          )}
        </>
      ) : (
        <>
          <Line href={TREASURE_HOUSE_URL}>
            Woah, 10000 points??? That's this life's high score!
          </Line>
          <Line href={TREASURE_HOUSE_URL}>
            Visit the <Text as="b">Treasure House</Text> to claim your
            hard-earned Digital Key.
          </Line>
        </>
      )}
    </Tile>
  );
};

export default DigitalKey;
