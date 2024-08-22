import { get, questStep } from "libram";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";

const Level2: React.FC = () => {
  const step = questStep("questL02Larva");

  return (
    <QuestTile
      header="Spooky Forest"
      imageUrl="/images/adventureimages/forest.gif"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/woods.php"],
        [1, "/council.php"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={2}
      hide={get("kingLiberated") || step === Step.FINISHED}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [Step.STARTED, <Line>Adventure for mosquito larva.</Line>],
        [1, <Line>Turn in larva to the Council.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level2;
