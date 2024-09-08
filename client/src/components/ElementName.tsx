import { Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface ElementNameProps {
  element: string;
  children?: ReactNode
}

export const ElementName: React.FC<ElementNameProps> = ({
  element,
  children
}) => {
  const elementColors: Record<string, string> = {
    "cold": "blue.500",
    "hot": "red.500",
    "spooky": "gray.500",
    "stench": "green.500",
    "sleaze": "purple.500"
  };

  return (<Text as="span" color={elementColors[element]}>{children ?? element}</Text>);
};

export interface SpecificElementProps {
  children?: ReactNode
}

export const Cold: React.FC<SpecificElementProps> = ({...props}) => {
  return <ElementName element="cold" {...props}/>
};

export const Hot: React.FC<SpecificElementProps> = ({...props}) => {
  return <ElementName element="hot" {...props}/>
};

export const Spooky: React.FC<SpecificElementProps> = ({...props}) => {
  return <ElementName element="spooky" {...props}/>
};

export const Stench: React.FC<SpecificElementProps> = ({...props}) => {
  return <ElementName element="stench" {...props}/>
};

export const Sleaze: React.FC<SpecificElementProps> = ({...props}) => {
  return <ElementName element="sleaze" {...props}/>
};

export default ElementName;
