import { Button, LinkProps } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

import MainLink from "./MainLink";

interface HeaderButtonProps extends Omit<LinkProps, "onClick"> {
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  href,
  disabled,
  loading,
  onClick,
  children,
  ...props
}) => {
  const button = (
    <Button
      colorScheme="blackAlpha"
      size="xs"
      px={1}
      height={4}
      isDisabled={disabled}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
  return href && !onClick ? (
    <MainLink href={href} _hover={{ textDecoration: "none" }} {...props}>
      {button}
    </MainLink>
  ) : (
    button
  );
};

export default HeaderButton;
