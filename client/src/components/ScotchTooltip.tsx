import { Tooltip, TooltipProps } from "@chakra-ui/react";

const ScotchTooltip: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="black"
    border="4px"
    shadow="dark-lg"
    rounded="lg"
    /*Where all of scotch's default settings for tooltips will go*/ {...props}
  />
);

export default ScotchTooltip;
