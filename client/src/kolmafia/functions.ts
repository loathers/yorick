/* eslint-disable @typescript-eslint/no-explicit-any */
import { makePlaceholder } from "../util/makeValue";
import { remoteCall } from "./remote";
import {
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
} from "./types";

export function abort(): void;
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function abort(): void {}
export function addItemCondition(arg1: number, arg2: Item): void;
export function addItemCondition(arg1: Item, arg2: number): void;
export function addItemCondition(...args: unknown[]): void {
  return remoteCall("addItemCondition", args);
}
export function adv1(
  locationValue: Location,
  adventuresUsedValue: number,
  filterFunction:
    | string
    | ((round: number, monster: Monster, text: string) => string)
): boolean;
export function adv1(
  locationValue: Location,
  adventuresUsedValue: number
): boolean;
export function adv1(locationValue: Location): boolean;
export function adv1(...args: unknown[]): boolean {
  return remoteCall("adv1", args, false);
}
export function advCost(skill: Skill): number;
export function advCost(...args: unknown[]): number {
  return remoteCall("advCost", args, 0);
}
export function adventure(arg1: Location, arg2: number): boolean;
export function adventure(
  arg1: Location,
  arg2: number,
  filterFunction:
    | string
    | ((round: number, monster: Monster, text: string) => string)
): boolean;
export function adventure(arg1: number, arg2: Location): boolean;
export function adventure(
  arg1: number,
  arg2: Location,
  filterFunction:
    | string
    | ((round: number, monster: Monster, text: string) => string)
): boolean;
export function adventure(...args: unknown[]): boolean {
  return remoteCall("adventure", args, false);
}
export function allMonstersWithId(): { [monster: string]: boolean };
export function allMonstersWithId(...args: unknown[]): {
  [monster: string]: boolean;
} {
  return remoteCall("allMonstersWithId", args, {});
}
export function allNormalOutfits(): string[];
export function allNormalOutfits(...args: unknown[]): string[] {
  return remoteCall("allNormalOutfits", args, []);
}
export function appearanceRates(location: Location): {
  [monster: string]: number;
};
export function appearanceRates(
  location: Location,
  includeQueue: boolean
): { [monster: string]: number };
export function appearanceRates(...args: unknown[]): {
  [monster: string]: number;
} {
  return remoteCall("appearanceRates", args, {});
}
export function append(buffer: string, s: string): string;
export function append(...args: unknown[]): string {
  return remoteCall("append", args, "");
}
export function attack(): string;
export function attack(...args: unknown[]): string {
  return remoteCall("attack", args, "");
}
export function autosell(arg1: Item, arg2: number): boolean;
export function autosell(arg1: number, arg2: Item): boolean;
export function autosell(...args: unknown[]): boolean {
  return remoteCall("autosell", args, false);
}
export function autosellPrice(item: Item): number;
export function autosellPrice(...args: unknown[]): number {
  return remoteCall("autosellPrice", args, 0);
}
export function availableAmount(arg: Item): number;
export function availableAmount(...args: unknown[]): number {
  return remoteCall("availableAmount", args, 0);
}
export function availableChoiceOptions(): { [key: number]: string };
export function availableChoiceOptions(spoilers: boolean): {
  [key: number]: string;
};
export function availableChoiceOptions(...args: unknown[]): {
  [key: number]: string;
} {
  return remoteCall("availableChoiceOptions", args, {});
}
export function availableChoiceSelectInputs(decision: number): {
  [key: string]: { [key: string]: string };
};
export function availableChoiceSelectInputs(...args: unknown[]): {
  [key: string]: { [key: string]: string };
} {
  return remoteCall("availableChoiceSelectInputs", args, {});
}
export function availableChoiceTextInputs(decision: number): {
  [key: string]: string;
};
export function availableChoiceTextInputs(...args: unknown[]): {
  [key: string]: string;
} {
  return remoteCall("availableChoiceTextInputs", args, {});
}
export function availablePocket(arg: Monster): number;
export function availablePocket(arg: Effect): number;
export function availablePocket(arg: Item): number;
export function availablePocket(arg: Stat): number;
export function availablePocket(...args: unknown[]): number {
  return remoteCall("availablePocket", args, 0);
}
export function batchClose(): boolean;
export function batchClose(...args: unknown[]): boolean {
  return remoteCall("batchClose", args, false);
}
export function batchOpen(): void;
export function batchOpen(...args: unknown[]): void {
  return remoteCall("batchOpen", args);
}
export function bjornifyFamiliar(familiar: Familiar): boolean;
export function bjornifyFamiliar(...args: unknown[]): boolean {
  return remoteCall("bjornifyFamiliar", args, false);
}
export function blackMarketAvailable(): boolean;
export function blackMarketAvailable(...args: unknown[]): boolean {
  return remoteCall("blackMarketAvailable", args, false);
}
export function booleanModifier(
  ...args: [modifier: string] | [arg: string | Item | Effect]
): boolean;
export function booleanModifier(...args: unknown[]): boolean {
  return remoteCall("booleanModifier", args, false);
}
export function buffedHitStat(): number;
export function buffedHitStat(...args: unknown[]): number {
  return remoteCall("buffedHitStat", args, 0);
}
export function bufferToFile(var1: string, var2: string): boolean;
export function bufferToFile(...args: unknown[]): boolean {
  return remoteCall("bufferToFile", args, false);
}
export function buy(item: Item): boolean;
export function buy(item: Item, quantity: number): boolean;
export function buy(item: Item, quantity: number, price: number): number;
export function buy(quantity: number, item: Item): boolean;
export function buy(quantity: number, item: Item, price: number): number;
export function buy(
  coinmaster: Coinmaster,
  quantity: number,
  item: Item
): boolean;
export function buy(...args: unknown[]): number | boolean {
  return remoteCall("buy", args, 0);
}
export function buyPrice(master: Coinmaster, item: Item): number;
export function buyPrice(...args: unknown[]): number {
  return remoteCall("buyPrice", args, 0);
}
export function buyUsingStorage(item: Item): boolean;
export function buyUsingStorage(item: Item, quantity: number): boolean;
export function buyUsingStorage(
  item: Item,
  quantity: number,
  price: number
): number;
export function buyUsingStorage(quantity: number, item: Item): boolean;
export function buyUsingStorage(
  quantity: number,
  item: Item,
  price: number
): number;
export function buyUsingStorage(...args: unknown[]): number | boolean {
  return remoteCall("buyUsingStorage", args, 0);
}
export function buysItem(master: Coinmaster, item: Item): boolean;
export function buysItem(...args: unknown[]): boolean {
  return remoteCall("buysItem", args, false);
}
export function canAdventure(location: Location): boolean;
export function canAdventure(...args: unknown[]): boolean {
  return remoteCall("canAdventure", args, false);
}
export function canDrink(): boolean;
export function canDrink(...args: unknown[]): boolean {
  return remoteCall("canDrink", args, false);
}
export function canEat(): boolean;
export function canEat(...args: unknown[]): boolean {
  return remoteCall("canEat", args, false);
}
export function canEquip(itemOrFamiliar: Item): boolean;
export function canEquip(familiar: Familiar): boolean;
export function canEquip(familiar: Familiar, item: Item): boolean;
export function canEquip(...args: unknown[]): boolean {
  return remoteCall("canEquip", args, false);
}
export function canFaxbot(arg: Monster): boolean;
export function canFaxbot(...args: unknown[]): boolean {
  return remoteCall("canFaxbot", args, false);
}
export function canInteract(): boolean;
export function canInteract(...args: unknown[]): boolean {
  return remoteCall("canInteract", args, false);
}
export function canStillSteal(): boolean;
export function canStillSteal(...args: unknown[]): boolean {
  return remoteCall("canStillSteal", args, false);
}
export function canadiaAvailable(): boolean;
export function canadiaAvailable(...args: unknown[]): boolean {
  return remoteCall("canadiaAvailable", args, false);
}
export function candyForTier(arg: number): Item[];
export function candyForTier(arg1: number, arg2: number): Item[];
export function candyForTier(...args: unknown[]): Item[] {
  return remoteCall("candyForTier", args, []);
}
export function ceil(arg: number): number;
export function ceil(...args: unknown[]): number {
  return remoteCall("ceil", args, 0);
}
export function changeMcd(level: number): boolean;
export function changeMcd(...args: unknown[]): boolean {
  return remoteCall("changeMcd", args, false);
}
export function charAt(source: string, index: number): string;
export function charAt(...args: unknown[]): string {
  return remoteCall("charAt", args, "");
}
export function chatClan(messageValue: string): void;
export function chatClan(messageValue: string, recipientValue: string): void;
export function chatClan(...args: unknown[]): void {
  return remoteCall("chatClan", args);
}
export function chatMacro(macroValue: string): void;
export function chatMacro(...args: unknown[]): void {
  return remoteCall("chatMacro", args);
}
export function chatNotify(messageValue: string, colorValue: string): void;
export function chatNotify(...args: unknown[]): void {
  return remoteCall("chatNotify", args);
}
export function chatPrivate(recipientValue: string, messageValue: string): void;
export function chatPrivate(...args: unknown[]): void {
  return remoteCall("chatPrivate", args);
}
export function chew(item: Item): boolean;
export function chew(arg1: Item, arg2: number): boolean;
export function chew(arg1: number, arg2: Item): boolean;
export function chew(...args: unknown[]): boolean {
  return remoteCall("chew", args, false);
}
export function choiceFollowsFight(): boolean;
export function choiceFollowsFight(...args: unknown[]): boolean {
  return remoteCall("choiceFollowsFight", args, false);
}
export function classModifier(arg: string | Item, modifier: string): Class;
export function classModifier(...args: unknown[]): Class {
  return remoteCall(
    "classModifier",
    args,
    makePlaceholder("Class", "none") as Class
  );
}
export function clear(arg: any): void;
export function clear(...args: unknown[]): void {
  return remoteCall("clear", args);
}
export function clearBoozeHelper(): void;
export function clearBoozeHelper(...args: unknown[]): void {
  return remoteCall("clearBoozeHelper", args);
}
export function clearFoodHelper(): void;
export function clearFoodHelper(...args: unknown[]): void {
  return remoteCall("clearFoodHelper", args);
}
export function cliExecute(string: string): boolean;
export function cliExecute(...args: unknown[]): boolean {
  return remoteCall("cliExecute", args, false);
}
export function cliExecuteOutput(string: string): string;
export function cliExecuteOutput(...args: unknown[]): string {
  return remoteCall("cliExecuteOutput", args, "");
}
export function closetAmount(arg: Item): number;
export function closetAmount(...args: unknown[]): number {
  return remoteCall("closetAmount", args, 0);
}
export function combatManaCostModifier(): number;
export function combatManaCostModifier(...args: unknown[]): number {
  return remoteCall("combatManaCostModifier", args, 0);
}
export function combatRateModifier(): number;
export function combatRateModifier(...args: unknown[]): number {
  return remoteCall("combatRateModifier", args, 0);
}
export function containsText(source: string, search: string): boolean;
export function containsText(...args: unknown[]): boolean {
  return remoteCall("containsText", args, false);
}
export function council(): void;
export function council(...args: unknown[]): void {
  return remoteCall("council", args);
}
export function count(arg: any): number;
export function count(...args: unknown[]): number {
  return remoteCall("count", args, 0);
}
export function craft(
  modeValue: string,
  countValue: number,
  item1: Item,
  item2: Item
): number;
export function craft(...args: unknown[]): number {
  return remoteCall("craft", args, 0);
}
export function craftType(arg: Item): string;
export function craftType(...args: unknown[]): string {
  return remoteCall("craftType", args, "");
}
export function creatableAmount(arg: Item): number;
export function creatableAmount(...args: unknown[]): number {
  return remoteCall("creatableAmount", args, 0);
}
export function creatableTurns(itemId: Item): number;
export function creatableTurns(itemId: Item, count: number): number;
export function creatableTurns(
  itemId: Item,
  count: number,
  freeCrafting: boolean
): number;
export function creatableTurns(...args: unknown[]): number {
  return remoteCall("creatableTurns", args, 0);
}
export function create(item: Item): boolean;
export function create(arg1: Item, arg2: number): boolean;
export function create(arg1: number, arg2: Item): boolean;
export function create(...args: unknown[]): boolean {
  return remoteCall("create", args, false);
}
export function currentHitStat(): Stat;
export function currentHitStat(...args: unknown[]): Stat {
  return remoteCall(
    "currentHitStat",
    args,
    makePlaceholder("Stat", "none") as Stat
  );
}
export function currentMcd(): number;
export function currentMcd(...args: unknown[]): number {
  return remoteCall("currentMcd", args, 0);
}
export function currentPvpStances(): { [key: string]: number };
export function currentPvpStances(...args: unknown[]): {
  [key: string]: number;
} {
  return remoteCall("currentPvpStances", args, {});
}
export function currentRadSickness(): number;
export function currentRadSickness(...args: unknown[]): number {
  return remoteCall("currentRadSickness", args, 0);
}
export function currentRound(): number;
export function currentRound(...args: unknown[]): number {
  return remoteCall("currentRound", args, 0);
}
export function dadSeaMonkeeWeakness(arg: number): Element;
export function dadSeaMonkeeWeakness(...args: unknown[]): Element {
  return remoteCall(
    "dadSeaMonkeeWeakness",
    args,
    makePlaceholder("Element", "none") as Element
  );
}
export function dailySpecial(): Item;
export function dailySpecial(...args: unknown[]): Item {
  return remoteCall(
    "dailySpecial",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function damageAbsorptionPercent(): number;
export function damageAbsorptionPercent(...args: unknown[]): number {
  return remoteCall("damageAbsorptionPercent", args, 0);
}
export function damageReduction(): number;
export function damageReduction(...args: unknown[]): number {
  return remoteCall("damageReduction", args, 0);
}
export function dateToTimestamp(
  inFormat: string,
  dateTimeString: string
): number;
export function dateToTimestamp(...args: unknown[]): number {
  return remoteCall("dateToTimestamp", args, 0);
}
export function daycount(): number;
export function daycount(...args: unknown[]): number {
  return remoteCall("daycount", args, 0);
}
export function debugprint(string: string): void;
export function debugprint(...args: unknown[]): void {
  return remoteCall("debugprint", args);
}
export function descToEffect(value: string): Effect;
export function descToEffect(...args: unknown[]): Effect {
  return remoteCall(
    "descToEffect",
    args,
    makePlaceholder("Effect", "none") as Effect
  );
}
export function descToItem(value: string): Item;
export function descToItem(...args: unknown[]): Item {
  return remoteCall(
    "descToItem",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function disable(name: string): void;
export function disable(...args: unknown[]): void {
  return remoteCall("disable", args);
}
export function dispensaryAvailable(): boolean;
export function dispensaryAvailable(...args: unknown[]): boolean {
  return remoteCall("dispensaryAvailable", args, false);
}
export function displayAmount(arg: Item): number;
export function displayAmount(...args: unknown[]): number {
  return remoteCall("displayAmount", args, 0);
}
export function drink(item: Item): boolean;
export function drink(arg1: Item, arg2: number): boolean;
export function drink(arg1: number, arg2: Item): boolean;
export function drink(...args: unknown[]): boolean {
  return remoteCall("drink", args, false);
}
export function drinksilent(item: Item): boolean;
export function drinksilent(arg1: Item, arg2: number): boolean;
export function drinksilent(arg1: number, arg2: Item): boolean;
export function drinksilent(...args: unknown[]): boolean {
  return remoteCall("drinksilent", args, false);
}
export function dump(arg: any): void;
export function dump(arg: any, color: string): void;
export function dump(...args: unknown[]): void {
  return remoteCall("dump", args);
}
export function eat(item: Item): boolean;
export function eat(arg1: Item, arg2: number): boolean;
export function eat(arg1: number, arg2: Item): boolean;
export function eat(...args: unknown[]): boolean {
  return remoteCall("eat", args, false);
}
export function eatsilent(item: Item): boolean;
export function eatsilent(arg1: Item, arg2: number): boolean;
export function eatsilent(arg1: number, arg2: Item): boolean;
export function eatsilent(...args: unknown[]): boolean {
  return remoteCall("eatsilent", args, false);
}
export function effectModifier(arg: string | Item, modifier: string): Effect;
export function effectModifier(...args: unknown[]): Effect {
  return remoteCall(
    "effectModifier",
    args,
    makePlaceholder("Effect", "none") as Effect
  );
}
export function effectPockets(): { [key: number]: boolean };
export function effectPockets(...args: unknown[]): {
  [key: number]: boolean;
} {
  return remoteCall("effectPockets", args, {});
}
export function elementalResistance(arg: Element): number;
export function elementalResistance(): number;
export function elementalResistance(arg: Monster): number;
export function elementalResistance(...args: unknown[]): number {
  return remoteCall("elementalResistance", args, 0);
}
export function emptyCloset(): boolean;
export function emptyCloset(...args: unknown[]): boolean {
  return remoteCall("emptyCloset", args, false);
}
export function enable(name: string): void;
export function enable(...args: unknown[]): void {
  return remoteCall("enable", args);
}
export function endsWith(source: string, suffix: string): boolean;
export function endsWith(...args: unknown[]): boolean {
  return remoteCall("endsWith", args, false);
}
export function enthroneFamiliar(familiar: Familiar): boolean;
export function enthroneFamiliar(...args: unknown[]): boolean {
  return remoteCall("enthroneFamiliar", args, false);
}
export function entityDecode(arg: string): string;
export function entityDecode(...args: unknown[]): string {
  return remoteCall("entityDecode", args, "");
}
export function entityEncode(arg: string): string;
export function entityEncode(...args: unknown[]): string {
  return remoteCall("entityEncode", args, "");
}
export function equip(item: Item): boolean;
export function equip(arg1: Item, arg2: Slot): boolean;
export function equip(arg1: Slot, arg2: Item): boolean;
export function equip(...args: unknown[]): boolean {
  return remoteCall("equip", args, false);
}
export function equipAllFamiliars(): boolean;
export function equipAllFamiliars(...args: unknown[]): boolean {
  return remoteCall("equipAllFamiliars", args, false);
}
export function equippedAmount(arg: Item): number;
export function equippedAmount(...args: unknown[]): number {
  return remoteCall("equippedAmount", args, 0);
}
export function equippedItem(slot: Slot): Item;
export function equippedItem(...args: unknown[]): Item {
  return remoteCall(
    "equippedItem",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function eudora(): string;
export function eudora(newEudora: string): boolean;
export function eudora(...args: unknown[]): string | boolean {
  return remoteCall("eudora", args, "");
}
export function eudoraItem(): Item;
export function eudoraItem(...args: unknown[]): Item {
  return remoteCall(
    "eudoraItem",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function everyCardName(name: string): string;
export function everyCardName(...args: unknown[]): string {
  return remoteCall("everyCardName", args, "");
}
export function expectedDamage(): number;
export function expectedDamage(arg: Monster): number;
export function expectedDamage(...args: unknown[]): number {
  return remoteCall("expectedDamage", args, 0);
}
export function experienceBonus(): number;
export function experienceBonus(...args: unknown[]): number {
  return remoteCall("experienceBonus", args, 0);
}
export function expressionEval(expr: string): number;
export function expressionEval(...args: unknown[]): number {
  return remoteCall("expressionEval", args, 0);
}
export function extractItems(string: string): { [item: string]: number };
export function extractItems(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("extractItems", args, {});
}
export function extractMeat(string: string): number;
export function extractMeat(...args: unknown[]): number {
  return remoteCall("extractMeat", args, 0);
}
export function familiarEquipment(familiar: Familiar): Item;
export function familiarEquipment(...args: unknown[]): Item {
  return remoteCall(
    "familiarEquipment",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function familiarEquippedEquipment(familiar: Familiar): Item;
export function familiarEquippedEquipment(...args: unknown[]): Item {
  return remoteCall(
    "familiarEquippedEquipment",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function familiarWeight(familiar: Familiar): number;
export function familiarWeight(...args: unknown[]): number {
  return remoteCall("familiarWeight", args, 0);
}
export function favoriteFamiliars(): { [familiar: string]: boolean };
export function favoriteFamiliars(...args: unknown[]): {
  [familiar: string]: boolean;
} {
  return remoteCall("favoriteFamiliars", args, {});
}
export function faxbot(monsterName: Monster): boolean;
export function faxbot(monsterName: Monster, botName: string): boolean;
export function faxbot(...args: unknown[]): boolean {
  return remoteCall("faxbot", args, false);
}
export function fightFollowsChoice(): boolean;
export function fightFollowsChoice(...args: unknown[]): boolean {
  return remoteCall("fightFollowsChoice", args, false);
}
export function fileToArray(var1: string): { [key: number]: string };
export function fileToArray(...args: unknown[]): { [key: number]: string } {
  return remoteCall("fileToArray", args, {});
}
export function fileToBuffer(var1: string): string;
export function fileToBuffer(...args: unknown[]): string {
  return remoteCall("fileToBuffer", args, "");
}
export function fileToMap(var1: string, var2: any): boolean;
export function fileToMap(var1: string, var2: any, var3: boolean): boolean;
export function fileToMap(...args: unknown[]): boolean {
  return remoteCall("fileToMap", args, false);
}
export function floor(arg: number): number;
export function floor(...args: unknown[]): number {
  return remoteCall("floor", args, 0);
}
export function floristAvailable(): boolean;
export function floristAvailable(...args: unknown[]): boolean {
  return remoteCall("floristAvailable", args, false);
}
export function flushMonsterManuelCache(): boolean;
export function flushMonsterManuelCache(...args: unknown[]): boolean {
  return remoteCall("flushMonsterManuelCache", args, false);
}
export function formField(key: string): string;
export function formField(...args: unknown[]): string {
  return remoteCall("formField", args, "");
}
export function formFields(): { [key: string]: string };
export function formFields(...args: unknown[]): { [key: string]: string } {
  return remoteCall("formFields", args, {});
}
export function formatDateTime(
  inFormat: string,
  dateTimeString: string,
  outFormat: string
): string;
export function formatDateTime(...args: unknown[]): string {
  return remoteCall("formatDateTime", args, "");
}
export function friarsAvailable(): boolean;
export function friarsAvailable(...args: unknown[]): boolean {
  return remoteCall("friarsAvailable", args, false);
}
export function fuelCost(skill: Skill): number;
export function fuelCost(...args: unknown[]): number {
  return remoteCall("fuelCost", args, 0);
}
export function fullnessLimit(): number;
export function fullnessLimit(...args: unknown[]): number {
  return remoteCall("fullnessLimit", args, 0);
}
export function gamedayToInt(): number;
export function gamedayToInt(...args: unknown[]): number {
  return remoteCall("gamedayToInt", args, 0);
}
export function gamedayToString(): string;
export function gamedayToString(...args: unknown[]): string {
  return remoteCall("gamedayToString", args, "");
}
export function gametimeToInt(): number;
export function gametimeToInt(...args: unknown[]): number {
  return remoteCall("gametimeToInt", args, 0);
}
export function getAllProperties(
  filterValue: string,
  globalValue: boolean
): { [key: string]: boolean };
export function getAllProperties(...args: unknown[]): {
  [key: string]: boolean;
} {
  return remoteCall("getAllProperties", args, {});
}
export function getAutoAttack(): number;
export function getAutoAttack(...args: unknown[]): number {
  return remoteCall("getAutoAttack", args, 0);
}
export function getCampground(): { [item: string]: number };
export function getCampground(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("getCampground", args, {});
}
export function getCcsAction(index: number): string;
export function getCcsAction(...args: unknown[]): string {
  return remoteCall("getCcsAction", args, "");
}
export function getChateau(): { [item: string]: number };
export function getChateau(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getChateau", args, {});
}
export function getClanId(): number;
export function getClanId(...args: unknown[]): number {
  return remoteCall("getClanId", args, 0);
}
export function getClanLounge(): { [item: string]: number };
export function getClanLounge(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("getClanLounge", args, {});
}
export function getClanName(): string;
export function getClanName(...args: unknown[]): string {
  return remoteCall("getClanName", args, "");
}
export function getClanRumpus(): { [key: string]: number };
export function getClanRumpus(...args: unknown[]): {
  [key: string]: number;
} {
  return remoteCall("getClanRumpus", args, {});
}
export function getCloset(): { [item: string]: number };
export function getCloset(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getCloset", args, {});
}
export function getCounter(label: string): number;
export function getCounter(...args: unknown[]): number {
  return remoteCall("getCounter", args, 0);
}
export function getCounters(label: string, min: number, max: number): string;
export function getCounters(...args: unknown[]): string {
  return remoteCall("getCounters", args, "");
}
export function getCustomOutfits(): string[];
export function getCustomOutfits(...args: unknown[]): string[] {
  return remoteCall("getCustomOutfits", args, []);
}
export function getDisplay(): { [item: string]: number };
export function getDisplay(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getDisplay", args, {});
}
export function getDwelling(): Item;
export function getDwelling(...args: unknown[]): Item {
  return remoteCall(
    "getDwelling",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function getFloristPlants(): { [location: string]: string[] };
export function getFloristPlants(...args: unknown[]): {
  [location: string]: string[];
} {
  return remoteCall("getFloristPlants", args, {});
}
export function getFreePulls(): { [item: string]: number };
export function getFreePulls(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("getFreePulls", args, {});
}
export function getFuel(): number;
export function getFuel(...args: unknown[]): number {
  return remoteCall("getFuel", args, 0);
}
export function getGoals(): string[];
export function getGoals(...args: unknown[]): string[] {
  return remoteCall("getGoals", args, []);
}
export function getIgnoreZoneWarnings(): boolean;
export function getIgnoreZoneWarnings(...args: unknown[]): boolean {
  return remoteCall("getIgnoreZoneWarnings", args, false);
}
export function getIngredients(arg: Item): {
  [item: string]: number;
};
export function getIngredients(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("getIngredients", args, {});
}
export function getInventory(): { [item: string]: number };
export function getInventory(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("getInventory", args, {});
}
export function getLocationMonsters(location: Location): {
  [monster: string]: boolean;
};
export function getLocationMonsters(...args: unknown[]): {
  [monster: string]: boolean;
} {
  return remoteCall("getLocationMonsters", args, {});
}
export function getLocketMonsters(): {
  [monster: string]: boolean;
};
export function getLocketMonsters(...args: unknown[]): {
  [monster: string]: boolean;
} {
  return remoteCall("getLocketMonsters", args, {});
}
export function getMonsterMapping(): {
  [monster: string]: Monster;
};
export function getMonsterMapping(path: string): {
  [monster: string]: Monster;
};
export function getMonsterMapping(...args: unknown[]): {
  [monster: string]: Monster;
} {
  return remoteCall("getMonsterMapping", args, {});
}
export function getMonsters(location: Location): Monster[];
export function getMonsters(...args: unknown[]): Monster[] {
  return remoteCall("getMonsters", args, []);
}
export function getMoods(): string[];
export function getMoods(...args: unknown[]): string[] {
  return remoteCall("getMoods", args, []);
}
export function getOutfits(): string[];
export function getOutfits(...args: unknown[]): string[] {
  return remoteCall("getOutfits", args, []);
}
export function getPath(): string;
export function getPath(...args: unknown[]): string {
  return remoteCall("getPath", args, "");
}
export function getPathFull(): string;
export function getPathFull(...args: unknown[]): string {
  return remoteCall("getPathFull", args, "");
}
export function getPathVariables(): string;
export function getPathVariables(...args: unknown[]): string {
  return remoteCall("getPathVariables", args, "");
}
export function getPermedSkills(): { [skill: string]: boolean };
export function getPermedSkills(...args: unknown[]): {
  [skill: string]: boolean;
} {
  return remoteCall("getPermedSkills", args, {});
}
export function getPlayerId(playerNameValue: string): string;
export function getPlayerId(...args: unknown[]): string {
  return remoteCall("getPlayerId", args, "");
}
export function getPlayerName(playerIdValue: number): string;
export function getPlayerName(...args: unknown[]): string {
  return remoteCall("getPlayerName", args, "");
}
export function getPower(item: Item): number;
export function getPower(...args: unknown[]): number {
  return remoteCall("getPower", args, 0);
}
export function getProperty(name: string): string;
export function getProperty(name: string, globalValue: boolean): string;
export function getProperty(...args: unknown[]): string {
  return remoteCall("getProperty", args, "");
}
export function getRelated(
  item: Item,
  type: string
): { [item: string]: number };
export function getRelated(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getRelated", args, {});
}
export function getRevision(): number;
export function getRevision(...args: unknown[]): number {
  return remoteCall("getRevision", args, 0);
}
export function getShop(): { [item: string]: number };
export function getShop(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getShop", args, {});
}
export function getShopLog(): string[];
export function getShopLog(...args: unknown[]): string[] {
  return remoteCall("getShopLog", args, []);
}
export function getStackTrace(): {
  file: string;
  name: string;
  line: number;
}[];
export function getStackTrace(...args: unknown[]): {
  file: string;
  name: string;
  line: number;
}[] {
  return remoteCall("getStackTrace", args, []);
}
export function getStash(): { [item: string]: number };
export function getStash(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getStash", args, {});
}
export function getStorage(): { [item: string]: number };
export function getStorage(...args: unknown[]): { [item: string]: number } {
  return remoteCall("getStorage", args, {});
}
export function getVersion(): string;
export function getVersion(...args: unknown[]): string {
  return remoteCall("getVersion", args, "");
}
export function getWorkshed(): Item;
export function getWorkshed(...args: unknown[]): Item {
  return remoteCall(
    "getWorkshed",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function gnomadsAvailable(): boolean;
export function gnomadsAvailable(...args: unknown[]): boolean {
  return remoteCall("gnomadsAvailable", args, false);
}
export function goalExists(check: string): boolean;
export function goalExists(...args: unknown[]): boolean {
  return remoteCall("goalExists", args, false);
}
export function groupString(
  string: string,
  regex: string
): { [key: number]: { [key: number]: string } };
export function groupString(...args: unknown[]): {
  [key: number]: { [key: number]: string };
} {
  return remoteCall("groupString", args, {});
}
export function guildAvailable(): boolean;
export function guildAvailable(...args: unknown[]): boolean {
  return remoteCall("guildAvailable", args, false);
}
export function guildStoreAvailable(): boolean;
export function guildStoreAvailable(...args: unknown[]): boolean {
  return remoteCall("guildStoreAvailable", args, false);
}
export function handlingChoice(): boolean;
export function handlingChoice(...args: unknown[]): boolean {
  return remoteCall("handlingChoice", args, false);
}
export function haveBartender(): boolean;
export function haveBartender(...args: unknown[]): boolean {
  return remoteCall("haveBartender", args, false);
}
export function haveChef(): boolean;
export function haveChef(...args: unknown[]): boolean {
  return remoteCall("haveChef", args, false);
}
export function haveDisplay(): boolean;
export function haveDisplay(...args: unknown[]): boolean {
  return remoteCall("haveDisplay", args, false);
}
export function haveEffect(arg: Effect): number;
export function haveEffect(...args: unknown[]): number {
  return remoteCall("haveEffect", args, 0);
}
export function haveEquipped(item: Item): boolean;
export function haveEquipped(...args: unknown[]): boolean {
  return remoteCall("haveEquipped", args, false);
}
export function haveFamiliar(familiar: Familiar): boolean;
export function haveFamiliar(...args: unknown[]): boolean {
  return remoteCall("haveFamiliar", args, false);
}
export function haveMushroomPlot(): boolean;
export function haveMushroomPlot(...args: unknown[]): boolean {
  return remoteCall("haveMushroomPlot", args, false);
}
export function haveOutfit(outfit: string): boolean;
export function haveOutfit(...args: unknown[]): boolean {
  return remoteCall("haveOutfit", args, false);
}
export function haveServant(servant: Servant): boolean;
export function haveServant(...args: unknown[]): boolean {
  return remoteCall("haveServant", args, false);
}
export function haveShop(): boolean;
export function haveShop(...args: unknown[]): boolean {
  return remoteCall("haveShop", args, false);
}
export function haveSkill(arg: Skill): boolean;
export function haveSkill(...args: unknown[]): boolean {
  return remoteCall("haveSkill", args, false);
}
export function hedgeMaze(arg: string): boolean;
export function hedgeMaze(...args: unknown[]): boolean {
  return remoteCall("hedgeMaze", args, false);
}
export function hermit(arg1: Item, arg2: number): boolean;
export function hermit(arg1: number, arg2: Item): boolean;
export function hermit(...args: unknown[]): boolean {
  return remoteCall("hermit", args, false);
}
export function hiddenTempleUnlocked(): boolean;
export function hiddenTempleUnlocked(...args: unknown[]): boolean {
  return remoteCall("hiddenTempleUnlocked", args, false);
}
export function hippyStoneBroken(): boolean;
export function hippyStoneBroken(...args: unknown[]): boolean {
  return remoteCall("hippyStoneBroken", args, false);
}
export function hippyStoreAvailable(): boolean;
export function hippyStoreAvailable(...args: unknown[]): boolean {
  return remoteCall("hippyStoreAvailable", args, false);
}
export function historicalAge(item: Item): number;
export function historicalAge(...args: unknown[]): number {
  return remoteCall("historicalAge", args, 0);
}
export function historicalPrice(item: Item): number;
export function historicalPrice(...args: unknown[]): number {
  return remoteCall("historicalPrice", args, 0);
}
export function holiday(): string;
export function holiday(...args: unknown[]): string {
  return remoteCall("holiday", args, "");
}
export function hpCost(skill: Skill): number;
export function hpCost(...args: unknown[]): number {
  return remoteCall("hpCost", args, 0);
}
export function imageToMonster(value: string): Monster;
export function imageToMonster(...args: unknown[]): Monster {
  return remoteCall(
    "imageToMonster",
    args,
    makePlaceholder("Monster", "none") as Monster
  );
}
export function inBadMoon(): boolean;
export function inBadMoon(...args: unknown[]): boolean {
  return remoteCall("inBadMoon", args, false);
}
export function inCasual(): boolean;
export function inCasual(...args: unknown[]): boolean {
  return remoteCall("inCasual", args, false);
}
export function inHardcore(): boolean;
export function inHardcore(...args: unknown[]): boolean {
  return remoteCall("inHardcore", args, false);
}
export function inMoxieSign(): boolean;
export function inMoxieSign(...args: unknown[]): boolean {
  return remoteCall("inMoxieSign", args, false);
}
export function inMultiFight(): boolean;
export function inMultiFight(...args: unknown[]): boolean {
  return remoteCall("inMultiFight", args, false);
}
export function inMuscleSign(): boolean;
export function inMuscleSign(...args: unknown[]): boolean {
  return remoteCall("inMuscleSign", args, false);
}
export function inMysticalitySign(): boolean;
export function inMysticalitySign(...args: unknown[]): boolean {
  return remoteCall("inMysticalitySign", args, false);
}
export function inaccessibleReason(master: Coinmaster): string;
export function inaccessibleReason(...args: unknown[]): string {
  return remoteCall("inaccessibleReason", args, "");
}
export function indexOf(source: string, search: string): number;
export function indexOf(source: string, search: string, start: number): number;
export function indexOf(...args: unknown[]): number {
  return remoteCall("indexOf", args, 0);
}
export function inebrietyLimit(): number;
export function inebrietyLimit(...args: unknown[]): number {
  return remoteCall("inebrietyLimit", args, 0);
}
export function initiativeModifier(): number;
export function initiativeModifier(...args: unknown[]): number {
  return remoteCall("initiativeModifier", args, 0);
}
export function insert(buffer: string, index: number, s: string): string;
export function insert(...args: unknown[]): string {
  return remoteCall("insert", args, "");
}
export function isAccessible(master: Coinmaster): boolean;
export function isAccessible(...args: unknown[]): boolean {
  return remoteCall("isAccessible", args, false);
}
export function isBanished(arg: Monster): boolean;
export function isBanished(...args: unknown[]): boolean {
  return remoteCall("isBanished", args, false);
}
export function isCoinmasterItem(item: Item): boolean;
export function isCoinmasterItem(...args: unknown[]): boolean {
  return remoteCall("isCoinmasterItem", args, false);
}
export function isDarkMode(): boolean;
export function isDarkMode(...args: unknown[]): boolean {
  return remoteCall("isDarkMode", args, false);
}
export function isDiscardable(item: Item): boolean;
export function isDiscardable(...args: unknown[]): boolean {
  return remoteCall("isDiscardable", args, false);
}
export function isDisplayable(item: Item): boolean;
export function isDisplayable(...args: unknown[]): boolean {
  return remoteCall("isDisplayable", args, false);
}
export function isFamiliarEquipmentLocked(): boolean;
export function isFamiliarEquipmentLocked(...args: unknown[]): boolean {
  return remoteCall("isFamiliarEquipmentLocked", args, false);
}
export function isGiftable(item: Item): boolean;
export function isGiftable(...args: unknown[]): boolean {
  return remoteCall("isGiftable", args, false);
}
export function isGoal(item: Item): boolean;
export function isGoal(...args: unknown[]): boolean {
  return remoteCall("isGoal", args, false);
}
export function isHeadless(): boolean;
export function isHeadless(...args: unknown[]): boolean {
  return remoteCall("isHeadless", args, false);
}
export function isInteger(string: string): boolean;
export function isInteger(...args: unknown[]): boolean {
  return remoteCall("isInteger", args, false);
}
export function isNpcItem(item: Item): boolean;
export function isNpcItem(...args: unknown[]): boolean {
  return remoteCall("isNpcItem", args, false);
}
export function isOnline(arg: string): boolean;
export function isOnline(...args: unknown[]): boolean {
  return remoteCall("isOnline", args, false);
}
export function isTradeable(item: Item): boolean;
export function isTradeable(...args: unknown[]): boolean {
  return remoteCall("isTradeable", args, false);
}
export function isTrendy(thing: Item): boolean;
export function isTrendy(thing: Skill): boolean;
export function isTrendy(thing: Familiar): boolean;
export function isTrendy(thing: string): boolean;
export function isTrendy(...args: unknown[]): boolean {
  return remoteCall("isTrendy", args, false);
}
export function isUnrestricted(thing: Item): boolean;
export function isUnrestricted(thing: Skill): boolean;
export function isUnrestricted(thing: Familiar): boolean;
export function isUnrestricted(thing: string): boolean;
export function isUnrestricted(...args: unknown[]): boolean {
  return remoteCall("isUnrestricted", args, false);
}
export function isWearingOutfit(outfit: string): boolean;
export function isWearingOutfit(...args: unknown[]): boolean {
  return remoteCall("isWearingOutfit", args, false);
}
export function itemAmount(arg: Item): number;
export function itemAmount(...args: unknown[]): number {
  return remoteCall("itemAmount", args, 0);
}
export function itemDropModifier(): number;
export function itemDropModifier(...args: unknown[]): number {
  return remoteCall("itemDropModifier", args, 0);
}
export function itemDrops(): { [item: string]: number };
export function itemDrops(arg: Monster): {
  [item: string]: number;
};
export function itemDrops(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("itemDrops", args, {});
}
export function itemDropsArray(): {
  drop: Item;
  rate: number;
  type: string;
}[];
export function itemDropsArray(
  monster: Monster
): { drop: Item; rate: number; type: string }[];
export function itemDropsArray(
  arg: Monster
): { drop: Item; rate: number; type: string }[];
export function itemDropsArray(
  ...args: unknown[]
): { drop: Item; rate: number; type: string }[] {
  return remoteCall("itemDropsArray", args, []);
}
export function itemPockets(): { [key: number]: boolean };
export function itemPockets(...args: unknown[]): { [key: number]: boolean } {
  return remoteCall("itemPockets", args, {});
}
export function itemType(item: Item): string;
export function itemType(...args: unknown[]): string {
  return remoteCall("itemType", args, "");
}
export function jokePockets(): { [key: number]: boolean };
export function jokePockets(...args: unknown[]): { [key: number]: boolean } {
  return remoteCall("jokePockets", args, {});
}
export function jumpChance(): number;
export function jumpChance(arg: Monster): number;
export function jumpChance(arg: Monster, init: number): number;
export function jumpChance(arg: Monster, init: number, ml: number): number;
export function jumpChance(arg: Location): number;
export function jumpChance(arg: Location, init: number): number;
export function jumpChance(arg: Location, init: number, ml: number): number;
export function jumpChance(...args: unknown[]): number {
  return remoteCall("jumpChance", args, 0);
}
export function knollAvailable(): boolean;
export function knollAvailable(...args: unknown[]): boolean {
  return remoteCall("knollAvailable", args, false);
}
export function lastChoice(): number;
export function lastChoice(...args: unknown[]): number {
  return remoteCall("lastChoice", args, 0);
}
export function lastDecision(): number;
export function lastDecision(...args: unknown[]): number {
  return remoteCall("lastDecision", args, 0);
}
export function lastIndexOf(source: string, search: string): number;
export function lastIndexOf(
  source: string,
  search: string,
  start: number
): number;
export function lastIndexOf(...args: unknown[]): number {
  return remoteCall("lastIndexOf", args, 0);
}
export function lastItemMessage(): string;
export function lastItemMessage(...args: unknown[]): string {
  return remoteCall("lastItemMessage", args, "");
}
export function lastMonster(): Monster;
export function lastMonster(...args: unknown[]): Monster {
  return remoteCall(
    "lastMonster",
    args,
    makePlaceholder("Monster", "none") as Monster
  );
}
export function lastSkillMessage(): string;
export function lastSkillMessage(...args: unknown[]): string {
  return remoteCall("lastSkillMessage", args, "");
}
export function leetify(string: string): string;
export function leetify(...args: unknown[]): string {
  return remoteCall("leetify", args, "");
}
export function length(string: string): number;
export function length(...args: unknown[]): number {
  return remoteCall("length", args, 0);
}
export function lightningCost(skill: Skill): number;
export function lightningCost(...args: unknown[]): number {
  return remoteCall("lightningCost", args, 0);
}
export function limitMode(): string;
export function limitMode(...args: unknown[]): string {
  return remoteCall("limitMode", args, "");
}
export function loadHtml(string: string): string;
export function loadHtml(...args: unknown[]): string {
  return remoteCall("loadHtml", args, "");
}
export function lockFamiliarEquipment(lock: boolean): void;
export function lockFamiliarEquipment(...args: unknown[]): void {
  return remoteCall("lockFamiliarEquipment", args);
}
export function logN(arg: number): number;
export function logN(arg: number, base: number): number;
export function logN(...args: unknown[]): number {
  return remoteCall("logN", args, 0);
}
export function logprint(string: string): void;
export function logprint(...args: unknown[]): void {
  return remoteCall("logprint", args);
}
export function makeUrl(arg1: string, arg2: boolean, arg3: boolean): string;
export function makeUrl(...args: unknown[]): string {
  return remoteCall("makeUrl", args, "");
}
export function mallPrice(item: Item): number;
export function mallPrice(...args: unknown[]): number {
  return remoteCall("mallPrice", args, 0);
}
export function mallPrices(arg: { [key: number]: boolean }): number;
export function mallPrices(arg: string): number;
export function mallPrices(category: string, tiers: string): number;
export function mallPrices(...args: unknown[]): number {
  return remoteCall("mallPrices", args, 0);
}
export function manaCostModifier(): number;
export function manaCostModifier(...args: unknown[]): number {
  return remoteCall("manaCostModifier", args, 0);
}
export function mapToFile(var1: any, var2: string): boolean;
export function mapToFile(var1: any, var2: string, var3: boolean): boolean;
export function mapToFile(...args: unknown[]): boolean {
  return remoteCall("mapToFile", args, false);
}
export function max(arg1: number, arg2: number[]): number;
export function max(arg1: number, arg2: number[]): number;
export function max(...args: unknown[]): number {
  return remoteCall("max", args, 0);
}
export function maximize(
  maximizerStringValue: string,
  isSpeculateOnlyValue: boolean
): boolean;
export function maximize(
  maximizerStringValue: string,
  maxPriceValue: number,
  priceLevelValue: number,
  isSpeculateOnlyValue: boolean
): boolean;
export function maximize(
  maximizerStringValue: string,
  maxPriceValue: number,
  priceLevelValue: number,
  isSpeculateOnlyValue: boolean,
  showEquipment: boolean
): {
  display: string;
  command: string;
  score: number;
  effect: Effect;
  item: Item;
  skill: Skill;
}[];
export function maximize(...args: unknown[]):
  | boolean
  | {
      display: string;
      command: string;
      score: number;
      effect: Effect;
      item: Item;
      skill: Skill;
    }[] {
  return remoteCall("maximize", args, []);
}
export function meatDrop(): number;
export function meatDrop(arg: Monster): number;
export function meatDrop(...args: unknown[]): number {
  return remoteCall("meatDrop", args, 0);
}
export function meatDropModifier(): number;
export function meatDropModifier(...args: unknown[]): number {
  return remoteCall("meatDropModifier", args, 0);
}
export function meatPockets(): { [key: number]: number };
export function meatPockets(...args: unknown[]): { [key: number]: number } {
  return remoteCall("meatPockets", args, {});
}
export function min(arg1: number, arg2: number[]): number;
export function min(arg1: number, arg2: number[]): number;
export function min(...args: unknown[]): number {
  return remoteCall("min", args, 0);
}
export function minstrelInstrument(): Item;
export function minstrelInstrument(...args: unknown[]): Item {
  return remoteCall(
    "minstrelInstrument",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function minstrelLevel(): number;
export function minstrelLevel(...args: unknown[]): number {
  return remoteCall("minstrelLevel", args, 0);
}
export function minstrelQuest(): boolean;
export function minstrelQuest(...args: unknown[]): boolean {
  return remoteCall("minstrelQuest", args, false);
}
export function modifierEval(expr: string): number;
export function modifierEval(...args: unknown[]): number {
  return remoteCall("modifierEval", args, 0);
}
export function monkeyPaw(item: Item): boolean;
export function monkeyPaw(effect: Effect): boolean;
export function monkeyPaw(wish: string): boolean;
export function monkeyPaw(...args: unknown[]): boolean {
  return remoteCall("monkeyPaw", args, false);
}
export function monsterAttack(): number;
export function monsterAttack(arg: Monster): number;
export function monsterAttack(...args: unknown[]): number {
  return remoteCall("monsterAttack", args, 0);
}
export function monsterDefense(): number;
export function monsterDefense(arg: Monster): number;
export function monsterDefense(...args: unknown[]): number {
  return remoteCall("monsterDefense", args, 0);
}
export function monsterElement(): Element;
export function monsterElement(arg: Monster): Element;
export function monsterElement(...args: unknown[]): Element {
  return remoteCall(
    "monsterElement",
    args,
    makePlaceholder("Element", "none") as Element
  );
}
export function monsterEval(expr: string): number;
export function monsterEval(...args: unknown[]): number {
  return remoteCall("monsterEval", args, 0);
}
export function monsterFactoidsAvailable(arg1: Monster, arg2: boolean): number;
export function monsterFactoidsAvailable(...args: unknown[]): number {
  return remoteCall("monsterFactoidsAvailable", args, 0);
}
export function monsterHp(): number;
export function monsterHp(arg: Monster): number;
export function monsterHp(...args: unknown[]): number {
  return remoteCall("monsterHp", args, 0);
}
export function monsterInitiative(): number;
export function monsterInitiative(arg: Monster): number;
export function monsterInitiative(...args: unknown[]): number {
  return remoteCall("monsterInitiative", args, 0);
}
export function monsterLevelAdjustment(): number;
export function monsterLevelAdjustment(...args: unknown[]): number {
  return remoteCall("monsterLevelAdjustment", args, 0);
}
export function monsterManuelText(arg: Monster): string;
export function monsterManuelText(...args: unknown[]): string {
  return remoteCall("monsterManuelText", args, "");
}
export function monsterModifier(arg: Effect, modifier: string): Monster;
export function monsterModifier(...args: unknown[]): Monster {
  return remoteCall(
    "monsterModifier",
    args,
    makePlaceholder("Monster", "none") as Monster
  );
}
export function monsterPhylum(): Phylum;
export function monsterPhylum(arg: Monster): Phylum;
export function monsterPhylum(...args: unknown[]): Phylum {
  return remoteCall(
    "monsterPhylum",
    args,
    makePlaceholder("Phylum", "none") as Phylum
  );
}
export function monsterPockets(): { [key: number]: boolean };
export function monsterPockets(...args: unknown[]): {
  [key: number]: boolean;
} {
  return remoteCall("monsterPockets", args, {});
}
export function moodExecute(multiplicity: number): void;
export function moodExecute(...args: unknown[]): void {
  return remoteCall("moodExecute", args);
}
export function moodList(): string[];
export function moodList(...args: unknown[]): string[] {
  return remoteCall("moodList", args, []);
}
export function moonLight(): number;
export function moonLight(...args: unknown[]): number {
  return remoteCall("moonLight", args, 0);
}
export function moonPhase(): number;
export function moonPhase(...args: unknown[]): number {
  return remoteCall("moonPhase", args, 0);
}
export function mpCost(skill: Skill): number;
export function mpCost(...args: unknown[]): number {
  return remoteCall("mpCost", args, 0);
}
export function myAbsorbs(): number;
export function myAbsorbs(...args: unknown[]): number {
  return remoteCall("myAbsorbs", args, 0);
}
export function myAdventures(): number;
export function myAdventures(...args: unknown[]): number {
  return remoteCall("myAdventures", args, 0);
}
export function myAscensions(): number;
export function myAscensions(...args: unknown[]): number {
  return remoteCall("myAscensions", args, 0);
}
export function myAudience(): number;
export function myAudience(...args: unknown[]): number {
  return remoteCall("myAudience", args, 0);
}
export function myBasestat(arg: Stat): number;
export function myBasestat(...args: unknown[]): number {
  return remoteCall("myBasestat", args, 0);
}
export function myBjornedFamiliar(): Familiar;
export function myBjornedFamiliar(...args: unknown[]): Familiar {
  return remoteCall(
    "myBjornedFamiliar",
    args,
    makePlaceholder("Familiar", "none") as Familiar
  );
}
export function myBuffedstat(arg: Stat): number;
export function myBuffedstat(...args: unknown[]): number {
  return remoteCall("myBuffedstat", args, 0);
}
export function myClass(): Class;
export function myClass(...args: unknown[]): Class {
  return remoteCall("myClass", args, makePlaceholder("Class", "none") as Class);
}
export function myClosetMeat(): number;
export function myClosetMeat(...args: unknown[]): number {
  return remoteCall("myClosetMeat", args, 0);
}
export function myCompanion(): string;
export function myCompanion(...args: unknown[]): string {
  return remoteCall("myCompanion", args, "");
}
export function myDaycount(): number;
export function myDaycount(...args: unknown[]): number {
  return remoteCall("myDaycount", args, 0);
}
export function myDiscomomentum(): number;
export function myDiscomomentum(...args: unknown[]): number {
  return remoteCall("myDiscomomentum", args, 0);
}
export function myEffectiveFamiliar(): Familiar;
export function myEffectiveFamiliar(...args: unknown[]): Familiar {
  return remoteCall(
    "myEffectiveFamiliar",
    args,
    makePlaceholder("Familiar", "none") as Familiar
  );
}
export function myEffects(): { [effect: string]: number };
export function myEffects(...args: unknown[]): { [effect: string]: number } {
  return remoteCall("myEffects", args, {});
}
export function myEnthronedFamiliar(): Familiar;
export function myEnthronedFamiliar(...args: unknown[]): Familiar {
  return remoteCall(
    "myEnthronedFamiliar",
    args,
    makePlaceholder("Familiar", "none") as Familiar
  );
}
export function myFamiliar(): Familiar;
export function myFamiliar(...args: unknown[]): Familiar {
  return remoteCall(
    "myFamiliar",
    args,
    makePlaceholder("Familiar", "none") as Familiar
  );
}
export function myFullness(): number;
export function myFullness(...args: unknown[]): number {
  return remoteCall("myFullness", args, 0);
}
export function myFury(): number;
export function myFury(...args: unknown[]): number {
  return remoteCall("myFury", args, 0);
}
export function myGardenType(): string;
export function myGardenType(...args: unknown[]): string {
  return remoteCall("myGardenType", args, "");
}
export function myHash(): string;
export function myHash(...args: unknown[]): string {
  return remoteCall("myHash", args, "");
}
export function myHp(): number;
export function myHp(...args: unknown[]): number {
  return remoteCall("myHp", args, 0);
}
export function myId(): string;
export function myId(...args: unknown[]): string {
  return remoteCall("myId", args, "");
}
export function myInebriety(): number;
export function myInebriety(...args: unknown[]): number {
  return remoteCall("myInebriety", args, 0);
}
export function myLevel(): number;
export function myLevel(...args: unknown[]): number {
  return remoteCall("myLevel", args, 0);
}
export function myLightning(): number;
export function myLightning(...args: unknown[]): number {
  return remoteCall("myLightning", args, 0);
}
export function myLocation(): Location;
export function myLocation(...args: unknown[]): Location {
  return remoteCall(
    "myLocation",
    args,
    makePlaceholder("Location", "none") as Location
  );
}
export function myMask(): string;
export function myMask(...args: unknown[]): string {
  return remoteCall("myMask", args, "");
}
export function myMaxfury(): number;
export function myMaxfury(...args: unknown[]): number {
  return remoteCall("myMaxfury", args, 0);
}
export function myMaxhp(): number;
export function myMaxhp(...args: unknown[]): number {
  return remoteCall("myMaxhp", args, 0);
}
export function myMaxmp(): number;
export function myMaxmp(...args: unknown[]): number {
  return remoteCall("myMaxmp", args, 0);
}
export function myMaxpp(): number;
export function myMaxpp(...args: unknown[]): number {
  return remoteCall("myMaxpp", args, 0);
}
export function myMeat(): number;
export function myMeat(...args: unknown[]): number {
  return remoteCall("myMeat", args, 0);
}
export function myMp(): number;
export function myMp(...args: unknown[]): number {
  return remoteCall("myMp", args, 0);
}
export function myName(): string;
export function myName(...args: unknown[]): string {
  return remoteCall("myName", args, "");
}
export function myPath(): string;
export function myPath(...args: unknown[]): string {
  return remoteCall("myPath", args, "");
}
export function myPathId(): number;
export function myPathId(...args: unknown[]): number {
  return remoteCall("myPathId", args, 0);
}
export function myPokeFam(arg: number): Familiar;
export function myPokeFam(...args: unknown[]): Familiar {
  return remoteCall(
    "myPokeFam",
    args,
    makePlaceholder("Familiar", "none") as Familiar
  );
}
export function myPp(): number;
export function myPp(...args: unknown[]): number {
  return remoteCall("myPp", args, 0);
}
export function myPrimestat(): Stat;
export function myPrimestat(...args: unknown[]): Stat {
  return remoteCall(
    "myPrimestat",
    args,
    makePlaceholder("Stat", "none") as Stat
  );
}
export function myRain(): number;
export function myRain(...args: unknown[]): number {
  return remoteCall("myRain", args, 0);
}
export function myRobotEnergy(): number;
export function myRobotEnergy(...args: unknown[]): number {
  return remoteCall("myRobotEnergy", args, 0);
}
export function myRobotScraps(): number;
export function myRobotScraps(...args: unknown[]): number {
  return remoteCall("myRobotScraps", args, 0);
}
export function myServant(): Servant;
export function myServant(...args: unknown[]): Servant {
  return remoteCall(
    "myServant",
    args,
    makePlaceholder("Servant", "none") as Servant
  );
}
export function mySessionAdv(): number;
export function mySessionAdv(...args: unknown[]): number {
  return remoteCall("mySessionAdv", args, 0);
}
export function mySessionItems(): { [item: string]: number };
export function mySessionItems(item: Item): number;
export function mySessionItems(
  ...args: unknown[]
): { [item: string]: number } | number {
  return remoteCall("mySessionItems", args, args.length > 0 ? 0 : {});
}
export function mySessionMeat(): number;
export function mySessionMeat(...args: unknown[]): number {
  return remoteCall("mySessionMeat", args, 0);
}
export function mySessionResults(): { [key: string]: number };
export function mySessionResults(...args: unknown[]): {
  [key: string]: number;
} {
  return remoteCall("mySessionResults", args, {});
}
export function mySign(): string;
export function mySign(...args: unknown[]): string {
  return remoteCall("mySign", args, "");
}
export function mySoulsauce(): number;
export function mySoulsauce(...args: unknown[]): number {
  return remoteCall("mySoulsauce", args, 0);
}
export function mySpleenUse(): number;
export function mySpleenUse(...args: unknown[]): number {
  return remoteCall("mySpleenUse", args, 0);
}
export function myStorageMeat(): number;
export function myStorageMeat(...args: unknown[]): number {
  return remoteCall("myStorageMeat", args, 0);
}
export function myThrall(): Thrall;
export function myThrall(...args: unknown[]): Thrall {
  return remoteCall(
    "myThrall",
    args,
    makePlaceholder("Thrall", "none") as Thrall
  );
}
export function myThunder(): number;
export function myThunder(...args: unknown[]): number {
  return remoteCall("myThunder", args, 0);
}
export function myTotalTurnsSpent(): number;
export function myTotalTurnsSpent(...args: unknown[]): number {
  return remoteCall("myTotalTurnsSpent", args, 0);
}
export function myTurncount(): number;
export function myTurncount(...args: unknown[]): number {
  return remoteCall("myTurncount", args, 0);
}
export function myVykeaCompanion(): Vykea;
export function myVykeaCompanion(...args: unknown[]): Vykea {
  return remoteCall(
    "myVykeaCompanion",
    args,
    makePlaceholder("Vykea", "none") as Vykea
  );
}
export function myWildfireWater(): number;
export function myWildfireWater(...args: unknown[]): number {
  return remoteCall("myWildfireWater", args, 0);
}
export function nowToInt(): number;
export function nowToInt(...args: unknown[]): number {
  return remoteCall("nowToInt", args, 0);
}
export function nowToString(dateFormatValue: string): string;
export function nowToString(...args: unknown[]): string {
  return remoteCall("nowToString", args, "");
}
export function npcPrice(item: Item): number;
export function npcPrice(...args: unknown[]): number {
  return remoteCall("npcPrice", args, 0);
}
export function numberologyPrize(num: number): string;
export function numberologyPrize(...args: unknown[]): string {
  return remoteCall("numberologyPrize", args, "");
}
export function numericModifier(
  ...args:
    | []
    | [modifier: string]
    | [arg: string | Item | Effect | Skill | Familiar | Item, modifier: string]
    | [familiar: Familiar, modifier: string, weight: number, item: Item]
): number;
export function numericModifier(...args: unknown[]): number {
  return remoteCall("numericModifier", args, 0);
}
export function outfit(outfit: string): boolean;
export function outfit(...args: unknown[]): boolean {
  return remoteCall("outfit", args, false);
}
export function outfitPieces(outfit: string): Item[];
export function outfitPieces(...args: unknown[]): Item[] {
  return remoteCall("outfitPieces", args, []);
}
export function outfitTattoo(outfit: string): string;
export function outfitTattoo(...args: unknown[]): string {
  return remoteCall("outfitTattoo", args, "");
}
export function outfitTreats(outfit: string): { [item: string]: number };
export function outfitTreats(...args: unknown[]): {
  [item: string]: number;
} {
  return remoteCall("outfitTreats", args, {});
}
export function overdrink(item: Item): boolean;
export function overdrink(arg1: Item, arg2: number): boolean;
export function overdrink(arg1: number, arg2: Item): boolean;
export function overdrink(...args: unknown[]): boolean {
  return remoteCall("overdrink", args, false);
}
export function pathIdToName(value: number): string;
export function pathIdToName(...args: unknown[]): string {
  return remoteCall("pathIdToName", args, "");
}
export function pathNameToId(value: string): number;
export function pathNameToId(...args: unknown[]): number {
  return remoteCall("pathNameToId", args, 0);
}
export function pickPocket(arg: Monster): boolean;
export function pickPocket(arg: Effect): {
  [effect: string]: number;
};
export function pickPocket(arg: Item): {
  [item: string]: number;
};
export function pickPocket(arg: Stat): {
  [stat: string]: number;
};
export function pickPocket(arg: number): boolean;
export function pickPocket(...args: unknown[]):
  | {
      [effect: string]: number;
    }
  | {
      [item: string]: number;
    }
  | boolean {
  return remoteCall(
    "pickPocket",
    args,
    typeof args[0] === "number" ? false : {}
  );
}
export function pickedPockets(): { [key: number]: boolean };
export function pickedPockets(...args: unknown[]): {
  [key: number]: boolean;
} {
  return remoteCall("pickedPockets", args, {});
}
export function pickedScraps(): { [key: number]: boolean };
export function pickedScraps(...args: unknown[]): {
  [key: number]: boolean;
} {
  return remoteCall("pickedScraps", args, {});
}
export function pocketEffects(pocket: number): { [effect: string]: number };
export function pocketEffects(...args: unknown[]): {
  [effect: string]: number;
} {
  return remoteCall("pocketEffects", args, {});
}
export function pocketItems(pocket: number): { [item: string]: number };
export function pocketItems(...args: unknown[]): { [item: string]: number } {
  return remoteCall("pocketItems", args, {});
}
export function pocketJoke(pocket: number): string;
export function pocketJoke(...args: unknown[]): string {
  return remoteCall("pocketJoke", args, "");
}
export function pocketMeat(pocket: number): { [key: number]: string };
export function pocketMeat(...args: unknown[]): { [key: number]: string } {
  return remoteCall("pocketMeat", args, {});
}
export function pocketMonster(pocket: number): Monster;
export function pocketMonster(...args: unknown[]): Monster {
  return remoteCall(
    "pocketMonster",
    args,
    makePlaceholder("Monster", "none") as Monster
  );
}
export function pocketPoem(pocket: number): { [key: number]: string };
export function pocketPoem(...args: unknown[]): { [key: number]: string } {
  return remoteCall("pocketPoem", args, {});
}
export function pocketScrap(pocket: number): { [key: number]: string };
export function pocketScrap(...args: unknown[]): { [key: number]: string } {
  return remoteCall("pocketScrap", args, {});
}
export function pocketStats(pocket: number): { [stat: string]: number };
export function pocketStats(...args: unknown[]): { [stat: string]: number } {
  return remoteCall("pocketStats", args, {});
}
export function poemPockets(): { [key: number]: number };
export function poemPockets(...args: unknown[]): { [key: number]: number } {
  return remoteCall("poemPockets", args, {});
}
export function potentialPockets(arg: Monster): {
  [key: number]: number;
};
export function potentialPockets(arg: Effect): {
  [key: number]: number;
};
export function potentialPockets(arg: Item): {
  [key: number]: number;
};
export function potentialPockets(arg: Stat): {
  [key: number]: number;
};
export function potentialPockets(...args: unknown[]): {
  [key: number]: number;
} {
  return remoteCall("potentialPockets", args, {});
}
export function prepareForAdventure(location: Location): boolean;
export function prepareForAdventure(...args: unknown[]): boolean {
  return remoteCall("prepareForAdventure", args, false);
}
export function print(): void;
export function print(string: string): void;
export function print(string: string, color: string): void;
export function print(...args: unknown[]): void {
  return remoteCall("print", args);
}
export function printHtml(string: string): void;
export function printHtml(...args: unknown[]): void {
  return remoteCall("printHtml", args);
}
export function propertyDefaultValue(nameValue: string): string;
export function propertyDefaultValue(...args: unknown[]): string {
  return remoteCall("propertyDefaultValue", args, "");
}
export function propertyExists(nameValue: string): boolean;
export function propertyExists(
  nameValue: string,
  globalValue: boolean
): boolean;
export function propertyExists(...args: unknown[]): boolean {
  return remoteCall("propertyExists", args, false);
}
export function propertyHasDefault(nameValue: string): boolean;
export function propertyHasDefault(...args: unknown[]): boolean {
  return remoteCall("propertyHasDefault", args, false);
}
export function pullsRemaining(): number;
export function pullsRemaining(...args: unknown[]): number {
  return remoteCall("pullsRemaining", args, 0);
}
export function putCloset(arg1: number): boolean;
export function putCloset(arg1: Item): boolean;
export function putCloset(arg1: Item, arg2: number): boolean;
export function putCloset(arg1: number, arg2: Item): boolean;
export function putCloset(...args: unknown[]): boolean {
  return remoteCall("putCloset", args, false);
}
export function putDisplay(arg1: number, arg2: Item): boolean;
export function putDisplay(arg1: Item, arg2: number): boolean;
export function putDisplay(...args: unknown[]): boolean {
  return remoteCall("putDisplay", args, false);
}
export function putShop(
  priceValue: number,
  limitValue: number,
  itemValue: Item
): boolean;
export function putShop(
  priceValue: number,
  limitValue: number,
  qtyValue: number,
  itemValue: Item
): boolean;
export function putShop(...args: unknown[]): boolean {
  return remoteCall("putShop", args, false);
}
export function putShopUsingStorage(
  priceValue: number,
  limitValue: number,
  itemValue: Item
): boolean;
export function putShopUsingStorage(
  priceValue: number,
  limitValue: number,
  qtyValue: number,
  itemValue: Item
): boolean;
export function putShopUsingStorage(...args: unknown[]): boolean {
  return remoteCall("putShopUsingStorage", args, false);
}
export function putStash(arg1: Item, arg2: number): boolean;
export function putStash(arg1: number, arg2: Item): boolean;
export function putStash(...args: unknown[]): boolean {
  return remoteCall("putStash", args, false);
}
export function pvpAttacksLeft(): number;
export function pvpAttacksLeft(...args: unknown[]): number {
  return remoteCall("pvpAttacksLeft", args, 0);
}
export function rainCost(skill: Skill): number;
export function rainCost(...args: unknown[]): number {
  return remoteCall("rainCost", args, 0);
}
export function random(arg: number): number;
export function random(...args: unknown[]): number {
  return remoteCall("random", args, 0);
}
export function rawDamageAbsorption(): number;
export function rawDamageAbsorption(...args: unknown[]): number {
  return remoteCall("rawDamageAbsorption", args, 0);
}
export function refreshShop(): boolean;
export function refreshShop(...args: unknown[]): boolean {
  return remoteCall("refreshShop", args, false);
}
export function refreshStash(): boolean;
export function refreshStash(...args: unknown[]): boolean {
  return remoteCall("refreshStash", args, false);
}
export function refreshStatus(): boolean;
export function refreshStatus(...args: unknown[]): boolean {
  return remoteCall("refreshStatus", args, false);
}
export function removeItemCondition(arg1: number, arg2: Item): void;
export function removeItemCondition(arg1: Item, arg2: number): void;
export function removeItemCondition(...args: unknown[]): void {
  return remoteCall("removeItemCondition", args);
}
export function removeProperty(nameValue: string): string;
export function removeProperty(nameValue: string, globalValue: boolean): string;
export function removeProperty(...args: unknown[]): string {
  return remoteCall("removeProperty", args, "");
}
export function renameProperty(
  oldNameValue: string,
  newNameValue: string
): boolean;
export function renameProperty(...args: unknown[]): boolean {
  return remoteCall("renameProperty", args, false);
}
export function replace(
  buffer: string,
  start: number,
  finish: number,
  s: string
): string;
export function replace(...args: unknown[]): string {
  return remoteCall("replace", args, "");
}
export function replaceString(
  source: string,
  searchValue: string,
  replaceValue: string
): string;
export function replaceString(
  source: string,
  searchValue: string,
  replaceValue: string
): string;
export function replaceString(...args: unknown[]): string {
  return remoteCall("replaceString", args, "");
}
export function repriceShop(priceValue: number, itemValue: Item): boolean;
export function repriceShop(
  priceValue: number,
  limitValue: number,
  itemValue: Item
): boolean;
export function repriceShop(...args: unknown[]): boolean {
  return remoteCall("repriceShop", args, false);
}
export function restorationPockets(): { [key: number]: boolean };
export function restorationPockets(...args: unknown[]): {
  [key: number]: boolean;
} {
  return remoteCall("restorationPockets", args, {});
}
export function restoreHp(amount: number): boolean;
export function restoreHp(...args: unknown[]): boolean {
  return remoteCall("restoreHp", args, false);
}
export function restoreMp(amount: number): boolean;
export function restoreMp(...args: unknown[]): boolean {
  return remoteCall("restoreMp", args, false);
}
export function retrieveItem(item: Item): boolean;
export function retrieveItem(arg1: Item, arg2: number): boolean;
export function retrieveItem(arg1: number, arg2: Item): boolean;
export function retrieveItem(...args: unknown[]): boolean {
  return remoteCall("retrieveItem", args, false);
}
export function reverseNumberology(): { [key: number]: number };
export function reverseNumberology(
  advDelta: number,
  spleenDelta: number
): { [key: number]: number };
export function reverseNumberology(...args: unknown[]): {
  [key: number]: number;
} {
  return remoteCall("reverseNumberology", args, {});
}
export function rollover(): number;
export function rollover(...args: unknown[]): number {
  return remoteCall("rollover", args, 0);
}
export function round(arg: number): number;
export function round(...args: unknown[]): number {
  return remoteCall("round", args, 0);
}
export function runChoice(decision: number): string;
export function runChoice(decision: number, extra: string): string;
export function runChoice(decision: number, extra: boolean): string;
export function runChoice(
  decision: number,
  custom: boolean,
  more: string
): string;
export function runChoice(...args: unknown[]): string {
  return remoteCall("runChoice", args, "");
}
export function runCombat(): string;
export function runCombat(
  filterFunction:
    | string
    | ((round: number, monster: Monster, text: string) => string)
): string;
export function runCombat(...args: unknown[]): string {
  return remoteCall("runCombat", args, "");
}
export function runTurn(): string;
export function runTurn(...args: unknown[]): string {
  return remoteCall("runTurn", args, "");
}
export function runaway(): string;
export function runaway(...args: unknown[]): string {
  return remoteCall("runaway", args, "");
}
export function scrapPockets(): { [key: number]: number };
export function scrapPockets(...args: unknown[]): { [key: number]: number } {
  return remoteCall("scrapPockets", args, {});
}
export function sell(
  master: Coinmaster,
  countValue: number,
  itemValue: Item
): boolean;
export function sell(...args: unknown[]): boolean {
  return remoteCall("sell", args, false);
}
export function sellPrice(master: Coinmaster, item: Item): number;
export function sellPrice(...args: unknown[]): number {
  return remoteCall("sellPrice", args, 0);
}
export function sellsItem(master: Coinmaster, item: Item): boolean;
export function sellsItem(...args: unknown[]): boolean {
  return remoteCall("sellsItem", args, false);
}
export function sessionLogs(dayCount: number): string[];
export function sessionLogs(player: string, dayCount: number): string[];
export function sessionLogs(
  playerName: string,
  baseDate: string,
  count: number
): string[];
export function sessionLogs(...args: unknown[]): string[] {
  return remoteCall("sessionLogs", args, []);
}
export function setAutoAttack(attackValue: number): void;
export function setAutoAttack(attackValue: string): void;
export function setAutoAttack(...args: unknown[]): void {
  return remoteCall("setAutoAttack", args);
}
export function setLength(buffer: string, i: number): void;
export function setLength(...args: unknown[]): void {
  return remoteCall("setLength", args);
}
export function setLocation(location: Location): void;
export function setLocation(...args: unknown[]): void {
  return remoteCall("setLocation", args);
}
export function setProperty(nameValue: string, value: string): void;
export function setProperty(...args: unknown[]): void {
  return remoteCall("setProperty", args);
}
export function shopAmount(arg: Item): number;
export function shopAmount(...args: unknown[]): number {
  return remoteCall("shopAmount", args, 0);
}
export function shopLimit(arg: Item): number;
export function shopLimit(...args: unknown[]): number {
  return remoteCall("shopLimit", args, 0);
}
export function shopPrice(item: Item): number;
export function shopPrice(...args: unknown[]): number {
  return remoteCall("shopPrice", args, 0);
}
export function skillModifier(arg: string | Item, modifier: string): Skill;
export function skillModifier(...args: unknown[]): Skill {
  return remoteCall(
    "skillModifier",
    args,
    makePlaceholder("Skill", "none") as Skill
  );
}
export function slashCount(arg: Item): number;
export function slashCount(...args: unknown[]): number {
  return remoteCall("slashCount", args, 0);
}
export function soulsauceCost(skill: Skill): number;
export function soulsauceCost(...args: unknown[]): number {
  return remoteCall("soulsauceCost", args, 0);
}
export function spleenLimit(): number;
export function spleenLimit(...args: unknown[]): number {
  return remoteCall("spleenLimit", args, 0);
}
export function splitString(string: string): string[];
export function splitString(string: string, regex: string): string[];
export function splitString(...args: unknown[]): string[] {
  return remoteCall("splitString", args, []);
}
export function squareRoot(val: number): number;
export function squareRoot(...args: unknown[]): number {
  return remoteCall("squareRoot", args, 0);
}
export function startsWith(source: string, prefix: string): boolean;
export function startsWith(...args: unknown[]): boolean {
  return remoteCall("startsWith", args, false);
}
export function stashAmount(arg: Item): number;
export function stashAmount(...args: unknown[]): number {
  return remoteCall("stashAmount", args, 0);
}
export function statBonusToday(): Stat;
export function statBonusToday(...args: unknown[]): Stat {
  return remoteCall(
    "statBonusToday",
    args,
    makePlaceholder("Stat", "none") as Stat
  );
}
export function statBonusTomorrow(): Stat;
export function statBonusTomorrow(...args: unknown[]): Stat {
  return remoteCall(
    "statBonusTomorrow",
    args,
    makePlaceholder("Stat", "none") as Stat
  );
}
export function statModifier(arg: Effect, modifier: string): Stat;
export function statModifier(...args: unknown[]): Stat {
  return remoteCall(
    "statModifier",
    args,
    makePlaceholder("Stat", "none") as Stat
  );
}
export function statsPockets(): { [key: number]: boolean };
export function statsPockets(...args: unknown[]): {
  [key: number]: boolean;
} {
  return remoteCall("statsPockets", args, {});
}
export function steal(): string;
export function steal(...args: unknown[]): string {
  return remoteCall("steal", args, "");
}
export function stillsAvailable(): number;
export function stillsAvailable(...args: unknown[]): number {
  return remoteCall("stillsAvailable", args, 0);
}
export function stopCounter(label: string): void;
export function stopCounter(...args: unknown[]): void {
  return remoteCall("stopCounter", args);
}
export function storageAmount(arg: Item): number;
export function storageAmount(...args: unknown[]): number {
  return remoteCall("storageAmount", args, 0);
}
export function stringModifier(
  ...args: [modifier: string] | [arg: string | Item | Effect, modifier: string]
): string;
export function stringModifier(...args: unknown[]): string {
  return remoteCall("stringModifier", args, "");
}
export function stunSkill(): Skill;
export function stunSkill(...args: unknown[]): Skill {
  return remoteCall(
    "stunSkill",
    args,
    makePlaceholder("Skill", "none") as Skill
  );
}
export function substring(source: string, start: number): string;
export function substring(
  source: string,
  start: number,
  finish: number
): string;
export function substring(...args: unknown[]): string {
  return remoteCall("substring", args, "");
}
export function svnAtHead(project: string): boolean;
export function svnAtHead(...args: unknown[]): boolean {
  return remoteCall("svnAtHead", args, false);
}
export function svnExists(project: string): boolean;
export function svnExists(...args: unknown[]): boolean {
  return remoteCall("svnExists", args, false);
}
export function svnInfo(script: string): {
  url: string;
  revision: number;
  last_changed_author: string;
  last_changed_rev: number;
  last_changed_date: string;
};
export function svnInfo(...args: unknown[]): {
  url: string;
  revision: number;
  last_changed_author: string;
  last_changed_rev: number;
  last_changed_date: string;
} {
  return remoteCall("svnInfo", args, {
    url: "",
    revision: 0,
    last_changed_author: "",
    last_changed_rev: 0,
    last_changed_date: "",
  });
}
export function sweetSynthesis(effect: Effect): boolean;
export function sweetSynthesis(arg1: number, arg2: Effect): boolean;
export function sweetSynthesis(arg1: Effect, arg2: number): boolean;
export function sweetSynthesis(
  arg1: number,
  arg2: Effect,
  arg3: number
): boolean;
export function sweetSynthesis(arg1: Item, arg2: Item): boolean;
export function sweetSynthesis(arg1: number, arg2: Item, arg3: Item): boolean;
export function sweetSynthesis(...args: unknown[]): boolean {
  return remoteCall("sweetSynthesis", args, false);
}
export function sweetSynthesisPair(arg1: Effect): Item[];
export function sweetSynthesisPair(arg1: Effect, arg2: number): Item[];
export function sweetSynthesisPair(...args: unknown[]): Item[] {
  return remoteCall("sweetSynthesisPair", args, []);
}
export function sweetSynthesisPairing(arg1: Effect, arg2: Item): Item[];
export function sweetSynthesisPairing(
  arg1: Effect,
  arg2: Item,
  arg3: number
): Item[];
export function sweetSynthesisPairing(...args: unknown[]): Item[] {
  return remoteCall("sweetSynthesisPairing", args, []);
}
export function sweetSynthesisResult(item1: Item, item2: Item): Effect;
export function sweetSynthesisResult(...args: unknown[]): Effect {
  return remoteCall(
    "sweetSynthesisResult",
    args,
    makePlaceholder("Effect", "none") as Effect
  );
}
export function takeCloset(arg1: number): boolean;
export function takeCloset(arg1: Item): boolean;
export function takeCloset(arg1: Item, arg2: number): boolean;
export function takeCloset(arg1: number, arg2: Item): boolean;
export function takeCloset(...args: unknown[]): boolean {
  return remoteCall("takeCloset", args, false);
}
export function takeDisplay(arg1: Item, arg2: number): boolean;
export function takeDisplay(arg1: number, arg2: Item): boolean;
export function takeDisplay(...args: unknown[]): boolean {
  return remoteCall("takeDisplay", args, false);
}
export function takeShop(itemValue: Item): boolean;
export function takeShop(arg1: number, arg2: Item): boolean;
export function takeShop(...args: unknown[]): boolean {
  return remoteCall("takeShop", args, false);
}
export function takeStash(arg1: Item, arg2: number): boolean;
export function takeStash(arg1: number, arg2: Item): boolean;
export function takeStash(...args: unknown[]): boolean {
  return remoteCall("takeStash", args, false);
}
export function takeStorage(arg1: Item, arg2: number): boolean;
export function takeStorage(arg1: number, arg2: Item): boolean;
export function takeStorage(...args: unknown[]): boolean {
  return remoteCall("takeStorage", args, false);
}
export function tavern(): number;
export function tavern(arg: string): number;
export function tavern(...args: unknown[]): number {
  return remoteCall("tavern", args, 0);
}
export function throwItem(item: Item): string;
export function throwItem(...args: unknown[]): string {
  return remoteCall("throwItem", args, "");
}
export function throwItems(item1: Item, item2: Item): string;
export function throwItems(...args: unknown[]): string {
  return remoteCall("throwItems", args, "");
}
export function thunderCost(skill: Skill): number;
export function thunderCost(...args: unknown[]): number {
  return remoteCall("thunderCost", args, 0);
}
export function timeToString(): string;
export function timeToString(...args: unknown[]): string {
  return remoteCall("timeToString", args, "");
}
export function timestampToDate(timestamp: number, outFormat: string): string;
export function timestampToDate(...args: unknown[]): string {
  return remoteCall("timestampToDate", args, "");
}
export function toBoolean(value: string | boolean | number): boolean;
export function toBoolean(...args: unknown[]): boolean {
  return remoteCall("toBoolean", args, false);
}
export function toBounty(value: string): Bounty;
export function toBounty(...args: unknown[]): Bounty {
  return remoteCall(
    "toBounty",
    args,
    makePlaceholder("Bounty", "none") as Bounty
  );
}
export function toClass(value: string | number): Class;
export function toClass(...args: unknown[]): Class {
  return remoteCall("toClass", args, makePlaceholder("Class", "none") as Class);
}
export function toCoinmaster(value: string): Coinmaster;
export function toCoinmaster(...args: unknown[]): Coinmaster {
  return remoteCall(
    "toCoinmaster",
    args,
    makePlaceholder("Coinmaster", "none") as Coinmaster
  );
}
export function toEffect(value: string | number | Skill): Effect;
export function toEffect(...args: unknown[]): Effect {
  return remoteCall(
    "toEffect",
    args,
    makePlaceholder("Effect", "none") as Effect
  );
}
export function toElement(value: string): Element;
export function toElement(...args: unknown[]): Element {
  return remoteCall(
    "toElement",
    args,
    makePlaceholder("Element", "none") as Element
  );
}
export function toFamiliar(value: string | number): Familiar;
export function toFamiliar(...args: unknown[]): Familiar {
  return remoteCall(
    "toFamiliar",
    args,
    makePlaceholder("Familiar", "none") as Familiar
  );
}
export function toFloat(value: string | boolean | number): number;
export function toFloat(...args: unknown[]): number {
  return remoteCall("toFloat", args, 0);
}
export function toInt(
  value:
    | string
    | boolean
    | number
    | Item
    | Familiar
    | Location
    | Skill
    | Effect
    | Class
    | Monster
    | Thrall
    | Servant
    | Vykea
): number;
export function toInt(...args: unknown[]): number {
  return remoteCall("toInt", args, 0);
}
export function toItem(
  ...args: [value: string | number] | [name: string, count: number]
): Item;
export function toItem(...args: unknown[]): Item {
  return remoteCall("toItem", args, makePlaceholder("Item", "none") as Item);
}
export function toJson(val: any): string;
export function toJson(...args: unknown[]): string {
  return remoteCall("toJson", args, "");
}
export function toLocation(value: string | number): Location;
export function toLocation(...args: unknown[]): Location {
  return remoteCall(
    "toLocation",
    args,
    makePlaceholder("Location", "none") as Location
  );
}
export function toLowerCase(string: string): string;
export function toLowerCase(...args: unknown[]): string {
  return remoteCall("toLowerCase", args, "");
}
export function toMonster(value: string | number): Monster;
export function toMonster(...args: unknown[]): Monster {
  return remoteCall(
    "toMonster",
    args,
    makePlaceholder("Monster", "none") as Monster
  );
}
export function toPhylum(value: string): Phylum;
export function toPhylum(...args: unknown[]): Phylum {
  return remoteCall(
    "toPhylum",
    args,
    makePlaceholder("Phylum", "none") as Phylum
  );
}
export function toPlural(item: Item): string;
export function toPlural(...args: unknown[]): string {
  return remoteCall("toPlural", args, "");
}
export function toServant(value: string | number): Servant;
export function toServant(...args: unknown[]): Servant {
  return remoteCall(
    "toServant",
    args,
    makePlaceholder("Servant", "none") as Servant
  );
}
export function toSkill(
  ...args: [value: string | number | Effect] | [value1: string, value2: string]
): Skill;
export function toSkill(...args: unknown[]): Skill {
  return remoteCall("toSkill", args, makePlaceholder("Skill", "none") as Skill);
}
export function toSlot(item: string | Item): Slot;
export function toSlot(...args: unknown[]): Slot {
  return remoteCall("toSlot", args, makePlaceholder("Slot", "none") as Slot);
}
export function toStat(value: string): Stat;
export function toStat(...args: unknown[]): Stat {
  return remoteCall("toStat", args, makePlaceholder("Stat", "none") as Stat);
}
export function toString(
  ...args: [val: string] | [val: number, fmt: string]
): string;
export function toString(...args: unknown[]): string {
  return remoteCall("toString", args, "");
}
export function toThrall(value: string | number): Thrall;
export function toThrall(...args: unknown[]): Thrall {
  return remoteCall(
    "toThrall",
    args,
    makePlaceholder("Thrall", "none") as Thrall
  );
}
export function toUpperCase(string: string): string;
export function toUpperCase(...args: unknown[]): string {
  return remoteCall("toUpperCase", args, "");
}
export function toUrl(value: Location): string;
export function toUrl(...args: unknown[]): string {
  return remoteCall("toUrl", args, "");
}
export function toVykea(value: string): Vykea;
export function toVykea(...args: unknown[]): Vykea {
  return remoteCall("toVykea", args, makePlaceholder("Vykea", "none") as Vykea);
}
export function todayToString(): string;
export function todayToString(...args: unknown[]): string {
  return remoteCall("todayToString", args, "");
}
export function totalFreeRests(): number;
export function totalFreeRests(...args: unknown[]): number {
  return remoteCall("totalFreeRests", args, 0);
}
export function totalTurnsPlayed(): number;
export function totalTurnsPlayed(...args: unknown[]): number {
  return remoteCall("totalTurnsPlayed", args, 0);
}
export function towerDoor(): boolean;
export function towerDoor(...args: unknown[]): boolean {
  return remoteCall("towerDoor", args, false);
}
export function traceprint(string: string): void;
export function traceprint(...args: unknown[]): void {
  return remoteCall("traceprint", args);
}
export function truncate(arg: number): number;
export function truncate(...args: unknown[]): number {
  return remoteCall("truncate", args, 0);
}
export function turnsPerCast(skill: Skill): number;
export function turnsPerCast(...args: unknown[]): number {
  return remoteCall("turnsPerCast", args, 0);
}
export function turnsPlayed(): number;
export function turnsPlayed(...args: unknown[]): number {
  return remoteCall("turnsPlayed", args, 0);
}
export function twiddle(): string;
export function twiddle(...args: unknown[]): string {
  return remoteCall("twiddle", args, "");
}
export function unusualConstructDisc(): Item;
export function unusualConstructDisc(...args: unknown[]): Item {
  return remoteCall(
    "unusualConstructDisc",
    args,
    makePlaceholder("Item", "none") as Item
  );
}
export function updateCandyPrices(): void;
export function updateCandyPrices(...args: unknown[]): void {
  return remoteCall("updateCandyPrices", args);
}
export function urlDecode(arg: string): string;
export function urlDecode(...args: unknown[]): string {
  return remoteCall("urlDecode", args, "");
}
export function urlEncode(arg: string): string;
export function urlEncode(...args: unknown[]): string {
  return remoteCall("urlEncode", args, "");
}
export function use(item: Item): boolean;
export function use(arg1: Item, arg2: number): boolean;
export function use(arg1: number, arg2: Item): boolean;
export function use(...args: unknown[]): boolean {
  return remoteCall("use", args, false);
}
export function useFamiliar(familiar: Familiar): boolean;
export function useFamiliar(...args: unknown[]): boolean {
  return remoteCall("useFamiliar", args, false);
}
export function useServant(servant: Servant): boolean;
export function useServant(...args: unknown[]): boolean {
  return remoteCall("useServant", args, false);
}
export function useSkill(arg1: Skill, arg2: number): boolean;
export function useSkill(arg1: number, arg2: Skill): boolean;
export function useSkill(arg1: Skill, arg2: number, target: string): boolean;
export function useSkill(arg1: number, arg2: Skill, target: string): boolean;
export function useSkill(skill: Skill): string;
export function useSkill(...args: unknown[]): boolean | string {
  return remoteCall("useSkill", args, args.length === 1 ? "" : false);
}
export function useRConfirm(message: string): boolean;
export function useRConfirm(
  message: string,
  timeOut: number,
  defaultBoolean: boolean
): boolean;
export function useRConfirm(...args: unknown[]): boolean {
  return remoteCall("useRConfirm", args, false);
}
export function useRPrompt(message: string): string;
export function useRPrompt(message: string, options: any): string;
export function useRPrompt(
  message: string,
  timeOut: number,
  defaultString: string
): string;
export function useRPrompt(...args: unknown[]): string {
  return remoteCall("useRPrompt", args, "");
}
export function visit(master: Coinmaster): boolean;
export function visit(...args: unknown[]): boolean {
  return remoteCall("visit", args, false);
}
export function visitUrl(): string;
export function visitUrl(string: string): string;
export function visitUrl(string: string, usePostMethod: boolean): string;
export function visitUrl(
  string: string,
  usePostMethod: boolean,
  encoded: boolean
): string;
export function visitUrl(...args: unknown[]): string {
  return remoteCall("visitUrl", args, "");
}
export function votingBoothInitiatives(
  clss: Class,
  path: number,
  daycount: number
): { [key: string]: boolean };
export function votingBoothInitiatives(
  clss: number,
  path: number,
  daycount: number
): { [key: string]: boolean };
export function votingBoothInitiatives(...args: unknown[]): {
  [key: string]: boolean;
} {
  return remoteCall("votingBoothInitiatives", args, {});
}
export function wait(delay: number): void;
export function wait(...args: unknown[]): void {
  return remoteCall("wait", args);
}
export function waitq(delay: number): void;
export function waitq(...args: unknown[]): void {
  return remoteCall("waitq", args);
}
export function weaponHands(item: Item): number;
export function weaponHands(...args: unknown[]): number {
  return remoteCall("weaponHands", args, 0);
}
export function weaponType(item: Item): Stat;
export function weaponType(...args: unknown[]): Stat {
  return remoteCall(
    "weaponType",
    args,
    makePlaceholder("Stat", "none") as Stat
  );
}
export function weightAdjustment(): number;
export function weightAdjustment(...args: unknown[]): number {
  return remoteCall("weightAdjustment", args, 0);
}
export function whiteCitadelAvailable(): boolean;
export function whiteCitadelAvailable(...args: unknown[]): boolean {
  return remoteCall("whiteCitadelAvailable", args, false);
}
export function whoClan(): { [key: string]: boolean };
export function whoClan(...args: unknown[]): { [key: string]: boolean } {
  return remoteCall("whoClan", args, {});
}
export function willUsuallyDodge(): boolean;
export function willUsuallyDodge(...args: unknown[]): boolean {
  return remoteCall("willUsuallyDodge", args, false);
}
export function willUsuallyMiss(): boolean;
export function willUsuallyMiss(...args: unknown[]): boolean {
  return remoteCall("willUsuallyMiss", args, false);
}
export function write(string: string): void;
export function write(...args: unknown[]): void {
  return remoteCall("write", args);
}
export function writeln(string: string): void;
export function writeln(...args: unknown[]): void {
  return remoteCall("writeln", args);
}
export function xpath(html: string, xpath: string): string[];
export function xpath(...args: unknown[]): string[] {
  return remoteCall("xpath", args, []);
}
