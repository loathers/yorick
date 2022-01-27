import type { types } from "./kolmafia";
import { globalTypes } from "./types";

Object.assign(global as { [index: string]: unknown }, globalTypes);

declare global {
  type Bounty = types.Bounty;
  type Class = types.Class;
  type Coinmaster = types.Coinmaster;
  type Effect = types.Effect;
  // type Element = types.Element;
  type Familiar = types.Familiar;
  type Item = types.Item;
  // type Location = types.Location;
  type Monster = types.Monster;
  type Phylum = types.Phylum;
  type Servant = types.Servant;
  type Skill = types.Skill;
  type Slot = types.Slot;
  type Stat = types.Stat;
  type Thrall = types.Thrall;
  type Vykea = types.Vykea;
}
