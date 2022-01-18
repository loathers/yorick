import "core-js/modules/es.object.from-entries";
import * as kolmafia from "kolmafia";
import { formFields, MafiaClass, toInt, toJson, writeln } from "kolmafia";
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

function transformResult(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(transformResult);
  } else if (typeof value === "object" && value) {
    const result = Object.fromEntries(
      Object.entries(JSON.parse(toJson(value))).map(([key, value]) => [
        key,
        transformResult(value),
      ])
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

  const result = {};

  // properties: list of property names
  // returns object { [name]: value as string }
  if (body.properties) {
    const valid = body.properties.filter(
      (name: unknown) => typeof name === "string"
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
        typeof name === "string" && (name === "eval" || name in kolmafia)
    ) as { name: "eval" | keyof typeof kolmafia; args?: unknown }[];

    Object.assign(result, {
      functions: Object.fromEntries(
        valid.map(({ name, args }) => {
          if (name !== "eval" && typeof kolmafia[name] !== "function") {
            return [name, null];
          }

          const processedArgs = Array.isArray(args)
            ? args.map((argument) => {
                const identifier =
                  argument.identifierString ?? argument.identifierNumber;
                if (
                  argument.objectType in enumeratedTypes &&
                  ["string", "number"].includes(typeof identifier)
                ) {
                  const type = enumeratedTypes[
                    argument.objectType as EnumeratedTypeName
                  ] as { get(name: string | number): MafiaClass };
                  return type.get(identifier);
                } else {
                  return argument;
                }
              })
            : [];

          const f = (name === "eval" ? eval : kolmafia[name]) as (
            ...args: unknown[]
          ) => unknown;

          const result = f(...processedArgs);

          // Use [name, args] as the key so we can batch one function with different args.
          return [
            JSON.stringify([name, ...(Array.isArray(args) ? args : [])]),
            JSON.parse(toJson(transformResult(result))),
          ];
        })
      ),
    });
  }

  writeln(JSON.stringify(result));
}
