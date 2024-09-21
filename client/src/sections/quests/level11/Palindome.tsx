import { haveEquipped, numericModifier } from "kolmafia";
import { $item, $location, get, have, questStep } from "libram";
import React from "react";

import Line from "../../../components/Line";
import MainLink from "../../../components/MainLink";
import QuestTile from "../../../components/QuestTile";
import { inventoryLink, parentPlaceLink } from "../../../util/links";
import { atStep, Step } from "../../../util/quest";
import { commaAnd, plural, pluralJustDesc } from "../../../util/text";

const PALINDOME_URL = "/place.php?whichplace=palindome";
const WHITEYS_GROVE_URL = "/place.php?whichplace=woods";

const Level11Palindome: React.FC = () => {
  const step = questStep("questL11Palindome");
  const talisman = $item`Talisman o' Namsilat`;
  const megaGem = $item`Mega Gem`;
  const canStart =
    have(talisman) ||
    (have($item`Copperhead Charm`) && have($item`Copperhead Charm (rampant)`));
  const talismanEquipped = haveEquipped($item`Talisman o' Namsilat`);
  const palindomeLink = talismanEquipped ? PALINDOME_URL : undefined;

  const neededNcPhotos = ["a red nugget", "an ostrich egg", "God"].filter(
    (item) => !have($item`photograph of ${item}`),
  );
  const needInstantCamera =
    !have($item`photograph of a dog`) &&
    !have($item`disposable instant camera`) &&
    step <= Step.STARTED &&
    !have($item`"2 Love Me, Vol. 2"`);

  const drAwkwardOfficeUnlocked =
    step > Step.STARTED || get("palindomeDudesDefeated", 0) >= 5;

  if (!canStart || step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Palindome"
      imageUrl="/images/adventureimages/drawkward.gif"
      minLevel={11}
    >
      {step >= Step.STARTED && !talismanEquipped && (
        <Line href={inventoryLink(talisman)}>Equip the Talisman o' Nam!</Line>
      )}
      {atStep(step, [
        [
          Step.UNSTARTED,
          <Line href="/craft.php?mode=combine">
            "Paste the two copperhead charms together to acquire the Talisman o'
            Nam."
          </Line>,
        ],
        [
          Step.STARTED,
          <>
            {needInstantCamera && (
              <Line href={parentPlaceLink($location`The Haunted Bedroom`)}>
                Acquire a disposable instant camera from the haunted bedroom
                first.
              </Line>
            )}
            {!have($item`photograph of a dog`) && !needInstantCamera && (
              <Line href={palindomeLink}>
                Photograph Bob Racecar or Racecar Bob with disposable instant
                camera.
              </Line>
            )}
            {!have($item`stunt nuts`) && (
              <Line href={palindomeLink}>
                Possibly acquire stunt nuts from Bob Racecar or Racecar Bob.
                (30% drop)
              </Line>
            )}
            {neededNcPhotos.length > 0 && (
              <Line href={palindomeLink}>
                Find {pluralJustDesc(neededNcPhotos.length, "photograph")} of{" "}
                {commaAnd(neededNcPhotos)} from non-combats.
              </Line>
            )}
            {!drAwkwardOfficeUnlocked && (
              <Line href={palindomeLink}>
                Defeat{" "}
                {plural(5 - get("palindomeDudesDefeated", 0), "more dude")} in
                the palindome.
              </Line>
            )}
          </>,
        ],
        [
          1,
          <Line>
            <MainLink href={inventoryLink($item`[7262]"I Love Me, Vol. I"`)}>
              Use I Love Me, Vol. I.
            </MainLink>{" "}
            <MainLink href={palindomeLink}>
              Then place the photographs in Dr. Awkward's Office.
            </MainLink>
          </Line>,
        ],
        [
          2,
          <Line href={inventoryLink($item`"2 Love Me, Vol. 2"`)}>
            Use 2 Love Me, Vol. 2, then talk to Mr. Alarm in his office.
          </Line>,
        ],
        [
          3,
          <>
            <Line href={WHITEYS_GROVE_URL}>
              Acquire and make wet stunt nut stew:
            </Line>
            {!have($item`stunt nuts`) && (
              <Line href={palindomeLink}>
                Acquire stunt nuts from Bob Racecar or Racecar Bob in Palindome.
                (30% drop)
              </Line>
            )}
            {!have($item`wet stew`) && (
              <Line href={WHITEYS_GROVE_URL}>
                Adventure in Whitey's Grove to acquire bird rib and lion oil.
                {numericModifier("Item Drop") + numericModifier("Food Drop") <
                  300 && (
                  <>
                    {" "}
                    Need +
                    {(
                      301 -
                      numericModifier("Food Drop") -
                      numericModifier("Item Drop")
                    ).toFixed(0)}
                    % food drop.
                  </>
                )}
              </Line>
            )}
            <Line href="/craft.php?mode=cook">Cook wet stunt nut stew.</Line>
          </>,
        ],
        [
          4,
          <Line href={palindomeLink}>
            Talk to Mr. Alarm with the wet stunt nut stew.
          </Line>,
        ],
        [
          5,
          <Line
            href={
              haveEquipped(megaGem) ? palindomeLink : inventoryLink(megaGem)
            }
          >
            {!haveEquipped(megaGem) && "Equip the Mega Gem, then "}
            fight Dr. Awkward in his office.
          </Line>,
        ],
      ])}
    </QuestTile>
  );
};

export default Level11Palindome;
