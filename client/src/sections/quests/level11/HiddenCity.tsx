import {
  canAdventure,
  haveEquipped,
  Location,
  myAscensions,
  myPath,
} from "kolmafia";
import { $effect, $item, $location, $path, get, have, questStep } from "libram";

import Line from "../../../components/Line";
import MainLink from "../../../components/MainLink";
import QuestTile from "../../../components/QuestTile";
import { inventoryLink, parentPlaceLink } from "../../../util/links";
import { atStep, Step } from "../../../util/quest";
import { commaAnd, plural } from "../../../util/text";

const CITY_LINK = "/place.php?whichplace=hiddencity";

function tavernUnlocked(): boolean {
  return get("hiddenTavernUnlock") >= myAscensions();
}

function lianasFought(location: Location) {
  // eslint-disable-next-line libram/verify-constants
  return myPath() === $path`Avant Garde`
    ? location.turnsSpent / 2
    : location.turnsSpent;
}

interface UnlockProps {
  location: Location;
}
const Unlock: React.FC<UnlockProps> = ({ location }) => {
  const lianasLeft = 3 - lianasFought(location);
  return (
    <Line href={CITY_LINK}>
      Unlock {location.identifierString} ({lianasLeft === 0 ? "no" : lianasLeft}{" "}
      lianas left).
    </Line>
  );
};

const Apartment = () => {
  const step = questStep("questL11Curses");
  const curses = have($effect`Once-Cursed`)
    ? 1
    : have($effect`Twice-Cursed`)
      ? 2
      : have($effect`Thrice-Cursed`)
        ? 3
        : 0;

  const haveCcsc = have($item`candy cane sword cane`);
  const ccscEquipped = haveEquipped($item`candy cane sword cane`);
  const cursesNeeded = (haveCcsc ? 2 : 3) - curses;
  const mustEquipCcsc = haveCcsc && !ccscEquipped && curses === 2;

  const apartment = $location`The Hidden Apartment Building`;
  const apartmentTurns = apartment.turnsSpent;
  const nextElevator = Math.max(8, 8 * Math.floor(apartmentTurns / 8));
  const apartmentReady =
    apartmentTurns === nextElevator || get("noncombatForcerActive");

  return (
    atStep(step, [
      [Step.UNSTARTED, <Unlock location={apartment} />],
      [
        Step.STARTED,
        <>
          {cursesNeeded > 0 && (
            <Line>
              Get cursed {plural(cursesNeeded, "more time")}, from{" "}
              {tavernUnlocked() ? (
                <MainLink href="/shop.php?whichshop=hiddentavern">
                  Cursed Punch
                </MainLink>
              ) : (
                "Cursed Punch (unlock tavern)"
              )}{" "}
              or <MainLink href={CITY_LINK}>finding pygmy shamans.</MainLink>
            </Line>
          )}
          {apartmentReady ? (
            cursesNeeded <= 0 ? (
              mustEquipCcsc ? (
                <Line href={inventoryLink($item`candy cane sword cane`)}>
                  Equip the candy cane sword cane and adventure in the Apartment
                  Building.
                </Line>
              ) : (
                <Line href={CITY_LINK}>
                  Ready for Apartment boss! Adventure in the Apartment Building.
                </Line>
              )
            ) : (
              <Line href={CITY_LINK}>
                Apartment NC next turn! Try to get Thrice-Cursed first.
              </Line>
            )
          ) : (
            <Line href={CITY_LINK}>
              Burn {nextElevator - apartmentTurns} turns
              {apartment.noncombatQueue?.includes("Action Elevator")
                ? " (we think) "
                : " "}
              of delay in the Apartment Building.
            </Line>
          )}
        </>,
      ],
    ]) ?? null
  );
};

const Office = () => {
  const step = questStep("questL11Business");
  const haveClip =
    have($item`boring binder clip`) && !have($item`McClusky file (complete)`);
  const needToUseClip =
    have($item`boring binder clip`) && have($item`McClusky file (page 5)`);
  const files = [
    $item`McClusky file (page 1)`,
    $item`McClusky file (page 2)`,
    $item`McClusky file (page 3)`,
    $item`McClusky file (page 4)`,
    $item`McClusky file (page 5)`,
  ];
  const neededFiles = have($item`McClusky file (complete)`)
    ? 0
    : 5 - files.findIndex((file) => !have(file));

  const office = $location`The Hidden Office Building`;
  const nextHoliday = Math.max(5, 5 * Math.floor(office.turnsSpent / 8));
  const officeReady =
    office.turnsSpent === nextHoliday || get("noncombatForcerActive");

  return (
    atStep(step, [
      [Step.UNSTARTED, <Unlock location={office} />],
      [
        Step.STARTED,
        <>
          {needToUseClip ? (
            <Line
              href={inventoryLink($item`boring binder clip`)}
              fontWeight="bold"
              color="red.500"
            >
              Use the boring binder clip to complete the McClusky file.
            </Line>
          ) : neededFiles > 0 || !haveClip ? (
            <Line href={CITY_LINK}>
              Find{" "}
              {commaAnd([
                neededFiles > 0 &&
                  `${plural(neededFiles, "more McClusky file")} from pygmy
              accountants`,
                !haveClip && "the boring binder clip from the NC",
              ])}
              .
            </Line>
          ) : (
            <Line></Line>
          )}
          {officeReady ? (
            <Line>Office NC next turn!</Line>
          ) : (
            <Line href={CITY_LINK}>
              Burn {nextHoliday - office.turnsSpent} turns
              {office.noncombatQueue?.includes("Working Holiday")
                ? " (we think) "
                : " "}
              of delay in the Office Building.
            </Line>
          )}
        </>,
      ],
    ]) ?? null
  );
};

const HiddenCity = () => {
  const step = questStep("questL11Worship");
  return (
    <QuestTile
      header="Hidden City"
      minLevel={11}
      imageUrl="/images/adventureimages/ziggurat.gif"
      imageAlt="Hidden City"
      hide={
        !canAdventure($location`The Hidden Temple`) || step === Step.FINISHED
      }
    >
      {atStep(step, [
        [Step.STARTED, <Line>Find the Hidden Temple.</Line>],
        [
          1,
          <Line href={parentPlaceLink($location`The Hidden Temple`)}>
            {have($item`the Nostril of the Serpent`)
              ? "Find the Nostril of the Serpent."
              : "Find the pikachu door in the Hidden Heart."}
          </Line>,
        ],
        [
          2,
          <Line>
            You ain't no hollaback girl. B-A-N-A-N-A-S. Let it all burn.
          </Line>,
        ],
        [
          3,
          <>
            <Apartment />
            <Office />
          </>,
        ],
        [
          4,
          <Line>
            Go to the Massive Zigurat and fight the Protector Spectre!
          </Line>,
        ],
      ])}
    </QuestTile>
  );
};

export default HiddenCity;
