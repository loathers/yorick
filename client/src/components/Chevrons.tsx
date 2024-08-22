import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";

interface ChevronProps {
  usesLeft: number;
  totalUses: number;
}

/**
 * Generate fading chevrons to describe # of a resource left out of total casts
 * @returns Three <ListIcon> objects colored by availability of the resource
 * @param usesLeft How many casts/uses you have left of the resource
 * @param totalUses Total number of uses the users has
 */
const Chevrons: React.FC<ChevronProps> = ({ usesLeft, totalUses }) => {
  return (
    <HStack display="inline-flex" verticalAlign="middle" spacing={0}>
      {new Array(totalUses).fill(null).map((_, index) => (
        <ChevronRightIcon // I tried a few types of icons. This was the best, for now.
          key={index}
          color={index < usesLeft ? "black" : "gray.400"}
          fontWeight={300}
          ml={-2}
        />
      ))}
    </HStack>
  );
};

export default Chevrons;
