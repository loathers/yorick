import { questStep } from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { AdviceTooltipIcon } from "../../../components/Tooltips";
import { atStep, questFinished, Step } from "../../../util/quest";
import ZeppelinMob from "./ZeppelinMob";
import ZeppelinShip from "./ZeppelinShip";

const getTooltip = (step: number) => {
  let tooltip;

  switch (step) {
    case 1:
      tooltip =
        "-combat, 567% item, sleaze dmg, sleaze spell dmg. Could adventure in the Copperhead Club first for Flamin' Whatshisnames";
      break;
    case 2:
      tooltip = "+234% item, banish Red Herring, banish Red Snapper";
      break;
  }

  return tooltip;
};

const Zeppelin = () => {
  const step = questStep("questL11Ron");
  const tooltip = getTooltip(step);
  const Component =
    atStep(step, [
      [Step.STARTED, ZeppelinMob],
      [2, ZeppelinShip],
      [4, () => <Line>Defeat Ron in the zeppelin.</Line>],
    ]) ?? (() => null);

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Find Ron Copperhead"
      minLevel={11}
      imageUrl="/images/itemimages/scharm.gif"
      href="/place.php?whichplace=zeppelin"
      tooltip={
        tooltip && <AdviceTooltipIcon text={tooltip}></AdviceTooltipIcon>
      }
      disabled={!questFinished("questL11Black")}
    >
      <Component />
    </QuestTile>
  );
};

export default Zeppelin;
