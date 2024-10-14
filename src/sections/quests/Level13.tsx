import { Modifier, myPath } from "kolmafia";
import { $item, $path, get, have, questStep } from "libram";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { AdviceTooltip } from "../../components/Tooltips";
import { Step } from "../../util/quest";

const Level13: React.FC = () => {
  const step = questStep("questL13Final");
  const inAftercore = get("kingLiberated");
  const inBugbearInvasion = myPath() === $path`Bugbear Invasion`;
  const inGreyGoo = myPath() === $path`Grey Goo`;
  const inActuallyEdTheUndying = myPath() === $path`Actually Ed the Undying`;

  if (
    inAftercore ||
    inBugbearInvasion ||
    inGreyGoo ||
    (step === Step.UNSTARTED && inActuallyEdTheUndying)
  ) {
    return null;
  }

  const statRaceType = get("nsChallenge1");
  const elementalDamageRaceType = get("nsChallenge2");
  const hedgeMazeElements = [
    get("telescope3"),
    get("telescope4"),
    get("telescope5"),
  ].filter(Boolean);

  const pastRaces = step === 4;
  const pastHedgeMaze = step === 6;
  const pastKeys = step === 7;
  const pastTowerLevel1 = step === 8;
  const pastTowerLevel2 = step === 9;
  const pastTowerLevel3 = step === 10;
  const pastTowerLevel4 = step === 11;
  const pastTowerLevel5 = step === 12;
  const kingWaitingToBeFreed = step === 14;

  const keysUsed = get("nsTowerDoorKeysUsed").split(",");

  if (!pastRaces) {
    return (
      <Tile
        header="Find the Naughty Sorceress"
        imageUrl="/images/adventureimages/ns_tower.gif"
      >
        <Line>Complete the races at the registration desk.</Line>
        {statRaceType && (
          <Line>Stat Race: {statRaceType.identifierString}</Line>
        )}
        {elementalDamageRaceType && (
          <Line>Elemental Damage Race: {elementalDamageRaceType}</Line>
        )}
      </Tile>
    );
  }

  if (!pastHedgeMaze) {
    return (
      <Tile
        header="Hedge Maze"
        imageUrl="/images/adventureimages/hedgemaze.gif"
      >
        <Line>Navigate the Hedge Maze in the Naughty Sorceress' Tower.</Line>
        {hedgeMazeElements.length > 0 && (
          <Line>Elements needed: {hedgeMazeElements.join(", ")}</Line>
        )}
      </Tile>
    );
  }

  if (!pastKeys) {
    const missingKeys = [
      "Boris's key",
      "Jarlsberg's key",
      "Sneaky Pete's key",
    ].filter((key) => !keysUsed.includes(key));
    return (
      <Tile
        header="Tower Door"
        imageUrl="/images/adventureimages/nstower_door.gif"
      >
        <Line>Open the tower door.</Line>
        {missingKeys.length > 0 && (
          <Line>Missing keys: {missingKeys.join(", ")}</Line>
        )}
      </Tile>
    );
  }

  if (!pastTowerLevel1) {
    return (
      <Tile
        header="Wall of Skin"
        imageUrl="/images/adventureimages/ns_wall1.gif"
      >
        <Line>Defeat the Wall of Skin.</Line>
        {have($item`beehive`) ? (
          <Line>Use the beehive against it.</Line>
        ) : (
          <Line>
            Find the beehive in the Black Forest (-combat), or towerkill.
          </Line>
        )}
      </Tile>
    );
  }

  if (!pastTowerLevel2) {
    return (
      <Tile
        header="Wall of Meat"
        imageUrl="/images/adventureimages/ns_wall2.gif"
      >
        <Line>Defeat the Wall of Meat.</Line>
        <Line>
          <AdviceTooltip
            text="You need 526% meat drop to guarantee a one-turn kill."
            label={`Current meat drop: ${Modifier.get("Meat Drop")}`}
          />
        </Line>
      </Tile>
    );
  }

  if (!pastTowerLevel3) {
    return (
      <Tile
        header="Wall of Bones"
        imageUrl="/images/adventureimages/ns_wall3.gif"
      >
        <Line>Defeat the Wall of Bones.</Line>
        {have($item`electric boning knife`) ? (
          <Line>Use the electric boning knife against it.</Line>
        ) : (
          <Line>
            Find the electric boning knife on the ground floor of the Castle in
            the Clouds in the Sky (-combat), or towerkill.
          </Line>
        )}
      </Tile>
    );
  }

  if (!pastTowerLevel4) {
    return (
      <Tile header="Mirror" imageUrl="/images/adventureimages/mirror.gif">
        <Line>Face the looking glass.</Line>
        <Line>
          Gazing upon the looking glass will cost a turn, but makes the Naughty
          Sorceress much easier.
        </Line>
        <Line>
          Breaking the mirror will save a turn, but makes the NS fight much more
          difficult.
        </Line>
      </Tile>
    );
  }

  if (!pastTowerLevel5) {
    return (
      <Tile header="Your Shadow" imageUrl="/images/adventureimages/shadow.gif">
        <Line>Fight your shadow.</Line>
        <Line>
          <AdviceTooltip
            text="You need enough initiative to go first against Your Shadow."
            label={`Current initiative: ${Modifier.get("Initiative")}`}
          />
        </Line>
      </Tile>
    );
  }

  if (!kingWaitingToBeFreed) {
    return (
      <Tile
        header="Naughty Sorceress"
        imageUrl="/images/adventureimages/ns.gif"
      >
        <Line>Defeat the Naughty Sorceress.</Line>
        <Line>Good luck!</Line>
      </Tile>
    );
  }

  return (
    <Tile header="Free King Ralph" imageUrl="/images/itemimages/nsstone.gif">
      <Line>Free King Ralph from his prism.</Line>
    </Tile>
  );
};

export default Level13;
