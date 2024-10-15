import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, getCampground } from "kolmafia";
import { $item, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { inventoryLink } from "../../../util/links";
import { canAccessGarden } from "../../../util/paths";
import { inRun } from "../../../util/quest";

const gravelMessage = (gravels: number) => {
  return (
    <>
      <Text as="b">{gravels}</Text>x groveling gravel (free kill*)
    </>
  );
};

const whetStoneMessage = (whetStones: number) => {
  return (
    <>
      <Text as="b">{whetStones}</Text>x whet stone (+1 adv on food)
    </>
  );
};

const milestoneMessage = (milestones: number) => {
  const desertProgress = get("desertExploration");
  return (
    <>
      <Text as="b">{milestones}</Text>x milestone (+5% desert progress),{" "}
      {100 - desertProgress}% remaining
    </>
  );
};

const RockGarden = () => {
  const gardenGravels = getCampground()["groveling gravel"];
  const gardenMilestones = getCampground()["milestone"];
  const gardenWhetstones = getCampground()["whet stone"];
  const desertProgress = get("desertExploration");

  const availableGravels = availableAmount($item`groveling gravel`);
  const availableMilestones = availableAmount($item`milestone`);
  const availableWhetStones = availableAmount($item`whet stone`);

  const isCommunityService = get("challengePath") === "Community Service";
  const canAccess = canAccessGarden();

  if (
    isCommunityService ||
    !canAccess ||
    !inRun() ||
    availableGravels + availableMilestones + availableWhetStones === 0
  ) {
    return null;
  }

  return (
    <Tile
      header="Rock garden resources"
      href="/campground.php"
      imageUrl="/images/itemimages/rockgardenbook.gif"
    >
      {!get("_molehillMountainUsed") && have($item`molehill mountain`) && (
        <Line href={inventoryLink($item`molehill mountain`)}>
          Molehill moleman: Free scaling fight.
        </Line>
      )}
      {(availableGravels > 0 ||
        availableWhetStones > 0 ||
        (availableMilestones > 0 && desertProgress < 100)) && (
        <>
          <Line>Inventory:</Line>
          <UnorderedList>
            {availableGravels > 0 && (
              <ListItem>{gravelMessage(availableGravels)}</ListItem>
            )}
            {availableWhetStones && (
              <ListItem>{whetStoneMessage(availableWhetStones)}</ListItem>
            )}
            {availableMilestones && desertProgress < 100 && (
              <ListItem>{milestoneMessage(availableMilestones)}</ListItem>
            )}
          </UnorderedList>
        </>
      )}
      {(gardenGravels > 0 ||
        gardenWhetstones > 0 ||
        (gardenMilestones > 0 && desertProgress < 100)) && (
        <>
          <Line>Harvest from your garden:</Line>
          <UnorderedList>
            {gardenGravels > 0 && (
              <ListItem>{gravelMessage(gardenGravels)}</ListItem>
            )}
            {gardenWhetstones > 0 && (
              <ListItem>{whetStoneMessage(gardenWhetstones)}</ListItem>
            )}
            {gardenMilestones > 0 && desertProgress < 100 && (
              <ListItem>{milestoneMessage(gardenMilestones)}</ListItem>
            )}
          </UnorderedList>
        </>
      )}
    </Tile>
  );
};

export default RockGarden;
