export function plural(
  count: number,
  description: string,
  descriptionPlural?: string
) {
  if (!descriptionPlural) descriptionPlural = `${description}s`;
  return `${count} ${count === 1 ? description : descriptionPlural}`;
}

export function commaList(values: string[], connector: string) {
  if (values.length === 0) return "none";
  else if (values.length === 1) return values[0];
  else if (values.length === 2) return `${values[0]} and ${values[1]}`;
  else {
    return `${values.slice(0, -1).join(", ")}, ${connector} ${
      values[values.length - 1]
    }`;
  }
}

export function commaAnd(values: string[]) {
  return commaList(values, "and");
}

export function commaOr(values: string[]) {
  return commaList(values, "or");
}

export function truthy<T>(values: (T | false)[]): T[] {
  return values.filter((x) => x) as T[];
}
