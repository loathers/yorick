import { Code, Link, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Tile from "./Tile";

interface TileErrorBoundaryProps {
  name: string;
  children: ReactNode;
}

const TileErrorBoundary = ({ name, children }: TileErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <Tile
          header={
            <Text as="span" color="red.700">
              Error in tile {name}.
            </Text>
          }
          nonCollapsible
          bgColor="red.100"
        >
          <Code>{error.message}</Code>
          <Text>
            <Link
              href="https://github.com/loathers/yorick/issues"
              target="_blank"
            >
              Please report this on GitHub!
            </Link>
          </Text>
        </Tile>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default TileErrorBoundary;
