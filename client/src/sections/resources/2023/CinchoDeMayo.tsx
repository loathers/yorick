import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { totalFreeRests } from "kolmafia";
import { $item, ChateauMantegna, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const CinchoDeMayo = () => {
  const cinchoDeMayo = $item`Cincho de Mayo`;
  if (!haveUnrestricted(cinchoDeMayo)) return null;

  const freeRestsTotal = totalFreeRests();
  const freeRestsTaken = get("timesRested");
  const freeRestsRemaining = totalFreeRests() - freeRestsTaken;
  const cinchoRests = get("_cinchoRests");
  const cinchUsed = get("_cinchUsed");

  const cinchLevels = [30, 30, 30, 30, 30, 25, 20, 15, 10, 5];

  let totalCinch = 100 - cinchUsed;
  let rest = cinchoRests;

  while (rest < Math.min(freeRestsTotal, cinchoRests + freeRestsRemaining)) {
    const cinchAmount = rest >= cinchLevels.length ? 5 : cinchLevels[rest];
    totalCinch += cinchAmount;
    rest += 1;
  }

  const possibleFiestaExits = Math.floor(totalCinch / 60);

  if (totalCinch === 0) return null;

  const url =
    totalCinch < 60
      ? ChateauMantegna.have()
        ? "/chateau.php"
        : "/campground.php"
      : "/skillz.php";

  return (
    <Tile
      header="Cincho de Mayo"
      imageUrl="/images/itemimages/cincho.gif"
      href={url}
    >
      <Line>
        Use your Cincho de Mayo to cast skills in exchange for cinch; when
        you're out of cinch, take a <Text as="b">free rest!?</Text>
      </Line>
      {totalCinch > 60 && (
        <Line>
          <Text as="b" color="purple.500">
            Fiesta Exit (60%):
          </Text>{" "}
          Force a NC on your next adventure. You have{" "}
          <Text as="b">{possibleFiestaExits}</Text> more possible, with{" "}
          {totalCinch % 60}% cinch leftover.
        </Line>
      )}
      <UnorderedList>
        {totalCinch > 25 && (
          <>
            <ListItem>
              <Text as="b">Dispense Salt & Lime (25%):</Text> Add stats to your
              next drink.
            </ListItem>
            <ListItem>
              <Text as="b">Party Soundtrack (25%):</Text> 30 advs of +5 fam
              weight.
            </ListItem>
          </>
        )}
        {totalCinch > 5 && (
          <>
            <ListItem>
              <Text as="b">Confetti Extravaganza (5%):</Text> 2x stats,
              in-combat
            </ListItem>
            <ListItem>
              <Text as="b">Projectile Piñata (5%):</Text> 50 damage, complex
              candy, in-combat
            </ListItem>
            <ListItem>
              <Text as="b">Party Foul (5%):</Text>{" "}
              <Text as="span" color="purple.500">
                100 sleaze
              </Text>{" "}
              damage, stun, in-combat
            </ListItem>
          </>
        )}
      </UnorderedList>
      <Line>
        You have {totalCinch}% more cinch available, accounting for your{" "}
        {plural(freeRestsRemaining, "remaining free rest")}.
      </Line>
      {have($item`June cleaver`) && !have($item`mother's necklace`) && (
        <Line>
          You do{" "}
          <Text as="span" color="red.500">
            not
          </Text>{" "}
          have a mother's necklace yet. Possible 25% more cinch
          {totalCinch % 60 >= 35 ? ", which will give another Party Exit" : ""}.
        </Line>
      )}
    </Tile>
  );
};

export default CinchoDeMayo;
