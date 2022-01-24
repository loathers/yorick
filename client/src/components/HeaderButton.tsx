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
  <MainLink href={href} _hover={{ textDecoration: "none" }} {...props}>
    <Button
      colorScheme="blackAlpha"
      size="xs"
      px={1}
      height={4}
      disabled={disabled}
    >
      {children}
    </Button>
  </MainLink>
);

export default HeaderButton;
