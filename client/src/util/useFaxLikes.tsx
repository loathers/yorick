import { ReactNode } from "react";
import MainLink from "../components/MainLink";
import { useAvailableAmount } from "../hooks/useCall";
import useGet from "../hooks/useGet";
import useHave from "../hooks/useHave";
import { inventory } from "./links";
import { $item } from "./makeValue";
import { truthy } from "./text";

export default function useFaxLikes(): ReactNode[] {
  const haveCargo = useHave($item`Cargo Cultist Shorts`);
  const usedCargo = useGet("_cargoPocketEmptied");
  const haveGenie = useHave($item`genie bottle`);
  const wishesUsed = useGet("_genieWishesUsed");
  const wishesAvailable =
    (haveGenie ? 3 - wishesUsed : 0) +
    (useAvailableAmount($item`pocket wish`) ?? 0);
  const haveVIP = useHave($item`Clan VIP Lounge key`);
  const photocopyUsed = useGet("_photocopyUsed");

  return truthy([
    haveCargo && !usedCargo && (
      <MainLink href={inventory($item`Cargo Cultist Shorts`)} fontWeight="bold">
        cargo shorts
      </MainLink>
    ),
    wishesAvailable > 0 && (
      <MainLink
        href={inventory(
          wishesUsed < 3 ? $item`genie bottle` : $item`pocket wish`
        )}
        fontWeight="bold"
      >
        wish
      </MainLink>
    ),
    haveVIP && !photocopyUsed && "fax",
  ]);
}
