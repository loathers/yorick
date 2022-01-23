import { ChakraProvider, extendTheme, Flex, Heading } from "@chakra-ui/react";
import { RefreshContextProvider } from "./contexts/RefreshContext";
import QuestSection from "./sections/QuestSection";
import ResourceSection from "./sections/ResourceSection";

const bulleted = {
  container: {
    paddingTop: "0.125rem",
    paddingLeft: "1.25rem",
  },
  item: {
    textIndent: "-0.375rem",
    _before: {
      content: '"●"',
      verticalAlign: "middle",
      fontSize: "0.375rem",
      display: "inline-block",
      width: "0.375rem",
    },
  },
};

const theme = extendTheme({
  lineHeights: {
    none: 1,
    shorter: 1.05,
    short: 1.1,
    base: 1.15,
    tall: 1.25,
    taller: 1.5,
  },
  components: {
    List: {
      variants: { bulleted },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RefreshContextProvider>
        <Flex direction="column" align="stretch" fontSize="sm">
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
