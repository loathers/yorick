import { ListItem } from "@chakra-ui/react";
import BulletedList from "../../components/BulletedList";
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
      linkedContent={$item`industrial fire extinguisher`}
      hide={!useHave($item`industrial fire extinguisher`) || foam <= 0}
    >
      <Line>
        {`${foam} foam (${Math.floor(foam / 10)} polar
        vortices).`}
      </Line>
      {foam >= 20 && (
        <BulletedList>
          {showBat && (
            <ListItem>
              <b>Constricted Blast</b>: Unlock a Bat Hole chamber.
            </ListItem>
          )}
          {showKnob && (
            <ListItem>
              <b>Foam the Place</b>: Obtain the Knob Harem Outfit.
            </ListItem>
          )}
          {showCyrpt && (
            <ListItem>
              <b>Replace the Chill</b>: Reduce evil by 10 in a zone.
            </ListItem>
          )}
          {showBlech && (
            <ListItem>
              <b>Cool it Down</b>: 73% Blech House progress.
            </ListItem>
          )}
          {showDesert && (
            <ListItem>
              <b>Take a Drink</b>: 15 turns of Ultrahydrated.
            </ListItem>
          )}
        </BulletedList>
      )}
    </Tile>
  );
};

export default IndustrialFireExtinguisher;
