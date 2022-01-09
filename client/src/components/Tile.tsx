import React from "react";

type Props = {
  id: string;
};

export const Tile: React.FC<Props> = ({ id, children }) => {
  return <div id={id}>{children}</div>;
};
