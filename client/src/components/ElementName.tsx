import {
  Text,
} from "@chakra-ui/react";
import React from "react";

export interface ElementNameProps {
  element: string;
  text?: string
}

export const ElementName: React.FC<ElementNameProps> = ({
  element,
  text
}) => {
  const elementColors: Record<string, string> = {
    "cold": "blue.500",
    "hot": "red.500",
    "spooky": "gray.500",
    "stench": "green.500",
    "sleaze": "purple.500"
  };

  return (<Text as="span" color={elementColors[element]}>{text ?? element}</Text>);
};

export default ElementName;