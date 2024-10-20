import { Container, Heading, Stack } from "@chakra-ui/react";
import { Effect, Item, Location } from "kolmafia";
import { KnownProperty } from "libram";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { makePlaceholder, RefreshContext, remoteCall } from "tome-kolmafia";

import effects from "../data/effects.json";
import items from "../data/items.json";
import locationsNoncombatQueue from "../data/noncombatQueue.json";
import preferences from "../data/preferences.json";
import locationsTurnsSpent from "../data/turnsSpent.json";
import OverrideTable from "./OverrideTable";
import ValidatedInput from "./ValidatedInput";

interface GenericTableProps {
  filterRegex: RegExp | null;
}

const PreferencesTable: React.FC<GenericTableProps> = ({ filterRegex }) => (
  <OverrideTable
    heading="Preferences"
    filterRegex={filterRegex}
    data={preferences as KnownProperty[]}
    getOverride={(property) => property}
    getCurrent={(property) => remoteCall("getProperty", [property], "", true)}
  />
);

const TurnsSpentTable: React.FC<GenericTableProps> = ({ filterRegex }) => (
  <OverrideTable
    heading="Turns Spent"
    filterRegex={filterRegex}
    data={locationsTurnsSpent}
    getOverride={(location) => `$location[${location}].turns_spent`}
    getCurrent={(location) =>
      remoteCall<Location>(
        "toLocation",
        [location],
        {} as Location,
        true,
      )?.turnsSpent?.toString() ?? ""
    }
  />
);

const NoncombatQueueTable: React.FC<GenericTableProps> = ({ filterRegex }) => (
  <OverrideTable
    heading="Noncombat Queue"
    filterRegex={filterRegex}
    data={locationsNoncombatQueue}
    getOverride={(location) => `$location[${location}].noncombat_queue`}
    getCurrent={(location) =>
      remoteCall<Location>(
        "toLocation",
        [location],
        {} as Location,
        true,
      )?.noncombatQueue?.toString() ?? ""
    }
  />
);

const ItemsTable: React.FC<GenericTableProps> = ({ filterRegex }) => (
  <OverrideTable
    heading="Items"
    filterRegex={filterRegex}
    data={items.filter((item) => Item.get(item))}
    getOverride={(item) => `available_amount($item[${item}])`}
    getCurrent={(item) =>
      remoteCall<number>(
        "availableAmount",
        [makePlaceholder("Item", item)],
        0,
        true,
      )?.toString?.()
    }
  />
);

const EffectsTable: React.FC<GenericTableProps> = ({ filterRegex }) => (
  <OverrideTable
    heading="Effects"
    filterRegex={filterRegex}
    data={effects.filter((effect) => Effect.get(effect))}
    getOverride={(effect) => `have_effect($effect[${effect}])`}
    getCurrent={(effect) =>
      remoteCall<number>(
        "haveEffect",
        [makePlaceholder("Effect", effect)],
        0,
        true,
      )?.toString?.()
    }
  />
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
            <PreferencesTable filterRegex={filterRegex} />
            <TurnsSpentTable filterRegex={filterRegex} />
            <NoncombatQueueTable filterRegex={filterRegex} />
          </Stack>
          <Stack>
            <ItemsTable filterRegex={filterRegex} />
            <EffectsTable filterRegex={filterRegex} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Layout;
