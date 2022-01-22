import { types } from "../util/kolmafia";
import { Placeholder, PlaceholderTypes } from "../util/makeValue";
import { useFunctionInternal } from "./useCall";

function useFull<T extends PlaceholderTypes>(
  thing: Placeholder<T>
): typeof types[T] | undefined {
  return useFunctionInternal<typeof types[T] | undefined>(
    "identity",
    [thing],
    undefined
  );
}

export default useFull;
