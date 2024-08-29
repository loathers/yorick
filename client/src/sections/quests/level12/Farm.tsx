import { ListItem, UnorderedList } from "@chakra-ui/react";
import { myLocation } from "kolmafia";
import { $item, $location, get, have } from "libram";
import React from "react";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";

const IslandWarFarm: React.FC = () => {
  const barn = $location`McMillicancuddy's Barn`;

  const knownNCs = [
    "Cornered!",
    "Cornered Again!",
    "How Many Corners Does this Stupid Barn Have!?",
  ];
  const seenNCs = barn.noncombatQueue.split(",");
  const ncsSeen = knownNCs.filter((nc) => seenNCs.includes(nc)).length;

  const chaosButterfly = have($item`chaos butterfly`);
  const chaosButterflyThrown = get("chaosButterflyThrown");

  return (
    <QuestTile
      header="Island War Farm"
      imageUrl="/images/adventureimages/cow_barn.gif"
      href="bigisland.php?place=farm"
    >
      {(ncsSeen < 3 || myLocation() === barn) && (
        <>
          {!chaosButterflyThrown && chaosButterfly && (
            <Line>
              Use a chaos butterfly in combat before clearing the barn.
            </Line>
          )}
          <Line>Remember to:</Line>
          <UnorderedList>
            <ListItem>Make a fence out of the barbed wire</ListItem>
            <ListItem>Knock over the lantern</ListItem>
            <ListItem>Dump out the drum</ListItem>
          </UnorderedList>
        </>
      )}
      <Line>
        Use free runs and wanderers to burn 10-15 (?) turns of delay in the
        barn.
      </Line>
    </QuestTile>
  );
};

export default IslandWarFarm;
