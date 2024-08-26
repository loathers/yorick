import { questFinished } from "../../util/quest";
import BlackForest from "./level11/BlackForest";
import Copperhead from "./level11/Copperhead";
import HiddenCity from "./level11/HiddenCity";
import Zeppelin from "./level11/Zeppelin";

const Level11 = () => {
  if (questFinished("questL11MacGuffin")) {
    return null;
  }

  return (
    <>
      <BlackForest />
      <HiddenCity />
      <Copperhead />
      <Zeppelin />
    </>
  );
};

export default Level11;
