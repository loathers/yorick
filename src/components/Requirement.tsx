import { Badge, BadgeProps } from "@chakra-ui/react";

interface RequirementProps extends Omit<BadgeProps, "colorScheme"> {
  met: boolean;
}

const Requirement: React.FC<RequirementProps> = ({
  met,
  children,
  ...props
}) => (
  <Badge colorScheme={met ? "blue" : "red"} p={0.5} {...props}>
    {children}
  </Badge>
);

export default Requirement;
