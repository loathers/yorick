import { Text, VStack } from "@chakra-ui/react";
import { myClass, myLevel, myPrimestat, numericModifier } from "kolmafia";
import { $class, $familiar, get } from "libram";
import React from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const GreyGoose: React.FC = () => {
  const greyGoose = $familiar`Grey Goose`;
  const gooseDrones = get("gooseDronesRemaining");
  const gooseWeight = Math.min(Math.floor(Math.sqrt(greyGoose.experience)), 20);
  const gooseExperience = greyGoose.experience;
  const famExperienceGain = numericModifier("familiar experience") + 1;
  const newGooseExp = gooseExperience + famExperienceGain;
  const famExpNeededForNextPound = (gooseWeight + 1) ** 2 - gooseExperience;
  const famExpNeededForTwoPounds = (gooseWeight + 2) ** 2 - gooseExperience;
  const horribleFamExpCalculation = Math.ceil(
    (36 - gooseExperience) / famExperienceGain,
  );
  const horribleFamExpCalculationForGreyYou = Math.ceil(
    (196 - gooseExperience) / famExperienceGain,
  );
  const horribleFamExpCalculationForStandard = Math.ceil(
    (400 - gooseExperience) / famExperienceGain,
  );

  useNag(
    () => ({
      id: "grey-goose-nag",
      priority: NagPriority.MID,
      node: gooseDrones > 0 && (
        <Tile header="Grey Goose" imageUrl="/images/itemimages/greygoose.gif">
          <Line>
            <Text as="span" color="brown" fontWeight="bold">
              {gooseDrones}
            </Text>
            <Text as="span" color="gray.500">
              {" "}
              GOOSO drones deployed
            </Text>
          </Line>
          <Line>Automatically duplicates non-conditional drops.</Line>
        </Tile>
      ),
    }),
    [gooseDrones],
  );

  useNag(
    () => ({
      id: "grey-goose-grey-you-nag",
      priority: NagPriority.MID,
      node: myClass() === $class`Grey Goo` && gooseWeight > 5 && (
        <Tile header="Grey Goose" imageUrl="/images/itemimages/greygoose.gif">
          <Line color="gray.500">
            GOOSO is {gooseWeight} pounds ({gooseExperience} exp)
          </Line>
          <Line>
            Re-Process a bunch of matter to gain a bunch of adventures in Grey
            You.
          </Line>
        </Tile>
      ),
    }),
    [gooseWeight, gooseExperience],
  );

  if (!haveUnrestricted(greyGoose)) return null;

  return (
    <Tile linkedContent={greyGoose}>
      <VStack align="stretch" spacing={1}>
        <Line>
          Currently have <Text as="b">{gooseWeight}</Text> weight (
          <Text as="b">{gooseExperience}</Text> experience), currently gain{" "}
          <Text as="b">{famExperienceGain}</Text> fam exp per fight. (Will
          become{" "}
          <Text
            as="b"
            color={
              (gooseWeight + 1) ** 2 > newGooseExp ? "red.500" : "blue.500"
            }
          >
            {newGooseExp}
          </Text>
          )
        </Line>
        {gooseWeight < 6 ? (
          <Line>
            <Text as="b">
              {Math.ceil(famExpNeededForNextPound / famExperienceGain)}
            </Text>{" "}
            combats until next pound, or{" "}
            <Text as="b">{Math.ceil(horribleFamExpCalculation)}</Text> combats
            for 6 weight.
          </Line>
        ) : (
          <>
            <Line>
              <Text as="b">{famExpNeededForNextPound}</Text> famxp needed for
              next pound or
              <Text as="b">{famExpNeededForTwoPounds}</Text> for the one after
              that.
            </Line>
            {famExperienceGain < famExpNeededForNextPound && (
              <Line color="red.500">Insufficient famxp for next fight.</Line>
            )}
            <Line>
              Can emit <Text as="b">{gooseWeight - 5}</Text> drones to duplicate
              items.
            </Line>
            {get("_meatifyMatterUsed") === false && (
              <Line>
                Can meatify matter for{" "}
                <Text as="b">{(gooseWeight - 5) ** 4}</Text> meat.
              </Line>
            )}
            {myClass() === $class`Grey Goo` &&
            gooseWeight > 5 &&
            myLevel() < 11 ? (
              <>
                <Line>
                  Can generate <Text as="b">{(gooseWeight - 5) ** 2}</Text>{" "}
                  mainstat.
                </Line>
                <Line>
                  <Text as="b">
                    GREY YOU:{" "}
                    {Math.ceil(famExpNeededForNextPound / famExperienceGain)}
                  </Text>{" "}
                  combats until next pound, or
                  <Text as="b">
                    {Math.ceil(horribleFamExpCalculationForGreyYou)}
                  </Text>{" "}
                  combats for 14 weight.
                </Line>
              </>
            ) : (
              gooseWeight > 5 &&
              myLevel() < 11 && (
                <>
                  <Line>
                    Can generate{" "}
                    <Text as="b">
                      {Math.round(
                        (gooseWeight - 5) ** 3 *
                          (1.0 +
                            numericModifier(
                              `${myPrimestat()} Experience Percent`,
                            ) /
                              100.0),
                      )}
                    </Text>{" "}
                    substats. (<Text as="b">{(gooseWeight - 5) ** 3}</Text>{" "}
                    base).
                  </Line>
                  <Line>
                    <Text as="b">
                      STAT GOOSO:{" "}
                      {Math.ceil(famExpNeededForNextPound / famExperienceGain)}
                    </Text>{" "}
                    combats until next pound, or
                    <Text as="b">
                      {Math.ceil(horribleFamExpCalculationForStandard)}
                    </Text>{" "}
                    combats for 20 weight.
                  </Line>
                </>
              )
            )}
            {!get("_questPartyFair") && (
              <Line>
                {famExperienceGain >= 39 ? (
                  <Text color="green.500">Can GOOSO 3 drops per fight!</Text>
                ) : famExperienceGain >= 24 ? (
                  <Text color="blue.500">Can GOOSO 2 drops per fight!</Text>
                ) : famExperienceGain >= 11 ? (
                  <Text color="purple.500">Can GOOSO 1 drop per fight!</Text>
                ) : (
                  <Text color="red.500">Cannot GOOSO any drops per fight!</Text>
                )}
              </Line>
            )}
          </>
        )}
      </VStack>
    </Tile>
  );
};

export default GreyGoose;
