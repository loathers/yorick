import { useContext } from "react";

import Section from "../components/Section";
import TileErrorBoundary from "../components/TileErrorBoundary";
import NagContext from "../contexts/NagContext";

const NagSection = () => {
  const { nags } = useContext(NagContext);
  const nagsList = [...Object.entries(nags)].sort(
    ([, { priority: priorityA }], [, { priority: priorityB }]) =>
      -(priorityA - priorityB),
  );
  return (
    <Section
      name="Now"
      pt="0.5rem"
      top={0}
      position="sticky"
      backgroundColor="white"
      zIndex={100}
      _after={{
        content: "''",
        backgroundColor: "white",
        position: "absolute",
        left: 0,
        bottom: "calc(-1 * (var(--chakra-space-1) + 0.5rem))",
        height: "calc(var(--chakra-space-1) + 0.5rem)",
        width: "100%",
        borderBottom: "1px solid rgb(226, 232, 240)",
      }}
    >
      {nagsList.map(([id, { node }]) => (
        <TileErrorBoundary key={id} name={id}>
          {node}
        </TileErrorBoundary>
      ))}
    </Section>
  );
};

export default NagSection;
