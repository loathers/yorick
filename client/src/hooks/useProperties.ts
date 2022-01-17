// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import { KnownProperty } from "libram/dist/propertyTyping";
import { useEffect, useState } from "react";
import { getProperties } from "../api";
import {
  BooleanProperty,
  NumericOrStringProperty,
  NumericProperty,
  StringProperty,
} from "libram/dist/propertyTypes";

function batchFunction(
  propertyDefaults: readonly [KnownProperty, number | boolean | string][]
): Promise<(number | boolean | string)[]> {
  const allProperties = propertyDefaults.map(([name]) => name);
  return getProperties(allProperties).then((propertyValues) =>
    propertyDefaults.map(([name, default_]) => {
      const value = propertyValues[name];
      if (value === undefined) return default_;
      if (typeof default_ === "boolean") return value === "true";
      else if (typeof default_ === "number") return parseInt(value);
      else return value;
    })
  );
}

const propertiesLoader = new DataLoader(batchFunction);

export function useProperty(
  property: NumericProperty,
  default_: number
): number;
export function useProperty(property: StringProperty, default_: string): string;
export function useProperty(
  property: BooleanProperty,
  default_: boolean
): boolean;
export function useProperty(
  property: NumericOrStringProperty,
  default_: number | string
): number | string;
export function useProperty<T extends string | number | boolean>(
  property: KnownProperty,
  default_: T
): T {
  const [propertyState, setPropertyState] = useState(default_);
  useEffect(() => {
    propertiesLoader
      .load([property, default_])
      .then((value) => setPropertyState(value as T));
  }, [property, default_]);

  return propertyState;
}
