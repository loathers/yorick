import { makePlaceholder, PlaceholderTypes } from "../util/makeValue";
import { remoteCall } from "./remote";

type HasNumber<T> = T extends "Class" | "Effect" | "Item" | "Monster" | "Skill"
  ? true
  : false;

type ValidIdentifier<T extends boolean> = T extends true
  ? number | string
  : string;

abstract class MafiaClass<T extends PlaceholderTypes> {
  static readonly staticType: PlaceholderTypes;
  readonly objectType: T;
  readonly identifierString: string;
  readonly identifierNumber: HasNumber<T> extends true ? number : undefined;

  constructor(values: MafiaClass<T>) {
    this.objectType = values.objectType;
    this.identifierString = values.identifierString;
    this.identifierNumber = values.identifierNumber;
    this.replaceValues(values);
  }

  replaceValues(values: MafiaClass<T>) {
    Object.assign(this, values);
  }

  static get<U extends PlaceholderTypes, V extends MafiaClass<U>>(
    this: {
      new (values: MafiaClass<U>): V;
      readonly staticType: PlaceholderTypes;
    },
    idOrArray: ValidIdentifier<HasNumber<U>>
  ): V;
  static get<U extends PlaceholderTypes, V extends MafiaClass<U>>(
    this: {
      new (values: MafiaClass<U>): V;
      readonly staticType: PlaceholderTypes;
    },
    idOrArray: ValidIdentifier<HasNumber<U>>[]
  ): V[];
  static get<U extends PlaceholderTypes, V extends MafiaClass<U>>(
    this: {
      new (values: MafiaClass<U>): V;
      readonly staticType: PlaceholderTypes;
    },
    idOrArray: ValidIdentifier<HasNumber<U>> | ValidIdentifier<HasNumber<U>>[]
  ): V | V[] {
    const ids = Array.isArray(idOrArray) ? idOrArray : [idOrArray];

    const results = ids.map((id) => {
      const placeholder = makePlaceholder(this.staticType, id);
      const default_ =
        "identifierNumber" in placeholder
          ? {
              ...placeholder,
              identifierString: `${placeholder.identifierNumber}`,
            }
          : {
              ...placeholder,
              identifierNumber: -1,
            };
      return remoteCall("identity", [placeholder], default_) as V;
    });

    return Array.isArray(idOrArray) ? results : results[0];
  }

  static all<U extends PlaceholderTypes, V extends MafiaClass<U>>(): V[] {
    return [];
  }
}

