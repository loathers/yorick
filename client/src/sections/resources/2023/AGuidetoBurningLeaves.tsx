import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, getCampground, myLevel } from "kolmafia";
import { $familiar, $item, $skill, get, have } from "libram";
import React from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

interface LeafyFight {
  leafCost: number;
  summonedMonster: string;
  scaling: string;
  leavesDropped: number;
  extraDrops: string;
}

interface LeafySummon {
  leafCost: number;
  summonedItem: string;
  description: string;
  meltingStatus: boolean;
  prefName: string;
}

const BurningLeaves: React.FC = () => {
  const guideToLeaves = $item`A Guide to Burning Leaves`;
  const inflammableLeaf = $item`inflammable leaf`;
  const leafCount = availableAmount(inflammableLeaf);

  const leafySummons: LeafySummon[] = [
    {
      leafCost: 37,
      summonedItem: "Autumnic Bomb",
      description: "potion; prismatic stinging (25 turns)",
      meltingStatus: false,
      prefName: "",
    },
    {
      leafCost: 42,
      summonedItem: "Impromptu Torch",
      description: "weapon; +2 mus/fight",
      meltingStatus: true,
      prefName: "",
    },
    {
      leafCost: 43,
      summonedItem: "Flaming Fig Leaf",
      description: "pants; +2 mox/fight",
      meltingStatus: true,
      prefName: "",
    },
    {
      leafCost: 44,
      summonedItem: "Smoldering Drape",
      description: "cape; +2 mys/fight, +20% stat",
      meltingStatus: true,
      prefName: "",
    },
    {
      leafCost: 50,
      summonedItem: "Distilled Resin",
      description: "potion; generate +1 leaf/fight (100 turns)",
      meltingStatus: false,
      prefName: "",
    },
    {
      leafCost: 66,
      summonedItem: "Autumnal Aegis",
      description: "shield; +250 DA, +2 all res",
      meltingStatus: false,
      prefName: "",
    },
    {
      leafCost: 69,
      summonedItem: "Lit Leaf Lasso",
      description:
        "combat item; lasso leaf freebies for extra end-of-combat triggers",
      meltingStatus: false,
      prefName: "_leafLassosCrafted",
    },
    {
      leafCost: 74,
      summonedItem: "Forest Canopy Bed",
      description: "bed; +5 free rests, stats via rests",
      meltingStatus: false,
      prefName: "",
    },
    {
      leafCost: 99,
      summonedItem: "Autumnic Balm",
      description: "potion; +2 all res (100 turns)",
      meltingStatus: false,
      prefName: "",
    },
    {
      leafCost: 222,
      summonedItem: "Day Shortener",
      description: "spend 5 turns for a +turn item",
      meltingStatus: false,
      prefName: "_leafDayShortenerCrafted",
    },
    {
      leafCost: 1111,
      summonedItem: "Coping Juice",
      description: "copium for the masses",
      meltingStatus: false,
      prefName: "",
    },
    {
      leafCost: 6666,
      summonedItem: "Smoldering Leafcutter Ant Egg",
      description: "mosquito & leaves familiar",
      meltingStatus: false,
      prefName: "_leafAntEggCrafted",
    },
    {
      leafCost: 11111,
      summonedItem: "Super-Heated Leaf",
      description: "burn leaves into your skiiiin",
      meltingStatus: false,
      prefName: "_leafTattooCrafted",
    },
  ];

  const leafyFights: LeafyFight[] = [
    {
      leafCost: 11,
      summonedMonster: "Flaming Leaflet",
      scaling: "11/11/11",
      leavesDropped: 4,
      extraDrops: "",
    },
    {
      leafCost: 111,
      summonedMonster: "Flaming Monstera",
      scaling: "scaling",
      leavesDropped: 7,
      extraDrops: "leafy browns",
    },
    {
      leafCost: 666,
      summonedMonster: "Leaviathan",
      scaling: "scaling boss (hard!)",
      leavesDropped: 125,
      extraDrops: "flaming leaf crown",
    },
  ];

  const canUseShorty = haveUnrestricted($familiar`Shorter-Order Cook`);
  const canUseCrab = haveUnrestricted($familiar`Imitation Crab`);
  const hasTaoOfTheTerrapin = have($skill`Tao of the Terrapin`);
  const hasForestCanopyBed = !!getCampground()["forest canopy bed"];
  const inRun = get("kingLiberated") === false;

  const fightsRemaining = Math.max(0, 5 - get("_leafMonstersFought"));
  const leafletsUserCanSummon = Math.floor(leafCount / 11);

  if (!haveUnrestricted(guideToLeaves)) return null;

  return (
    <Tile
      header="Burning Leaves"
      imageUrl="/images/itemimages/al_book.gif"
      href="/campground.php?preaction=burningleaves"
    >
      <Line fontWeight="bold" href="/campground.php?preaction=burningleaves">
        Item Summons:
      </Line>
      <UnorderedList>
        {leafySummons.map((summon) => {
          if (
            ((canUseShorty || canUseCrab) && summon.leafCost === 37) ||
            (myLevel() > 11 && [42, 43].includes(summon.leafCost)) ||
            (hasTaoOfTheTerrapin && summon.leafCost === 66) ||
            (have($item`${summon.summonedItem}`) &&
              [42, 43, 44, 66, 74].includes(summon.leafCost)) ||
            (hasForestCanopyBed && summon.leafCost === 74) ||
            (inRun && [99, 222, 1111, 6666, 11111].includes(summon.leafCost)) ||
            (!inRun && [42, 43, 44, 66].includes(summon.leafCost))
          ) {
            return null;
          }

          const hasEnoughLeaves = leafCount >= summon.leafCost;
          return (
            <ListItem
              key={summon.summonedItem}
              color={hasEnoughLeaves ? "black" : "gray.500"}
            >
              {summon.leafCost} leaves: {summon.summonedItem} -{" "}
              {summon.description}
              {summon.meltingStatus && (
                <Text as="span" fontSize="xs" color="gray.500">
                  {" "}
                  (melting)
                </Text>
              )}
            </ListItem>
          );
        })}
      </UnorderedList>

      {fightsRemaining > 0 && (
        <>
          <Line
            fontWeight="bold"
            href="/campground.php?preaction=burningleaves"
          >
            Fight Summons:
          </Line>
          <UnorderedList>
            {leafyFights.map((fight) => {
              if (
                inRun &&
                have($item`flaming leaf crown`) &&
                fight.summonedMonster === "Leaviathan"
              ) {
                return null;
              }

              const hasEnoughLeaves = leafCount >= fight.leafCost;
              return (
                <ListItem
                  key={fight.summonedMonster}
                  color={hasEnoughLeaves ? "black" : "gray.500"}
                >
                  {fight.leafCost} leaves: {fight.summonedMonster} -{" "}
                  {fight.scaling}; ~{fight.leavesDropped} leaves dropped
                  {fight.extraDrops && (
                    <Text as="span" fontSize="xs" color="gray.500">
                      {" "}
                      (also, drops {fight.extraDrops})
                    </Text>
                  )}
                </ListItem>
              );
            })}
          </UnorderedList>
          <Line>
            {leafCount >= 111 * fightsRemaining ? (
              <AdviceTooltip
                text={`You can summon ${fightsRemaining} monstera for scaling fights.`}
                label={`You have enough leaves for ${fightsRemaining} monstera.`}
              />
            ) : leafCount >= 11 * fightsRemaining ? (
              <AdviceTooltip
                text={`You can summon ${fightsRemaining} leaflets for familiar turns.`}
                label={`You have enough leaves for ${fightsRemaining} leaflets.`}
              />
            ) : leafCount >= 11 ? (
              <AdviceTooltip
                text="Save leaves for more fights!"
                label={`You can currently summon ${plural(leafletsUserCanSummon, "leaflet")}.`}
              />
            ) : (
              <AdviceTooltip
                text="Save leaves for fights!"
                label="You cannot currently summon a free fight."
              />
            )}
          </Line>
        </>
      )}
    </Tile>
  );
};

export default BurningLeaves;
