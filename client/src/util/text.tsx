import { Fragment, ReactNode } from "react";

export function plural(
  count: number,
  description: string,
  descriptionPlural?: string,
) {
  if (!descriptionPlural) descriptionPlural = `${description}s`;
  return `${count} ${count === 1 ? description : descriptionPlural}`;
}

export function commaList(
  values: string[] | ReactNode[],
  connector: string,
): ReactNode {
  if (values.length === 0) return "none";
  else if (values.length === 1) return values[0];
  else if (values.length === 2) {
    if (values.every((value) => typeof value === "string")) {
      return `${values[0]} and ${values[1]}`;
    } else {
      return (
        <>
          {values[0]} and {values[1]}
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
            <Fragment key={index}>
              {value}
              {", "}
            </Fragment>
          ))}
          {"and "}
          {values[values.length - 1]}
        </>
      );
    }
  }
}

export function commaAnd(values: string[] | ReactNode[]): ReactNode {
  return commaList(values, "and");
}

export function commaOr(values: string[] | ReactNode[]): ReactNode {
  return commaList(values, "or");
}

export function truthy<T>(values: (T | false)[]): T[] {
  return values.filter((x) => x) as T[];
}
