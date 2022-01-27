// Needed for DataLoader.
import "setimmediate";

import { useContext, useEffect, useState } from "react";
import DataLoader from "dataloader";
import { batchFunction } from "../api/function";
import RefreshContext from "../contexts/RefreshContext";
import { types } from "../kolmafia/kolmafia";
import { Placeholder } from "../util/makeValue";

const hookFunctionsLoader = new DataLoader(batchFunction);

export function useFunctionInternal<T>(
  name: string,
  args: unknown[],
  default_: T
) {
  const { hardRefreshCount } = useContext(RefreshContext);
  const [returnValue, setReturnValue] = useState<T>(default_);
  useEffect(() => {
    let isCancelled = false;
    hookFunctionsLoader.load({ name, args }).then((value) => {
      if (!isCancelled) setReturnValue(value as T);
    });
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, JSON.stringify(args), hardRefreshCount]);

  return returnValue;
}

export function useAddItemCondition(
  arg1: number,
  arg2: Placeholder<"Item">
): void | undefined;
export function useAddItemCondition(
  arg1: Placeholder<"Item">,
  arg2: number
): void | undefined;
export function useAddItemCondition(...args: unknown[]): void | undefined {
  return useFunctionInternal("addItemCondition", args, undefined);
}
export function useAdv1(
  locationValue: Placeholder<"Location">,
  adventuresUsedValue: number,
  filterFunction:
    | string
    | ((round: number, monster: Placeholder<"Monster">, text: string) => string)
): boolean;
export function useAdv1(
  locationValue: Placeholder<"Location">,
  adventuresUsedValue: number
): boolean | undefined;
export function useAdv1(
  locationValue: Placeholder<"Location">
): boolean | undefined;
export function useAdv1(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("adv1", args, undefined);
}
export function useAdvCost(skill: Placeholder<"Skill">): number | undefined;
export function useAdvCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("advCost", args, undefined);
}
export function useAdventure(
  arg1: Placeholder<"Location">,
  arg2: number
): boolean | undefined;
export function useAdventure(
  arg1: Placeholder<"Location">,
  arg2: number,
  filterFunction:
    | string
    | ((round: number, monster: Placeholder<"Monster">, text: string) => string)
): boolean;
export function useAdventure(
  arg1: number,
  arg2: Placeholder<"Location">
): boolean | undefined;
export function useAdventure(
  arg1: number,
  arg2: Placeholder<"Location">,
  filterFunction:
    | string
    | ((round: number, monster: Placeholder<"Monster">, text: string) => string)
): boolean;
export function useAdventure(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("adventure", args, undefined);
}
export function useAllMonstersWithId():
  | { [monster: string]: boolean }
  | undefined;
export function useAllMonstersWithId(
  ...args: unknown[]
): { [monster: string]: boolean } | undefined {
  return useFunctionInternal("allMonstersWithId", args, undefined);
}
export function useAllNormalOutfits(): string[] | undefined;
export function useAllNormalOutfits(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("allNormalOutfits", args, undefined);
}
export function useAppearanceRates(location: Placeholder<"Location">):
  | {
      [monster: string]: number;
    }
  | undefined;
export function useAppearanceRates(
  location: Placeholder<"Location">,
  includeQueue: boolean
): { [monster: string]: number } | undefined;
export function useAppearanceRates(
  ...args: unknown[]
): { [monster: string]: number } | undefined {
  return useFunctionInternal("appearanceRates", args, undefined);
}
export function useAppend(buffer: string, s: string): string | undefined;
export function useAppend(...args: unknown[]): string | undefined {
  return useFunctionInternal("append", args, undefined);
}
export function useAttack(): string | undefined;
export function useAttack(...args: unknown[]): string | undefined {
  return useFunctionInternal("attack", args, undefined);
}
export function useAutosell(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useAutosell(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useAutosell(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("autosell", args, undefined);
}
export function useAutosellPrice(item: Placeholder<"Item">): number | undefined;
export function useAutosellPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("autosellPrice", args, undefined);
}
export function useAvailableAmount(
  arg: Placeholder<"Item">
): number | undefined;
export function useAvailableAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("availableAmount", args, undefined);
}
export function useAvailableChoiceOptions():
  | { [key: number]: string }
  | undefined;
export function useAvailableChoiceOptions(spoilers: boolean):
  | {
      [key: number]: string;
    }
  | undefined;
export function useAvailableChoiceOptions(...args: unknown[]):
  | {
      [key: number]: string;
    }
  | undefined {
  return useFunctionInternal("availableChoiceOptions", args, undefined);
}
export function useAvailableChoiceSelectInputs(decision: number):
  | {
      [key: string]: { [key: string]: string };
    }
  | undefined;
export function useAvailableChoiceSelectInputs(...args: unknown[]):
  | {
      [key: string]: { [key: string]: string };
    }
  | undefined {
  return useFunctionInternal("availableChoiceSelectInputs", args, undefined);
}
export function useAvailableChoiceTextInputs(decision: number):
  | {
      [key: string]: string;
    }
  | undefined;
