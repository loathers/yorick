import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step, useQuestStep } from "../../hooks/useQuest";
import { numericModifier } from "../../kolmafia/functions";
import { commaAnd } from "../../util/text";

const Level3: React.FC = () => {
  const step = useQuestStep("questL03Rat");

  const cold = numericModifier("Cold Damage") ?? 0;
  const hot = numericModifier("Hot Damage") ?? 0;
  const stench = numericModifier("Stench Damage") ?? 0;
  const spooky = numericModifier("Spooky Damage") ?? 0;
  const sleaze = numericModifier("Sleaze Damage") ?? 0;
  const combat = numericModifier("Combat Rate") ?? 0;
  const ml = numericModifier("Monster Level") ?? 0;

  const all = Object.entries({ cold, hot, stench, spooky, sleaze });
  const needed = all.filter(([, value]) => value < 20);
  const description = needed.map(
    ([name, value]) => `${Math.ceil(20 - value)} more ${name}`
  );

  return (
    <QuestTile
      header="Tavern Cellar"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/tavern.php?place=barkeep"],
        [1, "/cellar.php"],
        [2, "/tavern.php?place=barkeep"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={3}
      hide={step === Step.FINISHED}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [Step.STARTED, <Line>Talk to Bart Ender.</Line>],
        [
          1,
          <>
            <Line>Explore the cellar to find the rat faucet.</Line>
            {needed.length > 0 && (
              <Line>Need {commaAnd(description)} damage.</Line>
            )}
            {combat > -25 && <Line>Need {25 + combat}% more -combat.</Line>}
            {ml < 300 && <Line>Could use up to {300 - ml} more ML.</Line>}
          </>,
        ],
        [2, <Line></Line>],
      ])}
    </QuestTile>
  );
};

export default Level3;
