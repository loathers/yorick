import {
  addOverrideListener,
  isIdentifiedType,
  Override,
  OverrideListener,
} from "tome-kolmafia";

export function addDevelopmentListeners() {
  addOverrideListener(<T>(name: string, args: unknown[]) => {
    const firstArg = args[0];
    if (name === "getProperty" && typeof firstArg === "string") {
      const override = localStorage.getItem(firstArg);
      if (override !== null) return { applied: true, value: override as T };
    } else if (
      name === "availableAmount" &&
      isIdentifiedType(firstArg, "Item")
    ) {
      const override = localStorage.getItem(
        `available_amount($item[${firstArg.identifierString}])`,
      );
      if (override !== null) {
        return { applied: true, value: parseInt(override) as T };
      }
    } else if (name === "haveEffect" && isIdentifiedType(firstArg, "Effect")) {
      const override = localStorage.getItem(
        `have_effect($effect[${firstArg.identifierString}])`,
      );
      if (override !== null) {
        return { applied: true, value: parseInt(override) as T };
      }
    }
    return { applied: false };
  });
  addOverrideListener((<T>(
    name: string,
    args: unknown[],
    value?: T,
  ): Override<T> => {
    let applied = false;
    if (isIdentifiedType(value, "Location")) {
      const turnsSpentOverride = localStorage.getItem(
        `$location[${value.identifierString}].turns_spent`,
      );
      const noncombatQueueOverride = localStorage.getItem(
        `$location[${value.identifierString}].noncombat_queue`,
      );
      if (turnsSpentOverride !== null) {
        applied = true;
        value = { ...value, turnsSpent: parseInt(turnsSpentOverride) };
      }
      if (noncombatQueueOverride !== null) {
        applied = true;
        value = { ...value, noncombatQueue: noncombatQueueOverride };
      }
    }

    return applied ? { applied, value: value as T } : { applied };
  }) as OverrideListener);
}
