import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

import MainLink from "./MainLink";

interface HeaderButtonProps extends ButtonProps {
  href?: string;
}

const HeaderButton = forwardRef<HTMLButtonElement, HeaderButtonProps>(
  ({ href, onClick, children, ...props }, ref) => {
    const button = (
      <Button
        ref={ref}
        colorScheme="blackAlpha"
        size="xs"
        px={1}
        height={4}
        {...props}
      >
        {children}
      </Button>
    );
    return href && !onClick ? (
      <MainLink href={href} _hover={{ textDecoration: "none" }}>
        {button}
      </MainLink>
    ) : (
      button
    );
  },
);

export default HeaderButton;
