import { ChakraProvider, Flex, Heading } from "@chakra-ui/react";
import { Section } from "./components/Section";
import { ColdMedicineCabinet } from "./tiles/ColdMedicineCabinet";
import { CursedMagnifyingGlass } from "./tiles/CursedMagnifyingGlass";
import { LastEncounter } from "./tiles/LastEncounter";

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" align="stretch">
        <Heading as="h1" size="xl" alignSelf="center">
          YORICK
        </Heading>
        <Section name="Resources">
          <LastEncounter />
          <ColdMedicineCabinet />
          <CursedMagnifyingGlass />
        </Section>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
