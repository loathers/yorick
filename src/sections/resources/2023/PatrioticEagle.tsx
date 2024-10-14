import { Heading, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import {
  canAdventure,
  canEquip,
  myFamiliar,
  myLocation,
  myPath,
  Phylum,
} from "kolmafia";
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

const PLEDGE_ZONES: readonly {
  effect: string;
  locations: [string, string][];
}[] = [
  {
    effect: "+30% item",
    locations: [
      ["Haunted Library", "The Haunted Library"],
      ["Haunted Laundry Room", "The Haunted Laundry Room"],
      ["Whitey's Grove", "Whitey's Grove"],
    ],
  },
  {
    effect: "+50% meat",
    locations: [
      ["Ninja Snowmen Lair", "Lair of the Ninja Snowmen"],
      ["Hidden Hospital", "The Hidden Hospital"],
      ["Haunted Bathroom", "The Haunted Bathroom"],
      ["the Oasis", "The Oasis"],
    ],
  },
  {
    effect: "+100% init",
    locations: [
      ["Haunted Kitchen", "The Haunted Kitchen"],
      ["Oil Peak", "Oil Peak"],
      ["Oliver's Tavern", "An Unusually Quiet Barroom Brawl"],
    ],
  },
];

const PatrioticEagle = () => {
  const patrioticEagle = $familiar`Patriotic Eagle`;
  const haveEagle = haveUnrestricted(patrioticEagle);
  const withEagle = myFamiliar() === patrioticEagle;
  const rwbMonster = get("rwbMonster");
  const fightsLeft = Math.max(0, Math.min(get("rwbMonsterCount"), 2));
  const screechRecharge = get("screechCombats");
  const eaglePhylumBanished = Phylum.get(get("banishedPhyla").split(":")[1]);
  const citizenOfAZone = $effect`Citizen of a Zone`;
  const haveCitizen = have(citizenOfAZone);
  const canUseCitizen =
    !haveCitizen && canEquip(patrioticEagle) && myPath() !== $path`Avant Guard`;
  const location = myLocation();
  const pledgeZone = PLEDGE_ZONES.map(({ effect, locations }) => ({
    effect,
    location: locations.find(([, name]) => name === location.identifierString),
  })).find(({ location }) => location !== undefined);
  const pledgeZoneEffect = pledgeZone?.effect;
  const pledgeZoneName = pledgeZone?.location?.[0];

  useNag(
    () => ({
      id: "patriotic-eagle-pledge-nag",
      priority: NagPriority.HIGH,
      node: haveEagle &&
        canUseCitizen &&
        pledgeZoneEffect &&
        pledgeZoneName && (
          <Tile
            header="Pledge to a zone!"
            imageUrl="/images/itemimages/flag1.gif"
            linkedContent={patrioticEagle}
          >
            {!withEagle && <Line>Take your Patriotic Eagle with you.</Line>}
            <Line>
              Pledge allegiance to <Text as="b">{pledgeZoneName}</Text> for{" "}
              {pledgeZoneEffect}.
            </Line>
          </Tile>
        ),
    }),
    [
      canUseCitizen,
      haveEagle,
      patrioticEagle,
      pledgeZoneEffect,
      pledgeZoneName,
      withEagle,
    ],
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
  ): ReactNode =>
    locations.some(([, loc]) => canAdventure($location`${loc}`)) && (
      <Line key={effect}>
        <Text as="b">{effect}:</Text>{" "}
        {locations
          .filter(([, loc]) => canAdventure($location`${loc}`))
          .map(([name]) => name)
          .join(", ")}
      </Line>
    );

  const pledgeZones = PLEDGE_ZONES.map(({ effect, locations }) =>
    generatePledgeZones(locations, effect),
  );

  const generatePhylumOptions = (
    phylum: string,
    options: [string, string, boolean][],
  ): ReactNode =>
    options.some(
      ([, loc, useful]) => canAdventure($location`${loc}`) && useful,
    ) && (
      <ListItem key={phylum}>
        <Text as="b">{phylum}:</Text>{" "}
        {options
          .filter(
            ([, loc, useful]) => canAdventure($location`${loc}`) && useful,
          )
          .map(([name]) => name)
          .join(", ")}
      </ListItem>
    );

  const phylumOptions = [
    generatePhylumOptions("Dude", [
      [
        "Black Forest (2/5)",
        "The Black Forest",
        questStep("questL11Black") < 2,
      ],
      ["Twin Peak (5/8)", "Twin Peak", get("twinPeakProgress") < 15],
      ["Whitey's Grove (1/4)", "Whitey's Grove", true],
    ]),
    generatePhylumOptions("Beast", [
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
    ]),
    generatePhylumOptions("Construct", [
      ["Whitey's Grove (1/4)", "Whitey's Grove", true],
      [
        "Airship (1/7)",
        "The Penultimate Fantasy Airship",
        questStep("questL10Garbage") < 7,
      ],
    ]),
    generatePhylumOptions("Undead", [
      [
        "Haunted Library (1/3)",
        "The Haunted Library",
        get("writingDesksDefeated") < 5,
      ],
      ["Red Zeppelin (1/5)", "The Red Zeppelin", questStep("questL11Ron") < 4],
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
    ]),
  ];

  const showRwb = rwbMonster && rwbMonster !== $monster`none` && fightsLeft > 0;
  const showPhylum = phylumOptions.some((node) => node);
  const showPledge = !have(citizenOfAZone) && pledgeZones.some((node) => node);

  if (!showRwb && !showPhylum && !showPledge) return null;

  return (
    <Tile linkedContent={patrioticEagle}>
      {showRwb && (
        <>
          <Heading as="h4" size="xs">
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
      {showPhylum && (
        <>
          <Heading as="h4" size="xs">
            {screechRecharge > 0 ? (
              `${screechRecharge} combats (or freeruns) until your Patriotic Eagle can screech again.`
            ) : (
              <>
                Patriotic Eagle can screech and banish an entire phylum!{" "}
                {screechRecharge === 0 && (
                  <>
                    <Text as="span" color="red.500">
                      SCREEEE
                    </Text>
                    <Text as="span" color="gray.500">
                      EEEEE
                    </Text>
                    <Text as="span" color="blue.500">
                      EEEEE!
                    </Text>
                  </>
                )}
              </>
            )}
          </Heading>
          <UnorderedList>{phylumOptions}</UnorderedList>
        </>
      )}
      {showPledge && (
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
          {pledgeZones}
        </>
      )}
    </Tile>
  );
};

export default PatrioticEagle;
