import { Container, Box, Stack, StackDivider } from "@chakra-ui/react";
import { useContext, useState, useCallback } from "react";
import { RefreshContext } from "tome-kolmafia";
import BrandHeading from "./components/BrandHeading";
import ChatButton from "./components/ChatButton";
import LocationBar from "./components/LocationBar";
import RefreshButton from "./components/RefreshButton";
import NagContext from "./contexts/NagContext";
import NagSection from "./sections/NagSection";
import QuestSection from "./sections/QuestSection";
import ResourceSection from "./sections/ResourceSection";
import { visibleFrameCount, setup3Frames, setup4Frames } from "./util/frames";

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

  return (
    <Container paddingX={0} fontSize="sm">
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
