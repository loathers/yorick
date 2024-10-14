import { haveEquipped, Item } from "kolmafia";
import { $item, $items, $location, $skill, have, questStep } from "libram";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { haveUnrestricted } from "../../util/available";
import { atStep, Step } from "../../util/quest";
import { commaAnd, plural } from "../../util/text";

const Level10: React.FC = () => {
  const step = questStep("questL10Garbage");
  const airship = $location`The Penultimate Fantasy Airship`;
  const groundFloor = $location`The Castle in the Clouds in the Sky (Ground Floor)`;

  const neededItems: [Item, string][] = [
    [$item`amulet of extreme plot significance`, "a Quiet Healer"],
    [$item`model airship`, "the noncombat"],
  ];
  if (!haveUnrestricted($skill`Comprehensive Cartography`)) {
    neededItems.push([$item`Mohawk wig`, "a Burly Sidekick"]);
  }
  if (!haveUnrestricted($item`unbreakable umbrella`)) {
    neededItems.push([$item`titanium assault umbrella`, "a Spunky Princess"]);
  }

  const immateria = $items`Tissue Paper Immateria, Tin Foil Immateria, Gauze Immateria, Plastic Wrap Immateria`;
  const neededImmateria = immateria.filter((item) => !have(item));
  const needs =
    neededImmateria.length > 0
      ? [plural(neededImmateria.length, "more immateria")]
      : [];
  needs.push("to find Cid");

  const delayRemaining = 25 - neededImmateria.length - airship.turnsSpent;

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Stop the Giant Trash"
      imageUrl="/images/otherimages/sigils/recyctat.gif"
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/place.php?whichplace=plains"],
        [1, "/place.php?whichplace=beanstalk"],
        [7, "/place.php?whichplace=giantcastle"],
        [10, "/council.php"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={10}
    >
      {step === 0 && !have($item`enchanted bean`) && (
        <Line>Acquire an enchanted bean.</Line>
      )}
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          <Line>Plant an enchanted bean in the nearby plains.</Line>,
        ],
        [1, <Line>Visit the airship.</Line>],
        [
          2,
          <>
            {delayRemaining > 0 && (
              <Line>You need to burn {delayRemaining} more total delay.</Line>
            )}
            <Line>You need {commaAnd(needs)}.</Line>
            {airship.turnsSpent / 5 >= step - 1 && (
              <Line>You have an NC available, maximize -combat.</Line>
            )}
          </>,
        ],
        [
          7,
          <>
            {(!haveEquipped($item`amulet of extreme plot significance`) ||
              !haveEquipped($item`titanium assault umbrella`) ||
              !haveEquipped($item`unbreakable umbrella`)) && (
              <Line fontWeight="bold" color="red.500">
                Equip an umbrella or the amulet of extreme plot significance.
              </Line>
            )}
            <Line>Maximize -combat and adventure in the castle basement.</Line>
          </>,
        ],
        [
          8,
          groundFloor.turnsSpent < 10 ? (
            <Line>
              Delay {10 - groundFloor.turnsSpent} more turns on the ground floor
              to unlock the Castle Top Floor.
            </Line>
          ) : (
            <Line>Unlock the Castle Top Floor next turn.</Line>
          ),
        ],
        [
          9,
          <>
            {!haveEquipped($item`Mohawk wig`) && (
              <Line fontWeight="bold" color="red.500">
                Equip a Mohawk wig.
              </Line>
            )}
            <Line>Maximize -combat and adventure in the top floor.</Line>
            {!have($item`steam-powered model rocketship`) && (
              <Line>
                Consider getting the rocketship to access the Hole in the Sky.
              </Line>
            )}
          </>,
        ],
        [10, <Line>Visit the council to inform them of your success.</Line>],
      ])}
    </QuestTile>
  );
};
export default Level10;
