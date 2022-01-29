import { makePlaceholder, PlaceholderTypes } from "../util/makeValue";
import type { types } from "./kolmafia";
import { fillPlaceholder } from "./remote";

abstract class MafiaClass implements types.MafiaClass {
  abstract readonly objectType: PlaceholderTypes;
  abstract readonly identifierString: string;
  abstract readonly identifierNumber?: number | undefined;
}

export function makeType<T extends MafiaClass>(
  type: T["objectType"]
): { new (values: MafiaClass): T } {
  const newClass = class extends MafiaClass {
    readonly objectType: PlaceholderTypes;
    readonly identifierString: string;
    readonly identifierNumber?: number | undefined;

    constructor(values: MafiaClass) {
      super();
      this.objectType = values.objectType;
      this.identifierString = values.identifierString;
      this.identifierNumber = values.identifierNumber;
      Object.assign(this, values);
    }

    static get<T = typeof this>(
      this: {
        new (values: object): T;
      },
      idOrArray: number | string | (number | string)[]
    ): T | T[] {
      return Array.isArray(idOrArray)
        ? // @ts-ignore
          idOrArray.map((id) => this.get(id))
        : new this(
            fillPlaceholder(
              makePlaceholder(
                type as PlaceholderTypes,
                idOrArray as string | number
              )
            )
          );
    }

    static all<T = typeof this>(): T[] {
      return [];
    }
  };

  return newClass as unknown as { new (values: object): T };
}

export const Bounty = makeType<types.Bounty>("Bounty");
export const Class = makeType<types.Class>("Class");
export const Coinmaster = makeType<types.Coinmaster>("Coinmaster");
export const Effect = makeType<types.Effect>("Effect");
export const Element = makeType<types.Element>("Element");
export const Familiar = makeType<types.Familiar>("Familiar");
export const Item = makeType<types.Item>("Item");
export const Location = makeType<types.Location>("Location");
export const Monster = makeType<types.Monster>("Monster");
export const Phylum = makeType<types.Phylum>("Phylum");
export const Servant = makeType<types.Servant>("Servant");
export const Skill = makeType<types.Skill>("Skill");
export const Slot = makeType<types.Slot>("Slot");
export const Stat = makeType<types.Stat>("Stat");
export const Thrall = makeType<types.Thrall>("Thrall");
export const Vykea = makeType<types.Vykea>("Vykea");

export const globalTypes = {
  Bounty,
  Class,
  Coinmaster,
  Effect,
  Element,
  Familiar,
  Item,
  Location,
  Monster,
  Phylum,
  Servant,
  Skill,
  Slot,
  Stat,
  Thrall,
  Vykea,
};
