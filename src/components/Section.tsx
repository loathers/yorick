import { Heading, Stack, StackProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface SectionProps extends StackProps {
  name: string;
  children?: ReactNode;
}

const Section: React.FC<SectionProps> = ({ name, children, ...props }) => (
  <Stack spacing={3} align="stretch" pb={1} {...props}>
    <Heading as="h2" size="md" px={2}>
      {name}
    </Heading>
    {children}
  </Stack>
);

export default Section;
