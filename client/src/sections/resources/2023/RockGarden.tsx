import { Text } from "@chakra-ui/react";
import { availableAmount, getCampground } from "kolmafia";
import { $item, get, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { inventoryLink } from "../../../util/links";
import { canAccessGarden } from "../../../util/paths";
import { inRun } from "../../../util/quest";

const gravelMessage = (gravels: number) => {
  return (
    <Line>
      <Text as="b">{gravels}</Text>x groveling gravel (free kill*)
    </Line>
  );
};

const whetStoneMessage = (whetStones: number) => {
  return (
    <Line>
      <Text as="b">{whetStones}</Text>x whet stone (+1 adv on food)
    </Line>
  );
};

const milestoneMessage = (milestones: number) => {
  const desertProgress = get("desertExploration");
  return (
    <Line>
      <Text as="b">{milestones}</Text>x milestone (+5% desert progress),{" "}
      {100 - desertProgress}% remaining
    </Line>
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

  useNag(
    () => ({
      priority: NagPriority.LOW,
      node: !isCommunityService &&
        canAccess &&
        gardenGravels + gardenMilestones + gardenWhetstones > 0 && (
          <Tile
            header="Harvest your Rock Garden"
            imageUrl="/images/itemimages/rockgardenseeds.gif"
            href="/campground.php"
          >
            {gardenGravels > 0 && gravelMessage(gardenGravels)}
            {gardenWhetstones > 0 && whetStoneMessage(gardenWhetstones)}
            {gardenMilestones > 0 &&
              desertProgress < 100 &&
              milestoneMessage(gardenMilestones)}
          </Tile>
        ),
    }),
    [
      isCommunityService,
      canAccess,
      gardenGravels,
      gardenMilestones,
      gardenWhetstones,
      desertProgress,
    ],
  );

  return (
    <Tile
      header="Rock garden resources"
      href="/campground.php"
      imageUrl="/images/itemimages/rockgardenbook.gif"
      hide={
        isCommunityService ||
        !canAccess ||
        !inRun() ||
        availableGravels + availableMilestones + availableWhetStones === 0
      }
    >
      {!get("_molehillMountainUsed") && have($item`molehill mountain`) && (
        <Line href={inventoryLink($item`molehill mountain`)}>
          Molehill moleman: Free scaling fight.
        </Line>
      )}
      {have($item`groveling gravel`) && gravelMessage(availableGravels)}
      {have($item`whet stone`) && whetStoneMessage(availableWhetStones)}
      {have($item`milestone`) &&
        desertProgress < 100 &&
        milestoneMessage(availableMilestones)}
    </Tile>
  );
};

export default RockGarden;
