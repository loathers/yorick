export declare namespace types {
  declare abstract class MafiaClass {
    static get<T>(name: string): T;
    static get<T>(names: string[]): T[];
    static all<T>(): T[];
    readonly objectType: string;
    readonly identifierString: string;
    readonly identifierNumber?: number;
  }
  declare class Bounty extends MafiaClass {
    static get<T = Bounty>(name: string): T;
    static get<T = Bounty>(names: string[]): T[];
    static all<T = Bounty>(): T[];
    readonly objectType: "Bounty";
    readonly identifierString: string;
    /**
     * Plural */
    readonly plural: string;
    /**
     * Type */
    readonly objectType: string;
    /**
     * Kol internal type */
    readonly kolInternalType: string;
    /**
     * Number */
    readonly number: number;
    /**
     * Image */
    readonly image: string;
    /**
     * Monster */
    readonly monster: Monster;
    /**
     * Location */
    readonly location: Location;
  }
  declare class Class extends MafiaClass {
    static get<T = Class>(name: string): T;
    static get<T = Class>(names: string[]): T[];
    static all<T = Class>(): T[];
    readonly objectType: "Class";
    readonly identifier: string | number;
    /**
     * Primestat */
    readonly primestat: Stat;
  }
  declare class Coinmaster extends MafiaClass {
    static get<T = Coinmaster>(name: string): T;
    static get<T = Coinmaster>(names: string[]): T[];
    static all<T = Coinmaster>(): T[];
    readonly objectType: "Coinmaster";
    readonly identifierString: string;
    /**
     * Token */
    readonly token: string;
    /**
     * Item */
    readonly item: Item;
    /**
     * Property */
    readonly property: string;
    /**
     * Available tokens */
    readonly availableTokens: number;
    /**
     * Buys */
    readonly buys: boolean;
    /**
     * Sells */
    readonly sells: boolean;
    /**
     * Nickname */
    readonly nickname: string;
  }
  declare class Effect extends MafiaClass {
    static get<T = Effect>(name: string | number): T;
    static get<T = Effect>(names: (string | number)[]): T[];
    static all<T = Effect>(): T[];
    readonly objectType: "Effect";
    readonly identifierString: string;
    readonly identifierNumber: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Default */
    readonly default: string;
    /**
     * Quality */
    readonly quality: string;
    /**
     * Attributes */
    readonly attributes: string;
    /**
     * Note */
    readonly note: string;
    /**
     * All */
    readonly all: { [source: string]: boolean };
    /**
     * Image */
    readonly image: string;
    /**
     * Descid */
    readonly descid: string;
    /**
     * Candy tier */
    readonly candyTier: number;
  }
  declare class Element extends MafiaClass {
    static get<T = Element>(name: string): T;
    static get<T = Element>(names: string[]): T[];
    static all<T = Element>(): T[];
    readonly objectType: "Element";
    readonly identifierString: string;
    /**
     * Image */
    readonly image: string;
  }
  declare class Familiar extends MafiaClass {
    static get<T = Familiar>(name: string | number): T;
    static get<T = Familiar>(names: (string | number)[]): T[];
    static all<T = Familiar>(): T[];
    readonly objectType: "Familiar";
    readonly identifierString: string;
    /**
     * Hatchling */
    readonly hatchling: Item;
    /**
     * Image */
    readonly image: string;
    /**
     * Name */
    readonly name: string;
    /**
     * Experience */
    readonly experience: number;
    /**
     * Charges */
    readonly charges: number;
    /**
     * Drop name */
    readonly dropName: string;
    /**
     * Drop item */
    readonly dropItem: Item;
    /**
     * Drops today */
    readonly dropsToday: number;
    /**
     * Drops limit */
    readonly dropsLimit: number;
    /**
     * Fights today */
    readonly fightsToday: number;
    /**
     * Fights limit */
    readonly fightsLimit: number;
    /**
     * Combat */
    readonly combat: boolean;
    /**
     * Physical damage */
    readonly physicalDamage: boolean;
    /**
     * Elemental damage */
    readonly elementalDamage: boolean;
    /**
     * Block */
    readonly block: boolean;
    /**
     * Delevel */
    readonly delevel: boolean;
    /**
     * Hp during combat */
    readonly hpDuringCombat: boolean;
    /**
     * Mp during combat */
    readonly mpDuringCombat: boolean;
    /**
     * Other action during combat */
    readonly otherActionDuringCombat: boolean;
    /**
     * Hp after combat */
    readonly hpAfterCombat: boolean;
    /**
     * Mp after combat */
    readonly mpAfterCombat: boolean;
    /**
     * Other action after combat */
    readonly otherActionAfterCombat: boolean;
    /**
     * Passive */
    readonly passive: boolean;
    /**
     * Underwater */
    readonly underwater: boolean;
    /**
     * Variable */
    readonly variable: boolean;
    /**
     * Attributes */
    readonly attributes: string;
    /**
     * Poke level */
    readonly pokeLevel: number;
    /**
     * Poke level 2 power */
    readonly pokeLevel_2Power: number;
    /**
     * Poke level 2 hp */
    readonly pokeLevel_2Hp: number;
    /**
     * Poke level 3 power */
    readonly pokeLevel_3Power: number;
    /**
     * Poke level 3 hp */
    readonly pokeLevel_3Hp: number;
    /**
     * Poke level 4 power */
    readonly pokeLevel_4Power: number;
    /**
     * Poke level 4 hp */
    readonly pokeLevel_4Hp: number;
    /**
     * Poke move 1 */
    readonly pokeMove_1: string;
    /**
     * Poke move 2 */
    readonly pokeMove_2: string;
    /**
     * Poke move 3 */
    readonly pokeMove_3: string;
    /**
     * Poke attribute */
    readonly pokeAttribute: string;
  }
  declare class Item extends MafiaClass {
    static get<T = Item>(name: string | number): T;
    static get<T = Item>(names: (string | number)[]): T[];
    static all<T = Item>(): T[];
    readonly objectType: "Item";
    readonly identifierString: string;
    readonly identifierNumber: number;
    /**
     * The name */
    readonly name: string;
    /**
     * The TCRS name */
    readonly tcrsName: string;
    /**
     * The plural */
    readonly plural: string;
    /**
     * The descid */
    readonly descid: string;
    /**
     * The filename of the image */
    readonly image: string;
    /**
     * The filename of the small image */
    readonly smallimage: string;
    /**
     * The level requirement */
    readonly levelreq: number;
    /**
     * The quality */
    readonly quality: string;
    /**
     * The range of adventures gained */
    readonly adventures: string;
    /**
     * The range of muscle substats gained */
    readonly muscle: string;
    /**
     * The range of mysticality substats gained */
    readonly mysticality: string;
    /**
     * The range of moxie substats gained */
    readonly moxie: string;
    /**
     * The stomach size */
    readonly fullness: number;
    /**
     * The liver size */
    readonly inebriety: number;
    /**
     * The spleen size */
    readonly spleen: number;
    /**
     * The minimum HP restored */
    readonly minhp: number;
    /**
     * The maximum HP restored */
    readonly maxhp: number;
    /**
     * The minimum MP restored */
    readonly minmp: number;
    /**
     * The maximum MP restored */
    readonly maxmp: number;
    /**
     * The number of daily uses left */
    readonly dailyusesleft: number;
    /**
     * The notes */
    readonly notes: string;
    /**
     * Whether the Item is a quest item */
    readonly quest: boolean;
    /**
     * Whether the Item is a gift item */
    readonly gift: boolean;
    /**
     * Whether the Item is tradeable */
    readonly tradeable: boolean;
    /**
     * Whether the Item is a discardable */
    readonly discardable: boolean;
    /**
     * Whether the Item is usable in combat */
    readonly combat: boolean;
    /**
     * Whether the Item is combat reusable */
    readonly combatReusable: boolean;
    /**
     * Whether the Item is usable */
    readonly usable: boolean;
    /**
     * Whether the Item is reusable */
    readonly reusable: boolean;
    /**
     * Whether the Item is multiusable */
    readonly multi: boolean;
    /**
     * Whether the Item is a "fancy" ingredient */
    readonly fancy: boolean;
    /**
     * Whether the Item is a meatpasting ingredient */
    readonly pasteable: boolean;
    /**
     * Whether the Item is a meatsmithing ingredient */
    readonly smithable: boolean;
    /**
     * Whether the Item is a cooking ingredient */
    readonly cookable: boolean;
    /**
     * Whether the Item is a cocktailcrafting ingredient */
    readonly mixable: boolean;
    /**
     * Whether the Item is a candy */
    readonly candy: boolean;
    /**
     * The candy type */
    readonly candyType: string;
    /**
     * Whether the Item is a chocolate */
    readonly chocolate: boolean;
    /**
     * The coinmaster who sells this Item */
    readonly seller: Coinmaster;
    /**
     * The Coinmaster who buys this Item */
    readonly buyer: Coinmaster;
    /**
     * The length of the display name */
    readonly nameLength: number;
    /**
     * The noob Skill granted */
    readonly noobSkill: Skill;
  }
  declare class Location extends MafiaClass {
    static get<T = Location>(name: string | number): T;
    static get<T = Location>(names: (string | number)[]): T[];
    static all<T = Location>(): T[];
    readonly objectType: "Location";
    readonly identifierString: string;
    readonly identifierNumber: number;
    /**
     * Id */
    readonly id: number;
    /**
     * Nocombats */
    readonly nocombats: boolean;
    /**
     * Combat percent */
    readonly combatPercent: number;
    /**
     * Zone */
    readonly zone: string;
    /**
     * Parent */
    readonly parent: string;
    /**
     * Parentdesc */
    readonly parentdesc: string;
    /**
     * Environment */
    readonly environment: string;
    /**
     * Bounty */
    readonly bounty: Bounty;
    /**
     * Combat queue */
    readonly combatQueue: string;
    /**
     * Noncombat queue */
    readonly noncombatQueue: string;
    /**
     * Turns spent */
    readonly turnsSpent: number;
    /**
     * Kisses */
    readonly kisses: number;
    /**
     * Recommended stat */
    readonly recommendedStat: number;
    /**
     * Water level */
    readonly waterLevel: number;
    /**
     * Wanderers */
    readonly wanderers: boolean;
    /**
     * Fire level */
    readonly fireLevel: number;
  }
  declare class Monster extends MafiaClass {
    static get<T = Monster>(name: string | number): T;
    static get<T = Monster>(names: (string | number)[]): T[];
    static all<T = Monster>(): T[];
    readonly objectType: "Monster";
    readonly identifierString: string;
    readonly identifierNumber: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Id */
    readonly id: number;
    /**
     * Base hp */
    readonly baseHp: number;
    /**
     * Base attack */
    readonly baseAttack: number;
    /**
     * Raw hp */
    readonly rawHp: number;
    /**
     * Raw attack */
    readonly rawAttack: number;
    /**
     * Raw defense */
    readonly rawDefense: number;
    /**
     * Base defense */
    readonly baseDefense: number;
    /**
     * Base initiative */
    readonly baseInitiative: number;
    /**
     * Raw initiative */
    readonly rawInitiative: number;
    /**
     * Attack element */
    readonly attackElement: Element;
    /**
     * Defense element */
    readonly defenseElement: Element;
    /**
     * Physical resistance */
    readonly physicalResistance: number;
    /**
     * Min meat */
    readonly minMeat: number;
    /**
     * Max meat */
    readonly maxMeat: number;
    /**
     * Min sprinkles */
    readonly minSprinkles: number;
    /**
     * Max sprinkles */
    readonly maxSprinkles: number;
    /**
     * Base mainstat exp */
    readonly baseMainstatExp: number;
    /**
     * Phylum */
    readonly phylum: Phylum;
    /**
     * Poison */
    readonly poison: Effect;
    /**
     * Boss */
    readonly boss: boolean;
    /**
     * Copyable */
    readonly copyable: boolean;
    /**
     * Image */
    readonly image: string;
    /**
     * Images */
    readonly images: { [image: string]: boolean };
    /**
     * Random modifiers */
    readonly randomModifiers: { [randomModifier: string]: boolean };
    /**
     * Sub types */
    readonly subTypes: { [subType: string]: boolean };
    /**
     * Manuel name */
    readonly manuelName: string;
    /**
     * Wiki name */
    readonly wikiName: string;
    /**
     * Attributes */
    readonly attributes: string;
  }
  declare class Phylum extends MafiaClass {
    static get<T = Phylum>(name: string): T;
    static get<T = Phylum>(names: string[]): T[];
    static all<T = Phylum>(): T[];
    readonly objectType: "Phylum";
    readonly identifierString: string;
    /**
     * Image */
    readonly image: string;
  }
  declare class Servant extends MafiaClass {
    static get<T = Servant>(name: string | number): T;
    static get<T = Servant>(names: (string | number)[]): T[];
    static all<T = Servant>(): T[];
    readonly objectType: "Servant";
    readonly identifierString: string;
    /**
     * Id */
    readonly id: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Level */
    readonly level: number;
    /**
     * Experience */
    readonly experience: number;
    /**
     * Image */
    readonly image: string;
    /**
     * Level1 ability */
    readonly level1Ability: string;
    /**
     * Level7 ability */
    readonly level7Ability: string;
    /**
     * Level14 ability */
    readonly level14Ability: string;
    /**
     * Level21 ability */
    readonly level21Ability: string;
  }
  declare class Skill extends MafiaClass {
    static get<T = Skill>(name: string | number): T;
    static get<T = Skill>(names: (string | number)[]): T[];
    static all<T = Skill>(): T[];
    readonly objectType: "Skill";
    readonly identifierString: string;
    readonly identifierNumber: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Type */
    readonly type: string;
    /**
     * Level */
    readonly level: number;
    /**
     * Image */
    readonly image: string;
    /**
     * Traincost */
    readonly traincost: number;
    /**
     * Class */
    declare readonly class: Class;
    /**
     * Libram */
    readonly libram: boolean;
    /**
     * Passive */
    readonly passive: boolean;
    /**
     * Buff */
    readonly buff: boolean;
    /**
     * Combat */
    readonly combat: boolean;
    /**
     * Song */
    readonly song: boolean;
    /**
     * Expression */
    readonly expression: boolean;
    /**
     * Walk */
    readonly walk: boolean;
    /**
     * Summon */
    readonly summon: boolean;
    /**
     * Permable */
    readonly permable: boolean;
    /**
     * Dailylimit */
    readonly dailylimit: number;
    /**
     * Timescast */
    readonly timescast: number;
  }
  declare class Slot extends MafiaClass {
    static get<T = Slot>(name: string | number): T;
    static get<T = Slot>(names: (string | number)[]): T[];
    static all<T = Slot>(): T[];
    readonly objectType: "Slot";
    readonly identifierString: string;
  }
  declare class Stat extends MafiaClass {
    static get<T = Stat>(name: string): T;
    static get<T = Stat>(names: string[]): T[];
    static all<T = Stat>(): T[];
    readonly objectType: "Stat";
    readonly identifierString: string;
  }
  declare class Thrall extends MafiaClass {
    static get<T = Thrall>(name: string | number): T;
    static get<T = Thrall>(names: (string | number)[]): T[];
    static all<T = Thrall>(): T[];
    readonly objectType: "Thrall";
    readonly identifierString: string;
    /**
     * Id */
    readonly id: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Level */
    readonly level: number;
    /**
     * Image */
    readonly image: string;
    /**
     * Tinyimage */
    readonly tinyimage: string;
    /**
     * Skill */
    readonly skill: Skill;
    /**
     * Current modifiers */
    readonly currentModifiers: string;
  }
  declare class Vykea extends MafiaClass {
    static get<T = Vykea>(name: string): T;
    static get<T = Vykea>(names: string[]): T[];
    static all<T = Vykea>(): T[];
    readonly objectType: "Vykea";
    readonly identifierString: string;
    /**
     * Id */
    readonly id: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Type */
    readonly type: string;
    /**
     * Rune */
    readonly rune: Item;
    /**
     * Level */
    readonly level: number;
    /**
     * Image */
    readonly image: string;
    /**
     * Modifiers */
    readonly modifiers: string;
    /**
     * Attack element */
    readonly attackElement: Element;
  }
}

