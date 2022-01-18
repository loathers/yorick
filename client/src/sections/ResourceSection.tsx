import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CommerceGhost from "./resources/CommerceGhost";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import BackupCamera from "./resources/backupCamera";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";
import PowerfulGlove from "./resources/PowerfulGlove";

const ResourceSection = () => (
    <Section name='Resources'>
        <FreeFights />
        <BackupCamera />
        <ColdMedicineCabinet />
        <CursedMagnifyingGlass />
        <UndergroundFireworksShop />
        <IndustrialFireExtinguisher />
        <CommerceGhost />
    </Section>
);

export default ResourceSection;
