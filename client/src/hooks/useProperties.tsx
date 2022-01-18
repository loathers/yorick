// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import { KnownProperty } from "libram/dist/propertyTyping";
import { useContext, useEffect, useState } from "react";
import { batchProperties, defineDefault } from "../api/property";
import {
  BooleanProperty,
  FamiliarProperty,
  LocationProperty,
  MonsterProperty,
  NumericOrStringProperty,
  NumericProperty,
  PhylumProperty,
  StatProperty,
  StringProperty,
} from "../api/propertyTypes";
import RefreshContext from "../contexts/RefreshContext";

const hookPropertiesLoader = new DataLoader(batchProperties);

export function useGet(property: BooleanProperty, default_?: boolean): boolean;
export function useGet(property: NumericProperty, default_?: number): number;
export function useGet(
  property: NumericOrStringProperty,
  default_?: number | string
): number | string;
export function useGet(property: StringProperty, default_?: string): string;
export function useGet(property: LocationProperty): Location | null;
export function useGet(
  property: LocationProperty,
  default_: Location
): Location;
export function useGet(property: MonsterProperty): Monster | null;
export function useGet(property: MonsterProperty, default_: Monster): Monster;
export function useGet(property: FamiliarProperty): Familiar | null;
export function useGet(
  property: FamiliarProperty,
  default_: Familiar
): Familiar;
export function useGet(property: StatProperty): Stat | null;
export function useGet(property: StatProperty, default_: Stat): Stat;
export function useGet(property: PhylumProperty): Phylum | null;
export function useGet(property: PhylumProperty, default_: Phylum): Phylum;
export function useGet<T>(property: string, default_?: T): T | null {
  const refreshCount = useContext(RefreshContext);
  const [propertyState, setPropertyState] = useState(
    defineDefault(property as KnownProperty, default_)
  );
  useEffect(() => {
    hookPropertiesLoader
      .load([property as KnownProperty, default_])
      .then((value) => setPropertyState(value));
  }, [property, default_, refreshCount]);

  return propertyState as T | null;
}
