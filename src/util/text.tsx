import { availableAmount, Item } from "kolmafia";
import { Fragment, ReactNode } from "react";
import { AnyIdentified, isIdentified } from "tome-kolmafia-client";

export function pluralJustDesc(
  count: number,
  description: string | { name: string; plural: string },
  descriptionPlural?: string,
) {
  if (
    typeof description === "object" &&
    "name" in description &&
    "plural" in description
  ) {
    descriptionPlural = description.plural;
    description = description.name;
  }
  if (!descriptionPlural) descriptionPlural = `${description}s`;
  return count === 1 ? description : descriptionPlural;
}

export function plural(
  count: number,
  description: string | { name: string; plural: string },
  descriptionPlural?: string,
) {
  return `${count} ${pluralJustDesc(count, description, descriptionPlural)}`;
}

export function pluralJustDescItem(item: Item, count?: number) {
  return pluralJustDesc(count ?? availableAmount(item), item.name, item.plural);
}

export function pluralItem(item: Item, count?: number) {
  return plural(count ?? availableAmount(item), item.name, item.plural);
}

export function separate(
  values: string[] | ReactNode[] | AnyIdentified[],
  separator: string,
  keys?: string[] | number[],
) {
  values = values.map((x) => (isIdentified(x) ? x.identifierString : x));
  // Show only truthy values.
  values = truthy(values);
  if (values.length === 0) return "";
  else if (values.length >= 1) {
    if (values.every((value) => typeof value === "string")) {
      return values.join(separator);
    } else {
      return (
        <>
          {values.slice(0, -1).map((value, index) => (
            <Fragment key={keys?.[index] ?? index}>
              {value}
              {separator}
            </Fragment>
          ))}
          {values[values.length - 1]}
        </>
      );
    }
  }
}

export function commaList(
  values: string[] | ReactNode[] | AnyIdentified[],
  connector: string,
  keys?: string[] | number[],
): ReactNode {
  values = values.map((x) => (isIdentified(x) ? x.identifierString : x));
  // Show only truthy values.
  values = truthy(values);
  if (values.length === 0) return "none";
  else if (values.length === 1) return values[0];
  else if (values.length === 2) {
    if (values.every((value) => typeof value === "string")) {
      return `${values[0]} ${connector} ${values[1]}`;
    } else {
      return (
        <>
          {values[0]} {connector} {values[1]}
        </>
      );
    }
  } else {
    if (values.every((value) => typeof value === "string")) {
      return `${values.slice(0, -1).join(", ")}, ${connector} ${
        values[values.length - 1]
      }`;
    } else {
      return (
        <>
          {values.slice(0, -1).map((value, index) => (
            <Fragment
              key={keys && keys[index] !== undefined ? keys[index] : index}
            >
              {value}
              {", "}
            </Fragment>
          ))}
          {`${connector} `}
          {values[values.length - 1]}
        </>
      );
    }
  }
}

export function commaAnd(
  values: string[] | ReactNode[] | AnyIdentified[],
  keys?: string[] | number[],
): ReactNode {
  return commaList(values, "and", keys);
}

export function commaOr(
  values: string[] | ReactNode[] | AnyIdentified[],
  keys?: string[] | number[],
): ReactNode {
  return commaList(values, "or", keys);
}

export function truthy<T>(values: (T | false)[]): T[] {
  return values.filter((x) => x) as T[];
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function capitalizeWords(text: string) {
  return text
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}
