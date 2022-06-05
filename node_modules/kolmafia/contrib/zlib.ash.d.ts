/**
 * @file Type definition for Zlib, made by zarqon.
 *
 * - ASH script name: Zlib
 * - ASH script version: r49
 * - ASH script authors: zarqon
 *
 * Links:
 *  - ASH script forum thread: https://kolmafia.us/threads/zlib-zarqons-useful-function-library.2072/
 *  - Wiki page: https://wiki.kolmafia.us/index.php?title=Zlib
 */

import { Bounty, Class, Coinmaster, Effect, Element, Familiar, Item, Location, Monster, Phylum, Servant, Skill, Stat, Thrall, Vykea } from "..";

export function kmail(to: string, message: string, meat: number): boolean;

export function setvar(
  varname: string,
  defaultValue: string,
  type:
    | 'string'
    | 'boolean'
    | 'bounty'
    | 'class'
    | 'coinmaster'
    | 'effect'
    | 'element'
    | 'familiar'
    | 'float'
    | 'int'
    | 'item'
    | 'location'
    | 'monster'
    | 'phylum'
    | 'servant'
    | 'skill'
    | 'stat'
    | 'thrall'
    | 'vykea'
): void;

export function setvar(
  varname: string,
  defaultValue:
    | string
    | boolean
    | Bounty
    | Class
    | Coinmaster
    | Effect
    | Element
    | Familiar
    | number
    | Item
    | Location
    | Monster
    | Phylum
    | Servant
    | Skill
    | Stat
    | Thrall
    | Vykea
): void;

export function getvar(varname: string): string;
