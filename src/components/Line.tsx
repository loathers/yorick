import { Text, TextProps } from "@chakra-ui/react";

import AsyncLink from "./AsyncLink";
import MainLink from "./MainLink";

interface Props extends TextProps {
  href?: string;
  command?: string;
  async?: boolean;
}

const Line: React.FC<Props> = ({
  href,
  command,
  async = false,
  children,
  ...props
}) => {
  return (
    <Text mt={0} {...props}>
      {command ? (
        <AsyncLink command={command}>{children}</AsyncLink>
      ) : href ? (
        async ? (
          <AsyncLink href={href}>{children}</AsyncLink>
        ) : (
          <MainLink href={href}>{children}</MainLink>
        )
      ) : (
        children
      )}
    </Text>
  );
};

export default Line;
