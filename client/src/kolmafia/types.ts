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

export const globalTypes = {
  Bounty: makeType<types.Bounty>("Bounty"),
  Class: makeType<types.Class>("Class"),
  Coinmaster: makeType<types.Coinmaster>("Coinmaster"),
  Effect: makeType<types.Effect>("Effect"),
  Element: makeType<types.Element>("Element"),
  Familiar: makeType<types.Familiar>("Familiar"),
  Item: makeType<types.Item>("Item"),
  Location: makeType<types.Location>("Location"),
  Monster: makeType<types.Monster>("Monster"),
  Phylum: makeType<types.Phylum>("Phylum"),
  Servant: makeType<types.Servant>("Servant"),
  Skill: makeType<types.Skill>("Skill"),
  Slot: makeType<types.Slot>("Slot"),
  Stat: makeType<types.Stat>("Stat"),
  Thrall: makeType<types.Thrall>("Thrall"),
  Vykea: makeType<types.Vykea>("Vykea"),
};
