import { List, ListIcon, ListItem } from "@chakra-ui/react";
import Chevrons from "../../components/Chevrons";
import Tile from "../../components/Tile";
import { useGetProperty } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $skill } from "../../util/makeValue";
import { plural } from "../../util/text";

/**
 * Summarizes availability of buffs & nostalgia; no recommendations, and Hatred is covered in banishes.
 * @returns A tile describing Emotion Chip skills (except Hatred!)
 */

const EmotionChip = () => {
  const playerIsChipped = useHave($skill`Emotionally Chipped`);
  const nostalgiaMonster = useGetProperty("lastCopyableMonster");

  // Associating skills with the # remaining of each of them.
  const emoChipSkills = {
    "Feel Envy": 3 - useGet("_feelEnvyUsed"),
    "Feel Excitement": 3 - useGet("_feelExcitementUsed"),
    "Feel Lonely": 3 - useGet("_feelLonelyUsed"),
    "Feel Nostalgic": 3 - useGet("_feelNostalgicUsed"),
    "Feel Pride": 3 - useGet("_feelPrideUsed"),
    "Feel Peaceful": 3 - useGet("_feelPeacefulUsed"),
  };

  // Turning the skills into list items w/ chevron coloring based on # left
  const listItems = Object.entries(emoChipSkills).map(([skillName, casts]) => {
    return (
      <ListItem key={skillName} pl="1" display="flex">
        <ListIcon as={Chevrons} usesLeft={casts} totalUses={3} />
        {`${plural(casts, "cast")} of ${skillName}${
          skillName === "Feel Nostalgic" ? ` (${nostalgiaMonster})` : ""
        }`}
      </ListItem>
    );
  });

  // To-Do list for this tile:
  //   - Determine if we actually want Feel Lost visualized. I think not!
  //   - My lean is to not include hatred and leave it for the banish tile I'm making.
  return (
    <Tile
      header="Emotion Chip"
      imageUrl="/images/itemimages/emochip1.gif"
      hide={!playerIsChipped}
    >
      <List>{listItems}</List>
    </Tile>
  );
};

export default EmotionChip;
