import { LinkProps } from "@chakra-ui/react";
import { useMpCost, useMyHash, useMyMp, useToInt } from "../hooks/useCall";
import { Placeholder } from "../util/makeValue";
import HeaderButton from "./HeaderButton";

interface Props extends LinkProps {
  linkedContent: Placeholder<"Skill">;
}

const DynamicLinks: React.FC<Props> = ({ linkedContent, ...props }) => {
  const myHash = useMyHash() ?? 0;
  const linkID = useToInt(linkedContent) ?? 1;

  const myMp = useMyMp() ?? 0;
  const mpCost = useMpCost(linkedContent) ?? 0;

  return (
    <HeaderButton
      href={`/runskillz.php?action=Skillz&whichskill=${linkID}&targetplayer=0&pwd=${myHash}&quantity=1`}
      disabled={myMp < mpCost}
      {...props}
    >
      cast
    </HeaderButton>
  );
};

export default DynamicLinks;
