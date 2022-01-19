import { Placeholder } from "../util/makeValue";
import { useMyHash, useToInt } from "./useCall";

export function useEquipURL<T extends "Item">(item: Placeholder<T>): string {
  const itemID = useToInt(item);
  const myHash = useMyHash();
  const equipURL = `http://127.0.0.1:60080/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${itemID}`;
  return equipURL;
}
