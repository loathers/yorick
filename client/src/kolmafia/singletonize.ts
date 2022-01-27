import { PlaceholderTypes, placeholderTypes } from "../util/makeValue";

export type Identified<T extends PlaceholderTypes> = {
  objectType: T;
  identifierString: string;
  identifierNumber?: number;
};

const objectCache = Object.fromEntries(
  Object.keys(placeholderTypes).map((type) => [type, new Map()])
) as {
  [K in PlaceholderTypes]: Map<string, Identified<PlaceholderTypes>>;
};

function isIdentified(object: unknown): object is Identified<PlaceholderTypes> {
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
      const { objectType, identifierString, identifierNumber } = object;
      const identifier =
        identifierNumber !== undefined
          ? `[${identifierNumber}]${identifierString}`
          : identifierString;
      const cached = objectCache[objectType].get(identifier);
      if (cached) return cached;
      objectCache[objectType].set(identifier, object);
      return object;
    } else {
      return Object.fromEntries(
        Object.entries(object).map(([key, value]) => [key, singletonize(value)])
      );
    }
  } else return object;
}
