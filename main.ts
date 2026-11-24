// One Emoji, One Dream Vacation.
//
// Reads the single entry emoji from emoji.txt at the repository root and
// writes exactly that emoji — and nothing else — into the output directory
// named by MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR.
//
// Node 22+, standard library only. No network, no wall clock.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));

// The entry: one emoji, read verbatim so the output matches the file byte
// for byte (no added newline, no added whitespace).
const emoji = readFileSync(join(repoRoot, "emoji.txt"), "utf8");

const outDir = process.env.MAKEFUN_BOT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR;
if (outDir === undefined || outDir === "") {
  throw new Error("Set MAKEFUN_BOT_DIR or MAKEFUN_OUTPUT_DIR to the output directory.");
}

mkdirSync(outDir, { recursive: true });

// The entry output: one file holding exactly the emoji from emoji.txt.
const OUTPUT_FILE = "output.txt";
writeFileSync(join(outDir, OUTPUT_FILE), emoji, "utf8");
