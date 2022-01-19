import { Placeholder, placeholderIdentifier } from "./makeValue";

export function inventory(filter: string | Placeholder<"Item">) {
  if (typeof filter !== "string") {
    filter = placeholderIdentifier(filter).toString();
  }
  return `/inventory.php?ftext=${filter}`;
}
