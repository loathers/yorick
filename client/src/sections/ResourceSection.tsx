import Section from "../components/Section";
import BackupCamera from "./resources/BackupCamera";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CosmicBowlingBall from "./resources/CosmicBowlingBall";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import EmotionChip from "./resources/EmotionChip";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import PowerfulGlove from "./resources/PowerfulGlove";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <EmotionChip />
    <CosmicBowlingBall />
    <PowerfulGlove />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
    <CommerceGhost />
    <IndustrialFireExtinguisher />
  </Section>
);

export default ResourceSection;
