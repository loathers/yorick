import { ChevronRightIcon } from "@chakra-ui/icons";
import { HStack, StackProps } from "@chakra-ui/react";
import React from "react";

interface ChevronProps extends StackProps {
  usesLeft: number;
  totalUses: number;
}

/**
 * Generate fading chevrons to describe # of a resource left out of total casts
 * @returns Three <ListIcon> objects colored by availability of the resource
 * @param usesLeft How many casts/uses you have left of the resource
 * @param totalUses Total number of uses the users has
 */
const Chevrons: React.FC<ChevronProps> = ({
  usesLeft,
  totalUses,
  ...props
}) => {
  return (
    <HStack
      as="span"
      display="inline-flex"
      verticalAlign="middle"
      spacing={0}
      {...props}
    >
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
