import { Box, Text, VStack } from "@chakra-ui/react";
import { $item, $skill, get, have } from "libram";
import { useEffect } from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";

const SITCertificate = () => {
  const sitCertificate = $item`S.I.T. Course Completion Certificate`;
  const completedSITToday = get("_sitCourseCompleted");
  const inRun = get("kingLiberated") === false;

  const psychogeologist = $skill`Psychogeologist`;
  const insectologist = $skill`Insectologist`;
  const cryptobotanist = $skill`Cryptobotanist`;

  const hasAnySkill =
    have(psychogeologist) || have(insectologist) || have(cryptobotanist);

  const miscPhrases = [
    "Don't play hooky!",
    "You already paid for it.",
    "This one time in college...",
    "Bright college days, oh, carefree days that fly.",
    "No child of mine is leaving here without a degree!",
    "Make like a tree and leaf (through your papers).",
  ];

  const randomPhrase =
    miscPhrases[Math.floor(Math.random() * miscPhrases.length)];

  let subtitle = "";
  if (have(psychogeologist))
    subtitle =
      "You have ML; consider <Text as='b'>Insectology</Text>, for meat?";
  if (have(insectologist))
    subtitle =
      "You have Meat; consider <Text as='b'>Psychogeology</Text>, for ML?";
  if (have(cryptobotanist))
    subtitle =
      "You have Init; consider <Text as='b'>Insectology</Text>, for meat?";

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: (
        <Tile
          header="S.I.T. Course Enrollment"
          imageUrl="/images/itemimages/certificate.gif"
          href="inv_use.php?pwd=&which=3&whichitem=11116"
        >
          {!hasAnySkill && (
            <Line>
              <Text color="red.500">
                {randomPhrase} Take your S.I.T. course!
              </Text>
            </Line>
          )}
          {hasAnySkill && inRun && (
            <Line>
              Try changing your S.I.T. course to accumulate different items.
            </Line>
          )}
          {hasAnySkill && !inRun && (
            <VStack align="start">
              <Text>Could change your S.I.T. skill, for new items...</Text>
              <Text>{subtitle}</Text>
            </VStack>
          )}
        </Tile>
      ),
    }),
    [hasAnySkill, inRun, subtitle],
  );

  return null;
};

export default SITCertificate;
