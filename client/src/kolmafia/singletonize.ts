import { PlaceholderTypes, placeholderTypes } from "../util/makeValue";
import { globalTypes } from "./types";

export type Identified<T extends PlaceholderTypes> = {
  objectType: T;
  identifierString: string;
  identifierNumber?: number;
};

type AnyIdentified = {
  [K in PlaceholderTypes]: Identified<K>;
}[PlaceholderTypes];

const objectCache = Object.fromEntries(
  Object.keys(placeholderTypes).map((type) => [type, new Map()])
) as {
  [K in PlaceholderTypes]: Map<string, Identified<K>>;
};

function isIdentified(object: object): object is AnyIdentified {
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
 * Recursively ensures that any enumerated types in this object are singletons.
 * @param object Object to singletonize.
 * @returns New object with singletons.
 */
export default function singletonize(object: unknown): unknown {
  if (Array.isArray(object)) {
    return object.map((item) => singletonize(item));
  } else if (typeof object === "object" && object !== null) {
    if (isIdentified(object)) {
      return cacheIdentified(object);
    } else {
      return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, singletonize(value)])
      );
    }
  } else return object;
}
