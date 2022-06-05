/**
 * @file Type definition for EatDrink, made by dj_d.
 *
 * - ASH script name: EatDrink
 * - ASH script version: 3.2
 * - ASH script authors: dj_d
 *
 * Links:
 *  - ASH script forum thread: https://kolmafia.us/threads/eatdrink-ash-optimize-your-daily-diet-and-see-how-your-old-diet-stacks-up.1519/
 */

/**
 * @return Net number of adventures gained
 */
export function eatdrink(
  foodMax: number,
  drinkMax: number,
  spleenMax: number,
  overdrink: boolean
): number;

export function eatdrink(
  foodMax: number,
  drinkMax: number,
  spleenMax: number,
  overdrink: boolean,
  advmeat: number,
  primemeat: number,
  offmeat: number,
  pullmeat: number,
  sim: boolean
): void;
