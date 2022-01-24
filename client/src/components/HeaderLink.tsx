import { Button, LinkProps } from "@chakra-ui/react";
import MainLink from "./MainLink";

const HeaderLink: React.FC<LinkProps> = ({ children, ...props }) => (
  <MainLink {...props}>
    <Button
      // variant="outline"
      colorScheme="blackAlpha"
      size="xs"
      px={1}
      height={4}
    >
      {children}
    </Button>
  </MainLink>
);

export default HeaderLink;
