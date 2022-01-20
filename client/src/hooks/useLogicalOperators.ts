export function useBooleanAnd(...args: boolean[]) {
  let total: number = 1;
  args.forEach((element) => {
    total *= +element;
  });
  return total === 1;
}

export function useBooleanOr(...args: boolean[]) {
  let total: number = 0;
  args.forEach((element) => {
    total += +element;
  });
  return total !== 0;
}
