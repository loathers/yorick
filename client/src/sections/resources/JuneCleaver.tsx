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
    desc: "150 moxie / 250 muscle / 30 turns Ashamed",
  },
  {
    choice: 1468,
    name: "Bath Time",
    desc: "150 muscle, gob of wet hair / 30 turns Wholesomely Resolved / 30 turns Kinda Damp",
  },
  {
    choice: 1469,
    name: "Beware of Aligator",
    desc: "30 turns Yapping Pal / Dad's Brandy / 1500 meat",
  },
  {
    choice: 1470,
    name: "Delicious Sprouts",
    desc: "250 mysticality / guilty sprout / 250 muscle",
  },
  {
    choice: 1471,
    name: "Hypnotic Master",
    desc: "mother's necklace / 250 muscle / 30 turns of 2-5 random effects",
  },
  {
    choice: 1472,
    name: "Lost and Found",
    desc: "savings bond / beaten up, 100 muscle, 250 meat / 250 mysticality",
  },
  {
    choice: 1473,
    name: "Poetic Justice",
    desc: "250 moxie / 125 mysticality / beaten up, 5 adventures",
  },
  {
    choice: 1474,
    name: "Summer Days",
    desc: "tramples ticket stub / fire-roasted lake trout / 250 moxie",
  },
  {
    choice: 1475,
    name: "Teacher's Pet",
    desc: "30 turns Teacher's Pet / teacher's pen / 125 muscle",
  },
];

const availableChoices = choiceMap
  .filter((entry) => !cleaverQueue.includes(entry.choice))
  .map((choice) => {
    return (
      <ListItem>
        <AdviceTooltip text={choice.desc} label={choice.name} />
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
