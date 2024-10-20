import { Box } from "@chakra-ui/react";
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
    <Box top={0} position="sticky" backgroundColor="white" zIndex={100}>
      <Section
        name="Now"
        pt="0.5rem"
        pb={2}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        {nagsList.map(([id, { node }]) => (
          <TileErrorBoundary key={id} name={id}>
            {node}
          </TileErrorBoundary>
        ))}
      </Section>
    </Box>
  );
};

export default NagSection;
