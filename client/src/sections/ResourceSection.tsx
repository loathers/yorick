import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";
import PowerfulGlove from "./resources/PowerfulGlove";
import BackupCamera from "./resources/BackupCamera";
import CosmicBowlingBall from "./resources/CosmicBowlingBall";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
    <IndustrialFireExtinguisher />
    <CommerceGhost />
    <PowerfulGlove />
    <CosmicBowlingBall />
  </Section>
);

export default ResourceSection;
