import * as fs from "fs";
import { dirname } from "path";
import { chdir, exit } from "process";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
chdir(__dirname);

if (
  fs.existsSync("../generated/functions.ts") &&
  fs.existsSync("../generated/types.ts")
) {
  console.log("functions.ts and types.ts are present, skipping generation.");
  exit(1);
}
