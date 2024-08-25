import {
  Container,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
} from "@chakra-ui/react";
import { getProperty, toLocation } from "kolmafia";
import { KnownProperty } from "libram";
import { ChangeEvent, useCallback, useState } from "react";

import locations from "./locations.json";
import OverrideRow from "./OverrideRow";
import preferences from "./preferences.json";

const Layout = () => {
  const [filter, setFilter] = useState("");
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFilter(event.target.value),
    []
  );
  const filterLower = filter.toLowerCase();
  return (
    <Container centerContent maxW={1000}>
      <Stack spacing={4}>
        <Heading textAlign="center">YORICK Development Preferences</Heading>
        <Input value={filter} onChange={handleChange} placeholder="Filter" />
        <Stack direction="row" alignItems="flex-start">
          <Stack>
            <Heading as="h2" size="md" textAlign="center">
              Preferences
            </Heading>
            <Table size="sm">
              <Tbody>
                {(preferences as KnownProperty[])
                  .filter((p) => p.toLowerCase().includes(filter))
                  .map((property) => (
                    <OverrideRow
                      key={property}
                      override={property}
                      current={getProperty(property)}
                    />
                  ))}
              </Tbody>
            </Table>
          </Stack>
          <Stack>
            <Heading as="h2" size="md" textAlign="center">
              Turns Spent
            </Heading>
            <Table size="sm">
              <Tbody>
                {locations
                  .filter((l) => l.toLowerCase().includes(filterLower))
                  .map((location) => (
                    <OverrideRow
                      key={location}
                      override={location}
                      current={
                        toLocation(location).turnsSpent?.toString() ?? ""
                      }
                    />
                  ))}
              </Tbody>
            </Table>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Layout;
