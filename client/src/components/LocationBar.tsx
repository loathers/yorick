import { Box, Stack, StackProps, Text } from "@chakra-ui/react";
import { myLocation } from "kolmafia";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { remoteCliExecute } from "../api/util";
import RefreshContext from "../contexts/RefreshContext";
import ALL_LOCATIONS from "../generated/locations.json";
import { getFrames } from "../util/frames";
import { plural } from "../util/text";
import AutocompleteInput from "./AutocompleteInput";
import Monsters from "./Monsters";

const MAX_AUTOCOMPLETE = 10;

const LocationBar: React.FC<StackProps> = (props) => {
  const { triggerHardRefresh } = useContext(RefreshContext);
  const [showDetails, setShowDetails] = useState(false);
  const [autoValue, setAutoValue] = useState("");
  const [autoHasFocus, setAutoHasFocus] = useState(false);
  const locationFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const frameList = Array.from(new Array(getFrames().length).keys()).map(
      (i) => getFrames()[i],
    );
    for (const frame of frameList) {
      frame.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "`") {
          setShowDetails(true);
          locationFieldRef.current?.focus();
          event.preventDefault();
        }
      });
    }
  }, [locationFieldRef]);

  const handleSubmit = useCallback(
    (current: string | null) => {
      if (current !== null) {
        const location = current.split(": ")[1];
        if (location !== undefined) {
          remoteCliExecute(`set nextAdventure = ${location}`);
          triggerHardRefresh();
          setAutoValue("");
        }
      }
    },
    [triggerHardRefresh],
  );

  const location = myLocation();
  const combatQueue = location.combatQueue.split(";").filter((s) => s);
  const noncombatQueue = location.noncombatQueue.split(";").filter((s) => s);

  return (
    <Box
      w="100%"
      onMouseOver={() => setShowDetails(true)}
      onMouseOut={() => setShowDetails(false)}
    >
      <Stack
        w="100%"
        py={2}
        px={3}
        position="absolute"
        bottom="2rem"
        zIndex={300}
        backgroundColor="white"
        borderTop="1px solid rgb(226, 232, 240)"
        fontSize="xs"
        visibility={showDetails || autoHasFocus ? undefined : "hidden"}
      >
        <Monsters location={location} />
        <Text>
          Combat Queue:{" "}
          {combatQueue.length === 0 ? "empty" : combatQueue.join(" → ")}
        </Text>
        <Text>
          Noncombat Queue:{" "}
          {noncombatQueue.length === 0 ? "empty" : noncombatQueue.join(" → ")}
        </Text>
        <AutocompleteInput
          allValues={ALL_LOCATIONS}
          maxOptions={MAX_AUTOCOMPLETE}
          value={autoValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setAutoValue(event.target.value)
          }
          onSubmit={handleSubmit}
          onFocus={() => setAutoHasFocus(true)}
          onBlur={() => setAutoHasFocus(false)}
          hide={!showDetails}
          ref={locationFieldRef}
        />
      </Stack>
      <Stack
        h="2rem"
        w="100%"
        px={3}
        direction="row"
        align="center"
        justify="space-between"
        backgroundColor="white"
        borderTop="1px solid rgb(226, 232, 240)"
        fontSize="xs"
        {...props}
      >
        <Text>{location.identifierString}</Text>
        <Text>{plural(location.turnsSpent, "turn")} spent</Text>
      </Stack>
    </Box>
  );
};

export default LocationBar;
