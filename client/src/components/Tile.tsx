import { Image, Heading, HStack, VStack, Box, Flex } from "@chakra-ui/react";
import React from "react";

type Props = {
  id: string;
  header?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export const Tile: React.FC<Props> = ({
  id,
  header,
  imageUrl,
  imageAlt,
  children,
}) => {
  return (
    <HStack id={id} p={2}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt ?? header}
          boxSize="30px"
          fit="contain"
        />
      ) : (
        <Box size="30px" />
      )}
      <VStack align="flex-start">
        <Heading as="h3" size="sm">
          {header}
        </Heading>
        {children}
      </VStack>
    </HStack>
  );
};
