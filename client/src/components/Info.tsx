import { Tooltip, TooltipProps } from "@chakra-ui/react";

const Info: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="black"
    border="1px"
    borderColor="gray.300"
    shadow="base"
    rounded="md"
    /*Anything defined prior to {...props} is overriden by anything passed in*/
    {...props}
  />
);

export default Info;
