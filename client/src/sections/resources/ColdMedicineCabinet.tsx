import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useNumericFunction, useObjectFunction } from "../../hooks/useFunction";
import { useProperty } from "../../hooks/useProperties";

const ColdMedicineCabinet = () => {
  const workshed: { name?: string } = useObjectFunction.getWorkshed();
  const totalTurnsPlayed = useNumericFunction.totalTurnsPlayed();
  const _coldMedicineConsults = useProperty("_coldMedicineConsults", 0);
  const _nextColdMedicineConsult = useProperty("_nextColdMedicineConsult", 0);

  if (workshed?.name !== "cold medicine cabinet") return <></>;

  const turnsToConsult = _nextColdMedicineConsult - totalTurnsPlayed;

  return (
    <Tile
      header="Cold Medicine Cabinet"
      imageUrl="/images/itemimages/cmcabinet.gif"
      href="/campground.php?action=workshed"
    >
      <Line>{5 - _coldMedicineConsults} consults available.</Line>
      {_coldMedicineConsults < 5 && (
        <Line>
          Next consult{" "}
          {turnsToConsult <= 0 ? "available now" : `in ${turnsToConsult} turns`}
          .
        </Line>
      )}
    </Tile>
  );
};

export default ColdMedicineCabinet;
