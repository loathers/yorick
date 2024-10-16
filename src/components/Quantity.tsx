import { Text } from "@chakra-ui/react";
import { Item, Skill } from "kolmafia";
import { useMemo } from "react";

import { numberFormatter, pluralJustDescItem } from "../util/text";

type Props = {
  count: number | boolean;
  thing: Item | Skill | string;
  verb?: string;
}

export function Quantity({ count, thing, verb }: Props) {
  const quantity = Number(count);

  const desc = useMemo(() => {
    const suffix = quantity === 1 ? '' : 's';

    if (verb) {
      const name = typeof thing === "string" ? thing : thing.name;
      return `${name} ${verb}${suffix}`;
    }

    if (thing instanceof Item) {
      return pluralJustDescItem(thing, quantity);
    }

    if (thing instanceof Skill) {
      return `${thing.name} cast${suffix}`;
    }

    return `${thing}${suffix}`;
  }, [quantity, thing, verb]);

  return (
    <span>
      <Text as="b">{numberFormatter.format(quantity)}</Text> {desc}
    </span>
  )
}

