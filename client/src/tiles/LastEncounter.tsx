import { useProperties } from "../util/useProperties";

export const LastEncounter = () => {
  const { lastEncounter } = useProperties("lastEncounter");
  return <>{`Last encounter: ${lastEncounter}`}</>;
};
