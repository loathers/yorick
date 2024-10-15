import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { canAdventure, haveEquipped } from "kolmafia";
import { $item, $location, get } from "libram";
import React from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";

const BatWings: React.FC = () => {
  const batWings = $item`bat wings`;
  const batWingsEquipped = haveEquipped(batWings);
  const batWingSwoopsLeft = Math.max(0, 11 - get("_batWingsSwoopUsed"));
  const batWingRestsLeft = Math.max(0, 11 - get("_batWingsRestUsed"));
  const batWingFreeFightsLeft = Math.max(0, 5 - get("_batWingsFreeFights"));
  const bridge = get("chasmBridgeProgress");

  const batHoleZones = [
    {
      location: $location`The Bat Hole Entrance`,
      used: get("batWingsBatHoleEntrance"),
      reward: $item`bat wing`,
    },
    {
      location: $location`Guano Junction`,
      used: get("batWingsGuanoJunction"),
      reward: $item`sonar-in-a-biscuit`,
    },
    {
      location: $location`The Batrat and Ratbat Burrow`,
      used: get("batWingsBatratBurrow"),
      reward: $item`sonar-in-a-biscuit`,
    },
    {
      location: $location`The Beanbat Chamber`,
      used: get("batWingsBeanbatChamber"),
      reward: $item`enchanted bean`,
    },
  ];

  const availableZones = batHoleZones.filter(({ used }) => !used);

  if (!haveUnrestricted(batWings)) return null;

  return (
    <Tile linkedContent={batWings}>
      {batWingsEquipped && (
        <Line>
          <Text as="span" color="purple.500">
            Nanananananananana Battyman!
          </Text>
        </Line>
      )}
      {!batWingsEquipped &&
        !canAdventure(
          $location`The Castle in the Clouds in the Sky (Basement)`,
        ) && (
          <Line>
            <Text as="span" color="blue.500">
              Equip your bat wings. This saves turns in the Airship!
            </Text>
          </Line>
        )}
      <Line>Swoop Evilpockets: {batWingSwoopsLeft} left.</Line>
      <Line>
        Rest +1000 HP/MP:{" "}
        <Text
          as="span"
          color={batWingRestsLeft === 0 ? "red.500" : undefined}
          fontWeight="bold"
        >
          {batWingRestsLeft} left
        </Text>
        .
      </Line>
      <Line>
        Free flaps:{" "}
        <Text
          as="span"
          color={batWingFreeFightsLeft === 0 ? "red.500" : undefined}
          fontWeight="bold"
        >
          {batWingFreeFightsLeft} left
        </Text>
        .
      </Line>
      {bridge >= 25 && !canAdventure($location`Oil Peak`) && (
        <Line>You can skip the rest of the bridge!</Line>
      )}
      {availableZones.length > 0 && (
        <>
          <Line command={!batWingsEquipped ? "equip bat wings" : undefined}>
            Visit the Bat Hole zones{" "}
            {!batWingsEquipped && "with bat wings equipped "}to get:
          </Line>
          <UnorderedList>
            {availableZones.map(({ location, reward }) => (
              <ListItem key={location.id}>
                {location.identifierString}: {reward.name}
              </ListItem>
            ))}
          </UnorderedList>
        </>
      )}
    </Tile>
  );
};

export default BatWings;
