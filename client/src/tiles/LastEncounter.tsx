import Line from "../components/Line";
import Tile from "../components/Tile";
import useProperties from "../hooks/useProperties";

const LastEncounter = () => {
  const { lastEncounter } = useProperties({ lastEncounter: "" });
  return (
    <Tile header="Last Encounter" imageUrl="/images/itemimages/slimmeat.gif">
      <Line>{`Last encounter: ${lastEncounter}`}</Line>
    </Tile>
  );
};

export default LastEncounter;
