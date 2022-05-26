import { have, $item } from "libram";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step, useQuestStep } from "../../hooks/useQuest";

const Level10: React.FC = () => {
  const step = useQuestStep("questL10Garbage");

  const haveEnchantedBean = have($item`enchanted bean`);

  return (
    <QuestTile
      header="Giant Trash"
      imageUrl="/otherimages/sigils/recyctat.gif"
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
      {step === 0 && !haveEnchantedBean && (
        <Line>Acquire an enchanted bean.</Line>
      )}
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <Line>Plant an enchanted bean in the nearby plains.</Line>,
        ],
        [
          1,
          <>
            <Line>Maximize -combat and adventure at the airship.</Line>
            <Line>Utilize free runs to burn delay.</Line>
            <Line>You need {7 - step} more NCs.</Line>
          </>,
        ],
        [7, <Line></Line>],
        [10, <Line></Line>],
      ])}
    </QuestTile>
  );
};
export default Level10;
