import { useEffect, useState } from "react";
import { getProperties } from "../api";

export function useProperties(...properties: string[]) {
  const [propertyState, setPropertyState] = useState(
    Object.fromEntries(properties.map((name) => [name, ""]))
  );
  useEffect(() => {
    getProperties(properties).then((propertyValues) => {
      setPropertyState((propertyState) => ({
        ...propertyState,
        ...propertyValues,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...properties]);

  return propertyState;
}
