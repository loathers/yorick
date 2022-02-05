import {
  ChakraProvider,
  Container,
  Heading,
  Stack,
  Table,
  Tbody,
} from "@chakra-ui/react";
import { KnownProperty } from "../api/propertyTyping";
import PropertyRow from "./PropertyRow";
import preferences from "./preferences.json";

// sed -n -E 's/^.* (get|use(Get|Quest|QuestStep|QuestStarted))\("([_a-zA-Z0-9]+)"(, .*)?\).*/\3/p' src/{sections,hooks,util}/**/*.tsx | sort | uniq | jq -R . | jq -s . > src/prefs/preferences.json

const App = () => (
  <ChakraProvider>
    <Container centerContent maxW={1000}>
      <Stack spacing={4}>
        <Heading textAlign="center">YORICK Development Preferences</Heading>
        <Table size="sm">
          <Tbody>
            {(preferences as KnownProperty[]).map((property) => (
              <PropertyRow key={property} property={property} />
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Container>
  </ChakraProvider>
);

export default App;
