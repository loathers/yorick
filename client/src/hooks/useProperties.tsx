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

export function useGet(property: BooleanProperty): boolean;
export function useGet(property: BooleanProperty, _default: boolean): boolean;
export function useGet(property: NumericProperty): number;
export function useGet(property: NumericProperty, _default: number): number;
export function useGet(property: NumericOrStringProperty): number | string;
export function useGet(
  property: NumericOrStringProperty,
  _default: number | string
): number | string;
export function useGet(property: StringProperty): string;
export function useGet(property: StringProperty, _default: string): string;
export function useGet(property: LocationProperty): Location | null;
export function useGet(
  property: LocationProperty,
  _default: Location
): Location;
export function useGet(property: MonsterProperty): Monster | null;
export function useGet(property: MonsterProperty, _default: Monster): Monster;
export function useGet(property: FamiliarProperty): Familiar | null;
export function useGet(
  property: FamiliarProperty,
  _default: Familiar
): Familiar;
export function useGet(property: StatProperty): Stat | null;
export function useGet(property: StatProperty, _default: Stat): Stat;
export function useGet(property: PhylumProperty): Phylum | null;
export function useGet(property: PhylumProperty, _default: Phylum): Phylum;
export function useGet(property: KnownProperty, default_?: unknown): unknown {
  const refreshCount = useContext(RefreshContext);
  const [propertyState, setPropertyState] = useState(
    defineDefault(property, default_)
  );
  useEffect(() => {
    hookPropertiesLoader
      .load([property, default_])
      .then((value) => setPropertyState(value));
  }, [property, default_, refreshCount]);

  return propertyState;
}
