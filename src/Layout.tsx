import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  IconButton,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshContext } from "tome-kolmafia";

import BrandHeading from "./components/BrandHeading";
import ChatButton from "./components/ChatButton";
import LocationBar from "./components/LocationBar";
import RefreshButton from "./components/RefreshButton";
import NagContext from "./contexts/NagContext";
import NagSection from "./sections/NagSection";
import QuestSection from "./sections/QuestSection";
import ResourceSection from "./sections/ResourceSection";
import { inDevMode } from "./util/env";
import { setup3Frames, setup4Frames, visibleFrameCount } from "./util/frames";

const Layout = () => {
  const { triggerHardRefresh } = useContext(RefreshContext);
  const { nags } = useContext(NagContext);

  const [chatFrameOpen, setChatFrameOpen] = useState(visibleFrameCount() >= 4);
  const toggleChatFrame = useCallback(() => {
    if (visibleFrameCount() >= 4) {
      setup3Frames();
      setChatFrameOpen(false);
    } else {
      setup4Frames();
      setChatFrameOpen(true);
    }
  }, []);

  useEffect(() => {
    if (inDevMode()) {
      // Refresh trigger for dev override interface.
      window.addEventListener("message", (event: MessageEvent) => {
        if (
          event.origin === "http://localhost:3000" &&
          event.data === "refresh"
        ) {
          triggerHardRefresh();
        }
      });
    }
  }, [triggerHardRefresh]);

  return (
    <Container paddingX={0} fontSize="sm">
      {inDevMode() && (
        <IconButton
          onClick={() => {
            const mainpane = window.parent.parent.frames.mainpane;
            if (mainpane) {
              mainpane.location.href = "http://localhost:3000/yorick/prefs";
            }
          }}
          position="absolute"
          top={1}
          left={1}
          zIndex={200}
          icon={<EditIcon />}
          aria-label="Refresh"
          size="xs"
          fontSize="15px"
          variant="outline"
          backgroundColor="white"
        >
          prefs
        </IconButton>
      )}
      <RefreshButton
        onClick={triggerHardRefresh}
        position="absolute"
        top={1}
        right={1}
        zIndex={200}
      />
      <ChatButton
        direction={chatFrameOpen ? "right" : "left"}
        onClick={toggleChatFrame}
        position="absolute"
        bottom="calc(var(--chakra-space-1) + 2rem)"
        right={1}
        zIndex={200}
      />
      <Box overflow="scroll" h="calc(100vh - 2rem)">
        <BrandHeading />
        <Stack divider={<StackDivider />}>
          {Object.keys(nags).length > 0 && <NagSection />}
          <QuestSection />
          <ResourceSection />
        </Stack>
      </Box>
      <LocationBar />
    </Container>
  );
};

export default Layout;
