import { Text } from "@chakra-ui/react";
import { myHash } from "kolmafia";
import { $skill, get, have } from "libram";
import { ReactNode, useMemo } from "react";

import Line from "../../../components/Line";
import Tile from "../../../components/Tile";
import { NagPriority } from "../../../contexts/NagContext";
import useNag from "../../../hooks/useNag";

const SITCertificate = () => {
  const inRun = get("kingLiberated") === false;
  const hash = myHash();

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
      node: (
        <Tile
          header="S.I.T. Course Enrollment"
          imageUrl="/images/itemimages/certificate.gif"
          href={`inv_use.php?pwd${hash}=&which=3&whichitem=11116`}
        >
          {!hasAnySkill && (
            <Line color="red.500">{randomPhrase} Take your S.I.T. course!</Line>
          )}
          {hasAnySkill && inRun && (
            <Line>
              Try changing your S.I.T. course to accumulate different items.
            </Line>
          )}
          {hasAnySkill && !inRun && (
            <>
              <Line>Could change your S.I.T. skill, for new items...</Line>
              <Line>{subtitle}</Line>
            </>
          )}
        </Tile>
      ),
    }),
    [hasAnySkill, hash, inRun, randomPhrase, subtitle],
  );

  return null;
};

export default SITCertificate;
