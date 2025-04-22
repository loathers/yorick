import {
  availableAmount,
  canAdventure,
  haveEquipped,
  myFamiliar,
  npcPrice,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  get,
  have,
  questStep,
} from "libram";

import AsyncLink from "../../../components/AsyncLink";
import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import {
  currentExplorationPerTurn,
  needBlackPaint,
  needKillingJar,
  needManualPages,
  needStoneRose,
  needWormRiding,
  possibleExplorationPerTurn,
} from "../../../questInfo/desert";
import {
  BLACK_MARKET_URL,
  inventoryLink,
  parentPlaceLink,
} from "../../../util/links";
import { questFinished, Step } from "../../../util/quest";
import { commaAnd, commaOr, plural } from "../../../util/text";

const BEACH_URL = "/place.php?whichplace=desertbeach";
const GNASIR_URL = "/place.php?whichplace=desertbeach&action=db_gnasir";

const Desert = () => {
  const step = questStep("questL11Desert");

  const desertExploration = get("desertExploration");
  const currentExploration = currentExplorationPerTurn();
  const possibleExploration = possibleExplorationPerTurn();

  const explorationItems = $items`UV-resistant compass, ornate dowsing rod, survival knife`;
  const explorationItemsToEquip = explorationItems.filter(
    (item) => have(item) && !haveEquipped(item),
  );
  const melodramedary = $familiar`Melodramedary`;
  const haveMelodramedary = have(melodramedary);
  const usingMelodramedary = myFamiliar() === melodramedary;

  const needMoreExploration = currentExploration < possibleExploration;

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Explore the Desert"
      imageUrl="/images/adventureimages/sandcactus.gif"
      imageAlt="Desert"
      href={BEACH_URL}
      minLevel={11}
      disabled={!questFinished("questL11Black")}
    >
      <Line href={BEACH_URL}>
        {100 - desertExploration}% exploration remaining.
      </Line>

      {desertExploration < 10 && (
        <Line href={BEACH_URL}>
          Find Gnasir after{" "}
          {Math.ceil((10 - desertExploration) / currentExploration)} turns.
        </Line>
      )}

      {needStoneRose() && (
        <Line href={BEACH_URL}>
          {have($item`stone rose`) &&
            desertExploration >= 10 &&
            "Give stone rose to Gnasir (15%)."}
          {!have($item`stone rose`) &&
            "Adventure in Oasis for stone rose (15%)."}
        </Line>
      )}

      {needBlackPaint() && desertExploration >= 10 && (
        <>
          {have($item`can of black paint`) ? (
            <Line href={GNASIR_URL}>
              Give can of black paint to Gnasir (15%).
            </Line>
          ) : (
            npcPrice($item`can of black paint`) > 0 && (
              <Line href={BLACK_MARKET_URL}>
                Buy can of black paint from Black Market and give to Gnasir
                (15%).
              </Line>
            )
          )}
        </>
      )}

      {needKillingJar() && (
        <>
          {have($item`killing jar`) && desertExploration >= 10 && (
            <Line href={GNASIR_URL}>Give killing jar to Gnasir (15%).</Line>
          )}
          {!have($item`killing jar`) && (
            <Line href={parentPlaceLink($location`The Haunted Library`)}>
              Find killing jar (10% drop from banshee librarian) (15%).
            </Line>
          )}
        </>
      )}

      {needManualPages() && (
        <Line>
          {availableAmount($item`worm-riding manual page`) >= 15
            ? "Give worm-riding manual pages to Gnasir."
            : `${have($effect`Ultrahydrated`) ? "Find" : "Get Ultrahydrated to find"} ${plural(15 - availableAmount($item`worm-riding manual page`), "more worm-riding manual page")}.`}
        </Line>
      )}

      {needWormRiding() &&
        have($item`worm-riding hooks`) &&
        (have($item`Apriling band quad tom`) && get("_aprilBandTomUses") < 3 ? (
          <Line href={inventoryLink($item`Apriling band quad tom`)}>
            Use Apriling quad tom to worm-ride (30%).
          </Line>
        ) : have($item`drum machine`) ? (
          <Line href={inventoryLink($item`drum machine`)}>
            Use drum machine to worm-ride (30%).
          </Line>
        ) : (
          <Line>
            Get{" "}
            {commaOr([
              canAdventure($location`The Oasis`) &&
                "drum machine from blur in the Oasis",
              canAdventure($location`The Oasis`) &&
                have($item`cursed monkey's paw`) &&
                get("_monkeyPawWishesUsed") < 5 &&
                "drum machine from Monkey wish",
              have($item`Apriling band helmet`) &&
                get("_aprilBandInstruments") < 2 &&
                "Apriling band quad tom",
            ])}{" "}
            to worm-ride (30%).
          </Line>
        ))}

      {!have($item`UV-resistant compass`) && (
        <Line href={parentPlaceLink($location`The Shore, Inc. Travel Agency`)}>
          {have($item`Shore Inc. Ship Trip Scrip`) ? (
            <>Trade your Shore scrip for a UV-resistant compass.</>
          ) : (
            <>
              Consider spending 3 turns at The Shore for a UV-resistant compass.
            </>
          )}
        </Line>
      )}

      {explorationItemsToEquip.length > 0 && (
        <Line>
          Equip{" "}
          {commaAnd(
            explorationItemsToEquip.map((item) => (
              <AsyncLink command={`equip ${item.name}`}>{item.name}</AsyncLink>
            )),
            explorationItemsToEquip.map((item) => item.name),
          )}{" "}
          to speed up exploration
          {explorationItemsToEquip.includes($item`survival knife`) &&
            !have($effect`Ultrahydrated`) &&
            " (need Ultrahydrated for knife)"}
          .
        </Line>
      )}

      {haveMelodramedary && !usingMelodramedary && (
        <Line takeFamiliar={$familiar`Melodramedary`}>
          Consider using Melodramedary for faster exploration.
        </Line>
      )}

      {have($item`desert sightseeing pamphlet`) && (
        <Line href={inventoryLink($item`desert sightseeing pamphlet`)}>
          Use your{" "}
          {plural(
            availableAmount($item`desert sightseeing pamphlet`),
            "desert sightseeing pamphlet",
          )}{" "}
          for +15% exploration each.
        </Line>
      )}

      {needMoreExploration && (
        <Line>
          Optimize your gear for {possibleExploration}% (current{" "}
          {currentExploration}%) exploration per turn.
        </Line>
      )}
    </QuestTile>
  );
};

export default Desert;
