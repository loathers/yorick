import Line from "../components/Line";
import Tile from "../components/Tile";
import useFunction from "../util/useFunction";
import useProperties from "../util/useProperties";

const ColdMedicineCabinet = () => {
  const workshed: { name: string } | undefined = useFunction("getWorkshed");
  const {
    _coldMedicineConsults: consultsUsed,
    _nextColdMedicineConsult: nextConsult,
  } = useProperties({
    _coldMedicineConsults: 0,
    _nextColdMedicineConsult: 0,
  });
  const myTurncount = useFunction<number>("myTurncount") ?? 0;

  if (workshed?.name !== "cold medicine cabinet") return <></>;

  const turnsToConsult = nextConsult - myTurncount;

  return (
    <Tile
      header="Cold Medicine Cabinet"
      imageUrl="/images/itemimages/cmcabinet.gif"
    >
      <Line>{5 - consultsUsed} consults used.</Line>
      <Line>
        Next consult{" "}
        {turnsToConsult <= 0 ? "available now" : `in ${turnsToConsult} turns`}.
      </Line>
    </Tile>
  );
};

export default ColdMedicineCabinet;
