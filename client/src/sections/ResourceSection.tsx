import Section from "../components/Section";
import ColdMedicineCabinet from "./resources/ColdMedicineCabinet";
import CursedMagnifyingGlass from "./resources/CursedMagnifyingGlass";
import DaylightShavingsHelmet from "./resources/DaylightShavingsHelmet";
import FreeFights from "./resources/FreeFights";

const ResourceSection = () => (
  <Section name="Resources">
    <FreeFights />
    <ColdMedicineCabinet />
    <CursedMagnifyingGlass />
    <DaylightShavingsHelmet />
  </Section>
);

export default ResourceSection;
