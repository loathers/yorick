import { availableAmount, Item, myAscensions } from "kolmafia";
import { $familiar, get, have } from "libram";
import { $item } from "libram";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { haveUnrestricted } from "../../util/available";
import { commaAnd, plural, pluralItem } from "../../util/text";

const Island: React.FC = () => {
  const shoreScrip = availableAmount($item`Shore Inc. Ship Trip Scrip`);
  const haveCcsc = haveUnrestricted($item`candy cane sword cane`);
  const requiredTrips = haveCcsc ? 2 : 3;
  const islandUnlocked = get("lastIslandUnlock") === myAscensions();

  const pixels: [Item, number][] = [
    [$item`yellow pixel`, 50],
    [$item`red pixel`, 5],
    [$item`green pixel`, 5],
    [$item`blue pixel`, 5],
  ];

  const pixelsNeeded = pixels
    .map(
      ([item, count]) =>
        [item, count - availableAmount(item)] as [Item, number],
    )
    .filter(([, count]) => count > 0);

  if (islandUnlocked) return null;

  return (
    <QuestTile
      header="Unlock Mysterious Island"
      imageUrl="/images/itemimages/dinghy.gif"
      href="/place.php?whichplace=desertbeach"
    >
      {shoreScrip < 3 && !have($item`dinghy plans`) && (
        <>
          <Line>
            Visit The Shore, Inc.{" "}
            {plural(requiredTrips - shoreScrip, "more time")} to get enough
            scrip for the dinghy plans.
          </Line>
          {haveCcsc && !get("candyCaneSwordShore") && (
            <Line>Equip your candy cane sword to get extra scrip.</Line>
          )}
        </>
      )}
      {have($item`dinghy plans`) && (
        <Line>Use your dinghy plans to make a boat.</Line>
      )}
      {(haveUnrestricted($familiar`Puck Man`) ||
        haveUnrestricted($familiar`Ms. Puck Man`)) &&
        (pixelsNeeded.length > 0 ? (
          <Line>
            Or get a yellow submarine from your Puck Man. Need{" "}
            {commaAnd(
              pixelsNeeded.map(([item, count]) => pluralItem(item, count)),
            )}
            .
          </Line>
        ) : !have($item`yellow submarine`) ? (
          <Line href="/place.php?whichplace=forestvillage&action=fv_mystic">
            You have all the pixels needed. Make a yellow submarine.
          </Line>
        ) : null)}
      {/* TODO: add junk junk */}
    </QuestTile>
  );
};

export default Island;
