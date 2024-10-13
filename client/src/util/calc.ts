import { combatRateModifier } from "kolmafia";

export function turnsToSeeNoncombat(combatRate: number, encounters: number) {
  const noncombatRate = 1 - (combatRate + combatRateModifier()) / 100;
  return noncombatRate > 0
    ? Math.ceil(encounters / noncombatRate)
    : Number.POSITIVE_INFINITY;
}

export function turnsToSeeSingleNoncombatCapped(
  combatRate: number,
  cap: number,
) {
  const p = 1 - (combatRate + combatRateModifier()) / 100;
  return (
    (1 - cap * Math.pow(1 - p, cap - 1) + (cap - 1) * Math.pow(1 - p, cap)) /
      p +
    cap * Math.pow(1 - p, cap - 1)
  );
}
