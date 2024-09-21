import { ChakraProvider } from "@chakra-ui/react";

import { RefreshContextProvider } from "../contexts/RefreshContext";
import Layout from "./Layout";

// egrep -Roh '\$item`[^`]*`' src | sed 's/$item`//' | tr -d '`' | sort -f | uniq | grep -v '${' | jq --raw-input --slurp 'split("\n") | map(select(. != ""))' > src/prefs/items.json
// egrep -Roh '\$effect`[^`]*`' src | sed 's/$effect`//' | tr -d '`' | sort -f | uniq | grep -v 'none' | jq --raw-input --slurp 'split("\n") | map(select(. != ""))' > src/prefs/effects.json
// egrep -Roh '(get|getProperty|questStep|questStarted|questFinished)\("([_a-zA-Z0-9]+)"\)' src | sed -E 's/.*"([_a-zA-Z0-9]+)".*/\1/' | tr -d '`' | sort -f | uniq | jq -R . | jq -s . > src/prefs/preferences.json

const App = () => (
  <ChakraProvider>
    <RefreshContextProvider>
      <Layout />
    </RefreshContextProvider>
  </ChakraProvider>
);

export default App;
