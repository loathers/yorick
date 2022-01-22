import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
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

  return (
    <Tile
      header="Industrial Fire Extinguisher"
      imageUrl="/images/itemimages/exting2.gif"
      hide={!useHave($item`industrial fire extinguisher`) || foam <= 0}
    >
      <Line>
        {`${foam} foam (${Math.floor(foam / 10)} polar
        vortices).`}
      </Line>
      {foam >= 20 && (
        <>
          {showBat && (
            <Line>
              Use Constricted Blast to blown down a wall in the Bat Hole.
            </Line>
          )}
          {showKnob && (
            <Line>Use Foam the Place to obtain the Knob Harem Outfit.</Line>
          )}
          {showCyrpt && (
            <Line>Use Replace the Chill to undefile a zone by 10 evil.</Line>
          )}
          {showBlech && (
            <Line>Use Cool it Down to advance your Blech House timer.</Line>
          )}
          {showDesert && (
            <Line>Use Take a Drink for 15 turns of Ultrahydrated.</Line>
          )}
        </>
      )}
    </Tile>
  );
};

export default IndustrialFireExtinguisher;
