import { Badge, ListItem } from "@chakra-ui/react";
import { haveEquipped, myAscensions, myFamiliar, myLevel } from "kolmafia";
import { $familiar, $item, get,have } from "libram";

import BulletedList from "../../components/BulletedList";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { haveUnrestricted } from "../../util/available";
import { plural } from "../../util/text";

interface SpitTargetProps {
  userLevel: number;
  target: SpitTarget;
}

// Generates a ListItem for a given spit target
const SpitTargetItem: React.FC<SpitTargetProps> = ({ userLevel, target }) => {
  if (!target.accessible(userLevel)) return <></>;
  return (
    <ListItem
      key={target.monster}
    >{`${target.monster} via ${target.zone}`}</ListItem>
  );
};

/**
 * Class used to store spit targets. Unless otherwise specified, all params are strings.
 * @param item The item targeted
 * @param monster The monster in question
 * @param zone The zone you'll find the monster in
 * @param level The level this spit target becomes feasible (number)
 * @param access A way to pass in a custom condition for accessibility (boolean)
 */

class SpitTarget {
  item: string;
  monster: string;
  zone: string;
  level: number;
  access: boolean;
  spitQuality: number;

  constructor(
    item: string,
    monster: string,
    zone: string,
    level: number,
    access?: boolean,
    spitQuality?: number
  ) {
    this.item = item;
    this.monster = monster;
    this.zone = zone;
    this.level = level;
    this.access = access ?? true;
    this.spitQuality = spitQuality ?? 4;
  }

  // Instead of crazy canAdv type stuff, this just shows spits if you are at a level higher than the level the spit would become accessible and combines that with an access parameter that has been passed in.
  accessible(userLevel: number): boolean {
    return this.access && userLevel > this.level;
  }

  // Small note regarding this class; yes, it's sparse, I know. I mostly like it
  //   as an example of how to do formatting within your recommendations, and think
  //   when we get to the point we can do tooltips within YORICK this construction
  //   will make it -much- easier to develop tooltips.
}

/**
 * Summarizes turns til a spit, and gives advice on what to spit based on what is accessible.
 * @returns A tile describing the Melodramedary
 */

const Melodramedary = () => {
  const usingCamel = myFamiliar()?.identifierString === "Melodramedary";
  const haveDrinkingHelmet = have($item`dromedary drinking helmet`);
  const equippedDrinkingHelmet = haveEquipped($item`dromedary drinking helmet`);
  const spitProgress = get("camelSpit") ?? 0;
  const userLevel = myLevel(); // used for quest-specific recommendations
  const ascensionNumber = myAscensions() ?? 1;
  const hitsMonster = ascensionNumber % 2 === 0 ? "Camel's Toe" : "Skinflute";
  const nostalgiaUses = get("_feelNostalgicUsed");

  // I wanted to create these upfront to make the spit target declaration a little cleaner. Also, I feel like we may eventually have a central source of truth for the questy stuff, so I wanted to be able to swap out easily.
  const bowlingRequirements = !(get("hiddenBowlingAlleyProgress") > 4);
  const gsbRequirements = !(get("warProgress") === "finished");
  const starKeyRequirements = get("questL10Garbage") in ["step10", "finished"];
  const gunpowderRequirements =
    get("sidequestLighthouseCompleted") === "none" && gsbRequirements;
  const evilEyeRequirements = !(get("cyrptNookEvilness") < 35);
  const mojoFilterRequirements = get("desertExploration") > 0;

  // This long statement attempts to build out recommendations. Here are the rankings I used.
  //   - #1: Bowling Balls (4 turns, if you need 4 balls)
  //   - #2: GSBs (3.6 turns)
  //   - #3: Star Key (~3 turns, hard to value!)
  //   - #4: Barrels of Gunpowder (2 turns, saves 2 backups as a nostalgia-spit)
  //   - #5: Evil Eyes (2-ish turns, hard to value!)
  //   - #6: Mojo Filters (Very good in unrestricted paths in CMC meta, likely 2.5-3 turns but 1 in standard, if even that)

  const allSpitTargets = [
    new SpitTarget(
      "Bowling Balls",
      "Pygmy Bowlers",
      "The Hidden Bowling Alley",
      11,
      bowlingRequirements
    ),
    new SpitTarget(
      "Green Smoke Bombs",
      "Green Ops Soldier",
      "The Battlefield",
      12,
      gsbRequirements
    ),
    new SpitTarget(
      "8 stars + 8 lines",
      hitsMonster,
      "The Hole in the Sky",
      10,
      starKeyRequirements
    ),
    new SpitTarget(
      "Barrels of Gunpowder",
      "Lobsterfrogman",
      "Sonofa Beach",
      12,
      gunpowderRequirements,
      2
    ),
    new SpitTarget(
      "Evil Eyes",
      "All non-partying Skeletons",
      "The Defiled Nook",
      7,
      evilEyeRequirements,
      2
    ),
    new SpitTarget(
      "Mojo Filters",
      "A Swarm of Scarab Beatles",
      "The Oasis",
      11,
      mojoFilterRequirements
    ),
  ];

  // We will only display the top 3 recommendations; iterate through the list and stop when recs are full

  const recommendations: SpitTarget[] = allSpitTargets
    .filter((target) => target.accessible(userLevel))
    .slice(0, 3);

  // My to-do list on this tile:
  //   -- Figure out what to suggest if no spits accessible
  //   -- Figure out how to add tooltips; then, pass both .formatString and .toolTip via spitTarget

  return (
    <Tile
      header="Melodramedary"
      imageUrl="/images/otherimages/Camelfam_left.gif"
      linkedContent={$familiar`Melodramedary`}
      hide={!haveUnrestricted($familiar`Melodramedary`)}
    >
      {spitProgress < 100 && (
        <Line>Current spit progress: {spitProgress}%</Line>
      )}
      {spitProgress < 100 && (
        <Line>
          {Math.floor((100 - spitProgress) / (haveDrinkingHelmet ? 4.5 : 3))}{" "}
          combats until your next spit.
        </Line>
      )}
      {spitProgress < 100 &&
        usingCamel &&
        haveDrinkingHelmet &&
        !equippedDrinkingHelmet && (
          <Line>
            You have a drinking helmet, but it isn't equipped. Equip it, buddy!
          </Line>
        )}
      {spitProgress === 100 && (
        <Line>
          <Badge p="1" m="1" mb="0" colorScheme="purple" fontWeight="bold">
            Ready to Spit!
          </Badge>
        </Line>
      )}
      {spitProgress === 100 && recommendations.length > 0 && (
        <BulletedList>
          {recommendations.slice(0, 2).map((recc) => (
            <SpitTargetItem
              key={recc.monster}
              userLevel={userLevel}
              target={recc}
            />
          ))}
        </BulletedList>
      )}
      {spitProgress === 100 && nostalgiaUses < 3 && (
        <Line>
          {plural(3 - nostalgiaUses, "use")} of "Feel Nostalgic" left. Consider
          using it!
        </Line>
      )}
    </Tile>
  );
};

export default Melodramedary;