export class Bounty extends MafiaClass<"Bounty"> {
  static readonly staticType = "Bounty";
  /**
   * Plural */
  readonly plural!: string;
  /**
   * Type */
  readonly type!: string;
  /**
   * Kol internal type */
  readonly kolInternalType!: string;
  /**
   * Number */
  readonly number!: number;
  /**
   * Image */
  readonly image!: string;
  /**
   * Monster */
  readonly monster!: Monster;
  /**
   * Location */
  readonly location!: Location;
}
export class Class extends MafiaClass<"Class"> {
  static readonly staticType = "Class";
  /**
   * Primestat */
  readonly primestat!: Stat;
}
export class Coinmaster extends MafiaClass<"Coinmaster"> {
  static readonly staticType = "Coinmaster";
  /**
   * Token */
  readonly token!: string;
  /**
   * Item */
  readonly item!: Item;
  /**
   * Property */
  readonly property!: string;
  /**
   * Available tokens */
  readonly availableTokens!: number;
  /**
   * Buys */
  readonly buys!: boolean;
  /**
   * Sells */
  readonly sells!: boolean;
  /**
   * Nickname */
  readonly nickname!: string;
}
export class Effect extends MafiaClass<"Effect"> {
  static readonly staticType = "Effect";
  /**
   * Name */
  readonly name!: string;
  /**
   * Default */
  readonly default!: string;
  /**
   * Quality */
  readonly quality!: string;
  /**
   * Attributes */
  readonly attributes!: string;
  /**
   * Note */
  readonly note!: string;
  /**
   * All */
  readonly all!: { [source: string]: boolean };
  /**
   * Image */
  readonly image!: string;
  /**
   * Descid */
  readonly descid!: string;
  /**
   * Candy tier */
  readonly candyTier!: number;
}
export class Element extends MafiaClass<"Element"> {
  static readonly staticType = "Element";
  /**
   * Image */
  readonly image!: string;
}
export class Familiar extends MafiaClass<"Familiar"> {
  static readonly staticType = "Familiar";
  /**
   * Hatchling */
  readonly hatchling!: Item;
  /**
   * Image */
  readonly image!: string;
  /**
   * Name */
  readonly name!: string;
  /**
   * Experience */
  readonly experience!: number;
  /**
   * Charges */
  readonly charges!: number;
  /**
   * Drop name */
  readonly dropName!: string;
  /**
   * Drop item */
  readonly dropItem!: Item;
  /**
   * Drops today */
  readonly dropsToday!: number;
  /**
   * Drops limit */
  readonly dropsLimit!: number;
  /**
   * Fights today */
  readonly fightsToday!: number;
  /**
   * Fights limit */
  readonly fightsLimit!: number;
  /**
   * Combat */
  readonly combat!: boolean;
  /**
   * Physical damage */
  readonly physicalDamage!: boolean;
  /**
   * Elemental damage */
  readonly elementalDamage!: boolean;
  /**
   * Block */
  readonly block!: boolean;
  /**
   * Delevel */
  readonly delevel!: boolean;
  /**
   * Hp during combat */
  readonly hpDuringCombat!: boolean;
  /**
   * Mp during combat */
  readonly mpDuringCombat!: boolean;
  /**
   * Other action during combat */
  readonly otherActionDuringCombat!: boolean;
  /**
   * Hp after combat */
  readonly hpAfterCombat!: boolean;
  /**
   * Mp after combat */
  readonly mpAfterCombat!: boolean;
  /**
   * Other action after combat */
  readonly otherActionAfterCombat!: boolean;
  /**
   * Passive */
  readonly passive!: boolean;
  /**
   * Underwater */
  readonly underwater!: boolean;
  /**
   * Variable */
  readonly variable!: boolean;
  /**
   * Attributes */
  readonly attributes!: string;
  /**
   * Poke level */
  readonly pokeLevel!: number;
  /**
   * Poke level 2 power */
  readonly pokeLevel_2Power!: number;
  /**
   * Poke level 2 hp */
  readonly pokeLevel_2Hp!: number;
  /**
   * Poke level 3 power */
  readonly pokeLevel_3Power!: number;
  /**
   * Poke level 3 hp */
  readonly pokeLevel_3Hp!: number;
  /**
   * Poke level 4 power */
  readonly pokeLevel_4Power!: number;
  /**
   * Poke level 4 hp */
  readonly pokeLevel_4Hp!: number;
  /**
   * Poke move 1 */
  readonly pokeMove_1!: string;
  /**
   * Poke move 2 */
  readonly pokeMove_2!: string;
  /**
   * Poke move 3 */
  readonly pokeMove_3!: string;
  /**
   * Poke attribute */
  readonly pokeAttribute!: string;
}
export class Item extends MafiaClass<"Item"> {
  static readonly staticType = "Item";
  /**
   * The name */
  readonly name!: string;
  /**
   * The TCRS name */
  readonly tcrsName!: string;
  /**
   * The plural */
  readonly plural!: string;
  /**
   * The descid */
  readonly descid!: string;
  /**
   * The filename of the image */
  readonly image!: string;
  /**
   * The filename of the small image */
  readonly smallimage!: string;
  /**
   * The level requirement */
  readonly levelreq!: number;
  /**
   * The quality */
  readonly quality!: string;
  /**
   * The range of adventures gained */
  readonly adventures!: string;
  /**
   * The range of muscle substats gained */
  readonly muscle!: string;
  /**
   * The range of mysticality substats gained */
  readonly mysticality!: string;
  /**
   * The range of moxie substats gained */
  readonly moxie!: string;
  /**
   * The stomach size */
  readonly fullness!: number;
  /**
   * The liver size */
  readonly inebriety!: number;
  /**
   * The spleen size */
  readonly spleen!: number;
  /**
   * The minimum HP restored */
  readonly minhp!: number;
  /**
   * The maximum HP restored */
  readonly maxhp!: number;
  /**
   * The minimum MP restored */
  readonly minmp!: number;
  /**
   * The maximum MP restored */
  readonly maxmp!: number;
  /**
   * The number of daily uses left */
  readonly dailyusesleft!: number;
  /**
   * The notes */
  readonly notes!: string;
  /**
   * Whether the Item is a quest item */
  readonly quest!: boolean;
  /**
   * Whether the Item is a gift item */
  readonly gift!: boolean;
  /**
   * Whether the Item is tradeable */
  readonly tradeable!: boolean;
  /**
   * Whether the Item is a discardable */
  readonly discardable!: boolean;
  /**
   * Whether the Item is usable in combat */
  readonly combat!: boolean;
  /**
   * Whether the Item is combat reusable */
  readonly combatReusable!: boolean;
  /**
   * Whether the Item is usable */
  readonly usable!: boolean;
  /**
   * Whether the Item is reusable */
  readonly reusable!: boolean;
  /**
   * Whether the Item is multiusable */
  readonly multi!: boolean;
  /**
   * Whether the Item is a "fancy" ingredient */
  readonly fancy!: boolean;
  /**
   * Whether the Item is a meatpasting ingredient */
  readonly pasteable!: boolean;
  /**
   * Whether the Item is a meatsmithing ingredient */
  readonly smithable!: boolean;
  /**
   * Whether the Item is a cooking ingredient */
  readonly cookable!: boolean;
  /**
   * Whether the Item is a cocktailcrafting ingredient */
  readonly mixable!: boolean;
  /**
   * Whether the Item is a candy */
  readonly candy!: boolean;
  /**
   * The candy type */
  readonly candyType!: string;
  /**
   * Whether the Item is a chocolate */
  readonly chocolate!: boolean;
  /**
   * The coinmaster who sells this Item */
  readonly seller!: Coinmaster;
  /**
   * The Coinmaster who buys this Item */
  readonly buyer!: Coinmaster;
  /**
   * The length of the display name */
  readonly nameLength!: number;
  /**
   * The noob Skill granted */
  readonly noobSkill!: Skill;
}
export class Location extends MafiaClass<"Location"> {
  static readonly staticType = "Location";
  /**
   * Id */
  readonly id!: number;
  /**
   * Nocombats */
  readonly nocombats!: boolean;
  /**
   * Combat percent */
  readonly combatPercent!: number;
  /**
   * Zone */
  readonly zone!: string;
  /**
   * Parent */
  readonly parent!: string;
  /**
   * Parentdesc */
  readonly parentdesc!: string;
  /**
   * Environment */
  readonly environment!: string;
  /**
   * Bounty */
  readonly bounty!: Bounty;
  /**
   * Combat queue */
  readonly combatQueue!: string;
  /**
   * Noncombat queue */
  readonly noncombatQueue!: string;
  /**
   * Turns spent */
  readonly turnsSpent!: number;
  /**
   * Kisses */
  readonly kisses!: number;
  /**
   * Recommended stat */
  readonly recommendedStat!: number;
  /**
   * Water level */
  readonly waterLevel!: number;
  /**
   * Wanderers */
  readonly wanderers!: boolean;
  /**
   * Fire level */
  readonly fireLevel!: number;
}
export class Modifier extends MafiaClass<"Modifier"> {
  static readonly staticType = "Modifier";
  /**
   * Name */
  readonly name!: string;
  /**
   * Type */
  readonly type!: "boolean" | "none" | "numeric" | "string";
}
export class Monster extends MafiaClass<"Monster"> {
  static readonly staticType = "Monster";
  /**
   * Name */
  readonly name!: string;
  /**
   * Id */
  readonly id!: number;
  /**
   * Base hp */
  readonly baseHp!: number;
  /**
   * Base attack */
  readonly baseAttack!: number;
  /**
   * Raw hp */
  readonly rawHp!: number;
  /**
   * Raw attack */
  readonly rawAttack!: number;
  /**
   * Raw defense */
  readonly rawDefense!: number;
  /**
   * Base defense */
  readonly baseDefense!: number;
  /**
   * Base initiative */
  readonly baseInitiative!: number;
  /**
   * Raw initiative */
  readonly rawInitiative!: number;
  /**
   * Attack element */
  readonly attackElement!: Element;
  /**
   * Defense element */
  readonly defenseElement!: Element;
  /**
   * Physical resistance */
  readonly physicalResistance!: number;
  /**
   * Min meat */
  readonly minMeat!: number;
  /**
   * Max meat */
  readonly maxMeat!: number;
  /**
   * Min sprinkles */
  readonly minSprinkles!: number;
  /**
   * Max sprinkles */
  readonly maxSprinkles!: number;
  /**
   * Base mainstat exp */
  readonly baseMainstatExp!: number;
  /**
   * Phylum */
  readonly phylum!: Phylum;
  /**
   * Poison */
  readonly poison!: Effect;
  /**
   * Boss */
  readonly boss!: boolean;
  /**
   * Copyable */
  readonly copyable!: boolean;
  /**
   * Image */
  readonly image!: string;
  /**
   * Images */
  readonly images!: { [image: string]: boolean };
  /**
   * Random modifiers */
  readonly randomModifiers!: { [randomModifier: string]: boolean };
  /**
   * Sub types */
  readonly subTypes!: { [subType: string]: boolean };
  /**
   * Manuel name */
  readonly manuelName!: string;
  /**
   * Wiki name */
  readonly wikiName!: string;
  /**
   * Attributes */
  readonly attributes!: string;
}
export class Path extends MafiaClass<"Path"> {
  static readonly staticType = "Path";
  /**
   * Id */
  readonly id!: number;
  /**
   * Name */
  readonly name!: string;
  /**
   * Avatar */
  readonly avatar!: boolean;
  /**
   * Image */
  readonly image!: string;
  /**
   * Points */
  readonly points!: number;
  /**
   * Familiars */
  readonly familiars!: boolean;
}
export class Phylum extends MafiaClass<"Phylum"> {
  static readonly staticType = "Phylum";
  /**
   * Image */
  readonly image!: string;
}
export class Servant extends MafiaClass<"Servant"> {
  static readonly staticType = "Servant";
  /**
   * Id */
  readonly id!: number;
  /**
   * Name */
  readonly name!: string;
  /**
   * Level */
  readonly level!: number;
  /**
   * Experience */
  readonly experience!: number;
  /**
   * Image */
  readonly image!: string;
  /**
   * Level1 ability */
  readonly level1Ability!: string;
  /**
   * Level7 ability */
  readonly level7Ability!: string;
  /**
   * Level14 ability */
  readonly level14Ability!: string;
  /**
   * Level21 ability */
  readonly level21Ability!: string;
}
export class Skill extends MafiaClass<"Skill"> {
  static readonly staticType = "Skill";
  /**
   * Name */
  readonly name!: string;
  /**
   * Type */
  readonly type!: string;
  /**
   * Level */
  readonly level!: number;
  /**
   * Image */
  readonly image!: string;
  /**
   * Traincost */
  readonly traincost!: number;
  /**
   * Class */
  // declare readonly class: Class;
  /**
   * Libram */
  readonly libram!: boolean;
  /**
   * Passive */
  readonly passive!: boolean;
  /**
   * Buff */
  readonly buff!: boolean;
  /**
   * Combat */
  readonly combat!: boolean;
  /**
   * Song */
  readonly song!: boolean;
  /**
   * Expression */
  readonly expression!: boolean;
  /**
   * Walk */
  readonly walk!: boolean;
  /**
   * Summon */
  readonly summon!: boolean;
  /**
   * Permable */
  readonly permable!: boolean;
  /**
   * Dailylimit */
  readonly dailylimit!: number;
  /**
   * Timescast */
  readonly timescast!: number;
}
export class Slot extends MafiaClass<"Slot"> {}
export class Stat extends MafiaClass<"Stat"> {}
export class Thrall extends MafiaClass<"Thrall"> {
  static readonly staticType = "Thrall";
  /**
   * Id */
  readonly id!: number;
  /**
   * Name */
  readonly name!: string;
  /**
   * Level */
  readonly level!: number;
  /**
   * Image */
  readonly image!: string;
  /**
   * Tinyimage */
  readonly tinyimage!: string;
  /**
   * Skill */
  readonly skill!: Skill;
  /**
   * Current modifiers */
  readonly currentModifiers!: string;
}
export class Vykea extends MafiaClass<"Vykea"> {
  static readonly staticType = "Vykea";
  /**
   * Id */
  readonly id!: number;
  /**
   * Name */
  readonly name!: string;
  /**
   * Type */
  readonly type!: string;
  /**
   * Rune */
  readonly rune!: Item;
  /**
   * Level */
  readonly level!: number;
  /**
   * Image */
  readonly image!: string;
  /**
   * Modifiers */
  readonly modifiers!: string;
  /**
   * Attack element */
  readonly attackElement!: Element;
}

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
