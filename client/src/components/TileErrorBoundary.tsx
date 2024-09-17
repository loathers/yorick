import { Box, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

import ErrorBoundary from "./ErrorBoundary";

interface TileErrorBoundaryProps {
  name: string;
  children: ReactNode;
}

const TileErrorBoundary = ({ name, children }: TileErrorBoundaryProps) => {
  return (
    <ErrorBoundary
      fallback={
        <HStack px={2}>
          <Box w="30px" h="1px" />
          <VStack align="stretch" spacing={0.5}>
            <Heading as="h3" size="sm" color="red.500">
              Error in tile {name}
            </Heading>
            <Text>
              <Link href="https://github.com/loathers/yorick/issues">
                Please report this on GitHub!
              </Link>
            </Text>
          </VStack>
        </HStack>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default TileErrorBoundary;
