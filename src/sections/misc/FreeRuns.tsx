import {
  availableAmount,
  Item,
  mySpleenUse,
  Skill,
  spleenLimit,
} from "kolmafia";
import { $item, $skill, clamp, get, have, sum } from "libram";
import { FC } from "react";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { inventoryLink } from "../../util/links";
import { plural } from "../../util/text";

interface FreeRunSource {
  source: Item | Skill; // what do you need to have for this to be relevant?
  thing: Item | Skill; // what do you need to use to trigger this?
  caption?: () => string;
  captionPlural?: () => string;
  remaining: () => number;
}

// TODO: Add mafia middle finger ring, tennis ball

const freeRunSources: FreeRunSource[] = [
  {
    source: $skill`Snokebomb`,
    thing: $skill`Snokebomb`,
    remaining: () => 3 - get("_snokebombUsed"),
  },
  {
    source: $item`Kremlin's Greatest Briefcase`,
    thing: $skill`KGB tranquilizer dart`,
    remaining: () => 3 - get("_kgbTranquilizerDartUses"),
  },
  {
    source: $item`latte lovers member's mug`,
    thing: $skill`Throw Latte on Opponent`,
    caption: () => "latte banish",
    captionPlural: () => "latte banishes",
    remaining: () =>
      3 - get("_latteRefillsUsed") + (get("_latteBanishUsed") ? 0 : 1),
  },
  {
    source: $item`Lil' Doctor™ bag`,
    thing: $skill`Reflex Hammer`,
    remaining: () => 3 - get("_reflexHammerUsed"),
  },
  {
    source: $skill`Emotionally Chipped`,
    thing: $skill`Feel Hatred`,
    remaining: () => 3 - get("_feelHatredUsed"),
  },
  {
    source: $item`familiar scrapbook`,
    thing: $skill`Show your boring familiar pictures`,
    caption: () => "scrapbook banish",
    captionPlural: () => "scrapbook banishes",
    remaining: () => Math.floor(get("scrapbookCharges") / 100),
  },
  {
    source: $item`mafia middle finger ring`,
    thing: $skill`Show them your ring`,
    caption: () => "middle finger banish",
    captionPlural: () => "middle finger banishes",
    remaining: () => +!get("_mafiaMiddleFingerRingUsed"),
  },
  {
    source: $item`stuffed yam stinkbomb`,
    thing: $item`stuffed yam stinkbomb`,
    remaining: () => availableAmount($item`stuffed yam stinkbomb`),
  },
  {
    source: $item`handful of split pea soup`,
    thing: $item`handful of split pea soup`,
    remaining: () =>
      availableAmount($item`handful of split pea soup`) +
      Math.floor(availableAmount($item`whirled peas`) / 2),
  },
  {
    source: $item`anchor bomb`,
    thing: $item`anchor bomb`,
    remaining: () => availableAmount($item`anchor bomb`),
  },
  {
    source: $item`tennis ball`,
    thing: $item`tennis ball`,
    remaining: () => availableAmount($item`tennis ball`),
  },
  {
    source: $item`Louder Than Bomb`,
    thing: $item`Louder Than Bomb`,
    remaining: () => availableAmount($item`Louder Than Bomb`),
  },
  {
    source: $skill`Punch Out your Foe`,
    thing: $skill`Punch Out your Foe`,
    remaining: () =>
      get("preworkoutPowderUses") +
      clamp(
        availableAmount($item`scoop of pre-workout powder`),
        0,
        Math.floor((spleenLimit() - mySpleenUse()) / 3),
      ),
  },
];

const FreeRuns: FC = () => {
  const count = sum(freeRunSources, ({ source, remaining }) =>
    have(source) ? remaining() : 0,
  );
  return (
    count > 0 && (
      <Tile
        header={plural(count, "free run")}
        id="free-runs"
        imageUrl="/images/itemimages/snokebomb.gif"
      >
        {freeRunSources.map(
          ({ source, thing, caption, captionPlural, remaining }) =>
            !have(source) || remaining() <= 0 ? null : (
              <Line
                key={source.identifierString}
                color={have(thing) ? undefined : "fg.subtle"}
                href={
                  source instanceof Item && !have(thing)
                    ? inventoryLink(source)
                    : undefined
                }
              >
                {plural(
                  remaining(),
                  caption?.() ?? thing.name,
                  captionPlural?.() ??
                    ("plural" in thing ? thing.plural : `${thing.name}s`),
                )}
                .
              </Line>
            ),
        )}
      </Tile>
    )
  );
};

export default FreeRuns;
