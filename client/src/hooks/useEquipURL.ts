import { Placeholder } from "../util/makeValue";
import { useHaveEquipped, useMyHash, useToInt } from "./useCall";

export function useEquipURL<T extends "Item">(
  item: Placeholder<T>
): string | undefined {
  const itemID = useToInt(item);
  const myHash = useMyHash();
  const itemEquipped = useHaveEquipped(item);
  const equipURL = `/inv_equip.php?which=2&action=equip&whichitem=${itemID}`;
  return !itemEquipped ? equipURL : undefined;
}
