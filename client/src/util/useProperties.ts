import { useEffect, useState } from "react";
import { getProperties } from "../api";

export function useProperties<T>(properties: T): T {
  const [propertyState, setPropertyState] = useState(properties);
  useEffect(() => {
    getProperties(Object.keys(properties)).then((propertyValues) => {
      setPropertyState((propertyState) => ({
        ...propertyState,
        ...propertyValues,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.keys(properties), ...Object.values(properties)]);

  return propertyState;
}

export default useProperties;
