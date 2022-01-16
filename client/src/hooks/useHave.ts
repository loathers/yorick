import { Placeholder } from "../util/makeValue";
import useFunction from "./useFunction";

// Can safely disable rules-of-hooks since this is constrained by type.
/* eslint-disable react-hooks/rules-of-hooks */

function useHave<T extends "Effect" | "Familiar" | "Item" | "Skill">(
  thing: Placeholder<T>
): boolean {
  switch (thing.type) {
    case "Effect":
      return (useFunction<number>("haveEffect", thing) ?? 0) > 0;
    case "Familiar":
      return useFunction<boolean>("haveFamiliar", thing) ?? false;
    case "Item":
      return (useFunction<number>("availableAmount", thing) ?? 0) > 0;
    case "Skill":
      return useFunction<boolean>("haveSkill", thing) ?? false;
    default:
      throw new Error("Unrecognized type!");
  }
}

export default useHave;
