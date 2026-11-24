// Local validation for the warning-label entry.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { ENTRY, MAX_CHARS, validateEntry } from "./main.mjs";

test("entry is a single line of 1-160 characters", () => {
  assert.equal(validateEntry(ENTRY).length, 0, validateEntry(ENTRY).join("; "));
  assert.ok(ENTRY.length >= 1 && ENTRY.length <= MAX_CHARS, `length ${ENTRY.length}`);
  assert.ok(!ENTRY.includes("\n"), "no newline inside the entry");
});

test("entry reads like a printed warning label for humans", () => {
  assert.match(ENTRY, /^WARNING: This human/);
  assert.match(ENTRY, /2013\.$/, "the punch lands in the last few words");
});

test("output file matches the entry", () => {
  const out = "/output/entry.txt";
  assert.ok(existsSync(out), "run `node main.mjs` first so /output/entry.txt exists");
  assert.equal(readFileSync(out, "utf8").trim(), ENTRY);
});
