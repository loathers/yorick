import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import DaylightShavingsHelmet from "./resources/DaylightShavingsHelmet";
import FreeFights from "./resources/FreeFights";
import UndergroundFireworksShop from "./resources/UndergroundFireworksShop";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
    <DaylightShavingsHelmet />
    <UndergroundFireworksShop />
  </Section>
);

export default ResourceSection;
