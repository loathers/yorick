import { LinkProps, Text } from "@chakra-ui/react";
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

interface EquipLinkProps extends LinkProps {
  item: number;
  action?: "equip" | "dualwield";
  accessorySlot?: 1 | 2 | 3;
}

const EquipLink: React.FC<EquipLinkProps> = ({
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

interface Props extends LinkProps {
  linkedContent: Item;
}

const DynamicItemLink: React.FC<Props> = ({
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
        {([1, 2, 3] as (1 | 2 | 3)[]).map((slot) => (
          <Text key={slot}>
            <EquipLink
              item={linkID}
              accessorySlot={slot}
              {...props}
            >{`acc${slot}`}</EquipLink>
          </Text>
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
        <Text>
          <EquipLink item={linkID} {...props}>
            main
          </EquipLink>
        </Text>
        <Text>
          <EquipLink item={linkID} action="dualwield" {...props}>
            off
          </EquipLink>
        </Text>
      </>
    );
  } else if (isEquippable) {
    return (
      <EquipLink item={linkID} {...props}>
        equip
      </EquipLink>
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

export default DynamicItemLink;
