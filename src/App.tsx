import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect } from "react";
import { RefreshContextProvider } from "tome-kolmafia";

import NagContextProvider from "./contexts/NagContextProvider";
import { addDevelopmentListeners } from "./prefs/addListeners";
import Layout from "./prefs/components/Layout";
import { inDevMode } from "./util/env";

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

const App = () => {
  useEffect(() => {
    if (inDevMode()) addDevelopmentListeners();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <RefreshContextProvider>
        <NagContextProvider>
          <Layout />
        </NagContextProvider>
      </RefreshContextProvider>
    </ChakraProvider>
  );
};

export default App;
