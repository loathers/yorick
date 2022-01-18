import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { $item } from "../../util/makeValue";
import { plural } from "../../util/text";
import { useNumericFunction } from "../../hooks/useFunction";
import useHave from "../../hooks/useHave";
import { useGet } from "../../hooks/useProperties";

/**
 * Summarizes # of backups remaining, warns the user if the reverser is off, and makes suggestions re: enchantment
 * @returns A tile describing the Backup Camera
 */

const BackupCamera = () => {
  const _backUpUses = useGet("_backUpUses", 0);
  const reverserStatus = useGet("backupCameraReverserEnabled");
  const cameraMode = useGet("backupCameraMode");
  const userLevel = useNumericFunction.myLevel();

  // Remove tile if the user does not have a camera.
  if (!useHave($item`backup camera`)) {
    return <></>;
  }

  // Change the cameraMode variable to a more-useful summary.
  let modeToEnchantment = new Map<string, string>([
    ["meat", "+50% Meat"],
    ["ml", "+" + Math.min(userLevel * 3, 50) + " ML"],
    ["init", "+100% Initiative"],
  ]);

  // Currently, the primary recommendation is to swap to ML if the user is under Level 13.
  //   Realistically we probably want some other modifiers here; init if nextAdv is alcove,
  //   ML if next adv is tavern/cranny, meat if next adv is nuns. I want to build this into
  //   whatever zone recommendation system we build, so I am leaving it as a pending feature.

  return (
    <Tile header="Backup Camera" imageUrl="/images/itemimages/Backcamera.gif">
      {_backUpUses < 11 && (
        <Line>{plural(11 - _backUpUses, "backup")} remaining today.</Line>
      )}
      <Line>Currently set to {modeToEnchantment.get(cameraMode)}</Line>
      {userLevel > 13 && cameraMode !== "ml" && (
        <Line>
          <text style={{ color: "#a3a3a3" }}>
            You aren't Level 13 yet; switch to ML?
          </text>
        </Line>
      )}
      {!reverserStatus && (
        <Line>
          <text style={{ color: "#CC0000" }}>
            <b>WARNING!</b>
          </text>{" "}
          Reverser is off. Turn it on, or combats are backwards!
        </Line>
      )}
    </Tile>
  );
};

export default BackupCamera;
