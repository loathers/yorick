import MainLink from "./MainLink";

interface Props {
  equipItemLink: string | undefined;
}

const EquipLink: React.FC<Props> = ({ equipItemLink }) =>
  equipItemLink ? (
    <MainLink
      href={equipItemLink}
      marginLeft="5px"
      fontSize="12"
      fontWeight="normal"
    >
      [equip]
    </MainLink>
  ) : (
    <></>
  );

export default EquipLink;
