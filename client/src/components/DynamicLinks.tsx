import { LinkProps } from "@chakra-ui/react";
import { useMyHash, useToInt } from "../hooks/useCall";
import useHave from "../hooks/useHave";
import { Placeholder } from "../util/makeValue";
import DynamicItemLinks from "./DynamicItemLinks";
import HeaderLink from "./HeaderLink";

interface Props extends LinkProps {
  linkedContent:
    | Placeholder<"Item">
    | Placeholder<"Familiar">
    | Placeholder<"Skill">;
}

const DynamicLinks: React.FC<Props> = ({ linkedContent, ...props }) => {
  const myHash = useMyHash() ?? 0;
  const linkID = useToInt(linkedContent) ?? 1;

  if (!useHave(linkedContent)) return <></>;

  switch (linkedContent.objectType) {
    case "Item":
      return <DynamicItemLinks linkedContent={linkedContent} />;
    case "Familiar": {
      return (
        <HeaderLink
          href={`/familiar.php?&action=newfam&newfam=${linkID}&pwd=${myHash}`}
          {...props}
        >
          take
        </HeaderLink>
      );
    }
    case "Skill":
      return (
        <HeaderLink
          href={`/runskillz.php?action=Skillz&whichskill=${linkID}&targetplayer=0&pwd=${myHash}&quantity=1`}
          {...props}
        >
          cast
        </HeaderLink>
      );
  }
};

export default DynamicLinks;
