import * as fs from "fs";
import { dirname } from "path";
import ts from "typescript";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function reasonableDefault(
  resultType: string | Record<string, string>,
  enumeratedTypes: string[],
) {
  if (typeof resultType !== "string") {
    const res = ["{"];
    Object.keys(resultType).forEach((val) => {
      res.push(
        `\t\t${val}: ${reasonableDefault(resultType[val], enumeratedTypes)},`,
      );
    });
    res.push("\t}");
    return res.join("\n");
  }
  switch (resultType) {
    case "string":
      return '""';
    case "number":
      return "0";
    case "boolean":
      return "false";
    case "void":
      return "";
    case "ModifierValueType":
    case "Environment":
      return '"none"';
    case "never":
      return "";
  }
  // Union of string literals.
  const match = resultType.match(/("[A-Za-z0-9]+")( \| +"[A-Za-z0-9]+")+/);
  if (match && match[1]) {
    return match[1];
  }
  if (resultType.endsWith("[]")) {
    return "[]";
  }
  if (enumeratedTypes.find((t) => t === resultType)) {
    return `${resultType}.none`;
  }
  return "{}";
}

function processType(type: string | Record<string, string>) {
  if (typeof type !== "string") {
    const res = ["{"];
    Object.keys(type).forEach((val) => {
      res.push(`\t${val}: ${type[val]}`);
    });
    res.push("}");
    return res.join("\n");
  }
  if (["ServantType", "ThrallType"].find((stringType) => stringType === type)) {
    return "string";
  }
  return type;
}

async function getData(): Promise<string> {
  return fetch("https://unpkg.com/kolmafia@latest/index.d.ts").then(
    (response) => response.text(),
  );
}

function generateFunctions(data: string, enumeratedTypes: string[]) {
  const beginning = fs.readFileSync("./partials/functions.ts.txt");

  const sourceFile = ts.createSourceFile(
    "index.d.ts",
    data,
    ts.ScriptTarget.Latest,
  );
  const functionNodes: ts.FunctionDeclaration[] = [];
  sourceFile.forEachChild((node: ts.Node) => {
    if (
      ts.isFunctionDeclaration(node) &&
      ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      functionNodes.push(node);
    }
  });

  const out = [
    beginning.toString(),
    "import {",
    ...enumeratedTypes.map((t) => `\t${t},`),
    "} from './types'",
    "",
  ];

  let prevFuncName = "";
  let results: (string | Record<string, string>)[] = [];

  function finalizeFunc() {
    if (prevFuncName !== "" && results.length > 0) {
      const def = reasonableDefault(results[0], enumeratedTypes);
      const resultsStr = results.map((r) => processType(r)).join(" | ");
      const isNever = resultsStr === "never";
      out.push(
        `export function ${prevFuncName}(...args: unknown[]): ${resultsStr} {`,
      );
      out.push(
        `\t${isNever ? "throw" : "return"} remoteCall('${prevFuncName}', args${
          def !== "" ? `, ${def}` : ""
        })`,
      );
      out.push("}");
      results = [];
    }
  }

  for (const functionNode of functionNodes) {
    const funcName = functionNode.name?.getText(sourceFile) ?? "";
    const params = functionNode.parameters
      .map((param) => param.getText(sourceFile))
      .join(", ");
    let result: string | Record<string, string> = processType(
      functionNode.type?.getText(sourceFile) ?? "void",
    );
    // let result: string | Record<string, string> = processType(funcMatch[3]);

    if (!result.match(/{ \[[^\]]+\]: [^\s]+ }/) && result.match(/{[^}]+}/)) {
      const allMatches = result.matchAll(/ ([a-z_]+): ([^;]+);/g);
      result = {};
      for (const match of allMatches) {
        result[match[1]] = match[2];
      }
    }

    if (funcName !== prevFuncName) {
      finalizeFunc();
      prevFuncName = funcName;
    }

    out.push(`export function ${funcName}(${params}): ${processType(result)}`);

    // I'm sorry I was lazy but this isn't really impacting script run length much anyway
    if (
      !results.find((res) => JSON.stringify(res) === JSON.stringify(result))
    ) {
      results.push(result);
    }
  }

  finalizeFunc();

  fs.mkdirSync("../src/generated", { recursive: true });
  fs.writeFileSync("../src/generated/functions.ts", out.join("\n"));
}

type ClassData = {
  name: string;
  dependencies: Set<string>;
  out: string[];
  topologicalIndex?: number;
};

// Statefully assign topological indices to this class. Fails if there is a dependency cycle.
function assignTopologicalIndex(
  classData: ClassData,
  classMap: Record<string, ClassData>,
  depth = 0,
): void {
  if (classData.topologicalIndex !== undefined) {
    return;
  }
  if (depth >= 50) throw new Error("Topo sort recursion limit exceeded.");

  for (const dep of classData.dependencies) {
    const depData = classMap[dep];
    if (!depData) continue;

    assignTopologicalIndex(depData, classMap, depth + 1);
  }

  const dependencyIndices = [...classData.dependencies]
    .map((dep) => classMap[dep]?.topologicalIndex)
    .filter((x) => x !== undefined) as number[];
  classData.topologicalIndex = Math.max(0, ...dependencyIndices) + 1;
}

/**
 * In-place topological sort.
 * @param classes list to sort.
 */
