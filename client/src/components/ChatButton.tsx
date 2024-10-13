import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ButtonProps, IconButton } from "@chakra-ui/react";

export interface ChatButtonProps extends ButtonProps {
  direction: "left" | "right";
}

const ChatButton: React.FC<ChatButtonProps> = ({ direction, ...props }) => (
  <IconButton
    icon={direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    aria-label="Refresh"
    size="xs"
    fontSize="20px"
    variant="outline"
    backgroundColor="white"
    {...props}
  />
);

export default ChatButton;
