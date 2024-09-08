import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import {
  combatRateModifier,
  equippedAmount,
  getCounter,
  haveEffect,
  haveEquipped,
  inBadMoon,
  inebrietyLimit,
  myAscensions,
  myInebriety,
  myPath,
  myTurncount,
  numericModifier,
} from "kolmafia";
import {
  $effect,
  $item,
  $location,
  $monster,
  $path,
  $skill,
  get,
  have,
  questStep,
} from "libram";

import { Hot, Stench } from "../../components/ElementName";
import Line from "../../components/Line";
import MainLink from "../../components/MainLink";
import Monsters from "../../components/Monsters";
import QuestTile from "../../components/QuestTile";
import { haveUnrestricted } from "../../util/available";
import { inventoryLink, parentPlaceLink } from "../../util/links";
import { questFinished } from "../../util/quest";
import { commaAnd, commaOr, plural, truthy } from "../../util/text";

const HauntedKitchen: React.FC = () => {
  const kitchen = $location`The Haunted Kitchen`;
  const hotResistance = Math.min(Math.floor(numericModifier("Hot Resistance")), 9);
  const stenchResistance = Math.min(Math.floor(numericModifier("Stench Resistance")), 9);
  const drawersPerTurn =
    1 + Math.max(hotResistance / 6, 0) + Math.max(stenchResistance / 6, 0);
  const drawersNeeded = Math.max(0, 21 - get("manorDrawerCount"));
  const kitchenTurns = Math.ceil(drawersNeeded / drawersPerTurn) + 1;

  // TODO: Pull out and use for Desert/8-Bit too.
  const vhs = getCounter("Spooky VHS tape");
  const wandererSources = truthy([
    vhs >= 0 && `VHS tape in ${plural(vhs, "turn")}`,
    haveUnrestricted($item`2002 Mr. Store Catalog`) && `later VHS tapes`,
    haveUnrestricted($item`cursed magnifying glass`) && "void wanderers",
    haveUnrestricted($skill`Just the Facts`) &&
      (get("_monsterHabitatsRecalled") < 3 ||
        get("_monsterHabitatsFightsLeft") > 0) &&
      "habitats",
  ]);

  return (
    <>
      <Line href={parentPlaceLink(kitchen)}>
        Adventure in the Haunted Kitchen to unlock the Billiards Room.
      </Line>
      {wandererSources.length > 0 && (
        <Line>Place {commaOr(wandererSources)} for free progress.</Line>
      )}
      {(hotResistance < 9 || stenchResistance < 9) && (
          <Line>
            Run{" "}
            {commaAnd([
              hotResistance < 9 && (<Text as="span">{9 - hotResistance} more <Hot/> resistance</Text>),
              stenchResistance < 9 && (<Text as="span">{9 - stenchResistance} more <Stench/> resistance</Text>),
            ])}{" "}
            to search faster.
          </Line>
        )}
      <Line>
        {drawersPerTurn.toFixed(1)} drawers per turn.{" "}
        {hotResistance >= 9 && stenchResistance >= 9 ? "" : "~"}
        {plural(drawersNeeded, "drawer")} ({plural(kitchenTurns, "turn")}) left.
      </Line>
      {inebrietyLimit() > 10 && myInebriety() < 10 && (
        <Line>Try not to drink past ten, the billiards room is next.</Line>
      )}
    </>
  );
};

const HauntedBilliardsRoom: React.FC = () => {
  const billiards = $location`The Haunted Billiards Room`;

  const poolSkill = get("poolSkill") + numericModifier("Pool Skill");
  const theoreticalHiddenPoolSkill =
    myInebriety() <= 10 ? myInebriety() : 10 - (myInebriety() - 10) * 2;
  const estimatedPoolSkill =
    poolSkill +
    theoreticalHiddenPoolSkill +
    Math.min(Math.floor(2 * Math.sqrt(get("poolSharkCount"))), 10);

  return (
    <>
      <Line href={parentPlaceLink(billiards)}>
        Adventure in the Haunted Billiards Room to unlock the Library.
      </Line>
      <Line>
        Train pool skill via -combat. Need 14 up to 18 total pool skill. Have ~
        {estimatedPoolSkill} pool skill.
      </Line>
      {estimatedPoolSkill < 18 && (
        <UnorderedList>
          {myInebriety() < 10 && inebrietyLimit() >= 10 && (
            <ListItem>Drink to 10 inebrierty for +pool skill.</ListItem>
          )}
          {have($item`Staff of Ed, almost`) && (
            <ListItem>Untinker the Staff of Ed, almost.</ListItem>
          )}
          {have($item`[7964]Staff of Fats`) &&
            !haveEquipped($item`[7964]Staff of Fats`) && (
              <ListItem>Equip the Staff of Fats for +pool skill.</ListItem>
            )}
          {!have($item`pool cue`) && <ListItem>Find pool cue.</ListItem>}
          {have($item`pool cue`) &&
            !equippedAmount($item`pool cue`) &&
            myPath() !== $path`Gelatinous Noob` && (
              <ListItem>
                <MainLink href={inventoryLink($item`pool cue`)}>
                  Equip pool cue for +pool skill.
                </MainLink>
              </ListItem>
            )}
          {!haveEffect($effect`Chalky Hand`) &&
            have($item`handful of hand chalk`) && (
              <ListItem>
                <MainLink href={inventoryLink($item`handful of hand chalk`)}>
                  Use handful of hand chalk for +pool skill and faster pool
                  skill training.
                </MainLink>
              </ListItem>
            )}
        </UnorderedList>
      )}
    </>
  );
};

