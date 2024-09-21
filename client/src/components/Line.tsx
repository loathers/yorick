import { Text, TextProps } from "@chakra-ui/react";

import MainLink from "./MainLink";

interface Props extends TextProps {
  href?: string;
}

const Line: React.FC<Props> = ({ href, children, ...props }) => {
  return (
    <Text mt={0} {...props}>
      {href ? <MainLink href={href}>{children}</MainLink> : children}
    </Text>
  );
};

export default Line;
