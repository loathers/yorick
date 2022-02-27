import Section from "../components/Section";
import BackupCamera from "./resources/BackupCamera";
import Cartography from "./resources/Cartography";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CosmicBowlingBall from "./resources/CosmicBowlingBall";
import CrystalBall from "./resources/CrystalBall";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import EmotionChip from "./resources/EmotionChip";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import Melodramedary from "./resources/Melodramedary";
import PowerfulGlove from "./resources/PowerfulGlove";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <BackupCamera />
    <ColdMedicineCabinet />
    <EmotionChip />
    <Melodramedary />
    <CosmicBowlingBall />
    <Cartography />
    <PowerfulGlove />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
    <CommerceGhost />
    <IndustrialFireExtinguisher />
    <CrystalBall />
  </Section>
);

export default ResourceSection;
