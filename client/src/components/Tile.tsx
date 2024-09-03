import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Heading, HStack, IconButton, VStack } from "@chakra-ui/react";
import { decode } from "html-entities";
import { Familiar, Item, Skill } from "kolmafia";
import React, { ReactNode, useState } from "react";

import { capitalizeWords } from "../util/text";
import DynamicLinks from "./DynamicLinks";
import TileImage from "./TileImage";

export interface TileProps {
  header?: string;
  imageUrl?: string;
  imageAlt?: string;
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
  disabled,
  children,
  hide,
  linkedContent,
  linkHide,
  tooltip,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  if (hide) return null;

  return (
    <HStack
      alignItems="start"
      px={2}
      textColor={disabled || collapsed ? "gray.500" : undefined}
    >
      <TileImage
        imageUrl={
          imageUrl ??
          (linkedContent?.image
            ? `/images/itemimages/${linkedContent?.image}`
            : undefined)
        }
        imageAlt={imageAlt ?? header}
        mt={collapsed ? 0 : 1}
        width="30px"
        boxSize={disabled || collapsed ? "20px" : "30px"}
      />
      <VStack align="stretch" spacing={0.5}>
        <HStack spacing={1}>
          <Heading as="h3" size="sm">
            {header ??
              (linkedContent?.name
                ? capitalizeWords(decode(linkedContent.name))
                : undefined)}
          </Heading>
          {!collapsed && tooltip}
          {linkedContent && !linkHide && (
            <DynamicLinks linkedContent={linkedContent} />
          )}
          <IconButton
            icon={collapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
            aria-label="Collapse"
            h={4}
            minW={4}
            fontSize="20px"
            variant="ghost"
            float="right"
            onClick={() => setCollapsed((collapsed) => !collapsed)}
          />
        </HStack>
        {!collapsed && children}
      </VStack>
    </HStack>
  );
};

export default Tile;