const HauntedLibrary: React.FC = () => {
  const library = $location`The Haunted Library`;

  const gnasirProgress = get("gnasirProgress");
  const needKillingJar = !(gnasirProgress & 4);

  return (
    <>
      <Line href={parentPlaceLink(library)}>
        Adventure in the Library to unlock the second floor.
      </Line>
      <Line>
        Defeat{" "}
        <Text as="b">
          {plural(5 - get("writingDesksDefeated", 0), "more writing desk")}
        </Text>{" "}
        to acquire a necklace.
      </Line>
      <Line>
        <Monsters location={library} target={$monster`writing desk`} />
      </Line>
      {!have($item`killing jar`) &&
        get("desertExploration") < 100 &&
        needKillingJar && (
          <Line>
            Try to acquire a killing jar to speed up the desert later. 10% drop
            from banshee librarian. Use +900% item drop, YR, or pickpocket
            mechanism.
          </Line>
        )}
    </>
  );
};

const SecondFloor: React.FC = () => {
  const shoes = $item`Lady Spookyraven's dancing shoes`;
  const puff = $item`Lady Spookyraven's powder puff`;
  const gown = $item`Lady Spookyraven's finest gown`;

  return (
    <>
      {questStep("questM21Dance") < 3 && ( // step3 is right after giving all three items to Lady Spookyraven
        <>
          {!have(shoes) && (
            <Line href={parentPlaceLink($location`The Haunted Gallery`)}>
              Find Lady Spookyraven's dancing shoes in the Gallery.
            </Line>
          )}
          {!have(puff) && (
            <Line href={parentPlaceLink($location`The Haunted Bathroom`)}>
              Find Lady Spookyraven's powder puff in the Bathroom.
            </Line>
          )}
          {!have(gown) && (
            <Line href={parentPlaceLink($location`The Haunted Bedroom`)}>
              Find Lady Spookyraven's finest gown in the Bedroom.
            </Line>
          )}
          {have(shoes) && have(puff) && have(gown) && (
            <Line href={parentPlaceLink($location`The Haunted Ballroom`)}>
              Give Lady Spookyraven's items to her
            </Line>
          )}
        </>
      )}
      {questStep("questM21Dance") === 3 && (
        <Line href={parentPlaceLink($location`The Haunted Ballroom`)}>
          Dance with Lady Spookyraven in the Haunted Ballroom.
        </Line>
      )}
    </>
  );
};

const HauntedBallroom: React.FC = () => {
  const ballroom = $location`The Haunted Ballroom`;
  const ballroomDelay = 5 - ballroom.turnsSpent;
  const needBallroomSongSet =
    get("lastQuartetAscension") < myAscensions() &&
    (myPath() === $path`Gelatinous Noob` ||
      inBadMoon() ||
      (myTurncount() < 200 &&
        combatRateModifier() >= -25 &&
        ballroomDelay > 0));

  return (
    <>
      {needBallroomSongSet && (
        <>
          <Line href={parentPlaceLink($location`The Haunted Ballroom`)}>
            Possibly set -combat ballroom song.
          </Line>
          <Line>
            Do not skip the curtains NC the first time, this will make the
            ballroom song more likely to appear.
          </Line>
        </>
      )}
      {ballroomDelay > 0 && get("questL11Manor") !== "finished" && (
        <Line>
          Burn {plural(ballroomDelay, "turn")} of delay in the Ballroom.
        </Line>
      )}
    </>
  );
};

const Manor: React.FC = () => {
  const billiardsKey = $item`Spookyraven billiards room key`;
  const libraryKey = $item`[7302]Spookyraven library key`;
  const ballroom = $location`The Haunted Ballroom`;
  const ballroomProbablyOpen =
    ballroom.turnsSpent > 0 || questFinished("questM21Dance");
  const secondFloorProbablyOpen =
    get("lastSecondFloorUnlock") >= myAscensions() ||
    questFinished("questM20Necklace") ||
    have($item`ghost of a necklace`);
  const allDone = get("questL11Manor") === "finished";

  return (
    <QuestTile
      header="Spookyraven Manor"
      imageUrl="/images/adventureimages/lordspooky.gif"
      hide={allDone}
    >
      {have($item`telegram from Lady Spookyraven`) && (
        <Line href={inventoryLink($item`telegram from Lady Spookyraven`)}>
          Read telegram from Lady Spookyraven.
        </Line>
      )}
      {!have(billiardsKey) && <HauntedKitchen />}
      {have(billiardsKey) && !have(libraryKey) && <HauntedBilliardsRoom />}
      {have(libraryKey) && !secondFloorProbablyOpen && <HauntedLibrary />}
      {secondFloorProbablyOpen && !ballroomProbablyOpen && <SecondFloor />}
      {ballroomProbablyOpen && <HauntedBallroom />}
    </QuestTile>
  );
};

export default Manor;
