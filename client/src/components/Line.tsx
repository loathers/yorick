import { Link, Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  href?: string;
}

const Line: React.FC<Props> = ({ href, ...props }) => {
  const text = <Text textStyle="line" mt={0} fontSize="sm" {...props} />;
  return href ? (
    <Link target="mainpane" href={href}>
      {text}
    </Link>
  ) : (
    text
  );
};

export default Line;
