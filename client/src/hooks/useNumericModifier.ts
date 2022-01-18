import { NumericModifier } from "libram/dist/modifierTypes";
import { Placeholder, PlaceholderTypes } from "../util/makeValue";
import useCall from "./useCall";

function useNumericModifier<T extends PlaceholderTypes>(
  modifier: NumericModifier,
  thing?: Placeholder<T>
): number | undefined {
  return thing
    ? useCall.numericModifier(thing, modifier)
    : useCall.numericModifier(modifier);
}

export default useNumericModifier;
