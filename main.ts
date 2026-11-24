// Fortune in a Pot — a single kind, funny fortune for the houseplant on
// the windowsill. Writes one line (113 chars, <=120) to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// The fortune is written for this plant in this window: the morning sun
// pauses at its leaves and stays for tea on the windowsill.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "On Thursday, the morning sun will pause at your leaves and stay for tea — your windowsill is its favourite table.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = ENTRY.trim();

if (entry.length < 1 || entry.length > 120) {
  console.error(`entry must be 1-120 chars, got ${entry.length}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry + "\n", "utf8");

// Read back and verify: the file must hold exactly the entry (plus newline).
const written = readFileSync(outPath, "utf8");
if (written !== entry + "\n") {
  console.error("entry.txt round-trip mismatch");
  process.exit(1);
}
console.log(`wrote entry.txt (${entry.length} chars)`);
