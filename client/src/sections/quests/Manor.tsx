import { ListItem } from "@chakra-ui/react";
import {
  combatRateModifier,
  equippedAmount,
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
import { $effect, $item, $location, $path, get, have } from "libram";

import BulletedList from "../../components/BulletedList";
import Line from "../../components/Line";
import MainLink from "../../components/MainLink";
import QuestTile from "../../components/QuestTile";
import { inventoryLink, parentPlaceLink } from "../../util/links";
import { questFinished } from "../../util/quest";
import { plural } from "../../util/text";

const Manor: React.FC = () => {
  const kitchen = $location`The Haunted Kitchen`;
  const billiards = $location`The Haunted Billiards Room`;
  const library = $location`The Haunted Library`;
  const ballroom = $location`The Haunted Ballroom`;

  const billiardsKey = $item`Spookyraven billiards room key`;
  const libraryKey = $item`[7302]Spookyraven library key`;

  const ballroomDelay = 5 - ballroom.turnsSpent;

  const needBallroomSongSet =
    myPath() === $path`Gelatinous Noob` ||
    inBadMoon() ||
    (get("lastQuartetAscension") < myAscensions() &&
      myTurncount() < 200 &&
      combatRateModifier() >= -25 &&
      ballroomDelay > 0);

  const ballroomProbablyOpen =
    ballroom.turnsSpent > 0 || questFinished("questM21Dance");

  const secondFloorProbablyOpen =
    get("lastSecondFloorUnlock") >= myAscensions() ||
    questFinished("questM20Necklace") ||
    have($item`ghost of a necklace`);

  const poolSkill = get("poolSkill") + numericModifier("Pool Skill");
  const theoreticalHiddenPoolSkill =
    myInebriety() <= 10 ? myInebriety() : 10 - (myInebriety() - 10) * 2;
  const estimatedPoolSkill =
    poolSkill +
    theoreticalHiddenPoolSkill +
    Math.min(Math.floor(2 * Math.sqrt(get("poolSharkCount"))), 10);

  const hotResistance = Math.min(numericModifier("Hot Resistance"), 9);
  const stenchResistance = Math.min(numericModifier("Stench Resistance"), 9);
  const drawersPerTurn =
    1 + Math.max(hotResistance / 6, 0) + Math.max(stenchResistance / 6, 0);
  const drawersNeeded = Math.max(0, 21 - get("manorDrawerCount"));
  const kitchenTurns = Math.ceil(drawersNeeded / drawersPerTurn) + 1;

  const gnasirProgress = get("gnasirProgress");
  const needKillingJar = !(gnasirProgress & 4);

  const shoes = $item`Lady Spookyraven's dancing shoes`;
  const puff = $item`Lady Spookyraven's powder puff`;
  const gown = $item`Lady Spookyraven's finest gown`;
  return (
    <QuestTile
      header="Unlock Spookyraven Manor"
      imageUrl="/images/adventureimages/lordspooky.gif"
      minLevel={5}
    >
      {have($item`telegram from Lady Spookyraven`) && (
        <Line href={inventoryLink($item`telegram from Lady Spookyraven`)}>
          Read telegram from Lady Spookyraven
        </Line>
      )}

      {!have(billiardsKey) && (
        <>
          <Line href={parentPlaceLink(kitchen)}>
            Adventure in the Haunted Kitchen to unlock the Billiards Room.
          </Line>
          <Line>
            Run {9 - hotResistance} more hot resistance and{" "}
            {9 - stenchResistance} more stench resistance to search faster.
          </Line>
          <Line>
            {drawersPerTurn.toFixed(1)} drawers searched per turn.{" "}
            {hotResistance >= 9 && stenchResistance >= 9 ? "" : "~"}
            {kitchenTurns} turns remaining, {drawersNeeded} drawers remaining.
          </Line>
          {inebrietyLimit() > 10 && myInebriety() < 10 && (
            <Line>Try not to drink past ten, the billiards room is next.</Line>
          )}
        </>
      )}

      {have(billiardsKey) && !have(libraryKey) && (
        <>
          <Line href={parentPlaceLink(billiards)}>
            Adventure in the Haunted Billiards Room to unlock the Library
          </Line>
          <Line>
            Train pool skill via -combat. Need 14 up to 18 total pool skill.
            Have ~{estimatedPoolSkill} pool skill.
          </Line>
          {estimatedPoolSkill < 18 && (
            <BulletedList>
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
                    <MainLink
                      href={inventoryLink($item`handful of hand chalk`)}
                    >
                      Use handful of hand chalk for +pool skill and faster pool
                      skill training.
                    </MainLink>
                  </ListItem>
                )}
            </BulletedList>
          )}
        </>
      )}

      {have(libraryKey) && !secondFloorProbablyOpen && (
        <>
          <Line href={parentPlaceLink(library)}>
            Adventure in the Library to unlock the second floor.
          </Line>
          <Line>
            Defeat{" "}
            {plural(5 - get("writingDesksDefeated", 0), "more writing desk")} to
            acquire a necklace.
          </Line>
          {!have($item`killing jar`) &&
            get("desertExploration") < 100 &&
            needKillingJar && (
              <Line>
                Try to acquire a killing jar to speed up the desert later. 10%
                drop from banshee librarian. Use +900% item drop, YR, or
                pickpocket mechanism.
              </Line>
            )}
        </>
      )}

      {secondFloorProbablyOpen && !ballroomProbablyOpen && (
        <>
          {get("questM21Dance") !== "finished" && ( // TODO: More detail here.
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
                <Line href={parentPlaceLink(ballroom)}>
                  Dance with Lady Spookyraven in the Haunted Ballroom.
                </Line>
              )}
            </>
          )}
        </>
      )}

      {ballroomProbablyOpen && needBallroomSongSet && (
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
    </QuestTile>
  );
};

export default Manor;
