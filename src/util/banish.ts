import {
  getProperty,
  haveEffect,
  isUnrestricted,
  Monster,
  toMonster,
} from "kolmafia";
import { $effect, $item, get } from "libram";

export interface Banish {
  banishedMonster: Monster;
  banishSource: string;
  turnBanished: number;
  banishTurnLength: number;
  customResetConditions: string;
}

export const banishSourceLength: Record<string, number> = {
  "banishing shout": -1,
  "batter up!": -1,
  chatterboxing: 20,
  "classy monkey": 20,
  "cocktail napkin": 20,
  "crystal skull": 20,
  deathchucks: -1,
  "dirty stinkbomb": -1,
  "divine champagne popper": 5,
  "harold's bell": 20,
  "howl of the alpha": -1,
  "ice house": -1,
  "louder than bomb": 20,
  nanorhino: -1,
  pantsgiving: 30,
  "peel out": -1,
  "pulled indigo taffy": 40,
  "smoke grenade": 20,
  "spooky music box mechanism": -1,
  "staff of the standalone cheese": -1,
  "stinky cheese eye": 10,
  "thunder clap": 40,
  "v for vivala mask": 10,
  "replica v for vivala mask": 10,
  "walk away from explosion": 30,
  "tennis ball": 30,
  "curse of vacation": -1,
  "ice hotel bell": -1,
  'bundle of "fragrant" herbs': -1,
  snokebomb: 30,
  beancannon: -1,
  "licorice rope": -1,
  "kgb tranquilizer dart": 20,
  "breathe out": 20,
  "daily affirmation: be a mind master": 80,
  "spring-loaded front bumper": 30,
  "mafia middle finger ring": 60,
  "throw latte on opponent": 30,
  "tryptophan dart": -1,
  "baleful howl": -1,
  "reflex hammer": 30,
  "saber force": 30,
  "human musk": -1,
  "ultra smash": -1,
  "b. l. a. r. t. spray (wide)": -1,
  "system sweep": -1,
  "feel hatred": 50,
  "show your boring familiar pictures": 100,
  "bowl a curveball": 5,
  "patriotic screech": 100,
  "roar like a lion": 30,
  "monkey slap": -1,
  "spring kick": -1,
};

export function activeBanishes(): Banish[] {
  const banishedMonstersString = getProperty("banishedMonsters");
  const banishedMonstersSplit = banishedMonstersString.split(":");
  const banishes: Banish[] = [];

  for (let i = 0; i < banishedMonstersSplit.length; i += 3) {
    if (
      banishedMonstersSplit[i] &&
      banishedMonstersSplit[i + 1] &&
      banishedMonstersSplit[i + 2]
    ) {
      const banish: Banish = {
        banishedMonster: toMonster(banishedMonstersSplit[i]),
        banishSource: banishedMonstersSplit[i + 1],
        turnBanished: parseInt(banishedMonstersSplit[i + 2]),
        banishTurnLength: 0,
        customResetConditions: "",
      };

      const banishSource = banish.banishSource.toLowerCase();
      if (banishSourceLength[banishSource] !== undefined) {
        banish.banishTurnLength = banishSourceLength[banishSource];
      }
      if (banishSource === "bowl a curveball") {
        banish.banishTurnLength = get("cosmicBowlingBallReturnCombats");
      }
      if (banishSource === "roar like a lion") {
        banish.banishTurnLength = haveEffect($effect`Hear Me Roar`);
      }
      if (
        [
          "batter up!",
          "deathchucks",
          "dirty stinkbomb",
          "nanorhino",
          "spooky music box mechanism",
          "ice hotel bell",
          "beancannon",
          "monkey slap",
        ].includes(banishSource)
      ) {
        banish.customResetConditions = "rollover";
      }
      if (
        banishSource === "ice house" &&
        (!isUnrestricted($item`ice house`) || get("inBadMoon"))
      ) {
        continue;
      }
      banishes.push(banish);
    }
  }

  return banishes;
}
