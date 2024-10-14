import {
  initiativeModifier,
  itemDropModifier,
  myLocation,
  myPrimestat,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $monster,
  $skill,
  $stat,
  have,
} from "libram";
import React from "react";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { inventoryLink } from "../../../util/links";
import { commaAnd } from "../../../util/text";

const ORCHARD_URL = "/bigisland.php?place=orchard";

const GlandAdvice: React.FC = () => {
  const currentLocation = myLocation();
  if (currentLocation.toString().includes("filthworm")) {
    const effectiveItemDrop = itemDropModifier() / 100;
    const averageGlandsFoundPerCombat = Math.min(
      1,
      (effectiveItemDrop + 1) * 0.1,
    );
    const turnsPerGland =
      averageGlandsFoundPerCombat !== 0 ? 1 / averageGlandsFoundPerCombat : -1;

    return <Line>~{turnsPerGland.toFixed(1)} turns per gland.</Line>;
  }
  return null;
};

const PickpocketAdvice: React.FC = () => {
  const totalInitiativeNeeded = $monster`filthworm drone`.baseInitiative;
  const initiativeNeeded = totalInitiativeNeeded - initiativeModifier();

  const sources = [$familiar`XO Skeleton`, $skill`Perpetrate Mild Evil`];
  if (sources.some((s) => have(s))) {
    <Line>
      Use{" "}
      {commaAnd(sources.filter((s) => have(s)).map((s) => s.identifierString))}
      to pickpocket.
    </Line>;
  }
  if (myPrimestat() === $stat`Moxie` && initiativeNeeded > 0) {
    return (
      <Line>
        Need {initiativeNeeded}% more initiative to pickpocket every turn.
      </Line>
    );
  }
  return null;
};

const Orchard: React.FC = () => {
  const heartOfFilthwormQueen = $item`heart of the filthworm queen`;
  const guardGland = $item`filthworm royal guard scent gland`;
  const guardStench = $effect`Filthworm Guard Stench`;
  const droneGland = $item`filthworm drone scent gland`;
  const droneStench = $effect`Filthworm Drone Stench`;
  const larvaGland = $item`filthworm hatchling scent gland`;
  const larvaStench = $effect`Filthworm Larva Stench`;

  const mainAdvice = (): JSX.Element => {
    if (have(heartOfFilthwormQueen)) {
      return (
        <Line href={ORCHARD_URL}>
          Go talk to the hippies to complete quest.
        </Line>
      );
    } else if (have(guardStench) || have(guardGland)) {
      return (
        <>
          {!have(guardStench) && (
            <Line href={inventoryLink(guardGland)}>
              Use filthworm royal guard scent gland.
            </Line>
          )}
          <Line href={have(guardStench) ? ORCHARD_URL : undefined}>
            Defeat the filthworm queen in the queen's chamber.
          </Line>
        </>
      );
    } else if (have(droneStench) || have(droneGland)) {
      return (
        <>
          {!have(droneStench) && (
            <Line href={inventoryLink(droneGland)}>
              Use filthworm drone scent gland.
            </Line>
          )}
          <Line href={have(droneStench) ? ORCHARD_URL : undefined}>
            Adventure with +item in the guards' chamber.
          </Line>
        </>
      );
    } else if (have(larvaStench) || have(larvaGland)) {
      return (
        <>
          {!have(larvaStench) && (
            <Line href={inventoryLink(larvaGland)}>
              Use filthworm hatchling scent gland.
            </Line>
          )}
          <Line href={have(larvaStench) ? ORCHARD_URL : undefined}>
            Adventure with +item in the feeding chamber.
          </Line>
        </>
      );
    } else {
      return (
        <Line href={ORCHARD_URL}>
          Adventure with +item in the hatching chamber.
        </Line>
      );
    }
  };

  return (
    <QuestTile
      header="Island War Orchard"
      imageUrl="/images/itemimages/scentgland.gif"
    >
      {mainAdvice()}
      <GlandAdvice />
      <PickpocketAdvice />
    </QuestTile>
  );
};

export default Orchard;
