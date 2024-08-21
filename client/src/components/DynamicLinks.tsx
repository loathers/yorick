import { LinkProps } from "@chakra-ui/react";
import { Item, Familiar, Skill } from "kolmafia";
import { have } from "libram";
import DynamicFamiliarLinks from "./DynamicFamiliarLinks";
import DynamicItemLinks from "./DynamicItemLinks";
import DynamicSkillLinks from "./DynamicSkillLinks";

interface Props extends LinkProps {
  linkedContent: Item | Familiar | Skill;
}

const DynamicLinks: React.FC<Props> = ({ linkedContent }) => {
  if (!have(linkedContent)) return <></>;

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
