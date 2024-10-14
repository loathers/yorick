import React, { ReactNode } from "react";

import ElementName from "../ElementName";

export interface SpecificElementProps {
  children?: ReactNode;
}

export const Hot: React.FC<SpecificElementProps> = ({ ...props }) => {
  return <ElementName element="hot" {...props} />;
};

export default Hot;
