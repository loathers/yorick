import { questFinished } from "../../util/quest";
import War from "./level12/War";

const Level12 = () => {
  if (questFinished("questL12War")) {
    return null;
  }

  return (
    <>
      <War />
    </>
  );
};

export default Level12;
