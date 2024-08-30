import { Text } from "@chakra-ui/react";
import { numericModifier } from "kolmafia";
import { $familiar, $item, clamp, get, have } from "libram";

import BulletedList from "../../../components/BulletedList";
import DynamicItemLink from "../../../components/DynamicItemLinks";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { plural } from "../../../util/text";

const ChestMimic = () => {
  const chestMimic = $familiar`Chest Mimic`;
  const mimicEgg = $item`mimic egg`;

  if (!have(chestMimic)) return null;

  const famExperienceGain = numericModifier("familiar experience") + 1;
  const chestExperience = chestMimic.experience;
  const famExpNeededForNextEgg = 50 - (chestExperience % 50);
  const fightsForNextEgg =
    famExperienceGain > 0
      ? plural(Math.ceil(famExpNeededForNextEgg / famExperienceGain), "fight")
      : "cannot get";
  const mimicEggsLeft = clamp(11 - get("_mimicEggsObtained"), 0, 11);

  return (
    <Tile
      header="Chest Mimic"
      imageUrl="/images/itemimages/mimicfam.gif"
      linkedContent={chestMimic}
    >
      <BulletedList>
        <Line>
          Currently have <Text as="b">{chestExperience}</Text> experience,
          currently gain <Text as="b">{famExperienceGain}</Text> fam exp per
          fight.
        </Line>
        <Line>
          Need <Text as="b">{famExpNeededForNextEgg}</Text> more famxp for next
          egg ({fightsForNextEgg}).
        </Line>
        <Line>
          Can lay <Text as="b">{mimicEggsLeft}</Text> more eggs today.
        </Line>
      </BulletedList>
      {have(mimicEgg) && (
        <Line>
          <DynamicItemLink linkedContent={mimicEgg}>
            Fight some copies.
          </DynamicItemLink>
        </Line>
      )}
    </Tile>
  );
};

export default ChestMimic;
