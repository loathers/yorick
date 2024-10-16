import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { $skill, get } from "libram";

import Chevrons from "../../../components/Chevrons";
import MainLink from "../../../components/MainLink";
import { Quantity } from "../../../components/Quantity";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { skillLink } from "../../../util/links";

const SKILLS = [
  { skill: $skill`Feel Envy`, description: () => "all drops", remaining: () => 3 - get("_feelEnvyUsed") },
  { skill: $skill`Feel Lonely`, description: () => "NC", remaining: () => 3 - get("_feelLonelyUsed") },
  { skill: $skill`Feel Nostalgic`, description: () => `copy drops from ${get("lastCopyableMonster")?.name}`, remaining: () => 3 - get("_feelNostalgicUsed") },
  { skill: $skill`Feel Pride`, description: () => "stats", remaining: () => 3 - get("_feelPrideUsed") },
  { skill: $skill`Feel Peaceful`, description: () => "res", remaining: () => 3 - get("_feelPeacefulUsed") }
];

/**
 * Summarizes availability of buffs & nostalgia; no recommendations, and Hatred is covered in banishes.
 *
 * @TODO Determine if we actually want Feel Lost visualized. I think not!
 * @TODO My lean is to not include hatred and leave it for the banish tile I'm making.
 *
 * @returns A tile describing Emotion Chip skills (except Hatred!)
 */
export default function EmotionChip() {
  const playerIsChipped = haveUnrestricted($skill`Emotionally Chipped`);

  if (!playerIsChipped) return null;

  return (
    <Tile header="Emotion Chip" imageUrl="/images/itemimages/emochip1.gif">
      <List>{
        SKILLS.map(({ skill, description, remaining }) => {
          const casts = remaining();
          return (
            <ListItem
              key={skill.id}
              pl="1"
              display="flex"
              color={casts === 0 ? "gray.500" : undefined}
            >
              <ListIcon as={Chevrons} usesLeft={casts} totalUses={3} />
              <MainLink href={casts > 0 ? skillLink(skill) : ""}>
                <Quantity count={casts} thing={skill} /> ({description()})
              </MainLink>
            </ListItem>
          );
        })
      }</List>
    </Tile>
  );
};

