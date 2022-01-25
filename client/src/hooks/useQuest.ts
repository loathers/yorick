import { StringProperty } from "libram/dist/propertyTypes";
import useGet from "./useGet";

export enum Step {
  UNSTARTED = -1,
  STARTED = 0,
  FINISHED = 999,
}

function questValueToNumber(value: string | number) {
  if (typeof value === "number") return value;

  const match = value.match(/^step([0-9]+)$/);
  if (match) {
    return parseInt(match[1]);
  }
  switch (value) {
    case "finished":
      return 999;
    case "started":
      return 0;
    case "unstarted":
    default:
      return -1;
  }
}

export function atStep<T>(current: number, steps: [number, T][]) {
  // Sort in descending order.
  const stepsSorted = [...steps].sort(([stepX], [stepY]) => -(stepX - stepY));
  for (const [step, value] of stepsSorted) {
    if (current >= step) return value;
  }
}

export function useQuest(
  property: StringProperty,
  operator: "<" | "<=" | "=" | ">=" | ">",
  threshold: "unstarted" | "started" | "finished" | number
): boolean {
  const value = useGet(property, "unstarted");
  const valueNumber = questValueToNumber(value);
  const thresholdNumber = questValueToNumber(threshold);
  switch (operator) {
    case "<":
      return valueNumber < thresholdNumber;
    case "<=":
      return valueNumber <= thresholdNumber;
    case "=":
      return valueNumber === thresholdNumber;
    case ">=":
      return valueNumber >= thresholdNumber;
    case ">":
      return valueNumber > thresholdNumber;
  }
}

export function useQuestStep(property: StringProperty): number {
  const value = useGet(property, "unstarted");
  return questValueToNumber(value);
}

/**
 * Returns true if you have started this quest.
 * @param property Quest property.
 */
export function useQuestStarted(property: StringProperty): boolean {
  return useQuest(property, ">=", "started");
}

/**
 * Returns true if you are at or past this step.
 * @param property Quest property.
 */
export function useQuestPastStep(
  property: StringProperty,
  step: number
): boolean {
  return useQuest(property, ">=", step);
}

/**
 * Returns true if you have finished this quest.
 * @param property Quest property.
 */
export function useQuestFinished(property: StringProperty): boolean {
  return useQuest(property, ">=", "finished");
}
