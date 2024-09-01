import { ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import {
  availableAmount,
  canAdventure,
  Effect,
  haveEquipped,
  Item,
  myAscensions,
  Skill,
} from "kolmafia";
import {
  $effect,
  $item,
  $location,
  $skill,
  CursedMonkeyPaw,
  get,
  have,
  questStep,
} from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { inventoryLink } from "../../../util/links";
import { questFinished, questStarted } from "../../../util/quest";
import { plural } from "../../../util/text";

interface MonkeyWish {
  theItem: Item;
  theEffect: Effect;
  additionalDescription: string;
  shouldDisplay: boolean;
  currentlyAccessible: boolean;
}

const CursedMonkeysPaw = () => {
  const cursedMonkeysPaw = $item`cursed monkey's paw`;

  if (!have(cursedMonkeysPaw)) return null;

  const monkeyWishesLeft = CursedMonkeyPaw.wishes();

  const showWish = (wish: MonkeyWish) => {
    const color = wish.currentlyAccessible ? "black" : "gray.500";
    let wishStr = "";
    const additionalDescription = wish.additionalDescription
      ? `: ${wish.additionalDescription}`
      : "";

    if (wish.theItem !== $item`none`) {
      wishStr = `${wish.theItem.name}${additionalDescription}`;
    } else if (wish.theEffect !== $effect`none`) {
      wishStr = `${wish.theEffect.name}${additionalDescription}`;
    } else {
      wishStr = "Unknown item/effect. Report to TourGuide devs >:(";
    }

    return <Text color={color}>{wishStr}</Text>;
  };

  const inRunWishes: MonkeyWish[] = [
    {
      theItem: $item`sonar-in-a-biscuit`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        questStep("questL04Bat") !== 999 &&
        !canAdventure($location`The Boss Bat's Lair`),
      currentlyAccessible: canAdventure($location`Guano Junction`),
    },
    {
      theItem: $item`enchanted bean`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: !get("giantGrown") && !have($item`enchanted bean`),
      currentlyAccessible: canAdventure($location`The Beanbat Chamber`),
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Knob Goblin Perfume`,
      additionalDescription: "",
      shouldDisplay:
        !questFinished("questL05Goblin") && !have($item`Knob Goblin perfume`),
      currentlyAccessible: true,
    },
    {
      theItem: $item`Knob Goblin harem veil`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !questFinished("questL05Goblin") &&
        !have($item`Knob Goblin harem veil`),
      currentlyAccessible: canAdventure($location`Cobb's Knob Harem`),
    },
    {
      theItem: $item`Knob Goblin harem pants`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !questFinished("questL05Goblin") &&
        !have($item`Knob Goblin harem pants`),
      currentlyAccessible: canAdventure($location`Cobb's Knob Harem`),
    },
    {
      theItem: $item`stone wool`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !canAdventure($location`The Hidden Park`) &&
        availableAmount($item`stone wool`) < 2,
      currentlyAccessible: canAdventure($location`The Hidden Temple`),
    },
    {
      theItem: $item`amulet of extreme plot significance`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !canAdventure(
          $location`The Castle in the Clouds in the Sky (Ground Floor)`,
        ) && !have($item`amulet of extreme plot significance`),
      currentlyAccessible: canAdventure(
        $location`The Penultimate Fantasy Airship`,
      ),
    },
    {
      theItem: $item`Mohawk wig`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !questFinished("questL10Garbage") && !have($item`Mohawk wig`),
      currentlyAccessible: canAdventure(
        $location`The Penultimate Fantasy Airship`,
      ),
    },
    {
      theItem: $item`book of matches`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        myAscensions() !== get("hiddenTavernUnlock") &&
        !have($item`book of matches`),
      currentlyAccessible: canAdventure($location`The Hidden Park`),
    },
    {
      theItem: $item`rusty hedge trimmers`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: get("twinPeakProgress") < 13,
      currentlyAccessible: canAdventure($location`Twin Peak`),
    },
    {
      theItem: $item`killing jar`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        questStep("questL11Desert") < 2 &&
        get("desertExploration") < 100 &&
        !have($item`killing jar`),
      currentlyAccessible: canAdventure($location`The Haunted Library`),
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Dirty Pear`,
      additionalDescription: `<font color="purple">double sleaze damage</font>`,
      shouldDisplay: get("zeppelinProtestors") < 80,
      currentlyAccessible: true,
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Painted-On Bikini`,
      additionalDescription: `<font color="purple">+100 sleaze damage</font>`,
      shouldDisplay: get("zeppelinProtestors") < 80,
      currentlyAccessible: true,
    },
    {
      theItem: $item`glark cable`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: questStep("questL11Ron") < 5,
      currentlyAccessible: canAdventure($location`The Red Zeppelin`),
    },
    {
      theItem: $item`short writ of habeas corpus`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: !questFinished("questL11Spare"),
      currentlyAccessible: canAdventure($location`The Hidden Park`),
    },
    {
      theItem: $item`lion oil`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: !have($item`Mega Gem`) && !have($item`lion oil`),
      currentlyAccessible: canAdventure($location`Whitey's Grove`),
    },
    {
      theItem: $item`bird rib`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: !have($item`Mega Gem`) && !have($item`bird rib`),
      currentlyAccessible: canAdventure($location`Whitey's Grove`),
    },
    {
      theItem: $item`drum machine`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        get("desertExploration") < 100 && !have($item`drum machine`),
      currentlyAccessible: canAdventure($location`The Oasis`),
    },
    {
      theItem: $item`shadow brick`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        get("_shadowBricksUsed") + availableAmount($item`shadow brick`) < 13,
      currentlyAccessible: true,
    },
    {
      theItem: $item`green smoke bomb`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !questFinished("questL12War") &&
        get("sidequestArenaCompleted") !== "hippy",
      currentlyAccessible:
        questStarted("questL12War") && get("hippiesDefeated") >= 400,
    },
    {
      theItem: $item`star chart`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay:
        !get("nsTowerDoorKeysUsed").includes("Richard's star key") &&
        !have($item`Richard's star key`) &&
        !have($item`star chart`),
      currentlyAccessible: canAdventure($location`The Hole in the Sky`),
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Frosty`,
      additionalDescription: "init/item/meat",
      shouldDisplay:
        !get("nsTowerDoorKeysUsed").includes("digital key") &&
        !have($item`digital key`) &&
        get("8BitScore") < 10000,
      currentlyAccessible: true,
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Staying Frosty`,
      additionalDescription: `<font color="blue">cold damage race</font>`,
      shouldDisplay:
        get("nsContestants3") !== -1 && get("nsChallenge2") === "cold",
      currentlyAccessible: true,
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Dragged Through the Coals`,
      additionalDescription: `<font color="red">hot damage race</font>`,
      shouldDisplay:
        get("nsContestants3") !== -1 && get("nsChallenge2") === "hot",
      currentlyAccessible: true,
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Bored Stiff`,
      additionalDescription: `<font color="gray">spooky damage race</font>`,
      shouldDisplay:
        get("nsContestants3") !== -1 && get("nsChallenge2") === "spooky",
      currentlyAccessible: true,
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Sewer-Drenched`,
      additionalDescription: `<font color="green">stench damage race</font>`,
      shouldDisplay:
        get("nsContestants3") !== -1 && get("nsChallenge2") === "stench",
      currentlyAccessible: true,
    },
    {
      theItem: $item`none`,
      theEffect: $effect`Fifty Ways to Bereave Your Lover`,
      additionalDescription: `<font color="purple">sleaze damage race</font>`,
      shouldDisplay:
        get("nsContestants3") !== -1 &&
        get("nsChallenge2") === "sleaze" &&
        get("zeppelinProtestors") > 79,
      currentlyAccessible: true,
    },
    {
      theItem: $item`lowercase N`,
      theEffect: $effect`none`,
      additionalDescription: "summon the nagamar",
      shouldDisplay:
        questStep("questL13Final") < 14 &&
        !have($item`lowercase N`) &&
        have($item`ruby W`) &&
        have($item`metallic A`) &&
        have($item`heavy D`),
      currentlyAccessible: canAdventure($location`The Valley of Rof L'm Fao`),
    },
  ];

  const aftercoreWishes: MonkeyWish[] = [
    {
      theItem: $item`bag of foreign bribes`,
      theEffect: $effect`none`,
      additionalDescription: "",
      shouldDisplay: canAdventure($location`The Ice Hotel`),
      currentlyAccessible: true,
    },
  ];

  const showWishes = (wishes: MonkeyWish[]) => {
    const currentWishes = wishes
      .filter((wish) => wish.shouldDisplay && wish.currentlyAccessible)
      .map(showWish);
    const futureWishes = wishes
      .filter((wish) => wish.shouldDisplay && !wish.currentlyAccessible)
      .map(showWish);
    return [...currentWishes, ...futureWishes];
  };

  const options = !get("kingLiberated")
    ? showWishes(inRunWishes)
    : showWishes(aftercoreWishes);

  interface MonkeySkill {
    fingerCount: number;
    theSkill: Skill;
    description: string;
  }

  const monkeySkills: MonkeySkill[] = [
    {
      fingerCount: 5,
      theSkill: $skill`Monkey Slap`,
      description: "killbanish",
    },
    { fingerCount: 4, theSkill: $skill`Monkey Tickle`, description: "delevel" },
    {
      fingerCount: 3,
      theSkill: $skill`Evil Monkey Eye`,
      description: "spooky delevel",
    },
    {
      fingerCount: 2,
      theSkill: $skill`Monkey Peace Sign`,
      description: "heal",
    },
    {
      fingerCount: 1,
      theSkill: $skill`Monkey Point`,
      description: "Olfaction-lite",
    },
  ];

  return (
    <Tile
      header={plural(monkeyWishesLeft, "monkey's paw wish")}
      imageUrl={
        monkeyWishesLeft > 0
          ? `/images/itemimages/${monkeySkills[5 - monkeyWishesLeft].theSkill.image}.gif`
          : undefined
      }
      href="main.php?action=cmonk"
    >
      <Line>Return to monke. Wish for items or effects:</Line>
      {options.length > 0 && (
        <Stack>
          <Line fontWeight="bold">Possible wishes:</Line>
          <UnorderedList>{options}</UnorderedList>
        </Stack>
      )}
      <UnorderedList>
        {monkeySkills.map((skill) => (
          <ListItem key={skill.fingerCount}>
            <Text as="b">
              {plural(skill.fingerCount, "finger", "fingers")}:
            </Text>{" "}
            {skill.description}
          </ListItem>
        ))}
      </UnorderedList>
      {monkeyWishesLeft === 5 && (
        <>
          <Line
            href={
              haveEquipped(cursedMonkeysPaw)
                ? inventoryLink(cursedMonkeysPaw)
                : undefined
            }
          >
            Turn-taking repeat-use banish. Lasts until you use it again!
          </Line>
          {!haveEquipped(cursedMonkeysPaw) && (
            <Line>Equip your cursed monkey paw first.</Line>
          )}
        </>
      )}
    </Tile>
  );
};

export default CursedMonkeysPaw;
