// Needed for DataLoader.
import "setimmediate";

import DataLoader from "dataloader";
import { KnownProperty, PropertyValue } from "libram/dist/propertyTyping";
import { useEffect, useState } from "react";
import { getProperties } from "../api";

function batchFunction(
  propertyGroups: readonly Partial<{
    [K in KnownProperty]: PropertyValue<K>;
  }>[]
) {
  const allProperties: Partial<{ [K in KnownProperty]: PropertyValue<K> }> = {};
  for (const group of propertyGroups) Object.assign(allProperties, group);

  return getProperties(Object.keys(allProperties)).then((propertyValues) =>
    propertyGroups.map((group) => {
      const keys = Object.keys(group) as KnownProperty[];
      return {
        ...group,
        ...Object.fromEntries(keys.map((key) => [key, propertyValues[key]])),
      };
    })
  );
}

const propertiesLoader = new DataLoader(batchFunction, {
  // batchScheduleFn: (callback) => setTimeout(callback, 50),
});

export function useProperties<PropertyNames extends KnownProperty>(properties: {
  [K in PropertyNames]: PropertyValue<K>;
}): { [K in PropertyNames]: PropertyValue<K> } {
  const [propertyState, setPropertyState] = useState(properties);
  useEffect(() => {
    propertiesLoader.load(properties).then((propertyValues) => {
      setPropertyState((propertyState) => ({
        ...propertyState,
        ...propertyValues,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...Object.keys(properties), ...Object.values(properties)]);

  return propertyState;
}

export function useProperty<T extends KnownProperty>(
  property: T,
  default_: PropertyValue<T>
): PropertyValue<T> {
  return useProperties({ property: default_ } as unknown as {
    [K in T]: PropertyValue<K>;
  })[property];
}
