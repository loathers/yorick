import {
  makePlaceholder,
  PlaceholderTypes,
  placeholderTypes,
} from "../util/makeValue";

for (const type of Object.keys(placeholderTypes)) {
  const newClass = function () {};
  newClass.get = function get(idOrArray: unknown): unknown {
    return Array.isArray(idOrArray)
      ? idOrArray.map((id) => makePlaceholder(type as PlaceholderTypes, id))
      : makePlaceholder(type as PlaceholderTypes, idOrArray as string | number);
  };
  newClass.all = function all(): unknown[] {
    return [];
  };
  (global as { [index: string]: unknown })[type] = newClass;
}
