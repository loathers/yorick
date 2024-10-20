import { Item, Location, Monster, myDaycount, myPath } from "kolmafia";
import {
  $effect,
  $item,
  $location,
  $monster,
  $path,
  get,
  have,
  questStep,
} from "libram";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";
import { AdviceTooltipIcon } from "../../../components/Tooltips";
import { inventoryLink, parentPlaceLink } from "../../../util/links";
import { atStep, questFinished, Step } from "../../../util/quest";
import { commaList } from "../../../util/text";

type Snake = {
  monster: Monster;
  locations: Location[];
  item: string;
};

const BATSNAKE: Snake = {
  monster: $monster`Batsnake`,
  locations: [$location`The Batrat and Ratbat Burrow`],
  item: "The Stankara Stone",
};

const FROZEN_SOLID_SNAKE = {
  monster: $monster`Frozen Solid Snake`,
  locations: [$location`Lair of the Ninja Snowmen`],
  item: "The First Pizza",
};

const BURNING_SNAKE_OF_FIRE = {
  monster: $monster`Burning Snake of Fire`,
  locations: [$location`The Castle in the Clouds in the Sky (Top Floor)`],
  item: "Murphy's Rancid Black Flag",
};

const SNAKE_WITH_LIKE_TEN_HEADS = {
  monster: $monster`The Snake With Like Ten Heads`,
  locations: [$location`The Hole in the Sky`],
  item: "The Eye of the Stars",
};

const FRATTLESNAKE = {
  monster: $monster`The Frattlesnake`,
  locations: [$location`The Smut Orc Logging Camp`],
  item: "The Lacrosse Stick of Lacoronado",
};

const SNAKELETON = {
  monster: $monster`Snakeleton`,
  locations: [
    $location`The Unquiet Garves`,
    $location`The VERY Unquiet Garves`,
  ],
  item: "The Shield of Brook",
};

const shenDays: Snake[][] = [
  [BATSNAKE, FROZEN_SOLID_SNAKE, BURNING_SNAKE_OF_FIRE],
  [FRATTLESNAKE, SNAKELETON, SNAKE_WITH_LIKE_TEN_HEADS],
  [FROZEN_SOLID_SNAKE, BATSNAKE, SNAKELETON],
  [FRATTLESNAKE, BATSNAKE, SNAKELETON],
  [BURNING_SNAKE_OF_FIRE, FRATTLESNAKE, SNAKE_WITH_LIKE_TEN_HEADS],
  [BURNING_SNAKE_OF_FIRE, BATSNAKE, SNAKE_WITH_LIKE_TEN_HEADS],
  [FRATTLESNAKE, SNAKELETON, SNAKE_WITH_LIKE_TEN_HEADS],
  [SNAKELETON, BURNING_SNAKE_OF_FIRE, FRATTLESNAKE],
  [SNAKELETON, FRATTLESNAKE, SNAKE_WITH_LIKE_TEN_HEADS],
  [SNAKE_WITH_LIKE_TEN_HEADS, BATSNAKE, BURNING_SNAKE_OF_FIRE],
  [FROZEN_SOLID_SNAKE, BATSNAKE, BURNING_SNAKE_OF_FIRE],
];

const Copperhead = () => {
  const step = questStep("questL11Shen");
  const initiationDay = get("shenInitiationDay");
  const questItem = get("shenQuestItem");

  const dayData = shenDays[(initiationDay - 1) % shenDays.length];
  const currentSnake = dayData?.find((s) => s.item === questItem);
  if (step === Step.FINISHED) {
    return null;
  }

  const { locations, item } = currentSnake ?? {};

  const copperhead = $location`The Copperhead Club`;
  const copperheadTurns = copperhead.turnsSpent;

  const shenMeetings =
    atStep(step, [
      [1, 1],
      [3, 2],
      [5, 3],
    ]) ?? 0;
  const turnsUntilMeeting = (shenMeetings + 1) * 5 - copperheadTurns;

  const disguised = have($effect`Crappily Disguised as a Waiter`);
  const couldUseDisguise =
    !disguised &&
    have($item`crappy waiter disguise`) &&
    myPath() !== $path`Two Crazy Random Summer`;

  if (step === Step.FINISHED) return null;

  return (
    <QuestTile
      header="Beat Shen Copperhead"
      minLevel={11}
      imageUrl="/images/itemimages/scharm2.gif"
      imageAlt="Shen Copperhead"
      disabled={!questFinished("questL11Black")}
    >
      {atStep(step, [
        [
          Step.STARTED,
          <>
            <Line href={parentPlaceLink(copperhead)}>
              Go meet Shen in the Copperhead Club.
            </Line>
            <Line>
              If you meet him today, you will have to go to{" "}
              {commaList(
                (shenDays[(myDaycount() - 1) % shenDays.length] ?? []).map(
                  (snake) => snake.locations[0].identifierString,
                ),
                "and",
              )}
              .
            </Line>
          </>,
        ],
        [
          1,
          <>
            <Line href={locations ? parentPlaceLink(locations[0]) : undefined}>
              Adventure in{" "}
              {locations?.map((l) => l.identifierString).join(" or ")} to find{" "}
              {item}.
            </Line>
            {copperheadTurns < 14 && (
              <Line href={parentPlaceLink(copperhead)}>
                Or work on burning {14 - (3 - shenMeetings) - copperheadTurns}{" "}
                turns of delay in the Copperhead Club.{" "}
                <AdviceTooltipIcon text="This delay count does not include the meetings with Shen." />
              </Line>
            )}
            {copperheadTurns === 14 && shenMeetings === 3 && (
              <Line
                href={
                  couldUseDisguise
                    ? inventoryLink($item`crappy waiter disguise`)
                    : parentPlaceLink(copperhead)
                }
              >
                50% chance of meeting Shen this turn.
                {couldUseDisguise &&
                  "Use a crappy waiter disguise for 25% chance of a turn saved."}
              </Line>
            )}
            {turnsUntilMeeting <= 0 && (!item || have(Item.get(item))) && (
              <Line href={parentPlaceLink(copperhead)}>
                Meet Shen next turn{" "}
                {shenMeetings === 3
                  ? "(last meeting)"
                  : `(meeting ${shenMeetings + 1})`}
                .
              </Line>
            )}
          </>,
        ],
      ])}
    </QuestTile>
  );
};

export default Copperhead;
