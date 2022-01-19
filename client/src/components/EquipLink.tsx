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
      marginLeft="10px"
      fontSize="12"
      fontWeight="normal"
    >
      [equip]
    </Link>
  ) : (
    <></>
  );

export default EquipLink;
