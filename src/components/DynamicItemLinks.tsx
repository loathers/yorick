import { ButtonProps } from "@chakra-ui/react";
import {
  canEquip,
  haveEquipped,
  Item,
  myHash,
  toSlot,
  weaponHands,
  weaponType,
} from "kolmafia";
import { have } from "libram";
import { getHashIfAvailable } from "tome-kolmafia";

import AsyncButton from "./AsyncButton";
import HeaderButton from "./HeaderButton";

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

interface DynamicItemButtonsProps extends ButtonProps {
  linkedContent: Item;
}

const DynamicItemLinks: React.FC<DynamicItemButtonsProps> = ({
  linkedContent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick,
  ...props
}) => {
  const linkID = linkedContent.id;
  const isEquippable = canEquip(linkedContent);
  const equipSlot = toSlot(linkedContent);

  if (!have(linkedContent) || haveEquipped(linkedContent)) return <></>;

  if (equipSlot?.identifierString === "acc1") {
    return (
      <>
        {([1, 2, 3] as const).map((slot) => (
          <EquipButton
            key={slot}
            item={linkID}
            accessorySlot={slot}
            {...props}
          >{`acc${slot}`}</EquipButton>
        ))}
      </>
    );
  } else if (
    equipSlot?.identifierString === "weapon" &&
    weaponHands(linkedContent) === 1 &&
    weaponType(linkedContent)?.identifierString === "Muscle"
  ) {
    return (
      <>
        <EquipButton item={linkID} {...props}>
          main
        </EquipButton>
        <EquipButton item={linkID} action="dualwield" {...props}>
          off
        </EquipButton>
      </>
    );
  } else if (isEquippable) {
    return (
      <EquipButton item={linkID} {...props}>
        equip
      </EquipButton>
    );
  } else {
    return (
      <HeaderButton
        href={`/inv_use.php?pwd=${myHash()}&which=3&whichitem=${linkID}`}
        {...props}
      >
        use
      </HeaderButton>
    );
  }
};

export default DynamicItemLinks;
