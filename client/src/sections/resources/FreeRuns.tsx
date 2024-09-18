import { Text } from "@chakra-ui/react";
import { availableAmount, Item, Skill } from "kolmafia";
import { $item, $skill, get, have, sum } from "libram";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { plural } from "../../util/text";

interface FreeRunSource {
  source: Item | Skill;
  thing: Item | Skill;
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
    thing: $skill`Feel Envy`,
    remaining: () => 3 - get("_feelEnvyUsed"),
  },
  {
    source: $item`familiar scrapbook`,
    thing: $skill`Show your boring familiar pictures`,
    caption: () => "scrapbook banish",
    captionPlural: () => "scrapbook banishes",
    remaining: () => Math.floor(get("scrapbookCharges") / 100),
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
];

const FreeRuns: React.FC = () => {
  return (
    <Tile
      header={plural(
        sum(freeRunSources, ({ remaining }) => remaining()),
        "free run",
      )}
      imageUrl="/images/itemimages/snokebomb.gif"
    >
      {freeRunSources.map(
        ({ source, thing, caption, captionPlural, remaining }) =>
          !have(source) || remaining() <= 0 ? null : (
            <Line key={source.identifierString}>
              <Text as="span" color={have(thing) ? undefined : "gray.500"}>
                {plural(
                  remaining(),
                  caption?.() ?? thing.name,
                  captionPlural?.() ??
                    ("plural" in thing ? thing.plural : `${thing.name}s`),
                )}
              </Text>
            </Line>
          ),
      )}
    </Tile>
  );
};

export default FreeRuns;
