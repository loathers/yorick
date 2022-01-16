import Section from "../components/Section";
import ColdMedicineCabinet from "../tiles/ColdMedicineCabinet";
import CursedMagnifyingGlass from "../tiles/CursedMagnifyingGlass";
import FreeFights from "../tiles/FreeFights";

const ResourcesSection = () => (
  <Section name="Resources">
    <FreeFights />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
  </Section>
);

export default ResourcesSection;
