import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import BackupCamera from "./resources/backupCamera";
import FreeFights from "./resources/FreeFights";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
  </Section>
);

export default ResourceSection;
