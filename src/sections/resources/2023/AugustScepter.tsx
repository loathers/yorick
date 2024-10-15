import { Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import {
  availableAmount,
  myLevel,
  myPath,
  myPrimestat,
  numericModifier,
} from "kolmafia";
import {
  $familiar,
  $item,
  $path,
  $skill,
  byStat,
  get,
  have,
  questStep,
} from "libram";
import React, { ReactNode } from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const augustScepter = $item`august scepter`;

const AugustScepter: React.FC = () => {
  const skillsAvailable = 5 - get("_augSkillsCast");
  if (!have(augustScepter) || skillsAvailable < 1) return null;

  const buffString = (
    <Text as="span" size="xs" color="gray.500">
      {" "}
      (buff)
    </Text>
  );

  const augSkillsToValue: Record<string, string> = {
    "Aug. 1st: Mountain Climbing Day!": "a +adv buff",
    "Aug. 2nd: Find an Eleven-Leaf Clover Day": "lucky!",
    "Aug. 3rd: Watermelon Day!": "a watermelon",
    "Aug. 4th: Water Balloon Day!": "three water balloons",
    "Aug. 5th: Oyster Day!": "some oyster eggs",
    "Aug. 6th: Fresh Breath Day!": "a +com buff",
    "Aug. 7th: Lighthouse Day!": "an item/meat buff",
    "Aug. 8th: Cat Day!": "a catfight, meow",
    "Aug. 9th: Hand Holding Day!": "a foe's hand held",
    "Aug. 10th: World Lion Day!": "roars like a lion",
    "Aug. 11th: Presidential Joke Day!": "myst stats",
    "Aug. 12th: Elephant Day!": "mus stats",
    "Aug. 13th: Left/Off Hander's Day!": "double offhands",
    "Aug. 14th: Financial Awareness  Day!": "bad meatgain",
    "Aug. 15th: Relaxation Day!": "a full heal",
    "Aug. 16th: Roller Coaster Day!": "-full & +food%",
    "Aug. 17th: Thriftshop Day!": "a 1000 meat coupon",
    "Aug. 18th: Serendipity Day!": "a bunch of items",
    "Aug. 19th: Honey Bee Awareness Day!": "stalked by bees",
    "Aug. 20th: Mosquito Day!": "HP regen",
    "Aug. 21st: Spumoni Day!": "stats of all kinds",
    "Aug. 22nd: Tooth Fairy Day!": "a free tooth monster",
    "Aug. 23rd: Ride the Wind Day!": "mox stats",
    "Aug. 24th: Waffle Day!": "three waffles",
    "Aug. 25th: Banana Split Day!": "a banana split",
    "Aug. 26th: Toilet Paper Day!": "some toilet paper",
    "Aug. 27th: Just Because Day!": "three random effects",
    "Aug. 28th: Race Your Mouse Day!": "a melting fam equip",
    "Aug. 29th: More Herbs, Less Salt  Day!": "a food stat enhancer",
    "Aug. 30th: Beach Day!": "a +7 adv accessory",
    "Aug. 31st: Cabernet Sauvignon  Day!": "two bottles of +booze% wine",
  };

  const mainstatAugustSkill = byStat({
    Muscle: 12,
    Mysticality: 11,
    Moxie: 23,
  });

  const grabNumber = (s: string) => {
    const match = s.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const usefulAugustSkills: Record<number, ReactNode> = {};

  Object.entries(augSkillsToValue).forEach(([augSkillName]) => {
    const augSkillNumber = grabNumber(augSkillName);
    const augSkillPref = `_aug${augSkillNumber}Cast`;

    if ([3, 4, 5, 8, 14, 15, 19, 20, 21, 25, 26, 29].includes(augSkillNumber)) {
      return;
    }
    if (get(augSkillPref)) return;

    if (get("questL13Final") !== "finished") {
      if (augSkillNumber === mainstatAugustSkill) {
        const statsGained = Math.floor(
          50 *
            myLevel() *
            (1.0 +
              numericModifier(`${myPrimestat()} Experience Percent`) / 100.0),
        );
        usefulAugustSkills[augSkillNumber] = `+${statsGained} mainstat`;
      }
    }

    if (myPath() !== $path`Slow and Steady`) {
      if (
        availableAmount($item`goat cheese`) <= 2 &&
        !haveUnrestricted($item`Mayam Calendar`) &&
        questStep("questL08Trapper") < 2
      ) {
        if (augSkillNumber === 1) {
          usefulAugustSkills[1] = (
            <>
              +2-5 turns{" "}
              <Text as="span" size="xs" color="gray.500">
                (spend turns @ the Goatlet)
              </Text>
            </>
          );
        }
      }

      if (augSkillNumber === 30) {
        usefulAugustSkills[30] = (
          <>
            +7 advs rollover accessory{" "}
            <Text as="span" size="xs" color="gray.500">
              (melting)
            </Text>
          </>
        );
      }
    }

    const manorCheck =
      questStep("questL11Manor") < 3 && get("manorDrawerCount") >= 21;
    const blastingAddendum =
      manorCheck && !have($item`blasting soda`) ? (
        <Text as="span" fontSize="0.9em" color="gray.500">
          (blasting soda!)
        </Text>
      ) : null;

    if (augSkillNumber === 16) {
      usefulAugustSkills[16] = `-1 fullness, +100% food drop ${blastingAddendum}`;
    }

    if (manorCheck && !have($item`bottle of Chateau de Vinegar`)) {
      if (augSkillNumber === 31) {
        usefulAugustSkills[31] = `+100% booze drop wine <Text as="span" fontSize="0.9em" color="gray.500">(chateau de vinegar!)</Text>`;
      }
    }

    if (augSkillNumber === 7) {
      usefulAugustSkills[7] = <>+50% item, +100% meat{buffString}</>;
    }
    if (augSkillNumber === 2) {
      usefulAugustSkills[2] = (
        <>
          get{" "}
          <Text as="span" color="green.500">
            Lucky!
          </Text>
        </>
      );
    }
    if (augSkillNumber === 24) {
      usefulAugustSkills[24] = "3 waffles, for monster replacement";
    }
    if (augSkillNumber === 22) {
      usefulAugustSkills[22] = "free fight for teeeeeeeeeeeth";
    }
    if (questStep("questL08Trapper") < 2) {
      if (augSkillNumber === 6) {
        usefulAugustSkills[6] = <>+10% combat{buffString}</>;
      }
    }
    if (augSkillNumber === 9) {
      usefulAugustSkills[9] = "hold hands for a minor sniff";
    }
    if (augSkillNumber === 10) {
      usefulAugustSkills[10] = <>non-free reusable banishes{buffString}</>;
    }

    const usefulOffhands = have($item`deck of lewd playing cards`);
    const protestorsRemaining = Math.max(
      0,
      Math.min(80, 80 - get("zeppelinProtestors")),
    );

    if (usefulOffhands && protestorsRemaining > 10) {
      if (augSkillNumber === 13) {
        usefulAugustSkills[13] = (
          <>
            double offhand enchantments{" "}
            <Text as="span" color="purple.500">
              (sleaze for protestors)
            </Text>
          </>
        );
      }
    }

    if (augSkillNumber === 27) {
      usefulAugustSkills[27] = (
        <>
          +3{" "}
          <Text as="span" color="red.500">
            r
          </Text>
          <Text as="span" color="green.500">
            a
          </Text>
          <Text as="span" color="purple.500">
            n
          </Text>
          <Text as="span" color="blue.500">
            d
          </Text>
          <Text as="span" color="gray.500">
            o
          </Text>
          <Text as="span" color="red.500">
            m
          </Text>{" "}
          effects{buffString}
        </>
      );
    }

    if (
      have($skill`Transcendent Olfaction`) &&
      (have($familiar`Pair of Stomping Boots`) ||
        (have($skill`The Ode to Booze`) &&
          have($familiar`Frumious Bandersnatch`)))
    ) {
      if (!have($item`astral pet sweater`)) {
        if (augSkillNumber === 28) {
          usefulAugustSkills[28] = (
            <>
              +10 weight familiar equipment{" "}
              <Text as="span" fontSize="0.9em" color="gray.500">
                (melting)
              </Text>
            </>
          );
        }
      }
    }
  });

  const table = Object.entries(usefulAugustSkills).map(([day, reason]) => (
    <Tr key={day}>
      <Td px={1} py={1}>
        {day}
      </Td>
      <Td px={1} py={1}>
        {reason}
      </Td>
    </Tr>
  ));

  const summarizeAugust =
    "Celebrate August tidings; cast skills corresponding to the given day to get valuable benefits.";

  const description =
    table.length > 0 ? (
      <>
        <Text>{summarizeAugust}</Text>
        <Table size="sm">
          <Tbody>{table}</Tbody>
        </Table>
      </>
    ) : (
      <Text>{summarizeAugust}</Text>
    );

  const title = `Cast ${plural(skillsAvailable, "August Scepter skill", "August Scepter skills")}`;
  const subtitle = "All buffs are 30 turns.";

  const allSkills = Object.entries(augSkillsToValue)
    .sort((a, b) => grabNumber(a[0]) - grabNumber(b[0]))
    .map(([augSkill, augSkillValue]) => {
      const augSkillNumber = grabNumber(augSkill);
      const lineColor = get(`_aug${augSkillNumber}Cast`) ? "gray.500" : "black";
      return (
        <Tr key={augSkillNumber}>
          <Td
            textAlign="center"
            fontSize="x-small"
            px={1}
            py={0}
            color={lineColor}
          >
            {augSkillNumber}
          </Td>
          <Td fontSize="x-small" px={1} py={0} color={lineColor}>
            {augSkillValue}
          </Td>
        </Tr>
      );
    });

  const tooltip = (
    <>
      <Text fontWeight="bold" textAlign="center">
        Well, you asked for it!
      </Text>
      <Table size="sm">
        <Tbody>{allSkills}</Tbody>
      </Table>
    </>
  );

  return (
    <Tile
      header={title}
      id="august-scepter-resource"
      imageUrl="/images/itemimages/scepter.gif"
    >
      <Line>{subtitle}</Line>
      {description}
      <AdviceTooltip
        label="No, YORICK, show me ALL the skills."
        text={tooltip}
      />
    </Tile>
  );
};

export default AugustScepter;
