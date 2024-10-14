import {
  EnumeratedTypeName,
  HasNumber,
  isNumberTypeName,
  NumberTypeName,
  ValidIdentifier,
} from "kolmafia";

/**
 * Placeholder values are for Mafia enumerated type objects that are
 * identifiable on the client-side (i.e. client-side code knows their name)
 * but that we don't have full details for. A Placeholder object can be sent
 * to the server as an argument to a function, and the server will replace it
 * with the full value before calling the function.
 * The client-server interface adds objectType, identifierNumber, and
 * identifierString fields to all objects.
 * By contrast, Identified values represent POJOs that come back from the
 * server.
 */
export type Placeholder<T extends EnumeratedTypeName> =
  HasNumber<T> extends true
    ?
        | { objectType: T; identifierString: string }
        | {
            objectType: T;
            identifierNumber: number;
          }
    : {
        objectType: T;
        identifierString: string;
      };

export type AnyPlaceholder = {
  [K in EnumeratedTypeName]: Placeholder<K>;
}[EnumeratedTypeName];

export function makePlaceholder<T extends EnumeratedTypeName>(
  objectType: T,
  identifier: ValidIdentifier<T>,
): Placeholder<T> {
  return {
    objectType,
    [typeof identifier === "number" ? "identifierNumber" : "identifierString"]:
      identifier,
  } as Placeholder<T>;
}

export function isPlaceholder(o: unknown): o is AnyPlaceholder {
  if (typeof o !== "object" || o === null) return false;
  return (
    "objectType" in o &&
    typeof o.objectType === "string" &&
    (isNumberTypeName(o.objectType)
      ? ("identifierNumber" in o && typeof o.identifierNumber === "number") ||
        ("identifierString" in o && typeof o.identifierString === "string")
      : "identifierString" in o && typeof o.identifierString === "string")
  );
}

export function isNumberPlaceholder(o: unknown): o is {
  [K in NumberTypeName]: Placeholder<K>;
}[NumberTypeName] {
  return isPlaceholder(o) && isNumberTypeName(o.objectType);
}

export function placeholderIdentifier<T extends EnumeratedTypeName>(
  placeholder: Placeholder<T>,
): string | number {
  return "identifierString" in placeholder
    ? placeholder.identifierString
    : placeholder.identifierNumber;
}
