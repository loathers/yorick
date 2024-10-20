import {
  availableAmount,
  getWorkshed,
  Item,
  mySpleenUse,
  Skill,
  spleenLimit,
} from "kolmafia";
import { $effect, $item, $skill, clamp, get, have, sum } from "libram";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { plural } from "../../util/text";

interface FreeKillSource {
  source: Item | Skill;
  thing: Item | Skill;
  caption?: () => string;
  captionPlural?: () => string;
  remaining: () => number;
}

// TODO: Add mafia middle finger ring, tennis ball

const freeKillSources: FreeKillSource[] = [
  {
    source: $skill`Shattering Punch`,
    thing: $skill`Shattering Punch`,
    remaining: () => 3 - get("_shatteringPunchUsed"),
  },
  {
    source: $skill`Gingerbread Mob Hit`,
    thing: $skill`Gingerbread Mob Hit`,
    remaining: () => (get("_gingerbreadMobHitUsed") ? 0 : 1),
  },
  {
    source: $item`Asdon Martin keyfob (on ring)`,
    thing: $skill`Asdon Martin: Missile Launcher`,
    caption: () => "Missile Launcher",
    remaining: () =>
      getWorkshed() === $item`Asdon Martin keyfob (on ring)` &&
      !get("_missileLauncherUsed")
        ? 1
        : 0,
  },
  {
    source: $item`Lil' Doctor™ bag`,
    thing: $skill`Chest X-Ray`,
    remaining: () => 3 - get("_chestXRayUsed"),
  },
  {
    source: $item`replica bat-oomerang`,
    thing: $item`replica bat-oomerang`,
    remaining: () => 3 - get("_usedReplicaBatoomerang"),
  },
  {
    source: $item`Everfull Dart Holster`,
    thing: $skill`Darts: Aim for the Bullseye`,
    caption: () => "darts bullseye",
    remaining: () => (have($effect`Everything Looks Red`) ? 0 : 1),
  },
  {
    source: $item`Breathitin™`,
    thing: $item`Breathitin™`,
    remaining: () =>
      clamp(
        availableAmount($item`Breathitin™`),
        0,
        Math.floor((spleenLimit() - mySpleenUse()) / 2),
      ),
  },
  {
    source: $item`powdered madness`,
    thing: $item`powdered madness`,
    remaining: () =>
      Math.min(
        availableAmount($item`powdered madness`),
        5 - get("_powderedMadnessUses"),
      ),
  },
];

const FreeKills: React.FC = () => {
  const count = sum(freeKillSources, ({ source, remaining }) =>
    have(source) ? remaining() : 0,
  );
  return (
    count > 0 && (
      <Tile
        header={plural(count, "free kill")}
        id="free-kills"
        imageUrl="/images/itemimages/kneestick.gif"
      >
        {freeKillSources.map(
          ({ source, thing, caption, captionPlural, remaining }) =>
            !have(source) || remaining() <= 0 ? null : (
              <Line
                key={source.identifierString}
                color={have(thing) ? undefined : "gray.500"}
              >
                {plural(
                  remaining(),
                  caption?.() ?? thing.name,
                  captionPlural?.() ??
                    ("plural" in thing ? thing.plural : `${thing.name}s`),
                )}
              </Line>
            ),
        )}
      </Tile>
    )
  );
};

export default FreeKills;
