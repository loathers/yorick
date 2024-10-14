import { $effect, $item, $skill, get, have } from "libram";
import React from "react";

import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { NagPriority } from "../../contexts/NagContext";
import useNag from "../../hooks/useNag";
import { haveUnrestricted } from "../../util/available";

const BeatenUp: React.FC = () => {
  let method = "";
  let url: string | null = null;
  let command: string | null = null;

  if (have($skill`Tongue of the Walrus`)) {
    method = "Cast Tongue of the Walrus.";
    command = "cast Tongue of the Walrus";
  } else if (
    haveUnrestricted($item`Clan VIP Lounge key`) &&
    get("_hotTubSoaks") < 5
  ) {
    method = "Soak in VIP hot tub.";
    url = "clan_viplounge.php";
  } else if (have($skill`Shake It Off`)) {
    method = "Cast Shake It Off.";
    url = "skills.php";
  } else if (get("timesRested", 0) < get("freeRestsDailyLimit", 0)) {
    method = `Free rest at ${get("restingDescription")}.`;
    url = get("restingURL");
  } else {
    const healingItems = [
      $item`tiny house`,
      $item`Space Tours Tripple`,
      $item`personal massager`,
      $item`forest tears`,
      $item`CSA all-purpose soap`,
    ];
    for (const item of healingItems) {
      if (have(item)) {
        method = `Use ${item}.`;
        url = "inventory.php?which=1";
        break;
      }
    }
  }

  useNag(
    () => ({
      id: "beaten-up-nag",
      priority: NagPriority.HIGH,
      node: have($effect`Beaten Up`) &&
        !have($effect`Thrice-Cursed`) &&
        method && (
          <Tile
            header="Remove beaten up"
            imageUrl="/images/itemimages/beatenup.gif"
          >
            <Line command={command ?? undefined} href={url ?? undefined}>
              {method}
            </Line>
          </Tile>
        ),
    }),
    [command, method, url],
  );

  return null;
};

export default BeatenUp;
