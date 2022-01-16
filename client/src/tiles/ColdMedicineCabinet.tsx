import { Text } from "@chakra-ui/react";
import { Tile } from "../components/Tile";
import { useFunction } from "../util/useFunction";
import { useProperties } from "../util/useProperties";

export const ColdMedicineCabinet = () => {
  const workshed: { name: string } | undefined = useFunction("getWorkshed");
  const {
    _coldMedicineConsults: consultsUsed,
    _nextColdMedicineConsult: nextConsult,
  } = useProperties("_coldMedicineConsults", "_nextColdMedicineConsult");
  const myTurncount = useFunction<number>("myTurncount") ?? 0;

  if (workshed?.name !== "cold medicine cabinet") return <></>;

  const turnsToConsult = parseInt(nextConsult) - myTurncount;

  return (
    <Tile
      id="coldMedicineCabinet"
      header="Cold Medicine Cabinet"
      imageUrl="/images/itemimages/cmcabinet.gif"
    >
      <Text>{5 - parseInt(consultsUsed)} consults used.</Text>
      <Text>
        Next consult{" "}
        {turnsToConsult <= 0 ? "available now" : `in ${turnsToConsult} turns`}.
      </Text>
    </Tile>
  );
};
