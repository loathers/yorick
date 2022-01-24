import { LinkProps } from "@chakra-ui/react";
import { useMyFamiliar, useMyHash, useToInt } from "../hooks/useCall";
import useHave from "../hooks/useHave";
import { Placeholder, placeholderIdentifier } from "../util/makeValue";
import HeaderLink from "./HeaderLink";

interface Props extends LinkProps {
  linkedContent: Placeholder<"Familiar">;
}

const DynamicFamiliarLinks: React.FC<Props> = ({ linkedContent, ...props }) => {
  const myHash = useMyHash() ?? 0;
  const linkID = useToInt(linkedContent) ?? 1;

  const have = useHave(linkedContent);
  const haveOut =
    useMyFamiliar()?.identifierString === placeholderIdentifier(linkedContent);

  if (!have || haveOut) return <></>;

  return (
    <HeaderLink
      href={`/familiar.php?&action=newfam&newfam=${linkID}&pwd=${myHash}`}
      {...props}
    >
      take
    </HeaderLink>
  );
};

export default DynamicFamiliarLinks;
