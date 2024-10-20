import {
  availableAmount,
  canAdventure,
  canEquip,
  haveEffect,
  haveEquipped,
  Location,
  myAscensions,
  myPath,
  numericModifier,
} from "kolmafia";
import {
  $effect,
  $item,
  $items,
  $location,
  $path,
  get,
  have,
  questStep,
} from "libram";

import Line from "../../../components/Line";
import MainLink from "../../../components/MainLink";
import QuestTile from "../../../components/QuestTile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { inventoryLink, parentPlaceLink } from "../../../util/links";
import { atStep, questFinished, Step } from "../../../util/quest";
import { commaAnd, plural } from "../../../util/text";

const CITY_LINK = "/place.php?whichplace=hiddencity";

function tavernUnlocked(): boolean {
  return get("hiddenTavernUnlock") >= myAscensions();
}

function lianasFought(location: Location) {
  return myPath() === $path`Avant Guard`
    ? location.turnsSpent / 2
    : location.turnsSpent;
}

interface UnlockProps {
  shrine: Location;
  location: Location;
}
const Unlock: React.FC<UnlockProps> = ({ shrine, location }) => {
  const lianasLeft = 3 - lianasFought(shrine);
  return (
    <Line href={CITY_LINK}>
      Unlock {location.identifierString} ({lianasLeft === 0 ? "no" : lianasLeft}{" "}
      lianas left).
    </Line>
  );
};

const machetes = $items`antique machete, muculent machete, machetito`;
function haveMachete() {
  return machetes.some((item) => have(item));
}

