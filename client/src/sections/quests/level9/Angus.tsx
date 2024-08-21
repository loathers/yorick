import { questStep } from "libram";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";

const Angus = () => {
  const step = questStep("questL09Topping");
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
