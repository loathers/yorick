import React from "react";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Placeholder } from "../util/makeValue";
import EquipLink from "./EquipLink";
import MainLink from "./MainLink";
import TileImage from "./TileImage";
import UseLink from "./UseLink";

export interface TileProps {
  header: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  disabled?: boolean;
  hide?: boolean;
  itemToEquip?: Placeholder<"Item">;
  itemToUse?: Placeholder<"Item">;
  itemUseLinkHide?: boolean;
}

const Tile: React.FC<TileProps> = ({
  header,
  imageUrl,
  imageAlt,
  href,
  disabled,
  children,
  hide,
  itemToEquip,
  itemToUse,
  itemUseLinkHide,
}) => {
  if (hide) return <></>;

  const tile = (
    <HStack px={2} textColor={disabled ? "gray.500" : undefined}>
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} />
      <VStack align="stretch" spacing={0.3}>
        <Heading as="h3" size="sm">
          {header}
          {itemToEquip && <EquipLink itemToEquip={itemToEquip} />}
          {itemToUse && !itemUseLinkHide && <UseLink itemToUse={itemToUse} />}
        </Heading>
        {children}
      </VStack>
    </HStack>
  );

  return href ? <MainLink href={href}>{tile}</MainLink> : tile;
};

export default Tile;
