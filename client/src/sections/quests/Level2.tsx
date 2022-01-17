import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import useHave from "../../hooks/useHave";
import { useQuestFinished, useQuestStarted } from "../../hooks/useQuest";
import { $item } from "../../util/makeValue";

const Level2: React.FC = () => {
  const started = useQuestStarted("questL02Larva");
  const finished = useQuestFinished("questL02Larva");

  const haveLarva = useHave($item`mosquito larva`);

  if (finished) return <></>;

  return (
    <QuestTile
      header="Spooky Forest"
      imageUrl="/images/adventureimages/forest.gif"
      href={started && !haveLarva ? "/woods.php" : "/council.php"}
      minLevel={2}
    >
      {started ? (
        haveLarva ? (
          <Line>Turn in larva to the Council.</Line>
        ) : (
          <Line>Adventure for mosquito larva.</Line>
        )
      ) : (
        <Line>Visit Council to start quest.</Line>
      )}
    </QuestTile>
  );
};

export default Level2;
