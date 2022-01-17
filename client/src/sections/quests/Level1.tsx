import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useQuestFinished } from "../../hooks/useQuest";

const Level1: React.FC = () => {
  const completed = useQuestFinished("questM05Toot");
  if (completed) return <></>;
  return (
    <Tile
      header="Toot Oriole"
      imageUrl="/images/otherimages/oriole.gif"
      href="/tutorial.php?action=toot"
    >
      <Line>Visit the Toot Oriole.</Line>
    </Tile>
  );
};

export default Level1;
