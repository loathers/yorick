import React from "react";
import { InfoIcon, IconProps } from "@chakra-ui/icons";
import {
  Text,
  HStack,
  VStack,
  Image,
  Icon,
  Tooltip,
  TooltipProps,
  ComponentWithAs,
  Box,
} from "@chakra-ui/react";

interface AdviceIconProps {
  text: string;
  icon?: ComponentWithAs<"svg", IconProps>;
}

const AdviceTip: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="gray.600"
    border="1px"
    borderColor="gray.400"
    shadow="xs"
    rounded="md"
    hasArrow
    arrowSize={10}
    arrowShadowColor="gray" // NOTE: The "gray.400" style colors don't work in this field.
    mx={5}
    p={3}
    /*Anything defined prior to {...props} is overriden by anything passed in*/
    {...props}
  />
);

/**
 * A tooltip generated on an icon hoverover with a skull that states whatever text you want for the player.
 * @param text The text you want displayed in this tooltip.
 * @param icon (optional) Defaults to a filled-in ? info icon. Can be any icon within chakra-ui/icon.
 * @returns A React.FC Tooltip object where the displayed icon generates the tooltip on hoverover.
 */
export const AdviceTooltipIcon: React.FC<AdviceIconProps> = ({
  text,
  icon,
}) => {
  const toolTip = (
    <HStack px={2}>
      <Image
        src={"/images/itemimages/yorick.gif"}
        alt={"Yorick, the Skeleton"}
        boxSize="30px"
        fit="contain"
      />
      <VStack align="stretch" spacing={0.3}>
        <Text bg="gray.200" p={4} rounded="md" fontSize={12}>
          {text}
        </Text>
      </VStack>
    </HStack>
  );

  return (
    <AdviceTip label={toolTip}>
      <Icon as={icon ? icon : InfoIcon} color="gray.500" h={3.5} w={3.5} />
    </AdviceTip>
  );
};

interface AdviceProps {
  text: string | JSX.Element;
  label: string;
}

/**
 * A tooltip generated on text for a quick descriptive tooltip.
 * @param text The text you want displayed inside this tooltip.
 * @param label The text you want displayed that users hover over to get the tooltip
 * @returns A React.FC Tooltip object where the label generates the tooltip on hoverover.
 */
export const AdviceTooltip: React.FC<AdviceProps> = ({ text, label }) => {
  const toolTip = [
    <Box align="stretch">
      <Text bg="gray.100" p={2} rounded="md" fontSize={12}>
        {text}
      </Text>
    </Box>,
  ];

  return (
    <AdviceTip label={toolTip}>
      <Text
        as="span"
        fontWeight="bold"
        color="gray.500"
        decoration="underline dotted lightsteelblue"
      >
        {label}
      </Text>
    </AdviceTip>
  );
};

// EVERYTHING BELOW THIS IS A WORK-IN-PROGRESS !
//   End goal is a tooltip that displays actual effect info on hoverover for a skill/effect.
//   Currently styled as blue because that's how effects are spawned in the game.

const EffectTip: React.FC<TooltipProps> = ({ ...props }) => (
  <Tooltip
    bg="white"
    color="blue.500"
    border="1px"
    borderColor="lightskyblue"
    rounded="md"
    shadow="none"
    hasArrow
    arrowSize={10}
    arrowShadowColor="lightskyblue"
    mx={2}
    p={2}
    /*Anything defined prior to {...props} is overriden by anything passed in*/
    {...props}
  />
);

interface EffectSummaryProps {
  effectName: string;
  text: string | JSX.Element;
}

export const EffectTooltip: React.FC<EffectSummaryProps> = ({
  effectName,
  text,
}) => {
  return (
    <EffectTip label={text}>
      <Text
        as="span"
        fontWeight="bold"
        color="gray.500"
        decoration={"underline dotted lightsteelblue"}
      >
        {effectName}
      </Text>
    </EffectTip>
  );
};
