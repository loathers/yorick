import { Placeholder } from "../util/makeValue";
import useCall from "./useCall";

// Can safely disable rules-of-hooks since this is constrained by type.
/* eslint-disable react-hooks/rules-of-hooks */

function useHave<T extends "Effect" | "Familiar" | "Item" | "Skill">(
  thing: Placeholder<T>
): boolean {
  switch (thing.objectType) {
    case "Effect":
      return (useCall.haveEffect(thing as Placeholder<"Effect">) ?? 0) > 0;
    case "Familiar":
      return useCall.haveFamiliar(thing as Placeholder<"Familiar">) ?? false;
    case "Item":
      return (useCall.availableAmount(thing as Placeholder<"Item">) ?? 0) > 0;
    case "Skill":
      return useCall.haveSkill(thing as Placeholder<"Skill">) ?? false;
    default:
      throw new Error("Unrecognized type!");
  }
}

export default useHave;
