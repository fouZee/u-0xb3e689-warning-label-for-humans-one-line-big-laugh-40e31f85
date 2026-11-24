#!/usr/bin/env python3
"""Warning Label for Humans — one line, big laugh.
make.fun bounty: "Warning Label for Humans: One Line, Big Laugh"
(u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85)

The entrypoint. Writes the entry — a single-line safety warning label for
every human being, at most 160 characters — to /output/entry.txt and
validates it against the bounty gate before writing.
"""

import os
import sys

MAX_CHARS = 160

# The entry: a deadpan printed-label warning. The laugh lands in the last
# few words — the embarrassment is not from today, it is from 2013, and
# the human still has not recovered. The consequence is a whole day of
# silence, not a paused sentence: a bigger, truer, funnier malfunction.
ENTRY = (
    "WARNING: This human may suddenly go quiet for the rest of the day "
    "after remembering something embarrassing it did in 2013."
)


def validate_entry(line: str) -> list[str]:
    errors = []
    if not isinstance(line, str) or len(line) == 0:
        errors.append("entry is empty")
    if line.strip() == "":
        errors.append("entry is only whitespace")
    if "\n" in line or "\r" in line:
        errors.append("entry must be a single line")
    if len(line) > MAX_CHARS:
        errors.append(f"entry is {len(line)} characters, over the {MAX_CHARS} limit")
    if len(line) < 100:
        errors.append(f"entry is only {len(line)} characters, too short to use the whole line")
    if not line.startswith("WARNING:"):
        errors.append("entry must read like a printed warning label (start with WARNING:)")
    if line != line.strip():
        errors.append("entry has leading or trailing whitespace")
    return errors


def main(out_path: str = "/output/entry.txt") -> None:
    errors = validate_entry(ENTRY)
    if errors:
        raise SystemExit(f"invalid entry: {'; '.join(errors)}")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(ENTRY + "\n")
    print(f"wrote {len(ENTRY)}-character entry to {out_path}")
    print(ENTRY)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "/output/entry.txt")
