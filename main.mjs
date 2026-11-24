// Warning Label for Humans — one line, big laugh.
// make.fun bounty: "Warning Label for Humans: One Line, Big Laugh"
// (u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85)
//
// The program writes the entry — a single-line safety warning label for
// every human being, at most 160 characters — to /output/entry.txt and
// validates it against the bounty gate before writing.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const MAX_CHARS = 160;

// The entry: a deadpan printed-label warning. The laugh lands in the last
// few words — the embarrassment is not from today, it is from 2013, and
// the human still has not recovered. The consequence is a whole day of
// silence, not a paused sentence: a bigger, truer, funnier malfunction.
export const ENTRY =
  "WARNING: This human may suddenly go quiet for the rest of the day after remembering something embarrassing it did in 2013.";

export function validateEntry(line) {
  const errors = [];
  if (typeof line !== "string" || line.length === 0) errors.push("entry is empty");
  if (line.trim().length === 0) errors.push("entry is only whitespace");
  if (line.includes("\n") || line.includes("\r")) errors.push("entry must be a single line");
  if (line.length > MAX_CHARS) errors.push(`entry is ${line.length} characters, over the ${MAX_CHARS} limit`);
  if (line.length < 100) errors.push(`entry is only ${line.length} characters, too short to use the whole line`);
  if (!/^WARNING:/.test(line)) errors.push("entry must read like a printed warning label (start with WARNING:)");
  if (line !== line.trim()) errors.push("entry has leading or trailing whitespace");
  return errors;
}

export function main(outPath = "/output/entry.txt") {
  const errors = validateEntry(ENTRY);
  if (errors.length > 0) {
    throw new Error(`invalid entry: ${errors.join("; ")}`);
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  console.log(`wrote ${ENTRY.length}-character entry to ${outPath}`);
  console.log(ENTRY);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv[2]);
}
