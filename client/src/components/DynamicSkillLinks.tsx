import { LinkProps } from "@chakra-ui/react";
import HeaderButton from "./HeaderButton";
import { Skill, mpCost, myHash, myMp, toInt } from "kolmafia";

interface Props extends LinkProps {
  linkedContent: Skill;
}

const DynamicLinks: React.FC<Props> = ({ linkedContent, ...props }) => {
  const linkID = toInt(linkedContent);

  return (
    <HeaderButton
      href={`/runskillz.php?action=Skillz&whichskill=${linkID}&targetplayer=0&pwd=${myHash()}&quantity=1`}
      disabled={myMp() < mpCost(linkedContent)}
      {...props}
    >
      cast
    </HeaderButton>
  );
};

export default DynamicLinks;
