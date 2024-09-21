import {
  availableAmount,
  canAdventure,
  canEquip,
  haveEquipped,
  myFamiliar,
  myPath,
  npcPrice,
} from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $items,
  $location,
  $path,
  get,
  have,
  questStep,
} from "libram";

import Line from "../../../components/Line";
import MainLink from "../../../components/MainLink";
import QuestTile from "../../../components/QuestTile";
import { haveUnrestricted } from "../../../util/available";
import { BLACK_MARKET_URL, inventoryLink } from "../../../util/links";
import { Step } from "../../../util/quest";
import { commaAnd, commaOr, plural } from "../../../util/text";

function currentExplorationPerTurn(): number {
  let exploration = 1;
  if (haveEquipped($item`ornate dowsing rod`)) {
    exploration += 2;
  }
  if (haveEquipped($item`UV-resistant compass`)) {
    exploration += 1;
  }
  if (myPath() === $path`License to Adventure` && get("bondDesert")) {
    exploration += 2;
  }
  if (haveEquipped($item`survival knife`) && have($effect`Ultrahydrated`)) {
    exploration += 2;
  }
  if (myFamiliar() === $familiar`Melodramedary`) {
    exploration += 1;
  }
  return exploration;
}

function possibleExplorationPerTurn(): number {
  let exploration = 1;
  if (have($item`ornate dowsing rod`)) {
    exploration += 2;
  }
  if (
    have($item`UV-resistant compass`) &&
    (!have($item`ornate dowsing rod`) ||
      haveUnrestricted($familiar`Left-Hand Man`))
  ) {
    exploration += 1;
  }
  if (myPath() === $path`License to Adventure` && get("bondDesert")) {
    exploration += 2;
  }
  if (have($item`survival knife`)) {
    exploration += 2;
  }
  if (
    haveUnrestricted($familiar`Melodramedary`) &&
    canEquip($familiar`Melodramedary`)
  ) {
    exploration += 1;
  }
  return exploration;
}

const DesertQuest = () => {
  const step = questStep("questL11Desert");

  const desertExploration = get("desertExploration");
  const gnasirProgress = get("gnasirProgress");
  const currentExploration = currentExplorationPerTurn();
  const possibleExploration = possibleExplorationPerTurn();

  const explorationItems = $items`UV-resistant compass, ornate dowsing rod, survival knife`;
  const explorationItemsToEquip = explorationItems.filter(
    (item) => have(item) && !haveEquipped(item),
  );

  const needMoreExploration = currentExploration < possibleExploration;

  const needStoneRose = !(gnasirProgress & 1);
  const needBlackPaint = !(gnasirProgress & 2);
  const needKillingJar = !(gnasirProgress & 4);
  const needManualPages = !(gnasirProgress & 8);
  const needWormRiding = !(gnasirProgress & 16);

  if (step === Step.UNSTARTED || step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Desert"
      imageUrl="/images/adventureimages/sandcactus.gif"
      imageAlt="Desert"
      minLevel={11}
    >
      <Line href="/place.php?whichplace=desertbeach">
        {100 - desertExploration}% exploration remaining.
      </Line>

      {desertExploration < 10 && (
        <Line>
          Find Gnasir after{" "}
          {Math.ceil((10 - desertExploration) / currentExploration)} turns.
        </Line>
      )}

      {needStoneRose && (
        <Line>
          {have($item`stone rose`) &&
            desertExploration >= 10 &&
            "Give stone rose to Gnasir (15%)."}
          {!have($item`stone rose`) &&
            "Adventure in Oasis for stone rose (15%)."}
        </Line>
      )}

      {needBlackPaint &&
        desertExploration >= 10 &&
        (have($item`can of black paint`) ||
          npcPrice($item`can of black paint`) > 0) && (
          <Line href={BLACK_MARKET_URL}>
            {have($item`can of black paint`)
              ? "Give can of black paint to Gnasir (15%)."
              : "Buy can of black paint from Black Market and give to Gnasir (15%)."}
          </Line>
        )}

      {needKillingJar && (
        <Line>
          {have($item`killing jar`) &&
            desertExploration >= 10 &&
            "Give killing jar to Gnasir (15%)."}
          {!have($item`killing jar`) &&
            "Find killing jar (10% drop from banshee librarian) (15%)."}
        </Line>
      )}

      {needManualPages && (
        <Line>
          {availableAmount($item`worm-riding manual page`) >= 15
            ? "Give worm-riding manual pages to Gnasir."
            : `${have($effect`Ultrahydrated`) ? "Find" : "Get Ultrahydrated to find"} ${plural(15 - availableAmount($item`worm-riding manual page`), "more worm-riding manual page")}.`}
        </Line>
      )}

      {needWormRiding &&
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

      {!have($item`UV-resistant compass`) &&
        (have($item`Shore Inc. Ship Trip Scrip`) ? (
          <Line>Trade your Shore scrip for a UV-resistant compass.</Line>
        ) : (
          <Line>
            Consider spending 3 turns at the shore for a UV-resistant compass.
          </Line>
        ))}

      {explorationItemsToEquip.length > 0 && (
        <Line>
          Equip{" "}
          {commaAnd(
            explorationItemsToEquip.map((item) => (
              <MainLink href={inventoryLink(item)}>{item.name}</MainLink>
            )),
            explorationItemsToEquip.map((item) => item.name),
          )}{" "}
          to speed up exploration
          {explorationItemsToEquip.includes($item`survival knife`) &&
            !have($effect`Ultrahydrated`) &&
            " and get Ultrahydrated for survival knife"}
          .
        </Line>
      )}

      {myFamiliar() !== $familiar`Melodramedary` && (
        <Line>Consider using Melodramedary for faster exploration.</Line>
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

export default DesertQuest;
