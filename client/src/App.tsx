import {
  Box,
  ChakraProvider,
  Container,
  extendTheme,
  Heading,
  Image,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useContext } from "react";

import RefreshButton from "./components/RefreshButton";
import NagContext from "./contexts/NagContext";
import NagContextProvider from "./contexts/NagContextProvider";
import RefreshContext, {
  RefreshContextProvider,
} from "./contexts/RefreshContext";
import NagSection from "./sections/NagSection";
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
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: "0.75rem",
      lineHeight: 0,
      display: "inline-block",
      width: "0.375rem",
      // This is a hackish tweak...
      marginTop: "-3px",
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

// const Layout = () => {
//   const { triggerHardRefresh } = useContext(RefreshContext);
//   const { nags } = useContext(NagContext);
//   return (
//     <Container paddingX={0} fontSize="sm">
//       <Box
//         w={0}
//         h={0}
//         overflow="visible"
//         position="sticky"
//         float="right"
//         top={1}
//         right={7}
//         zIndex={200}
//       >
//         <RefreshButton onClick={triggerHardRefresh} />
//       </Box>
//       <Heading as="h1" size="xl" textAlign="center">
//         Y💀RICK
//       </Heading>
//       <Stack divider={<StackDivider />}>
//         {Object.keys(nags).length > 0 && <NagSection />}
//         <QuestSection />
//         <ResourceSection />
//       </Stack>
//     </Container>
//   );
// };
const Layout = () => {
  const { triggerHardRefresh } = useContext(RefreshContext);
  const { nags } = useContext(NagContext);
  return (
    <Container paddingX={0} fontSize="sm">
      <RefreshButton
        onClick={triggerHardRefresh}
        position="absolute"
        top={1}
        right={1}
        zIndex={200}
      />
      <Box overflow="scroll" h="100vh">
        <Heading as="h1" size="xl" textAlign="center">
          Y
          <Image
            src="Skull192.png"
            alt="O"
            display="inline"
            h="2rem"
            mb="-4px"
            ml="-5px"
            mr="-2px"
            // FIXME: make logo itself transparent.
            mixBlendMode="multiply"
          />
          RICK
        </Heading>
        <Stack divider={<StackDivider />}>
          {Object.keys(nags).length > 0 && <NagSection />}
          <QuestSection />
          <ResourceSection />
        </Stack>
      </Box>
    </Container>
  );
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RefreshContextProvider>
        <NagContextProvider>
          <Layout />
        </NagContextProvider>
      </RefreshContextProvider>
    </ChakraProvider>
  );
}

export default App;
