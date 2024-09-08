import { Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, canAdventure, haveEffect } from "kolmafia";
import { $effect, $item, $location, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

interface ShadowBrickLocation {
  zoneName: string;
  extraItems: string;
  canAccess: boolean;
}

const ClosedCircuitPayPhone = () => {
  const closedCircuitPayPhone = $item`closed-circuit pay phone`;
  const havePayPhone = haveUnrestricted(closedCircuitPayPhone);
  const shadowLodestone = $item`Rufus's shadow lodestone`;
  const shadowBrick = $item`shadow brick`;
  const shadowAffinity = $effect`Shadow Affinity`;

  const rufusQuestState = get("questRufus");
  const questObjectiveFulfilled = rufusQuestState === "step1";
  const shadowLodestones = availableAmount(shadowLodestone);
  const riftAdvsUntilNC = get("encountersUntilSRChoice");
  const calledRufusToday = get("_shadowAffinityToday");
  const shadowAffinityTurns = haveEffect(shadowAffinity);
  const shadowBricks = availableAmount(shadowBrick);
  const shadowBrickUsesLeft = Math.min(13 - get("_shadowBricksUsed"), 13);

  const shadowBrickLocations: ShadowBrickLocation[] = [
    {
      zoneName: "Cemetary",
      extraItems: "(also has bread, stick)",
      canAccess: canAdventure($location`Shadow Rift (The Misspelled Cemetary)`),
    },
    {
      zoneName: "Hidden City",
      extraItems: "(also has sinew, nectar)",
      canAccess: canAdventure($location`Shadow Rift (The Hidden City)`),
    },
    {
      zoneName: "Pyramid",
      extraItems: "(also has sausage, sinew)",
      canAccess: canAdventure(
        $location`Shadow Rift (The Ancient Buried Pyramid)`,
      ),
    },
  ];

  const getShadowBrickLocationTooltip = () => {
    return (
      <UnorderedList>
        {shadowBrickLocations.map((location, index) => (
          <Text
            key={index}
            color={location.canAccess ? "black" : "gray.500"}
            fontWeight="bold"
          >
            {location.zoneName} {location.extraItems}
          </Text>
        ))}
      </UnorderedList>
    );
  };

  useNag(
    () => ({
      priority: NagPriority.LOW,
      node: havePayPhone && questObjectiveFulfilled && (
        <Tile
          header="Rufus quest done"
          imageUrl="/images/itemimages/rufusphone.gif"
          linkedContent={closedCircuitPayPhone}
        >
          <Line>Call Rufus and get a lodestone.</Line>
        </Tile>
      ),
    }),
    [havePayPhone, questObjectiveFulfilled, closedCircuitPayPhone],
  );

  useNag(
    () => ({
      priority: NagPriority.LOW,
      node: havePayPhone &&
        rufusQuestState === "started" &&
        riftAdvsUntilNC === 0 && (
          <Tile
            header="Shadow Rift NC up next"
            imageUrl="/images/itemimages/shadowbucket.gif"
          >
            <Line>Fight a boss or get an artifact.</Line>
          </Tile>
        ),
    }),
    [havePayPhone, rufusQuestState, riftAdvsUntilNC],
  );

  if (!havePayPhone) return null;

  return (
    <>
      <Tile linkedContent={closedCircuitPayPhone}>
        {shadowLodestones > 0 && (
          <Line>
            <Text as="span" color="purple.500">
              Have {plural(shadowLodestones, "shadow lodestone")}.
            </Text>
          </Line>
        )}
        <Line>{riftAdvsUntilNC} encounters until NC/boss.</Line>
        {!calledRufusToday && (
          <Line color="blue.500">Haven't called Rufus yet today.</Line>
        )}
        {calledRufusToday && (
          <Line>
            Optionally call Rufus again for another (turn-taking) quest.
          </Line>
        )}
        <AdviceTooltip
          text={getShadowBrickLocationTooltip()}
          label="Shadow Brick locations"
        />
      </Tile>

      {shadowAffinityTurns > 0 && (
        <Tile
          header={`${shadowAffinityTurns} Shadow Rift free fights`}
          imageUrl="/images/adventureimages/voidguy.gif"
        >
          <Line color="purple.500">Shadow Rift fights are free!</Line>
          <Line>{riftAdvsUntilNC} encounters until NC/boss.</Line>
          <Line>(don't use other free kills in there)</Line>
        </Tile>
      )}

      {shadowBricks > 0 && (
        <Tile
          header={`${plural(shadowBricks, "shadow brick")}${shadowBrickUsesLeft < shadowBricks ? ` (${shadowBrickUsesLeft} usable today)` : ""}`}
          imageUrl="/images/itemimages/shadowbrick.gif"
        >
          <Line>Win a fight without taking a turn.</Line>
        </Tile>
      )}

      {shadowLodestones > 0 && (
        <Tile
          header={`${shadowLodestones} Rufus's shadow lodestones`}
          imageUrl="/images/itemimages/shadowlodestone.gif"
        >
          <Line>
            30 advs of +100% init, +100% item, +200% meat, -10% combat.
          </Line>
          <Line>Triggers on next visit to any Shadow Rift.</Line>
        </Tile>
      )}

      {!calledRufusToday && (
        <Tile
          header="Shadow Affinity free fights"
          imageUrl="/images/itemimages/rufusphone.gif"
          linkedContent={closedCircuitPayPhone}
        >
          <Line>
            Call Rufus to get 11+ free Shadow Rift combats.
          </Line>
        </Tile>
      )}
    </>
  );
};

export default ClosedCircuitPayPhone;