export function useAvailableChoiceTextInputs(...args: unknown[]):
  | {
      [key: string]: string;
    }
  | undefined {
  return useFunctionInternal("availableChoiceTextInputs", args, undefined);
}
export function useAvailablePocket(
  arg: Placeholder<"Monster">
): number | undefined;
export function useAvailablePocket(
  arg: Placeholder<"Effect">
): number | undefined;
export function useAvailablePocket(
  arg: Placeholder<"Item">
): number | undefined;
export function useAvailablePocket(
  arg: Placeholder<"Stat">
): number | undefined;
export function useAvailablePocket(...args: unknown[]): number | undefined {
  return useFunctionInternal("availablePocket", args, undefined);
}
export function useBatchClose(): boolean | undefined;
export function useBatchClose(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("batchClose", args, undefined);
}
export function useBatchOpen(): void | undefined;
export function useBatchOpen(...args: unknown[]): void | undefined {
  return useFunctionInternal("batchOpen", args, undefined);
}
export function useBjornifyFamiliar(
  familiar: Placeholder<"Familiar">
): boolean | undefined;
export function useBjornifyFamiliar(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("bjornifyFamiliar", args, undefined);
}
export function useBlackMarketAvailable(): boolean | undefined;
export function useBlackMarketAvailable(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("blackMarketAvailable", args, undefined);
}
export function useBooleanModifier(
  ...args:
    | [modifier: string]
    | [arg: string | Placeholder<"Item"> | Placeholder<"Effect">]
): boolean | undefined;
export function useBooleanModifier(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("booleanModifier", args, undefined);
}
export function useBuffedHitStat(): number | undefined;
export function useBuffedHitStat(...args: unknown[]): number | undefined {
  return useFunctionInternal("buffedHitStat", args, undefined);
}
export function useBufferToFile(
  var1: string,
  var2: string
): boolean | undefined;
export function useBufferToFile(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("bufferToFile", args, undefined);
}
export function useBuy(item: Placeholder<"Item">): boolean | undefined;
export function useBuy(
  item: Placeholder<"Item">,
  quantity: number
): boolean | undefined;
export function useBuy(
  item: Placeholder<"Item">,
  quantity: number,
  price: number
): number | undefined;
export function useBuy(
  quantity: number,
  item: Placeholder<"Item">
): boolean | undefined;
export function useBuy(
  quantity: number,
  item: Placeholder<"Item">,
  price: number
): number | undefined;
export function useBuy(
  coinmaster: Placeholder<"Coinmaster">,
  quantity: number,
  item: Placeholder<"Item">
): boolean | undefined;
export function useBuy(...args: unknown[]): number | boolean | undefined {
  return useFunctionInternal("buy", args, undefined);
}
export function useBuyPrice(
  master: Placeholder<"Coinmaster">,
  item: Placeholder<"Item">
): number | undefined;
export function useBuyPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("buyPrice", args, undefined);
}
export function useBuyUsingStorage(
  item: Placeholder<"Item">
): boolean | undefined;
export function useBuyUsingStorage(
  item: Placeholder<"Item">,
  quantity: number
): boolean | undefined;
export function useBuyUsingStorage(
  item: Placeholder<"Item">,
  quantity: number,
  price: number
): number | undefined;
export function useBuyUsingStorage(
  quantity: number,
  item: Placeholder<"Item">
): boolean | undefined;
export function useBuyUsingStorage(
  quantity: number,
  item: Placeholder<"Item">,
  price: number
): number | undefined;
export function useBuyUsingStorage(
  ...args: unknown[]
): number | boolean | undefined {
  return useFunctionInternal("buyUsingStorage", args, undefined);
}
export function useBuysItem(
  master: Placeholder<"Coinmaster">,
  item: Placeholder<"Item">
): boolean | undefined;
export function useBuysItem(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("buysItem", args, undefined);
}
export function useCanDrink(): boolean | undefined;
export function useCanDrink(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canDrink", args, undefined);
}
export function useCanEat(): boolean | undefined;
export function useCanEat(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canEat", args, undefined);
}
export function useCanEquip(
  itemOrFamiliar: Placeholder<"Item">
): boolean | undefined;
export function useCanEquip(
  familiar: Placeholder<"Familiar">
): boolean | undefined;
export function useCanEquip(
  familiar: Placeholder<"Familiar">,
  item: Placeholder<"Item">
): boolean | undefined;
export function useCanEquip(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canEquip", args, undefined);
}
export function useCanFaxbot(arg: Placeholder<"Monster">): boolean | undefined;
export function useCanFaxbot(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canFaxbot", args, undefined);
}
export function useCanInteract(): boolean | undefined;
export function useCanInteract(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canInteract", args, undefined);
}
export function useCanStillSteal(): boolean | undefined;
export function useCanStillSteal(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canStillSteal", args, undefined);
}
export function useCanadiaAvailable(): boolean | undefined;
export function useCanadiaAvailable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("canadiaAvailable", args, undefined);
}
export function useCandyForTier(arg: number): Placeholder<"Item">[] | undefined;
export function useCandyForTier(
  arg1: number,
  arg2: number
): Placeholder<"Item">[] | undefined;
export function useCandyForTier(
  ...args: unknown[]
): Placeholder<"Item">[] | undefined {
  return useFunctionInternal("candyForTier", args, undefined);
}
export function useCeil(arg: number): number | undefined;
export function useCeil(...args: unknown[]): number | undefined {
  return useFunctionInternal("ceil", args, undefined);
}
export function useChangeMcd(level: number): boolean | undefined;
export function useChangeMcd(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("changeMcd", args, undefined);
}
export function useCharAt(source: string, index: number): string | undefined;
export function useCharAt(...args: unknown[]): string | undefined {
  return useFunctionInternal("charAt", args, undefined);
}
export function useChatClan(messageValue: string): void | undefined;
export function useChatClan(
  messageValue: string,
  recipientValue: string
): void | undefined;
export function useChatClan(...args: unknown[]): void | undefined {
  return useFunctionInternal("chatClan", args, undefined);
}
export function useChatMacro(macroValue: string): void | undefined;
export function useChatMacro(...args: unknown[]): void | undefined {
  return useFunctionInternal("chatMacro", args, undefined);
}
export function useChatNotify(
  messageValue: string,
  colorValue: string
): void | undefined;
export function useChatNotify(...args: unknown[]): void | undefined {
  return useFunctionInternal("chatNotify", args, undefined);
}
export function useChatPrivate(
  recipientValue: string,
  messageValue: string
): void | undefined;
export function useChatPrivate(...args: unknown[]): void | undefined {
  return useFunctionInternal("chatPrivate", args, undefined);
}
export function useChew(item: Placeholder<"Item">): boolean | undefined;
export function useChew(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useChew(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useChew(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("chew", args, undefined);
}
export function useChoiceFollowsFight(): boolean | undefined;
export function useChoiceFollowsFight(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("choiceFollowsFight", args, undefined);
}
export function useClassModifier(
  arg: string | Placeholder<"Item">,
  modifier: string
): types.Class | undefined;
export function useClassModifier(...args: unknown[]): types.Class | undefined {
  return useFunctionInternal("classModifier", args, undefined);
}
export function useClear(arg: any): void | undefined;
export function useClear(...args: unknown[]): void | undefined {
  return useFunctionInternal("clear", args, undefined);
}
export function useClearBoozeHelper(): void | undefined;
export function useClearBoozeHelper(...args: unknown[]): void | undefined {
  return useFunctionInternal("clearBoozeHelper", args, undefined);
}
export function useClearFoodHelper(): void | undefined;
export function useClearFoodHelper(...args: unknown[]): void | undefined {
  return useFunctionInternal("clearFoodHelper", args, undefined);
}
export function useCliExecute(string: string): boolean | undefined;
export function useCliExecute(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("cliExecute", args, undefined);
}
export function useCliExecuteOutput(string: string): string | undefined;
export function useCliExecuteOutput(...args: unknown[]): string | undefined {
  return useFunctionInternal("cliExecuteOutput", args, undefined);
}
export function useClosetAmount(arg: Placeholder<"Item">): number | undefined;
export function useClosetAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("closetAmount", args, undefined);
}
export function useCombatManaCostModifier(): number | undefined;
export function useCombatManaCostModifier(
  ...args: unknown[]
): number | undefined {
  return useFunctionInternal("combatManaCostModifier", args, undefined);
}
export function useCombatRateModifier(): number | undefined;
export function useCombatRateModifier(...args: unknown[]): number | undefined {
  return useFunctionInternal("combatRateModifier", args, undefined);
}
export function useContainsText(
  source: string,
  search: string
): boolean | undefined;
export function useContainsText(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("containsText", args, undefined);
}
export function useCouncil(): void | undefined;
export function useCouncil(...args: unknown[]): void | undefined {
  return useFunctionInternal("council", args, undefined);
}
export function useCount(arg: any): number | undefined;
export function useCount(...args: unknown[]): number | undefined {
  return useFunctionInternal("count", args, undefined);
}
export function useCraft(
  modeValue: string,
  countValue: number,
  item1: Placeholder<"Item">,
  item2: Placeholder<"Item">
): number | undefined;
export function useCraft(...args: unknown[]): number | undefined {
  return useFunctionInternal("craft", args, undefined);
}
export function useCraftType(arg: Placeholder<"Item">): string | undefined;
export function useCraftType(...args: unknown[]): string | undefined {
  return useFunctionInternal("craftType", args, undefined);
}
export function useCreatableAmount(
  arg: Placeholder<"Item">
): number | undefined;
export function useCreatableAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("creatableAmount", args, undefined);
}
export function useCreatableTurns(
  itemId: Placeholder<"Item">
): number | undefined;
export function useCreatableTurns(
  itemId: Placeholder<"Item">,
  count: number
): number | undefined;
export function useCreatableTurns(
  itemId: Placeholder<"Item">,
  count: number,
  freeCrafting: boolean
): number | undefined;
export function useCreatableTurns(...args: unknown[]): number | undefined {
  return useFunctionInternal("creatableTurns", args, undefined);
}
export function useCreate(item: Placeholder<"Item">): boolean | undefined;
export function useCreate(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useCreate(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useCreate(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("create", args, undefined);
}
export function useCurrentHitStat(): types.Stat | undefined;
export function useCurrentHitStat(...args: unknown[]): types.Stat | undefined {
  return useFunctionInternal("currentHitStat", args, undefined);
}
export function useCurrentMcd(): number | undefined;
export function useCurrentMcd(...args: unknown[]): number | undefined {
  return useFunctionInternal("currentMcd", args, undefined);
}
export function useCurrentPvpStances(): { [key: string]: number } | undefined;
export function useCurrentPvpStances(
  ...args: unknown[]
): { [key: string]: number } | undefined {
  return useFunctionInternal("currentPvpStances", args, undefined);
}
export function useCurrentRadSickness(): number | undefined;
export function useCurrentRadSickness(...args: unknown[]): number | undefined {
  return useFunctionInternal("currentRadSickness", args, undefined);
}
export function useCurrentRound(): number | undefined;
export function useCurrentRound(...args: unknown[]): number | undefined {
  return useFunctionInternal("currentRound", args, undefined);
}
export function useDadSeaMonkeeWeakness(arg: number): types.Element | undefined;
export function useDadSeaMonkeeWeakness(
  ...args: unknown[]
): types.Element | undefined {
  return useFunctionInternal("dadSeaMonkeeWeakness", args, undefined);
}
export function useDailySpecial(): types.Item | undefined;
export function useDailySpecial(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("dailySpecial", args, undefined);
}
export function useDamageAbsorptionPercent(): number | undefined;
export function useDamageAbsorptionPercent(
  ...args: unknown[]
): number | undefined {
  return useFunctionInternal("damageAbsorptionPercent", args, undefined);
}
export function useDamageReduction(): number | undefined;
export function useDamageReduction(...args: unknown[]): number | undefined {
  return useFunctionInternal("damageReduction", args, undefined);
}
export function useDateToTimestamp(
  inFormat: string,
  dateTimeString: string
): number | undefined;
export function useDateToTimestamp(...args: unknown[]): number | undefined {
  return useFunctionInternal("dateToTimestamp", args, undefined);
}
export function useDebugprint(string: string): void | undefined;
export function useDebugprint(...args: unknown[]): void | undefined {
  return useFunctionInternal("debugprint", args, undefined);
}
export function useDescToEffect(value: string): types.Effect | undefined;
export function useDescToEffect(...args: unknown[]): types.Effect | undefined {
  return useFunctionInternal("descToEffect", args, undefined);
}
export function useDescToItem(value: string): types.Item | undefined;
export function useDescToItem(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("descToItem", args, undefined);
}
export function useDisable(name: string): void | undefined;
export function useDisable(...args: unknown[]): void | undefined {
  return useFunctionInternal("disable", args, undefined);
}
export function useDispensaryAvailable(): boolean | undefined;
export function useDispensaryAvailable(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("dispensaryAvailable", args, undefined);
}
export function useDisplayAmount(arg: Placeholder<"Item">): number | undefined;
export function useDisplayAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("displayAmount", args, undefined);
}
export function useDrink(item: Placeholder<"Item">): boolean | undefined;
export function useDrink(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useDrink(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useDrink(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("drink", args, undefined);
}
export function useDrinksilent(item: Placeholder<"Item">): boolean | undefined;
export function useDrinksilent(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useDrinksilent(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useDrinksilent(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("drinksilent", args, undefined);
}
export function useDump(arg: any): void | undefined;
export function useDump(arg: any, color: string): void | undefined;
export function useDump(...args: unknown[]): void | undefined {
  return useFunctionInternal("dump", args, undefined);
}
export function useEat(item: Placeholder<"Item">): boolean | undefined;
export function useEat(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useEat(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useEat(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("eat", args, undefined);
}
export function useEatsilent(item: Placeholder<"Item">): boolean | undefined;
export function useEatsilent(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useEatsilent(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useEatsilent(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("eatsilent", args, undefined);
}
export function useEffectModifier(
  arg: string | Placeholder<"Item">,
  modifier: string
): types.Effect | undefined;
export function useEffectModifier(
  ...args: unknown[]
): types.Effect | undefined {
  return useFunctionInternal("effectModifier", args, undefined);
}
export function useEffectPockets(): { [key: number]: boolean } | undefined;
export function useEffectPockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("effectPockets", args, undefined);
}
export function useElementalResistance(
  arg: Placeholder<"Element">
): number | undefined;
export function useElementalResistance(): number | undefined;
export function useElementalResistance(
  arg: Placeholder<"Monster">
): number | undefined;
export function useElementalResistance(...args: unknown[]): number | undefined {
  return useFunctionInternal("elementalResistance", args, undefined);
}
export function useEmptyCloset(): boolean | undefined;
export function useEmptyCloset(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("emptyCloset", args, undefined);
}
export function useEnable(name: string): void | undefined;
export function useEnable(...args: unknown[]): void | undefined {
  return useFunctionInternal("enable", args, undefined);
}
export function useEndsWith(
  source: string,
  suffix: string
): boolean | undefined;
export function useEndsWith(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("endsWith", args, undefined);
}
export function useEnthroneFamiliar(
  familiar: Placeholder<"Familiar">
): boolean | undefined;
export function useEnthroneFamiliar(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("enthroneFamiliar", args, undefined);
}
export function useEntityDecode(arg: string): string | undefined;
export function useEntityDecode(...args: unknown[]): string | undefined {
  return useFunctionInternal("entityDecode", args, undefined);
}
export function useEntityEncode(arg: string): string | undefined;
export function useEntityEncode(...args: unknown[]): string | undefined {
  return useFunctionInternal("entityEncode", args, undefined);
}
export function useEquip(item: Placeholder<"Item">): boolean | undefined;
export function useEquip(
  arg1: Placeholder<"Item">,
  arg2: Placeholder<"Slot">
): boolean | undefined;
export function useEquip(
  arg1: Placeholder<"Slot">,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useEquip(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("equip", args, undefined);
}
export function useEquipAllFamiliars(): boolean | undefined;
export function useEquipAllFamiliars(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("equipAllFamiliars", args, undefined);
}
export function useEquippedAmount(arg: Placeholder<"Item">): number | undefined;
export function useEquippedAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("equippedAmount", args, undefined);
}
export function useEquippedItem(
  slot: Placeholder<"Slot">
): types.Item | undefined;
export function useEquippedItem(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("equippedItem", args, undefined);
}
export function useEudora(): string | undefined;
export function useEudora(newEudora: string): boolean | undefined;
export function useEudora(...args: unknown[]): string | boolean | undefined {
  return useFunctionInternal("eudora", args, undefined);
}
export function useEudoraItem(): types.Item | undefined;
export function useEudoraItem(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("eudoraItem", args, undefined);
}
export function useEveryCardName(name: string): string | undefined;
export function useEveryCardName(...args: unknown[]): string | undefined {
  return useFunctionInternal("everyCardName", args, undefined);
}
export function useExpectedDamage(): number | undefined;
export function useExpectedDamage(
  arg: Placeholder<"Monster">
): number | undefined;
export function useExpectedDamage(...args: unknown[]): number | undefined {
  return useFunctionInternal("expectedDamage", args, undefined);
}
export function useExperienceBonus(): number | undefined;
export function useExperienceBonus(...args: unknown[]): number | undefined {
  return useFunctionInternal("experienceBonus", args, undefined);
}
export function useExpressionEval(expr: string): number | undefined;
export function useExpressionEval(...args: unknown[]): number | undefined {
  return useFunctionInternal("expressionEval", args, undefined);
}
export function useExtractItems(
  string: string
): { [item: string]: number } | undefined;
export function useExtractItems(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("extractItems", args, undefined);
}
export function useExtractMeat(string: string): number | undefined;
export function useExtractMeat(...args: unknown[]): number | undefined {
  return useFunctionInternal("extractMeat", args, undefined);
}
export function useFamiliarEquipment(
  familiar: Placeholder<"Familiar">
): types.Item | undefined;
export function useFamiliarEquipment(
  ...args: unknown[]
): types.Item | undefined {
  return useFunctionInternal("familiarEquipment", args, undefined);
}
export function useFamiliarEquippedEquipment(
  familiar: Placeholder<"Familiar">
): types.Item | undefined;
export function useFamiliarEquippedEquipment(
  ...args: unknown[]
): types.Item | undefined {
  return useFunctionInternal("familiarEquippedEquipment", args, undefined);
}
export function useFamiliarWeight(
  familiar: Placeholder<"Familiar">
): number | undefined;
export function useFamiliarWeight(...args: unknown[]): number | undefined {
  return useFunctionInternal("familiarWeight", args, undefined);
}
export function useFavoriteFamiliars():
  | { [familiar: string]: boolean }
  | undefined;
export function useFavoriteFamiliars(
  ...args: unknown[]
): { [familiar: string]: boolean } | undefined {
  return useFunctionInternal("favoriteFamiliars", args, undefined);
}
export function useFaxbot(
  monsterName: Placeholder<"Monster">
): boolean | undefined;
export function useFaxbot(
  monsterName: Placeholder<"Monster">,
  botName: string
): boolean | undefined;
export function useFaxbot(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("faxbot", args, undefined);
}
export function useFightFollowsChoice(): boolean | undefined;
export function useFightFollowsChoice(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("fightFollowsChoice", args, undefined);
}
export function useFileToArray(
  var1: string
): { [key: number]: string } | undefined;
export function useFileToArray(
  ...args: unknown[]
): { [key: number]: string } | undefined {
  return useFunctionInternal("fileToArray", args, undefined);
}
export function useFileToBuffer(var1: string): string | undefined;
export function useFileToBuffer(...args: unknown[]): string | undefined {
  return useFunctionInternal("fileToBuffer", args, undefined);
}
export function useFileToMap(var1: string, var2: any): boolean | undefined;
export function useFileToMap(
  var1: string,
  var2: any,
  var3: boolean
): boolean | undefined;
export function useFileToMap(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("fileToMap", args, undefined);
}
export function useFloor(arg: number): number | undefined;
export function useFloor(...args: unknown[]): number | undefined {
  return useFunctionInternal("floor", args, undefined);
}
export function useFloristAvailable(): boolean | undefined;
export function useFloristAvailable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("floristAvailable", args, undefined);
}
export function useFlushMonsterManuelCache(): boolean | undefined;
export function useFlushMonsterManuelCache(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("flushMonsterManuelCache", args, undefined);
}
export function useFormField(key: string): string | undefined;
export function useFormField(...args: unknown[]): string | undefined {
  return useFunctionInternal("formField", args, undefined);
}
export function useFormFields(): { [key: string]: string } | undefined;
export function useFormFields(
  ...args: unknown[]
): { [key: string]: string } | undefined {
  return useFunctionInternal("formFields", args, undefined);
}
export function useFormatDateTime(
  inFormat: string,
  dateTimeString: string,
  outFormat: string
): string | undefined;
export function useFormatDateTime(...args: unknown[]): string | undefined {
  return useFunctionInternal("formatDateTime", args, undefined);
}
export function useFriarsAvailable(): boolean | undefined;
export function useFriarsAvailable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("friarsAvailable", args, undefined);
}
export function useFuelCost(skill: Placeholder<"Skill">): number | undefined;
export function useFuelCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("fuelCost", args, undefined);
}
export function useFullnessLimit(): number | undefined;
export function useFullnessLimit(...args: unknown[]): number | undefined {
  return useFunctionInternal("fullnessLimit", args, undefined);
}
export function useGamedayToInt(): number | undefined;
export function useGamedayToInt(...args: unknown[]): number | undefined {
  return useFunctionInternal("gamedayToInt", args, undefined);
}
export function useGamedayToString(): string | undefined;
export function useGamedayToString(...args: unknown[]): string | undefined {
  return useFunctionInternal("gamedayToString", args, undefined);
}
export function useGametimeToInt(): number | undefined;
export function useGametimeToInt(...args: unknown[]): number | undefined {
  return useFunctionInternal("gametimeToInt", args, undefined);
}
export function useGetAllProperties(
  filterValue: string,
  globalValue: boolean
): { [key: string]: boolean } | undefined;
export function useGetAllProperties(
  ...args: unknown[]
): { [key: string]: boolean } | undefined {
  return useFunctionInternal("getAllProperties", args, undefined);
}
export function useGetAutoAttack(): number | undefined;
export function useGetAutoAttack(...args: unknown[]): number | undefined {
  return useFunctionInternal("getAutoAttack", args, undefined);
}
export function useGetCampground(): { [item: string]: number } | undefined;
export function useGetCampground(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getCampground", args, undefined);
}
export function useGetCcsAction(index: number): string | undefined;
export function useGetCcsAction(...args: unknown[]): string | undefined {
  return useFunctionInternal("getCcsAction", args, undefined);
}
export function useGetChateau(): { [item: string]: number } | undefined;
export function useGetChateau(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getChateau", args, undefined);
}
export function useGetClanId(): number | undefined;
export function useGetClanId(...args: unknown[]): number | undefined {
  return useFunctionInternal("getClanId", args, undefined);
}
export function useGetClanLounge(): { [item: string]: number } | undefined;
export function useGetClanLounge(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getClanLounge", args, undefined);
}
export function useGetClanName(): string | undefined;
export function useGetClanName(...args: unknown[]): string | undefined {
  return useFunctionInternal("getClanName", args, undefined);
}
export function useGetClanRumpus(): { [key: string]: number } | undefined;
export function useGetClanRumpus(
  ...args: unknown[]
): { [key: string]: number } | undefined {
  return useFunctionInternal("getClanRumpus", args, undefined);
}
export function useGetCloset(): { [item: string]: number } | undefined;
export function useGetCloset(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getCloset", args, undefined);
}
export function useGetCounter(label: string): number | undefined;
export function useGetCounter(...args: unknown[]): number | undefined {
  return useFunctionInternal("getCounter", args, undefined);
}
export function useGetCounters(
  label: string,
  min: number,
  max: number
): string | undefined;
export function useGetCounters(...args: unknown[]): string | undefined {
  return useFunctionInternal("getCounters", args, undefined);
}
export function useGetCustomOutfits(): string[] | undefined;
export function useGetCustomOutfits(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("getCustomOutfits", args, undefined);
}
export function useGetDwelling(): types.Item | undefined;
export function useGetDwelling(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("getDwelling", args, undefined);
}
export function useGetFloristPlants():
  | { [location: string]: string[] }
  | undefined;
export function useGetFloristPlants(
  ...args: unknown[]
): { [location: string]: string[] } | undefined {
  return useFunctionInternal("getFloristPlants", args, undefined);
}
export function useGetFreePulls(): { [item: string]: number } | undefined;
export function useGetFreePulls(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getFreePulls", args, undefined);
}
export function useGetFuel(): number | undefined;
export function useGetFuel(...args: unknown[]): number | undefined {
  return useFunctionInternal("getFuel", args, undefined);
}
export function useGetGoals(): string[] | undefined;
export function useGetGoals(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("getGoals", args, undefined);
}
export function useGetIgnoreZoneWarnings(): boolean | undefined;
export function useGetIgnoreZoneWarnings(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("getIgnoreZoneWarnings", args, undefined);
}
export function useGetIngredients(arg: Placeholder<"Item">):
  | {
      [item: string]: number;
    }
  | undefined;
export function useGetIngredients(...args: unknown[]):
  | {
      [item: string]: number;
    }
  | undefined {
  return useFunctionInternal("getIngredients", args, undefined);
}
export function useGetInventory(): { [item: string]: number } | undefined;
export function useGetInventory(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getInventory", args, undefined);
}
export function useGetLocationMonsters(location: Placeholder<"Location">):
  | {
      [monster: string]: boolean;
    }
  | undefined;
export function useGetLocationMonsters(...args: unknown[]):
  | {
      [monster: string]: boolean;
    }
  | undefined {
  return useFunctionInternal("getLocationMonsters", args, undefined);
}
export function useGetMonsterMapping():
  | {
      [monster: string]: Placeholder<"Monster">;
    }
  | undefined;
export function useGetMonsterMapping(path: string):
  | {
      [monster: string]: Placeholder<"Monster">;
    }
  | undefined;
export function useGetMonsterMapping(...args: unknown[]):
  | {
      [monster: string]: Placeholder<"Monster">;
    }
  | undefined {
  return useFunctionInternal("getMonsterMapping", args, undefined);
}
export function useGetMonsters(
  location: Placeholder<"Location">
): Placeholder<"Monster">[] | undefined;
export function useGetMonsters(
  ...args: unknown[]
): Placeholder<"Monster">[] | undefined {
  return useFunctionInternal("getMonsters", args, undefined);
}
export function useGetMoods(): string[] | undefined;
export function useGetMoods(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("getMoods", args, undefined);
}
export function useGetOutfits(): string[] | undefined;
export function useGetOutfits(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("getOutfits", args, undefined);
}
export function useGetPath(): string | undefined;
export function useGetPath(...args: unknown[]): string | undefined {
  return useFunctionInternal("getPath", args, undefined);
}
export function useGetPathFull(): string | undefined;
export function useGetPathFull(...args: unknown[]): string | undefined {
  return useFunctionInternal("getPathFull", args, undefined);
}
export function useGetPathVariables(): string | undefined;
export function useGetPathVariables(...args: unknown[]): string | undefined {
  return useFunctionInternal("getPathVariables", args, undefined);
}
export function useGetPlayerId(playerNameValue: string): string | undefined;
export function useGetPlayerId(...args: unknown[]): string | undefined {
  return useFunctionInternal("getPlayerId", args, undefined);
}
export function useGetPlayerName(playerIdValue: number): string | undefined;
export function useGetPlayerName(...args: unknown[]): string | undefined {
  return useFunctionInternal("getPlayerName", args, undefined);
}
export function useGetPower(item: Placeholder<"Item">): number | undefined;
export function useGetPower(...args: unknown[]): number | undefined {
  return useFunctionInternal("getPower", args, undefined);
}
export function useGetProperty(name: string): string | undefined;
export function useGetProperty(
  name: string,
  globalValue: boolean
): string | undefined;
export function useGetProperty(...args: unknown[]): string | undefined {
  return useFunctionInternal("getProperty", args, undefined);
}
export function useGetRelated(
  item: Placeholder<"Item">,
  type: string
): { [item: string]: number } | undefined;
export function useGetRelated(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getRelated", args, undefined);
}
export function useGetRevision(): number | undefined;
export function useGetRevision(...args: unknown[]): number | undefined {
  return useFunctionInternal("getRevision", args, undefined);
}
export function useGetShop(): { [item: string]: number } | undefined;
export function useGetShop(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getShop", args, undefined);
}
export function useGetShopLog(): string[] | undefined;
export function useGetShopLog(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("getShopLog", args, undefined);
}
export function useGetStackTrace(): {
  file: string;
  name: string;
  line: number;
}[];
export function useGetStackTrace(...args: unknown[]):
  | {
      file: string;
      name: string;
      line: number;
    }[]
  | undefined {
  return useFunctionInternal("getStackTrace", args, undefined);
}
export function useGetStash(): { [item: string]: number } | undefined;
export function useGetStash(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getStash", args, undefined);
}
export function useGetStorage(): { [item: string]: number } | undefined;
export function useGetStorage(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("getStorage", args, undefined);
}
export function useGetVersion(): string | undefined;
export function useGetVersion(...args: unknown[]): string | undefined {
  return useFunctionInternal("getVersion", args, undefined);
}
export function useGetWorkshed(): types.Item | undefined;
export function useGetWorkshed(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("getWorkshed", args, undefined);
}
export function useGnomadsAvailable(): boolean | undefined;
export function useGnomadsAvailable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("gnomadsAvailable", args, undefined);
}
export function useGoalExists(check: string): boolean | undefined;
export function useGoalExists(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("goalExists", args, undefined);
}
export function useGroupString(
  string: string,
  regex: string
): { [key: number]: { [key: number]: string } } | undefined;
export function useGroupString(
  ...args: unknown[]
): { [key: number]: { [key: number]: string } } | undefined {
  return useFunctionInternal("groupString", args, undefined);
}
export function useGuildAvailable(): boolean | undefined;
export function useGuildAvailable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("guildAvailable", args, undefined);
}
export function useGuildStoreAvailable(): boolean | undefined;
export function useGuildStoreAvailable(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("guildStoreAvailable", args, undefined);
}
export function useHandlingChoice(): boolean | undefined;
export function useHandlingChoice(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("handlingChoice", args, undefined);
}
export function useHaveBartender(): boolean | undefined;
export function useHaveBartender(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveBartender", args, undefined);
}
export function useHaveChef(): boolean | undefined;
export function useHaveChef(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveChef", args, undefined);
}
export function useHaveDisplay(): boolean | undefined;
export function useHaveDisplay(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveDisplay", args, undefined);
}
export function useHaveEffect(arg: Placeholder<"Effect">): number | undefined;
export function useHaveEffect(...args: unknown[]): number | undefined {
  return useFunctionInternal("haveEffect", args, undefined);
}
export function useHaveEquipped(item: Placeholder<"Item">): boolean | undefined;
export function useHaveEquipped(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveEquipped", args, undefined);
}
export function useHaveFamiliar(
  familiar: Placeholder<"Familiar">
): boolean | undefined;
export function useHaveFamiliar(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveFamiliar", args, undefined);
}
export function useHaveMushroomPlot(): boolean | undefined;
export function useHaveMushroomPlot(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveMushroomPlot", args, undefined);
}
export function useHaveOutfit(outfit: string): boolean | undefined;
export function useHaveOutfit(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveOutfit", args, undefined);
}
export function useHaveServant(
  servant: Placeholder<"Servant">
): boolean | undefined;
export function useHaveServant(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveServant", args, undefined);
}
export function useHaveShop(): boolean | undefined;
export function useHaveShop(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveShop", args, undefined);
}
export function useHaveSkill(arg: Placeholder<"Skill">): boolean | undefined;
export function useHaveSkill(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("haveSkill", args, undefined);
}
export function useHedgeMaze(arg: string): boolean | undefined;
export function useHedgeMaze(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("hedgeMaze", args, undefined);
}
export function useHermit(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useHermit(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useHermit(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("hermit", args, undefined);
}
export function useHiddenTempleUnlocked(): boolean | undefined;
export function useHiddenTempleUnlocked(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("hiddenTempleUnlocked", args, undefined);
}
export function useHippyStoneBroken(): boolean | undefined;
export function useHippyStoneBroken(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("hippyStoneBroken", args, undefined);
}
export function useHippyStoreAvailable(): boolean | undefined;
export function useHippyStoreAvailable(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("hippyStoreAvailable", args, undefined);
}
export function useHistoricalAge(item: Placeholder<"Item">): number | undefined;
export function useHistoricalAge(...args: unknown[]): number | undefined {
  return useFunctionInternal("historicalAge", args, undefined);
}
export function useHistoricalPrice(
  item: Placeholder<"Item">
): number | undefined;
export function useHistoricalPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("historicalPrice", args, undefined);
}
export function useHoliday(): string | undefined;
export function useHoliday(...args: unknown[]): string | undefined {
  return useFunctionInternal("holiday", args, undefined);
}
export function useHpCost(skill: Placeholder<"Skill">): number | undefined;
export function useHpCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("hpCost", args, undefined);
}
export function useImageToMonster(value: string): types.Monster | undefined;
export function useImageToMonster(
  ...args: unknown[]
): types.Monster | undefined {
  return useFunctionInternal("imageToMonster", args, undefined);
}
export function useInBadMoon(): boolean | undefined;
export function useInBadMoon(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inBadMoon", args, undefined);
}
export function useInCasual(): boolean | undefined;
export function useInCasual(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inCasual", args, undefined);
}
export function useInHardcore(): boolean | undefined;
export function useInHardcore(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inHardcore", args, undefined);
}
export function useInMoxieSign(): boolean | undefined;
export function useInMoxieSign(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inMoxieSign", args, undefined);
}
export function useInMultiFight(): boolean | undefined;
export function useInMultiFight(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inMultiFight", args, undefined);
}
export function useInMuscleSign(): boolean | undefined;
export function useInMuscleSign(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inMuscleSign", args, undefined);
}
export function useInMysticalitySign(): boolean | undefined;
export function useInMysticalitySign(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("inMysticalitySign", args, undefined);
}
export function useInaccessibleReason(
  master: Placeholder<"Coinmaster">
): string | undefined;
export function useInaccessibleReason(...args: unknown[]): string | undefined {
  return useFunctionInternal("inaccessibleReason", args, undefined);
}
export function useIndexOf(source: string, search: string): number | undefined;
export function useIndexOf(
  source: string,
  search: string,
  start: number
): number | undefined;
export function useIndexOf(...args: unknown[]): number | undefined {
  return useFunctionInternal("indexOf", args, undefined);
}
export function useInebrietyLimit(): number | undefined;
export function useInebrietyLimit(...args: unknown[]): number | undefined {
  return useFunctionInternal("inebrietyLimit", args, undefined);
}
export function useInitiativeModifier(): number | undefined;
export function useInitiativeModifier(...args: unknown[]): number | undefined {
  return useFunctionInternal("initiativeModifier", args, undefined);
}
export function useInsert(
  buffer: string,
  index: number,
  s: string
): string | undefined;
export function useInsert(...args: unknown[]): string | undefined {
  return useFunctionInternal("insert", args, undefined);
}
export function useIsAccessible(
  master: Placeholder<"Coinmaster">
): boolean | undefined;
export function useIsAccessible(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isAccessible", args, undefined);
}
export function useIsBanished(arg: Placeholder<"Monster">): boolean | undefined;
export function useIsBanished(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isBanished", args, undefined);
}
export function useIsCoinmasterItem(
  item: Placeholder<"Item">
): boolean | undefined;
export function useIsCoinmasterItem(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isCoinmasterItem", args, undefined);
}
export function useIsDarkMode(): boolean | undefined;
export function useIsDarkMode(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isDarkMode", args, undefined);
}
export function useIsDiscardable(
  item: Placeholder<"Item">
): boolean | undefined;
export function useIsDiscardable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isDiscardable", args, undefined);
}
export function useIsDisplayable(
  item: Placeholder<"Item">
): boolean | undefined;
export function useIsDisplayable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isDisplayable", args, undefined);
}
export function useIsFamiliarEquipmentLocked(): boolean | undefined;
export function useIsFamiliarEquipmentLocked(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("isFamiliarEquipmentLocked", args, undefined);
}
export function useIsGiftable(item: Placeholder<"Item">): boolean | undefined;
export function useIsGiftable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isGiftable", args, undefined);
}
export function useIsGoal(item: Placeholder<"Item">): boolean | undefined;
export function useIsGoal(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isGoal", args, undefined);
}
export function useIsHeadless(): boolean | undefined;
export function useIsHeadless(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isHeadless", args, undefined);
}
export function useIsInteger(string: string): boolean | undefined;
export function useIsInteger(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isInteger", args, undefined);
}
export function useIsNpcItem(item: Placeholder<"Item">): boolean | undefined;
export function useIsNpcItem(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isNpcItem", args, undefined);
}
export function useIsOnline(arg: string): boolean | undefined;
export function useIsOnline(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isOnline", args, undefined);
}
export function useIsTradeable(item: Placeholder<"Item">): boolean | undefined;
export function useIsTradeable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isTradeable", args, undefined);
}
export function useIsTrendy(thing: Placeholder<"Item">): boolean | undefined;
export function useIsTrendy(thing: Placeholder<"Skill">): boolean | undefined;
export function useIsTrendy(
  thing: Placeholder<"Familiar">
): boolean | undefined;
export function useIsTrendy(thing: string): boolean | undefined;
export function useIsTrendy(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isTrendy", args, undefined);
}
export function useIsUnrestricted(
  thing: Placeholder<"Item">
): boolean | undefined;
export function useIsUnrestricted(
  thing: Placeholder<"Skill">
): boolean | undefined;
export function useIsUnrestricted(
  thing: Placeholder<"Familiar">
): boolean | undefined;
export function useIsUnrestricted(thing: string): boolean | undefined;
export function useIsUnrestricted(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isUnrestricted", args, undefined);
}
export function useIsWearingOutfit(outfit: string): boolean | undefined;
export function useIsWearingOutfit(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("isWearingOutfit", args, undefined);
}
export function useItemAmount(arg: Placeholder<"Item">): number | undefined;
export function useItemAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("itemAmount", args, undefined);
}
export function useItemDropModifier(): number | undefined;
export function useItemDropModifier(...args: unknown[]): number | undefined {
  return useFunctionInternal("itemDropModifier", args, undefined);
}
export function useItemDrops(): { [item: string]: number } | undefined;
export function useItemDrops(arg: Placeholder<"Monster">):
  | {
      [item: string]: number;
    }
  | undefined;
