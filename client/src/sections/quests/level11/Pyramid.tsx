import { availableAmount } from "kolmafia";
import { $item, $location, get, have, questStep } from "libram";
import React from "react";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { atStep, Step } from "../../../util/quest";
import { plural, pluralJustDesc } from "../../../util/text";

const PYRAMID_URL = "/place.php?whichplace=pyramid";

interface ChamberProps {
  extraSpinsNeeded: number;
}

const UpperChamber: React.FC<ChamberProps> = () => {
  const upperChamberTurns = $location`The Upper Chamber`.turnsSpent;
  const turnsRemaining = Math.max(0, 6 - upperChamberTurns);
  return (
    <Line href={PYRAMID_URL}>
      Adventure in the Upper Chamber for {plural(turnsRemaining, "more turn")}{" "}
      to unlock the Middle Chamber. Use -combat and free run skills if
      available.
    </Line>
  );
};

const MiddleChamber: React.FC<ChamberProps> = ({ extraSpinsNeeded }) => {
  const middleChamberTurns = $location`The Middle Chamber`.turnsSpent;
  const turnsRemaining = Math.max(0, 11 - middleChamberTurns);
  const tangles = availableAmount($item`tangle of rat tails`);
  return (
    <>
      <Line href={PYRAMID_URL}>
        Adventure in the Middle Chamber for{" "}
        {pluralJustDesc(turnsRemaining, "more turn")} to unlock the Control
        Room. Use free runs if available.{" "}
      </Line>
      {extraSpinsNeeded > 0 && (
        <Line>
          Use +400% item drop and olfact tomb rats to get ratchets.
          {tangles > 0 &&
            `Use ${plural(tangles, "tangle")} of rat tails on tomb rats.`}
        </Line>
      )}
    </>
  );
};

interface ControlRoomProps extends ChamberProps {
  task: string;
  spinsNeeded: number;
}

const ControlRoom: React.FC<ControlRoomProps> = ({
  task,
  spinsNeeded,
  extraSpinsNeeded,
}) => {
  return (
    <>
      <Line href={PYRAMID_URL}>
        Spin the pyramid {spinsNeeded} time{spinsNeeded !== 1 ? "s" : ""}, then{" "}
        {task}.
      </Line>
      {extraSpinsNeeded > 0 && (
        <Line>
          Need{" "}
          {`${plural(extraSpinsNeeded, "more ratchet")}/${pluralJustDesc(extraSpinsNeeded, "wheel")}`}
          . Adventure in the Middle Chamber (+400% item) or Upper Chamber
          (-combat) to acquire them.
        </Line>
      )}
    </>
  );
};

const Pyramid: React.FC = () => {
  const step = questStep("questL11Pyramid");
  const desertExplored = get("desertExploration") >= 100;

  const haveStaffOfEd =
    have($item`[7961]Staff of Ed`) ||
    (have($item`[7963]ancient amulet`) &&
      have($item`[7962]Eye of Ed`) &&
      have($item`[7964]Staff of Fats`));

  const upperChamberTurns = $location`The Upper Chamber`.turnsSpent;
  const middleChamberTurns = $location`The Middle Chamber`.turnsSpent;

  const pyramidPosition = get("pyramidPosition");
  const edChamberOpen = get("pyramidBombUsed");
  const tokenAvailable = have($item`ancient bronze token`);
  const ancientBombAvailable = have($item`ancient bomb`);

  let nextPositionNeeded = -1;
  let additionalTurnsAfterThat = 0;
  let task = "";

  if (ancientBombAvailable || edChamberOpen) {
    nextPositionNeeded = 1;
    additionalTurnsAfterThat = 0;
    task = `fight Ed in the lower chambers`;
  } else if (tokenAvailable) {
    nextPositionNeeded = 3;
    additionalTurnsAfterThat = 3;
    task = `acquire ancient bomb in lower chamber`;
  } else {
    nextPositionNeeded = 4;
    additionalTurnsAfterThat = 3 + 4;
    task = "acquire token in lower chamber";
  }

  const spinsNeeded = (nextPositionNeeded - pyramidPosition + 10) % 5;
  const totalSpinsNeeded = spinsNeeded + additionalTurnsAfterThat;
  const spinsAvailable =
    availableAmount($item`tomb ratchet`) +
    availableAmount($item`crumbling wooden wheel`);
  const extraSpinsNeeded = Math.max(0, totalSpinsNeeded - spinsAvailable);

  return (
    <QuestTile
      header="Pyramid Quest"
      imageUrl="/images/adventureimages/pyramid.gif"
      minLevel={11}
      hide={!desertExplored || step === Step.FINISHED}
    >
      {atStep(step, [
        [
          Step.UNSTARTED,
          !haveStaffOfEd ? (
            <Line>Find the Staff of Ed before starting the Pyramid.</Line>
          ) : (
            <Line href={PYRAMID_URL}>
              Visit the Pyramid to start the quest.
            </Line>
          ),
        ],
        [
          Step.STARTED,
          upperChamberTurns < 6 ? (
            <UpperChamber extraSpinsNeeded={extraSpinsNeeded} />
          ) : middleChamberTurns < 11 ? (
            <MiddleChamber extraSpinsNeeded={extraSpinsNeeded} />
          ) : (
            <ControlRoom
              task={task}
              spinsNeeded={spinsNeeded}
              extraSpinsNeeded={extraSpinsNeeded}
            />
          ),
        ],
      ])}
    </QuestTile>
  );
};

export default Pyramid;
