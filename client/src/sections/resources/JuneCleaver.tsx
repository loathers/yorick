import { $item, get, have } from "libram";
import { List, ListItem } from "@chakra-ui/react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { AdviceTooltip } from "../../components/Tooltips";

const fightsLeft = get(`_juneCleaverFightsLeft`);
const cleaverQueue = get(`juneCleaverQueue`)
  .split(`,`)
  .map((value) => parseInt(value));
const skipsRemaining = 5 - parseInt(get(`_juneCleaverSkips`));
const choiceMap = [
  {
    choice: 1467,
    name: "Aunts not Ants",
    desc: "150 moxie substats|250 muscle substats|30 turns of Ashamed (+10 substats/fight, -20% Mus/Mys/Mox)",
  },
  {
    choice: 1468,
    name: "Bath Time",
    desc: "150 muscle substats, gob of wet hair|30 turns of Wholesomely Resolved (15 DR, +2 spooky/stench/sleaze res)|30 turns of Kinda Damp (+3 hot res, +50% init)",
  },
  {
    choice: 1469,
    name: "Beware of Aligator",
    desc: "30 turns of Yapping Pal (+20 ML)|Dad's Brandy (size 1 awesome booze)|1500 meat",
  },
  {
    choice: 1470,
    name: "Delicious Sprouts",
    desc: "250 mysticality substats|guilty sprout (size 1 food, red rocket for big stats)|250 muscle substats",
  },
  {
    choice: 1471,
    name: "Hypnotic Master",
    desc: "mother's necklace (+3 adv per day, never fumble, 5 free rests)|250 muscle substats|30 turns of of 2-5 random effects",
  },
  {
    choice: 1472,
    name: "Lost and Found",
    desc: "savings bond (potion, 30 turns of +50% meat)|3 turns of beaten up, 100 muscle substats, 250 meat|250 mysticality substats",
  },
  {
    choice: 1473,
    name: "Poetic Justice",
    desc: "250 moxie substats|125 mysticality substats|5 turns of beaten up, 5 adventures",
  },
  {
    choice: 1474,
    name: "Summer Days",
    desc: "trampled ticket stub (potion, 30 turns of 5% -com)|fire-roasted lake trout (size 1 good food, 50 turns of +3 cold res, +15 hot damage)|250 moxie substats",
  },
  {
    choice: 1475,
    name: "Teacher's Pet",
    desc: "30 turns of Teacher's Pet (+2 sleaze res, 50 DA, 5 DR)|teacher's pen (acc, +3 substats/fight, +2 fam exp)|125 muscle substats",
  },
];

const availableChoices = choiceMap
  .filter((entry) => !cleaverQueue.includes(entry.choice))
  .map((choice) => {
    return (
      <ListItem pl="3">
        <AdviceTooltip
          text={
            <>
              <Line fontWeight="bold">Choices:</Line>
              <List as="ol" styleType="decimal" pl="3.5">
                {choice.desc.split("|").map((desc) => {
                  return <ListItem>{desc}</ListItem>;
                })}
              </List>
            </>
          }
          label={choice.name}
        />
      </ListItem>
    );
  });

const JuneCleaver = () => {
  return (
    <Tile
      header="June cleaver"
      imageUrl="/images/itemimages/junecleaver.gif"
      linkedContent={$item`June cleaver`}
      hide={!have($item`June cleaver`)}
    >
      <Line>
        {fightsLeft} {parseInt(fightsLeft) === 1 ? "combat" : "combats"} until
        the next June cleaver NC.
      </Line>
      {skipsRemaining > 0 && (
        <Line>
          You can skip {skipsRemaining} more cleaver{" "}
          {skipsRemaining > 1 ? "NCs" : "NC"} today.
        </Line>
      )}
      <Line>Possible upcoming NCs:</Line>
      <List>{availableChoices}</List>
    </Tile>
  );
};

export default JuneCleaver;
