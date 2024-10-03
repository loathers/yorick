import { Text } from "@chakra-ui/react";
import {
  availableAmount,
  canAdventure,
  canEquip,
  getProperty,
  inHardcore,
  myAscensions,
} from "kolmafia";
import {
  $familiar,
  $item,
  $location,
  get,
  have,
  isCurrentFamiliar,
} from "libram";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { turnsToSeeNoncombat } from "../../util/calc";
import { plural } from "../../util/text";

const HITS_URL = "/place.php?whichplace=beanstalk";
const CASTLE_URL = "/place.php?whichplace=giantcastle";

interface SpaceJellyfishAdviceProps {
  turnsSpent: number;
  starChartsNeeded: number;
  starsNeeded: number;
  linesNeeded: number;
}

const SpaceJellyfishAdvice: React.FC<SpaceJellyfishAdviceProps> = ({
  turnsSpent,
  starChartsNeeded,
  starsNeeded,
  linesNeeded,
}) => {
  const spaceJellyfish = $familiar`Space Jellyfish`;
  const turnsToNextNC =
    turnsSpent < 2 ? 2 - turnsSpent : 7 - ((turnsSpent - 2) % 7);
  const ncUp = turnsSpent === 2 || (turnsSpent - 2) % 7 === 0;

  if (ncUp && getProperty("lastEncounter") !== "Space Directions") {
    const choices = [];
    if (starChartsNeeded > 0) choices.push("astronomer");
    if (starsNeeded > 0 || linesNeeded > 0) choices.push("camel's toe");

    return (
      <Line>
        {!isCurrentFamiliar(spaceJellyfish) ? (
          <Text as="span" color="red.500">
            Bring along your space jellyfish!
          </Text>
        ) : (
          "Jellyfish NC next adventure"
        )}
        , it'll let you choose a{choices[0] === "astronomer" ? "n" : ""}{" "}
        {choices.join(" or ")} this adventure.
        {(starsNeeded > 0 || linesNeeded > 0) && (
          <Text>Though that will reduce your +item, so choose wisely.</Text>
        )}
      </Line>
    );
  } else {
    if (isCurrentFamiliar(spaceJellyfish)) {
      return <Line color="red.500">Switch to another familiar?</Line>;
    }
    return (
      <Line>{plural(turnsToNextNC, "more turn")} to jellyfish choice NC.</Line>
    );
  }
};

const StarKey: React.FC = () => {
  const richardsStarKey = $item`Richard's star key`;
  const starChart = $item`star chart`;
  const star = $item`star`;
  const line = $item`line`;
  const spaceJellyfish = $familiar`Space Jellyfish`;

  const starChartsNeeded = Math.max(0, 1 - availableAmount(starChart));
  const starsNeeded = Math.max(0, 8 - availableAmount(star));
  const linesNeeded = Math.max(0, 7 - availableAmount(line));

  const holeInSkyAvailable = canAdventure($location`The Hole in the Sky`);
  const turnsSpent = $location`The Hole in the Sky`.turnsSpent;

  if (
    have(richardsStarKey) ||
    get("nsTowerDoorKeysUsed").includes("Richard's star key")
  ) {
    return null;
  }

  return (
    <QuestTile
      header="Hole in the Sky"
      imageUrl="/images/adventureimages/hole_in_sky.gif"
    >
      {!holeInSkyAvailable ? (
        <>
          <Line href={CASTLE_URL}>
            Run -combat on the top floor of the castle for the steam-powered
            model rocketship.
          </Line>
          <Line>
            {plural(turnsToSeeNoncombat(95, 1), "turn")} until noncombat.
          </Line>
        </>
      ) : (
        <>
          <Line href={HITS_URL}>Need Richard's star key.</Line>
          <Line>
            Need: {plural(starChartsNeeded, starChart)},{" "}
            {plural(starsNeeded, star)}, {plural(linesNeeded, line)}
          </Line>
          {starChartsNeeded === 1 &&
            starsNeeded === 0 &&
            linesNeeded === 0 &&
            !inHardcore() && <Line>Can pull a star chart.</Line>}
          {(starsNeeded > 0 || linesNeeded > 0) && (
            <Line>
              Olfact {myAscensions() % 2 === 0 ? "skinflute" : "camel's toe"}.
            </Line>
          )}
          {(starsNeeded > 0 || linesNeeded > 0) && <Line>+234% item</Line>}
          {canEquip(spaceJellyfish) && (
            <SpaceJellyfishAdvice
              turnsSpent={turnsSpent}
              starChartsNeeded={starChartsNeeded}
              starsNeeded={starsNeeded}
              linesNeeded={linesNeeded}
            />
          )}
          {get("shenInitiationDay") === 2 && (
            <Line>
              Could wait before going here? Shen will send you here later.
            </Line>
          )}
        </>
      )}
    </QuestTile>
  );
};

export default StarKey;
