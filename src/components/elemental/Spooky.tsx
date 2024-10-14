import React, { ReactNode } from "react";

import ElementName from "../ElementName";

export interface SpecificElementProps {
  children?: ReactNode;
}

export const Spooky: React.FC<SpecificElementProps> = ({ ...props }) => {
  return <ElementName element="spooky" {...props} />;
};

export default Spooky;
