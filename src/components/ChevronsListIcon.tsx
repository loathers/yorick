import { IconProps, ListIcon } from "@chakra-ui/react";

import Chevrons from "./Chevrons";

interface ChevronsListIconProps extends IconProps {
  usesLeft: number;
  totalUses: number;
}

const ChevronsListIcon: React.FC<ChevronsListIconProps> = (props) => (
  <ListIcon
    as={Chevrons}
    display="inline-flex"
    verticalAlign="center"
    my="auto"
    {...props}
  />
);

export default ChevronsListIcon;
