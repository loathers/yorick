import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useMyLevel } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $skill, $item } from "../../util/makeValue";
import { plural } from "../../util/text";

// ==== TILE TO-DO LIST ==================
//   - Want to figure out a good way to make the bullets into links to the respective zones or containers.
//   - Add more map targets with more conditions on them. (If you have a spit up, you probably want to map a good spit dude, for instance.)
//   - Better ways to re-order & re-prioritize the map targets.
//   - Can we do a for loop within the <Tile> to enumerate mapTarget? That would be so much better if it is at all possible.

/**
 * Class used to store map targets. Unless otherwise specified, all params are strings.
 * @param monster The monster in question
 * @param zone The zone you'll find the monster in
 * @param level The level this map target is feasible (number)
 * @param access A way to pass in a custom condition for accessibility (boolean)
 */

class mapTarget {
  monster: string;
  zone: string;
  level: number;
  access: boolean;
  turnsTilGROPs: number;

  constructor(
    monster: string,
    zone: string,
    level: number,
    access?: boolean,
    turnsTilGROPs?: number
  ) {
    this.monster = monster;
    this.zone = zone;
    this.level = level;
    this.access = access ?? true;
    this.turnsTilGROPs = turnsTilGROPs ?? 0;
  }

  /**
   * Returns true/false depending on if you are at a level high enough to access this monster.
   * @param monster The monster in question
   */
  accessible(userLevel: number): boolean {
    return this.access && userLevel > this.level;
  }

  /**
   * Returns a string for the mapTarget to feed into your <Line> statement.
   */
  formatString(): string {
    let output = "";

    // We want to output special text for GROP availability. There are three possible states:

    //   - Grops are available, in which case it just does exactly what the bullets normally do.
    //   - Grops are available in <20 turns, in which case it just lets you know they'll be ready in X turns.
    //   - Grops are available in >20 turns, in which case it adds a note that you should probably do more sidequests.

    // Currently builds a string with "string" + var + "string" logic and encases things in a (condition ? ifTrue : ifFalse) thing.
    //   I'm totally happy to revisit this if this is hard to read; I don't love it, but this seems like a useful feature.

    if (this.monster === "Green Ops Soldier") {
      return (output =
        " • " +
        this.monster +
        (this.turnsTilGROPs > 0
          ? " (possible in " +
            plural(this.turnsTilGROPs, "war turn") +
            (this.turnsTilGROPs > 20 ? "; do war sidequests?" : "") +
            ")"
          : " @ " + this.zone));
    } else {
      return (output = " • " + this.monster + " @ " + this.zone);
    }
  }
}

/**
 * Summarizes # of maps remaining & recommends usage ideas
 * @returns A tile describing the Backup Camera
 */

const Cartography = () => {
  const _mapUses = 3 - useGet("_monstersMapped", 0);
  const userLevel = useMyLevel() ?? 0;

  // This next portion tabulates the number of turns until GROPs are unlocked. You need these quest prefs to know how many hippies a single war turn advances the war.
  const lighthouseQuest = +(
    useGet("sidequestLighthouseCompleted") === "fratboy"
  );
  const arenaQuest = +(useGet("sidequestArenaCompleted") === "fratboy");
  const junkyardQuest = +(useGet("sidequestJunkyardCompleted") === "fratboy");
  const orchardQuest = +(useGet("sidequestOrchardCompleted") === "fratboy");
  const nunsQuest = +(useGet("sidequestNunsCompleted") === "fratboy");
  const hippiesPerFight = Math.pow(
    2,
    nunsQuest + orchardQuest + junkyardQuest + arenaQuest + lighthouseQuest
  );

  // Battlefield spading from Aen shows that GROPs appear @ 400 hippy kills, but not before.
  const hippiesKilled = useGet("hippiesDefeated");
  const turnsToGROPs = Math.ceil(
    Math.max(401 - hippiesKilled, 0) / hippiesPerFight
  );

  // General access strings to pass into my Map Target list
  const gropReqs = true; // !(useGet("warProgress") === "finished");
  const healerReqs = !useHave($item`amulet of extreme plot significance`);

  // This lists out possible map targets. Currently just three guys.
  const allMapTargets = [
    new mapTarget(
      "Green Ops Soldier",
      "The Battlefield",
      12,
      gropReqs,
      turnsToGROPs
    ),
    new mapTarget("Quiet Healer", "Penultimate Airship", 10, healerReqs),
    new mapTarget("Lobsterfrogman", "Sonofa Beach", 12, !junkyardQuest),
  ];

  // Once I have more map targets here, I'll pull in the recc code from Camel.
  const recommendations = allMapTargets;

  return (
    <Tile
      header="Cartography Compendium"
      imageUrl="/images/itemimages/Cccbook.gif"
      hide={!useHave($skill`Comprehensive Cartography`) || _mapUses === 0}
    >
      <Line>You have {_mapUses} maps remaining. Map the monster ideas:</Line>
      {recommendations[0].accessible(userLevel) && (
        <Line>{recommendations[0].formatString()}</Line>
      )}
      {recommendations[1].accessible(userLevel) && (
        <Line>{recommendations[1].formatString()}</Line>
      )}
      {recommendations[2].accessible(userLevel) && (
        <Line>{recommendations[2].formatString()}</Line>
      )}
    </Tile>
  );
};

export default Cartography;
