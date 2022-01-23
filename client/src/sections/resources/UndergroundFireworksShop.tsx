import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $effect } from "../../util/makeValue";
import { commaOr, truthy } from "../../util/text";

const UndergroundFireworksShop = () => {
  const _fireworksShopHatBought = useGet("_fireworksShopHatBought", false);
  const _fireworksShopEquipmentBought = useGet(
    "_fireworksShopEquipmentBought",
    false
  );
  const everythingLooksYellow = useHave($effect`Everything Looks Yellow`);
  const everythingLooksBlue = useHave($effect`Everything Looks Blue`);
  const everythingLooksRed = useHave($effect`Everything Looks Red`);

  return (
    <Tile
      header="Underground Fireworks Shop"
      imageUrl="/images/itemimages/fwrocket2.gif"
      href="/clan_viplounge.php?action=fwshop&whichfloor=2"
      hide={
        !useGet("_fireworksShop", false) ||
        (_fireworksShopHatBought &&
          _fireworksShopEquipmentBought &&
          everythingLooksYellow &&
          everythingLooksBlue &&
          everythingLooksRed)
      }
    >
      <Line>
        Buy a rocket for 300 meat:{" "}
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
        <Line>Buy a +combat, -combat, or +ML hat for 500 meat.</Line>
      )}
      {!_fireworksShopEquipmentBought && (
        <Line>Buy a +item or +init equipment for 1000 meat.</Line>
      )}
    </Tile>
  );
};

export default UndergroundFireworksShop;
