export function plural(
  count: number,
  description: string,
  descriptionPlural?: string
) {
  if (!descriptionPlural) descriptionPlural = `${description}s`;
  return `${count} ${count === 1 ? description : descriptionPlural}`;
}

export function commaAnd(values: string[]) {
  if (values.length === 0) return "none";
  else if (values.length === 1) return values[0];
  else if (values.length === 2) return `${values[0]} and ${values[1]}`;
  else {
    return `${values.slice(0, -1).join(", ")}, and ${
      values[values.length - 1]
    }`;
  }
}
