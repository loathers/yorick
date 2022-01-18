import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import BackupCamera from "./resources/backupCamera";
import FreeFights from "./resources/FreeFights";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";
import PowerfulGlove from "./resources/PowerfulGlove";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <PowerfulGlove />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
  </Section>
);

export default ResourceSection;
