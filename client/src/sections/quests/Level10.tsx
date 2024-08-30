import { haveEquipped } from "kolmafia";
import { $item, $location, have, questStep } from "libram";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";

const Level10: React.FC = () => {
  const step = questStep("questL10Garbage");

  return (
    <QuestTile
      header="Giant Trash"
      imageUrl="/images/otherimages/sigils/recyctat.gif"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/place.php?whichplace=plains"],
        [1, "/place.php?whichplace=beanstalk"],
        [7, "/place.php?whichplace=giantcastle"],
        [10, "/council.php"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={10}
      hide={step === Step.FINISHED}
    >
      {step === 0 && !have($item`enchanted bean`) && (
        <Line>Acquire an enchanted bean.</Line>
      )}
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <Line>Plant an enchanted bean in the nearby plains.</Line>,
        ],
        [1, <Line>Visit the airhsip.</Line>],
        [
          2,
          <>
            {$location`The Penultimate Fantasy Airship`.turnsSpent < 25 && (
              <Line>
                You need to burn{" "}
                {25 - $location`The Penultimate Fantasy Airship`.turnsSpent}{" "}
                more total delay.
              </Line>
            )}
            <Line>
              You need {7 - step} more NC{step === 6 ? "" : "s"}.
            </Line>
            {$location`The Penultimate Fantasy Airship`.turnsSpent / 5 >=
              step - 1 && <Line>You have an NC ready, maximize -combat.</Line>}
          </>,
        ],
        [
          7,
          <>
            {(!haveEquipped($item`amulet of extreme plot significance`) ||
              !haveEquipped($item`titanium assault umbrella`) ||
              !haveEquipped($item`unbreakable umbrella`)) && (
              <Line fontWeight="bold" color="red.500">
                Equip an umbrella or the amulet of extreme plot significance.
              </Line>
            )}
            <Line>Maximize -combat and adventure in the castle basement.</Line>
            {!have($item`Wand of Nagamar`) && (
              <Line>
                Consider using a clover to acquire the letters for a wand.
              </Line>
            )}
          </>,
        ],
        [
          8,
          <Line>
            Delay{" "}
            {10 -
              $location`The Castle in the Clouds in the Sky (Ground Floor)`
                .turnsSpent}{" "}
            more turns on the ground floor to unlock the top floor.
          </Line>,
        ],
        [
          9,
          <>
            {!haveEquipped($item`Mohawk wig`) && (
              <Line fontWeight="bold" color="red.500">
                Equip a Mohawk wig.
              </Line>
            )}
            <Line>Maximize -combat and adventure in the top floor.</Line>
            {!have($item`steam-powered model rocketship`) && (
              <Line>
                Consider getting the rocketship to access the Hole in the Sky.
              </Line>
            )}
          </>,
        ],
        [10, <Line>Visit the council to inform them of your success.</Line>],
      ])}
    </QuestTile>
  );
};
export default Level10;
