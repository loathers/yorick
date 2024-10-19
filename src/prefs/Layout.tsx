import { Container, Heading, Stack, Table, Tbody } from "@chakra-ui/react";
import { Effect, Item, Location } from "kolmafia";
import { KnownProperty } from "libram";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { makePlaceholder, RefreshContext, remoteCall } from "tome-kolmafia";

import effects from "./effects.json";
import items from "./items.json";
import locations from "./locations.json";
import OverrideRow from "./OverrideRow";
import preferences from "./preferences.json";
import ValidatedInput from "./ValidatedInput";

interface OverrideTableProps {
  filterRegex: RegExp | null;
}

const PreferencesTable: React.FC<OverrideTableProps> = ({ filterRegex }) => (
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
);

const LocationsTable: React.FC<OverrideTableProps> = ({ filterRegex }) => (
  <Table size="sm">
    <Tbody>
      {locations
        .filter((l) => !filterRegex || filterRegex.test(l))
        .map((location) => (
          <OverrideRow
            key={`$location[${location}].turns_spent`}
            override={`$location[${location}].turns_spent`}
            label={location}
            current={
              remoteCall<Location>(
                "toLocation",
                [location],
                {} as Location,
                true,
              )?.turnsSpent?.toString() ?? ""
            }
          />
        ))}
    </Tbody>
  </Table>
);

const ItemsTable: React.FC<OverrideTableProps> = ({ filterRegex }) => (
  <Table size="sm">
    <Tbody>
      {items
        .filter((l) => !filterRegex || filterRegex.test(l))
        .map(
          (item) =>
            Item.get(item) && (
              <OverrideRow
                key={`available_amount($item[${item}])`}
                override={`available_amount($item[${item}])`}
                label={item}
                current={remoteCall<number>(
                  "availableAmount",
                  [makePlaceholder("Item", item)],
                  0,
                  true,
                )?.toString?.()}
              />
            ),
        )}
    </Tbody>
  </Table>
);

const EffectsTable: React.FC<OverrideTableProps> = ({ filterRegex }) => (
  <Table size="sm">
    <Tbody>
      {effects
        .filter((l) => !filterRegex || filterRegex.test(l))
        .map(
          (effect) =>
            Effect.get(effect) && (
              <OverrideRow
                key={`have_effect($effect[${effect}])`}
                override={`have_effect($effect[${effect}])`}
                label={effect}
                current={remoteCall<number>(
                  "haveEffect",
                  [makePlaceholder("Effect", effect)],
                  0,
                  true,
                )?.toString?.()}
              />
            ),
        )}
    </Tbody>
  </Table>
);

const Layout = () => {
  useContext(RefreshContext);
  const [filter, setFilter] = useState("");
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setFilter(event.target.value),
    [],
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
            <PreferencesTable filterRegex={filterRegex} />
            <Heading as="h2" size="md" textAlign="center">
              Turns Spent
            </Heading>
            <LocationsTable filterRegex={filterRegex} />
          </Stack>
          <Stack>
            <Heading as="h2" size="md" textAlign="center">
              Items
            </Heading>
            <ItemsTable filterRegex={filterRegex} />
            <Heading as="h2" size="md" textAlign="center">
              Effects
            </Heading>
            <EffectsTable filterRegex={filterRegex} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Layout;
