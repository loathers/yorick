import { Familiar, getWorkshed, isUnrestricted, Item, Skill } from "kolmafia";
import { have } from "libram";

export function haveUnrestricted(thing: Item | Skill | Familiar) {
  // isUnrestricted has overloads for Item, Skill, Familiar.
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isUnrestricted(thing as any) &&
    (have(thing) || getWorkshed().name === thing.name)
  );
}
