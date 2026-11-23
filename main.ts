// One-Star Review of Something Essential (make.fun).
// Writes one deadpan one-star review — a single line of 1-160 UTF-8
// characters — to <output dir>/entry.txt, where the output dir is
// $MAKEFUN_OUTPUT_DIR when the harness sets it, else /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "Sleep takes eight hours a night, every night, and I still wake up owing it more.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

const chars = [...REVIEW];
if (chars.length < 1 || chars.length > 160) {
  throw new Error(`review must be 1-160 characters, got ${chars.length}`);
}
if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
  throw new Error("review must be a single line");
}
if (REVIEW.trim().length === 0) {
  throw new Error("review must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, REVIEW, "utf8");
console.log(`wrote ${chars.length} characters to ${outFile}`);