export function useItemDrops(...args: unknown[]):
  | {
      [item: string]: number;
    }
  | undefined {
  return useFunctionInternal("itemDrops", args, undefined);
}
export function useItemDropsArray(): {
  drop: Placeholder<"Item">;
  rate: number;
  type: string;
}[];
export function useItemDropsArray(
  monster: Placeholder<"Monster">
): { drop: Placeholder<"Item">; rate: number; type: string }[];
export function useItemDropsArray(
  arg: Placeholder<"Monster">
): { drop: Placeholder<"Item">; rate: number; type: string }[];
export function useItemDropsArray(
  ...args: unknown[]
): { drop: Placeholder<"Item">; rate: number; type: string }[] | undefined {
  return useFunctionInternal("itemDropsArray", args, undefined);
}
export function useItemPockets(): { [key: number]: boolean } | undefined;
export function useItemPockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("itemPockets", args, undefined);
}
export function useItemType(item: Placeholder<"Item">): string | undefined;
export function useItemType(...args: unknown[]): string | undefined {
  return useFunctionInternal("itemType", args, undefined);
}
export function useJokePockets(): { [key: number]: boolean } | undefined;
export function useJokePockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("jokePockets", args, undefined);
}
export function useJumpChance(): number | undefined;
export function useJumpChance(arg: Placeholder<"Monster">): number | undefined;
export function useJumpChance(
  arg: Placeholder<"Monster">,
  init: number
): number | undefined;
export function useJumpChance(
  arg: Placeholder<"Monster">,
  init: number,
  ml: number
): number | undefined;
export function useJumpChance(arg: Placeholder<"Location">): number | undefined;
export function useJumpChance(
  arg: Placeholder<"Location">,
  init: number
): number | undefined;
export function useJumpChance(
  arg: Placeholder<"Location">,
  init: number,
  ml: number
): number | undefined;
export function useJumpChance(...args: unknown[]): number | undefined {
  return useFunctionInternal("jumpChance", args, undefined);
}
export function useKnollAvailable(): boolean | undefined;
export function useKnollAvailable(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("knollAvailable", args, undefined);
}
export function useLastChoice(): number | undefined;
export function useLastChoice(...args: unknown[]): number | undefined {
  return useFunctionInternal("lastChoice", args, undefined);
}
export function useLastDecision(): number | undefined;
export function useLastDecision(...args: unknown[]): number | undefined {
  return useFunctionInternal("lastDecision", args, undefined);
}
export function useLastIndexOf(
  source: string,
  search: string
): number | undefined;
export function useLastIndexOf(
  source: string,
  search: string,
  start: number
): number | undefined;
export function useLastIndexOf(...args: unknown[]): number | undefined {
  return useFunctionInternal("lastIndexOf", args, undefined);
}
export function useLastItemMessage(): string | undefined;
export function useLastItemMessage(...args: unknown[]): string | undefined {
  return useFunctionInternal("lastItemMessage", args, undefined);
}
export function useLastMonster(): types.Monster | undefined;
export function useLastMonster(...args: unknown[]): types.Monster | undefined {
  return useFunctionInternal("lastMonster", args, undefined);
}
export function useLastSkillMessage(): string | undefined;
export function useLastSkillMessage(...args: unknown[]): string | undefined {
  return useFunctionInternal("lastSkillMessage", args, undefined);
}
export function useLeetify(string: string): string | undefined;
export function useLeetify(...args: unknown[]): string | undefined {
  return useFunctionInternal("leetify", args, undefined);
}
export function useLength(string: string): number | undefined;
export function useLength(...args: unknown[]): number | undefined {
  return useFunctionInternal("length", args, undefined);
}
export function useLightningCost(
  skill: Placeholder<"Skill">
): number | undefined;
export function useLightningCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("lightningCost", args, undefined);
}
export function useLimitMode(): string | undefined;
export function useLimitMode(...args: unknown[]): string | undefined {
  return useFunctionInternal("limitMode", args, undefined);
}
export function useLoadHtml(string: string): string | undefined;
export function useLoadHtml(...args: unknown[]): string | undefined {
  return useFunctionInternal("loadHtml", args, undefined);
}
export function useLockFamiliarEquipment(lock: boolean): void | undefined;
export function useLockFamiliarEquipment(...args: unknown[]): void | undefined {
  return useFunctionInternal("lockFamiliarEquipment", args, undefined);
}
export function useLogN(arg: number): number | undefined;
export function useLogN(arg: number, base: number): number | undefined;
export function useLogN(...args: unknown[]): number | undefined {
  return useFunctionInternal("logN", args, undefined);
}
export function useLogprint(string: string): void | undefined;
export function useLogprint(...args: unknown[]): void | undefined {
  return useFunctionInternal("logprint", args, undefined);
}
export function useMakeUrl(
  arg1: string,
  arg2: boolean,
  arg3: boolean
): string | undefined;
export function useMakeUrl(...args: unknown[]): string | undefined {
  return useFunctionInternal("makeUrl", args, undefined);
}
export function useMallPrice(item: Placeholder<"Item">): number | undefined;
export function useMallPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("mallPrice", args, undefined);
}
export function useMallPrices(arg: { [key: number]: boolean }): number;
export function useMallPrices(arg: string): number | undefined;
export function useMallPrices(
  category: string,
  tiers: string
): number | undefined;
export function useMallPrices(...args: unknown[]): number | undefined {
  return useFunctionInternal("mallPrices", args, undefined);
}
export function useManaCostModifier(): number | undefined;
export function useManaCostModifier(...args: unknown[]): number | undefined {
  return useFunctionInternal("manaCostModifier", args, undefined);
}
export function useMapToFile(var1: any, var2: string): boolean | undefined;
export function useMapToFile(
  var1: any,
  var2: string,
  var3: boolean
): boolean | undefined;
export function useMapToFile(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("mapToFile", args, undefined);
}
export function useMax(arg1: number, arg2: number[]): number | undefined;
export function useMax(arg1: number, arg2: number[]): number | undefined;
export function useMax(...args: unknown[]): number | undefined {
  return useFunctionInternal("max", args, undefined);
}
export function useMaximize(
  maximizerStringValue: string,
  isSpeculateOnlyValue: boolean
): boolean | undefined;
export function useMaximize(
  maximizerStringValue: string,
  maxPriceValue: number,
  priceLevelValue: number,
  isSpeculateOnlyValue: boolean
): boolean | undefined;
export function useMaximize(
  maximizerStringValue: string,
  maxPriceValue: number,
  priceLevelValue: number,
  isSpeculateOnlyValue: boolean,
  showEquipment: boolean
): {
  display: string;
  command: string;
  score: number;
  effect: Placeholder<"Effect">;
  item: Placeholder<"Item">;
  skill: Placeholder<"Skill">;
}[];
export function useMaximize(...args: unknown[]):
  | boolean
  | {
      display: string;
      command: string;
      score: number;
      effect: Placeholder<"Effect">;
      item: Placeholder<"Item">;
      skill: Placeholder<"Skill">;
    }[]
  | undefined {
  return useFunctionInternal("maximize", args, undefined);
}
export function useMeatDrop(): number | undefined;
export function useMeatDrop(arg: Placeholder<"Monster">): number | undefined;
export function useMeatDrop(...args: unknown[]): number | undefined {
  return useFunctionInternal("meatDrop", args, undefined);
}
export function useMeatDropModifier(): number | undefined;
export function useMeatDropModifier(...args: unknown[]): number | undefined {
  return useFunctionInternal("meatDropModifier", args, undefined);
}
export function useMeatPockets(): { [key: number]: number } | undefined;
export function useMeatPockets(
  ...args: unknown[]
): { [key: number]: number } | undefined {
  return useFunctionInternal("meatPockets", args, undefined);
}
export function useMin(arg1: number, arg2: number[]): number | undefined;
export function useMin(arg1: number, arg2: number[]): number | undefined;
export function useMin(...args: unknown[]): number | undefined {
  return useFunctionInternal("min", args, undefined);
}
export function useMinstrelInstrument(): types.Item | undefined;
export function useMinstrelInstrument(
  ...args: unknown[]
): types.Item | undefined {
  return useFunctionInternal("minstrelInstrument", args, undefined);
}
export function useMinstrelLevel(): number | undefined;
export function useMinstrelLevel(...args: unknown[]): number | undefined {
  return useFunctionInternal("minstrelLevel", args, undefined);
}
export function useMinstrelQuest(): boolean | undefined;
export function useMinstrelQuest(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("minstrelQuest", args, undefined);
}
export function useModifierEval(expr: string): number | undefined;
export function useModifierEval(...args: unknown[]): number | undefined {
  return useFunctionInternal("modifierEval", args, undefined);
}
export function useMonsterAttack(): number | undefined;
export function useMonsterAttack(
  arg: Placeholder<"Monster">
): number | undefined;
export function useMonsterAttack(...args: unknown[]): number | undefined {
  return useFunctionInternal("monsterAttack", args, undefined);
}
export function useMonsterDefense(): number | undefined;
export function useMonsterDefense(
  arg: Placeholder<"Monster">
): number | undefined;
export function useMonsterDefense(...args: unknown[]): number | undefined {
  return useFunctionInternal("monsterDefense", args, undefined);
}
export function useMonsterElement(): types.Element | undefined;
export function useMonsterElement(
  arg: Placeholder<"Monster">
): types.Element | undefined;
export function useMonsterElement(
  ...args: unknown[]
): types.Element | undefined {
  return useFunctionInternal("monsterElement", args, undefined);
}
export function useMonsterEval(expr: string): number | undefined;
export function useMonsterEval(...args: unknown[]): number | undefined {
  return useFunctionInternal("monsterEval", args, undefined);
}
export function useMonsterFactoidsAvailable(
  arg1: Placeholder<"Monster">,
  arg2: boolean
): number | undefined;
export function useMonsterFactoidsAvailable(
  ...args: unknown[]
): number | undefined {
  return useFunctionInternal("monsterFactoidsAvailable", args, undefined);
}
export function useMonsterHp(): number | undefined;
export function useMonsterHp(arg: Placeholder<"Monster">): number | undefined;
export function useMonsterHp(...args: unknown[]): number | undefined {
  return useFunctionInternal("monsterHp", args, undefined);
}
export function useMonsterInitiative(): number | undefined;
export function useMonsterInitiative(
  arg: Placeholder<"Monster">
): number | undefined;
export function useMonsterInitiative(...args: unknown[]): number | undefined {
  return useFunctionInternal("monsterInitiative", args, undefined);
}
export function useMonsterLevelAdjustment(): number | undefined;
export function useMonsterLevelAdjustment(
  ...args: unknown[]
): number | undefined {
  return useFunctionInternal("monsterLevelAdjustment", args, undefined);
}
export function useMonsterManuelText(
  arg: Placeholder<"Monster">
): string | undefined;
export function useMonsterManuelText(...args: unknown[]): string | undefined {
  return useFunctionInternal("monsterManuelText", args, undefined);
}
export function useMonsterModifier(
  arg: Placeholder<"Effect">,
  modifier: string
): types.Monster | undefined;
export function useMonsterModifier(
  ...args: unknown[]
): types.Monster | undefined {
  return useFunctionInternal("monsterModifier", args, undefined);
}
export function useMonsterPhylum(): types.Phylum | undefined;
export function useMonsterPhylum(
  arg: Placeholder<"Monster">
): types.Phylum | undefined;
export function useMonsterPhylum(...args: unknown[]): types.Phylum | undefined {
  return useFunctionInternal("monsterPhylum", args, undefined);
}
export function useMonsterPockets(): { [key: number]: boolean } | undefined;
export function useMonsterPockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("monsterPockets", args, undefined);
}
export function useMoodExecute(multiplicity: number): void | undefined;
export function useMoodExecute(...args: unknown[]): void | undefined {
  return useFunctionInternal("moodExecute", args, undefined);
}
export function useMoodList(): string[] | undefined;
export function useMoodList(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("moodList", args, undefined);
}
export function useMoonLight(): number | undefined;
export function useMoonLight(...args: unknown[]): number | undefined {
  return useFunctionInternal("moonLight", args, undefined);
}
export function useMoonPhase(): number | undefined;
export function useMoonPhase(...args: unknown[]): number | undefined {
  return useFunctionInternal("moonPhase", args, undefined);
}
export function useMpCost(skill: Placeholder<"Skill">): number | undefined;
export function useMpCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("mpCost", args, undefined);
}
export function useMyAbsorbs(): number | undefined;
export function useMyAbsorbs(...args: unknown[]): number | undefined {
  return useFunctionInternal("myAbsorbs", args, undefined);
}
export function useMyAdventures(): number | undefined;
export function useMyAdventures(...args: unknown[]): number | undefined {
  return useFunctionInternal("myAdventures", args, undefined);
}
export function useMyAscensions(): number | undefined;
export function useMyAscensions(...args: unknown[]): number | undefined {
  return useFunctionInternal("myAscensions", args, undefined);
}
export function useMyAudience(): number | undefined;
export function useMyAudience(...args: unknown[]): number | undefined {
  return useFunctionInternal("myAudience", args, undefined);
}
export function useMyBasestat(arg: Placeholder<"Stat">): number | undefined;
export function useMyBasestat(...args: unknown[]): number | undefined {
  return useFunctionInternal("myBasestat", args, undefined);
}
export function useMyBjornedFamiliar(): types.Familiar | undefined;
export function useMyBjornedFamiliar(
  ...args: unknown[]
): types.Familiar | undefined {
  return useFunctionInternal("myBjornedFamiliar", args, undefined);
}
export function useMyBuffedstat(arg: Placeholder<"Stat">): number | undefined;
export function useMyBuffedstat(...args: unknown[]): number | undefined {
  return useFunctionInternal("myBuffedstat", args, undefined);
}
export function useMyClass(): types.Class | undefined;
export function useMyClass(...args: unknown[]): types.Class | undefined {
  return useFunctionInternal("myClass", args, undefined);
}
export function useMyClosetMeat(): number | undefined;
export function useMyClosetMeat(...args: unknown[]): number | undefined {
  return useFunctionInternal("myClosetMeat", args, undefined);
}
export function useMyCompanion(): string | undefined;
export function useMyCompanion(...args: unknown[]): string | undefined {
  return useFunctionInternal("myCompanion", args, undefined);
}
export function useMyDaycount(): number | undefined;
export function useMyDaycount(...args: unknown[]): number | undefined {
  return useFunctionInternal("myDaycount", args, undefined);
}
export function useMyDiscomomentum(): number | undefined;
export function useMyDiscomomentum(...args: unknown[]): number | undefined {
  return useFunctionInternal("myDiscomomentum", args, undefined);
}
export function useMyEffectiveFamiliar(): types.Familiar | undefined;
export function useMyEffectiveFamiliar(
  ...args: unknown[]
): types.Familiar | undefined {
  return useFunctionInternal("myEffectiveFamiliar", args, undefined);
}
export function useMyEffects(): { [effect: string]: number } | undefined;
export function useMyEffects(
  ...args: unknown[]
): { [effect: string]: number } | undefined {
  return useFunctionInternal("myEffects", args, undefined);
}
export function useMyEnthronedFamiliar(): types.Familiar | undefined;
export function useMyEnthronedFamiliar(
  ...args: unknown[]
): types.Familiar | undefined {
  return useFunctionInternal("myEnthronedFamiliar", args, undefined);
}
export function useMyFamiliar(): types.Familiar | undefined;
export function useMyFamiliar(...args: unknown[]): types.Familiar | undefined {
  return useFunctionInternal("myFamiliar", args, undefined);
}
export function useMyFullness(): number | undefined;
export function useMyFullness(...args: unknown[]): number | undefined {
  return useFunctionInternal("myFullness", args, undefined);
}
export function useMyFury(): number | undefined;
export function useMyFury(...args: unknown[]): number | undefined {
  return useFunctionInternal("myFury", args, undefined);
}
export function useMyGardenType(): string | undefined;
export function useMyGardenType(...args: unknown[]): string | undefined {
  return useFunctionInternal("myGardenType", args, undefined);
}
export function useMyHash(): string | undefined;
export function useMyHash(...args: unknown[]): string | undefined {
  return useFunctionInternal("myHash", args, undefined);
}
export function useMyHp(): number | undefined;
export function useMyHp(...args: unknown[]): number | undefined {
  return useFunctionInternal("myHp", args, undefined);
}
export function useMyId(): string | undefined;
export function useMyId(...args: unknown[]): string | undefined {
  return useFunctionInternal("myId", args, undefined);
}
export function useMyInebriety(): number | undefined;
export function useMyInebriety(...args: unknown[]): number | undefined {
  return useFunctionInternal("myInebriety", args, undefined);
}
export function useMyLevel(): number | undefined;
export function useMyLevel(...args: unknown[]): number | undefined {
  return useFunctionInternal("myLevel", args, undefined);
}
export function useMyLightning(): number | undefined;
export function useMyLightning(...args: unknown[]): number | undefined {
  return useFunctionInternal("myLightning", args, undefined);
}
export function useMyLocation(): types.Location | undefined;
export function useMyLocation(...args: unknown[]): types.Location | undefined {
  return useFunctionInternal("myLocation", args, undefined);
}
export function useMyMask(): string | undefined;
export function useMyMask(...args: unknown[]): string | undefined {
  return useFunctionInternal("myMask", args, undefined);
}
export function useMyMaxfury(): number | undefined;
export function useMyMaxfury(...args: unknown[]): number | undefined {
  return useFunctionInternal("myMaxfury", args, undefined);
}
export function useMyMaxhp(): number | undefined;
export function useMyMaxhp(...args: unknown[]): number | undefined {
  return useFunctionInternal("myMaxhp", args, undefined);
}
export function useMyMaxmp(): number | undefined;
export function useMyMaxmp(...args: unknown[]): number | undefined {
  return useFunctionInternal("myMaxmp", args, undefined);
}
export function useMyMaxpp(): number | undefined;
export function useMyMaxpp(...args: unknown[]): number | undefined {
  return useFunctionInternal("myMaxpp", args, undefined);
}
export function useMyMeat(): number | undefined;
export function useMyMeat(...args: unknown[]): number | undefined {
  return useFunctionInternal("myMeat", args, undefined);
}
export function useMyMp(): number | undefined;
export function useMyMp(...args: unknown[]): number | undefined {
  return useFunctionInternal("myMp", args, undefined);
}
export function useMyName(): string | undefined;
export function useMyName(...args: unknown[]): string | undefined {
  return useFunctionInternal("myName", args, undefined);
}
export function useMyPath(): string | undefined;
export function useMyPath(...args: unknown[]): string | undefined {
  return useFunctionInternal("myPath", args, undefined);
}
export function useMyPathId(): number | undefined;
export function useMyPathId(...args: unknown[]): number | undefined {
  return useFunctionInternal("myPathId", args, undefined);
}
export function useMyPokeFam(arg: number): types.Familiar | undefined;
export function useMyPokeFam(...args: unknown[]): types.Familiar | undefined {
  return useFunctionInternal("myPokeFam", args, undefined);
}
export function useMyPp(): number | undefined;
export function useMyPp(...args: unknown[]): number | undefined {
  return useFunctionInternal("myPp", args, undefined);
}
export function useMyPrimestat(): types.Stat | undefined;
export function useMyPrimestat(...args: unknown[]): types.Stat | undefined {
  return useFunctionInternal("myPrimestat", args, undefined);
}
export function useMyRain(): number | undefined;
export function useMyRain(...args: unknown[]): number | undefined {
  return useFunctionInternal("myRain", args, undefined);
}
export function useMyRobotEnergy(): number | undefined;
export function useMyRobotEnergy(...args: unknown[]): number | undefined {
  return useFunctionInternal("myRobotEnergy", args, undefined);
}
export function useMyRobotScraps(): number | undefined;
export function useMyRobotScraps(...args: unknown[]): number | undefined {
  return useFunctionInternal("myRobotScraps", args, undefined);
}
export function useMyServant(): types.Servant | undefined;
export function useMyServant(...args: unknown[]): types.Servant | undefined {
  return useFunctionInternal("myServant", args, undefined);
}
export function useMySessionAdv(): number | undefined;
export function useMySessionAdv(...args: unknown[]): number | undefined {
  return useFunctionInternal("mySessionAdv", args, undefined);
}
export function useMySessionItems(): { [item: string]: number } | undefined;
export function useMySessionItems(
  item: Placeholder<"Item">
): number | undefined;
export function useMySessionItems(
  ...args: unknown[]
): { [item: string]: number } | number | undefined {
  return useFunctionInternal("mySessionItems", args, undefined);
}
export function useMySessionMeat(): number | undefined;
export function useMySessionMeat(...args: unknown[]): number | undefined {
  return useFunctionInternal("mySessionMeat", args, undefined);
}
export function useMySessionResults(): { [key: string]: number } | undefined;
export function useMySessionResults(
  ...args: unknown[]
): { [key: string]: number } | undefined {
  return useFunctionInternal("mySessionResults", args, undefined);
}
export function useMySign(): string | undefined;
export function useMySign(...args: unknown[]): string | undefined {
  return useFunctionInternal("mySign", args, undefined);
}
export function useMySoulsauce(): number | undefined;
export function useMySoulsauce(...args: unknown[]): number | undefined {
  return useFunctionInternal("mySoulsauce", args, undefined);
}
export function useMySpleenUse(): number | undefined;
export function useMySpleenUse(...args: unknown[]): number | undefined {
  return useFunctionInternal("mySpleenUse", args, undefined);
}
export function useMyStorageMeat(): number | undefined;
export function useMyStorageMeat(...args: unknown[]): number | undefined {
  return useFunctionInternal("myStorageMeat", args, undefined);
}
export function useMyThrall(): types.Thrall | undefined;
export function useMyThrall(...args: unknown[]): types.Thrall | undefined {
  return useFunctionInternal("myThrall", args, undefined);
}
export function useMyThunder(): number | undefined;
export function useMyThunder(...args: unknown[]): number | undefined {
  return useFunctionInternal("myThunder", args, undefined);
}
export function useMyTurncount(): number | undefined;
export function useMyTurncount(...args: unknown[]): number | undefined {
  return useFunctionInternal("myTurncount", args, undefined);
}
export function useMyVykeaCompanion(): types.Vykea | undefined;
export function useMyVykeaCompanion(
  ...args: unknown[]
): types.Vykea | undefined {
  return useFunctionInternal("myVykeaCompanion", args, undefined);
}
export function useMyWildfireWater(): number | undefined;
export function useMyWildfireWater(...args: unknown[]): number | undefined {
  return useFunctionInternal("myWildfireWater", args, undefined);
}
export function useNowToInt(): number | undefined;
export function useNowToInt(...args: unknown[]): number | undefined {
  return useFunctionInternal("nowToInt", args, undefined);
}
export function useNowToString(dateFormatValue: string): string | undefined;
export function useNowToString(...args: unknown[]): string | undefined {
  return useFunctionInternal("nowToString", args, undefined);
}
export function useNpcPrice(item: Placeholder<"Item">): number | undefined;
export function useNpcPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("npcPrice", args, undefined);
}
export function useNumberologyPrize(num: number): string | undefined;
export function useNumberologyPrize(...args: unknown[]): string | undefined {
  return useFunctionInternal("numberologyPrize", args, undefined);
}
export function useNumericModifier(
  ...args:
    | []
    | [modifier: string]
    | [
        arg:
          | string
          | Placeholder<"Item">
          | Placeholder<"Effect">
          | Placeholder<"Skill">
          | Placeholder<"Familiar">
          | Placeholder<"Item">,
        modifier: string
      ]
    | [
        familiar: Placeholder<"Familiar">,
        modifier: string,
        weight: number,
        item: Placeholder<"Item">
      ]
): number | undefined;
export function useNumericModifier(...args: unknown[]): number | undefined {
  return useFunctionInternal("numericModifier", args, undefined);
}
export function useOutfit(outfit: string): boolean | undefined;
export function useOutfit(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("outfit", args, undefined);
}
export function useOutfitPieces(
  outfit: string
): Placeholder<"Item">[] | undefined;
export function useOutfitPieces(
  ...args: unknown[]
): Placeholder<"Item">[] | undefined {
  return useFunctionInternal("outfitPieces", args, undefined);
}
export function useOutfitTattoo(outfit: string): string | undefined;
export function useOutfitTattoo(...args: unknown[]): string | undefined {
  return useFunctionInternal("outfitTattoo", args, undefined);
}
export function useOutfitTreats(
  outfit: string
): { [item: string]: number } | undefined;
export function useOutfitTreats(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("outfitTreats", args, undefined);
}
export function useOverdrink(item: Placeholder<"Item">): boolean | undefined;
export function useOverdrink(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useOverdrink(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useOverdrink(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("overdrink", args, undefined);
}
export function usePathIdToName(value: number): string | undefined;
export function usePathIdToName(...args: unknown[]): string | undefined {
  return useFunctionInternal("pathIdToName", args, undefined);
}
export function usePathNameToId(value: string): number | undefined;
export function usePathNameToId(...args: unknown[]): number | undefined {
  return useFunctionInternal("pathNameToId", args, undefined);
}
export function usePickPocket(arg: Placeholder<"Monster">): boolean | undefined;
export function usePickPocket(arg: Placeholder<"Effect">):
  | {
      [effect: string]: number;
    }
  | undefined;
export function usePickPocket(arg: Placeholder<"Item">):
  | {
      [item: string]: number;
    }
  | undefined;
export function usePickPocket(arg: Placeholder<"Stat">):
  | {
      [stat: string]: number;
    }
  | undefined;
export function usePickPocket(arg: number): boolean | undefined;
export function usePickPocket(...args: unknown[]):
  | {
      [effect: string]: number;
    }
  | {
      [item: string]: number;
    }
  | boolean
  | undefined {
  return useFunctionInternal("pickPocket", args, undefined);
}
export function usePickedPockets(): { [key: number]: boolean } | undefined;
export function usePickedPockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("pickedPockets", args, undefined);
}
export function usePickedScraps(): { [key: number]: boolean } | undefined;
export function usePickedScraps(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("pickedScraps", args, undefined);
}
export function usePocketEffects(
  pocket: number
): { [effect: string]: number } | undefined;
export function usePocketEffects(
  ...args: unknown[]
): { [effect: string]: number } | undefined {
  return useFunctionInternal("pocketEffects", args, undefined);
}
export function usePocketItems(
  pocket: number
): { [item: string]: number } | undefined;
export function usePocketItems(
  ...args: unknown[]
): { [item: string]: number } | undefined {
  return useFunctionInternal("pocketItems", args, undefined);
}
export function usePocketJoke(pocket: number): string | undefined;
export function usePocketJoke(...args: unknown[]): string | undefined {
  return useFunctionInternal("pocketJoke", args, undefined);
}
export function usePocketMeat(
  pocket: number
): { [key: number]: string } | undefined;
export function usePocketMeat(
  ...args: unknown[]
): { [key: number]: string } | undefined {
  return useFunctionInternal("pocketMeat", args, undefined);
}
export function usePocketMonster(pocket: number): types.Monster | undefined;
export function usePocketMonster(
  ...args: unknown[]
): types.Monster | undefined {
  return useFunctionInternal("pocketMonster", args, undefined);
}
export function usePocketPoem(
  pocket: number
): { [key: number]: string } | undefined;
export function usePocketPoem(
  ...args: unknown[]
): { [key: number]: string } | undefined {
  return useFunctionInternal("pocketPoem", args, undefined);
}
export function usePocketScrap(
  pocket: number
): { [key: number]: string } | undefined;
export function usePocketScrap(
  ...args: unknown[]
): { [key: number]: string } | undefined {
  return useFunctionInternal("pocketScrap", args, undefined);
}
export function usePocketStats(
  pocket: number
): { [stat: string]: number } | undefined;
export function usePocketStats(
  ...args: unknown[]
): { [stat: string]: number } | undefined {
  return useFunctionInternal("pocketStats", args, undefined);
}
export function usePoemPockets(): { [key: number]: number } | undefined;
export function usePoemPockets(
  ...args: unknown[]
): { [key: number]: number } | undefined {
  return useFunctionInternal("poemPockets", args, undefined);
}
export function usePotentialPockets(arg: Placeholder<"Monster">):
  | {
      [key: number]: number;
    }
  | undefined;
export function usePotentialPockets(arg: Placeholder<"Effect">):
  | {
      [key: number]: number;
    }
  | undefined;
export function usePotentialPockets(arg: Placeholder<"Item">):
  | {
      [key: number]: number;
    }
  | undefined;
export function usePotentialPockets(arg: Placeholder<"Stat">):
  | {
      [key: number]: number;
    }
  | undefined;
export function usePotentialPockets(...args: unknown[]):
  | {
      [key: number]: number;
    }
  | undefined {
  return useFunctionInternal("potentialPockets", args, undefined);
}
export function usePrint(): void | undefined;
export function usePrint(string: string): void | undefined;
export function usePrint(string: string, color: string): void | undefined;
export function usePrint(...args: unknown[]): void | undefined {
  return useFunctionInternal("print", args, undefined);
}
export function usePrintHtml(string: string): void | undefined;
export function usePrintHtml(...args: unknown[]): void | undefined {
  return useFunctionInternal("printHtml", args, undefined);
}
export function usePropertyDefaultValue(nameValue: string): string | undefined;
export function usePropertyDefaultValue(
  ...args: unknown[]
): string | undefined {
  return useFunctionInternal("propertyDefaultValue", args, undefined);
}
export function usePropertyExists(nameValue: string): boolean | undefined;
export function usePropertyExists(
  nameValue: string,
  globalValue: boolean
): boolean | undefined;
export function usePropertyExists(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("propertyExists", args, undefined);
}
export function usePropertyHasDefault(nameValue: string): boolean | undefined;
export function usePropertyHasDefault(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("propertyHasDefault", args, undefined);
}
export function usePullsRemaining(): number | undefined;
export function usePullsRemaining(...args: unknown[]): number | undefined {
  return useFunctionInternal("pullsRemaining", args, undefined);
}
export function usePutCloset(arg1: number): boolean | undefined;
export function usePutCloset(arg1: Placeholder<"Item">): boolean | undefined;
export function usePutCloset(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function usePutCloset(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function usePutCloset(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("putCloset", args, undefined);
}
export function usePutDisplay(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function usePutDisplay(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function usePutDisplay(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("putDisplay", args, undefined);
}
export function usePutShop(
  priceValue: number,
  limitValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function usePutShop(
  priceValue: number,
  limitValue: number,
  qtyValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function usePutShop(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("putShop", args, undefined);
}
export function usePutShopUsingStorage(
  priceValue: number,
  limitValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function usePutShopUsingStorage(
  priceValue: number,
  limitValue: number,
  qtyValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function usePutShopUsingStorage(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("putShopUsingStorage", args, undefined);
}
export function usePutStash(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function usePutStash(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function usePutStash(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("putStash", args, undefined);
}
export function usePvpAttacksLeft(): number | undefined;
export function usePvpAttacksLeft(...args: unknown[]): number | undefined {
  return useFunctionInternal("pvpAttacksLeft", args, undefined);
}
export function useRainCost(skill: Placeholder<"Skill">): number | undefined;
export function useRainCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("rainCost", args, undefined);
}
export function useRandom(arg: number): number | undefined;
export function useRandom(...args: unknown[]): number | undefined {
  return useFunctionInternal("random", args, undefined);
}
export function useRawDamageAbsorption(): number | undefined;
export function useRawDamageAbsorption(...args: unknown[]): number | undefined {
  return useFunctionInternal("rawDamageAbsorption", args, undefined);
}
export function useRefreshShop(): boolean | undefined;
export function useRefreshShop(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("refreshShop", args, undefined);
}
export function useRefreshStash(): boolean | undefined;
export function useRefreshStash(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("refreshStash", args, undefined);
}
export function useRefreshStatus(): boolean | undefined;
export function useRefreshStatus(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("refreshStatus", args, undefined);
}
export function useRemoveItemCondition(
  arg1: number,
  arg2: Placeholder<"Item">
): void | undefined;
export function useRemoveItemCondition(
  arg1: Placeholder<"Item">,
  arg2: number
): void | undefined;
export function useRemoveItemCondition(...args: unknown[]): void | undefined {
  return useFunctionInternal("removeItemCondition", args, undefined);
}
export function useRemoveProperty(nameValue: string): string | undefined;
export function useRemoveProperty(
  nameValue: string,
  globalValue: boolean
): string | undefined;
export function useRemoveProperty(...args: unknown[]): string | undefined {
  return useFunctionInternal("removeProperty", args, undefined);
}
export function useRenameProperty(
  oldNameValue: string,
  newNameValue: string
): boolean | undefined;
export function useRenameProperty(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("renameProperty", args, undefined);
}
export function useReplace(
  buffer: string,
  start: number,
  finish: number,
  s: string
): string | undefined;
export function useReplace(...args: unknown[]): string | undefined {
  return useFunctionInternal("replace", args, undefined);
}
export function useReplaceString(
  source: string,
  searchValue: string,
  replaceValue: string
): string | undefined;
export function useReplaceString(
  source: string,
  searchValue: string,
  replaceValue: string
): string | undefined;
export function useReplaceString(...args: unknown[]): string | undefined {
  return useFunctionInternal("replaceString", args, undefined);
}
export function useRepriceShop(
  priceValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function useRepriceShop(
  priceValue: number,
  limitValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function useRepriceShop(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("repriceShop", args, undefined);
}
export function useRestorationPockets(): { [key: number]: boolean } | undefined;
export function useRestorationPockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("restorationPockets", args, undefined);
}
export function useRestoreHp(amount: number): boolean | undefined;
export function useRestoreHp(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("restoreHp", args, undefined);
}
export function useRestoreMp(amount: number): boolean | undefined;
export function useRestoreMp(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("restoreMp", args, undefined);
}
export function useRetrieveItem(item: Placeholder<"Item">): boolean | undefined;
export function useRetrieveItem(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useRetrieveItem(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useRetrieveItem(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("retrieveItem", args, undefined);
}
export function useReverseNumberology(): { [key: number]: number } | undefined;
export function useReverseNumberology(
  advDelta: number,
  spleenDelta: number
): { [key: number]: number } | undefined;
export function useReverseNumberology(
  ...args: unknown[]
): { [key: number]: number } | undefined {
  return useFunctionInternal("reverseNumberology", args, undefined);
}
export function useRollover(): number | undefined;
export function useRollover(...args: unknown[]): number | undefined {
  return useFunctionInternal("rollover", args, undefined);
}
export function useRound(arg: number): number | undefined;
export function useRound(...args: unknown[]): number | undefined {
  return useFunctionInternal("round", args, undefined);
}
export function useRunChoice(decision: number): string | undefined;
export function useRunChoice(
  decision: number,
  extra: string
): string | undefined;
export function useRunChoice(
  decision: number,
  extra: boolean
): string | undefined;
export function useRunChoice(
  decision: number,
  custom: boolean,
  more: string
): string | undefined;
export function useRunChoice(...args: unknown[]): string | undefined {
  return useFunctionInternal("runChoice", args, undefined);
}
export function useRunCombat(): string | undefined;
export function useRunCombat(
  filterFunction:
    | string
    | ((round: number, monster: Placeholder<"Monster">, text: string) => string)
): string | undefined;
export function useRunCombat(...args: unknown[]): string | undefined {
  return useFunctionInternal("runCombat", args, undefined);
}
export function useRunTurn(): string | undefined;
export function useRunTurn(...args: unknown[]): string | undefined {
  return useFunctionInternal("runTurn", args, undefined);
}
export function useRunaway(): string | undefined;
export function useRunaway(...args: unknown[]): string | undefined {
  return useFunctionInternal("runaway", args, undefined);
}
export function useScrapPockets(): { [key: number]: number } | undefined;
export function useScrapPockets(
  ...args: unknown[]
): { [key: number]: number } | undefined {
  return useFunctionInternal("scrapPockets", args, undefined);
}
export function useSell(
  master: Placeholder<"Coinmaster">,
  countValue: number,
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function useSell(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("sell", args, undefined);
}
export function useSellPrice(
  master: Placeholder<"Coinmaster">,
  item: Placeholder<"Item">
): number | undefined;
export function useSellPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("sellPrice", args, undefined);
}
export function useSellsItem(
  master: Placeholder<"Coinmaster">,
  item: Placeholder<"Item">
): boolean | undefined;
export function useSellsItem(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("sellsItem", args, undefined);
}
export function useSessionLogs(dayCount: number): string[] | undefined;
export function useSessionLogs(
  player: string,
  dayCount: number
): string[] | undefined;
export function useSessionLogs(
  playerName: string,
  baseDate: string,
  count: number
): string[] | undefined;
export function useSessionLogs(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("sessionLogs", args, undefined);
}
export function useSetAutoAttack(attackValue: number): void | undefined;
export function useSetAutoAttack(attackValue: string): void | undefined;
export function useSetAutoAttack(...args: unknown[]): void | undefined {
  return useFunctionInternal("setAutoAttack", args, undefined);
}
export function useSetLength(buffer: string, i: number): void | undefined;
export function useSetLength(...args: unknown[]): void | undefined {
  return useFunctionInternal("setLength", args, undefined);
}
export function useSetLocation(
  location: Placeholder<"Location">
): void | undefined;
export function useSetLocation(...args: unknown[]): void | undefined {
  return useFunctionInternal("setLocation", args, undefined);
}
export function useSetProperty(
  nameValue: string,
  value: string
): void | undefined;
export function useSetProperty(...args: unknown[]): void | undefined {
  return useFunctionInternal("setProperty", args, undefined);
}
export function useShopAmount(arg: Placeholder<"Item">): number | undefined;
export function useShopAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("shopAmount", args, undefined);
}
export function useShopLimit(arg: Placeholder<"Item">): number | undefined;
export function useShopLimit(...args: unknown[]): number | undefined {
  return useFunctionInternal("shopLimit", args, undefined);
}
export function useShopPrice(item: Placeholder<"Item">): number | undefined;
export function useShopPrice(...args: unknown[]): number | undefined {
  return useFunctionInternal("shopPrice", args, undefined);
}
export function useSkillModifier(
  arg: string | Placeholder<"Item">,
  modifier: string
): types.Skill | undefined;
export function useSkillModifier(...args: unknown[]): types.Skill | undefined {
  return useFunctionInternal("skillModifier", args, undefined);
}
export function useSlashCount(arg: Placeholder<"Item">): number | undefined;
export function useSlashCount(...args: unknown[]): number | undefined {
  return useFunctionInternal("slashCount", args, undefined);
}
export function useSoulsauceCost(
  skill: Placeholder<"Skill">
): number | undefined;
export function useSoulsauceCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("soulsauceCost", args, undefined);
}
export function useSpleenLimit(): number | undefined;
export function useSpleenLimit(...args: unknown[]): number | undefined {
  return useFunctionInternal("spleenLimit", args, undefined);
}
export function useSplitString(string: string): string[] | undefined;
export function useSplitString(
  string: string,
  regex: string
): string[] | undefined;
export function useSplitString(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("splitString", args, undefined);
}
export function useSquareRoot(val: number): number | undefined;
export function useSquareRoot(...args: unknown[]): number | undefined {
  return useFunctionInternal("squareRoot", args, undefined);
}
export function useStartsWith(
  source: string,
  prefix: string
): boolean | undefined;
export function useStartsWith(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("startsWith", args, undefined);
}
export function useStashAmount(arg: Placeholder<"Item">): number | undefined;
export function useStashAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("stashAmount", args, undefined);
}
export function useStatBonusToday(): types.Stat | undefined;
export function useStatBonusToday(...args: unknown[]): types.Stat | undefined {
  return useFunctionInternal("statBonusToday", args, undefined);
}
export function useStatBonusTomorrow(): types.Stat | undefined;
export function useStatBonusTomorrow(
  ...args: unknown[]
): types.Stat | undefined {
  return useFunctionInternal("statBonusTomorrow", args, undefined);
}
export function useStatModifier(
  arg: Placeholder<"Effect">,
  modifier: string
): types.Stat | undefined;
export function useStatModifier(...args: unknown[]): types.Stat | undefined {
  return useFunctionInternal("statModifier", args, undefined);
}
export function useStatsPockets(): { [key: number]: boolean } | undefined;
export function useStatsPockets(
  ...args: unknown[]
): { [key: number]: boolean } | undefined {
  return useFunctionInternal("statsPockets", args, undefined);
}
export function useSteal(): string | undefined;
export function useSteal(...args: unknown[]): string | undefined {
  return useFunctionInternal("steal", args, undefined);
}
export function useStillsAvailable(): number | undefined;
export function useStillsAvailable(...args: unknown[]): number | undefined {
  return useFunctionInternal("stillsAvailable", args, undefined);
}
export function useStopCounter(label: string): void | undefined;
export function useStopCounter(...args: unknown[]): void | undefined {
  return useFunctionInternal("stopCounter", args, undefined);
}
export function useStorageAmount(arg: Placeholder<"Item">): number | undefined;
export function useStorageAmount(...args: unknown[]): number | undefined {
  return useFunctionInternal("storageAmount", args, undefined);
}
export function useStringModifier(
  ...args:
    | [modifier: string]
    | [
        arg: string | Placeholder<"Item"> | Placeholder<"Effect">,
        modifier: string
      ]
): string | undefined;
export function useStringModifier(...args: unknown[]): string | undefined {
  return useFunctionInternal("stringModifier", args, undefined);
}
export function useStunSkill(): types.Skill | undefined;
export function useStunSkill(...args: unknown[]): types.Skill | undefined {
  return useFunctionInternal("stunSkill", args, undefined);
}
export function useSubstring(source: string, start: number): string | undefined;
export function useSubstring(
  source: string,
  start: number,
  finish: number
): string | undefined;
export function useSubstring(...args: unknown[]): string | undefined {
  return useFunctionInternal("substring", args, undefined);
}
export function useSvnAtHead(project: string): boolean | undefined;
export function useSvnAtHead(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("svnAtHead", args, undefined);
}
export function useSvnExists(project: string): boolean | undefined;
export function useSvnExists(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("svnExists", args, undefined);
}
export function useSvnInfo(script: string):
  | {
      url: string;
      revision: number;
      last_changed_author: string;
      last_changed_rev: number;
      last_changed_date: string;
    }
  | undefined;
export function useSvnInfo(...args: unknown[]):
  | {
      url: string;
      revision: number;
      last_changed_author: string;
      last_changed_rev: number;
      last_changed_date: string;
    }
  | undefined {
  return useFunctionInternal("svnInfo", args, undefined);
}
export function useSweetSynthesis(
  effect: Placeholder<"Effect">
): boolean | undefined;
export function useSweetSynthesis(
  arg1: number,
  arg2: Placeholder<"Effect">
): boolean | undefined;
export function useSweetSynthesis(
  arg1: Placeholder<"Effect">,
  arg2: number
): boolean | undefined;
export function useSweetSynthesis(
  arg1: number,
  arg2: Placeholder<"Effect">,
  arg3: number
): boolean | undefined;
export function useSweetSynthesis(
  arg1: Placeholder<"Item">,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useSweetSynthesis(
  arg1: number,
  arg2: Placeholder<"Item">,
  arg3: Placeholder<"Item">
): boolean | undefined;
export function useSweetSynthesis(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("sweetSynthesis", args, undefined);
}
export function useSweetSynthesisPair(
  arg1: Placeholder<"Effect">
): Placeholder<"Item">[] | undefined;
export function useSweetSynthesisPair(
  arg1: Placeholder<"Effect">,
  arg2: number
): Placeholder<"Item">[] | undefined;
export function useSweetSynthesisPair(
  ...args: unknown[]
): Placeholder<"Item">[] | undefined {
  return useFunctionInternal("sweetSynthesisPair", args, undefined);
}
export function useSweetSynthesisPairing(
  arg1: Placeholder<"Effect">,
  arg2: Placeholder<"Item">
): Placeholder<"Item">[] | undefined;
export function useSweetSynthesisPairing(
  arg1: Placeholder<"Effect">,
  arg2: Placeholder<"Item">,
  arg3: number
): Placeholder<"Item">[] | undefined;
export function useSweetSynthesisPairing(
  ...args: unknown[]
): Placeholder<"Item">[] | undefined {
  return useFunctionInternal("sweetSynthesisPairing", args, undefined);
}
export function useSweetSynthesisResult(
  item1: Placeholder<"Item">,
  item2: Placeholder<"Item">
): types.Effect | undefined;
export function useSweetSynthesisResult(
  ...args: unknown[]
): types.Effect | undefined {
  return useFunctionInternal("sweetSynthesisResult", args, undefined);
}
export function useTakeCloset(arg1: number): boolean | undefined;
export function useTakeCloset(arg1: Placeholder<"Item">): boolean | undefined;
export function useTakeCloset(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useTakeCloset(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useTakeCloset(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("takeCloset", args, undefined);
}
export function useTakeDisplay(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useTakeDisplay(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useTakeDisplay(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("takeDisplay", args, undefined);
}
export function useTakeShop(
  itemValue: Placeholder<"Item">
): boolean | undefined;
export function useTakeShop(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useTakeShop(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("takeShop", args, undefined);
}
export function useTakeStash(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useTakeStash(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useTakeStash(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("takeStash", args, undefined);
}
export function useTakeStorage(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useTakeStorage(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useTakeStorage(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("takeStorage", args, undefined);
}
export function useTavern(): number | undefined;
export function useTavern(arg: string): number | undefined;
export function useTavern(...args: unknown[]): number | undefined {
  return useFunctionInternal("tavern", args, undefined);
}
export function useThrowItem(item: Placeholder<"Item">): string | undefined;
export function useThrowItem(...args: unknown[]): string | undefined {
  return useFunctionInternal("throwItem", args, undefined);
}
export function useThrowItems(
  item1: Placeholder<"Item">,
  item2: Placeholder<"Item">
): string | undefined;
export function useThrowItems(...args: unknown[]): string | undefined {
  return useFunctionInternal("throwItems", args, undefined);
}
export function useThunderCost(skill: Placeholder<"Skill">): number | undefined;
export function useThunderCost(...args: unknown[]): number | undefined {
  return useFunctionInternal("thunderCost", args, undefined);
}
export function useTimeToString(): string | undefined;
export function useTimeToString(...args: unknown[]): string | undefined {
  return useFunctionInternal("timeToString", args, undefined);
}
export function useTimestampToDate(
  timestamp: number,
  outFormat: string
): string | undefined;
export function useTimestampToDate(...args: unknown[]): string | undefined {
  return useFunctionInternal("timestampToDate", args, undefined);
}
export function useToBoolean(
  value: string | boolean | number
): boolean | undefined;
export function useToBoolean(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("toBoolean", args, undefined);
}
export function useToBounty(value: string): types.Bounty | undefined;
export function useToBounty(...args: unknown[]): types.Bounty | undefined {
  return useFunctionInternal("toBounty", args, undefined);
}
export function useToClass(value: string | number): types.Class | undefined;
export function useToClass(...args: unknown[]): types.Class | undefined {
  return useFunctionInternal("toClass", args, undefined);
}
export function useToCoinmaster(value: string): types.Coinmaster | undefined;
export function useToCoinmaster(
  ...args: unknown[]
): types.Coinmaster | undefined {
  return useFunctionInternal("toCoinmaster", args, undefined);
}
export function useToEffect(
  value: string | number | Placeholder<"Skill">
): types.Effect | undefined;
export function useToEffect(...args: unknown[]): types.Effect | undefined {
  return useFunctionInternal("toEffect", args, undefined);
}
export function useToElement(value: string): types.Element | undefined;
export function useToElement(...args: unknown[]): types.Element | undefined {
  return useFunctionInternal("toElement", args, undefined);
}
export function useToFamiliar(
  value: string | number
): types.Familiar | undefined;
export function useToFamiliar(...args: unknown[]): types.Familiar | undefined {
  return useFunctionInternal("toFamiliar", args, undefined);
}
export function useToFloat(
  value: string | boolean | number
): number | undefined;
export function useToFloat(...args: unknown[]): number | undefined {
  return useFunctionInternal("toFloat", args, undefined);
}
export function useToInt(
  value:
    | string
    | boolean
    | number
    | Placeholder<"Item">
    | Placeholder<"Familiar">
    | Placeholder<"Location">
    | Placeholder<"Skill">
    | Placeholder<"Effect">
    | Placeholder<"Class">
    | Placeholder<"Monster">
    | Placeholder<"Thrall">
    | Placeholder<"Servant">
    | Placeholder<"Vykea">
): number | undefined;
export function useToInt(...args: unknown[]): number | undefined {
  return useFunctionInternal("toInt", args, undefined);
}
export function useToItem(
  ...args: [value: string | number] | [name: string, count: number]
): types.Item | undefined;
export function useToItem(...args: unknown[]): types.Item | undefined {
  return useFunctionInternal("toItem", args, undefined);
}
export function useToJson(val: any): string | undefined;
export function useToJson(...args: unknown[]): string | undefined {
  return useFunctionInternal("toJson", args, undefined);
}
export function useToLocation(
  value: string | number
): types.Location | undefined;
export function useToLocation(...args: unknown[]): types.Location | undefined {
  return useFunctionInternal("toLocation", args, undefined);
}
export function useToLowerCase(string: string): string | undefined;
export function useToLowerCase(...args: unknown[]): string | undefined {
  return useFunctionInternal("toLowerCase", args, undefined);
}
export function useToMonster(value: string | number): types.Monster | undefined;
export function useToMonster(...args: unknown[]): types.Monster | undefined {
  return useFunctionInternal("toMonster", args, undefined);
}
export function useToPhylum(value: string): types.Phylum | undefined;
export function useToPhylum(...args: unknown[]): types.Phylum | undefined {
  return useFunctionInternal("toPhylum", args, undefined);
}
export function useToPlural(item: Placeholder<"Item">): string | undefined;
export function useToPlural(...args: unknown[]): string | undefined {
  return useFunctionInternal("toPlural", args, undefined);
}
export function useToServant(value: string | number): types.Servant | undefined;
export function useToServant(...args: unknown[]): types.Servant | undefined {
  return useFunctionInternal("toServant", args, undefined);
}
export function useToSkill(
  ...args:
    | [value: string | number | Placeholder<"Effect">]
    | [value1: string, value2: string]
): types.Skill | undefined;
export function useToSkill(...args: unknown[]): types.Skill | undefined {
  return useFunctionInternal("toSkill", args, undefined);
}
export function useToSlot(
  item: string | Placeholder<"Item">
): types.Slot | undefined;
export function useToSlot(...args: unknown[]): types.Slot | undefined {
  return useFunctionInternal("toSlot", args, undefined);
}
export function useToStat(value: string): types.Stat | undefined;
export function useToStat(...args: unknown[]): types.Stat | undefined {
  return useFunctionInternal("toStat", args, undefined);
}
export function useToString(
  ...args: [val: string] | [val: number, fmt: string]
): string | undefined;
export function useToString(...args: unknown[]): string | undefined {
  return useFunctionInternal("toString", args, undefined);
}
export function useToThrall(value: string | number): types.Thrall | undefined;
export function useToThrall(...args: unknown[]): types.Thrall | undefined {
  return useFunctionInternal("toThrall", args, undefined);
}
export function useToUpperCase(string: string): string | undefined;
export function useToUpperCase(...args: unknown[]): string | undefined {
  return useFunctionInternal("toUpperCase", args, undefined);
}
export function useToUrl(value: Placeholder<"Location">): string | undefined;
export function useToUrl(...args: unknown[]): string | undefined {
  return useFunctionInternal("toUrl", args, undefined);
}
export function useToVykea(value: string): types.Vykea | undefined;
export function useToVykea(...args: unknown[]): types.Vykea | undefined {
  return useFunctionInternal("toVykea", args, undefined);
}
export function useTodayToString(): string | undefined;
export function useTodayToString(...args: unknown[]): string | undefined {
  return useFunctionInternal("todayToString", args, undefined);
}
export function useTotalFreeRests(): number | undefined;
export function useTotalFreeRests(...args: unknown[]): number | undefined {
  return useFunctionInternal("totalFreeRests", args, undefined);
}
export function useTotalTurnsPlayed(): number | undefined;
export function useTotalTurnsPlayed(...args: unknown[]): number | undefined {
  return useFunctionInternal("totalTurnsPlayed", args, undefined);
}
export function useTowerDoor(): boolean | undefined;
export function useTowerDoor(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("towerDoor", args, undefined);
}
export function useTraceprint(string: string): void | undefined;
export function useTraceprint(...args: unknown[]): void | undefined {
  return useFunctionInternal("traceprint", args, undefined);
}
export function useTruncate(arg: number): number | undefined;
export function useTruncate(...args: unknown[]): number | undefined {
  return useFunctionInternal("truncate", args, undefined);
}
export function useTurnsPerCast(
  skill: Placeholder<"Skill">
): number | undefined;
export function useTurnsPerCast(...args: unknown[]): number | undefined {
  return useFunctionInternal("turnsPerCast", args, undefined);
}
export function useTurnsPlayed(): number | undefined;
export function useTurnsPlayed(...args: unknown[]): number | undefined {
  return useFunctionInternal("turnsPlayed", args, undefined);
}
export function useTwiddle(): string | undefined;
export function useTwiddle(...args: unknown[]): string | undefined {
  return useFunctionInternal("twiddle", args, undefined);
}
export function useUnusualConstructDisc(): types.Item | undefined;
export function useUnusualConstructDisc(
  ...args: unknown[]
): types.Item | undefined {
  return useFunctionInternal("unusualConstructDisc", args, undefined);
}
export function useUpdateCandyPrices(): void | undefined;
export function useUpdateCandyPrices(...args: unknown[]): void | undefined {
  return useFunctionInternal("updateCandyPrices", args, undefined);
}
export function useUrlDecode(arg: string): string | undefined;
export function useUrlDecode(...args: unknown[]): string | undefined {
  return useFunctionInternal("urlDecode", args, undefined);
}
export function useUrlEncode(arg: string): string | undefined;
export function useUrlEncode(...args: unknown[]): string | undefined {
  return useFunctionInternal("urlEncode", args, undefined);
}
export function useUse(item: Placeholder<"Item">): boolean | undefined;
export function useUse(
  arg1: Placeholder<"Item">,
  arg2: number
): boolean | undefined;
export function useUse(
  arg1: number,
  arg2: Placeholder<"Item">
): boolean | undefined;
export function useUse(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("use", args, undefined);
}
export function useUseFamiliar(
  familiar: Placeholder<"Familiar">
): boolean | undefined;
export function useUseFamiliar(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("useFamiliar", args, undefined);
}
export function useUseServant(
  servant: Placeholder<"Servant">
): boolean | undefined;
export function useUseServant(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("useServant", args, undefined);
}
export function useUseSkill(
  arg1: Placeholder<"Skill">,
  arg2: number
): boolean | undefined;
export function useUseSkill(
  arg1: number,
  arg2: Placeholder<"Skill">
): boolean | undefined;
export function useUseSkill(
  arg1: Placeholder<"Skill">,
  arg2: number,
  target: string
): boolean | undefined;
export function useUseSkill(
  arg1: number,
  arg2: Placeholder<"Skill">,
  target: string
): boolean | undefined;
export function useUseSkill(skill: Placeholder<"Skill">): string | undefined;
export function useUseSkill(...args: unknown[]): boolean | string | undefined {
  return useFunctionInternal("useSkill", args, undefined);
}
export function useUseRConfirm(message: string): boolean | undefined;
export function useUseRConfirm(
  message: string,
  timeOut: number,
  defaultBoolean: boolean
): boolean | undefined;
export function useUseRConfirm(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("useRConfirm", args, undefined);
}
export function useUseRPrompt(message: string): string | undefined;
export function useUseRPrompt(
  message: string,
  options: any
): string | undefined;
export function useUseRPrompt(
  message: string,
  timeOut: number,
  defaultString: string
): string | undefined;
export function useUseRPrompt(...args: unknown[]): string | undefined {
  return useFunctionInternal("useRPrompt", args, undefined);
}
export function useVisit(
  master: Placeholder<"Coinmaster">
): boolean | undefined;
export function useVisit(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("visit", args, undefined);
}
export function useVisitUrl(): string | undefined;
export function useVisitUrl(string: string): string | undefined;
export function useVisitUrl(
  string: string,
  usePostMethod: boolean
): string | undefined;
export function useVisitUrl(
  string: string,
  usePostMethod: boolean,
  encoded: boolean
): string | undefined;
export function useVisitUrl(...args: unknown[]): string | undefined {
  return useFunctionInternal("visitUrl", args, undefined);
}
export function useVotingBoothInitiatives(
  clss: Placeholder<"Class">,
  path: number,
  daycount: number
): { [key: string]: boolean } | undefined;
export function useVotingBoothInitiatives(
  clss: number,
  path: number,
  daycount: number
): { [key: string]: boolean } | undefined;
export function useVotingBoothInitiatives(
  ...args: unknown[]
): { [key: string]: boolean } | undefined {
  return useFunctionInternal("votingBoothInitiatives", args, undefined);
}
export function useWait(delay: number): void | undefined;
export function useWait(...args: unknown[]): void | undefined {
  return useFunctionInternal("wait", args, undefined);
}
export function useWaitq(delay: number): void | undefined;
export function useWaitq(...args: unknown[]): void | undefined {
  return useFunctionInternal("waitq", args, undefined);
}
export function useWeaponHands(item: Placeholder<"Item">): number | undefined;
export function useWeaponHands(...args: unknown[]): number | undefined {
  return useFunctionInternal("weaponHands", args, undefined);
}
export function useWeaponType(
  item: Placeholder<"Item">
): types.Stat | undefined;
export function useWeaponType(...args: unknown[]): types.Stat | undefined {
  return useFunctionInternal("weaponType", args, undefined);
}
export function useWeightAdjustment(): number | undefined;
export function useWeightAdjustment(...args: unknown[]): number | undefined {
  return useFunctionInternal("weightAdjustment", args, undefined);
}
export function useWhiteCitadelAvailable(): boolean | undefined;
export function useWhiteCitadelAvailable(
  ...args: unknown[]
): boolean | undefined {
  return useFunctionInternal("whiteCitadelAvailable", args, undefined);
}
export function useWhoClan(): { [key: string]: boolean } | undefined;
export function useWhoClan(
  ...args: unknown[]
): { [key: string]: boolean } | undefined {
  return useFunctionInternal("whoClan", args, undefined);
}
export function useWillUsuallyDodge(): boolean | undefined;
export function useWillUsuallyDodge(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("willUsuallyDodge", args, undefined);
}
export function useWillUsuallyMiss(): boolean | undefined;
export function useWillUsuallyMiss(...args: unknown[]): boolean | undefined {
  return useFunctionInternal("willUsuallyMiss", args, undefined);
}
export function useWrite(string: string): void | undefined;
export function useWrite(...args: unknown[]): void | undefined {
  return useFunctionInternal("write", args, undefined);
}
export function useWriteln(string: string): void | undefined;
export function useWriteln(...args: unknown[]): void | undefined {
  return useFunctionInternal("writeln", args, undefined);
}
export function useXpath(html: string, xpath: string): string[] | undefined;
export function useXpath(...args: unknown[]): string[] | undefined {
  return useFunctionInternal("xpath", args, undefined);
}
