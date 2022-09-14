import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { useQuestStep } from "../../../hooks/useQuest";

const Angus = () => {
  const step = useQuestStep("questL09Topping");
  return (
    <QuestTile
      header="Highland Lord's Tower"
      imageUrl="/images/itemimages/Mistcloak.gif"
      hide={step < 3 || step === 999}
      href="/place.php?whichplace=highlands"
    >
      <Line>Talk to Angus!</Line>
    </QuestTile>
  );
};

export default Angus;
