import React, { ReactNode } from "react";

import ElementName from "../ElementName";

export interface SpecificElementProps {
  children?: ReactNode;
}

export const Cold: React.FC<SpecificElementProps> = ({ ...props }) => {
  return <ElementName element="cold" {...props} />;
};

export default Cold;
