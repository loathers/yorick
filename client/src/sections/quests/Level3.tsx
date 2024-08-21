import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";
import { numericModifier } from "../../kolmafia/functions";
import { commaAnd } from "../../util/text";
import { questStep } from "libram";

const Level3: React.FC = () => {
  const step = questStep("questL03Rat");

  const cold = numericModifier("Cold Damage");
  const hot = numericModifier("Hot Damage");
  const stench = numericModifier("Stench Damage");
  const spooky = numericModifier("Spooky Damage");
  const sleaze = numericModifier("Sleaze Damage");
  const combat = numericModifier("Combat Rate");
  const ml = numericModifier("Monster Level");

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
