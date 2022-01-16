import Section from "../components/Section";
import ColdMedicineCabinet from "../tiles/ColdMedicineCabinet";
import CursedMagnifyingGlass from "../tiles/CursedMagnifyingGlass";
import LastEncounter from "../tiles/LastEncounter";

const ResourcesSection = () => (
  <Section name="Resources">
    <LastEncounter />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
  </Section>
);

export default ResourcesSection;
