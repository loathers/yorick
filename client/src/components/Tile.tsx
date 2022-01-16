import { Heading, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import TileImage from "./TileImage";

type Props = {
  header?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const Tile: React.FC<Props> = ({ header, imageUrl, imageAlt, children }) => {
  return (
    <HStack px={2}>
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} />
      <VStack align="stretch" spacing={0}>
        <Heading as="h3" size="sm">
          {header}
        </Heading>
        {children}
      </VStack>
    </HStack>
  );
};

export default Tile;
