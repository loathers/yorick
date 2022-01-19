import { useHaveEquipped, useMyHash, useToInt } from "../hooks/useCall";
import { Placeholder } from "../util/makeValue";
import MainLink from "./MainLink";

interface Props {
  itemToEquip: Placeholder<"Item">;
}

const EquipLink: React.FC<Props> = ({ itemToEquip }) => {
  const myHash = useMyHash();
  const itemID = useToInt(itemToEquip ?? 0);
  const haveEquipped = useHaveEquipped(itemToEquip);
  return itemToEquip && !haveEquipped ? (
    <MainLink
      href={`/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${itemID}`}
      marginLeft="5px"
      fontSize="12"
      fontWeight="normal"
    >
      [equip]
    </MainLink>
  ) : (
    <></>
  );
};

export default EquipLink;
