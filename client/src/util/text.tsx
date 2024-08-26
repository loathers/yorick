import { Fragment, ReactNode } from "react";

export function pluralize(
  count: number,
  description: string,
  descriptionPlural?: string
) {
  if (!descriptionPlural) descriptionPlural = `${description}s`;
  return count === 1 ? description : descriptionPlural;
}

export function plural(
  count: number,
  description: string,
  descriptionPlural?: string
) {
  return `${count} ${pluralize(count, description, descriptionPlural)}`;
}

export function commaList(
  values: string[] | ReactNode[],
  connector: string,
  keys?: string[] | number[]
): ReactNode {
  // Show only truthy values.
  values = values.filter((x) => x);
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
  values: string[] | ReactNode[],
  keys?: string[] | number[]
): ReactNode {
  return commaList(values, "and", keys);
}

export function commaOr(
  values: string[] | ReactNode[],
  keys?: string[] | number[]
): ReactNode {
  return commaList(values, "or", keys);
}

export function truthy<T>(values: (T | false)[]): T[] {
  return values.filter((x) => x) as T[];
}
