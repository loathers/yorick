import { Placeholder } from "../util/makeValue";
import {
  useAvailableAmount,
  useHaveEffect,
  useHaveFamiliar,
  useHaveSkill,
} from "./useCall";

// Can safely disable rules-of-hooks since this is constrained by type.
/* eslint-disable react-hooks/rules-of-hooks */

function useHave<T extends "Effect" | "Familiar" | "Item" | "Skill">(
  thing: Placeholder<T>
): boolean {
  switch (thing.objectType) {
    case "Effect":
      return (useHaveEffect(thing as Placeholder<"Effect">) ?? 0) > 0;
    case "Familiar":
      return useHaveFamiliar(thing as Placeholder<"Familiar">) ?? false;
    case "Item":
      return (useAvailableAmount(thing as Placeholder<"Item">) ?? 0) > 0;
    case "Skill":
      return useHaveSkill(thing as Placeholder<"Skill">) ?? false;
    default:
      throw new Error("Unrecognized type!");
  }
}

export default useHave;
