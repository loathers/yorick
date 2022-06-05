import React from "react";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { Placeholder } from "../util/makeValue";
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
  linkedContent?:
    | Placeholder<"Item">
    | Placeholder<"Familiar">
    | Placeholder<"Skill">;
  linkHide?: boolean;
  title?: string;
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
  title,
}) => {
  if (hide) return <></>;

  const tile = (
    <HStack px={2} textColor={disabled ? "gray.500" : undefined} title={title}>
      <TileImage imageUrl={imageUrl} imageAlt={imageAlt ?? header} />
      <VStack align="stretch" spacing={0.3}>
        <HStack spacing={1}>
          <Heading as="h3" size="sm">
            {header}
          </Heading>
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
