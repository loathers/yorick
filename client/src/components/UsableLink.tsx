import { useMyHash, useToInt } from "../hooks/useCall";
import { Placeholder } from "../util/makeValue";
import MainLink from "./MainLink";

interface Props {
  itemToUse: Placeholder<"Item">;
}

const UsableLink: React.FC<Props> = ({ itemToUse }) => {
  const myHash = useMyHash();
  const itemID = useToInt(itemToUse ?? 0);
  return itemToUse ? (
    <MainLink
      href={`/inv_use.php?pwd=${myHash}&which=3&whichitem=${itemID}`}
      marginLeft="5px"
      fontSize="12"
      fontWeight="normal"
    >
      [use]
    </MainLink>
  ) : (
    <></>
  );
};

export default UsableLink;
