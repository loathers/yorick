import { ChakraProvider, extendTheme, Flex, Heading } from "@chakra-ui/react";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import QuestSection from "./sections/QuestSection";
import ResourceSection from "./sections/ResourceSection";

const theme = extendTheme({
  textStyles: {
    line: {
      lineHeight: 1.15,
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RefreshContextProvider>
        <Flex direction="column" align="stretch">
          <Heading as="h1" size="xl" alignSelf="center">
            Y💀RICK
          </Heading>
          <QuestSection />
          <ResourceSection />
        </Flex>
      </RefreshContextProvider>
    </ChakraProvider>
  );
}

export default App;
