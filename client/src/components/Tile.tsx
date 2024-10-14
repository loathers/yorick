import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  StackProps,
  VStack,
} from "@chakra-ui/react";
import { decode } from "html-entities";
import { Familiar, Item, Skill } from "kolmafia";
import React, { ReactNode, useState } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { capitalizeWords } from "../util/text";
import DynamicLinks from "./DynamicLinks";
import MainLink from "./MainLink";
import TileImage from "./TileImage";

export interface TileProps extends StackProps {
  header?: ReactNode;
  id?: string;
  imageUrl?: string;
  imageAlt?: string;
  icon?: ReactNode;
  href?: string;
  disabled?: boolean;
  linkedContent?: Item | Familiar | Skill;
  linkHide?: boolean;
  extraLinks?: ReactNode;
  tooltip?: ReactNode;
  nonCollapsible?: boolean;
  children?: ReactNode;
}

const Tile: React.FC<TileProps> = ({
  header,
  id,
  imageUrl,
  imageAlt,
  icon,
  href,
  disabled,
  children,
  linkedContent,
  linkHide,
  extraLinks,
  tooltip,
  nonCollapsible,
  ...props
}) => {
  const storageId =
    id ||
    linkedContent?.identifierString ||
    (typeof header === "string" ? header : null) ||
    null;
  if (storageId === null) {
    throw new Error("Tile needs an id parameter.");
  }

  const [lastStorageId] = useState(storageId);
  if (storageId !== lastStorageId) {
    throw new Error(
      `Tile ${typeof storageId === "string" ? `${storageId} ` : ""}needs an id parameter (saw storageId change).`,
    );
  }

  const [collapsed, setCollapsed] = useLocalStorage(
    `value-${storageId}`,
    false,
  );

  const heading =
    header ??
    (linkedContent?.name
      ? capitalizeWords(decode(linkedContent.name))
      : undefined);

  const imageSize = collapsed || disabled ? "20px" : "30px";

  return (
    <HStack
      align="stretch"
      px={2}
      textColor={collapsed || disabled ? "gray.500" : undefined}
      {...props}
    >
      <Flex w="30px" flexShrink={0} align="center">
        {icon ?? (
          <TileImage
            imageUrl={
              imageUrl ??
              (linkedContent?.image
                ? `/images/itemimages/${linkedContent?.image}`
                : undefined)
            }
            imageAlt={
              imageAlt ?? (typeof header === "string" ? header : undefined)
            }
            mt={collapsed || disabled ? 0 : 1}
            mb="auto"
            mx={collapsed || disabled ? "auto" : undefined}
            boxSize={imageSize}
            maxH={collapsed || disabled ? "20px" : undefined}
          />
        )}
      </Flex>
      <VStack align="stretch" spacing={0.5}>
        <HStack spacing={1} align="center">
          <Heading as="h3" size="sm">
            {href ? <MainLink href={href}>{heading}</MainLink> : heading}
          </Heading>
          {!collapsed && tooltip}
          {!collapsed && linkedContent && !linkHide && (
            <DynamicLinks linkedContent={linkedContent} />
          )}
          {!collapsed && extraLinks}
          {disabled || nonCollapsible || (
            <IconButton
              icon={collapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
              aria-label="Collapse"
              h={4}
              minW={4}
              fontSize="20px"
              variant="ghost"
              onClick={() => setCollapsed((collapsed) => !collapsed)}
            />
          )}
        </HStack>
        {!collapsed && children}
      </VStack>
    </HStack>
  );
};

export default Tile;
