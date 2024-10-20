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
import { inDevMode } from "../util/env";
import { capitalizeWords } from "../util/text";
import ContentButtons from "./ContentButtons";
import MainLink from "./MainLink";
import TileImage from "./TileImage";

export interface TileProps extends StackProps {
  header?: ReactNode;
  headerSuffix?: ReactNode;
  // If header is not a string and there is no linkedContent, id must be set
  // to ensure persistent collapsing. Tiles will throw an error otherwise.
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
  headerSuffix,
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
  if (storageId === null && inDevMode()) {
    throw new Error(`Tile (unknown) needs an id parameter.`);
  }

  const [lastStorageId] = useState(storageId);
  if (storageId !== lastStorageId && inDevMode()) {
    throw new Error(
      `Tile ${header} needs an id parameter (saw storageId change).`,
    );
  }

  const [collapsed, setCollapsed] = useLocalStorage(
    `collapse-${storageId}`,
    false,
  );

  const headerMain =
    header ??
    (linkedContent?.name
      ? capitalizeWords(decode(linkedContent.name))
      : undefined);
  const heading =
    headerMain && headerSuffix ? `${headerMain} ${headerSuffix}` : headerMain;

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
            {!collapsed && !disabled && href ? (
              <MainLink href={href}>{heading}</MainLink>
            ) : (
              heading
            )}
          </Heading>
          {!collapsed && tooltip}
          {!collapsed && linkedContent && !linkHide && (
            <ContentButtons linkedContent={linkedContent} />
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
        {!collapsed && !disabled && children}
      </VStack>
    </HStack>
  );
};

export default Tile;
