import { LinkProps } from "@chakra-ui/react";
import { Familiar, Item, Skill } from "kolmafia";
import { have } from "libram";

import FamiliarButtons from "./FamiliarButtons";
import ItemButtons from "./ItemButtons";
import DynamicSkillLinks from "./SkillButtons";

interface ContentButtonsProps extends LinkProps {
  linkedContent: Item | Familiar | Skill;
}

const ContentButtons: React.FC<ContentButtonsProps> = ({ linkedContent }) => {
  if (!have(linkedContent)) return <></>;

  switch (linkedContent.objectType) {
    case "Item":
      return <ItemButtons linkedContent={linkedContent} />;
    case "Familiar": {
      return <FamiliarButtons linkedContent={linkedContent} />;
    }
    case "Skill":
      return <DynamicSkillLinks linkedContent={linkedContent} />;
  }
};

export default ContentButtons;
