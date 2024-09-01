import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { availableAmount, myHash, totalTurnsPlayed } from "kolmafia";
import { $item, get, getTodaysHolidayWanderers, have } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { AdviceTooltip } from "../../../components/Tooltips";
import { haveUnrestricted } from "../../../util/available";

const MrStore2002 = () => {
  const mrStoreCatalog = $item`2002 Mr. Store Catalog`;
  const spookyVHSTape = $item`Spooky VHS Tape`;
  const loathingIdolMicrophone = $item`Loathing Idol Microphone`;
  const flashLiquidizerUltraDousingAccessory = $item`Flash Liquidizer Ultra Dousing Accessory`;
  const proSkateboard = $item`pro skateboard`;

  const nextVHSTurn = get("spookyVHSTapeMonsterTurn") + 8;
  const nextVHSTimer = nextVHSTurn - totalTurnsPlayed();
  const imageName = get("spookyVHSTapeMonster");
  const mr2002Credits = get("availableMrStore2002Credits");
  const availableVHSes = availableAmount(spookyVHSTape);
  const mcTwistUsed = get("_epicMcTwistUsed");
  const fludaDousesLeft = Math.max(3 - get("_douseFoeUses"), 0);

  const holidayTracker = getTodaysHolidayWanderers();
  const warnings = [];

  if (holidayTracker.length > 0) {
    warnings.push(
      "Be careful -- Borrachos & Feast of Boris wanderers can show up instead of your VHS wanderer.",
    );
  }

  if (get("breathitinCharges") > 0) {
    warnings.push(
      "Breathitin is active; avoid putting your VHS wanderer outdoors, the wanderer is already free!",
    );
  }

  const vhsOptions = [
    "War monsters; especially GROPs",
    "Giant swarm of ghuol whelps",
    "Ninja snowman assassin",
    "Quiet Healer",
    "Burly Sidekick",
  ];

  const mcTwistOptions = [
    "a dairy goat",
    "a hedge trimmer monster",
    "an evil eye monster",
    "a Green Ops Soldier",
    "a tomb rat king",
  ];

  const fludaOptions = ["goat cheese", "filthworm sweat glands"];

  return (
    <Tile
      header="2002 Mr. Store"
      imageUrl="/images/itemimages/mrsaturday.gif"
      href={`inv_use.php?pwd=${myHash()}&which=3&whichitem=${haveUnrestricted($item`Replica 2002 Mr. Store Catalog`) ? "11280" : "11257"}`}
      hide={!haveUnrestricted(mrStoreCatalog)}
    >
      <Line>{mr2002Credits} 2002 Mr. Store credits.</Line>
      {mr2002Credits > 0 && (
        <>
          <Line>Spend credits on prehistoric IotMs!</Line>
          <UnorderedList>
            {!have(flashLiquidizerUltraDousingAccessory) && (
              <ListItem>
                Flash Liquidizer Ultra Dousing Accessory: +3 BLARTpockets
              </ListItem>
            )}
            {!have(proSkateboard) && (
              <ListItem>Pro skateboard: +1 duplicate</ListItem>
            )}
            {!have($item`Letter from Carrie Bradshaw`) &&
              !have($item`red-soled high heels`) && (
                <ListItem>
                  Letter from Carrie Bradshaw: +50% booze drop accessory
                </ListItem>
              )}
            {availableAmount(loathingIdolMicrophone) < 69420 && (
              <ListItem>
                Loathing Idol Microphone: +100% init, +50% items, +5% combat; 4
                uses
              </ListItem>
            )}
            {availableAmount(spookyVHSTape) < 69420 && (
              <ListItem>
                Spooky VHS Tape: wandering freekill YR of the monster you used
                it on; try GROPs!
              </ListItem>
            )}
          </UnorderedList>
        </>
      )}
      {availableVHSes > 0 && haveUnrestricted(spookyVHSTape) && (
        <>
          <Line>
            Have {availableVHSes} VHS tapes. Use to free-copy into delay &
            guarantee drops from:
          </Line>
          <UnorderedList>
            {vhsOptions.map((option, index) => (
              <ListItem key={index}>{option}</ListItem>
            ))}
          </UnorderedList>
        </>
      )}
      {have(loathingIdolMicrophone) && (
        <Line>
          Have {availableAmount(loathingIdolMicrophone)} Loathing Idol
          microphone uses. (50% item, 5% com, or 100% init.)
        </Line>
      )}
      {have(proSkateboard) && !mcTwistUsed && (
        <Line>
          Can Epic McTwist to double drops! Consider using on:{" "}
          {mcTwistOptions.join(", ")}.
        </Line>
      )}
      {have(flashLiquidizerUltraDousingAccessory) && fludaDousesLeft > 0 && (
        <Line>
          Can waterpocket {fludaDousesLeft} more foes with FLUDA. Try stealing
          some {fludaOptions.join(" or ")}.
        </Line>
      )}
      {imageName && (
        <Line>
          {nextVHSTurn <= totalTurnsPlayed() ? (
            <Text as="span" color="red.500" fontWeight="bold">
              Spooky VHS: {imageName.name} now
            </Text>
          ) : nextVHSTurn - 1 === totalTurnsPlayed() ? (
            <Text as="span" color="blue.500">
              Spooky VHS: {imageName.name} in 1 more adv
            </Text>
          ) : (
            <AdviceTooltip
              text={`${nextVHSTimer} adventures until your free fight YR VHS fight.`}
              label={`Spooky VHS: ${imageName}`}
            />
          )}
        </Line>
      )}
      {warnings.map((warning, index) => (
        <Line key={index} color="red.500">
          ➾ {warning}
        </Line>
      ))}
    </Tile>
  );
};

export default MrStore2002;
