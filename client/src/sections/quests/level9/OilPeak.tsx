import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { useQuestStep } from "../../../hooks/useQuest";
import { monsterLevelAdjustment } from "../../../kolmafia/functions";

const OilPeak = () => {
  const step = useQuestStep("questL09Topping");

  const ml = monsterLevelAdjustment();

  return (
    <QuestTile
      header="Oil Peak"
      imageUrl="/images/adventureimages/oilslick.gif"
      minLevel={9}
      hide={step !== 1}
      href="/place.php?whichplace=highlands"
    >
      <Line>
        <i>+100ML, +item</i>
      </Line>
      <Line>{ml}/100 ML</Line>
    </QuestTile>
  );
};

export default OilPeak;
