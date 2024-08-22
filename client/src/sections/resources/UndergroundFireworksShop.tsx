import { $effect, $item, get, have } from "libram";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { commaOr, truthy } from "../../util/text";
import { isUnrestricted, npcPrice } from "kolmafia";

const UndergroundFireworksShop = () => {
  const _fireworksShopHatBought = get("_fireworksShopHatBought", false);
  const _fireworksShopEquipmentBought = get(
    "_fireworksShopEquipmentBought",
    false
  );
  const everythingLooksYellow = have($effect`Everything Looks Yellow`);
  const everythingLooksBlue = have($effect`Everything Looks Blue`);
  const everythingLooksRed = have($effect`Everything Looks Red`);
  const prices = {
    rockets: npcPrice($item`red rocket`),
    hats: npcPrice($item`fedora-mounted fountain`),
    equipment: npcPrice($item`Catherine Wheel`),
  };

  return (
    <Tile
      header="Underground Fireworks Shop"
      imageUrl="/images/itemimages/fwrocket2.gif"
      href="/clan_viplounge.php?action=fwshop&whichfloor=2"
      hide={
        !get("_fireworksShop", false) ||
        !isUnrestricted($item`clan underground fireworks shop`) ||
        (_fireworksShopHatBought &&
          _fireworksShopEquipmentBought &&
          everythingLooksYellow &&
          everythingLooksBlue &&
          everythingLooksRed)
      }
    >
      <Line>
        Buy a rocket for {prices.rockets} meat:{" "}
        {commaOr(
          truthy([
            !everythingLooksYellow && "yellow (YR)",
            !everythingLooksBlue && "blue (restore MP)",
            !everythingLooksRed && "red (stats from food)",
          ])
        )}
        .
      </Line>
      {!_fireworksShopHatBought && (
        <Line>Buy a +combat, -combat, or +ML hat for {prices.hats} meat.</Line>
      )}
      {!_fireworksShopEquipmentBought && (
        <Line>Buy a +item or +init equipment for {prices.equipment} meat.</Line>
      )}
    </Tile>
  );
};

export default UndergroundFireworksShop;
