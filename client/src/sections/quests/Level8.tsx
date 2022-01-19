import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import useCall from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import useNumericModifier from "../../hooks/useNumericModifier";
import { atStep, Step, useQuestStep } from "../../hooks/useQuest";
import { $item } from "../../util/makeValue";
import { commaAnd, commaOr, plural, truthy } from "../../util/text";
import useFaxLikes from "../../util/useFaxLikes";

const Level8: React.FC = () => {
  const step = useQuestStep("questL08Trapper");

  const goatCheese = useCall.itemAmount($item`goat cheese`) ?? 0;
  const oreType = useGet("trapperOre", "none");
  const ore = useCall.itemAmount($item`${oreType}`) ?? 0;
  const faxLikes = useFaxLikes();

  const rope = useHave($item`ninja rope`);
  const crampons = useHave($item`ninja crampons`);
  const carabiner = useHave($item`ninja carabiner`);
  const ninjaCount = (rope ? 1 : 0) + (crampons ? 1 : 0) + (carabiner ? 1 : 0);

  const coldRes = useNumericModifier("Cold Resistance") ?? 0;

  const yetiCount = useCall.toLocation("Mist-Shrouded Peak")?.turnsSpent ?? 0;

  if (step === Step.FINISHED) return <></>;

  // TODO: Find image URL.
  return (
    <QuestTile
      header="Trapper"
      // TODO: double check these links are right...
      href={atStep(step, [
        [Step.UNSTARTED, "/council.php"],
        [Step.STARTED, "/place.php?whichplace=mclargehuge_trapper"],
        [1, undefined],
        [2, "/place.php?whichplace=mclargehuge_trapper"],
        [4, "/place.php?whichplace=mclargehuge_trapper"],
        [Step.FINISHED, undefined],
      ])}
      minLevel={8}
    >
      {atStep(step, [
        [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
        [Step.STARTED, <Line>Visit the Trapper to get your assignment.</Line>],
        [
          1,
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
          </>,
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
                  rope && "ninja rope",
                  crampons && "ninja crampons",
                  carabiner && "ninja carabiner",
                ])
              )}
              .
            </Line>
          ) : (
            <Line>
              {coldRes >= 5
                ? "Climb"
                : `Get 5 cold resistance (+${5 - coldRes}) and climb`}{" "}
              the Icy Peak.
            </Line>
          ),
        ],
        [
          4,
          <Line>
            {coldRes >= 5
              ? "Fight"
              : `Get 5 cold resistance (+${5 - coldRes}) and fight`}{" "}
            {yetiCount < 3 ? `${3 - yetiCount} yetis and Groar` : "Groar"}
          </Line>,
        ],
        [5, <Line>Return fur to the Trapper.</Line>],
      ])}
    </QuestTile>
  );
};

export default Level8;
