import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { $item, CombatLoversLocket, get } from "libram";
import React, { ReactNode } from "react";

import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

function getLocketEnchantment(phylum: string): ReactNode {
  switch (phylum) {
    case "beast":
      return "+10% Crit Chance and +20 Muscle";
    case "bug":
      return "+25% Weapon Damage and +25% max MP";
    case "constellation":
      return "+10% Spell Crit and +20 Mysticality";
    case "construct":
      return "+3 Moxie exp and +25 Spell Damage";
    case "demon":
      return (
        <>
          <Text as="span" color="red">
            +25 Hot
          </Text>
          {" and +50% Gear drops"}
        </>
      );
    case "dude":
      return (
        <>
          <Text as="span" color="blue">
            +25 Cold
          </Text>
          {" and +50% Moxie"}
        </>
      );
    case "elemental":
      return (
        <>
          <Text as="span" color="red">
            +3 Hot res
          </Text>
          {" and "}
          <Text as="span" color="green.800">
            +25 Stench Spell
          </Text>
        </>
      );
    case "elf":
      return "+5 exp and +75% Candy drops";
    case "fish":
      return (
        <>
          {"+50% Meat Drops and "}
          <Text as="span" color="gray.500">
            +25 Spooky Spell
          </Text>
        </>
      );
    case "goblin":
      return (
        <>
          <Text as="span" color="green.800">
            +25 Stench
          </Text>
          {" and +50% Mysticality"}
        </>
      );
    case "hippy":
      return (
        <>
          <Text as="span" color="green.800">
            +3 Stench res
          </Text>
          {" and +10 DR"}
        </>
      );
    case "hobo":
      return (
        <>
          {"+3 Mysticality exp and "}
          <Text as="span" color="red">
            +25 Hot Spell
          </Text>
        </>
      );
    case "horror":
      return (
        <>
          <Text as="span" color="gray.500">
            +3 Spooky res
          </Text>
          {" and +50 HP"}
        </>
      );
    case "humanoid":
      return "+25% Spell Damage and +20 Moxie";
    case "mer-kin":
      return (
        <>
          {"+25% Item Drops and "}
          <Text as="span" color="purple.500">
            +25 Sleaze Spell
          </Text>
        </>
      );
    case "orc":
      return (
        <>
          <Text as="span" color="purple.500">
            +3 Sleaze res
          </Text>
          {" and +25 MP"}
        </>
      );
    case "penguin":
      return (
        <>
          {"+3 Muscle exp and "}
          <Text as="span" color="blue">
            +25 Cold Spell
          </Text>
        </>
      );
    case "pirate":
      return (
        <>
          {"+50% Booze Drops and "}
          <Text as="span" color="purple.500">
            +25 Sleaze
          </Text>
        </>
      );
    case "plant":
      return "+50% Initiative and +50% max HP";
    case "slime":
      return (
        <>
          <Text as="span" color="blue">
            +3 Cold res
          </Text>
          {" and +50 DA"}
        </>
      );
    case "undead":
      return (
        <>
          <Text as="span" color="gray.500">
            +25 Spooky
          </Text>
          {" and +50% Muscle"}
        </>
      );
    case "weird":
      return "+50% Food Drops and +25 Weapon Damage";
    default:
      return "";
  }
}

function getOptions(): string[] {
  if (!get("_inRun") || get("pathId") === "Community Service") {
    return [];
  }

  return [
    "Black crayon scalers, any phylum",
    "Frat warrior outfit, if no numberology",
    "Mountain man",
    "Ninja snowman assassin",
    "Swarm of ghuol whelps",
    "Sausage goblin",
    "Baa'baa'bu'ran",
    "Forest spirit (for a machete, with some free crafts)",
    "Astronomer OR camel's toe OR skinflute",
    "Lobsterfrogman",
    "Beanbat",
    "Dairy goat",
    "Blur",
    "Lynyrd skinner",
  ];
}

const CombatLoversLocketTile: React.FC = () => {
  const combatLoversLocket = $item`combat lover's locket`;

  if (!haveUnrestricted(combatLoversLocket)) {
    return null;
  }

  const locketPhylum = get("locketPhylum")?.identifierString ?? "none";
  const locketEnchantment = getLocketEnchantment(locketPhylum);
  const reminiscesLeft = CombatLoversLocket.reminiscesLeft();

  const options = getOptions();

  return (
    reminiscesLeft > 0 && (
      <Tile
        header="Combat Lover's Locket"
        imageUrl="/images/itemimages/lovelocket.gif"
        href="inventory.php?reminisce=1"
      >
        <Text>
          {plural(reminiscesLeft, "Combat lover's locket reminiscence")}.
        </Text>
        <Text as="b">Current enchantment: </Text>
        {locketPhylum}
        <Text color="blue.500">{locketEnchantment}</Text>,
        {options.length > 0 && (
          <UnorderedList>
            {options.map((option) => (
              <ListItem key={option}>{option}</ListItem>
            ))}
          </UnorderedList>
        )}
      </Tile>
    )
  );
};

export default CombatLoversLocketTile;
