import { Link } from "@chakra-ui/react";

interface Props {
  equipItemLink?: string;
}

const EquipLink: React.FC<Props> = ({ equipItemLink }) =>
  equipItemLink ? (
    <Link
      href={equipItemLink}
      target="_parent.mainpane"
      marginLeft="5px"
      fontSize="12"
      fontWeight="normal"
    >
      [equip]
    </Link>
  ) : (
    <></>
  );

export default EquipLink;
