import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import FreeFights from "./resources/FreeFights";
import IndustrialFireExtinguisher from "./resources/IndustrialFireExtinguisher";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
    <UndergroundFireworksShop />
    <IndustrialFireExtinguisher />
  </Section>
);

export default ResourceSection;
