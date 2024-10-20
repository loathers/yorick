import { Text } from "@chakra-ui/react";
import { FC } from "react";

import Section, { SectionProps } from "./Section";
import TileErrorBoundary from "./TileErrorBoundary";

export interface TileSectionProps extends SectionProps {
  tiles: FC[];
}

const TileSection = ({ tiles, ...props }: TileSectionProps) => {
  const rendered = tiles.map<[string, JSX.Element]>((SpecificTile) => [
    SpecificTile.name,
    <SpecificTile />,
  ]);

  if (!rendered.some(([, tile]) => tile)) return null;

  return (
    <Section {...props}>
      {rendered.every(([, tile]) => !tile) ? (
        <Text as="i">No information to display.</Text>
      ) : (
        rendered.map(([name, tile]) => (
          <TileErrorBoundary key={name} name={name}>
            {tile}
          </TileErrorBoundary>
        ))
      )}
    </Section>
  );
};

export default TileSection;
