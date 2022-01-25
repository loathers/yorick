import { LinkProps } from "@chakra-ui/react";
import useHave from "../hooks/useHave";
import { Placeholder } from "../util/makeValue";
import DynamicFamiliarLinks from "./DynamicFamiliarLinks";
import DynamicItemLinks from "./DynamicItemLinks";
import DynamicSkillLinks from "./DynamicSkillLinks";

interface Props extends LinkProps {
  linkedContent:
    | Placeholder<"Item">
    | Placeholder<"Familiar">
    | Placeholder<"Skill">;
}

const DynamicLinks: React.FC<Props> = ({ linkedContent }) => {
  if (!useHave(linkedContent)) return <></>;

  switch (linkedContent.objectType) {
    case "Item":
      return <DynamicItemLinks linkedContent={linkedContent} />;
    case "Familiar": {
      return <DynamicFamiliarLinks linkedContent={linkedContent} />;
    }
    case "Skill":
      return <DynamicSkillLinks linkedContent={linkedContent} />;
  }
};

export default DynamicLinks;
