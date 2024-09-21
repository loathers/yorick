import { questStep } from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { Step } from "../../../util/quest";

const Angus = () => {
  const step = questStep("questL09Topping");

  if (step < 3 || step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Highland Lord's Tower"
      imageUrl="/images/itemimages/mistcloak.gif"
      href="/place.php?whichplace=highlands"
    >
      <Line>Talk to Angus!</Line>
    </QuestTile>
  );
};

export default Angus;
