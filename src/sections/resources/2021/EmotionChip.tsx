import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { getProperty } from "kolmafia";
import { $skill, get } from "libram";

import Chevrons from "../../../components/Chevrons";
import MainLink from "../../../components/MainLink";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { skillLink } from "../../../util/links";
import { plural } from "../../../util/text";

/**
 * Summarizes availability of buffs & nostalgia; no recommendations, and Hatred is covered in banishes.
 * @returns A tile describing Emotion Chip skills (except Hatred!)
 */

const EmotionChip = () => {
  const playerIsChipped = haveUnrestricted($skill`Emotionally Chipped`);
  const nostalgiaMonster = getProperty("lastCopyableMonster");

  // Associating skills with the # remaining of each of them.
  const emoChipSkills = {
    "Envy (all drops)": 3 - get("_feelEnvyUsed"),
    "Lonely (NC)": 3 - get("_feelLonelyUsed"),
    "Nostalgic (copy drops)": 3 - get("_feelNostalgicUsed"),
    "Pride (stats)": 3 - get("_feelPrideUsed"),
    "Peaceful (res)": 3 - get("_feelPeacefulUsed"),
  };

  // Turning the skills into list items w/ chevron coloring based on # left
  const listItems = Object.entries(emoChipSkills).map(([skillName, casts]) => {
    const text = `${plural(casts, "Feel")} ${skillName}${
      skillName === "Nostalgic (copy drops)" ? ` [${nostalgiaMonster}]` : ""
    }`;
    return (
      <ListItem
        key={skillName}
        pl="1"
        display="flex"
        color={casts === 0 ? "gray.500" : undefined}
      >
        <ListIcon as={Chevrons} usesLeft={casts} totalUses={3} />
        {casts === 0 ? (
          text
        ) : (
          <MainLink href={skillLink(`Feel ${skillName.split(" ")[0]}`)}>
            {text}
          </MainLink>
        )}
      </ListItem>
    );
  });

  if (!playerIsChipped) {
    return null;
  }

  // To-Do list for this tile:
  //   - Determine if we actually want Feel Lost visualized. I think not!
  //   - My lean is to not include hatred and leave it for the banish tile I'm making.
  return (
    <Tile header="Emotion Chip" imageUrl="/images/itemimages/emochip1.gif">
      <List>{listItems}</List>
    </Tile>
  );
};

export default EmotionChip;
