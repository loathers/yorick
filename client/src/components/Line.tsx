import { Text, TextProps } from "@chakra-ui/react";
import MainLink from "./MainLink";

interface Props extends TextProps {
  href?: string;
}

const Line: React.FC<Props> = ({ href, ...props }) => {
  const text = <Text textStyle="line" mt={0} fontSize="sm" {...props} />;
  return href ? <MainLink href={href}>{text}</MainLink> : text;
};

export default Line;
