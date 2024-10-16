import { canAdventure, Item, Location, Skill } from "kolmafia";
import { $location, $locations } from "libram";

import { getHashIfAvailable } from "./hash";

export const BLACK_MARKET_URL = "/shop.php?whichshop=blackmarket";

export function inventoryLink(filter: string | Item) {
  if (typeof filter !== "string") {
    filter = filter.name;
    filter = filter.replace(/^\[[0-9]+\]/, "");
  }
  return `/inventory.php?ftext=${filter}`;
}

export function skillLink(filter: string | Skill) {
  if (typeof filter !== "string") {
    filter = filter.name;
  }
  return `/skillz.php#:~:text=${encodeURIComponent(filter)}`;
}

const PARENTS = {
  Beach: "/place.php?whichplace=desertbeach",
  Woods: "/woods.php",
  HiddenCity: "/place.php?whichplace=hiddencity",
  Town: "/town.php",
  Manor1: "/place.php?whichplace=manor1",
  Manor2: "/place.php?whichplace=manor2",
  "Little Canadia": "/place.php?whichplace=canadia",
  Plains: "/place.php?whichplace=plains",
  BatHole: "/place.php?whichplace=bathole",
  Beanstalk: "/place.php?whichplace=beanstalk",
  Knob: "/cobbsknob.php",
  Mountains: "/mountains.php",
  "The Red Zeppelin's Mooring": "/place.php?whichplace=zeppelin",
  McLarge: "/place.php?whichplace=mclargehuge",
  Highlands: "/place.php?whichplace=highlands",
};
export function parentPlaceLink(location: Location): string | undefined {
  if (!canAdventure(location)) return undefined;

  const parentLink = PARENTS[location.zone as keyof typeof PARENTS];
  if (location === $location`The Smut Orc Logging Camp`) {
    return "/place.php?whichplace=orc_chasm";
  } else if (
    location.toString().startsWith("The Castle in the Clouds in the Sky")
  ) {
    return "/place.php?whichplace=giantcastle";
  } else if (
    $locations`The Unquiet Garves, The VERY Unquiet Garves`.includes(location)
  ) {
    return "/place.php?whichplace=cemetery";
  } else if (
    $locations`The Copperhead Club, The Neverending Party, The Tunnel of L.O.V.E.`.includes(
      location,
    )
  ) {
    return "/place.php?whichplace=town_wrong";
  } else if (
    location === $location`The Outskirts of Cobb's Knob` &&
    !canAdventure($location`Cobb's Knob Harem`)
  ) {
    return "/place.php?whichplace=plains";
  } else if (parentLink) {
    return parentLink;
  }
}

export function commandLink(command: string): string {
  return `/KoLmafia/sideCommand?pwd=${getHashIfAvailable()}&cmd=${encodeURIComponent(command)}`;
}

export function inventoryActionLink(action: string): string {
  return `/inventory.php?pwd=${getHashIfAvailable()}&action=${action}`;
}