function topologicalSort(classes: ClassData[]): void {
  const classMap = Object.fromEntries(
    classes.map((classData) => [classData.name, classData]),
  );
  for (const classData of classes) {
    assignTopologicalIndex(classData, classMap);
  }

  classes.sort((x, y) => (x.topologicalIndex ?? 0) - (y.topologicalIndex ?? 0));
}

function generateTypes(data: string, enumeratedTypes: string[]) {
  const beginning = fs.readFileSync("./partials/types.ts.txt");
  const out: string[] = [beginning.toString()];

  const typeMatches = data.matchAll(/^(?:export )?type \w+ = [^;]+;$/gm);
  for (const typeMatch of typeMatches) {
    out.push(`${typeMatch[0]}`);
  }
  out.push("");

  const classNames: string[] = [];
  const classMatches = data.matchAll(
    /export class ([^ ]+) extends MafiaClass {([^}]+)}(\n|$)/gm,
  );

  const classes: ClassData[] = [];

  for (const classMatch of classMatches) {
    const className = classMatch[1];
    const body = classMatch[2];

    classNames.push(className);

    const classData: ClassData = {
      name: className,
      out: [],
      dependencies: new Set(),
    };
    const classOut = classData.out;

    classOut.push(
      `export class ${className} extends MafiaClass<'${className}'> {`,
    );
    classOut.push(`\tstatic readonly staticType = '${className}'`);
    classOut.push("");

    const noneOut = [
      `\tstatic readonly none: ${className} = new ${className}({`,
      `\t\tobjectType: "${className}",`,
      '\t\tidentifierString: "none",',
    ];
    if (
      [
        "Class",
        "Effect",
        "Familiar",
        "Item",
        "Location",
        "Monster",
        "Path",
        "Servant",
        "Skill",
        "Thrall",
      ].includes(className)
    ) {
      noneOut.push(
        `\t\tidentifierNumber: ${["Location", "Monster"].includes(className) ? 0 : -1},`,
      );
    } else {
      noneOut.push("\t\tidentifierNumber: undefined,");
    }

    const relevantMatches = body.matchAll(
      /\/\*\*\s+\* ([^*]+) \*\/\n\s+readonly ([^:]+): ([^;]+);/gm,
    );

    for (const relevantMatch of relevantMatches) {
      const comment = relevantMatch[1];
      const fieldName = relevantMatch[2];
      const fieldType = processType(relevantMatch[3]);
      // Blocklist any circular loops.
      const blocklist = [
        ["Location", "Bounty"],
        ["Item", "Coinmaster"],
      ];
      const blocked = blocklist.some(
        ([c, f]) => className === c && fieldType === f,
      );
      if (
        enumeratedTypes.includes(fieldType) &&
        className !== fieldType &&
        !blocked
      ) {
        classData.dependencies.add(fieldType);
      }

      classOut.push(
        "\t/**",
        `\t * ${comment} */`,
        `\treadonly ${fieldName}!: ${fieldType}`,
      );
      if (blocked || className === fieldType) {
        noneOut.push(`\t\t${fieldName}: {} as ${fieldType},`);
      } else {
        noneOut.push(
          `\t\t${fieldName}: ${reasonableDefault(fieldType, enumeratedTypes)},`,
        );
      }
    }

    noneOut.push(`\t});`);

    classOut.push(
      "\tconstructor(values: {",
      `\t\t[K in keyof ${className}]: ${className}[K];`,
      "\t}) {",
      "\t\tsuper(values);",
      `\t\t${className}.replaceValues<${className}>(this, values);`,
      "\t}",
      "",
    );

    classOut.push("", ...noneOut, "}", "");

    classes.push(classData);
  }

  topologicalSort(classes);
  for (const classData of classes) {
    out.push(...classData.out);
  }

  out.push(
    `export type EnumeratedType<T> = ${classNames.map((className) => `T extends "${className}" ? ${className} :`).join(" ")} never;`,
  );
  out.push("");

  out.push("export const MafiaClasses = [");
  out.push(...classNames.map((className) => `\t${className},`));
  out.push("]");
  out.push("");

  out.push("export const globalTypes = {");
  out.push(...classNames.map((className) => `\t${className},`));
  out.push("}");
  out.push("");

  fs.mkdirSync("../src/generated", { recursive: true });
  fs.writeFileSync("../src/generated/types.ts", out.join("\n"));
}

async function generateLocations() {
  const data = await fetch(
    "https://github.com/kolmafia/kolmafia/raw/refs/heads/main/src/data/adventures.txt",
  ).then((response) => response.text());

  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length !== 0 && !line.startsWith("#"));

  const locationNames = lines
    .map((line) => line.split("\t"))
    .map(([parent, , , name]) => `${parent}: ${name}`)
    .filter((line) => line)
    .sort();

  fs.mkdirSync("../src/generated", { recursive: true });
  fs.writeFileSync(
    "../src/generated/locations.json",
    JSON.stringify(locationNames),
  );
}

async function main() {
  process.chdir(__dirname);

  const data = await getData();

  const enumeratedTypes: string[] = [];
  const typeMatches = data.matchAll(
    /export class ([^ ]+) extends MafiaClass/gm,
  );

  for (const typeMatch of typeMatches) {
    enumeratedTypes.push(typeMatch[1]);
  }

  generateFunctions(data, enumeratedTypes);
  generateTypes(data, enumeratedTypes);

  await generateLocations();
}

main();
