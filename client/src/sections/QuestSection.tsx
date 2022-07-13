import Section from "../components/Section";
import Level1 from "./quests/Level1";
import Level2 from "./quests/Level2";
import Level3 from "./quests/Level3";
import Level4 from "./quests/Level4";
import Level5 from "./quests/Level5";
import Level6 from "./quests/Level6";
import Level7 from "./quests/Level7";
import Level8 from "./quests/Level8";
import AbooPeak from "./quests/level9/AbooPeak";
import OilPeak from "./quests/level9/OilPeak";
import OrcChasm from "./quests/level9/OrcChasm";
import TwinPeak from "./quests/level9/TwinPeak";

const QuestSection = () => (
  <Section name="Quests">
    <Level1 />
    <Level2 />
    <Level3 />
    <Level4 />
    <Level5 />
    <Level6 />
    <Level7 />
    <Level8 />
    <OrcChasm />
    <AbooPeak />
    <TwinPeak />
    <OilPeak />
  </Section>
);

export default QuestSection;
