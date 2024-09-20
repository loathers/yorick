import {
  canAdventure,
  canEquip,
  getProperty,
  haveEquipped,
  inHardcore,
  myMeat,
  myPath,
  numericModifier,
} from "kolmafia";
import { $effect, $item, $location, $path, get, have } from "libram";
import React from "react";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { inventoryLink, parentPlaceLink } from "../../../util/links";
import { plural } from "../../../util/text";

const LordSpookyraven: React.FC = () => {
  const isPathCommunityService = myPath() === $path`Community Service`;
  const isPathGreyGoo = myPath() === $path`Grey Goo`;
  const isPathActuallyEdTheUndying =
    myPath() === $path`Actually Ed the Undying`;
  const isPathVampire = myPath() === $path`Dark Gyffte`;
  const isPathNuclearAutumn = myPath() === $path`Nuclear Autumn`;
  const isInHardcore = inHardcore();
  const isInBadMoon =
    getProperty("moonTuned") === "true" &&
    getProperty("charpanemode") === "badmoon";

  const canEquipAnyWeapon = canEquip($item`seal-clubbing club`);
  const useFastRoute =
    canEquipAnyWeapon && !(isPathNuclearAutumn && isInHardcore) && !isInBadMoon;

  const hauntedBallroomAvailable = canAdventure(
    $location`The Haunted Ballroom`,
  );
  const hauntedBallroomNoncombatNotDone =
    !$location`The Haunted Ballroom`.noncombatQueue.includes(
      "We'll All Be Flat",
    );
  const delayRemaining = 5 - $location`The Haunted Ballroom`.turnsSpent;

  const haveSpectacles = have($item`Lord Spookyraven's spectacles`);
  const haveSpectaclesEquipped = haveEquipped(
    $item`Lord Spookyraven's spectacles`,
  );
  const recipeWillBeAutoread =
    haveSpectacles && useFastRoute && get("autoCraft");
  const recipeWasAutoreadWithGlasses =
    get("spookyravenRecipeUsed") === "with_glasses";
  const recipeWasAutoread =
    recipeWasAutoreadWithGlasses ||
    get("spookyravenRecipeUsed") === "no_glasses";

  const haveWineBomb = have($item`wine bomb`);
  const haveUnstableFulminate = have($item`unstable fulminate`);
  const haveUnstableFulminateEquipped = haveEquipped($item`unstable fulminate`);
  const haveChateauDeVinegar = have($item`bottle of Chateau de Vinegar`);
  const haveBlastingSoda = have($item`blasting soda`);

  const currentMl = numericModifier("Monster Level");
  const mlNeeded = 82 - currentMl;

  const searchables = {
    "The Haunted Kitchen": $item`loosening powder`,
    "The Haunted Conservatory": $item`powdered castoreum`,
    "The Haunted Bathroom": $item`drain dissolver`,
    "The Haunted Gallery": $item`triple-distilled turpentine`,
    "The Haunted Laboratory": $item`detartrated anhydrous sublicalc`,
    "The Haunted Storage Room": $item`triatomaceous dust`,
  };

  const missingSearchables = Object.entries(searchables).filter(
    ([, item]) => !have(item),
  );

  useNag(
    () => ({
      id: "lord-spookyraven-quest-nag",
      priority: NagPriority.HIGH,
      node: haveUnstableFulminate && !haveUnstableFulminateEquipped && (
        <Tile header="Lord Spookyraven Quest">
          <Line href={inventoryLink($item`unstable fulminate`)} color="red.500">
            Equip unstable fulminate.
          </Line>
        </Tile>
      ),
    }),
    [haveUnstableFulminate, haveUnstableFulminateEquipped],
  );

  if (isPathCommunityService || isPathGreyGoo || !hauntedBallroomAvailable) {
    return null;
  }

  return (
    <QuestTile
      header="Lord Spookyraven Quest"
      imageUrl="/images/adventureimages/lordspooky.gif"
      minLevel={11}
    >
      {hauntedBallroomNoncombatNotDone ? (
        <>
          <Line href="/place.php?whichplace=manor2">
            Run -combat in the haunted ballroom.
          </Line>
          {delayRemaining > 0 && (
            <Line>Delay for {plural(delayRemaining, "turn")}.</Line>
          )}
        </>
      ) : useFastRoute && !haveSpectacles && !recipeWasAutoread ? (
        <Line href={parentPlaceLink($location`The Haunted Bedroom`)}>
          Acquire Lord Spookyraven's spectacles from the haunted bedroom.
        </Line>
      ) : !recipeWasAutoread &&
        !have($item`recipe: mortar-dissolving solution`) ? (
        <Line>
          {recipeWillBeAutoread ? (
            "Click on the suspicious masonry in the basement."
          ) : useFastRoute && !haveSpectaclesEquipped ? (
            <>
              Equip Lord Spookyraven's Spectacles, click on the suspicious
              masonry in the basement, then read the recipe.
            </>
          ) : (
            "Click on the suspicious masonry in the basement, then read the recipe."
          )}
        </Line>
      ) : useFastRoute && haveWineBomb ? (
        <Line>Fight Lord Spookyraven.</Line>
      ) : useFastRoute && haveUnstableFulminate ? (
        <>
          <Line>Adventure in the haunted boiler room with +{mlNeeded} ML.</Line>
          <Line>
            ~{Math.ceil(50.1 / (10 + Math.floor(Math.max(currentMl, 0) / 2)))}{" "}
            total turns to charge fulminate.
          </Line>
        </>
      ) : useFastRoute && !recipeWasAutoreadWithGlasses ? (
        <Line>
          Need to {!haveSpectacles ? "acquire and " : ""}equip Lord
          Spookyraven's spectacles and read the recipe before you can use the
          quick route.
        </Line>
      ) : useFastRoute ? (
        <>
          {!haveChateauDeVinegar && (
            <Line>
              Find bottle of Chateau de Vinegar from possessed wine rack in the
              haunted wine cellar.
            </Line>
          )}
          {!haveBlastingSoda && (
            <Line>
              Find blasting soda from the cabinet in the haunted laundry room.
            </Line>
          )}
          {haveChateauDeVinegar && haveBlastingSoda && (
            <Line href="/craft.php?mode=cook">Cook unstable fulminate.</Line>
          )}
        </>
      ) : missingSearchables.length > 0 ? (
        <Line>
          Go search in the Haunted{" "}
          {missingSearchables
            .map(([location]) =>
              location.toString().replace("The Haunted ", ""),
            )
            .join(", ")}
          .
        </Line>
      ) : isPathActuallyEdTheUndying ? (
        <Line>Talk to Lord Spookyraven.</Line>
      ) : isPathVampire ? (
        <Line>Fight the path-specific boss.</Line>
      ) : (
        <>
          <Line>Fight Lord Spookyraven.</Line>
          {!have($effect`Red Door Syndrome`) &&
            myMeat() > 1000 &&
            haveUnrestricted($item`can of black paint`) && (
              <Line>
                A can of black paint can help with fighting him.
                {myMeat() < 20000 && " Bit pricy. (1k meat)"}
              </Line>
            )}
        </>
      )}
    </QuestTile>
  );
};

export default LordSpookyraven;
