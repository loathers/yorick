import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const types = path.resolve(__dirname, "..", "types");
const src = path.resolve(__dirname, "..", "src");

interface Secrets {
  anthropic_api_key: string;
}

function loadSecrets(): Secrets {
  const secretsPath = path.join(__dirname, "secrets.json");
  try {
    const secretsContent = fs.readFileSync(secretsPath, "utf-8");
    return JSON.parse(secretsContent);
  } catch (error) {
    console.error("Error reading secrets.json:", error);
    process.exit(1);
  }
}

const CODE = "```";
function typeDefinitions() {
  let result = "";

  for (const directory of fs.readdirSync(types)) {
    const directoryPath = path.resolve(types, directory);
    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      if (path.extname(file) === ".ts" || path.extname(file) === ".d.ts") {
        const filePath = path.join(directoryPath, file);
        const content = fs.readFileSync(filePath, "utf-8");

        result += `File: ${file}\n`;
        result += "```typescript\n";
        result += content;
        result += "\n```\n\n";
      }
    }
  }

  return result;
}

function prompt(inputFile: string) {
  return `
You are an expert TypeScript/React programmer.
I'm going to ask you to convert a file from the ASH scripting language (from the KoLmafia program) code to TypeScript/React/ChakraUI.
Note a couple specific things:
- Use \`have\` for a boolean check if we have an item, and \`availableAmount\` for a numeric item count.
Always use \`have\` instead of \`availableAmount(x) > 0\` for just checking if the count is greater than 0.
Similarly, use \`have\` instead of \`haveEffect > 0\`.
- Incorporate any quest_state logic into native React code. That doesn't need to be stored.
- You should not use any state variables anywhere in your code.
- Use the \`get\` function instead of \`getProperty\`.
- Use the libram $item/$skill/$effect\`Xyz\` etc. style for KOL objects.
- Please capitalize all item, skill, location, etc. names.
- To check if an item is equipped, use haveEquipped($item\`Xyz\`).
- Every Line needs to be a complete sentence ending in a period.
- Colors should be e.g. green.500 in Chakra style.
- If the tile represents e.g. an item, define a variable for that item at the top of the component, and then use that variable throughout the code.
For example, const cosmicBowlingBall = $item\`Cosmic Bowling Ball\`;
- If creating a nag using useNag, the dependency array (the second argument to useNag) can only contain variables, not function calls.
- Transform any "details" array into idiomatic React declarative code.
Similarly, any ASH functions like ChecklistEntry[Make], etc., should be converted to React style code.
- Please print all of the output code; don't omit any of the converted code.
- This is very important: The output code should include EVERY piece of functionality of the input code.
There should not be any piece to fill in later.

Here are some type definitions from the project for context.
${typeDefinitions()}
Here are two example components in TypeScript.
File: CosmicBowlingBall.tsx
${CODE}typescript
${fs.readFileSync(path.resolve(src, "sections", "resources", "CosmicBowlingBall.tsx"))}
${CODE}

File: EmotionChip.tsx
${CODE}typescript
${fs.readFileSync(path.resolve(src, "sections", "resources", "EmotionChip.tsx"))}
${CODE}

Here is the file I would like you to transform.
${CODE}
${inputFile}
${CODE}
  `;
}

async function convertAshToTypeScript(
  inputFilePath: string,
  outputFilePath: string,
) {
  const secrets = loadSecrets();
  const CLAUDE_API_KEY = secrets.anthropic_api_key;

  try {
    // Read the ASH file
    const ashCode = fs.readFileSync(inputFilePath, "utf-8");

    // Prepare the request payload
    const payload = {
      // model: "claude-3-haiku-20240307",
      model: "claude-3-5-sonnet-20240620",
      messages: [
        {
          role: "user",
          content: prompt(ashCode),
        },
        {
          role: "assistant",
          content: "Certainly! Here's the typescript version:\n```typescript",
        },
      ],
      max_tokens: 4000,
    };

    // Make the API call to Claude
    const response = await fetch(CLAUDE_API_URL, {
      method: "post",
      body: JSON.stringify(payload),
      headers: {
        "Anthropic-Version": "2023-06-01",
        "Content-Type": "application/json",
        "X-API-Key": CLAUDE_API_KEY,
      },
    });
    const data = await response.json();

    if (data.type === "error") {
      console.error(`API error: ${data.error.message}`);
      return;
    }

    // Extract the converted code from Claude's response
    const wholeResponse: string = data.content[0].text;
    const convertedCode = wholeResponse.slice(0, wholeResponse.indexOf("```"));

    // Write the converted code to the output file
    fs.writeFileSync(outputFilePath, convertedCode, "utf-8");

    console.log("Conversion completed successfully!");
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}

// Parse command-line arguments
function parseArgs(): { inputFile: string; outputFile: string } {
  const args = process.argv.slice(2);
  if (args.length < 1 || args.length > 2) {
    console.error("Usage: ts-node convertAsh.ts <input_file> [<output_file>]");
    process.exit(1);
  }
  const inputFile = args[0];
  const outputFile =
    args[1] ??
    path.resolve(
      src,
      "sections",
      "resources",
      path.basename(args[0].replace(/ /g, "").replace(".ash", ".tsx")),
    );
  console.log(`Output file ${outputFile}`);
  return { inputFile, outputFile };
}

// Main execution
const { inputFile, outputFile } = parseArgs();
convertAshToTypeScript(inputFile, outputFile);