const Machete = () => {
  const hiddenPark = $location`The Hidden Park`;
  const delayRemaining = Math.max(0, 6 - hiddenPark.turnsSpent);
  const canadiaSign = canAdventure($location`Outskirts of Camp Logging Camp`);
  const janitorsRelocated = get("relocatePygmyJanitor") === myAscensions();
  const doneWithCursedPunch =
    get("hiddenApartmentProgress") >= 8 ||
    have($effect`Thrice-Cursed`) ||
    (have($item`candy cane sword cane`) &&
      !get("candyCaneSwordApartmentBuilding") &&
      have($effect`Twice-Cursed`));
  const doneWithBowlOfScorpions =
    availableAmount($item`bowling ball`) + get("hiddenBowlingAlleyProgress") >=
    6;
  const needBookOfMatches =
    get("hiddenTavernUnlock") < myAscensions() &&
    !have($item`book of matches`) &&
    !(doneWithCursedPunch && doneWithBowlOfScorpions);

  return (
    <>
      <Line href={parentPlaceLink(hiddenPark)}>
        Find a machete, maybe in the Hidden Park.
      </Line>
      {delayRemaining > 0 ? (
        <Line>
          {plural(delayRemaining, "turn")} of delay for antique machete.
        </Line>
      ) : (
        <Line>Antique machete next turn.</Line>
      )}
      {janitorsRelocated ? (
        needBookOfMatches && (
          <Line>
            Find a book of matches from a pygmy janitor while you're there
            {numericModifier("Item Drop") < 400 ? " (need +400% item)" : ""}.
          </Line>
        )
      ) : (
        <Line>Find NC to relocate janitors while you're there.</Line>
      )}
      {canadiaSign && (
        <Line href={parentPlaceLink($location`Outskirts of Camp Logging Camp`)}>
          Or find forest tears from Lucky! or a forest spirit in the Outskirts
          of Camp Logging Camp, for a muculent machete.
        </Line>
      )}
    </>
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
  const nextElevator =
    apartment.forceNoncombat + apartment.lastNoncombatTurnsSpent;
  const apartmentReady =
    apartmentTurns === nextElevator || get("noncombatForcerActive");

  return (
    atStep(step, [
      [
        Step.UNSTARTED,
        <Unlock
          shrine={$location`An Overgrown Shrine (Northwest)`}
          location={apartment}
        />,
      ],
      [
        Step.STARTED,
        <>
          <Line href={CITY_LINK} fontWeight="bold">
            Hidden Apartment Building
          </Line>
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
    have($item`boring binder clip`) || have($item`McClusky file (complete)`);
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
  const nextHoliday = office.forceNoncombat + office.lastNoncombatTurnsSpent;
  const officeReady =
    office.turnsSpent === nextHoliday || get("noncombatForcerActive");

  return (
    atStep(step, [
      [
        Step.UNSTARTED,
        <Unlock
          shrine={$location`An Overgrown Shrine (Northeast)`}
          location={office}
        />,
      ],
      [
        Step.STARTED,
        <>
          <Line href={CITY_LINK} fontWeight="bold">
            Hidden Office Building
          </Line>
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
          ) : null}
          {officeReady ? (
            <Line>Office NC next turn!</Line>
          ) : (
            <Line href={CITY_LINK}>
              Burn {nextHoliday - office.turnsSpent} turns of delay in the
              Office Building.
            </Line>
          )}
        </>,
      ],
    ]) ?? null
  );
};

const BowlingAlley = () => {
  const bowlingProgress = get("hiddenBowlingAlleyProgress");
  const scorchedStoneSphere = $item`scorched stone sphere`;
  const bowlingBall = $item`bowling ball`;
  const bowlOfScorpions = $item`Bowl of Scorpions`;
  const candyCaneSwordCane = $item`candy cane sword cane`;

  if (bowlingProgress >= 8) return null;

  const numberOfRollsLeft = 6 - bowlingProgress;
  const haveCcsc = have(candyCaneSwordCane);
  const ccscEquipped = haveEquipped(candyCaneSwordCane);
  const canSkipRoll = haveCcsc && !get("candyCaneSwordBowlingAlley");
  const bowlsNeeded = Math.max(0, numberOfRollsLeft - (canSkipRoll ? 1 : 0));
  const bowlingBallsNeeded = Math.max(
    0,
    bowlsNeeded - availableAmount(bowlingBall),
  );

  return bowlingProgress === 0 ? (
    <Unlock
      shrine={$location`An Overgrown Shrine (Southeast)`}
      location={$location`The Hidden Bowling Alley`}
    />
  ) : bowlingProgress === 7 && have(scorchedStoneSphere) ? (
    <Line href={CITY_LINK}>Place scorched stone sphere in SE shrine.</Line>
  ) : (
    <>
      <Line href={CITY_LINK} fontWeight="bold">
        Hidden Bowling Alley
      </Line>
      {haveCcsc && !ccscEquipped && (
        <Line href={inventoryLink(candyCaneSwordCane)} fontWeight="bold">
          Equip the candy cane sword cane to skip a roll.
        </Line>
      )}
      {bowlingBallsNeeded > 0 && (
        <Line href={CITY_LINK}>
          Find {plural(bowlingBallsNeeded, "more bowling ball")} by fighting
          pygmy bowlers.
        </Line>
      )}
      {numberOfRollsLeft > 0 && (
        <Line href={CITY_LINK}>
          Adventure {plural(bowlsNeeded, "more time")} with bowling balls to
          fight spirit
          {canSkipRoll ? " (after skipping one roll with CCSC)" : ""}.
        </Line>
      )}
      {tavernUnlocked() ? (
        !get("banishedMonsters").includes("drunk pygmy") ? (
          !have(bowlOfScorpions) ? (
            <Line
              href="/shop.php?whichshop=hiddentavern"
              fontWeight="bold"
              color="red.500"
            >
              Buy bowl of scorpions from the Hidden Tavern to free run.
            </Line>
          ) : (
            <Line href={inventoryLink(bowlOfScorpions)}>
              Use bowl of scorpions on drunk pygmy for free run.
            </Line>
          )
        ) : null
      ) : (
        <Line color="gray.500">
          Unlock the hidden tavern for free runs from drunk pygmies.
        </Line>
      )}
    </>
  );
};

const Hospital = () => {
  const hospitalProgress = get("hiddenHospitalProgress");
  const drippingStoneSphere = $item`dripping stone sphere`;

  if (hospitalProgress >= 8) return null;

  const equippableOutfitPieces = [
    $item`bloodied surgical dungarees`,
    $item`surgical mask`,
    $item`head mirror`,
    $item`half-size scalpel`,
    $item`surgical apron`,
  ].filter((item) => canEquip(item));

  const ownedOutfitPieces = equippableOutfitPieces.filter((item) => have(item));
  const unequippedOutfitPieces = ownedOutfitPieces.filter(
    (item) => !haveEquipped(item),
  );
  const numberOfEquippedPieces =
    ownedOutfitPieces.length - unequippedOutfitPieces.length;

  const hospital = $location`The Hidden Hospital`;

  return hospitalProgress === 0 ? (
    <Unlock
      shrine={$location`An Overgrown Shrine (Southwest)`}
      location={hospital}
    />
  ) : hospitalProgress === 7 && have(drippingStoneSphere) ? (
    <Line href={CITY_LINK}>Place dripping stone sphere in SW shrine.</Line>
  ) : (
    <>
      <Line href={CITY_LINK} fontWeight="bold">
        Hidden Hospital
      </Line>
      {unequippedOutfitPieces.length > 0 && (
        <Line fontWeight="bold" color="red.500">
          Equip your {commaAnd(unequippedOutfitPieces)} first.
        </Line>
      )}
      {ownedOutfitPieces.length < equippableOutfitPieces.length && (
        <>
          <Line>Fight pygmy surgeons to get surgeon gear:</Line>
          {equippableOutfitPieces
            .filter((item) => availableAmount(item) === 0)
            .map((item) => (
              <Line key={item.name} ml={2}>
                • {item.name}
              </Line>
            ))}
          <Line>olfact surgeon</Line>
        </>
      )}
      <Line>{numberOfEquippedPieces * 10}% chance to fight spirit.</Line>
      {hospital.turnsSpent >= 8 && (
        <Line color="gray.500">
          Alternatively, burn {31 - hospital.turnsSpent} more turns.
        </Line>
      )}
    </>
  );
};

const Ziggurat: React.FC = () => {
  const stoneTriangle = $item`stone triangle`;

  const atLastSpirit = availableAmount(stoneTriangle) === 4;

  const spheresAvailable =
    availableAmount($item`moss-covered stone sphere`) +
    availableAmount($item`dripping stone sphere`) +
    availableAmount($item`crackling stone sphere`) +
    availableAmount($item`scorched stone sphere`);

  const massiveZiggurat = $location`A Massive Ziggurat`;

  return lianasFought(massiveZiggurat) < 3 ? (
    <Unlock shrine={massiveZiggurat} location={massiveZiggurat} />
  ) : !atLastSpirit ? null : spheresAvailable > 0 ? (
    <Line href={CITY_LINK}>Acquire stone triangles from shrines.</Line>
  ) : myPath() === $path`Actually Ed the Undying` ? (
    <Line href={CITY_LINK}>Talk to the protector spectre.</Line>
  ) : (
    <Line href={CITY_LINK}>Fight the protector spectre!</Line>
  );
};

const HiddenCity = () => {
  const step = questStep("questL11Worship");
  const ascensions = myAscensions();
  const lastTempleAdventures = get("lastTempleAdventures");
  const stoneFacedTurns = haveEffect($effect`Stone-Faced`);
  const lianasCanBeFree =
    myPath() !== $path`Avant Guard` && myPath() !== $path`BIG!`;

  useNag(
    () => ({
      id: "stone-faced-nag",
      priority: NagPriority.HIGH,
      node: stoneFacedTurns > 0 &&
        (lastTempleAdventures < ascensions || step < Step.FINISHED) && (
          <QuestTile
            header="You Are Stone-Faced"
            imageUrl="/images/itemimages/stonewool.gif"
            imageAlt="stone wool"
          >
            <Line>
              Adventure in the Hidden Temple in the next {stoneFacedTurns}{" "}
              turns.
            </Line>
          </QuestTile>
        ),
    }),
    [ascensions, lastTempleAdventures, step, stoneFacedTurns],
  );

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Secret of the Hidden City"
      minLevel={11}
      imageUrl="/images/adventureimages/ziggurat.gif"
      imageAlt="Hidden City"
      href={step < 2 ? "/woods.php" : "/place.php?whichplace=hiddencity"}
      disabled={
        !canAdventure($location`The Hidden Temple`) ||
        !questFinished("questL11Black")
      }
    >
      {atStep(step, [
        [
          Step.STARTED,
          <>
            <Line>Find the Hidden Temple.</Line>
          </>,
        ],
        [
          1,
          <>
            {stoneFacedTurns === 0 &&
              (have($item`stone wool`) ? (
                <Line>Find some stone wool or otherwise get Stone-Faced.</Line>
              ) : (
                <Line command="use stone wool">
                  Use your stone wool and go to the Hidden Temple.
                </Line>
              ))}
            <Line href={parentPlaceLink($location`The Hidden Temple`)}>
              {!have($item`the Nostril of the Serpent`)
                ? "Find the Nostril of the Serpent."
                : "Find the pikachu door in the Hidden Heart."}
            </Line>
          </>,
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
            {get("hiddenTavernUnlock") < myAscensions() &&
              have($item`book of matches`) && (
                <Line command="use book of matches">
                  Use your book of matches to unlock the Hidden Tavern.
                </Line>
              )}
            {!haveMachete() && lianasCanBeFree ? (
              <Machete />
            ) : (
              <>
                <Apartment />
                <Office />
                <BowlingAlley />
                <Hospital />
                <Ziggurat />
              </>
            )}
          </>,
        ],
      ])}
    </QuestTile>
  );
};

export default HiddenCity;
