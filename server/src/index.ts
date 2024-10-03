import "core-js/modules/es.object.from-entries";

import * as kolmafia from "kolmafia";
import {
  Bounty,
  Class,
  Coinmaster,
  Effect,
  Element,
  Familiar,
  formFields,
  Item,
  Location,
  MafiaClass,
  Monster,
  myHash,
  Phylum,
  print,
  Servant,
  Skill,
  Slot,
  Stat,
  Thrall,
  toInt,
  toJson,
  writeln,
} from "kolmafia";
import { get } from "libram";

function json(response: { [index: string]: unknown }): void {
  writeln(JSON.stringify(response));
}

const enumeratedTypes = {
  Bounty,
  Class,
  Coinmaster,
  Effect,
  Element,
  Familiar,
  Item,
  Location,
  Monster,
  Phylum,
  Servant,
  Skill,
  Slot,
  Stat,
  Thrall,
} as const;

type EnumeratedTypeName = keyof typeof enumeratedTypes;

const toIntTypes = {
  Item,
  Familiar,
  Location,
  Skill,
  Effect,
  Class,
  Monster,
  Thrall,
  Servant,
} as const;

const specialFunctions = ["identity", "eval"] as const;
type SpecialFunction = (typeof specialFunctions)[number];

function isSpecialFunction(name: string): name is SpecialFunction {
  return (specialFunctions as readonly string[]).includes(name);
}

function transformResult(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(transformResult);
  } else if (typeof value === "object" && value) {
    const result = Object.fromEntries(
      Object.entries(JSON.parse(toJson(value))).map(([key, value]) => [
        key,
        transformResult(value),
      ]),
    );
    if (value.constructor && value.constructor.name in enumeratedTypes) {
      result.objectType = value.constructor.name;
      result.identifierString = value.toString();
      if (value.constructor.name in toIntTypes) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const identifierNumber = toInt(value as any);
        if (identifierNumber >= 0) {
          result.identifierNumber = identifierNumber;
        }
      }
    }
    return result;
  } else {
    return value;
  }
}

function processArguments(args: unknown[]) {
  return args.map((argument) => {
    if (
      typeof argument === "object" &&
      argument !== null &&
      "objectType" in argument &&
      typeof argument.objectType === "string" &&
      argument.objectType in enumeratedTypes
    ) {
      const identifier =
        "identifierString" in argument &&
        typeof argument.identifierString === "string"
          ? argument.identifierString
          : "identifierNumber" in argument &&
              typeof argument.identifierNumber === "number"
            ? argument.identifierNumber
            : null;
      if (identifier === null) return argument;

      const identifierOrNone =
        identifier === "" || identifier === -1 ? "none" : identifier;
      const type = enumeratedTypes[
        argument.objectType as EnumeratedTypeName
      ] as { get(name: string | number): MafiaClass };

      try {
        return type.get(identifierOrNone);
      } catch (e) {
        print(`Error processing argument ${JSON.stringify(argument)}: ${e}`);
      }
    }

    return argument;
  });
}

// API: x-www-form-urlencoded with "body" field as JSON.
export function main(): void {
  const bodyString = formFields().body;
  if (!bodyString) {
    json({
      error:
        'Request must have a "body" POST field and be x-www-form-urlencoded.',
    });
    return;
  }

  const body = JSON.parse(bodyString);
  if (!body) {
    json({
      error: "Invalid JSON in body field.",
    });
    return;
  }

  if (body.pwd !== myHash()) {
    json({
      error: "Invalid password.",
    });
    return;
  }

  const result = {};

  // properties: list of property names
  // returns object { [name]: value as string }
  if (body.properties) {
    const valid = body.properties.filter(
      (name: unknown) => typeof name === "string",
    ) as string[];

    Object.assign(result, {
      properties: Object.fromEntries(valid.map((name) => [name, get(name)])),
    });
  }

  // functions: list of { name, args } objects.
  // returns object { [JSON.stringify([name, ...args])]: result }
  if (body.functions) {
    const valid = body.functions.filter(
      ({ name }: { name?: string; args?: string }) =>
        typeof name === "string" &&
        (isSpecialFunction(name) || name in kolmafia),
    ) as { name: SpecialFunction | keyof typeof kolmafia; args?: unknown }[];

    Object.assign(result, {
      functions: Object.fromEntries(
        valid.map(({ name, args }) => {
          if (
            !isSpecialFunction(name) &&
            typeof kolmafia[name] !== "function"
          ) {
            print(`Can't find function ${name}.`);
            return [name, null];
          }

          if (!Array.isArray(args)) {
            print(`Arguments ${args} to function ${name} must be an array.`);
            return [name, null];
          }

          if (args.includes(null)) {
            print(`Cannot evaluate null arguments to function ${name}.`);
            return [name, null];
          }

          const processedArgs = processArguments(args);

          let result;
          if (name === "identity") {
            result = processedArgs[0];
          } else {
            const f = (name === "eval" ? eval : kolmafia[name]) as (
              ...args: unknown[]
            ) => unknown;

            try {
              result = f(...processedArgs);
            } catch (e) {
              print(
                `Error executing function ${name} on arguments ${JSON.stringify(args)}: ${e}`,
              );
              result = null;
            }
          }

          // Use [name, args] as the key so we can batch one function with different args.
          return [
            JSON.stringify([name, ...(Array.isArray(args) ? args : [])]),
            JSON.parse(toJson(transformResult(result))),
          ];
        }),
      ),
    });
  }

  writeln(JSON.stringify(result));
}
