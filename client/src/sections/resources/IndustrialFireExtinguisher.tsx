import { ListItem } from "@chakra-ui/react";
import { $item, get, have, questStep } from "libram";

import BulletedList from "../../components/BulletedList";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { haveUnrestricted } from "../../util/available";
import { Step } from "../../util/quest";

const IndustrialFireExtinguisher = () => {
  const foam = get("_fireExtinguisherCharge");

  const knobUnfinished = questStep("questL05Goblin") < Step.FINISHED;
  const knobUnused = !get("fireExtinguisherHaremUsed");
  const hasPants = have($item`Knob Goblin harem pants`);
  const hasVeil = have($item`Knob Goblin harem veil`);
  const canVisitTheThrone = hasPants && hasVeil;
  const showKnob =
    questStep("questL05Goblin") > Step.UNSTARTED &&
    !canVisitTheThrone &&
    knobUnused &&
    knobUnfinished;

  const bridgeUnfinished = questStep("questL09Topping") < 1;
  const blechUnused = !get("fireExtinguisherChasmUsed");
  const showBlech =
    questStep("questL09Topping") > Step.UNSTARTED &&
    bridgeUnfinished &&
    blechUnused;

  const batwallsUnfinished = questStep("questL04Bat") < 3;
  const batUnused = !get("fireExtinguisherBatHoleUsed");
  const showBat =
    questStep("questL04Bat") > Step.UNSTARTED &&
    batwallsUnfinished &&
    batUnused;

  const bonerUnready = [
    get("cyrptAlcoveEvilness"),
    get("cyrptCrannyEvilness"),
    get("cyrptNicheEvilness"),
    get("cyrptNookEvilness"),
  ].some((evilness) => evilness > 25);
  const cyrptUnused = !get("fireExtinguisherCyrptUsed");
  const showCyrpt =
    questStep("questL07Cyrptic") > Step.UNSTARTED &&
    bonerUnready &&
    cyrptUnused;

  const desertIncomplete = get("desertExploration") < 100;
  const desertUnused = !get("fireExtinguisherDesertUsed");
  const showDesert =
    questStep("questL11Desert") > Step.UNSTARTED &&
    desertIncomplete &&
    desertUnused;

  return (
    <Tile
      header="Industrial Fire Extinguisher"
      imageUrl="/images/itemimages/exting2.gif"
      linkedContent={$item`industrial fire extinguisher`}
      hide={!haveUnrestricted($item`industrial fire extinguisher`) || foam <= 0}
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
