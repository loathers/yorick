import { Box, Stack, StackProps, Text } from "@chakra-ui/react";
import { myLocation } from "kolmafia";
import { $location } from "libram";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  LOCATION_NAMES,
  RefreshContext,
  remoteCliExecute,
} from "tome-kolmafia-client";

import { getFrames } from "../util/frames";
import { parentPlaceLink } from "../util/links";
import { plural } from "../util/text";
import AutocompleteInput from "./AutocompleteInput";
import MainLink from "./MainLink";
import Monsters from "./Monsters";

const MAX_AUTOCOMPLETE = 10;

const LocationBar: React.FC<StackProps> = (props) => {
  const { triggerHardRefresh } = useContext(RefreshContext);
  const [showDetails, setShowDetails] = useState(false);
  const [autoValue, setAutoValue] = useState("");
  const [autoHasFocus, setAutoHasFocus] = useState(false);
  const [autoFocusCount, setAutoFocusCount] = useState(0);
  const locationFieldRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDownGlobal = useCallback((event: KeyboardEvent) => {
    if (
      event.target?.constructor?.name !== "HTMLInputElement" &&
      event.key === "`" &&
      !event.metaKey &&
      !event.altKey &&
      !event.shiftKey &&
      !event.ctrlKey
    ) {
      setAutoHasFocus(true);
      setAutoFocusCount((count) => count + 1);
      locationFieldRef.current?.focus();
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    locationFieldRef.current?.focus();
  }, [autoFocusCount]);

  useEffect(() => {
    const frameList = Array.from(new Array(getFrames().length).keys()).map(
      (i) => getFrames()[i],
    );
    for (const frame of frameList) {
      // use the .onX to avoid adding copies of listeners in dev mode.
      frame.onkeydown = handleKeyDownGlobal;
      const frameElement = frame.frameElement as HTMLFrameElement;
      frameElement.onload = (event: Event) => {
        const frameElement2 = event.target as HTMLFrameElement;
        if (frameElement2.contentWindow) {
          frameElement2.contentWindow.onkeydown = handleKeyDownGlobal;
        }
      };
    }
  }, [handleKeyDownGlobal, locationFieldRef]);

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
  const nowhere = location === $location`none`;
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
          allValues={LOCATION_NAMES}
          maxOptions={MAX_AUTOCOMPLETE}
          value={autoValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setAutoValue(event.target.value)
          }
          onSubmit={handleSubmit}
          onFocus={() => setAutoHasFocus(true)}
          onBlur={() => setAutoHasFocus(false)}
          hide={!showDetails && !autoHasFocus}
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
        <Text>
          <MainLink href={parentPlaceLink(location)}>
            {nowhere ? "No Location" : location.identifierString}
          </MainLink>
        </Text>
        {!nowhere && <Text>{plural(location.turnsSpent, "turn")} spent</Text>}
      </Stack>
    </Box>
  );
};

export default LocationBar;
