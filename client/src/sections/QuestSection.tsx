import Section from "../components/Section";
import Level1 from "./quests/Level1";
import Level2 from "./quests/Level2";
import Level3 from "./quests/Level3";
import Level4 from "./quests/Level4";
import Level5 from "./quests/Level5";
import Level8 from "./quests/Level8";

const QuestSection = () => (
  <Section name="Quests">
    <Level1 />
    <Level2 />
    <Level3 />
    <Level4 />
    <Level5 />
    <Level8 />
  </Section>
);

export default QuestSection;
