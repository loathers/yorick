import { ListItem, UnorderedList } from "@chakra-ui/react";
import { Monster, myPath } from "kolmafia";
import { $item, $monster, $path, get, have, questStep } from "libram";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";

const AvantGuard: React.FC = () => {
  const pathCheck = myPath() === $path`Avant Guard`;
  const charged = get("bodyguardCharge") >= 50;
  const monster = get("bodyguardChatMonster");

  useNag(() => {
    const files = [
      $item`McClusky file (page 1)`,
      $item`McClusky file (page 2)`,
      $item`McClusky file (page 3)`,
      $item`McClusky file (page 4)`,
      $item`McClusky file (page 5)`,
    ];
    const neededFiles = have($item`McClusky file (complete)`)
      ? 0
      : 5 - files.findIndex((file) => !have(file));

    const recipeRead = get("spookyravenRecipeUsed") === "with_glasses";

    const recommended = [
      questStep("questM21Dance") < 3 &&
        !have($item`Lady Spookyraven's finest gown`) &&
        $monster`animated ornate nightstand`,
      questStep("questL11Palindome") >= 1 && $monster`Astronomer`,
      !have($item`enchanted bean`) &&
        questStep("questL10Garbage") <= 0 &&
        $monster`beanbat`,
      questStep("twinPeakLit") >= 1 && $monster`bearpig topiary animal`,
      // FIXME: could be more precise
      questStep("questL11Desert") >= 1 &&
        get("desertExploration") < 100 &&
        $monster`blur`,
      recipeRead &&
        questStep("questL11Manor") <= 2 &&
        $monster`cabinet of Dr. Limpieza`,
      !have($item`Richard's star key`) && $monster`Camel's Toe`,
      questStep("questL08Trapper") === 1 && $monster`dairy goat`,
      get("sidequestJunkyardCompleted") === "none" && $monster`erudite gremlin`,
      questStep("questL12War") === 1 && $monster`Green Ops Soldier`,
      questStep("questL05Goblin") === 1 && $monster`Knob Goblin Harem Girl`,
      questStep("questL08Trapper") === 1 && $monster`mountain man`,
      recipeRead &&
        questStep("questL11Manor") <= 2 &&
        $monster`possessed wine rack`,
      1 <= get("hiddenBowlingAlleyProgress") &&
        get("hiddenBowlingAlleyProgress") < 7 &&
        $monster`pygmy bowler`,
      questStep("questL11Worship") >= 1 && $monster`pygmy janitor`,
      neededFiles > 0 && $monster`pygmy witch accountant`,
      1 <= get("hiddenHospitalProgress") &&
        get("hiddenHospitalProgress") < 7 &&
        $monster`pygmy witch surgeon`,
      questStep("questL12War") === 1 && $monster`War Frat 151st Infantryman`,
      questStep("questL11Palindome") >= 1 && $monster`white lion`,
      questStep("questL08Trapper") >= 1 && $monster`whitesnake`,
    ].filter(Boolean) as Monster[];

    return {
      id: "bodyguard-chat-nag",
      priority: NagPriority.HIGH,
      node:
        pathCheck &&
        (charged ? (
          <Tile
            header="Bodyguard ready to chat!"
            href="/main.php?talktobg=1"
            imageUrl="/images/itemimages/bodyguard.gif"
            imageAlt="Burly Bodyguard"
          >
            <Line>
              Your bodyguard is ready to talk to you. Recommended chats:
            </Line>
            <UnorderedList size="xs">
              {recommended.map((monster) => (
                <ListItem key={monster.id}>{monster.name}</ListItem>
              ))}
            </UnorderedList>
          </Tile>
        ) : monster ? (
          <Tile
            header="Bodyguard chat next fight."
            imageUrl={monster.image}
            imageAlt={monster.name}
          >
            <Line>
              You will fight a {monster.name} the next time you enter combat.
            </Line>
          </Tile>
        ) : null),
    };
  }, [charged, monster, pathCheck]);

  return null;
};

export default AvantGuard;
