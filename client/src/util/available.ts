import {
  Familiar,
  getCampground,
  getWorkshed,
  isUnrestricted,
  Item,
  Skill,
} from "kolmafia";
import { have } from "libram";

const replicas = new Set([
  "replica Dark Jill-O-Lantern",
  "replica hand turkey outline",
  "replica crimbo elfling",
  "replica pygmy bugbear shaman",
  "replica miniature gravy-covered maypole",
  "replica wax lips",
  "replica Tome of Snowcone Summoning",
  "replica jewel-eyed wizard hat",
  "replica bottle-rocket crossbow",
  "replica navel ring of navel gazing",
  "replica V for Vivala mask",
  "replica haiku katana",
  "replica little box of fireworks",
  "replica cotton candy cocoon",
  "replica Elvish sunglasses",
  "replica squamous polyp",
  "replica Greatest American Pants",
  "replica organ grinder",
  "replica Juju Mojo Mask",
  "replica Operation Patriot Shield",
  "replica Libram of Resolutions",
  "replica plastic vampire fangs",
  "replica cute angel",
  "replica Camp Scout backpack",
  "replica deactivated nanobots",
  "replica Apathargic Bandersnatch",
  "replica Smith's Tome",
  "replica over-the-shoulder Folder Holder",
  "replica Order of the Green Thumb Order Form",
  "replica Little Geneticist DNA-Splicing Lab",
  "replica still grill",
  "replica Crimbo sapling",
  "replica yellow puck",
  "replica Chateau Mantegna room key",
  "replica Deck of Every Card",
  "replica Source terminal",
  "replica disconnected intergnat",
  "replica Witchess Set",
  "replica genie bottle",
  "replica space planula",
  "replica unpowered Robortender",
  "replica Neverending Party invitation envelope",
  "replica January's Garbage Tote",
  "replica God Lobster Egg",
  "replica Fourth of May Cosplay Saber",
  "replica Kramco Sausage-o-Matic™",
  "replica hewn moon-rune spoon",
  "replica baby camelCalf",
  "replica Powerful Glove",
  "replica Cargo Cultist Shorts",
  "replica industrial fire extinguisher",
  "replica miniature crystal ball",
  "replica emotion chip",
  "replica Jurassic Parka",
  "replica grey gosling",
  "replica designer sweatpants",
  "replica plastic pumpkin bucket",
  "replica Ten Dollars",
  "replica Cincho de Mayo",
  "replica sleeping patriotic eagle",
  "replica august scepter",
]);

export function haveUnrestricted(thing: Item | Skill | Familiar) {
  // isUnrestricted has overloads for Item, Skill, Familiar.
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isUnrestricted(thing as any) &&
    (have(thing) ||
      (thing instanceof Item && getWorkshed().name === thing.name) ||
      (thing instanceof Item && getCampground()[thing.name]) ||
      (replicas.has(`replica ${thing.name}`) &&
        have(Item.get(`replica ${thing.name}`))))
  );
}
