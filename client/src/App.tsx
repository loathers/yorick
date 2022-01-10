import { ChakraProvider, Flex, Heading, VStack } from "@chakra-ui/react";
import { Section } from "./components/Section";
import { LastEncounter } from "./tiles/LastEncounter";

function App() {
  return (
    <ChakraProvider>
      <Flex direction="column" align="stretch">
        <Heading as="h1" size="xl" alignSelf="center">
          YORICK
        </Heading>
        <Section name="Quests">
          <LastEncounter />
        </Section>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
