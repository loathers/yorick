import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

type Props = {
  name: string;
};

export const Section: React.FC<Props> = ({ name, children }) => (
  <Flex direction="column">
    <Heading as="h2" size="lg" p={1}>
      {name}
    </Heading>
    {children}
  </Flex>
);
