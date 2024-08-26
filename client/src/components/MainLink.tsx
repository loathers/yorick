import { Link, LinkProps } from "@chakra-ui/react";

type MainLinkProps = Omit<LinkProps, "href" | "target"> & { href?: string };

const MainLink: React.FC<MainLinkProps> = ({ href, children, ...props }) =>
  href ? (
    <Link target="mainpane" href={href} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

export default MainLink;
