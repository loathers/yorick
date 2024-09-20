import { Text } from "@chakra-ui/react";
import { haveEquipped } from "kolmafia";
import { $effect, $item, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const EverfullDartHolster = () => {
  const everfullDartHolster = $item`Everfull Dart Holster`;
  const haveHolster = haveUnrestricted(everfullDartHolster);
  const everythingLooksRed = $effect`Everything Looks Red`;
  const haveELR = have(everythingLooksRed);
  const perks = get("everfullDartPerks");
  const dartCooldown =
    50 -
    (perks.includes("You are less impressed by bullseyes") ? 10 : 0) -
    (perks.includes("Bullseyes do not impress you much") ? 10 : 0);
  const dartSkill = get("dartsThrown");
  const dartsNeededForNextPerk =
    Math.floor(Math.sqrt(dartSkill) + 1) ** 2 - dartSkill;
  const holsterEquipped = haveEquipped(everfullDartHolster);

  useNag(
    () => ({
      id: "everfull-dart-holster-nag",
      priority: NagPriority.MID,
      node: !haveELR && haveHolster && (
        <Tile linkedContent={everfullDartHolster}>
          <Line>
            <Text as="span" color="red.500">
              Shoot a bullseye! ({dartCooldown} turns ELR)
            </Text>
          </Line>
          {!holsterEquipped ? (
            <Line>
              <Text as="span" color="red.500">
                Equip the dart holster first.
              </Text>
            </Line>
          ) : (
            <Line>
              <Text as="span" color="blue.500">
                Dart holster equipped.
              </Text>
            </Line>
          )}
        </Tile>
      ),
    }),
    [haveELR, haveHolster, everfullDartHolster, dartCooldown, holsterEquipped],
  );

  return (
    <Tile
      linkedContent={everfullDartHolster}
      hide={!haveUnrestricted(everfullDartHolster) || dartSkill >= 401}
    >
      <Line>Current dart skill: {dartSkill}.</Line>
      <Line>
        <Text as="span" color="blue.500">
          {dartsNeededForNextPerk}
        </Text>{" "}
        darts needed for next Perk.
      </Line>
      {!holsterEquipped && (
        <Line>
          <Text as="span" color="red.500">
            Equip the dart holster first.
          </Text>
        </Line>
      )}
      {holsterEquipped && (
        <Line>
          <Text as="span" color="blue.500">
            Dart holster equipped.
          </Text>
        </Line>
      )}
    </Tile>
  );
};

export default EverfullDartHolster;
