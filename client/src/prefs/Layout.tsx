import { Container, Heading, Stack, Table, Tbody } from "@chakra-ui/react";
import { Location } from "kolmafia";
import { KnownProperty } from "libram";
import { ChangeEvent, useCallback, useContext, useState } from "react";

import RefreshContext from "../contexts/RefreshContext";
import { remoteCall } from "../kolmafia/remote";
import locations from "./locations.json";
import OverrideRow from "./OverrideRow";
import preferences from "./preferences.json";
import ValidatedInput from "./ValidatedInput";

const Layout = () => {
  useContext(RefreshContext);
  const [filter, setFilter] = useState("");
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFilter(event.target.value),
    []
  );
  let filterRegex: RegExp | null = null,
    filterValid = true;
  try {
    filterRegex = new RegExp(filter, "i");
  } catch {
    filterValid = false;
  }
  return (
    <Container centerContent maxW={1000}>
      <Stack spacing={4} w="full">
        <Heading textAlign="center">YORICK Development Overrides</Heading>
        <ValidatedInput
          value={filter}
          setValue={setFilter}
          valid={filterValid}
          onChange={handleChange}
          placeholder="Filter (regex)"
        />
        <Stack direction="row" align="flex-start" justify="center">
          <Stack>
            <Heading as="h2" size="md" textAlign="center">
              Preferences
            </Heading>
            <Table size="sm">
              <Tbody>
                {(preferences as KnownProperty[])
                  .filter((p) => !filterRegex || filterRegex.test(p))
                  .map((property) => (
                    <OverrideRow
                      key={property}
                      override={property}
                      current={remoteCall("getProperty", [property], "", true)}
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
                  .filter((l) => !filterRegex || filterRegex.test(l))
                  .map((location) => (
                    <OverrideRow
                      key={location}
                      override={location}
                      current={
                        remoteCall<Location>(
                          "toLocation",
                          [location],
                          {} as Location,
                          true
                        ).turnsSpent?.toString() ?? ""
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
