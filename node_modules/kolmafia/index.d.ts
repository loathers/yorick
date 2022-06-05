export function abort(string: string): never;
export function abort(): never;
export function addItemCondition(arg1: number, arg2: Item): void;
export function addItemCondition(arg1: Item, arg2: number): void;
export function adv1(locationValue: Location, adventuresUsedValue: number, filterFunction: string | ((round: number, monster: Monster, text: string) => string)): boolean;
export function adv1(locationValue: Location, adventuresUsedValue: number): boolean;
export function adv1(locationValue: Location): boolean;
export function advCost(skill: Skill): number;
export function adventure(arg1: Location, arg2: number): boolean;
export function adventure(arg1: Location, arg2: number, filterFunction: string | ((round: number, monster: Monster, text: string) => string)): boolean;
export function adventure(arg1: number, arg2: Location): boolean;
export function adventure(arg1: number, arg2: Location, filterFunction: string | ((round: number, monster: Monster, text: string) => string)): boolean;
export function allMonstersWithId(): { [monster: string]: boolean };
export function allNormalOutfits(): string[];
export function appearanceRates(location: Location): { [monster: string]: number };
export function appearanceRates(location: Location, includeQueue: boolean): { [monster: string]: number };
export function append(buffer: string, s: string): string;
export function attack(): string;
export function autosell(arg1: Item, arg2: number): boolean;
export function autosell(arg1: number, arg2: Item): boolean;
export function autosellPrice(item: Item): number;
export function availableAmount(arg: Item): number;
export function availableChoiceOptions(): { [key: number]: string };
export function availableChoiceOptions(spoilers: boolean): { [key: number]: string };
export function availableChoiceSelectInputs(decision: number): { [key: string]: { [key: string]: string } };
export function availableChoiceTextInputs(decision: number): { [key: string]: string };
export function availablePocket(arg: Monster): number;
export function availablePocket(arg: Effect): number;
export function availablePocket(arg: Item): number;
export function availablePocket(arg: Stat): number;
export function batchClose(): boolean;
export function batchOpen(): void;
export function bjornifyFamiliar(familiar: Familiar): boolean;
export function blackMarketAvailable(): boolean;
export function booleanModifier(modifier: string): boolean;
export function booleanModifier(arg: string, modifier: string): boolean;
export function booleanModifier(arg: Item, modifier: string): boolean;
export function booleanModifier(arg: Effect, modifier: string): boolean;
export function buffedHitStat(): number;
export function bufferToFile(var1: string, var2: string): boolean;
export function buy(item: Item): boolean;
export function buy(item: Item, quantity: number): boolean;
export function buy(item: Item, quantity: number, price: number): number;
export function buy(quantity: number, item: Item): boolean;
export function buy(quantity: number, item: Item, price: number): number;
export function buy(coinmaster: Coinmaster, quantity: number, item: Item): boolean;
export function buyPrice(master: Coinmaster, item: Item): number;
export function buyUsingStorage(item: Item): boolean;
export function buyUsingStorage(item: Item, quantity: number): boolean;
export function buyUsingStorage(item: Item, quantity: number, price: number): number;
export function buyUsingStorage(quantity: number, item: Item): boolean;
export function buyUsingStorage(quantity: number, item: Item, price: number): number;
export function buysItem(master: Coinmaster, item: Item): boolean;
export function canDrink(): boolean;
export function canEat(): boolean;
export function canEquip(itemOrFamiliar: Item): boolean;
export function canEquip(familiar: Familiar): boolean;
export function canEquip(familiar: Familiar, item: Item): boolean;
export function canFaxbot(arg: Monster): boolean;
export function canInteract(): boolean;
export function canStillSteal(): boolean;
export function canadiaAvailable(): boolean;
export function candyForTier(arg: number): Item[];
export function candyForTier(arg1: number, arg2: number): Item[];
export function ceil(arg: number): number;
export function changeMcd(level: number): boolean;
export function charAt(source: string, index: number): string;
export function chatClan(messageValue: string): void;
export function chatClan(messageValue: string, recipientValue: string): void;
export function chatMacro(macroValue: string): void;
export function chatNotify(messageValue: string, colorValue: string): void;
export function chatPrivate(recipientValue: string, messageValue: string): void;
export function chew(item: Item): boolean;
export function chew(arg1: Item, arg2: number): boolean;
export function chew(arg1: number, arg2: Item): boolean;
export function choiceFollowsFight(): boolean;
export function classModifier(arg: string, modifier: string): Class;
export function classModifier(arg: Item, modifier: string): Class;
export function clear(arg: any): void;
export function clearBoozeHelper(): void;
export function clearFoodHelper(): void;
export function cliExecute(string: string): boolean;
export function cliExecuteOutput(string: string): string;
export function closetAmount(arg: Item): number;
export function combatManaCostModifier(): number;
export function combatRateModifier(): number;
export function combatSkillAvailable(arg: Skill): boolean;
export function containsText(source: string, search: string): boolean;
export function council(): void;
export function count(arg: any): number;
export function craft(modeValue: string, countValue: number, item1: Item, item2: Item): number;
export function craftType(arg: Item): string;
export function creatableAmount(arg: Item): number;
export function creatableTurns(itemId: Item): number;
export function creatableTurns(itemId: Item, count: number): number;
export function creatableTurns(itemId: Item, count: number, freeCrafting: boolean): number;
export function create(item: Item): boolean;
export function create(arg1: Item, arg2: number): boolean;
export function create(arg1: number, arg2: Item): boolean;
export function currentHitStat(): Stat;
export function currentMcd(): number;
export function currentPvpStances(): { [key: string]: number };
export function currentRadSickness(): number;
export function currentRound(): number;
export function dadSeaMonkeeWeakness(arg: number): Element;
export function dailySpecial(): Item;
export function damageAbsorptionPercent(): number;
export function damageReduction(): number;
export function dateToTimestamp(inFormat: string, dateTimeString: string): number;
export function debugprint(string: string): void;
export function descToEffect(value: string): Effect;
export function descToItem(value: string): Item;
export function disable(name: string): void;
export function dispensaryAvailable(): boolean;
export function displayAmount(arg: Item): number;
export function drink(item: Item): boolean;
export function drink(arg1: Item, arg2: number): boolean;
export function drink(arg1: number, arg2: Item): boolean;
export function drinksilent(item: Item): boolean;
export function drinksilent(arg1: Item, arg2: number): boolean;
export function drinksilent(arg1: number, arg2: Item): boolean;
export function dump(arg: any): void;
export function dump(arg: any, color: string): void;
export function eat(item: Item): boolean;
export function eat(arg1: Item, arg2: number): boolean;
export function eat(arg1: number, arg2: Item): boolean;
export function eatsilent(item: Item): boolean;
export function eatsilent(arg1: Item, arg2: number): boolean;
export function eatsilent(arg1: number, arg2: Item): boolean;
export function effectModifier(arg: string, modifier: string): Effect;
export function effectModifier(arg: Item, modifier: string): Effect;
export function effectPockets(): { [key: number]: boolean };
export function elementalResistance(arg: Element): number;
export function elementalResistance(): number;
export function elementalResistance(arg: Monster): number;
export function emptyCloset(): boolean;
export function enable(name: string): void;
export function endsWith(source: string, suffix: string): boolean;
export function enthroneFamiliar(familiar: Familiar): boolean;
export function entityDecode(arg: string): string;
export function entityEncode(arg: string): string;
export function equip(item: Item): boolean;
export function equip(arg1: Item, arg2: Slot): boolean;
export function equip(arg1: Slot, arg2: Item): boolean;
export function equip(arg1: Item, arg2: Familiar): boolean;
export function equip(arg1: Familiar, arg2: Item): boolean;
export function equipAllFamiliars(): boolean;
export function equippedAmount(arg: Item): number;
export function equippedItem(slot: Slot): Item;
export function eudora(): string;
export function eudora(newEudora: string): boolean;
export function eudoraItem(): Item;
export function everyCardName(name: string): string;
export function expectedColdMedicineCabinet(): { [key: string]: Item };
export function expectedDamage(): number;
export function expectedDamage(arg: Monster): number;
export function experienceBonus(): number;
export function expressionEval(expr: string): number;
export function extractItems(string: string): { [item: string]: number };
export function extractMeat(string: string): number;
export function familiarEquipment(familiar: Familiar): Item;
export function familiarEquippedEquipment(familiar: Familiar): Item;
export function familiarWeight(familiar: Familiar): number;
export function favoriteFamiliars(): { [familiar: string]: boolean };
export function faxbot(monsterName: Monster): boolean;
export function faxbot(monsterName: Monster, botName: string): boolean;
export function fightFollowsChoice(): boolean;
export function fileToArray(var1: string): { [key: number]: string };
export function fileToBuffer(var1: string): string;
export function fileToMap(var1: string, var2: any): boolean;
export function fileToMap(var1: string, var2: any, var3: boolean): boolean;
export function floor(arg: number): number;
export function floristAvailable(): boolean;
export function flushMonsterManuelCache(): boolean;
export function formField(key: string): string;
export function formFields(): { [key: string]: string };
export function formatDateTime(inFormat: string, dateTimeString: string, outFormat: string): string;
export function friarsAvailable(): boolean;
export function fuelCost(skill: Skill): number;
export function fullnessLimit(): number;
export function gamedayToInt(): number;
export function gamedayToString(): string;
export function gametimeToInt(): number;
export function getAllProperties(filterValue: string, globalValue: boolean): { [key: string]: boolean };
export function getAutoAttack(): number;
export function getCampground(): { [item: string]: number };
export function getCcsAction(index: number): string;
export function getChateau(): { [item: string]: number };
export function getClanId(): number;
export function getClanLounge(): { [item: string]: number };
export function getClanName(): string;
export function getClanRumpus(): { [key: string]: number };
export function getCloset(): { [item: string]: number };
export function getCounter(label: string): number;
export function getCounters(label: string, min: number, max: number): string;
export function getCustomOutfits(): string[];
export function getDisplay(): { [item: string]: number };
export function getDwelling(): Item;
export function getFishingLocations(): { [key: string]: Location };
export function getFloristPlants(): { [location: string]: string[] };
export function getFreePulls(): { [item: string]: number };
export function getFuel(): number;
export function getGoals(): string[];
export function getIgnoreZoneWarnings(): boolean;
export function getIngredients(arg: Item): { [item: string]: number };
export function getInventory(): { [item: string]: number };
export function getLocationMonsters(location: Location): { [monster: string]: boolean };
export function getLocketMonsters(): { [monster: string]: boolean };
export function getMonsterMapping(): { [monster: string]: Monster };
export function getMonsterMapping(path: string): { [monster: string]: Monster };
export function getMonsters(location: Location): Monster[];
export function getMoods(): string[];
export function getOutfits(): string[];
export function getPath(): string;
export function getPathFull(): string;
export function getPathVariables(): string;
export function getPermedSkills(): { [skill: string]: boolean };
export function getPlayerId(playerNameValue: string): string;
export function getPlayerName(playerIdValue: number): string;
export function getPower(item: Item): number;
export function getProperty(name: string): string;
export function getProperty(name: string, globalValue: boolean): string;
export function getRelated(item: Item, type: string): { [item: string]: number };
export function getRevision(): number;
export function getShop(): { [item: string]: number };
export function getShopLog(): string[];
export function getStackTrace(): { file: string; name: string; line: number; }[];
export function getStash(): { [item: string]: number };
export function getStorage(): { [item: string]: number };
export function getVersion(): string;
export function getWorkshed(): Item;
export function getZapWand(): Item;
export function gitAtHead(project: string): boolean;
export function gitExists(project: string): boolean;
export function gitInfo(script: string): { url: string; branch: string; commit: string; last_changed_author: string; last_changed_date: string; };
export function gitList(): string[];
export function gnomadsAvailable(): boolean;
export function goalExists(check: string): boolean;
export function groupString(string: string, regex: string): { [key: number]: { [key: number]: string } };
export function guildAvailable(): boolean;
export function guildStoreAvailable(): boolean;
export function handlingChoice(): boolean;
export function haveBartender(): boolean;
export function haveChef(): boolean;
export function haveDisplay(): boolean;
export function haveEffect(arg: Effect): number;
export function haveEquipped(item: Item): boolean;
export function haveFamiliar(familiar: Familiar): boolean;
export function haveMushroomPlot(): boolean;
export function haveOutfit(outfit: string): boolean;
export function haveServant(servant: Servant): boolean;
export function haveShop(): boolean;
export function haveSkill(arg: Skill): boolean;
export function hedgeMaze(arg: string): boolean;
export function heist(item: Item): boolean;
export function heist(num: number, item: Item): boolean;
export function heistTargets(): { [monster: string]: { [key: number]: Item } };
export function hermit(arg1: Item, arg2: number): boolean;
export function hermit(arg1: number, arg2: Item): boolean;
export function hiddenTempleUnlocked(): boolean;
export function hippyStoneBroken(): boolean;
export function hippyStoreAvailable(): boolean;
export function historicalAge(item: Item): number;
export function historicalPrice(item: Item): number;
export function holiday(): string;
export function hpCost(skill: Skill): number;
export function imageToMonster(value: string): Monster;
export function inBadMoon(): boolean;
export function inCasual(): boolean;
export function inHardcore(): boolean;
export function inMoxieSign(): boolean;
export function inMultiFight(): boolean;
export function inMuscleSign(): boolean;
export function inMysticalitySign(): boolean;
export function inaccessibleReason(master: Coinmaster): string;
export function indexOf(source: string, search: string): number;
export function indexOf(source: string, search: string, start: number): number;
export function inebrietyLimit(): number;
export function initiativeModifier(): number;
export function insert(buffer: string, index: number, s: string): string;
export function isAccessible(master: Coinmaster): boolean;
export function isBanished(arg: Monster): boolean;
export function isCoinmasterItem(item: Item): boolean;
export function isDarkMode(): boolean;
export function isDiscardable(item: Item): boolean;
export function isDisplayable(item: Item): boolean;
export function isFamiliarEquipmentLocked(): boolean;
export function isGiftable(item: Item): boolean;
export function isGoal(item: Item): boolean;
export function isHeadless(): boolean;
export function isInteger(string: string): boolean;
export function isNpcItem(item: Item): boolean;
export function isOnline(arg: string): boolean;
export function isTradeable(item: Item): boolean;
export function isTrendy(thing: Item): boolean;
export function isTrendy(thing: Skill): boolean;
export function isTrendy(thing: Familiar): boolean;
export function isTrendy(thing: string): boolean;
export function isUnrestricted(thing: Item): boolean;
export function isUnrestricted(thing: Skill): boolean;
export function isUnrestricted(thing: Familiar): boolean;
export function isUnrestricted(thing: string): boolean;
export function isWearingOutfit(outfit: string): boolean;
export function itemAmount(arg: Item): number;
export function itemDropModifier(): number;
export function itemDrops(): { [item: string]: number };
export function itemDrops(arg: Monster): { [item: string]: number };
export function itemDropsArray(): { drop: Item; rate: number; type: string; }[];
export function itemDropsArray(arg: Monster): { drop: Item; rate: number; type: string; }[];
export function itemPockets(): { [key: number]: boolean };
export function itemType(item: Item): string;
export function jokePockets(): { [key: number]: boolean };
export function jumpChance(): number;
export function jumpChance(arg: Monster): number;
export function jumpChance(arg: Monster, init: number): number;
export function jumpChance(arg: Monster, init: number, ml: number): number;
export function jumpChance(arg: Location): number;
export function jumpChance(arg: Location, init: number): number;
export function jumpChance(arg: Location, init: number, ml: number): number;
export function knollAvailable(): boolean;
export function lastChoice(): number;
export function lastDecision(): number;
export function lastIndexOf(source: string, search: string): number;
export function lastIndexOf(source: string, search: string, start: number): number;
export function lastItemMessage(): string;
export function lastMonster(): Monster;
export function lastSkillMessage(): string;
export function leetify(string: string): string;
export function length(string: string): number;
export function lightningCost(skill: Skill): number;
export function limitMode(): string;
export function loadHtml(string: string): string;
export function locationAccessible(arg: Location): boolean;
export function lockFamiliarEquipment(lock: boolean): void;
export function logN(arg: number): number;
export function logN(arg: number, base: number): number;
export function logprint(string: string): void;
export function makeUrl(arg1: string, arg2: boolean, arg3: boolean): string;
export function mallPrice(item: Item): number;
export function mallPrice(item: Item, maxAge: number): number;
export function mallPrices(arg: { [key: number]: boolean }): number;
export function mallPrices(arg: string): number;
export function mallPrices(category: string, tiers: string): number;
export function manaCostModifier(): number;
export function mapToFile(var1: any, var2: string): boolean;
export function mapToFile(var1: any, var2: string, var3: boolean): boolean;
export function max(arg1: number, arg2: number[]): number;
export function max(arg1: number, arg2: number[]): number;
export function maximize(maximizerStringValue: string, isSpeculateOnlyValue: boolean): boolean;
export function maximize(maximizerStringValue: string, maxPriceValue: number, priceLevelValue: number, isSpeculateOnlyValue: boolean): boolean;
export function maximize(maximizerStringValue: string, maxPriceValue: number, priceLevelValue: number, isSpeculateOnlyValue: boolean, showEquipment: boolean): { display: string; command: string; score: number; effect: Effect; item: Item; skill: Skill; }[];
export function meatDrop(): number;
export function meatDrop(arg: Monster): number;
export function meatDropModifier(): number;
export function meatPockets(): { [key: number]: number };
export function min(arg1: number, arg2: number[]): number;
export function min(arg1: number, arg2: number[]): number;
export function minstrelInstrument(): Item;
export function minstrelLevel(): number;
export function minstrelQuest(): boolean;
export function modifierEval(expr: string): number;
export function monsterAttack(): number;
export function monsterAttack(arg: Monster): number;
export function monsterDefense(): number;
export function monsterDefense(arg: Monster): number;
export function monsterElement(): Element;
export function monsterElement(arg: Monster): Element;
export function monsterEval(expr: string): number;
export function monsterFactoidsAvailable(arg1: Monster, arg2: boolean): number;
export function monsterHp(): number;
export function monsterHp(arg: Monster): number;
export function monsterInitiative(): number;
export function monsterInitiative(arg: Monster): number;
export function monsterLevelAdjustment(): number;
export function monsterManuelText(arg: Monster): string;
export function monsterModifier(arg: Effect, modifier: string): Monster;
export function monsterPhylum(): Phylum;
export function monsterPhylum(arg: Monster): Phylum;
export function monsterPockets(): { [key: number]: boolean };
export function moodExecute(multiplicity: number): void;
export function moodList(): string[];
export function moonLight(): number;
export function moonPhase(): number;
export function mpCost(skill: Skill): number;
export function myAbsorbs(): number;
export function myAdventures(): number;
export function myAscensions(): number;
export function myAudience(): number;
export function myBasestat(arg: Stat): number;
export function myBjornedFamiliar(): Familiar;
export function myBuffedstat(arg: Stat): number;
export function myClass(): Class;
export function myClosetMeat(): number;
export function myCompanion(): string;
export function myDaycount(): number;
export function myDiscomomentum(): number;
export function myEffectiveFamiliar(): Familiar;
export function myEffects(): { [effect: string]: number };
export function myEnthronedFamiliar(): Familiar;
export function myFamiliar(): Familiar;
export function myFullness(): number;
export function myFury(): number;
export function myGardenType(): string;
export function myHash(): string;
export function myHp(): number;
export function myId(): string;
export function myInebriety(): number;
export function myLevel(): number;
export function myLightning(): number;
export function myLocation(): Location;
export function myMask(): string;
export function myMaxfury(): number;
export function myMaxhp(): number;
export function myMaxmp(): number;
export function myMaxpp(): number;
export function myMeat(): number;
export function myMp(): number;
export function myName(): string;
export function myPath(): string;
export function myPathId(): number;
export function myPokeFam(arg: number): Familiar;
export function myPp(): number;
export function myPrimestat(): Stat;
export function myRain(): number;
export function myRobotEnergy(): number;
export function myRobotScraps(): number;
export function myServant(): Servant;
export function mySessionAdv(): number;
export function mySessionItems(): { [item: string]: number };
export function mySessionItems(item: Item): number;
export function mySessionMeat(): number;
export function mySessionResults(): { [key: string]: number };
export function mySign(): string;
export function mySoulsauce(): number;
export function mySpleenUse(): number;
export function myStorageMeat(): number;
export function myThrall(): Thrall;
export function myThunder(): number;
export function myTurncount(): number;
export function myVykeaCompanion(): Vykea;
export function myWildfireWater(): number;
export function nowToInt(): number;
export function nowToString(dateFormatValue: string): string;
export function npcPrice(item: Item): number;
export function numberologyPrize(num: number): string;
export function numericModifier(modifier: string): number;
export function numericModifier(arg: string, modifier: string): number;
export function numericModifier(arg: Item, modifier: string): number;
export function numericModifier(arg: Effect, modifier: string): number;
export function numericModifier(arg: Skill, modifier: string): number;
export function numericModifier(familiar: Familiar, modifier: string, weight: number, item: Item): number;
export function outfit(outfit: string): boolean;
export function outfitPieces(outfit: string): Item[];
export function outfitTattoo(outfit: string): string;
export function outfitTreats(outfit: string): { [item: string]: number };
export function overdrink(item: Item): boolean;
export function overdrink(arg1: Item, arg2: number): boolean;
export function overdrink(arg1: number, arg2: Item): boolean;
export function pathIdToName(value: number): string;
export function pathNameToId(value: string): number;
export function pickPocket(arg: Monster): boolean;
export function pickPocket(arg: Effect): { [effect: string]: number };
export function pickPocket(arg: Item): { [item: string]: number };
export function pickPocket(arg: Stat): { [stat: string]: number };
export function pickPocket(arg: number): boolean;
export function pickedPockets(): { [key: number]: boolean };
export function pickedScraps(): { [key: number]: boolean };
export function pocketEffects(pocket: number): { [effect: string]: number };
export function pocketItems(pocket: number): { [item: string]: number };
export function pocketJoke(pocket: number): string;
export function pocketMeat(pocket: number): { [key: number]: string };
export function pocketMonster(pocket: number): Monster;
export function pocketPoem(pocket: number): { [key: number]: string };
export function pocketScrap(pocket: number): { [key: number]: string };
export function pocketStats(pocket: number): { [stat: string]: number };
export function poemPockets(): { [key: number]: number };
export function potentialPockets(arg: Monster): { [key: number]: number };
export function potentialPockets(arg: Effect): { [key: number]: number };
export function potentialPockets(arg: Item): { [key: number]: number };
export function potentialPockets(arg: Stat): { [key: number]: number };
export function print(): void;
export function print(string: string): void;
export function print(string: string, color: string): void;
export function printHtml(string: string): void;
export function propertyDefaultValue(nameValue: string): string;
export function propertyExists(nameValue: string): boolean;
export function propertyExists(nameValue: string, globalValue: boolean): boolean;
export function propertyHasDefault(nameValue: string): boolean;
export function pullsRemaining(): number;
export function putCloset(arg1: number): boolean;
export function putCloset(arg1: Item): boolean;
export function putCloset(arg1: Item, arg2: number): boolean;
export function putCloset(arg1: number, arg2: Item): boolean;
export function putDisplay(arg1: number, arg2: Item): boolean;
export function putDisplay(arg1: Item, arg2: number): boolean;
export function putShop(priceValue: number, limitValue: number, itemValue: Item): boolean;
export function putShop(priceValue: number, limitValue: number, qtyValue: number, itemValue: Item): boolean;
export function putShopUsingStorage(priceValue: number, limitValue: number, itemValue: Item): boolean;
export function putShopUsingStorage(priceValue: number, limitValue: number, qtyValue: number, itemValue: Item): boolean;
export function putStash(arg1: Item, arg2: number): boolean;
export function putStash(arg1: number, arg2: Item): boolean;
export function pvpAttacksLeft(): number;
export function rainCost(skill: Skill): number;
export function random(arg: number): number;
export function rawDamageAbsorption(): number;
export function readCcs(name: string): string;
export function receiveFax(): void;
export function refreshShop(): boolean;
export function refreshStash(): boolean;
export function refreshStatus(): boolean;
export function removeItemCondition(arg1: number, arg2: Item): void;
export function removeItemCondition(arg1: Item, arg2: number): void;
export function removeProperty(nameValue: string): string;
export function removeProperty(nameValue: string, globalValue: boolean): string;
export function renameProperty(oldNameValue: string, newNameValue: string): boolean;
export function replace(buffer: string, start: number, finish: number, s: string): string;
export function replaceString(source: string, searchValue: string, replaceValue: string): string;
export function replaceString(source: string, searchValue: string, replaceValue: string): string;
export function repriceShop(priceValue: number, itemValue: Item): boolean;
export function repriceShop(priceValue: number, limitValue: number, itemValue: Item): boolean;
export function restorationPockets(): { [key: number]: boolean };
export function restoreHp(amount: number): boolean;
export function restoreMp(amount: number): boolean;
export function retrieveItem(item: Item): boolean;
export function retrieveItem(arg1: Item, arg2: number): boolean;
export function retrieveItem(arg1: number, arg2: Item): boolean;
export function retrievePrice(item: Item): number;
export function retrievePrice(arg1: Item, arg2: number): number;
export function retrievePrice(arg1: number, arg2: Item): number;
export function retrievePrice(arg1: Item, arg2: number, arg3: boolean): number;
export function retrievePrice(arg1: number, arg2: Item, arg3: boolean): number;
export function reverseNumberology(): { [key: number]: number };
export function reverseNumberology(advDelta: number, spleenDelta: number): { [key: number]: number };
export function rollover(): number;
export function round(arg: number): number;
export function runChoice(decision: number): string;
export function runChoice(decision: number, extra: string): string;
export function runChoice(decision: number, extra: boolean): string;
export function runChoice(decision: number, custom: boolean, more: string): string;
export function runCombat(): string;
export function runCombat(filterFunction: string | ((round: number, monster: Monster, text: string) => string)): string;
export function runTurn(): string;
export function runaway(): string;
export function scrapPockets(): { [key: number]: number };
export function sell(master: Coinmaster, countValue: number, itemValue: Item): boolean;
export function sellPrice(master: Coinmaster, item: Item): number;
export function sellsItem(master: Coinmaster, item: Item): boolean;
export function sendFax(): void;
export function sessionLogs(dayCount: number): string[];
export function sessionLogs(player: string, dayCount: number): string[];
export function sessionLogs(playerName: string, baseDate: string, count: number): string[];
export function setAutoAttack(attackValue: number): void;
export function setAutoAttack(attackValue: string): void;
export function setLength(buffer: string, i: number): void;
export function setLocation(location: Location): void;
export function setProperty(nameValue: string, value: string): void;
export function shopAmount(arg: Item): number;
export function shopLimit(arg: Item): number;
export function shopPrice(item: Item): number;
export function skillModifier(arg: string, modifier: string): Skill;
export function skillModifier(arg: Item, modifier: string): Skill;
export function slashCount(arg: Item): number;
export function soulsauceCost(skill: Skill): number;
export function spleenLimit(): number;
export function splitString(string: string): string[];
export function splitString(string: string, regex: string): string[];
export function squareRoot(val: number): number;
export function startsWith(source: string, prefix: string): boolean;
export function stashAmount(arg: Item): number;
export function statBonusToday(): Stat;
export function statBonusTomorrow(): Stat;
export function statModifier(arg: Effect, modifier: string): Stat;
export function statsPockets(): { [key: number]: boolean };
export function steal(): string;
export function stillsAvailable(): number;
export function stopCounter(label: string): void;
export function storageAmount(arg: Item): number;
export function stringModifier(modifier: string): string;
export function stringModifier(arg: string, modifier: string): string;
export function stringModifier(arg: Item, modifier: string): string;
export function stringModifier(arg: Effect, modifier: string): string;
export function stunSkill(): Skill;
export function substring(source: string, start: number): string;
export function substring(source: string, start: number, finish: number): string;
export function svnAtHead(project: string): boolean;
export function svnExists(project: string): boolean;
export function svnInfo(script: string): { url: string; revision: number; last_changed_author: string; last_changed_rev: number; last_changed_date: string; };
export function svnList(): string[];
export function sweetSynthesis(effect: Effect): boolean;
export function sweetSynthesis(arg1: number, arg2: Effect): boolean;
export function sweetSynthesis(arg1: Effect, arg2: number): boolean;
export function sweetSynthesis(arg1: number, arg2: Effect, arg3: number): boolean;
export function sweetSynthesis(arg1: Item, arg2: Item): boolean;
export function sweetSynthesis(arg1: number, arg2: Item, arg3: Item): boolean;
export function sweetSynthesisPair(arg1: Effect): Item[];
export function sweetSynthesisPair(arg1: Effect, arg2: number): Item[];
export function sweetSynthesisPairing(arg1: Effect, arg2: Item): Item[];
export function sweetSynthesisPairing(arg1: Effect, arg2: Item, arg3: number): Item[];
export function sweetSynthesisResult(item1: Item, item2: Item): Effect;
export function takeCloset(arg1: number): boolean;
export function takeCloset(arg1: Item): boolean;
export function takeCloset(arg1: Item, arg2: number): boolean;
export function takeCloset(arg1: number, arg2: Item): boolean;
export function takeDisplay(arg1: Item, arg2: number): boolean;
export function takeDisplay(arg1: number, arg2: Item): boolean;
export function takeShop(itemValue: Item): boolean;
export function takeShop(arg1: number, arg2: Item): boolean;
export function takeStash(arg1: Item, arg2: number): boolean;
export function takeStash(arg1: number, arg2: Item): boolean;
export function takeStorage(arg1: Item, arg2: number): boolean;
export function takeStorage(arg1: number, arg2: Item): boolean;
export function tavern(): number;
export function tavern(arg: string): number;
export function throwItem(item: Item): string;
export function throwItems(item1: Item, item2: Item): string;
export function thunderCost(skill: Skill): number;
export function timeToString(): string;
export function timestampToDate(timestamp: number, outFormat: string): string;
export function toBoolean(value: string): boolean;
export function toBoolean(value: boolean): boolean;
export function toBoolean(value: number): boolean;
export function toBounty(value: string): Bounty;
export function toClass(value: string): Class;
export function toClass(value: number): Class;
export function toCoinmaster(value: string): Coinmaster;
export function toEffect(value: string): Effect;
export function toEffect(value: number): Effect;
export function toEffect(value: Skill): Effect;
export function toElement(value: string): Element;
export function toFamiliar(value: string): Familiar;
export function toFamiliar(value: number): Familiar;
export function toFloat(value: string): number;
export function toFloat(value: boolean): number;
export function toFloat(value: number): number;
export function toFloat(value: number): number;
export function toInt(value: string): number;
export function toInt(value: boolean): number;
export function toInt(value: number): number;
export function toInt(value: number): number;
export function toInt(value: Item): number;
export function toInt(value: Familiar): number;
export function toInt(value: Location): number;
export function toInt(value: Skill): number;
export function toInt(value: Effect): number;
export function toInt(value: Class): number;
export function toInt(value: Monster): number;
export function toInt(value: Thrall): number;
export function toInt(value: Servant): number;
export function toInt(value: Vykea): number;
export function toItem(value: string): Item;
export function toItem(value: number): Item;
export function toItem(name: string, count: number): Item;
export function toJson(val: any): string;
export function toLocation(value: string): Location;
export function toLocation(value: number): Location;
export function toLowerCase(string: string): string;
export function toMonster(value: string): Monster;
export function toMonster(value: number): Monster;
export function toPhylum(value: string): Phylum;
export function toPlural(item: Item): string;
export function toServant(value: string): Servant;
export function toServant(value: number): Servant;
export function toSkill(value: string): Skill;
export function toSkill(value1: string, value2: string): Skill;
export function toSkill(value: number): Skill;
export function toSkill(value: Effect): Skill;
export function toSlot(item: string): Slot;
export function toSlot(item: Item): Slot;
export function toStat(value: string): Stat;
export function toString(val: string): string;
export function toString(val: number, fmt: string): string;
export function toString(val: number, fmt: string): string;
export function toThrall(value: string): Thrall;
export function toThrall(value: number): Thrall;
export function toUpperCase(string: string): string;
export function toUrl(value: Location): string;
export function toVykea(value: string): Vykea;
export function todayToString(): string;
export function totalFreeRests(): number;
export function totalTurnsPlayed(): number;
export function towerDoor(): boolean;
export function traceprint(string: string): void;
export function truncate(arg: number): number;
export function turnsPerCast(skill: Skill): number;
export function turnsPlayed(): number;
export function twiddle(): string;
export function unusualConstructDisc(): Item;
export function updateCandyPrices(): void;
export function urlDecode(arg: string): string;
export function urlEncode(arg: string): string;
export function use(item: Item): boolean;
export function use(arg1: Item, arg2: number): boolean;
export function use(arg1: number, arg2: Item): boolean;
export function useFamiliar(familiar: Familiar): boolean;
export function useServant(servant: Servant): boolean;
export function useSkill(arg1: Skill, arg2: number): boolean;
export function useSkill(arg1: number, arg2: Skill): boolean;
export function useSkill(arg1: Skill, arg2: number, target: string): boolean;
export function useSkill(arg1: number, arg2: Skill, target: string): boolean;
export function useSkill(skill: Skill): string;
export function userConfirm(message: string): boolean;
export function userConfirm(message: string, timeOut: number, defaultBoolean: boolean): boolean;
export function userPrompt(message: string): string;
export function userPrompt(message: string, options: any): string;
export function userPrompt(message: string, timeOut: number, defaultString: string): string;
export function visit(master: Coinmaster): boolean;
export function visitUrl(): string;
export function visitUrl(string: string): string;
export function visitUrl(string: string, usePostMethod: boolean): string;
export function visitUrl(string: string, usePostMethod: boolean, encoded: boolean): string;
export function votingBoothInitiatives(clss: Class, path: number, daycount: number): { [key: string]: boolean };
export function votingBoothInitiatives(clss: number, path: number, daycount: number): { [key: string]: boolean };
export function wait(delay: number): void;
export function waitq(delay: number): void;
export function weaponHands(item: Item): number;
export function weaponType(item: Item): Stat;
export function weightAdjustment(): number;
export function wellStocked(itemName: string, quantity: number, price: number): boolean;
export function whiteCitadelAvailable(): boolean;
export function whoClan(): { [key: string]: boolean };
export function willUsuallyDodge(): boolean;
export function willUsuallyMiss(): boolean;
export function write(string: string): void;
export function writeCcs(data: string, name: string): boolean;
export function writeln(string: string): void;
export function xpath(html: string, xpath: string): string[];
declare abstract class MafiaClass {
    static get<T>(name: (string | number)): T;
    static get<T>(names: (string | number)[]): T[];
    static all<T>(): T[];
}
export class Bounty extends MafiaClass {
    static get<T = Bounty>(name: string): T;
    static get<T = Bounty>(names: string[]): T[];
    static all<T = Bounty>(): T[];
    /**
     * Plural */
    readonly plural: string;
    /**
     * Type */
    readonly type: string;
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
export type ClassType = "Accordion Thief" | "Avatar of Boris" | "Avatar of Jarlsberg" | "Avatar of Sneaky Pete" | "Beanslinger" | "Cow Puncher" | "Disco Bandit" | "Ed the Undying" | "Gelatinous Noob" | "Grey Goo" | "Pastamancer" | "Plumber" | "Sauceror" | "Seal Clubber" | "Snake Oiler" | "Turtle Tamer" | "Vampyre" | "Zombie Master";
export class Class extends MafiaClass {
    static get<T = Class>(name: (ClassType | number)): T;
    static get<T = Class>(names: (ClassType | number)[]): T[];
    static all<T = Class>(): T[];
    toString(): ClassType;
    /**
     * Primestat */
    readonly primestat: Stat;
}
export class Coinmaster extends MafiaClass {
    static get<T = Coinmaster>(name: string): T;
    static get<T = Coinmaster>(names: string[]): T[];
    static all<T = Coinmaster>(): T[];
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
export class Effect extends MafiaClass {
    static get<T = Effect>(name: (string | number)): T;
    static get<T = Effect>(names: (string | number)[]): T[];
    static all<T = Effect>(): T[];
    /**
     * Name */
    readonly name: string;
    /**
     * Default */
    readonly default: string;
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
    /**
     * Quality */
    readonly quality: string;
    /**
     * Attributes */
    readonly attributes: string;
    /**
     * Song */
    readonly song: boolean;
}
export type ElementType = "bad spelling" | "cold" | "hot" | "shadow" | "sleaze" | "slime" | "spooky" | "stench" | "supercold";
export class Element extends MafiaClass {
    static get<T = Element>(name: ElementType): T;
    static get<T = Element>(names: ElementType[]): T[];
    static all<T = Element>(): T[];
    toString(): ElementType;
    /**
     * Image */
    readonly image: string;
}
export class Familiar extends MafiaClass {
    static get<T = Familiar>(name: (string | number)): T;
    static get<T = Familiar>(names: (string | number)[]): T[];
    static all<T = Familiar>(): T[];
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
     * Owner */
    readonly owner: string;
    /**
     * Owner id */
    readonly ownerId: number;
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
    readonly pokeLevel2Power: number;
    /**
     * Poke level 2 hp */
    readonly pokeLevel2Hp: number;
    /**
     * Poke level 3 power */
    readonly pokeLevel3Power: number;
    /**
     * Poke level 3 hp */
    readonly pokeLevel3Hp: number;
    /**
     * Poke level 4 power */
    readonly pokeLevel4Power: number;
    /**
     * Poke level 4 hp */
    readonly pokeLevel4Hp: number;
    /**
     * Poke move 1 */
    readonly pokeMove1: string;
    /**
     * Poke move 2 */
    readonly pokeMove2: string;
    /**
     * Poke move 3 */
    readonly pokeMove3: string;
    /**
     * Poke attribute */
    readonly pokeAttribute: string;
}
export class Item extends MafiaClass {
    static get<T = Item>(name: (string | number)): T;
    static get<T = Item>(names: (string | number)[]): T[];
    static all<T = Item>(): T[];
    /**
     * Name */
    readonly name: string;
    /**
     * Plural */
    readonly plural: string;
    /**
     * Descid */
    readonly descid: string;
    /**
     * Image */
    readonly image: string;
    /**
     * Smallimage */
    readonly smallimage: string;
    /**
     * Levelreq */
    readonly levelreq: number;
    /**
     * Quality */
    readonly quality: string;
    /**
     * Adventures */
    readonly adventures: string;
    /**
     * Muscle */
    readonly muscle: string;
    /**
     * Mysticality */
    readonly mysticality: string;
    /**
     * Moxie */
    readonly moxie: string;
    /**
     * Fullness */
    readonly fullness: number;
    /**
     * Inebriety */
    readonly inebriety: number;
    /**
     * Spleen */
    readonly spleen: number;
    /**
     * Minhp */
    readonly minhp: number;
    /**
     * Maxhp */
    readonly maxhp: number;
    /**
     * Minmp */
    readonly minmp: number;
    /**
     * Maxmp */
    readonly maxmp: number;
    /**
     * Dailyusesleft */
    readonly dailyusesleft: number;
    /**
     * Notes */
    readonly notes: string;
    /**
     * Quest */
    readonly quest: boolean;
    /**
     * Gift */
    readonly gift: boolean;
    /**
     * Tradeable */
    readonly tradeable: boolean;
    /**
     * Discardable */
    readonly discardable: boolean;
    /**
     * Combat */
    readonly combat: boolean;
    /**
     * Combat reusable */
    readonly combatReusable: boolean;
    /**
     * Usable */
    readonly usable: boolean;
    /**
     * Reusable */
    readonly reusable: boolean;
    /**
     * Multi */
    readonly multi: boolean;
    /**
     * Fancy */
    readonly fancy: boolean;
    /**
     * Pasteable */
    readonly pasteable: boolean;
    /**
     * Smithable */
    readonly smithable: boolean;
    /**
     * Cookable */
    readonly cookable: boolean;
    /**
     * Mixable */
    readonly mixable: boolean;
    /**
     * Candy */
    readonly candy: boolean;
    /**
     * Candy type */
    readonly candyType: string;
    /**
     * Chocolate */
    readonly chocolate: boolean;
    /**
     * Potion */
    readonly potion: boolean;
    /**
     * Seller */
    readonly seller: Coinmaster;
    /**
     * Buyer */
    readonly buyer: Coinmaster;
    /**
     * Name length */
    readonly nameLength: number;
    /**
     * Noob skill */
    readonly noobSkill: Skill;
    /**
     * Tcrs name */
    readonly tcrsName: string;
}
export class Location extends MafiaClass {
    static get<T = Location>(name: (string | number)): T;
    static get<T = Location>(names: (string | number)[]): T[];
    static all<T = Location>(): T[];
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
     * Fire level */
    readonly fireLevel: number;
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
     * Poison */
    readonly poison: number;
    /**
     * Water level */
    readonly waterLevel: number;
    /**
     * Wanderers */
    readonly wanderers: boolean;
}
export class Monster extends MafiaClass {
    static get<T = Monster>(name: (string | number)): T;
    static get<T = Monster>(names: (string | number)[]): T[];
    static all<T = Monster>(): T[];
    /**
     * Name */
    readonly name: string;
    /**
     * Article */
    readonly article: string;
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
     * Base defense */
    readonly baseDefense: number;
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
     * Base initiative */
    readonly baseInitiative: number;
    /**
     * Raw initiative */
    readonly rawInitiative: number;
    /**
     * Attack element */
    readonly attackElement: Element;
    /**
     * Attack elements */
    readonly attackElements: { [element: string]: boolean };
    /**
     * Defense element */
    readonly defenseElement: Element;
    /**
     * Physical resistance */
    readonly physicalResistance: number;
    /**
     * Elemental resistance */
    readonly elementalResistance: number;
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
     * Group */
    readonly group: number;
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
     * Sub types */
    readonly subTypes: { [subType: string]: boolean };
    /**
     * Random modifiers */
    readonly randomModifiers: { [randomModifier: string]: boolean };
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
export type PhylumType = "beast" | "bug" | "constellation" | "construct" | "demon" | "dude" | "elemental" | "elf" | "fish" | "goblin" | "hippy" | "hobo" | "horror" | "humanoid" | "mer-kin" | "orc" | "penguin" | "pirate" | "plant" | "slime" | "undead" | "weird";
export class Phylum extends MafiaClass {
    static get<T = Phylum>(name: PhylumType): T;
    static get<T = Phylum>(names: PhylumType[]): T[];
    static all<T = Phylum>(): T[];
    toString(): PhylumType;
    /**
     * Image */
    readonly image: string;
}
export type ServantType = "Assassin" | "Belly-Dancer" | "Bodyguard" | "Cat" | "Maid" | "Priest" | "Scribe";
export class Servant extends MafiaClass {
    static get<T = Servant>(name: (ServantType | number)): T;
    static get<T = Servant>(names: (ServantType | number)[]): T[];
    static all<T = Servant>(): T[];
    toString(): ServantType;
    /**
     * Id */
    readonly id: number;
    /**
     * Name */
    readonly name: ServantType;
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
export class Skill extends MafiaClass {
    static get<T = Skill>(name: (string | number)): T;
    static get<T = Skill>(names: (string | number)[]): T[];
    static all<T = Skill>(): T[];
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
    readonly class: Class;
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
export type SlotType = "acc1" | "acc2" | "acc3" | "back" | "bootskin" | "bootspur" | "buddy-bjorn" | "card-sleeve" | "crown-of-thrones" | "fakehand" | "familiar" | "folder1" | "folder2" | "folder3" | "folder4" | "folder5" | "hat" | "holster" | "off-hand" | "pants" | "shirt" | "sticker1" | "sticker2" | "sticker3" | "weapon";
export class Slot extends MafiaClass {
    static get<T = Slot>(name: (SlotType | number)): T;
    static get<T = Slot>(names: (SlotType | number)[]): T[];
    static all<T = Slot>(): T[];
    toString(): SlotType;
}
export type StatType = "Moxie" | "Muscle" | "Mysticality";
export class Stat extends MafiaClass {
    static get<T = Stat>(name: StatType): T;
    static get<T = Stat>(names: StatType[]): T[];
    static all<T = Stat>(): T[];
    toString(): StatType;
}
export type ThrallType = "Angel Hair Wisp" | "Elbow Macaroni" | "Lasagmbie" | "Penne Dreadful" | "Spaghetti Elemental" | "Spice Ghost" | "Vampieroghi" | "Vermincelli";
export class Thrall extends MafiaClass {
    static get<T = Thrall>(name: (ThrallType | number)): T;
    static get<T = Thrall>(names: (ThrallType | number)[]): T[];
    static all<T = Thrall>(): T[];
    toString(): ThrallType;
    /**
     * Id */
    readonly id: number;
    /**
     * Name */
    readonly name: ThrallType;
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
export class Vykea extends MafiaClass {
    static get<T = Vykea>(name: string): T;
    static get<T = Vykea>(names: string[]): T[];
    static all<T = Vykea>(): T[];
    /**
     * Id */
    readonly id: number;
    /**
     * Name */
    readonly name: string;
    /**
     * Type */
    readonly type: number;
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