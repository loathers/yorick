import React, { ReactNode } from "react";

import ElementName from "../ElementName";

export interface SpecificElementProps {
  children?: ReactNode;
}

export const Stench: React.FC<SpecificElementProps> = ({ ...props }) => {
  return <ElementName element="stench" {...props} />;
};

export default Stench;
