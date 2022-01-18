import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useHave from "../../hooks/useHave";
import { useGet } from "../../hooks/useProperties";
import { $effect } from "../../util/makeValue";

const UndergroundFireworksShop = () => {
  const _fireworksShopHatBought = useGet("_fireworksShopHatBought", false);
  const _fireworksShopEquipmentBought = useGet(
    "_fireworksShopEquipmentBought",
    false
  );
  const everythingLooksYellow = useHave($effect`Everything Looks Yellow`);
  const everythingLooksBlue = useHave($effect`Everything Looks Blue`);
  const everythingLooksRed = useHave($effect`Everything Looks Red`);
  if (
    !useGet("_fireworksShop", false) ||
    (_fireworksShopHatBought &&
      _fireworksShopEquipmentBought &&
      everythingLooksYellow &&
      everythingLooksBlue &&
      everythingLooksRed)
  ) {
    return <></>;
  } else
    return (
      <Tile
        header="Underground Fireworks Shop"
        imageUrl="/images/itemimages/fwrocket2.gif"
        href="/clan_viplounge.php?action=fwshop&whichfloor=2"
      >
        {!everythingLooksYellow && (
          <Line>Use a yellow rocket to yellow ray a monster.</Line>
        )}
        {!everythingLooksBlue && (
          <Line>
            Use a blue rocket to recover 1000 MP per fight over the next 10
            adventures.
          </Line>
        )}
        {!everythingLooksRed && (
          <Line>
            Use a red rocket to boost your stat gains from the next food you
            eat.
          </Line>
        )}
        {!_fireworksShopHatBought && (
          <Line>Buy a +combat, -combat, or +ML hat for 500 meat.</Line>
        )}
        {!_fireworksShopEquipmentBought && (
          <Line>Buy a +item, or +init equipment for 1000 meat.</Line>
        )}
      </Tile>
    );
};

export default UndergroundFireworksShop;
