import { questFinished } from "../../util/quest";
import BlackForest from "./level11/BlackForest";
import Copperhead from "./level11/Copperhead";
import Desert from "./level11/Desert";
import HiddenCity from "./level11/HiddenCity";
import LordSpookyraven from "./level11/LordSpookyraven";
import Palindome from "./level11/Palindome";
import Pyramid from "./level11/Pyramid";
import Zeppelin from "./level11/Zeppelin";

const Level11 = () => {
  if (questFinished("questL11MacGuffin")) {
    return null;
  }

  return (
    <>
      <BlackForest />
      <HiddenCity />
      <LordSpookyraven />
      <Copperhead />
      <Zeppelin />
      <Palindome />
      <Desert />
      <Pyramid />
    </>
  );
};

export default Level11;
