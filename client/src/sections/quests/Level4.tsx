import Line from "../../components/Line";
import QuestTile from "../../components/QuestTile";
import { useObjectFunction } from "../../hooks/useFunction";
import { atStep, Step, useQuestStep } from "../../hooks/useQuest";

const Level4: React.FC = () => {
    const step = useQuestStep("questL04Bat");
    const bodyguards: { turnsSpent?: number } = useObjectFunction.toLocation(
        "The Boss Bat's Lair"
    );

    return (
        <QuestTile
            header='Bat Hole'
            href={atStep(step, [
                [Step.UNSTARTED, "/council.php"],
                [Step.STARTED, "/place.php?whichplace=bathole"],
                [4, "/council.php"],
                [Step.FINISHED, undefined],
            ])}
            minLevel={4}
        >
            {atStep(step, [
                [Step.UNSTARTED, <Line>Visit Council to start quest.</Line>],
                [
                    Step.STARTED,
                    <Line>
                        Blow down 3 bat hole walls by fighting Screambats or
                        using sonars-in-a-biscuit.
                    </Line>,
                ],
                [
                    1,
                    <Line>
                        Blow down 2 bat hole walls by fighting Screambats or
                        using sonars-in-a-biscuit.
                    </Line>,
                ],
                [
                    2,
                    <Line>
                        Blow down 1 bat hole wall by fighting Screambats or
                        using sonars-in-a-biscuit.
                    </Line>,
                ],
                [
                    3,
                    <Line>
                        Face the fearsome Boss Bat in his lair! You must fight
                        at least {Math.max(0, 4 - (bodyguards.turnsSpent ?? 0))}{" "}
                        bodyguards to find him.
                    </Line>,
                ],
                [
                    4,
                    <Line>
                        Return to the council with news of your defeated foe.
                    </Line>,
                ],
                [Step.FINISHED, <Line></Line>],
            ])}
        </QuestTile>
    );
};

export default Level4;
