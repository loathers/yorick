import "core-js/modules/es.object.from-entries";
import * as kolmafia from "kolmafia";
import { formFields, toJson, writeln } from "kolmafia";
import { get } from "libram";

function json(response: { [index: string]: unknown }): void {
  writeln(JSON.stringify(response));
}

const exposedConstructors: {
  [index: string]: { get: (name: string | number) => unknown };
} = {
  Effect,
  Familiar,
  Item,
  Skill,
};

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
  // returns object { [name]: result }
  if (body.functions) {
    const valid = body.functions.filter(
      ({ name }: { name?: string; args?: string }) =>
        typeof name === "string" && name in kolmafia
    ) as { name: keyof typeof kolmafia; args?: unknown }[];

    Object.assign(result, {
      functions: Object.fromEntries(
        valid.map(({ name, args }) => {
          if (typeof kolmafia[name] !== "function") {
            return [name, null];
          }

          const processedArgs = Array.isArray(args)
            ? args.map((argument) => {
                if (
                  argument.type in exposedConstructors &&
                  ["string", "number"].includes(typeof argument.identifier)
                ) {
                  return exposedConstructors[argument.type].get(
                    argument.identifier
                  );
                } else {
                  return argument;
                }
              })
            : [];

          const f = kolmafia[name] as (...args: unknown[]) => unknown;

          // Use [name, args] as the key so we can batch one function with different args.
          return [
            JSON.stringify([name, ...(Array.isArray(args) ? args : [])]),
            JSON.parse(toJson(f(...processedArgs))),
          ];
        })
      ),
    });
  }

  writeln(JSON.stringify(result));
}
