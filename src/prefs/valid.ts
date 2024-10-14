import {
  isBooleanProperty,
  isNumericOrStringProperty,
  isNumericProperty,
} from "libram";

export type ValidityType =
  | "string"
  | "number"
  | "boolean"
  | "string | number"
  | "quest";

export function validityType(override: string): ValidityType {
  if (
    isNumericProperty(override) ||
    /^\$location\[.*\].turns_spent$/.test(override) ||
    /$available_amount\(\$item\[.*\]\)/.test(override)
  ) {
    return "number";
  } else if (isBooleanProperty(override)) {
    return "boolean";
  } else if (isNumericOrStringProperty(override)) {
    return "string | number";
  } else if (override.startsWith("quest")) {
    return "quest";
  } else {
    return "string";
  }
}

export function validValue(type: ValidityType, value: string) {
  switch (type) {
    case "string":
      return true;
    case "number":
      return !!value.match(/^-?\d+$/);
    case "boolean":
      return !!value.match(/^(true|false)$/);
    case "string | number":
      return true;
    case "quest":
      return !!value.match(/^(unstarted|started|finished|step\d+)$/);
  }
}
