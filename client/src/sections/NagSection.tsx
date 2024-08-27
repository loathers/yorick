import { Fragment, useContext } from "react";

import Section from "../components/Section";
import NagContext from "../contexts/NagContext";

const NagSection = () => {
  const { nags } = useContext(NagContext);
  const nagsList = [...Object.entries(nags)].sort(
    ([, { priority: priorityA }], [, { priority: priorityB }]) =>
      priorityA - priorityB,
  );
  return (
    <Section
      name="Now"
      top={0}
      position="sticky"
      backgroundColor="white"
      borderBottom="1px black"
    >
      {nagsList.map(([id, { node }]) => (
        <Fragment key={id}>{node}</Fragment>
      ))}
    </Section>
  );
};

export default NagSection;
