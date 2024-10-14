import { FC } from "react";

import Section, { SectionProps } from "./Section";
import TileErrorBoundary from "./TileErrorBoundary";

export interface TileSectionProps extends SectionProps {
  tiles: FC[];
}

const TileSection = ({ tiles, ...props }: TileSectionProps) => {
  return (
    <Section {...props}>
      {tiles.map((SpecificTile) => (
        <TileErrorBoundary key={SpecificTile.name} name={SpecificTile.name}>
          <SpecificTile />
        </TileErrorBoundary>
      ))}
    </Section>
  );
};

export default TileSection;
