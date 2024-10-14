import { EnumeratedType, EnumeratedTypeName, globalTypes } from "kolmafia";

import { Identified, isIdentified } from "./identified";
import { isPlaceholder } from "./placeholder";

const objectCache = Object.fromEntries(
  Object.entries(globalTypes).map(([name, type]) => [
    name,
    new Map([["none", type.none]]),
  ]),
) as {
  [K in EnumeratedTypeName]: Map<string, EnumeratedType<K>>;
};

let uniqueId = 0;
function cacheIdentified<T extends EnumeratedTypeName>(
  object: Identified<T>,
  updateCachedValue: boolean,
): EnumeratedType<T> {
  const { objectType, identifierString } = object;
  const cached = objectCache[objectType].get(identifierString);

  if (cached !== undefined) {
    // Object.assign mutates cached, so this effectively modifies the cache.
    if (updateCachedValue) {
      Object.assign(cached, object);
    }
    return cached;
  }

  // @ts-expect-error Not worth the effort to get this typed correctly.
  const result: EnumeratedType<T> = new globalTypes[objectType](object);
  // @ts-ignore
  result["_unique"] = uniqueId++;
  objectCache[objectType].set(identifierString, result);
  return result;
}

// Stolen from Mongoose.
function isPOJO(arg: unknown): arg is Record<string, unknown> {
  if (arg === null || arg === undefined || typeof arg !== "object") {
    return false;
  }
  const proto = Object.getPrototypeOf(arg);
  return !proto || proto.constructor.name === "Object";
}

function camelCaseIfy(name: string): string {
  return name
    .split("_")
    .map((component, index) =>
      index === 0
        ? component
        : component.charAt(0).toUpperCase() + component.slice(1),
    )
    .join("");
}

/**
 * Transform property names from lowercase_underscore to js camelCase.
 * @param object Object to transform.
 * @returns New object with recursively transformed property names.
 */
export function transformPropertyNames<T>(object: T): T {
  if (Array.isArray(object)) {
    return object.map((item) => transformPropertyNames(item)) as T;
  } else if (isPOJO(object)) {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => [camelCaseIfy(key), value]),
    ) as T;
  } else return object;
}

/**
 * Strips out any data that's unnecessary over the wire, i.e. we don't need to send back item details.
 * For values sent to the server.
 * @param object Object to serialize.
 * @returns Object ready for serialization.
 */
export function serialize<T>(object: T): Partial<T> {
  if (typeof object !== "object" || object === null) {
    return object;
  } else if (Array.isArray(object)) {
    return object.map((item) => serialize(item)) as T;
  } else if (isPlaceholder(object)) {
    if ("identifierString" in object) {
      return {
        objectType: object.objectType,
        identifierString: object.identifierString,
      } as T;
    } else if ("identifierNumber" in object) {
      return {
        objectType: object.objectType,
        identifierNumber: object.identifierNumber,
      } as T;
    } else {
      throw new Error("Placeholder and no identifier??");
    }
  } else if (isPOJO(object)) {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => [key, serialize(value)]),
    ) as T;
  } else return object;
}

/**
 * Recursively ensures that any enumerated types in this object are singletons.
 * For values returned from the server.
 * @param object Object to singletonize.
 * @param updateCachedValue Whether to override existing values in the cache.
 * @returns New object with singletons.
 */
export function singletonize<T>(object: T, updateCachedValue: boolean): T {
  if (typeof object !== "object" || object === null) {
    return object;
  } else if (Array.isArray(object)) {
    return object.map((item) => singletonize(item, updateCachedValue)) as T;
  } else if (isIdentified(object)) {
    return cacheIdentified(object, updateCachedValue) as T;
  } else if (isPOJO(object)) {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => [
        key,
        singletonize(value, updateCachedValue),
      ]),
    ) as T;
  } else return object;
}
