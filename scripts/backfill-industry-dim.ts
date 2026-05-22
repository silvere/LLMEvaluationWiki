#!/usr/bin/env tsx
/**
 * backfill-industry-dim.ts
 *
 * 给 wiki/industry/*.md 批量补 frontmatter `dimension: dom` + `subdimension`（按文件名映射）
 * 用法：npx tsx scripts/backfill-industry-dim.ts
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const INDUSTRY_DIR = join(ROOT, "wiki", "industry");

const KEYWORD_MAP: Array<[RegExp, string]> = [
  [/medical|drug|biology|chemistry/i, "medical"],
  [/legal|patent|compliance/i, "legal"],
  [/financial|finance/i, "finance"],
  [/education|language-learning|academic/i, "education"],
  [/scientific|^science|math-olympiad|physic|^social-science/i, "scientific"],
];

function inferSubdim(name: string): string | null {
  for (const [re, sub] of KEYWORD_MAP) {
    if (re.test(name)) return sub;
  }
  return null;
}

const FM_RE = /^---\n([\s\S]*?)\n---/;

function patchFrontmatter(raw: string, newFields: Record<string, string>): string {
  const m = raw.match(FM_RE);
  if (!m) {
    // 没有 frontmatter，加一个
    const fmStr = yaml.dump(newFields).trimEnd();
    return `---\n${fmStr}\n---\n${raw}`;
  }
  const fmStr = m[1];
  const fm = (yaml.load(fmStr) || {}) as Record<string, unknown>;
  let changed = false;
  for (const [k, v] of Object.entries(newFields)) {
    if (fm[k] !== v) {
      fm[k] = v;
      changed = true;
    }
  }
  if (!changed) return raw;
  const newFmStr = yaml.dump(fm).trimEnd();
  return raw.replace(FM_RE, `---\n${newFmStr}\n---`);
}

let updated = 0;
let skipped = 0;
const log: string[] = [];

for (const f of readdirSync(INDUSTRY_DIR)) {
  if (!f.endsWith(".md")) continue;
  const fp = join(INDUSTRY_DIR, f);
  const raw = readFileSync(fp, "utf8");
  const m = raw.match(FM_RE);
  const fm = m ? (yaml.load(m[1]) || {}) as Record<string, unknown> : {};

  if (fm.dimension === "dom") {
    skipped++;
    continue;
  }

  const fields: Record<string, string> = { dimension: "dom" };
  const sub = inferSubdim(f);
  if (sub && !fm.subdimension) {
    fields.subdimension = sub;
  }

  const next = patchFrontmatter(raw, fields);
  if (next !== raw) {
    writeFileSync(fp, next);
    log.push(`✓ ${f}${sub ? ` → ${sub}` : ""}`);
    updated++;
  } else {
    skipped++;
  }
}

console.log(log.join("\n"));
console.log(`\nDone: ${updated} updated, ${skipped} skipped`);
