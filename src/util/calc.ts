import { combatRateModifier } from "kolmafia";

export function turnsToSeeNoncombat(combatRate: number, encounters = 1) {
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
  if (p === 0) return cap;
  return (1 / p) * (1 - Math.pow(1 - p, cap));
}
