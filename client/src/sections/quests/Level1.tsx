import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { Step, useQuestStep } from "../../util/quest";

const Level1: React.FC = () => {
  const step = useQuestStep("questM05Toot");
  return (
    <Tile
      header="Toot Oriole"
      imageUrl="/images/otherimages/oriole.gif"
      href="/tutorial.php?action=toot"
      hide={step === Step.FINISHED}
    >
      <Line>Visit the Toot Oriole.</Line>
    </Tile>
  );
};

export default Level1;
