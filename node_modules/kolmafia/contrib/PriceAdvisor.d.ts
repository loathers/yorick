/**
 * @file Type definition for PriceAdvisor, made by aqualectrix.
 *
 * - ASH script name: PriceAdvisor
 * - ASH script version: 1.62
 * - ASH script authors: aqualectrix
 *
 * Links:
 *  - ASH script forum thread: https://kolmafia.us/threads/priceadvisor-maximize-your-profits.3110/
 */

import { Item } from "..";

export interface PriceAdvice {
  /** Action command that can be executed in the gCLI */
  action: string;
  /** Expected meat gain from the action. A floating-point number. */
  price: number;
}

/**
 * Calculates the most profitable advice for `item`.
 * @param item
 * @param considerMore
 * @return Most profitable advice with respect to `considerMore`
 */
export function bestAdvice(it: Item, considerMore: boolean): PriceAdvice;

/**
 * Calculates all possible advices which have a positive profit.
 * @param item
 * @param considerMore
 * @return All profitable advices for `item`, sorted from best to worst
 */
export function priceAdvisor(
  it: Item,
  considerMore: boolean
): {[key: number]: PriceAdvice};

/**
 * Resets the internal price advice cache.
 */
export function clearAdviceCache(): void;
