import { Familiar, myFamiliar, myHash } from "kolmafia";
import { have } from "libram";

import AsyncButton, { AsyncButtonProps } from "./AsyncButton";

interface Props extends AsyncButtonProps {
  linkedContent: Familiar;
}

const DynamicFamiliarLinks: React.FC<Props> = ({ linkedContent, ...props }) => {
  const linkID = linkedContent.id;

  const haveOut = myFamiliar() === linkedContent;

  if (!have(linkedContent) || haveOut) return <></>;

  return (
    <AsyncButton
      href={`/familiar.php?&action=newfam&newfam=${linkID}&pwd=${myHash()}`}
      {...props}
    >
      take
    </AsyncButton>
  );
};

export default DynamicFamiliarLinks;
