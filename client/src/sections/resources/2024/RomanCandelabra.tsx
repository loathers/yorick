import { haveEquipped } from "kolmafia";
import { $effect, $item, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const RomanCandelabra = () => {
  const romanCandelabra = $item`Roman Candelabra`;
  const springShoes = $item`spring shoes`;
  const everythingLooksGreen = $effect`Everything Looks Green`;
  const everythingLooksPurple = $effect`Everything Looks Purple`;

  const haveCandelabra = haveUnrestricted(romanCandelabra);
  const haveSpringShoes = haveUnrestricted(springShoes);
  const candelabraEquipped = haveEquipped(romanCandelabra);
  const haveELG = have(everythingLooksGreen);
  const haveELP = have(everythingLooksPurple);

  useNag(
    () => ({
      id: "roman-candelabra-nag",
      priority: NagPriority.MID,
      node: haveCandelabra && (!haveELP || (!haveELG && !haveSpringShoes)) && (
        <Tile linkedContent={romanCandelabra}>
          {!haveELG && !haveSpringShoes && (
            <>
              <Line color="green.500">Green candle runaway!</Line>
              {candelabraEquipped ? (
                <Line color="green.500">Candelabra equipped.</Line>
              ) : (
                <Line color="red.500">Equip the Roman Candelabra first.</Line>
              )}
            </>
          )}
          {!haveELP && (
            <>
              <Line>Roman Candelabra monster chain ready.</Line>
              {candelabraEquipped ? (
                <Line color="purple.500">
                  Candelabra equipped, blow your purple candle!
                </Line>
              ) : (
                <Line color="red.500">
                  Equip the Roman Candelabra, for your purple ray.
                </Line>
              )}
            </>
          )}
        </Tile>
      ),
    }),
    [
      haveCandelabra,
      romanCandelabra,
      haveELG,
      haveSpringShoes,
      candelabraEquipped,
      haveELP,
    ],
  );

  return null;
};

export default RomanCandelabra;
