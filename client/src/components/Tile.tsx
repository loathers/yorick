import React, { ReactNode } from "react";
import { Box, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { Placeholder } from "../util/makeValue";
import EquipLink from "./EquipLink";
import Info from "./Info";
import MainLink from "./MainLink";
import TileImage from "./TileImage";

export interface TileProps {
  header: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  disabled?: boolean;
  hide?: boolean;
  itemToEquip?: Placeholder<"Item">;
  tooltip?: ReactNode;
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
  tooltip,
}) => {
  if (hide) return <></>;

  const tile = (
    <HStack px={1} textColor={disabled ? "gray.500" : undefined}>
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} />
      <VStack align="stretch" spacing={0.3}>
        <HStack>
          <Heading as="h3" size="sm">
            {header}
          </Heading>
          {tooltip && (
            <Info label={tooltip}>
              <Icon color="gray.500" h={3.5} w={3.5} />
            </Info>
          )}
          <Text> {itemToEquip && <EquipLink itemToEquip={itemToEquip} />}</Text>
        </HStack>
        {children}
      </VStack>
    </HStack>
  );

  return href ? (
    <Box>
      <MainLink href={href}>{tile}</MainLink>
    </Box>
  ) : (
    <Box>{tile}</Box>
  );
};

export default Tile;
