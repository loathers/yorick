import { Link } from "@chakra-ui/react";
import useCall from "../hooks/useCall";

interface Props {
  equipItem?: number;
}

const EquipLink: React.FC<Props> = ({ equipItem }) =>
  equipItem ? (
    <Link
      href={
        `/inv_equip.php?pwd=` +
        useCall.myHash() +
        `&which=2&action=equip&whichitem=` +
        equipItem
      }
      paddingLeft="12%"
      fontSize="12"
    >
      [equip]
    </Link>
  ) : (
    <></>
  );

export default EquipLink;
