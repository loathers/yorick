import QuestStep, { QuestStepParameters } from "./QuestStep";

interface QuestParameters<T extends string> {
  name: string;
  steps: { [K in T]: QuestStepParameters<T> };
}

export default class Quest<T extends string> {
  name: string;
  steps: { [K in T]: QuestStep<T> };

  constructor({ name, steps }: QuestParameters<T>) {
    this.name = name;
    this.steps = Object.fromEntries(
      Object.entries<QuestStepParameters<T>>(steps).map(([name, step]) => [
        name,
        new QuestStep(name, step),
      ])
    ) as { [K in T]: QuestStep<T> };
  }
}
