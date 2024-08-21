import React, { ReactNode } from "react";
import { Heading, VStack } from "@chakra-ui/react";

interface Props {
  name: string;
  children?: ReactNode;
}

const Section: React.FC<Props> = ({ name, children }) => (
  <VStack spacing={1} align="stretch" mb={1}>
    <Heading as="h2" size="md" px={2}>
      {name}
    </Heading>
    {children}
  </VStack>
);

export default Section;
