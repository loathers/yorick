import {
  EnumeratedTypeName,
  HasNumber,
  isEnumeratedTypeName,
  isNumberTypeName,
  NumberTypeName,
} from "../generated/types";

// Placeholder is what goes to the server.
// Identified is what comes back from the server.
export type Identified<T extends EnumeratedTypeName> =
  HasNumber<T> extends true
    ? {
        objectType: T;
        identifierString: string;
        identifierNumber: number;
      }
    : {
        objectType: T;
        identifierString: string;
      };

export type AnyIdentified = {
  [K in EnumeratedTypeName]: Identified<K>;
}[EnumeratedTypeName];

export function isIdentified(o: unknown): o is AnyIdentified {
  if (typeof o !== "object" || o === null) return false;
  return (
    "objectType" in o &&
    typeof o.objectType === "string" &&
    isEnumeratedTypeName(o.objectType) &&
    "identifierString" in o &&
    typeof o.identifierString === "string" &&
    (!isNumberTypeName(o.objectType) ||
      ("identifierNumber" in o && typeof o.identifierNumber === "number"))
  );
}

export function isNumberIdentified(o: unknown): o is {
  [K in NumberTypeName]: Identified<K>;
}[NumberTypeName] {
  return isIdentified(o) && isNumberTypeName(o.objectType);
}
