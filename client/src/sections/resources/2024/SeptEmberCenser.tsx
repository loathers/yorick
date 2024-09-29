import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, myPrimestat, numericModifier } from "kolmafia";
import { $item, get } from "libram";

import DynamicItemLinks from "../../../components/DynamicItemLinks";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const SeptEmberCenser = () => {
  const septEmberCenser = $item`Sept-Ember Censer`;

  if (!haveUnrestricted(septEmberCenser)) {
    return null;
  }

  const bembershoot = $item`bembershoot`;
  const mmmBrrMouthwash = $item`Mmm-brr! brand mouthwash`;
  const emberingHunk = $item`embering hunk`;
  const septEmbers = get("availableSeptEmbers", 0);
  const coldResistance = numericModifier("cold resistance");
  const mainstatGain = Math.floor(
    7 *
      coldResistance ** 1.7 *
      (1.0 + numericModifier(`${myPrimestat()} Experience Percent`) / 100.0),
  );
  const bembershootCount = availableAmount(bembershoot);
  const mouthwashCount = availableAmount(mmmBrrMouthwash);
  const hunkCount = availableAmount(emberingHunk);
  const hulkFought = get("_emberingHulkFought", false);
  const structureUsed = get("_structuralEmberUsed", false);

  return (
    <Tile
      header="Sept-Ember Censer"
      href="/shop.php?whichshop=september"
      imageUrl="/images/itemimages/embercenser.gif"
    >
      {septEmbers > 0 && (
        <Line>
          Have{" "}
          <Text as="span" color="red.500" fontWeight="bold">
            {septEmbers}
          </Text>{" "}
          Sept-Embers to make stuff with!
        </Line>
      )}
      <UnorderedList>
        <ListItem>
          1 embers: +5 cold res accessory (You have{" "}
          <Text as="span" color="red.500">
            {bembershootCount}
          </Text>
          )
        </ListItem>
        <ListItem>
          2 embers: <DynamicItemLinks linkedContent={mmmBrrMouthwash} /> for{" "}
          <Text as="span" color="blue.500">
            {mainstatGain}
          </Text>{" "}
          mainstat. (You have{" "}
          <Text as="span" color="red.500">
            {mouthwashCount}
          </Text>
          )
        </ListItem>
        {structureUsed ? (
          <ListItem>
            <Text as="span" color="red.500">
              Already used structural ember today
            </Text>
          </ListItem>
        ) : (
          <ListItem>4 embers: +5/5 bridge parts (1/day)</ListItem>
        )}
        {hulkFought ? (
          <ListItem>
            <Text as="span" color="red.500">
              Already fought embering hulk today
            </Text>
          </ListItem>
        ) : (
          <ListItem>6 embers: embering hulk (1/day)</ListItem>
        )}
        <ListItem>(You have {plural(hunkCount, "hunk")})</ListItem>
      </UnorderedList>
    </Tile>
  );
};

export default SeptEmberCenser;
