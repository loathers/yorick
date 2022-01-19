import { Heading, HStack, Link, VStack } from "@chakra-ui/react";
import React from "react";
import EquipLink from "./EquipLink";
import TileImage from "./TileImage";

export interface TileProps {
  header: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  disabled?: boolean;
  equipItemLink?: string;
}

const Tile: React.FC<TileProps> = ({
  header,
  imageUrl,
  imageAlt,
  href,
  disabled,
  children,
  equipItemLink,
}) => {
  const tile = (
    <HStack px={2} textColor={disabled ? "gray.500" : undefined}>
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} />
      <VStack align="stretch" spacing={0.3}>
        <Heading as="h3" size="sm">
          {header}
          <EquipLink equipItemLink={equipItemLink} />
        </Heading>
        {children}
      </VStack>
    </HStack>
  );

  return href ? (
    <Link target="mainpane" href={href}>
      {tile}
    </Link>
  ) : (
    tile
  );
};

export default Tile;
