import { Text } from "@chakra-ui/react";
import { availableAmount, totalTurnsPlayed } from "kolmafia";
import { $effect, $item, get, have } from "libram";

import BulletedList from "../../../components/BulletedList";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { plural } from "../../../util/text";

const AprilingBandHelmet = () => {
  const aprilingBandHelmet = $item`Apriling band helmet`;
  const haveHelmet = have(aprilingBandHelmet);
  const havePatrolBeat = have($effect`Apriling Band Patrol Beat`);
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

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveHelmet &&
        aprilingBandConductorTimer <= totalTurnsPlayed() &&
        !havePatrolBeat && (
          <Tile
            header="Apriling Band Helmet"
            imageUrl="/images/itemimages/apriling_band_helmet.gif"
          >
            <Line>You can change your tune to -combat!</Line>
          </Tile>
        ),
    }),
    [haveHelmet, aprilingBandConductorTimer, havePatrolBeat],
  );

  if (!have(aprilingBandHelmet)) return null;

  return (
    <Tile
      header="Apriling Band Helmet"
      imageUrl="/images/itemimages/apriling_band_helmet.gif"
    >
      {aprilingBandConductorTimer <= totalTurnsPlayed() ? (
        <>
          <Line>You can change your tune!</Line>
          {have($effect`Apriling Band Patrol Beat`) && (
            <BulletedList>
              <Text color="blue">-10% Combat Frequency</Text>
              <Text>+10% Combat Frequency</Text>
              <Text>+25% booze, +50% food, +100% candy</Text>
            </BulletedList>
          )}
          {have($effect`Apriling Band Battle Cadence`) && (
            <BulletedList>
              <Text>-10% Combat Frequency</Text>
              <Text color="blue">+10% Combat Frequency</Text>
              <Text>+25% booze, +50% food, +100% candy</Text>
            </BulletedList>
          )}
          {have($effect`Apriling Band Celebration Bop`) && (
            <BulletedList>
              <Text>+10% Combat Frequency</Text>
              <Text>-10% Combat Frequency</Text>
              <Text color="blue">+25% booze, +50% food, +100% candy</Text>
            </BulletedList>
          )}
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
