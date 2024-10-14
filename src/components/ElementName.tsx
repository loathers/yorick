import { Text } from "@chakra-ui/react";
import { ElementType } from "kolmafia";
import React, { ReactNode } from "react";

export interface ElementNameProps {
  element: ElementType;
  children?: ReactNode;
}

export const ElementName: React.FC<ElementNameProps> = ({
  element,
  children,
}) => {
  const elementColors: Record<string, string> = {
    cold: "blue.500",
    hot: "red.500",
    spooky: "gray.500",
    stench: "green.500",
    sleaze: "purple.500",
  };

  return (
    <Text as="b" color={elementColors[element]}>
      {children ?? element}
    </Text>
  );
};

export default ElementName;
