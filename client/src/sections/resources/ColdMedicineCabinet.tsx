import Line from "../../components/Line";
import Tile from "../../components/Tile";
import useCall from "../../hooks/useCall";
import useGet from "../../hooks/useGet";

const ColdMedicineCabinet = () => {
  const workshed: { name?: string } = useCall.getWorkshed() ?? {};
  const totalTurnsPlayed = useCall.totalTurnsPlayed() ?? 0;
  const _coldMedicineConsults = useGet("_coldMedicineConsults");
  const _nextColdMedicineConsult = useGet("_nextColdMedicineConsult");

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
