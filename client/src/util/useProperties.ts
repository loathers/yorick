import { useEffect, useState } from "react";
import { getProperties } from "../api";

export function useProperties(...properties: string[]) {
  const [propertyState, setPropertyState] = useState(
    Object.fromEntries(properties.map((name) => [name, ""]))
  );
  useEffect(() => {
    getProperties(properties).then((propertyValues) =>
      setPropertyState((propertyState) => ({
        ...propertyState,
        ...propertyValues,
      }))
    );
  }, [properties]);

  return propertyState;
}
