import { myPath } from "kolmafia";
import { $item, $path, get, have } from "libram";
import React from "react";

import Line from "../../../components/Line";
import QuestTile from "../../../components/QuestTile";

const Arena: React.FC = () => {
  const currentPath = myPath();
  const flyeredML = get("flyeredML");
  const percentDone = Math.min((flyeredML / 10000) * 100, 100);
  const mlRemaining = 10000 - flyeredML;
  const jamBandFlyers = $item`jam band flyers`;
  const rockBandFlyers = $item`rock band flyers`;
  const haveFlyers = have(rockBandFlyers) || have(jamBandFlyers);
  const flyers = have(rockBandFlyers) ? rockBandFlyers : jamBandFlyers;

  if (
    currentPath === $path`G-Lover` ||
    currentPath === $path`Pocket Familiars`
  ) {
    return null;
  }

  return (
    <QuestTile
      header="Island War Arena"
      imageUrl="/images/adventureimages/promoboard.gif"
      href="/bigisland.php"
    >
      {flyeredML >= 10000 ? (
        <Line>Turn in quest.</Line>
      ) : (
        <>
          {!haveFlyers && <Line>Acquire flyers.</Line>}
          <Line>
            {percentDone.toFixed(1)}% ML completed, {mlRemaining} ML remains.
          </Line>
          {mlRemaining > 0 && haveFlyers && (
            <Line>Flyer with {flyers.name} every combat.</Line>
          )}
        </>
      )}
    </QuestTile>
  );
};

export default Arena;
