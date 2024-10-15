import { Text } from "@chakra-ui/react";
import { availableAmount, Item } from "kolmafia";
import { $items, get, questStep } from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { atStep, Step } from "../../../util/quest";
import { commaAnd, plural } from "../../../util/text";

const countItems = (items: Item[], multiplier = 1) => {
  return items
    .map((item) => availableAmount(item) * multiplier)
    .reduce((prev, current) => prev + current);
};

const OrcChasm = () => {
  const step = questStep("questL09Topping");
  const orcProgress = get("smutOrcNoncombatProgress");
  const bridgeProgress = get("chasmBridgeProgress");

  const numExtras = countItems($items`smut orc keepsake box, snow boards`, 5);

  const numFasteners = countItems(
    $items`thick caulk, long hard screw, messy butt joint`,
  );
  const fastenersNeeded = Math.max(
    0,
    30 - bridgeProgress - numFasteners - numExtras,
  );

  const numLumber = countItems(
    $items`morningwood plank, raging hardwood plank, weirdwood plank`,
  );
  const lumberNeeded = Math.max(0, 30 - bridgeProgress - numLumber - numExtras);

  const needs = [];
  if (fastenersNeeded > 0) {
    needs.push(plural(fastenersNeeded, "fastener"));
  }
  if (lumberNeeded > 0) {
    needs.push(`${plural(lumberNeeded, "piece")} of lumber`);
  }

  const inProgress = lumberNeeded > 0 || fastenersNeeded > 0;

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Bridge the Orc Chasm"
      imageUrl="/images/otherimages/mountains/orc_chasm2.gif"
      minLevel={9}
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/place.php?whichplace=orc_chasm"],
      ])}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [
          Step.STARTED,
          inProgress ? (
            <>
              <Line>
                Build a bridge. <Text as="i">(+item, -ML)</Text>
              </Line>
              <Line>
                Overkill orcs with cold damage: {orcProgress}/15 to NC.
              </Line>
              <Line>{commaAnd(needs)} needed.</Line>
            </>
          ) : (
            <Line href="/place.php?whichplace=orc_chasm&action=label1">
              Build the bridge!
            </Line>
          ),
        ],
        [1, null],
      ])}
    </QuestTile>
  );
};

export default OrcChasm;
