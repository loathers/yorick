import { Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { canAdventure, canEquip, haveEffect, myPath, Phylum } from "kolmafia";
import {
  $effect,
  $familiar,
  $item,
  $location,
  $monster,
  $path,
  get,
  getMonsterLocations,
  have,
  questStep,
} from "libram";
import { ReactNode } from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { questFinished } from "../../../util/quest";
import { plural } from "../../../util/text";

const PatrioticEagle = () => {
  const patrioticEagle = $familiar`Patriotic Eagle`;
  const rwbMonster = get("rwbMonster");
  const fightsLeft = Math.max(0, Math.min(get("rwbMonsterCount"), 2));
  const screechRecharge = get("screechCombats");
  const eaglePhylumBanished = Phylum.get(get("banishedPhyla").split(":")[1]);
  const citizenOfAZone = $effect`Citizen of a Zone`;
  const haveCitizen = have(citizenOfAZone);
  const canUseCitizen =
    // eslint-disable-next-line libram/verify-constants
    !haveCitizen && canEquip(patrioticEagle) && myPath() !== $path`Avant Garde`;

  useNag(
    () => ({
      priority: NagPriority.LOW,
      node: canUseCitizen && (
        <Tile
          header="Pledge to a zone!"
          imageUrl="/images/itemimages/pateagle.gif"
        >
          <UnorderedList>
            <ListItem>Haunted Kitchen: +100% init</ListItem>
            <ListItem>Haunted Library/Laundry: +30% item</ListItem>
            <ListItem>
              Batrat/Ninja Snowmen/Frat Battlefield: +50% meat
            </ListItem>
          </UnorderedList>
        </Tile>
      ),
    }),
    [canUseCitizen],
  );

  if (!haveUnrestricted(patrioticEagle)) return null;

  const possibleAppearanceLocations = rwbMonster
    ? getMonsterLocations(rwbMonster).filter((location) =>
        canAdventure(location),
      )
    : [];

  const generatePledgeZones = (
    locations: [string, string][],
    effect: string,
  ): ReactNode => (
    <Line>
      <Text as="b">{effect}:</Text>{" "}
      {locations
        .filter(([, loc]) => canAdventure($location`${loc}`))
        .map(([name]) => name)
        .join(", ")}
    </Line>
  );

  const generatePhylumOptions = (
    phylum: string,
    options: [string, string, boolean][],
  ): ReactNode => (
    <Line>
      <Text as="b">{phylum}:</Text>{" "}
      {options
        .filter(([, loc, useful]) => canAdventure($location`${loc}`) && useful)
        .map(([name]) => name)
        .join(", ")}
    </Line>
  );

  return (
    <Tile linkedContent={patrioticEagle}>
      {rwbMonster && rwbMonster !== $monster`none` && fightsLeft > 0 && (
        <>
          <Heading as="h3" size="md">
            Fight {plural(fightsLeft, `more ${rwbMonster}`)}
          </Heading>
          <Line>
            Copied by your eagle's blast. Will appear when you adventure in{" "}
            {possibleAppearanceLocations.join(", ")}.
          </Line>
          {rwbMonster?.phylum === eaglePhylumBanished && (
            <Line color="red.500">
              <Text as="b">WARNING!</Text> This monster will not appear, it's
              banished by your eagle screech!
            </Line>
          )}
        </>
      )}
      <Heading as="h3" size="md">
        {screechRecharge > 0
          ? `${screechRecharge} combats (or freeruns) until your Patriotic Eagle can screech again.`
          : "Patriotic Eagle can screech and banish an entire phylum!"}
      </Heading>
      {screechRecharge === 0 && (
        <Line>
          <Text as="span" color="red.500">
            SCREEEE
          </Text>
          <Text as="span" color="gray.500">
            EEEEE
          </Text>
          <Text as="span" color="blue.500">
            EEEEE!
          </Text>
        </Line>
      )}
      {!haveEffect(citizenOfAZone) && (
        <>
          <Line>
            <Text as="span" color="red.500">
              Pledge
            </Text>{" "}
            <Text as="span" color="gray.500">
              allegiance
            </Text>{" "}
            <Text as="span" color="blue.500">
              to a zone!
            </Text>
          </Line>
          {generatePledgeZones(
            [
              ["Haunted Library", "The Haunted Library"],
              ["Haunted Laundry Room", "The Haunted Laundry Room"],
              ["Whitey's Grove", "Whitey's Grove"],
            ],
            "+30% item",
          )}
          {generatePledgeZones(
            [
              ["Ninja Snowmen Lair", "Lair of the Ninja Snowmen"],
              ["Hidden Hospital", "The Hidden Hospital"],
              ["Haunted Bathroom", "The Haunted Bathroom"],
              ["the Oasis", "The Oasis"],
            ],
            "+50% meat",
          )}
          {generatePledgeZones(
            [
              ["Haunted Kitchen", "The Haunted Kitchen"],
              ["Oil Peak", "Oil Peak"],
              ["Oliver's Tavern", "An Unusually Quiet Barroom Brawl"],
            ],
            "+100% init",
          )}
        </>
      )}
      <Heading as="h3" size="md">
        Screech these phylums away to banish a fraction of monsters from a
        relevant zone:
      </Heading>
      <UnorderedList>
        {generatePhylumOptions("Dude", [
          [
            "Black Forest (2/5)",
            "The Black Forest",
            questStep("questL11Black") < 2,
          ],
          ["Twin Peak (5/8)", "Twin Peak", get("twinPeakProgress") < 15],
          ["Whitey's Grove (1/4)", "Whitey's Grove", true],
        ])}
        {generatePhylumOptions("Beast", [
          [
            "Hidden Park (1/4)",
            "The Hidden Park",
            !have($item`antique machete`) && !have($item`muculent machete`),
          ],
          [
            "Palindome (3/7)",
            "Inside the Palindome",
            get("palindomeDudesDefeated") < 5,
          ],
          [
            "Airship (2/7)",
            "The Penultimate Fantasy Airship",
            questStep("questL10Garbage") < 7,
          ],
        ])}
        {generatePhylumOptions("Construct", [
          ["Whitey's Grove (1/4)", "Whitey's Grove", true],
          [
            "Airship (1/7)",
            "The Penultimate Fantasy Airship",
            questStep("questL10Garbage") < 7,
          ],
        ])}
        {generatePhylumOptions("Undead", [
          [
            "Haunted Library (1/3)",
            "The Haunted Library",
            get("writingDesksDefeated") < 5,
          ],
          [
            "Red Zeppelin (1/5)",
            "The Red Zeppelin",
            questStep("questL11Ron") < 4,
          ],
          [
            "Haunted Wine Cellar (1/3)",
            "The Haunted Wine Cellar",
            questStep("questL11Manor") < 3,
          ],
          [
            "Haunted Boiler (1/3)",
            "The Haunted Boiler Room",
            questStep("questL11Manor") < 3,
          ],
          [
            "Pyramid Middle (1/3)",
            "The Middle Chamber",
            !questFinished("questL11Pyramid"),
          ],
        ])}
      </UnorderedList>
    </Tile>
  );
};

export default PatrioticEagle;
