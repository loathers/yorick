import { haveEquipped, myPath, numericModifier, toInt } from "kolmafia";
import { $item, $path, get, have, maxBy, NumericModifier } from "libram";

import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { AdviceTooltip } from "../../components/Tooltips";
import { haveUnrestricted } from "../../util/available";
import { inventoryLink } from "../../util/links";
import { plural } from "../../util/text";

type Color = "black" | "red" | "blue" | "green";

const DigitalKeyQuest: React.FC = () => {
  const continuumTransfunctioner = $item`continuum transfunctioner`;
  const digitalKey = $item`digital key`;

  const started = haveUnrestricted(continuumTransfunctioner);
  const finished =
    myPath() === $path`Community Service` ||
    myPath() === $path`Kingdom of Exploathing` ||
    !get("_inRun") ||
    have(digitalKey) ||
    get("nsTowerDoorKeysUsed").includes("Digital");

  const currentScore = get("8BitScore");
  const currentColor = (get("8BitColor") || "black") as Color;

  const helpfulModifier: Record<Color, NumericModifier> = {
    black: "Initiative",
    red: "Meat Drop",
    blue: "Damage Absorption",
    green: "Item Drop",
  };

  const minimumToAddPoints: Record<Color, number> = {
    black: 300,
    red: 150,
    blue: 300,
    green: 100,
  };

  const zoneMap: Record<Color, string> = {
    black: "Vanya's Castle",
    red: "The Fungus Plains",
    blue: "Megalo-City",
    green: "Hero's Field",
  };

  const nextColor: Record<Color, Color> = {
    black: "blue",
    red: "black",
    blue: "green",
    green: "red",
  };

  const bonusTurnsRemaining = 5 - toInt(get("8BitBonusTurns"));

  const userModifier: Record<Color, number> = Object.fromEntries(
    Object.entries(helpfulModifier).map(([key, value]) => [
      key,
      numericModifier(value),
    ]),
  ) as Record<Color, number>;

  const expectedPoints: Record<Color, number> = Object.fromEntries(
    Object.entries(helpfulModifier).map(([key]) => {
      const isCurrentZoneBonus = currentColor === key;
      const addedBonus = isCurrentZoneBonus ? 100 : 50;
      const denominator = isCurrentZoneBonus ? 10 : 20;
      const rawPoints = Math.min(
        300,
        Math.max(
          0,
          userModifier[key as Color] - minimumToAddPoints[key as Color],
        ),
      );
      return [key, addedBonus + Math.round(rawPoints / denominator) * 10];
    }),
  ) as Record<Color, number>;

  const highestPointColor = maxBy(
    Object.entries(expectedPoints),
    ([, value]) => value,
  )[0] as Color;

  if (finished) return null;

  if (!started) {
    return (
      <QuestTile
        header="Digital Key Quest"
        imageUrl="/images/itemimages/transfunc.gif"
        href="place.php?whichplace=forestvillage&action=fv_mystic"
        minLevel={5}
      >
        <Line>Visit the crackpot mystic for your transfunctioner.</Line>
      </QuestTile>
    );
  }

  if (currentScore < 10000) {
    const activeMod = helpfulModifier[currentColor];
    const neededModifier = (minimumToAddPoints[currentColor] + 300).toString();

    return (
      <QuestTile
        header={`BONUS ZONE: ${zoneMap[currentColor]} (${plural(bonusTurnsRemaining, "more fight", "more fights")})`}
        imageUrl={`/images/adventureimages/${zoneMap[currentColor].toLowerCase().replace(/\s/g, "")}.gif`}
        href={
          haveEquipped(continuumTransfunctioner)
            ? "/place.php?whichplace=8bit"
            : inventoryLink(continuumTransfunctioner)
        }
        minLevel={5}
      >
        <Line>
          {activeMod === "Initiative" && `+${neededModifier}% init`}
          {activeMod === "Meat Drop" && `+${neededModifier}% meat`}
          {activeMod === "Damage Absorption" && `+${neededModifier} DA`}
          {activeMod === "Item Drop" && `+${neededModifier}% item`}
          {zoneMap[currentColor] !== "Megalo-City" && "outdoor zone"}
        </Line>
        {expectedPoints[currentColor] === 400 ? (
          <>
            <Line color={currentColor}>
              <b>MAXIMUM POINTS!</b>
            </Line>
            <Line>
              Adventure in{" "}
              <b style={{ color: currentColor }}>{zoneMap[currentColor]}</b> for
              400 points per turn!
            </Line>
          </>
        ) : (
          <>
            <Line>Current expected points: {expectedPoints[currentColor]}</Line>
            <AdviceTooltip
              text={`You need ${minimumToAddPoints[currentColor] + 300 - userModifier[currentColor]}${activeMod !== "Damage Absorption" ? "%" : ""} more for max points.`}
              label={
                <Line>
                  Consider buffing{" "}
                  <b style={{ color: currentColor }}>
                    {helpfulModifier[currentColor]}
                  </b>{" "}
                  for more points.
                </Line>
              }
            />
          </>
        )}
        <Line>
          In {plural(bonusTurnsRemaining, "more fight", "more fights")}, bonus
          zone will be{" "}
          <b style={{ color: nextColor[currentColor] }}>
            {zoneMap[nextColor[currentColor]]}
          </b>
          .
        </Line>
        {highestPointColor !== currentColor && (
          <Line color="gray">
            Alternate Route: At current stats, you'd earn{" "}
            <b>{expectedPoints[highestPointColor]} points</b> per fight at{" "}
            <b>{zoneMap[highestPointColor]}</b>. Not recommended!
          </Line>
        )}
        {!haveEquipped(continuumTransfunctioner) && (
          <Line color="red">
            Equip your transfunctioner to access the realm.
          </Line>
        )}
        <Line>
          Projected Key Completion: Current Score: {currentScore} of 10000
        </Line>
        {currentScore < 10000 ? (
          <Line>
            If you max your bonus, you'll have your key in{" "}
            {plural(
              Math.ceil((10000 - currentScore) / 400),
              "more turn",
              "more turns",
            )}
            .
          </Line>
        ) : (
          <>
            <Line>Woah, 10000 points??? That's this life's high score!</Line>
            <Line>
              Visit the <b>Treasure House</b> to claim your hard-earned Digital
              Key.
            </Line>
          </>
        )}
      </QuestTile>
    );
  }

  return null;
};

export default DigitalKeyQuest;
