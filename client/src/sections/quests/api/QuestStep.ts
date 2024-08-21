export interface QuestStepParameters<T extends string> {
  dependencies: T[];
}

export default class QuestStep<T extends string> {
  name: T;
  dependencies: T[];

  constructor(name: T, { dependencies }: QuestStepParameters<T>) {
    this.name = name;
    this.dependencies = dependencies;
  }
}
