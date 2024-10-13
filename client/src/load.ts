import {
  chatIsCurrentlyActive,
  getFrames,
  getParent,
  setup3Frames,
  setup4Frames,
} from "./util/frames";

declare global {
  interface Window {
    rootset?: HTMLFrameSetElement;
    chatpane?: Window;
    mainpane?: Window;
    yorickpane?: Window;
  }
}

function load() {
  if (getFrames().yorickpane) return;
  const rootset = getFrames().rootset;
  if (!rootset) {
    console.error("YORICK: Failed to load. Can't find rootset.");
    return;
  }

  const chatpane = getFrames().chatpane;
  if (chatpane === undefined) {
    console.error("YORICK: Failed to load. Can't find chatpane.");
    return;
  }

  const frameElement = getParent().document.createElement("frame");
  frameElement.id = "yorickpane";
  frameElement.src = "/yorick/index.html";

  rootset.insertBefore(frameElement, chatpane.frameElement);

  if (chatIsCurrentlyActive()) {
    setup4Frames();
  } else {
    setup3Frames();
  }

  const mainpane = getParent().frames.mainpane;
  if (mainpane) mainpane.location.href = "/main.php";
}

load();

export {};
