export function plural(
  count: number,
  description: string,
  descriptionPlural?: string
) {
  if (!descriptionPlural) descriptionPlural = `${description}s`;
  return `${count} ${count === 1 ? description : descriptionPlural}`;
}
