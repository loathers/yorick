import { Placeholder } from "../util/makeValue";
import { useBooleanFunction, useNumericFunction } from "./useFunction";

// Can safely disable rules-of-hooks since this is constrained by type.
/* eslint-disable react-hooks/rules-of-hooks */

function useHave<T extends "Effect" | "Familiar" | "Item" | "Skill">(
  thing: Placeholder<T>
): boolean {
  switch (thing.type) {
    case "Effect":
      return useNumericFunction.haveEffect(thing) > 0;
    case "Familiar":
      return useBooleanFunction.haveFamiliar(thing);
    case "Item":
      return useNumericFunction.availableAmount(thing) > 0;
    case "Skill":
      return useBooleanFunction.haveSkill(thing);
    default:
      throw new Error("Unrecognized type!");
  }
}

export default useHave;
