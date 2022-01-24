// Needed for DataLoader.
import "setimmediate";

import { useContext, useEffect, useState } from "react";
import DataLoader from "dataloader";
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
import {
  isNumericOrStringProperty,
  isNumericProperty,
  KnownProperty,
  isBooleanProperty,
} from "../api/propertyTyping";
import RefreshContext from "../contexts/RefreshContext";

const hookPropertiesLoader = new DataLoader(batchProperties);

function convertValue(property: KnownProperty, value: string): unknown {
  // Handle known properties.
  if (isBooleanProperty(property)) {
    return value === "true";
  } else if (isNumericProperty(property)) {
    return parseInt(value);
  } else if (isNumericOrStringProperty(property)) {
    return value.match(/^\d+$/) ? parseInt(value) : value;
  } else {
    return value;
  }
}

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
    let isCancelled = false;

    hookPropertiesLoader
      .load([property as KnownProperty, default_])
      .then((value) => {
        if (!isCancelled) setPropertyState(value);
      });

    return () => {
      isCancelled = true;
    };
  }, [property, default_, refreshCount]);

  const devValue = localStorage.getItem(property);
  return devValue !== null
    ? (convertValue(property as KnownProperty, devValue) as T)
    : (propertyState as T | null);
}
