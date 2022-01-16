import { Text } from "@chakra-ui/react";
import { Tile } from "../components/Tile";
import { useFunction } from "../util/useFunction";
import { useProperties } from "../util/useProperties";

export const CursedMagnifyingGlass = () => {
  const { _voidFreeFights, cursedMagnifyingGlassCount } = useProperties(
    "_voidFreeFights",
    "cursedMagnifyingGlassCount"
  );
  const availableAmount =
    useFunction<number>("availableAmount", {
      type: "Item",
      identifier: "cursed magnifying glass",
    }) ?? 0;

  if (availableAmount === 0) return <></>;

  const turnsToVoid = 13 - parseInt(cursedMagnifyingGlassCount);

  return (
    <Tile
      id="cursedMagnifyingGlass"
      header="Cursed Magnifying Glass"
      imageUrl="/images/itemimages/cmcabinet.gif"
    >
      <Text>
        Fought {_voidFreeFights} void monsters today. Next one is{" "}
        {parseInt(_voidFreeFights) >= 5 ? "NOT free" : "free"}.
      </Text>
      <Text>
        Void monster fight{" "}
        {turnsToVoid === 0 ? "available now" : `in ${turnsToVoid} turns`}.
      </Text>
    </Tile>
  );
};
