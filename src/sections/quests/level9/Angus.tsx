import { questStep } from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";

const Angus = () => {
  const step = questStep("questL09Topping");

  if (step !== 1 && step !== 3) return null;

  return (
    <QuestTile
      header="Highland Lord's Tower"
      imageUrl="/images/itemimages/mistcloak.gif"
      href="/place.php?whichplace=highlands"
    >
      {step === 1 && <Line>Talk to Angus to start Peak quests!</Line>}
      {step === 3 && <Line>Talk to Angus to finish quest!</Line>}
    </QuestTile>
  );
};

export default Angus;
