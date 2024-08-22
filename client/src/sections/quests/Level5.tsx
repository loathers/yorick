import { haveOutfit, isWearingOutfit } from "kolmafia";
import { $effect, $item, $location, get, have, questStep } from "libram";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";
import { inventory } from "../../util/links";
import { plural } from "../../util/text";

const Level5: React.FC = () => {
  const step = questStep("questL05Goblin");

  const turnsSpent = $location`The Outskirts of Cobb's Knob`.turnsSpent;
  const haveKey = have($item`Knob Goblin Encryption Key`);
  const outfit = haveOutfit("Knob Goblin Harem Girl Disguise");
  const havePerfume = have($effect`Knob Goblin Perfume`);
  const equippedOutfit = isWearingOutfit("Knob Goblin Harem Girl Disguise");
  const haveFireExtinguisher = have($item`industrial fire extinguisher`);
  const fireExtinguisherCharge = get("_fireExtinguisherCharge");
  const haremExtinguished = get("fireExtinguisherHaremUsed");

  return (
    <QuestTile
      header="Knob Goblin King"
      imageUrl="/images/adventureimages/cobbsknob.gif"
      minLevel={haveKey ? 5 : undefined}
      hide={get("kingLiberated") || step === Step.FINISHED}
    >
      {step < 1 && turnsSpent < 10 && !haveKey ? (
        <Line>
          Burn {plural(10 - turnsSpent, "turn")} of delay in the Outskirts to
          find the encryption key.
        </Line>
      ) : (
        atStep(step, [
          [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
          [
            Step.STARTED,
            <Line>
              {haveKey
                ? "Use Cobb's Knob map to go inside."
                : "Adventure in the Outskirts to find the encryption key."}
            </Line>,
          ],
          [
            1,
            !outfit ? (
              <>
                <Line>Acquire the Harem Girl Disguise.</Line>
                {haveFireExtinguisher &&
                  fireExtinguisherCharge >= 20 &&
                  !haremExtinguished && (
                    <Line color="red.500" fontWeight={"bold"}>
                      Use Fire Extinguisher: Foam the Place in Harem for free
                      disguise.
                    </Line>
                  )}
              </>
            ) : !equippedOutfit ? (
              <Line href={inventory("Knob Goblin harem")}>
                Equip the Harem Girl Disguise.
              </Line>
            ) : !havePerfume ? (
              <Line>
                Adventure in the Harem to get the Knob Goblin Perfume effect.
              </Line>
            ) : (
              <Line>Fight the Knob Goblin King!</Line>
            ),
          ],
        ])
      )}
    </QuestTile>
  );
};

export default Level5;
