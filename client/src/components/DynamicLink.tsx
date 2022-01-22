import { HStack, Text } from "@chakra-ui/react";
import {
  useCanEquip,
  useMyHash,
  useToInt,
  useToSlot,
  useWeaponHands,
  useWeaponType,
} from "../hooks/useCall";
import { $item, Placeholder } from "../util/makeValue";
import MainLink from "./MainLink";

interface Props {
  linkedContent:
    | Placeholder<"Item">
    | Placeholder<"Familiar">
    | Placeholder<"Skill">;
}

const DynamicLink: React.FC<Props> = ({ linkedContent }) => {
  const myHash = useMyHash() ?? 0;
  const isItem = linkedContent.objectType === "Item";
  const linkID = useToInt(linkedContent) ?? 1;
  const linkItem = $item`${linkID.toString()}`;
  const isEquippable = useCanEquip(linkItem) && isItem;
  const equipSlot = useToSlot(linkItem);
  const weaponHands = useWeaponHands(linkItem);
  const weaponType = useWeaponType(linkItem);

  switch (linkedContent.objectType) {
    case "Item":
      if (equipSlot?.identifierString === "acc1") {
        return (
          <HStack spacing={0.5}>
            <Text>Slot:</Text>
            <MainLink
              href={`/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${linkID}&slot=1`}
            >
              [1]
            </MainLink>
            <MainLink
              href={`/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${linkID}&slot=2`}
            >
              [2]
            </MainLink>
            <MainLink
              href={`/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${linkID}&slot=3`}
            >
              [3]
            </MainLink>
          </HStack>
        );
      } else if (
        isEquippable &&
        equipSlot?.identifierString === "weapon" &&
        weaponHands === 1 &&
        weaponType?.identifierString === "Muscle"
      ) {
        return (
          <HStack spacing={0.5}>
            <Text>Slot:</Text>
            <MainLink
              href={`/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${linkID}`}
            >
              [mainhand]
            </MainLink>
            <MainLink
              href={`/inv_equip.php?pwd=${myHash}&which=2&action=dualwield&whichitem=${linkID}`}
            >
              [offhand]
            </MainLink>
          </HStack>
        );
      } else {
        return (
          <MainLink
            href={`/inv_equip.php?pwd=${myHash}&which=2&action=equip&whichitem=${linkID}`}
          >
            [equip]
          </MainLink>
        );
      }
    case "Familiar":
      return (
        <MainLink
          href={`/familiar.php?&action=newfam&newfam=${linkID}&pwd=${myHash}`}
        >
          [take with you]
        </MainLink>
      );
    case "Skill":
      return (
        <MainLink
          href={`/runskillz.php?action=Skillz&whichskill=${linkID}&targetplayer=0&pwd=${myHash}&quantity=1`}
        >
          [cast on self]
        </MainLink>
      );
  }
};

export default DynamicLink;
