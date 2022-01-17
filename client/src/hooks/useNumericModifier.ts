import { NumericModifier } from "libram/dist/modifierTypes";
import { Placeholder, PlaceholderTypes } from "../util/makeValue";
import { useNumericFunction } from "./useFunction";

function useNumericModifier<T extends PlaceholderTypes>(
  modifier: NumericModifier,
  thing?: Placeholder<T>
): number {
  return thing
    ? useNumericFunction.numericModifier(thing, modifier)
    : useNumericFunction.numericModifier(modifier);
}

export default useNumericModifier;
