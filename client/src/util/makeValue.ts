import * as kolmafia from "kolmafia";

export const placeholderTypes = {
  Bounty: "bounties",
  Class: "classes",
  Coinmaster: "coinmasters",
  Effect: "effects",
  Element: "elements",
  Familiar: "familiars",
  Item: "items",
  Location: "locations",
  Modifier: "modifiers",
  Monster: "monsters",
  Path: "paths",
  Phylum: "phyla",
  Servant: "servants",
  Skill: "skills",
  Slot: "slot",
  Stat: "stat",
  Thrall: "thralls",
  Vykea: "vykea",
} as const;

export type PlaceholderTypes = keyof typeof placeholderTypes;

export type Placeholder<T extends PlaceholderTypes> =
  | {
      objectType: T;
      identifierString: string;
    }
  | {
      objectType: T;
      identifierNumber: number;
    };

export function makePlaceholder<T extends PlaceholderTypes>(
  objectType: T,
  identifier: string | number,
): Placeholder<T> {
  return {
    objectType,
    [typeof identifier === "number" ? "identifierNumber" : "identifierString"]:
      identifier,
  } as Placeholder<T>;
}

export function placeholderIdentifier<T extends PlaceholderTypes>(
  placeholder: Placeholder<T>,
): string | number {
  return "identifierString" in placeholder
    ? placeholder.identifierString
    : placeholder.identifierNumber;
}

export type Full<T extends PlaceholderTypes> = T extends "Bounty"
  ? kolmafia.Bounty
  : T extends "Class"
    ? kolmafia.Class
    : T extends "Coinmaster"
      ? kolmafia.Coinmaster
      : T extends "Effect"
        ? kolmafia.Effect
        : T extends "Element"
          ? kolmafia.Element
          : T extends "Familiar"
            ? kolmafia.Familiar
            : T extends "Item"
              ? kolmafia.Item
              : T extends "Location"
                ? kolmafia.Location
                : T extends "Modifier"
                  ? kolmafia.Modifier
                  : T extends "Monster"
                    ? kolmafia.Monster
                    : T extends "Path"
                      ? kolmafia.Path
                      : T extends "Phylum"
                        ? kolmafia.Phylum
                        : T extends "Servant"
                          ? kolmafia.Servant
                          : T extends "Skill"
                            ? kolmafia.Skill
                            : T extends "Slot"
                              ? kolmafia.Slot
                              : T extends "Stat"
                                ? kolmafia.Stat
                                : T extends "Thrall"
                                  ? kolmafia.Thrall
                                  : T extends "Vykea"
                                    ? kolmafia.Vykea
                                    : never;
