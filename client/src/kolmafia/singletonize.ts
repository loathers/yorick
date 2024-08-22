import { PlaceholderTypes, placeholderTypes } from "../util/makeValue";
import { globalTypes } from "./types";

export type Identified<T extends PlaceholderTypes> = {
  objectType: T;
  identifierString: string;
  identifierNumber?: number;
};

export type AnyIdentified = {
  [K in PlaceholderTypes]: Identified<K>;
}[PlaceholderTypes];

const objectCache = Object.fromEntries(
  Object.keys(placeholderTypes).map((type) => [type, new Map()])
) as {
  [K in PlaceholderTypes]: Map<string, Identified<K>>;
};

export function isIdentified(object: object): object is AnyIdentified {
  const { objectType, identifierString, identifierNumber } = object as {
    objectType?: unknown;
    identifierString?: unknown;
    identifierNumber?: unknown;
  };
  return (
    typeof objectType === "string" &&
    objectType in placeholderTypes &&
    typeof identifierString === "string" &&
    (identifierNumber === undefined || typeof identifierNumber === "number")
  );
}

function cacheIdentified<T extends PlaceholderTypes>(
  object: Identified<T>
): Identified<T> {
  const { objectType, identifierString, identifierNumber } = object;
  const identifier =
    identifierNumber !== undefined
      ? `[${identifierNumber}]${identifierString}`
      : identifierString;
  const cached = objectCache[objectType].get(identifier);
  if (cached !== undefined) {
    Object.assign(cached, object);
    return cached as Identified<T>;
  }
  // @ts-ignore
  const result: Identified<T> = new globalTypes[objectType](object);
  // @ts-ignore
  objectCache[objectType].set(identifier, result);
  return result;
}

/**
 * Strips out any data that's unnecessary over the wire, i.e. we don't need to send back item details.
 * @param object Object to serialize.
 * @returns Object ready for serialization.
 */
export function serialize<T>(object: T): Partial<T> {
  if (Array.isArray(object)) {
    return object.map((item) => serialize(item)) as T;
  } else if (typeof object === "object" && object !== null) {
    if (isIdentified(object)) {
      const result = {} as Identified<PlaceholderTypes>;
      result.objectType = object.objectType;
      if (object.identifierNumber && object.identifierNumber >= 0) {
        result.identifierNumber = object.identifierNumber;
      } else {
        result.identifierString = object.identifierString;
      }
      return result as T;
    } else {
      return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, serialize(value)])
      ) as T;
    }
  } else return object;
}

/**
 * Recursively ensures that any enumerated types in this object are singletons.
 * @param object Object to singletonize.
 * @returns New object with singletons.
 */
export default function singletonize<T>(object: T): T {
  if (Array.isArray(object)) {
    return object.map((item) => singletonize(item)) as T;
  } else if (typeof object === "object" && object !== null) {
    if (isIdentified(object)) {
      return cacheIdentified(object) as T;
    } else {
      return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, singletonize(value)])
      ) as T;
    }
  } else return object;
}
