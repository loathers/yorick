import { LinkProps, Text } from "@chakra-ui/react";
import {
  useCanEquip,
  useHaveEquipped,
  useMyHash,
  useToInt,
  useToSlot,
  useWeaponHands,
  useWeaponType,
} from "../hooks/useCall";
import useHave from "../hooks/useHave";
import { $item, Placeholder } from "../util/makeValue";
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
  ...props
}) => {
  const hash = useMyHash();
  return (
    <HeaderButton
      href={`/inv_equip.php?pwd=${hash}&which=2&action=${
        action ?? "equip"
      }&whichitem=${item}${accessorySlot ? `&slot=acc${accessorySlot}` : ""}`}
      {...props}
    >
      {children}
    </HeaderButton>
  );
};

interface Props extends LinkProps {
  linkedContent: Placeholder<"Item">;
}

const DynamicItemLink: React.FC<Props> = ({ linkedContent, ...props }) => {
  const myHash = useMyHash() ?? 0;
  const linkID = useToInt(linkedContent) ?? 1;
  const linkItem = $item`${linkID.toString()}`;
  const isEquippable = useCanEquip(linkItem);
  const equipSlot = useToSlot(linkItem);
  const weaponHands = useWeaponHands(linkItem);
  const weaponType = useWeaponType(linkItem);
  const have = useHave(linkedContent);
  const haveEquipped = useHaveEquipped(linkedContent);

  if (!have || haveEquipped) return <></>;

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
    weaponHands === 1 &&
    weaponType?.identifierString === "Muscle"
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
        href={`/inv_use.php?pwd=${myHash}&which=3&whichitem=${linkID}`}
        {...props}
      >
        use
      </HeaderButton>
    );
  }
};

export default DynamicItemLink;
