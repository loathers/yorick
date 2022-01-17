import { StringProperty } from "libram/dist/propertyTypes";
import { useProperty } from "./useProperties";

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

function useQuest(
  property: StringProperty,
  operator: "<" | "<=" | "=" | ">=" | ">",
  threshold: "unstarted" | "started" | "finished" | number
) {
  const value = useProperty(property, "unstarted");
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

export default useQuest;
