import { $item, have, $location } from "libram";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step, useQuestStep } from "../../hooks/useQuest";
import { plural } from "../../util/text";

const Level4: React.FC = () => {
  const step = useQuestStep("questL04Bat");
  const haveEnchantedBean = have($item`enchanted bean`);
  const bodyguards = $location`The Boss Bat's Lair`.turnsSpent;

  return (
    <QuestTile
      header="Bat Hole"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/place.php?whichplace=bathole"],
        [4, "/council.php"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={4}
      hide={step === Step.FINISHED}
    >
      {step >= 0 && !haveEnchantedBean && (
        <Line>
          Get an enchanted bean from a beanbat for the level 10 quest.
        </Line>
      )}
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <Line>
            Blow down {plural(3 - step, "bat hole wall")} by fighting Screambats
            or using sonars-in-a-biscuit.
          </Line>,
        ],
        [
          3,
          <Line>
            Face the fearsome Boss Bat in his lair! You must fight at least{" "}
            {Math.max(0, 4 - bodyguards)} bodyguards to find him.
          </Line>,
        ],
        [4, <Line>Return to the council with news of your defeated foe.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level4;
