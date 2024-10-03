import { Text } from "@chakra-ui/react";
import { canEquip, haveEquipped, myPath } from "kolmafia";
import { $effect, $item, $path, $skill, clamp, get, have } from "libram";
import React from "react";

import { remoteCliExecute } from "../../../api/util";
import AsyncButton from "../../../components/AsyncButton";
import AsyncLink from "../../../components/AsyncLink";
import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const JurassicParka: React.FC = () => {
  const jurassicParka = $item`Jurassic Parka`;
  const haveParka = haveUnrestricted(jurassicParka);
  const parkaMode = get("parkaMode");
  const spikolodonSpikesLeft = clamp(5 - get("_spikolodonSpikeUses"), 0, 5);

  const parkaEquipped = haveEquipped(jurassicParka);
  const canEquipParka = canEquip(jurassicParka);
  const haveELY = have($effect`Everything Looks Yellow`);
  const haveFondeluge = have($skill`Fondeluge`);
  const inCs = myPath() === $path`Community Service`;

  useNag(
    () => ({
      id: "jurassic-parka-nag",
      priority: NagPriority.MID,
      node: haveParka &&
        canEquipParka &&
        !inCs &&
        !haveELY &&
        !haveFondeluge && (
          <Tile
            linkedContent={jurassicParka}
            extraLinks={
              parkaMode === "dilophosaur" ? null : (
                <AsyncButton
                  onClick={async () => {
                    await remoteCliExecute("parka dilophosaur");
                  }}
                >
                  diloph
                </AsyncButton>
              )
            }
          >
            {!parkaEquipped && (
              <Line color="red.500">Equip your Jurassic Parka!</Line>
            )}
            {parkaEquipped && <Line color="orange.500">Parka equipped.</Line>}
            {parkaMode !== "dilophosaur" && (
              <Line>
                <AsyncLink
                  color="red.500"
                  onClick={async () => {
                    await remoteCliExecute("parka dilophosaur");
                  }}
                >
                  Change your parka to dilophosaur mode!
                </AsyncLink>
              </Line>
            )}
            {parkaMode === "dilophosaur" && (
              <Line color="orange.500">Dilophosaur mode enabled.</Line>
            )}
            <Line>Parka yellow ray is ready; spit some acid!</Line>
          </Tile>
        ),
    }),
    [
      haveParka,
      canEquipParka,
      inCs,
      haveELY,
      haveFondeluge,
      jurassicParka,
      parkaEquipped,
      parkaMode,
    ],
  );

  if (!haveParka || !canEquipParka) {
    return null;
  }

  const parkaEnchantment = (() => {
    switch (parkaMode) {
      case "kachungasaur":
        return "+100% HP, +50% meat, +2 Cold res.";
      case "dilophosaur":
        return "+20 Sleaze and Sleaze Spell, +2 Stench res, YR free kill.";
      case "spikolodon":
        return "+ML, +2 Sleaze res, NC forcing ability.";
      case "ghostasaurus":
        return "+10 DR, +50 MP, +2 Spooky res.";
      case "pterodactyl":
        return "-5% Combat, +50% Initiative, +2 Hot res.";
      default:
        return "";
    }
  })();

  return (
    <Tile linkedContent={jurassicParka}>
      <Line>
        <Text as="b">Current enchantment: </Text>
        {parkaMode}
      </Line>
      <Line color="blue.500">{parkaEnchantment}</Line>
      {spikolodonSpikesLeft > 0 && (
        <Line>
          <Text as="b">{spikolodonSpikesLeft}</Text> spikolodon spikes
          available.
        </Line>
      )}
    </Tile>
  );
};

export default JurassicParka;
