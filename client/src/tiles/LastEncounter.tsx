import { Text } from "@chakra-ui/react";
import { Tile } from "../components/Tile";
import { useProperties } from "../util/useProperties";

export const LastEncounter = () => {
  const { lastEncounter } = useProperties("lastEncounter");
  return (
    <Tile
      id="lastEncounter"
      header={"Last Encounter"}
      imageUrl="/images/itemimages/slimmeat.gif"
    >
      <Text>{`Last encounter: ${lastEncounter}`}</Text>
    </Tile>
  );
};
