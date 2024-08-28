import { combatRateModifier } from "kolmafia";

export function turnsToSeeNoncombat(combatRate: number, encounters: number) {
  const noncombatRate = 1 - (combatRate + combatRateModifier()) / 100;
  return noncombatRate > 0
    ? Math.ceil(encounters / noncombatRate)
    : Number.POSITIVE_INFINITY;
}
