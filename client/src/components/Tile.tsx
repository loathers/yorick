import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Familiar, Item, Skill } from "kolmafia";
import React, { ReactNode } from "react";

import DynamicLinks from "./DynamicLinks";
import MainLink from "./MainLink";
import TileImage from "./TileImage";

export interface TileProps {
  header: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  disabled?: boolean;
  hide?: boolean;
  linkedContent?: Item | Familiar | Skill;
  linkHide?: boolean;
  tooltip?: ReactNode;
  children?: ReactNode;
}

const Tile: React.FC<TileProps> = ({
  header,
  imageUrl,
  imageAlt,
  href,
  disabled,
  children,
  hide,
  linkedContent,
  linkHide,
  tooltip,
}) => {
  if (hide) return null;

  const tile = (
    <HStack
      alignItems="start"
      px={2}
      textColor={disabled ? "gray.500" : undefined}
    >
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} mt="1" />
      <VStack align="stretch" spacing={0.5}>
        <HStack spacing={1}>
          <Heading as="h3" size="sm">
            {header}
          </Heading>
          {tooltip || false}
          {linkedContent && !linkHide && (
            <DynamicLinks linkedContent={linkedContent} />
          )}
        </HStack>
        {children}
      </VStack>
    </HStack>
  );

  return href ? <MainLink href={href}>{tile}</MainLink> : tile;
};

export default Tile;
