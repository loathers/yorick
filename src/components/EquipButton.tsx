import { ButtonProps } from "@chakra-ui/react";
import { getHashIfAvailable } from "tome-kolmafia";

import AsyncButton from "./AsyncButton";

interface EquipButtonProps extends ButtonProps {
  item: number;
  action?: "equip" | "dualwield";
  accessorySlot?: 1 | 2 | 3;
}

const EquipButton: React.FC<EquipButtonProps> = ({
  item,
  action,
  accessorySlot,
  children,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick,
  ...props
}) => {
  return (
    <AsyncButton
      href={`/inv_equip.php?pwd=${getHashIfAvailable()}&which=2&action=${
        action ?? "equip"
      }&whichitem=${item}${accessorySlot ? `&slot=${accessorySlot}` : ""}`}
      {...props}
    >
      {children}
    </AsyncButton>
  );
};

export default EquipButton;
