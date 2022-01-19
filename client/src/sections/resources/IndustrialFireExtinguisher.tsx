import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useHave from "../../hooks/useHave";
import useGet from "../../hooks/useGet";
import { Step, useQuestStep } from "../../hooks/useQuest";
import { $item } from "../../util/makeValue";

const IndustrialFireExtinguisher = () => {
  const foam = useGet("_fireExtinguisherCharge");

  const knobUnfinished = useQuestStep("questL05Goblin") < Step.FINISHED;
  const knobUnused = !useGet("fireExtinguisherHaremUsed");
  const hasPants = useHave($item`Knob Goblin harem pants`);
  const hasVeil = useHave($item`Knob Goblin harem veil`);
  const canVisitTheThrone = hasPants && hasVeil;
  const showKnob =
    useQuestStep("questL05Goblin") > Step.UNSTARTED &&
    !canVisitTheThrone &&
    knobUnused &&
    knobUnfinished;

  const bridgeUnfinished = useQuestStep("questL09Topping") < 1;
  const blechUnused = !useGet("fireExtinguisherChasmUsed");
  const showBlech =
    useQuestStep("questL09Topping") > Step.UNSTARTED &&
    bridgeUnfinished &&
    blechUnused;

  const batwallsUnfinished = useQuestStep("questL04Bat") < 3;
  const batUnused = !useGet("fireExtinguisherBatHoleUsed");
  const showBat =
    useQuestStep("questL04Bat") > Step.UNSTARTED &&
    batwallsUnfinished &&
    batUnused;

  const bonerUnready = [
    useGet("cyrptAlcoveEvilness"),
    useGet("cyrptCrannyEvilness"),
    useGet("cyrptNicheEvilness"),
    useGet("cyrptNookEvilness"),
  ].some((evilness) => evilness > 25);
  const cyrptUnused = !useGet("fireExtinguisherCyrptUsed");
  const showCyrpt =
    useQuestStep("questL07Cyrptic") > Step.UNSTARTED &&
    bonerUnready &&
    cyrptUnused;

  const desertIncomplete = useGet("desertExploration") < 100;
  const desertUnused = !useGet("fireExtinguisherDesertUsed");
  const showDesert =
    useQuestStep("questL11Desert") > Step.UNSTARTED &&
    desertIncomplete &&
    desertUnused;

  if (!useHave($item`industrial fire extinguisher`) || foam <= 0) return <></>;

  return (
    <Tile
      header="Industrial Fire Extinguisher"
      imageUrl="/images/itemimages/exting2.gif"
    >
      <Line>
        Remaining foam: {foam}. That's a total of {Math.min(foam / 10)} polar
        vortices.
      </Line>
      {showBat && (
        <Line>
          You can use Constricted Blast to blown down a wall in the Bat Hole
        </Line>
      )}
      {showKnob && (
        <Line>You can use Foam the Place to obtain the Knob Harem Outfit</Line>
      )}
      {showCyrpt && (
        <Line>
          You can use Replace the Chill to undefile a zone by 10 evil.
        </Line>
      )}
      {showBlech && (
        <Line>You can use Cool it Down to advance your Blech House timer.</Line>
      )}
      {showDesert && (
        <Line>You can use Take a Drink to get 15 turns of Ultrahydrated.</Line>
      )}
    </Tile>
  );
};

export default IndustrialFireExtinguisher;
