import { Button, LinkProps } from "@chakra-ui/react";
import MainLink from "./MainLink";

interface HeaderButtonProps extends LinkProps {
  href: string;
  disabled?: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  href,
  disabled,
  children,
  ...props
}) => (
  <MainLink
    href={href}
    as={Button}
    // variant="outline"
    colorScheme="blackAlpha"
    size="xs"
    px={1}
    height={4}
    disabled={disabled}
    {...props}
  >
    {children}
  </MainLink>
);

export default HeaderButton;
