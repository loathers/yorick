import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $skill } from "../../util/makeValue";
import { plural } from "../../util/text";
import { useGetProperty } from "../../hooks/useCall";

/**
 * Generate fading chevrons to describe # of a resource left out of total casts
 * @returns Three <ListIcon> objects colored by availability of the resource
 * @param usesLeft How many casts/uses you have left of the resource
 * @param totalUses Total number of uses the users has
 */
export function generateChevrons(usesLeft: number, totalUses: number) {
  let output = [];

  /** One small issue within this Chevron function... -- it doesn't actually
   *    align if you aren't doing a lot of things with the same# of casts. I
   *    do not think this is trivially fixable, but something to know.*/
  for (var use = 1; use <= totalUses; use++) {
    output.push(
      <ListIcon
        as={ChevronRightIcon} // I tried a few types of icons. This was the best, for now.
        mr={use === totalUses ? "0" : "-2.5"} // This uses negative margin to create the overlap effect on all but the last one.
        color={usesLeft >= use ? "black" : "gray.400"}
      />
    );
  }

  return output;
}

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
  let listItems = [];
  for (const [skillName, casts] of Object.entries(emoChipSkills)) {
    if (casts > 0) {
      listItems.push(
        <ListItem pl="1">
          {generateChevrons(casts, 3)} {plural(casts, "cast")} of {skillName}{" "}
          {skillName === "Feel Nostalgic" ? `(${nostalgiaMonster})` : ""}
        </ListItem>
      );
    }
  }

  // To-Do list for this tile:
  //   - Determine if we actually want Feel Lost visualized. I think not!
  //   - My lean is to not include hatred and leave it for the banish tile I'm making.
  return (
    <Tile
      header="Emotion Chip"
      imageUrl="/images/itemimages/emochip1.gif"
      hide={!playerIsChipped}
    >
      <Line>
        <List stylePosition="inside">{listItems}</List>
      </Line>
    </Tile>
  );
};

export default EmotionChip;
