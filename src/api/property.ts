import { apiCall } from "./base";
import {
  isBooleanProperty,
  isNumericOrStringProperty,
  isNumericProperty,
  isStringProperty,
  KnownProperty,
} from "./propertyTyping";

async function getPropertiesRaw(
  properties: string[],
): Promise<{ [name: string]: unknown }> {
  const response = await apiCall({ properties });
  const propertyValues = response?.properties ?? [];
  return Object.fromEntries(
    properties.map((name, index) => [name, propertyValues[index]]),
  );
}

export function batchProperties(
  propertyDefaults: readonly [KnownProperty, unknown][],
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
    }),
  );
}

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
