import { ChakraProvider, extendTheme, Flex, Heading } from "@chakra-ui/react";
import ResourcesSection from "./sections/ResourcesSection";

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
          YORICK
        </Heading>
        <ResourcesSection />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
