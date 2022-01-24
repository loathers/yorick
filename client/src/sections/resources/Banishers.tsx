import React from "react";
import Line from "../../components/Line";
import Tile from "../../components/Tile";
import { useHaveEquipped } from "../../hooks/useCall";
import useGet from "../../hooks/useGet";
import useHave from "../../hooks/useHave";
import { $item, $skill } from "../../util/makeValue";
import { plural } from "../../util/text";

/**
 * Class used to store banishers. Unless otherwise specified, all params are strings.
 * @param name The name of the banisher source
 * @param numberRemaining Number of the banishers remaining (#)
 * @param access Boolean representing if the user can access the banish
 * @param banishType Must be "skill", "item", or "equip"; kind of banish
 * @param href (optional) The target for a link
 * @param isEquipped (optional) Boolean of if the item needed is equipped
 * @param equipItem (optional) String of the item you need to equip
 * @param extraString (optional) An extra string to append to the end of the tile
 */
class BanisherObject {
  name: string;
  numberRemaining: number;
  access: boolean;
  banishType: string;
  href: string;
  banishedMonster: string;
  isEquipped: boolean;
  equipItem: string;
  extraString: string;

  constructor(
    name: string,
    numberRemaining: number,
    access: boolean,
    banishType: "skill" | "item" | "equip",
    href?: string,
    banishedMonster?: string,
    isEquipped?: boolean,
    equipItem?: string,
    extraString?: string
  ) {
    this.name = name;
    this.numberRemaining = numberRemaining;
    this.access = access;
    this.banishType = banishType;
    this.banishedMonster = banishedMonster ?? "";
    this.href = href ?? "";
    this.isEquipped = isEquipped ?? true;
    this.equipItem = equipItem ?? "";
    this.extraString = extraString ?? "";
  }

  // Returns if the banish is accessible for filtering.
  accessible(): boolean {
    return this.access && this.numberRemaining > 0;
  }

  // Renders the tile. Switches the line's stylings based on banishType.
  render(): React.ReactNode {
    const possibleStrings: { [key: string]: string } = {
      skill: `${plural(this.numberRemaining, "cast")} of ${this.name}`,
      item: `${plural(this.numberRemaining, "use")} of ${this.name}`,
      equip: `${plural(this.numberRemaining, "use")} of ${this.name}${
        !this.isEquipped ? ` (equip your ${this.equipItem}!)` : ""
      }`,
    };

    return <Line href={this.href}>{possibleStrings[this.banishType]}</Line>;
  }
}

// TO-DO LIST FOR THIS TILE:
//   -  We could manually construct a map of zones where banishing monsters is desirable and filter out each monster you don't want to banish, then check which monsters are banished against that list

const Banishers: React.FC = () => {
  // List out all banishes in BanisherObject construction.
  const allBanishers = [
    new BanisherObject(
      "Feel Hatred",
      3 - useGet("_feelHatredUsed"),
      useHave($skill`Emotionally Chipped`),
      "skill"
    ),
    // Should we add an extrastring w/ # of banishes used today? Would be cute.
    new BanisherObject(
      "Bowl a Curveball",
      1,
      useHave($item`cosmic bowling ball`),
      "item"
    ),
    new BanisherObject(
      "Show Your Boring Familiar Pictures",
      Math.floor(useGet("scrapbookCharges") / 100),
      useHave($item`familiar scrapbook`),
      "equip",
      "/inventory.php?which=2",
      undefined,
      useHaveEquipped($item`familiar scrapbook`),
      "familiar scrapbook"
    ),
    new BanisherObject(
      "Show Them Your Ring",
      +!useGet("_mafiaMiddleFingerRingUsed"),
      useHave($item`mafia middle finger ring`),
      "equip",
      "/inventory.php?which=2",
      undefined,
      useHaveEquipped($item`mafia middle finger ring`),
      "mafia middle finger ring"
    ),
  ];

  // Render the possible banishers via a map of our banisher listing.
  const renderedBanishes: React.ReactNode[] = allBanishers
    .filter((banish) => banish.accessible())
    .map((banish) => banish.render());

  return (
    <Tile
      header="Banishes"
      imageUrl="/images/itemimages/Bowlcurve.gif"
      hide={renderedBanishes.length < 1}
    >
      {renderedBanishes}
    </Tile>
  );
};

export const BanishedMonsters: React.FC = () => {
  return <Tile header="Banished Monsters" imageUrl=""></Tile>;
};

export default Banishers;
