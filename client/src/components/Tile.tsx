import { Heading, HStack, Link, VStack } from "@chakra-ui/react";
import React from "react";
import TileImage from "./TileImage";

type Props = {
  header: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
};

const Tile: React.FC<Props> = ({
  header,
  imageUrl,
  imageAlt,
  href,
  children,
}) => {
  const tile = (
    <HStack px={2}>
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} />
      <VStack align="stretch" spacing={0.3}>
        <Heading as="h3" size="sm">
          {header}
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
