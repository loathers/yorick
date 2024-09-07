import { ListItem, OrderedList, Text, UnorderedList } from "@chakra-ui/react";
import { myAscensions, myLevel } from "kolmafia";
import { $item, get } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { haveUnrestricted } from "../../../util/available";

interface MayamSymbol {
  ring: number;
  friendlyName: string;
  mafiaName: string;
  description: string;
}

const MayamCalendar: React.FC = () => {
  const mayamCalendar = $item`Mayam Calendar`;

  const mayamSymbols: MayamSymbol[] = [
    {
      ring: 1,
      friendlyName: "Yam",
      mafiaName: "yam1",
      description: "craftable ingredient",
    },
    {
      ring: 1,
      friendlyName: "Sword",
      mafiaName: "sword",
      description: `+${Math.min(150, 10 * myLevel())} mus stats`,
    },
    {
      ring: 1,
      friendlyName: "Vessel",
      mafiaName: "vessel",
      description: "+1000 MP",
    },
    { ring: 1, friendlyName: "Fur", mafiaName: "fur", description: "+100 Fxp" },
    {
      ring: 1,
      friendlyName: "Chair",
      mafiaName: "chair",
      description: "+5 free rests",
    },
    {
      ring: 1,
      friendlyName: "Eye",
      mafiaName: "eye",
      description: "+30% item for 100 advs",
    },
    {
      ring: 2,
      friendlyName: "Yam",
      mafiaName: "yam2",
      description: "craftable ingredient",
    },
    {
      ring: 2,
      friendlyName: "Lightning",
      mafiaName: "lightning",
      description: `+${Math.min(150, 10 * myLevel())} mys stats`,
    },
    {
      ring: 2,
      friendlyName: "Bottle",
      mafiaName: "bottle",
      description: "+1000 HP",
    },
    {
      ring: 2,
      friendlyName: "Wood",
      mafiaName: "wood",
      description: "+4 bridge parts",
    },
    {
      ring: 2,
      friendlyName: "Meat",
      mafiaName: "meat",
      description: `+${Math.min(150, 10 * myLevel())} meat`,
    },
    {
      ring: 3,
      friendlyName: "Yam",
      mafiaName: "yam3",
      description: "craftable ingredient",
    },
    {
      ring: 3,
      friendlyName: "Eyepatch",
      mafiaName: "eyepatch",
      description: `+${Math.min(150, 10 * myLevel())} mox stats`,
    },
    {
      ring: 3,
      friendlyName: "Wall",
      mafiaName: "wall",
      description: "+2 res for 100 advs",
    },
    {
      ring: 3,
      friendlyName: "Cheese",
      mafiaName: "cheese",
      description: "+1 goat cheese",
    },
    {
      ring: 4,
      friendlyName: "Yam",
      mafiaName: "yam4",
      description: "yep.",
    },
    {
      ring: 4,
      friendlyName: "Clock",
      mafiaName: "clock",
      description: "+5 advs",
    },
    {
      ring: 4,
      friendlyName: "Explosion",
      mafiaName: "explosion",
      description: "+5 fites",
    },
  ];

  const templeResetAscension = get("lastTempleAdventures");
  const mayamSymbolsUsed = get("_mayamSymbolsUsed");

  if (!haveUnrestricted(mayamCalendar)) {
    return null;
  }

  const unusedSymbols = mayamSymbols.filter(
    (symbol) => !mayamSymbolsUsed.includes(symbol.mafiaName),
  );

  const ringDescriptions = [1, 2, 3, 4].map((ring) => {
    const ringSymbols = unusedSymbols.filter((symbol) => symbol.ring === ring);
    return (
      <ListItem key={ring}>
        <Text as="b">{`${ring}${["st", "nd", "rd", "th"][ring - 1]} ring:`}</Text>{" "}
        {ringSymbols.map((symbol) => symbol.friendlyName).join(", ")}
      </ListItem>
    );
  });

  const resonances = [
    { name: "15-turn banisher", combo: ["Vessel", "Yam", "Cheese", "Explosion"] },
    { name: "Yam and swiss", combo: ["Yam", "Meat", "Cheese", "Yam"] },
    { name: "+55% meat accessory", combo: ["Yam", "Meat", "Eyepatch", "Yam"] },
    { name: "+100% Food drops", combo: ["Yam", "Yam", "Cheese", "Clock"] },
  ];

  const availableResonances = resonances.filter((resonance) => (
    [1, 2, 3, 4].map((ring) => {
      const ringSymbols = unusedSymbols.filter((symbol) => symbol.ring === ring).map((symbol) => symbol.friendlyName);
      return ringSymbols.includes(resonance.combo[ring-1]);
    }).filter((result) => result).length == 4));

  return (
    <Tile
      header="Mayam Calendar"
      imageUrl="/images/itemimages/yamcal.gif"
      linkedContent={mayamCalendar}
    >
      <Line>Happy Mayam New Year!</Line>
      <OrderedList>{ringDescriptions}</OrderedList>
      {availableResonances.length > 0 && (<Line fontWeight="bold">Cool Mayam combos!</Line>)}
      <UnorderedList>
        {availableResonances.map((resonance, index) => (
          <ListItem key={index}>
            <Text as="b">{resonance.name}:</Text> {resonance.combo.join(" + ")}
          </ListItem>
        ))}
      </UnorderedList>
      {templeResetAscension < myAscensions() && (
        <Line fontWeight="bold">Temple reset available!</Line>
      )}
    </Tile>
  );
};

export default MayamCalendar;
