import { myPath } from "kolmafia";
import { $path, get } from "libram";

import TileSection from "../components/TileSection";
import DigitalKey from "./quests/DigitalKey";
import HeroKeys from "./quests/HeroKeys";
import HiddenTemple from "./quests/HiddenTemple";
import Island from "./quests/Island";
import Level1 from "./quests/Level1";
import Level2 from "./quests/Level2";
import Level3 from "./quests/Level3";
import Level4 from "./quests/Level4";
import Level5 from "./quests/Level5";
import Level6 from "./quests/Level6";
import Level7 from "./quests/Level7";
import Level8 from "./quests/Level8";
import Level9 from "./quests/Level9";
import Level10 from "./quests/Level10";
import Level11 from "./quests/Level11";
import Level12 from "./quests/Level12";
import Manor from "./quests/Manor";
import StarKey from "./quests/StarKey";
import Wand from "./quests/Wand";

const QuestSection = () => {
  const showStandardQuests =
    !get("kingLiberated") && myPath() !== $path`Community Service`;
  return (
    <TileSection
      name="Quests"
      tiles={[
        Manor,
        ...(showStandardQuests
          ? [
              Level1,
              Level2,
              Level3,
              Level4,
              Level5,
              Level6,
              Level7,
              Level8,
              Level9,
              Level10,
              HiddenTemple,
              Level11,
              Island,
              Level12,
              HeroKeys,
              DigitalKey,
              StarKey,
              Wand,
            ]
          : []),
      ]}
    />
  );
};

export default QuestSection;
