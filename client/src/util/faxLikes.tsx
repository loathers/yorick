import { ReactNode } from "react";
import MainLink from "../components/MainLink";
import { inventory } from "./links";
import { truthy } from "./text";
import { availableAmount } from "kolmafia";
import { $item, get, have } from "libram";

export default function faxLikes(): ReactNode[] {
  const haveCargo = have($item`Cargo Cultist Shorts`);
  const usedCargo = get("_cargoPocketEmptied");
  const haveGenie = have($item`genie bottle`);
  const wishesUsed = get("_genieWishesUsed");
  const wishesAvailable =
    (haveGenie ? 3 - wishesUsed : 0) +
    (availableAmount($item`pocket wish`) ?? 0);
  const haveVIP = have($item`Clan VIP Lounge key`);
  const photocopyUsed = get("_photocopyUsed");

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
