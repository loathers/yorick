import { Tooltip, TooltipProps } from "@chakra-ui/react";

const Info: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="gray.600"
    border="1px"
    borderColor="gray.400"
    shadow="xs"
    rounded="md"
    hasArrow
    arrowSize={10}
    arrowShadowColor="gray"
    ml="5"
    mr="5"
    p="3"
    isOpen // remove this later
    /*Anything defined prior to {...props} is overriden by anything passed in*/
    {...props}
  />
);

export default Info;
