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

function validateReview(review: string): string[] {
  const chars = [...review];
  if (chars.length < 1 || chars.length > 160) {
    throw new Error(`review must be 1-160 characters, got ${chars.length}`);
  }
  if (review.includes("\n") || review.includes("\r")) {
    throw new Error("review must be a single line");
  }
  if (review.trim().length === 0) {
    throw new Error("review must not be only whitespace");
  }
  return chars;
}

const chars = validateReview(REVIEW);

function writeEntry(dir: string, file: string, text: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, text, "utf8");
}

writeEntry(outDir, outFile, REVIEW);
console.log(`wrote ${chars.length} characters to ${outFile}`);
