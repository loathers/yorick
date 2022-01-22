import DataLoader from "dataloader";
import { apiCall } from "./base";
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
} from "./propertyTypes";
import {
  isBooleanProperty,
  isNumericOrStringProperty,
  isNumericProperty,
  isStringProperty,
  KnownProperty,
} from "./propertyTyping";

async function getPropertiesRaw(
  properties: string[]
): Promise<{ [name: string]: unknown }> {
  const response = await apiCall({ properties });
  const propertyValues = response.properties ?? {};
  return Object.fromEntries(
    properties.map((name) => [name, propertyValues[name]])
  );
}

export function batchProperties(
  propertyDefaults: readonly [KnownProperty, unknown][]
): Promise<unknown[]> {
  const allProperties = propertyDefaults.map(([name]) => name);
  return getPropertiesRaw(allProperties).then((propertyValues) =>
    propertyDefaults.map(([name, default_]) => {
      const value = propertyValues[name];
      if (value === "") return default_;
      if (typeof default_ === "boolean" && typeof value !== "boolean") {
        return value === "true";
      } else if (typeof default_ === "number" && typeof value === "string") {
        return parseInt(value);
      } else return value;
    })
  );
}

const propertiesLoader = new DataLoader(batchProperties, {
  batchScheduleFn: (callback) => setTimeout(callback, 50),
});

export function defineDefault(property: KnownProperty, default_: unknown) {
  if (default_ === undefined) {
    if (isBooleanProperty(property)) {
      default_ = false;
    } else if (isNumericProperty(property)) {
      default_ = 0;
    } else if (
      isStringProperty(property) ||
      isNumericOrStringProperty(property)
    ) {
      default_ = "";
    } else {
      default_ = null;
    }
  }
  return default_;
}

export function get(property: BooleanProperty): Promise<boolean>;
export function get(
  property: BooleanProperty,
  default_: boolean
): Promise<boolean>;
export function get(property: NumericProperty): Promise<number>;
export function get(
  property: NumericProperty,
  default_: number
): Promise<number>;
export function get(
  property: NumericOrStringProperty
): Promise<number | string>;
export function get(
  property: NumericOrStringProperty,
  default_: number | string
): Promise<number | string>;
export function get(property: StringProperty): Promise<string>;
export function get(
  property: StringProperty,
  default_: string
): Promise<string>;
export function get(property: LocationProperty): Promise<Location | null>;
export function get(
  property: LocationProperty,
  default_: Location
): Promise<Location>;
export function get(property: MonsterProperty): Promise<Monster | null>;
export function get(
  property: MonsterProperty,
  default_: Monster
): Promise<Monster>;
export function get(property: FamiliarProperty): Promise<Familiar | null>;
export function get(
  property: FamiliarProperty,
  default_: Familiar
): Promise<Familiar>;
export function get(property: StatProperty): Promise<Stat | null>;
export function get(property: StatProperty, default_: Stat): Promise<Stat>;
export function get(property: PhylumProperty): Promise<Phylum | null>;
export function get(
  property: PhylumProperty,
  default_: Phylum
): Promise<Phylum>;
export function get(name: KnownProperty, default_?: unknown): Promise<unknown> {
  return propertiesLoader.load([name, defineDefault(name, default_)]);
}
