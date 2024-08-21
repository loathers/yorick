import { $item, $location, get, have, questStep } from "libram";
import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { atStep, Step } from "../../util/quest";
import { itemAmount, numericModifier, toItem } from "../../kolmafia/functions";
import { commaAnd, commaOr, plural, truthy } from "../../util/text";
import useFaxLikes from "../../util/useFaxLikes";

const TRAPPER_URL = "/place.php?whichplace=mclargehuge&action=trappercabin";

const Level8: React.FC = () => {
  const step = questStep("questL08Trapper");

  const goatCheese = itemAmount($item`goat cheese`);
  const oreType = get("trapperOre", "none");
  const ore = oreType !== "none" ? itemAmount(toItem(oreType)) : 0;
  const faxLikes = useFaxLikes();

  const rope = have($item`ninja rope`);
  const crampons = have($item`ninja crampons`);
  const carabiner = have($item`ninja carabiner`);
  const ninjaCount = (rope ? 1 : 0) + (crampons ? 1 : 0) + (carabiner ? 1 : 0);

  const coldRes = numericModifier("Cold Resistance");

  const yetiCount = $location`Mist-Shrouded Peak`.turnsSpent;

  // TODO: Find image URL.
  return (
    <QuestTile
      header="Trapper"
      imageUrl={atStep(step, [
        [Step.STARTED, "/images/otherimages/thetrapper.gif"],
      ])}
      // TODO: double check these links are right...
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, TRAPPER_URL],
        [1, undefined],
        [2, "/place.php?whichplace=mclargehuge"],
        [4, "/place.php?whichplace=mclargehuge"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={8}
      hide={step === Step.FINISHED}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [Step.STARTED, <Line>Visit the Trapper to get your assignment.</Line>],
        [
          1,

          goatCheese < 3 || ore < 3 ? (
            <>
              <Line href="/place.php?whichplace=mclargehuge">
                Acquire{" "}
                {commaAnd(
                  truthy([
                    goatCheese < 3 && `${3 - goatCheese} goat cheese`,
                    ore < 3 && `${3 - ore} ${oreType}`,
                  ])
                )}
                .
              </Line>
              {ore < 3 && faxLikes.length > 0 && (
                <Line>Could use {commaOr(faxLikes)} for a mountain man.</Line>
              )}
            </>
          ) : (
            <Line href={TRAPPER_URL}>Return to the trapper</Line>
          ),
        ],
        [
          2,
          ninjaCount < 3 ? (
            <Line>
              Stack +combat and adventure for{" "}
              {plural(
                3 - ninjaCount,
                "ninja snowman assassin",
                "ninja snowmen assassins"
              )}
              . Need{" "}
              {commaAnd(
                truthy([
                  !rope && "ninja rope",
                  !crampons && "ninja crampons",
                  !carabiner && "ninja carabiner",
                ])
              )}
              .
            </Line>
          ) : (
            <Line>
              {coldRes >= 5
                ? "Climb "
                : `Get 5 cold resistance (+${5 - coldRes}) and climb `}
              the Icy Peak.
            </Line>
          ),
        ],
        [
          3,
          <Line>
            {coldRes >= 5
              ? "Fight "
              : `Get 5 cold resistance (+${5 - coldRes}) and fight `}
            {yetiCount < 3 ? `${3 - yetiCount} yetis and Groar` : "Groar"}
          </Line>,
        ],
        [5, <Line>Return fur to the Trapper.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level8;
