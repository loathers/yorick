import { ChakraProvider, extendTheme, Flex, Heading } from "@chakra-ui/react";
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
      <Flex direction="column" align="stretch">
        <Heading as="h1" size="xl" alignSelf="center">
          Y💀RICK
        </Heading>
        <QuestSection />
        <ResourceSection />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
