import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, myHash, totalTurnsPlayed } from "kolmafia";
import { $effect, $item, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const AprilingBandHelmet = () => {
  const aprilingBandHelmet = $item`Apriling band helmet`;
  const haveHelmet = haveUnrestricted(aprilingBandHelmet);
  const havePatrolBeat = have($effect`Apriling Band Patrol Beat`);
  const haveBattleCadence = have($effect`Apriling Band Battle Cadence`);
  const aprilingBandConductorTimer = get("nextAprilBandTurn");
  const aprilingBandSaxUsesLeft = Math.max(
    3 - get("_aprilBandSaxophoneUses"),
    0,
  );
  const aprilingBandQuadTomUsesLeft = Math.max(3 - get("_aprilBandTomUses"), 0);
  const aprilingBandTubaUsesLeft = Math.max(3 - get("_aprilBandTubaUses"), 0);
  const aprilingBandPiccoloUsesLeft = Math.max(
    3 - get("_aprilBandPiccoloUses"),
    0,
  );
  const instrumentUses =
    get("_aprilBandSaxophoneUses") +
    get("_aprilBandTomUses") +
    get("_aprilBandTubaUses") +
    get("_aprilBandPiccoloUses");
  const aprilingBandInstrumentsAvailable = Math.max(
    2 - get("_aprilBandInstruments"),
    0,
  );

  const hash = myHash();

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveHelmet &&
        aprilingBandConductorTimer <= totalTurnsPlayed() &&
        !havePatrolBeat && (
          <Tile linkedContent={aprilingBandHelmet}>
            <Line href={`/inventory.php?pwd=${hash}&action=apriling`}>
              You can change your tune to -combat!
            </Line>
          </Tile>
        ),
    }),
    [
      haveHelmet,
      aprilingBandConductorTimer,
      havePatrolBeat,
      aprilingBandHelmet,
      hash,
    ],
  );

  if (!have(aprilingBandHelmet)) return null;

  const haveCelebrationBop = have($effect`Apriling Band Celebration Bop`);
  return (
    <Tile linkedContent={aprilingBandHelmet}>
      {aprilingBandConductorTimer <= totalTurnsPlayed() ? (
        <>
          <Line>You can change your tune!</Line>
          <UnorderedList>
            <ListItem color={havePatrolBeat ? "blue" : undefined}>
              -10% Combat Frequency
            </ListItem>
            <ListItem color={haveBattleCadence ? "blue" : undefined}>
              +10% Combat Frequency
            </ListItem>
            <ListItem color={haveCelebrationBop ? "blue" : undefined}>
              +25% booze, +50% food, +100% candy
            </ListItem>
          </UnorderedList>
        </>
      ) : (
        <Line>
          {plural(aprilingBandConductorTimer - totalTurnsPlayed(), "adventure")}{" "}
          until you can change your tune.
        </Line>
      )}

      {aprilingBandInstrumentsAvailable > 0 && (
        <Line color="green">
          Can pick {plural(aprilingBandInstrumentsAvailable, "more instrument")}
          !
        </Line>
      )}

      {instrumentUses < 6 && (
        <>
          {aprilingBandSaxUsesLeft > 0 &&
            availableAmount($item`Apriling band saxophone`) > 0 && (
              <Line>
                Can play the Sax {plural(aprilingBandSaxUsesLeft, "more time")}.{" "}
                <Text as="span" color="green">
                  LUCKY!
                </Text>
              </Line>
            )}
          {aprilingBandQuadTomUsesLeft > 0 &&
            availableAmount($item`Apriling band quad tom`) > 0 && (
              <Line>
                Can play the Quad Toms{" "}
                {plural(aprilingBandQuadTomUsesLeft, "more time")}.{" "}
                <Text as="span" color="orange">
                  Sandworm!
                </Text>
              </Line>
            )}
          {aprilingBandTubaUsesLeft > 0 &&
            availableAmount($item`Apriling band tuba`) > 0 && (
              <Line>
                Can play the Tuba{" "}
                {plural(aprilingBandTubaUsesLeft, "more time")}.{" "}
                <Text as="span" color="gray">
                  SNEAK!
                </Text>
              </Line>
            )}
          {aprilingBandPiccoloUsesLeft > 0 &&
            availableAmount($item`Apriling band piccolo`) > 0 && (
              <Line>
                Can play the Piccolo{" "}
                {plural(aprilingBandPiccoloUsesLeft, "more time")}.{" "}
                <Text as="span" color="purple">
                  +40 fxp
                </Text>
              </Line>
            )}
        </>
      )}
    </Tile>
  );
};

export default AprilingBandHelmet;
