import { Monster } from "kolmafia";
import { $item, $location, $monsters, get, have } from "libram";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { myLocation } from "../../kolmafia/functions";

// consts to make the map below more readable
const NOOK = $location`The Defiled Nook`.id;
const LIBRARY = $location`The Haunted Library`.id;
const AIRSHIP = $location`The Penultimate Fantasy Airship`.id;
const TOPIARY_ANIMALS = $monsters`bearpig topiary animal, elephant (meatcar?) topiary animal, spider (duck?) topiary animal`;
const APARTMENT = $location`The Hidden Apartment Building`.id;
const OFFICE = $location`The Hidden Office Building`.id;
const LAUNDRY_ROOM = $location`The Haunted Laundry Room`.id;
const BOBS = $monsters`Bob Racecar, Racecar Bob`;
const GREMLINS = $monsters`batwinged gremlin, erudite gremlin, spider gremlin, vegetable gremlin`;

// Map of good orb monster targets by location id
const TARGETS: { [key: number]: Monster[] } = {};
TARGETS[LIBRARY] = $monsters`writing desk, banshee librarian`;
TARGETS[$location`The Beanbat Chamber`.id] = $monsters`beanbat`;
TARGETS[$location`The Defiled Niche`.id] = $monsters`dirty old lihc`;
TARGETS[NOOK] = $monsters`spiny skelelton, toothy sklelton`;
TARGETS[$location`The Goatlet`.id] = $monsters`dairy goat`;
TARGETS[$location`Twin Peak`.id] = TOPIARY_ANIMALS;
TARGETS[AIRSHIP] = $monsters`Quiet Healer`;
TARGETS[$location`The Hidden Hospital`.id] = $monsters`pygmy witch surgeon`;
TARGETS[APARTMENT] = $monsters`pygmy shaman, pygmy witch accountant`;
TARGETS[OFFICE] = $monsters`pygmy witch accountant`;
TARGETS[$location`The Hidden Bowling Alley`.id] = $monsters`pygmy bowler`;
TARGETS[$location`The Haunted Wine Cellar`.id] = $monsters`possessed wine rack`;
TARGETS[LAUNDRY_ROOM] = $monsters`cabinet of Dr. Limpieza`;
TARGETS[$location`The Red Zeppelin`.id] = $monsters`red butler`;
TARGETS[$location`Inside the Palindome`.id] = BOBS;
TARGETS[$location`The Middle Chamber`.id] = $monsters`tomb rat`;
TARGETS[$location`The Junkyard`] = GREMLINS;

const GOOD_ZONE_IDS = Object.keys(TARGETS).map((id) => parseInt(id));

const CrystalBall = () => {
  const currentPrediction = get("crystalBallPredictions");
  const currentLocation = myLocation();
  const targets = GOOD_ZONE_IDS.includes(currentLocation.id)
    ? `Look for ${TARGETS[currentLocation.id]}`
    : "";
  return (
    <Tile
      header="Miniature Crystal Orb"
      imageUrl="/images/itemimages/famball.gif"
      hide={!have($item`miniature crystal ball`)}
      linkedContent={$item`miniature crystal ball`}
    >
      <Line>{currentPrediction}</Line>
      <Line> {targets} </Line>
    </Tile>
  );
};

export default CrystalBall;
