import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import {
  haveEquipped,
  inebrietyLimit,
  itemAmount,
  myInebriety,
} from "kolmafia";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const TinyStillsuit = () => {
  const tinyStillsuit = $item`tiny stillsuit`;
  const haveStillsuit = haveUnrestricted(tinyStillsuit);
  const haveStillsuitEquipped = haveEquipped(tinyStillsuit);
  const haveStillsuitInInventory = itemAmount(tinyStillsuit) > 0;
  const familiarSweat = get("familiarSweat");
  const sweatAdvs = Math.round(Math.pow(familiarSweat, 0.4));

  const getSweatCalcSweat = (sweat: number) => {
    if (sweat >= 358) return 449;
    if (sweat >= 279) return 358;
    if (sweat >= 211) return 279;
    if (sweat >= 155) return 211;
    if (sweat >= 108) return 155;
    if (sweat >= 71) return 108;
    if (sweat >= 43) return 71;
    if (sweat >= 23) return 43;
    if (sweat >= 10) return 23;
    return 10;
  };

  const sweatCalcSweat = getSweatCalcSweat(familiarSweat);
  const canGuzzleSweat = myInebriety() < inebrietyLimit();

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveStillsuit && canGuzzleSweat && sweatAdvs >= 8 && (
        <Tile
          header={`${sweatAdvs} adv stillsuit sweat booze`}
          imageUrl="/images/itemimages/stillsuit.gif"
        >
          {familiarSweat > 449 ? (
            <>
              <Line>
                <Text as="b" color="red.500">
                  {sweatAdvs}
                </Text>{" "}
                advs when guzzling now (costs 1 liver).
              </Line>
              <Line>You should probably guzzle your sweat now.</Line>
            </>
          ) : (
            <Line>
              <Text as="b">
                {familiarSweat}/{sweatCalcSweat}
              </Text>{" "}
              drams of stillsuit sweat for next adventure (
              {Math.ceil((sweatCalcSweat - familiarSweat) / 3)} combats on
              current familiar).
            </Line>
          )}
          {haveStillsuitEquipped && (
            <Line color="purple.500">
              Currently collecting sweat from current familiar!
            </Line>
          )}
          {!haveStillsuitEquipped && haveStillsuitInInventory && (
            <Line color="red.500">
              Not collecting sweat from any familiar right now.
            </Line>
          )}
          {!haveStillsuitEquipped && !haveStillsuitInInventory && (
            <Line color="fuchsia.500">
              Currently collecting sweat on a different familiar!
            </Line>
          )}
        </Tile>
      ),
    }),
    [
      canGuzzleSweat,
      familiarSweat,
      haveStillsuit,
      haveStillsuitEquipped,
      haveStillsuitInInventory,
      sweatAdvs,
      sweatCalcSweat,
    ],
  );

  const advDramsTable: Record<number, number> = {
    3: 10,
    4: 23,
    5: 43,
    6: 71,
    7: 108,
    8: 155,
    9: 211,
    10: 279,
    11: 358,
    12: 449,
    13: 553,
    14: 670,
    15: 801,
    16: 946,
    17: 1106,
    18: 1282,
  };

  return (
    <Tile
      header={`${familiarSweat}/${sweatCalcSweat} drams of stillsuit sweat`}
      imageUrl="/images/itemimages/stillsuit.gif"
      href="/inventory.php?action=distill"
      hide={!haveUnrestricted(tinyStillsuit)}
    >
      <Line>Two gross tastes that taste horrible together.</Line>
      {familiarSweat > 358 ? (
        <>
          <Line>
            <Text as="b">11</Text> advs when guzzling now (costs 1 liver).
          </Line>
          <Line>You should probably guzzle your sweat now.</Line>
        </>
      ) : familiarSweat > 10 ? (
        <>
          <Line>
            <Text as="b">{sweatAdvs}</Text> advs when guzzling now (costs 1
            liver).
          </Line>
          <Line>
            <Text as="b">{sweatCalcSweat - familiarSweat}</Text> more sweat
            until +1 more adventure. (
            {Math.ceil((sweatCalcSweat - familiarSweat) / 3)} combats on current
            familiar)
          </Line>
        </>
      ) : (
        <>
          <Line color="red.500">Not enough sweat to guzzle.</Line>
          <Line>
            <Text as="b">{sweatCalcSweat - familiarSweat}</Text> more sweat
            until +1 more adventure. (
            {Math.ceil((sweatCalcSweat - familiarSweat) / 3)} combats on current
            familiar)
          </Line>
        </>
      )}
      {haveStillsuitEquipped && (
        <Line color="purple.500">
          Currently collecting sweat from current familiar!
        </Line>
      )}
      {haveStillsuitInInventory && (
        <Line color="red.500">
          Not collecting sweat from any familiar right now.
        </Line>
      )}
      {!haveStillsuitEquipped && !haveStillsuitInInventory && (
        <Line color="fuchsia.500">
          Currently collecting sweat on a different familiar!
        </Line>
      )}
      <AdviceTooltip
        text={
          <UnorderedList>
            {Object.entries(advDramsTable).map(
              ([advs, drams]) =>
                drams > familiarSweat && (
                  <ListItem key={advs}>
                    {advs} advs: {drams} drams ({drams - familiarSweat} more
                    sweat)
                  </ListItem>
                ),
            )}
            {familiarSweat > 553 && (
              <ListItem>
                {" "}
                13 advs: ... y'know, you should probably just drink it, buddy.
              </ListItem>
            )}
          </UnorderedList>
        }
        label="Sweat/Advs conversion"
      />
      <AdviceTooltip
        text={
          <UnorderedList>
            <ListItem>Cubeling / Stomping Boots: +item</ListItem>
            <ListItem>
              Levitating Potato / Candy Carnie / Flan: +item and +food
            </ListItem>
            <ListItem>
              Star Starfish / Emilio / Globmule / Waifuton: +item and +sleaze
            </ListItem>
          </UnorderedList>
        }
        label="Suggested Stillsuit Familiars"
      />
    </Tile>
  );
};

export default TinyStillsuit;
