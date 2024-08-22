import { Familiar, isUnrestricted, Item, Skill } from "kolmafia";
import { have } from "libram";

export function haveUnrestricted(thing: Item | Skill | Familiar) {
  // isUnrestricted has overloads for Item, Skill, Familiar.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return have(thing) && isUnrestricted(thing as any);
}
