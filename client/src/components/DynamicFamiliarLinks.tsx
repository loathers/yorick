import { LinkProps } from "@chakra-ui/react";
import { Familiar, myFamiliar, myHash } from "kolmafia";
import { have } from "libram";

import HeaderButton from "./HeaderButton";

interface Props extends LinkProps {
  linkedContent: Familiar;
}

const DynamicFamiliarLinks: React.FC<Props> = ({ linkedContent, ...props }) => {
  const linkID = linkedContent.id;

  const haveOut = myFamiliar() === linkedContent;

  if (!have(linkedContent) || haveOut) return <></>;

  return (
    <HeaderButton
      href={`/familiar.php?&action=newfam&newfam=${linkID}&pwd=${myHash()}`}
      {...props}
    >
      take
    </HeaderButton>
  );
};

export default DynamicFamiliarLinks;
