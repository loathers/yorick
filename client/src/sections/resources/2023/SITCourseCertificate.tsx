import { Text } from "@chakra-ui/react";
import { $item, $skill, have } from "libram";
import { ReactNode, useMemo } from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";
import { haveUnrestricted } from "../../../util/available";
import { inRun } from "../../../util/quest";

const SITCertificate = () => {
  const sitCertificate = $item`S.I.T. Course Completion Certificate`;
  const haveSit = haveUnrestricted(sitCertificate);
  const currentlyInRun = inRun();

  const havePsychogeologist = have($skill`Psychogeologist`);
  const haveInsectologist = have($skill`Insectologist`);
  const haveCryptobotanist = have($skill`Cryptobotanist`);

  const hasAnySkill =
    havePsychogeologist || haveInsectologist || haveCryptobotanist;

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

  const subtitle: ReactNode = useMemo(() => {
    if (havePsychogeologist) {
      return (
        <>
          You have ML; consider <Text as="b">Insectology</Text>, for meat?
        </>
      );
    } else if (haveInsectologist) {
      return (
        <>
          You have Meat; consider <Text as="b">Psychogeology</Text>, for ML?
        </>
      );
    } else if (haveCryptobotanist) {
      return (
        <>
          You have Init; consider <Text as="b">Insectology</Text>, for meat?
        </>
      );
    } else return <></>;
  }, [haveCryptobotanist, haveInsectologist, havePsychogeologist]);

  useNag(
    () => ({
      priority: NagPriority.MID,
      node: haveSit && currentlyInRun && (
        <Tile header="S.I.T. Course Enrollment" linkedContent={sitCertificate}>
          {!hasAnySkill && (
            <Line color="red.500">{randomPhrase} Take your S.I.T. course!</Line>
          )}
          {hasAnySkill && (
            <>
              <Line>
                Try changing your S.I.T. course to accumulate different items.
              </Line>
              <Line>{subtitle}</Line>
            </>
          )}
        </Tile>
      ),
    }),
    [
      currentlyInRun,
      hasAnySkill,
      haveSit,
      randomPhrase,
      sitCertificate,
      subtitle,
    ],
  );

  return null;
};

export default SITCertificate;
