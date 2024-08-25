import { ChakraProvider } from "@chakra-ui/react";

import { RefreshContextProvider } from "../contexts/RefreshContext";
import Layout from "./Layout";

// sed -n -E 's/^.* (get|getProperty|questStep)\("([_a-zA-Z0-9]+)"(, .*)?\).*/\3/p' src/{sections,hooks,util}/**/*.tsx | sort | uniq | jq -R . | jq -s . > src/prefs/preferences.json

const App = () => (
  <ChakraProvider>
    <RefreshContextProvider>
      <Layout />
    </RefreshContextProvider>
  </ChakraProvider>
);

export default App;
