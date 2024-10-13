import { RepeatIcon } from "@chakra-ui/icons";
import { ButtonProps, IconButton } from "@chakra-ui/react";

const RefreshButton: React.FC<ButtonProps> = (props) => (
  <IconButton
    icon={<RepeatIcon />}
    aria-label="Refresh"
    size="xs"
    fontSize="15px"
    variant="outline"
    backgroundColor="white"
    {...props}
  />
);

export default RefreshButton;