export declare namespace functions {
  function abort(string: string): never;
  function abort(): never;
  function addItemCondition(arg1: number, arg2: types.Item): void;
  function addItemCondition(arg1: types.Item, arg2: number): void;
  function adv1(
    locationValue: types.Location,
    adventuresUsedValue: number,
    filterFunction:
      | string
      | ((round: number, monster: types.Monster, text: string) => string)
  ): boolean;
  function adv1(
    locationValue: types.Location,
    adventuresUsedValue: number
  ): boolean;
  function adv1(locationValue: types.Location): boolean;
  function advCost(skill: types.Skill): number;
  function adventure(arg1: types.Location, arg2: number): boolean;
  function adventure(
    arg1: types.Location,
    arg2: number,
    filterFunction:
      | string
      | ((round: number, monster: types.Monster, text: string) => string)
  ): boolean;
  function adventure(arg1: number, arg2: types.Location): boolean;
  function adventure(
    arg1: number,
    arg2: types.Location,
    filterFunction:
      | string
      | ((round: number, monster: types.Monster, text: string) => string)
  ): boolean;
  function allMonstersWithId(): { [monster: string]: boolean };
  function allNormalOutfits(): string[];
  function appearanceRates(location: types.Location): {
    [monster: string]: number;
  };
  function appearanceRates(
    location: types.Location,
    includeQueue: boolean
  ): { [monster: string]: number };
  function append(buffer: string, s: string): string;
  function attack(): string;
  function autosell(arg1: types.Item, arg2: number): boolean;
  function autosell(arg1: number, arg2: types.Item): boolean;
  function autosellPrice(item: types.Item): number;
  function availableAmount(arg: types.Item): number;
  function availableChoiceOptions(): { [key: number]: string };
  function availableChoiceOptions(spoilers: boolean): {
    [key: number]: string;
  };
  function availableChoiceSelectInputs(decision: number): {
    [key: string]: { [key: string]: string };
  };
  function availableChoiceTextInputs(decision: number): {
    [key: string]: string;
  };
  function availablePocket(arg: types.Monster): number;
  function availablePocket(arg: types.Effect): number;
  function availablePocket(arg: types.Item): number;
  function availablePocket(arg: types.Stat): number;
  function batchClose(): boolean;
  function batchOpen(): void;
  function bjornifyFamiliar(familiar: types.Familiar): boolean;
  function blackMarketAvailable(): boolean;
  function booleanModifier(
    ...args: [modifier: string] | [arg: string | types.Item | types.Effect]
  ): boolean;
  function buffedHitStat(): number;
  function bufferToFile(var1: string, var2: string): boolean;
  function buy(item: types.Item): boolean;
  function buy(item: types.Item, quantity: number): boolean;
  function buy(item: types.Item, quantity: number, price: number): number;
  function buy(quantity: number, item: types.Item): boolean;
  function buy(quantity: number, item: types.Item, price: number): number;
  function buy(
    coinmaster: types.Coinmaster,
    quantity: number,
    item: types.Item
  ): boolean;
  function buyPrice(master: types.Coinmaster, item: types.Item): number;
  function buyUsingStorage(item: types.Item): boolean;
  function buyUsingStorage(item: types.Item, quantity: number): boolean;
  function buyUsingStorage(
    item: types.Item,
    quantity: number,
    price: number
  ): number;
  function buyUsingStorage(quantity: number, item: types.Item): boolean;
  function buyUsingStorage(
    quantity: number,
    item: types.Item,
    price: number
  ): number;
  function buysItem(master: types.Coinmaster, item: types.Item): boolean;
  function canDrink(): boolean;
  function canEat(): boolean;
  function canEquip(itemOrFamiliar: types.Item): boolean;
  function canEquip(familiar: types.Familiar): boolean;
  function canEquip(familiar: types.Familiar, item: types.Item): boolean;
  function canFaxbot(arg: types.Monster): boolean;
  function canInteract(): boolean;
  function canStillSteal(): boolean;
  function canadiaAvailable(): boolean;
  function candyForTier(arg: number): types.Item[];
  function candyForTier(arg1: number, arg2: number): types.Item[];
  function ceil(arg: number): number;
  function changeMcd(level: number): boolean;
  function charAt(source: string, index: number): string;
  function chatClan(messageValue: string): void;
  function chatClan(messageValue: string, recipientValue: string): void;
  function chatMacro(macroValue: string): void;
  function chatNotify(messageValue: string, colorValue: string): void;
  function chatPrivate(recipientValue: string, messageValue: string): void;
  function chew(item: types.Item): boolean;
  function chew(arg1: types.Item, arg2: number): boolean;
  function chew(arg1: number, arg2: types.Item): boolean;
  function choiceFollowsFight(): boolean;
  function classModifier(
    arg: string | types.Item,
    modifier: string
  ): types.Class;
  function clear(arg: any): void;
  function clearBoozeHelper(): void;
  function clearFoodHelper(): void;
  function cliExecute(string: string): boolean;
  function cliExecuteOutput(string: string): string;
  function closetAmount(arg: types.Item): number;
  function combatManaCostModifier(): number;
  function combatRateModifier(): number;
  function containsText(source: string, search: string): boolean;
  function council(): void;
  function count(arg: any): number;
  function craft(
    modeValue: string,
    countValue: number,
    item1: types.Item,
    item2: types.Item
  ): number;
  function craftType(arg: types.Item): string;
  function creatableAmount(arg: types.Item): number;
  function creatableTurns(itemId: types.Item): number;
  function creatableTurns(itemId: types.Item, count: number): number;
  function creatableTurns(
    itemId: types.Item,
    count: number,
    freeCrafting: boolean
  ): number;
  function create(item: types.Item): boolean;
  function create(arg1: types.Item, arg2: number): boolean;
  function create(arg1: number, arg2: types.Item): boolean;
  function currentHitStat(): types.Stat;
  function currentMcd(): number;
  function currentPvpStances(): { [key: string]: number };
  function currentRadSickness(): number;
  function currentRound(): number;
  function dadSeaMonkeeWeakness(arg: number): types.Element;
  function dailySpecial(): types.Item;
  function damageAbsorptionPercent(): number;
  function damageReduction(): number;
  function dateToTimestamp(inFormat: string, dateTimeString: string): number;
  function debugprint(string: string): void;
  function descToEffect(value: string): types.Effect;
  function descToItem(value: string): types.Item;
  function disable(name: string): void;
  function dispensaryAvailable(): boolean;
  function displayAmount(arg: types.Item): number;
  function drink(item: types.Item): boolean;
  function drink(arg1: types.Item, arg2: number): boolean;
  function drink(arg1: number, arg2: types.Item): boolean;
  function drinksilent(item: types.Item): boolean;
  function drinksilent(arg1: types.Item, arg2: number): boolean;
  function drinksilent(arg1: number, arg2: types.Item): boolean;
  function dump(arg: any): void;
  function dump(arg: any, color: string): void;
  function eat(item: types.Item): boolean;
  function eat(arg1: types.Item, arg2: number): boolean;
  function eat(arg1: number, arg2: types.Item): boolean;
  function eatsilent(item: types.Item): boolean;
  function eatsilent(arg1: types.Item, arg2: number): boolean;
  function eatsilent(arg1: number, arg2: types.Item): boolean;
  function effectModifier(
    arg: string | types.Item,
    modifier: string
  ): types.Effect;
  function effectPockets(): { [key: number]: boolean };
  function elementalResistance(arg: types.Element): number;
  function elementalResistance(): number;
  function elementalResistance(arg: types.Monster): number;
  function emptyCloset(): boolean;
  function enable(name: string): void;
  function endsWith(source: string, suffix: string): boolean;
  function enthroneFamiliar(familiar: types.Familiar): boolean;
  function entityDecode(arg: string): string;
  function entityEncode(arg: string): string;
  function equip(item: types.Item): boolean;
  function equip(arg1: types.Item, arg2: types.Slot): boolean;
  function equip(arg1: types.Slot, arg2: types.Item): boolean;
  function equipAllFamiliars(): boolean;
  function equippedAmount(arg: types.Item): number;
  function equippedItem(slot: types.Slot): types.Item;
  function eudora(): string;
  function eudora(newEudora: string): boolean;
  function eudoraItem(): types.Item;
  function everyCardName(name: string): string;
  function expectedDamage(): number;
  function expectedDamage(arg: types.Monster): number;
  function experienceBonus(): number;
  function expressionEval(expr: string): number;
  function extractItems(string: string): { [item: string]: number };
  function extractMeat(string: string): number;
  function familiarEquipment(familiar: types.Familiar): types.Item;
  function familiarEquippedEquipment(familiar: types.Familiar): types.Item;
  function familiarWeight(familiar: types.Familiar): number;
  function favoriteFamiliars(): { [familiar: string]: boolean };
  function faxbot(monsterName: types.Monster): boolean;
  function faxbot(monsterName: types.Monster, botName: string): boolean;
  function fightFollowsChoice(): boolean;
  function fileToArray(var1: string): { [key: number]: string };
  function fileToBuffer(var1: string): string;
  function fileToMap(var1: string, var2: any): boolean;
  function fileToMap(var1: string, var2: any, var3: boolean): boolean;
  function floor(arg: number): number;
  function floristAvailable(): boolean;
  function flushMonsterManuelCache(): boolean;
  function formField(key: string): string;
  function formFields(): { [key: string]: string };
  function formatDateTime(
    inFormat: string,
    dateTimeString: string,
    outFormat: string
  ): string;
  function friarsAvailable(): boolean;
  function fuelCost(skill: types.Skill): number;
  function fullnessLimit(): number;
  function gamedayToInt(): number;
  function gamedayToString(): string;
  function gametimeToInt(): number;
  function getAllProperties(
    filterValue: string,
    globalValue: boolean
  ): { [key: string]: boolean };
  function getAutoAttack(): number;
  function getCampground(): { [item: string]: number };
  function getCcsAction(index: number): string;
  function getChateau(): { [item: string]: number };
  function getClanId(): number;
  function getClanLounge(): { [item: string]: number };
  function getClanName(): string;
  function getClanRumpus(): { [key: string]: number };
  function getCloset(): { [item: string]: number };
  function getCounter(label: string): number;
  function getCounters(label: string, min: number, max: number): string;
  function getCustomOutfits(): string[];
  function getDwelling(): types.Item;
  function getFloristPlants(): { [location: string]: string[] };
  function getFreePulls(): { [item: string]: number };
  function getFuel(): number;
  function getGoals(): string[];
  function getIgnoreZoneWarnings(): boolean;
  function getIngredients(arg: types.Item): {
    [item: string]: number;
  };
  function getInventory(): { [item: string]: number };
  function getLocationMonsters(location: types.Location): {
    [monster: string]: boolean;
  };
  function getMonsterMapping(): {
    [monster: string]: types.Monster;
  };
  function getMonsterMapping(path: string): {
    [monster: string]: types.Monster;
  };
  function getMonsters(location: types.Location): types.Monster[];
  function getMoods(): string[];
  function getOutfits(): string[];
  function getPath(): string;
  function getPathFull(): string;
  function getPathVariables(): string;
  function getPlayerId(playerNameValue: string): string;
  function getPlayerName(playerIdValue: number): string;
  function getPower(item: types.Item): number;
  function getProperty(name: string): string;
  function getProperty(name: string, globalValue: boolean): string;
  function getRelated(
    item: types.Item,
    type: string
  ): { [item: string]: number };
  function getRevision(): number;
  function getShop(): { [item: string]: number };
  function getShopLog(): string[];
  function getStackTrace(): {
    file: string;
    name: string;
    line: number;
  }[];
  function getStash(): { [item: string]: number };
  function getStorage(): { [item: string]: number };
  function getVersion(): string;
  function getWorkshed(): types.Item;
  function gnomadsAvailable(): boolean;
  function goalExists(check: string): boolean;
  function groupString(
    string: string,
    regex: string
  ): { [key: number]: { [key: number]: string } };
  function guildAvailable(): boolean;
  function guildStoreAvailable(): boolean;
  function handlingChoice(): boolean;
  function haveBartender(): boolean;
  function haveChef(): boolean;
  function haveDisplay(): boolean;
  function haveEffect(arg: types.Effect): number;
  function haveEquipped(item: types.Item): boolean;
  function haveFamiliar(familiar: types.Familiar): boolean;
  function haveMushroomPlot(): boolean;
  function haveOutfit(outfit: string): boolean;
  function haveServant(servant: types.Servant): boolean;
  function haveShop(): boolean;
  function haveSkill(arg: types.Skill): boolean;
  function hedgeMaze(arg: string): boolean;
  function hermit(arg1: types.Item, arg2: number): boolean;
  function hermit(arg1: number, arg2: types.Item): boolean;
  function hiddenTempleUnlocked(): boolean;
  function hippyStoneBroken(): boolean;
  function hippyStoreAvailable(): boolean;
  function historicalAge(item: types.Item): number;
  function historicalPrice(item: types.Item): number;
  function holiday(): string;
  function hpCost(skill: types.Skill): number;
  function imageToMonster(value: string): types.Monster;
  function inBadMoon(): boolean;
  function inCasual(): boolean;
  function inHardcore(): boolean;
  function inMoxieSign(): boolean;
  function inMultiFight(): boolean;
  function inMuscleSign(): boolean;
  function inMysticalitySign(): boolean;
  function inaccessibleReason(master: types.Coinmaster): string;
  function indexOf(source: string, search: string): number;
  function indexOf(source: string, search: string, start: number): number;
  function inebrietyLimit(): number;
  function initiativeModifier(): number;
  function insert(buffer: string, index: number, s: string): string;
  function isAccessible(master: types.Coinmaster): boolean;
  function isBanished(arg: types.Monster): boolean;
  function isCoinmasterItem(item: types.Item): boolean;
  function isDarkMode(): boolean;
  function isDiscardable(item: types.Item): boolean;
  function isDisplayable(item: types.Item): boolean;
  function isFamiliarEquipmentLocked(): boolean;
  function isGiftable(item: types.Item): boolean;
  function isGoal(item: types.Item): boolean;
  function isHeadless(): boolean;
  function isInteger(string: string): boolean;
  function isNpcItem(item: types.Item): boolean;
  function isOnline(arg: string): boolean;
  function isTradeable(item: types.Item): boolean;
  function isTrendy(thing: types.Item): boolean;
  function isTrendy(thing: types.Skill): boolean;
  function isTrendy(thing: types.Familiar): boolean;
  function isTrendy(thing: string): boolean;
  function isUnrestricted(thing: types.Item): boolean;
  function isUnrestricted(thing: types.Skill): boolean;
  function isUnrestricted(thing: types.Familiar): boolean;
  function isUnrestricted(thing: string): boolean;
  function isWearingOutfit(outfit: string): boolean;
  function itemAmount(arg: types.Item): number;
  function itemDropModifier(): number;
  function itemDrops(): { [item: string]: number };
  function itemDrops(arg: types.Monster): {
    [item: string]: number;
  };
  function itemDropsArray(): {
    drop: types.Item;
    rate: number;
    type: string;
  }[];
  function itemDropsArray(
    monster: types.Monster
  ): { drop: types.Item; rate: number; type: string }[];
  function itemDropsArray(
    arg: types.Monster
  ): { drop: types.Item; rate: number; type: string }[];
  function itemPockets(): { [key: number]: boolean };
  function itemType(item: types.Item): string;
  function jokePockets(): { [key: number]: boolean };
  function jumpChance(): number;
  function jumpChance(arg: types.Monster): number;
  function jumpChance(arg: types.Monster, init: number): number;
  function jumpChance(arg: types.Monster, init: number, ml: number): number;
  function jumpChance(arg: types.Location): number;
  function jumpChance(arg: types.Location, init: number): number;
  function jumpChance(arg: types.Location, init: number, ml: number): number;
  function knollAvailable(): boolean;
  function lastChoice(): number;
  function lastDecision(): number;
  function lastIndexOf(source: string, search: string): number;
  function lastIndexOf(source: string, search: string, start: number): number;
  function lastItemMessage(): string;
  function lastMonster(): types.Monster;
  function lastSkillMessage(): string;
  function leetify(string: string): string;
  function length(string: string): number;
  function lightningCost(skill: types.Skill): number;
  function limitMode(): string;
  function loadHtml(string: string): string;
  function lockFamiliarEquipment(lock: boolean): void;
  function logN(arg: number): number;
  function logN(arg: number, base: number): number;
  function logprint(string: string): void;
  function makeUrl(arg1: string, arg2: boolean, arg3: boolean): string;
  function mallPrice(item: types.Item): number;
  function mallPrices(arg: { [key: number]: boolean }): number;
  function mallPrices(arg: string): number;
  function mallPrices(category: string, tiers: string): number;
  function manaCostModifier(): number;
  function mapToFile(var1: any, var2: string): boolean;
  function mapToFile(var1: any, var2: string, var3: boolean): boolean;
  function max(arg1: number, arg2: number[]): number;
  function max(arg1: number, arg2: number[]): number;
  function maximize(
    maximizerStringValue: string,
    isSpeculateOnlyValue: boolean
  ): boolean;
  function maximize(
    maximizerStringValue: string,
    maxPriceValue: number,
    priceLevelValue: number,
    isSpeculateOnlyValue: boolean
  ): boolean;
  function maximize(
    maximizerStringValue: string,
    maxPriceValue: number,
    priceLevelValue: number,
    isSpeculateOnlyValue: boolean,
    showEquipment: boolean
  ): {
    display: string;
    command: string;
    score: number;
    effect: types.Effect;
    item: types.Item;
    skill: types.Skill;
  }[];
  function meatDrop(): number;
  function meatDrop(arg: types.Monster): number;
  function meatDropModifier(): number;
  function meatPockets(): { [key: number]: number };
  function min(arg1: number, arg2: number[]): number;
  function min(arg1: number, arg2: number[]): number;
  function minstrelInstrument(): types.Item;
  function minstrelLevel(): number;
  function minstrelQuest(): boolean;
  function modifierEval(expr: string): number;
  function monsterAttack(): number;
  function monsterAttack(arg: types.Monster): number;
  function monsterDefense(): number;
  function monsterDefense(arg: types.Monster): number;
  function monsterElement(): types.Element;
  function monsterElement(arg: types.Monster): types.Element;
  function monsterEval(expr: string): number;
  function monsterFactoidsAvailable(arg1: types.Monster, arg2: boolean): number;
  function monsterHp(): number;
  function monsterHp(arg: types.Monster): number;
  function monsterInitiative(): number;
  function monsterInitiative(arg: types.Monster): number;
  function monsterLevelAdjustment(): number;
  function monsterManuelText(arg: types.Monster): string;
  function monsterModifier(arg: types.Effect, modifier: string): types.Monster;
  function monsterPhylum(): types.Phylum;
  function monsterPhylum(arg: types.Monster): types.Phylum;
  function monsterPockets(): { [key: number]: boolean };
  function moodExecute(multiplicity: number): void;
  function moodList(): string[];
  function moonLight(): number;
  function moonPhase(): number;
  function mpCost(skill: types.Skill): number;
  function myAbsorbs(): number;
  function myAdventures(): number;
  function myAscensions(): number;
  function myAudience(): number;
  function myBasestat(arg: types.Stat): number;
  function myBjornedFamiliar(): types.Familiar;
  function myBuffedstat(arg: types.Stat): number;
  function myClass(): types.Class;
  function myClosetMeat(): number;
  function myCompanion(): string;
  function myDaycount(): number;
  function myDiscomomentum(): number;
  function myEffectiveFamiliar(): types.Familiar;
  function myEffects(): { [effect: string]: number };
  function myEnthronedFamiliar(): types.Familiar;
  function myFamiliar(): types.Familiar;
  function myFullness(): number;
  function myFury(): number;
  function myGardenType(): string;
  function myHash(): string;
  function myHp(): number;
  function myId(): string;
  function myInebriety(): number;
  function myLevel(): number;
  function myLightning(): number;
  function myLocation(): types.Location;
  function myMask(): string;
  function myMaxfury(): number;
  function myMaxhp(): number;
  function myMaxmp(): number;
  function myMaxpp(): number;
  function myMeat(): number;
  function myMp(): number;
  function myName(): string;
  function myPath(): string;
  function myPathId(): number;
  function myPokeFam(arg: number): types.Familiar;
  function myPp(): number;
  function myPrimestat(): types.Stat;
  function myRain(): number;
  function myRobotEnergy(): number;
  function myRobotScraps(): number;
  function myServant(): types.Servant;
  function mySessionAdv(): number;
  function mySessionItems(): { [item: string]: number };
  function mySessionItems(item: types.Item): number;
  function mySessionMeat(): number;
  function mySessionResults(): { [key: string]: number };
  function mySign(): string;
  function mySoulsauce(): number;
  function mySpleenUse(): number;
  function myStorageMeat(): number;
  function myThrall(): types.Thrall;
  function myThunder(): number;
  function myTurncount(): number;
  function myVykeaCompanion(): types.Vykea;
  function myWildfireWater(): number;
  function nowToInt(): number;
  function nowToString(dateFormatValue: string): string;
  function npcPrice(item: types.Item): number;
  function numberologyPrize(num: number): string;
  function numericModifier(
    ...args:
      | []
      | [modifier: string]
      | [
          arg:
            | string
            | types.Item
            | types.Effect
            | types.Skill
            | types.Familiar
            | types.Item,
          modifier: string
        ]
      | [
          familiar: types.Familiar,
          modifier: string,
          weight: number,
          item: types.Item
        ]
  ): number;
  function outfit(outfit: string): boolean;
  function outfitPieces(outfit: string): types.Item[];
  function outfitTattoo(outfit: string): string;
  function outfitTreats(outfit: string): { [item: string]: number };
  function overdrink(item: types.Item): boolean;
  function overdrink(arg1: types.Item, arg2: number): boolean;
  function overdrink(arg1: number, arg2: types.Item): boolean;
  function pathIdToName(value: number): string;
  function pathNameToId(value: string): number;
  function pickPocket(arg: types.Monster): boolean;
  function pickPocket(arg: types.Effect): {
    [effect: string]: number;
  };
  function pickPocket(arg: types.Item): {
    [item: string]: number;
  };
  function pickPocket(arg: types.Stat): {
    [stat: string]: number;
  };
  function pickPocket(arg: number): boolean;
  function pickedPockets(): { [key: number]: boolean };
  function pickedScraps(): { [key: number]: boolean };
  function pocketEffects(pocket: number): { [effect: string]: number };
  function pocketItems(pocket: number): { [item: string]: number };
  function pocketJoke(pocket: number): string;
  function pocketMeat(pocket: number): { [key: number]: string };
  function pocketMonster(pocket: number): types.Monster;
  function pocketPoem(pocket: number): { [key: number]: string };
  function pocketScrap(pocket: number): { [key: number]: string };
  function pocketStats(pocket: number): { [stat: string]: number };
  function poemPockets(): { [key: number]: number };
  function potentialPockets(arg: types.Monster): {
    [key: number]: number;
  };
  function potentialPockets(arg: types.Effect): {
    [key: number]: number;
  };
  function potentialPockets(arg: types.Item): {
    [key: number]: number;
  };
  function potentialPockets(arg: types.Stat): {
    [key: number]: number;
  };
  function print(): void;
  function print(string: string): void;
  function print(string: string, color: string): void;
  function printHtml(string: string): void;
  function propertyDefaultValue(nameValue: string): string;
  function propertyExists(nameValue: string): boolean;
  function propertyExists(nameValue: string, globalValue: boolean): boolean;
  function propertyHasDefault(nameValue: string): boolean;
  function pullsRemaining(): number;
  function putCloset(arg1: number): boolean;
  function putCloset(arg1: types.Item): boolean;
  function putCloset(arg1: types.Item, arg2: number): boolean;
  function putCloset(arg1: number, arg2: types.Item): boolean;
  function putDisplay(arg1: number, arg2: types.Item): boolean;
  function putDisplay(arg1: types.Item, arg2: number): boolean;
  function putShop(
    priceValue: number,
    limitValue: number,
    itemValue: types.Item
  ): boolean;
  function putShop(
    priceValue: number,
    limitValue: number,
    qtyValue: number,
    itemValue: types.Item
  ): boolean;
  function putShopUsingStorage(
    priceValue: number,
    limitValue: number,
    itemValue: types.Item
  ): boolean;
  function putShopUsingStorage(
    priceValue: number,
    limitValue: number,
    qtyValue: number,
    itemValue: types.Item
  ): boolean;
  function putStash(arg1: types.Item, arg2: number): boolean;
  function putStash(arg1: number, arg2: types.Item): boolean;
  function pvpAttacksLeft(): number;
  function rainCost(skill: types.Skill): number;
  function random(arg: number): number;
  function rawDamageAbsorption(): number;
  function refreshShop(): boolean;
  function refreshStash(): boolean;
  function refreshStatus(): boolean;
  function removeItemCondition(arg1: number, arg2: types.Item): void;
  function removeItemCondition(arg1: types.Item, arg2: number): void;
  function removeProperty(nameValue: string): string;
  function removeProperty(nameValue: string, globalValue: boolean): string;
  function renameProperty(oldNameValue: string, newNameValue: string): boolean;
  function replace(
    buffer: string,
    start: number,
    finish: number,
    s: string
  ): string;
  function replaceString(
    source: string,
    searchValue: string,
    replaceValue: string
  ): string;
  function replaceString(
    source: string,
    searchValue: string,
    replaceValue: string
  ): string;
  function repriceShop(priceValue: number, itemValue: types.Item): boolean;
  function repriceShop(
    priceValue: number,
    limitValue: number,
    itemValue: types.Item
  ): boolean;
  function restorationPockets(): { [key: number]: boolean };
  function restoreHp(amount: number): boolean;
  function restoreMp(amount: number): boolean;
  function retrieveItem(item: types.Item): boolean;
  function retrieveItem(arg1: types.Item, arg2: number): boolean;
  function retrieveItem(arg1: number, arg2: types.Item): boolean;
  function reverseNumberology(): { [key: number]: number };
  function reverseNumberology(
    advDelta: number,
    spleenDelta: number
  ): { [key: number]: number };
  function rollover(): number;
  function round(arg: number): number;
  function runChoice(decision: number): string;
  function runChoice(decision: number, extra: string): string;
  function runChoice(decision: number, extra: boolean): string;
  function runChoice(decision: number, custom: boolean, more: string): string;
  function runCombat(): string;
  function runCombat(
    filterFunction:
      | string
      | ((round: number, monster: types.Monster, text: string) => string)
  ): string;
  function runTurn(): string;
  function runaway(): string;
  function scrapPockets(): { [key: number]: number };
  function sell(
    master: types.Coinmaster,
    countValue: number,
    itemValue: types.Item
  ): boolean;
  function sellPrice(master: types.Coinmaster, item: types.Item): number;
  function sellsItem(master: types.Coinmaster, item: types.Item): boolean;
  function sessionLogs(dayCount: number): string[];
  function sessionLogs(player: string, dayCount: number): string[];
  function sessionLogs(
    playerName: string,
    baseDate: string,
    count: number
  ): string[];
  function setAutoAttack(attackValue: number): void;
  function setAutoAttack(attackValue: string): void;
  function setLength(buffer: string, i: number): void;
  function setLocation(location: types.Location): void;
  function setProperty(nameValue: string, value: string): void;
  function shopAmount(arg: types.Item): number;
  function shopLimit(arg: types.Item): number;
  function shopPrice(item: types.Item): number;
  function skillModifier(
    arg: string | types.Item,
    modifier: string
  ): types.Skill;
  function slashCount(arg: types.Item): number;
  function soulsauceCost(skill: types.Skill): number;
  function spleenLimit(): number;
  function splitString(string: string): string[];
  function splitString(string: string, regex: string): string[];
  function squareRoot(val: number): number;
  function startsWith(source: string, prefix: string): boolean;
  function stashAmount(arg: types.Item): number;
  function statBonusToday(): types.Stat;
  function statBonusTomorrow(): types.Stat;
  function statModifier(arg: types.Effect, modifier: string): types.Stat;
  function statsPockets(): { [key: number]: boolean };
  function steal(): string;
  function stillsAvailable(): number;
  function stopCounter(label: string): void;
  function storageAmount(arg: types.Item): number;
  function stringModifier(
    ...args:
      | [modifier: string]
      | [arg: string | types.Item | types.Effect, modifier: string]
  ): string;
  function stunSkill(): types.Skill;
  function substring(source: string, start: number): string;
  function substring(source: string, start: number, finish: number): string;
  function svnAtHead(project: string): boolean;
  function svnExists(project: string): boolean;
  function svnInfo(script: string): {
    url: string;
    revision: number;
    last_changed_author: string;
    last_changed_rev: number;
    last_changed_date: string;
  };
  function sweetSynthesis(effect: types.Effect): boolean;
  function sweetSynthesis(arg1: number, arg2: types.Effect): boolean;
  function sweetSynthesis(arg1: types.Effect, arg2: number): boolean;
  function sweetSynthesis(
    arg1: number,
    arg2: types.Effect,
    arg3: number
  ): boolean;
  function sweetSynthesis(arg1: types.Item, arg2: types.Item): boolean;
  function sweetSynthesis(
    arg1: number,
    arg2: types.Item,
    arg3: types.Item
  ): boolean;
  function sweetSynthesisPair(arg1: types.Effect): types.Item[];
  function sweetSynthesisPair(arg1: types.Effect, arg2: number): types.Item[];
  function sweetSynthesisPairing(
    arg1: types.Effect,
    arg2: types.Item
  ): types.Item[];
  function sweetSynthesisPairing(
    arg1: types.Effect,
    arg2: types.Item,
    arg3: number
  ): types.Item[];
  function sweetSynthesisResult(
    item1: types.Item,
    item2: types.Item
  ): types.Effect;
  function takeCloset(arg1: number): boolean;
  function takeCloset(arg1: types.Item): boolean;
  function takeCloset(arg1: types.Item, arg2: number): boolean;
  function takeCloset(arg1: number, arg2: types.Item): boolean;
  function takeDisplay(arg1: types.Item, arg2: number): boolean;
  function takeDisplay(arg1: number, arg2: types.Item): boolean;
  function takeShop(itemValue: types.Item): boolean;
  function takeShop(arg1: number, arg2: types.Item): boolean;
  function takeStash(arg1: types.Item, arg2: number): boolean;
  function takeStash(arg1: number, arg2: types.Item): boolean;
  function takeStorage(arg1: types.Item, arg2: number): boolean;
  function takeStorage(arg1: number, arg2: types.Item): boolean;
  function tavern(): number;
  function tavern(arg: string): number;
  function throwItem(item: types.Item): string;
  function throwItems(item1: types.Item, item2: types.Item): string;
  function thunderCost(skill: types.Skill): number;
  function timeToString(): string;
  function timestampToDate(timestamp: number, outFormat: string): string;
  function toBoolean(value: string | boolean | number): boolean;
  function toBounty(value: string): types.Bounty;
  function toClass(value: string | number): types.Class;
  function toCoinmaster(value: string): types.Coinmaster;
  function toEffect(value: string | number | types.Skill): types.Effect;
  function toElement(value: string): types.Element;
  function toFamiliar(value: string | number): types.Familiar;
  function toFloat(value: string | boolean | number): number;
  function toInt(
    value:
      | string
      | boolean
      | number
      | types.Item
      | types.Familiar
      | types.Location
      | types.Skill
      | types.Effect
      | types.Class
      | types.Monster
      | types.Thrall
      | types.Servant
      | types.Vykea
  ): number;
  function toItem(
    ...args: [value: string | number] | [name: string, count: number]
  ): types.Item;
  function toJson(val: any): string;
  function toLocation(value: string | number): types.Location;
  function toLowerCase(string: string): string;
  function toMonster(value: string | number): types.Monster;
  function toPhylum(value: string): types.Phylum;
  function toPlural(item: types.Item): string;
  function toServant(value: string | number): types.Servant;
  function toSkill(
    ...args:
      | [value: string | number | types.Effect]
      | [value1: string, value2: string]
  ): types.Skill;
  function toSlot(item: string | types.Item): types.Slot;
  function toStat(value: string): types.Stat;
  function toString(
    ...args: [val: string] | [val: number, fmt: string]
  ): string;
  function toThrall(value: string | number): types.Thrall;
  function toUpperCase(string: string): string;
  function toUrl(value: types.Location): string;
  function toVykea(value: string): types.Vykea;
  function todayToString(): string;
  function totalFreeRests(): number;
  function totalTurnsPlayed(): number;
  function towerDoor(): boolean;
  function traceprint(string: string): void;
  function truncate(arg: number): number;
  function turnsPerCast(skill: types.Skill): number;
  function turnsPlayed(): number;
  function twiddle(): string;
  function unusualConstructDisc(): types.Item;
  function updateCandyPrices(): void;
  function urlDecode(arg: string): string;
  function urlEncode(arg: string): string;
  function use(item: types.Item): boolean;
  function use(arg1: types.Item, arg2: number): boolean;
  function use(arg1: number, arg2: types.Item): boolean;
  function useFamiliar(familiar: types.Familiar): boolean;
  function useServant(servant: types.Servant): boolean;
  function useSkill(arg1: types.Skill, arg2: number): boolean;
  function useSkill(arg1: number, arg2: types.Skill): boolean;
  function useSkill(arg1: types.Skill, arg2: number, target: string): boolean;
  function useSkill(arg1: number, arg2: types.Skill, target: string): boolean;
  function useSkill(skill: types.Skill): string;
  function userConfirm(message: string): boolean;
  function userConfirm(
    message: string,
    timeOut: number,
    defaultBoolean: boolean
  ): boolean;
  function userPrompt(message: string): string;
  function userPrompt(message: string, options: any): string;
  function userPrompt(
    message: string,
    timeOut: number,
    defaultString: string
  ): string;
  function visit(master: types.Coinmaster): boolean;
  function visitUrl(): string;
  function visitUrl(string: string): string;
  function visitUrl(string: string, usePostMethod: boolean): string;
  function visitUrl(
    string: string,
    usePostMethod: boolean,
    encoded: boolean
  ): string;
  function votingBoothInitiatives(
    clss: types.Class,
    path: number,
    daycount: number
  ): { [key: string]: boolean };
  function votingBoothInitiatives(
    clss: number,
    path: number,
    daycount: number
  ): { [key: string]: boolean };
  function wait(delay: number): void;
  function waitq(delay: number): void;
  function weaponHands(item: types.Item): number;
  function weaponType(item: types.Item): types.Stat;
  function weightAdjustment(): number;
  function whiteCitadelAvailable(): boolean;
  function whoClan(): { [key: string]: boolean };
  function willUsuallyDodge(): boolean;
  function willUsuallyMiss(): boolean;
  function write(string: string): void;
  function writeln(string: string): void;
  function xpath(html: string, xpath: string): string[];
}
