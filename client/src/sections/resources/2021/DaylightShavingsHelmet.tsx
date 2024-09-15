import { $effect, $item, DaylightShavings } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";
import { plural } from "../../../util/text";

const DaylightShavingsHelmet = () => {
  const yourBuffCycle = DaylightShavings.buffCycle();
  const buffsTilMeat =
    DaylightShavings.buffsUntil($effect`Friendly Chops`) ?? 0;
  const buffsTilItem =
    DaylightShavings.buffsUntil($effect`Spectacle Moustache`) ?? 0;
  const nextBuff = DaylightShavings.nextBuff() ?? $effect`none`;

  // TO-DO LIST ON THIS TILE:
  //   - Figure out ways to cut tile length.
  //   - Add a hoverover with the ordered buff list.
  //   - Add a hoverover with what the next effect does.
  //   - Figure out desired behavior with equipping/unequipping the helmet.
  //   - Add some handling for "is the lastBuff active"; currently would require writing parser for myEffects()

  return (
    <Tile
      linkedContent={$item`Daylight Shavings Helmet`}
      hide={!haveUnrestricted($item`Daylight Shavings Helmet`)}
    >
      <Line>
        Your next buff is {nextBuff.name} ({yourBuffCycle.indexOf(nextBuff)}/12)
      </Line>
      {buffsTilMeat === 0 ? (
        <Line>
          <text style={{ color: "#CC0000" }}>
            <b>WARNING!</b>
          </text>{" "}
          Meat buff's up next! Only equip the helmet when you need it.
        </Line>
      ) : (
        <Line>
          You are {plural(buffsTilMeat, "buff")} away from +100% meat drop (
          {plural(buffsTilMeat * 11, "turn")}).
        </Line>
      )}
      {buffsTilItem === 0 ? (
        <Line>
          <text style={{ color: "#CC0000" }}>WARNING!</text> Item buff's up
          next! Only equip the helmet when you need it.
        </Line>
      ) : (
        <Line>
          You are {plural(buffsTilItem, "buff")} away from +50% item drop (
          {plural(buffsTilItem * 11, "turn")}).
        </Line>
      )}
    </Tile>
  );
};

export default DaylightShavingsHelmet;
