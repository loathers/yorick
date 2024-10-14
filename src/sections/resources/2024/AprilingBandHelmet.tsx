import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { myLocation, totalTurnsPlayed } from "kolmafia";
import { $effect, $item, $location, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { inventoryActionLink } from "../../../util/links";
import { plural } from "../../../util/text";

const NONCOMBAT_ZONES = [
  $location`The Haunted Billiards Room`,
  $location`The Haunted Gallery`,
  $location`The Haunted Bathroom`,
  $location`The Spooky Forest`,
  $location`The Typical Tavern Cellar`,
  $location`The Dark Neck of the Woods`,
  $location`The Dark Heart of the Woods`,
  $location`The Dark Elbow of the Woods`,
  $location`The Defiled Cranny`,
  $location`The Defiled Alcove`,
  $location`Twin Peak`,
  $location`The Penultimate Fantasy Airship`,
  $location`The Castle in the Clouds in the Sky (Basement)`,
  $location`The Castle in the Clouds in the Sky (Top Floor)`,
  $location`The Hidden Park`,
  $location`Inside the Palindome`,
  $location`Hippy Camp`,
  $location`Frat House`,
] as const;

const AprilingBandHelmet = () => {
  const aprilingBandHelmet = $item`Apriling band helmet`;
  const haveHelmet = haveUnrestricted(aprilingBandHelmet);
  const havePatrolBeat = have($effect`Apriling Band Patrol Beat`);
  const haveBattleCadence = have($effect`Apriling Band Battle Cadence`);
  const conductorTimer = get("nextAprilBandTurn");
  const saxUsesLeft = Math.max(3 - get("_aprilBandSaxophoneUses"), 0);
  const quadTomUsesLeft = Math.max(3 - get("_aprilBandTomUses"), 0);
  const tubaUsesLeft = Math.max(3 - get("_aprilBandTubaUses"), 0);
  const piccoloUsesLeft = Math.max(3 - get("_aprilBandPiccoloUses"), 0);
  const instrumentsAvailable = Math.max(2 - get("_aprilBandInstruments"), 0);
  const location = myLocation();

  useNag(
    () => ({
      id: "apriling-band-helmet-nag",
      priority: NagPriority.MID,
      node: haveHelmet &&
        conductorTimer <= totalTurnsPlayed() &&
        !havePatrolBeat &&
        NONCOMBAT_ZONES.includes(location) && (
          <Tile linkedContent={aprilingBandHelmet}>
            <Line href={inventoryActionLink("apriling")}>
              You can change your tune to -combat!
            </Line>
          </Tile>
        ),
    }),
    [haveHelmet, conductorTimer, havePatrolBeat, location, aprilingBandHelmet],
  );

  if (!haveUnrestricted(aprilingBandHelmet)) return null;

  const haveCelebrationBop = have($effect`Apriling Band Celebration Bop`);
  return (
    <Tile linkedContent={aprilingBandHelmet}>
      {conductorTimer <= totalTurnsPlayed() ? (
        <>
          <Line href={inventoryActionLink("apriling")}>
            You can change your tune!
          </Line>
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
          {plural(conductorTimer - totalTurnsPlayed(), "adventure")} until you
          can change your tune.
        </Line>
      )}

      {instrumentsAvailable > 0 && (
        <Line color="green" href={inventoryActionLink("apriling")}>
          Can pick {plural(instrumentsAvailable, "more instrument")}!
        </Line>
      )}

      {saxUsesLeft > 0 && have($item`Apriling band saxophone`) && (
        <Line>
          Can play the Sax {plural(saxUsesLeft, "more time")}.{" "}
          <Text as="span" color="green">
            LUCKY!
          </Text>
        </Line>
      )}
      {quadTomUsesLeft > 0 && have($item`Apriling band quad tom`) && (
        <Line>
          Can play the Quad Toms {plural(quadTomUsesLeft, "more time")}.{" "}
          <Text as="span" color="orange">
            Sandworm!
          </Text>
        </Line>
      )}
      {tubaUsesLeft > 0 && have($item`Apriling band tuba`) && (
        <Line>
          Can play the Tuba {plural(tubaUsesLeft, "more time")}.{" "}
          <Text as="span" color="gray">
            SNEAK!
          </Text>
        </Line>
      )}
      {piccoloUsesLeft > 0 && have($item`Apriling band piccolo`) && (
        <Line>
          Can play the Piccolo {plural(piccoloUsesLeft, "more time")}.{" "}
          <Text as="span" color="purple">
            +40 fxp
          </Text>
        </Line>
      )}
    </Tile>
  );
};

export default AprilingBandHelmet;
