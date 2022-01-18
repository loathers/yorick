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

export default function useGet(
  property: BooleanProperty,
  default_?: boolean
): boolean;
export default function useGet(
  property: NumericProperty,
  default_?: number
): number;
export default function useGet(
  property: NumericOrStringProperty,
  default_?: number | string
): number | string;
export default function useGet(
  property: StringProperty,
  default_?: string
): string;
export default function useGet(property: LocationProperty): Location | null;
export default function useGet(
  property: LocationProperty,
  default_: Location
): Location;
export default function useGet(property: MonsterProperty): Monster | null;
export default function useGet(
  property: MonsterProperty,
  default_: Monster
): Monster;
export default function useGet(property: FamiliarProperty): Familiar | null;
export default function useGet(
  property: FamiliarProperty,
  default_: Familiar
): Familiar;
export default function useGet(property: StatProperty): Stat | null;
export default function useGet(property: StatProperty, default_: Stat): Stat;
export default function useGet(property: PhylumProperty): Phylum | null;
export default function useGet(
  property: PhylumProperty,
  default_: Phylum
): Phylum;
export default function useGet<T>(property: string, default_?: T): T | null {
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
