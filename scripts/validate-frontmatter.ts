/**
 * validate-frontmatter.ts
 * 校验 wiki/ 下所有 markdown 文件的 frontmatter
 * 用法: npm run validate
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const WIKI_DIR = join(ROOT, "wiki");

// ── Controlled Vocabulary ──────────────────────────────────────────────────

const VALID_TYPES = new Set([
  "benchmark", "concept", "tool", "leaderboard", "entity",
  "source", "paper", "model", "synthesis", "industry", "index",
]);
const VALID_STATUS = new Set(["active", "saturated", "contaminated", "deprecated"]);
const VALID_AUTHOR_MODE = new Set(["llm", "human", "mixed"]);
const VALID_CONFIDENCE = new Set(["draft", "verified", "promoted"]);
const VALID_DOMAINS = new Set([
  "knowledge", "reasoning", "math", "code", "long-context",
  "instruction-following", "multimodal", "safety", "hallucination",
  "bias-fairness", "efficiency", "retrieval", "agent", "multilingual",
  "dialog", "vision", "video", "audio", "science", "other",
]);
const VALID_SOURCE_TYPES = new Set([
  "paper", "blog", "report", "leaderboard-snapshot", "talk",
]);

// 必填字段（缺失 = error）。对齐 CLAUDE.md §3.3
const COMMON_REQUIRED = ["title", "type", "publish", "confidence", "as_of_date", "last_verified"];
const TYPE_REQUIRED: Record<string, string[]> = {
  benchmark:   [...COMMON_REQUIRED, "sources", "domain"],
  concept:     [...COMMON_REQUIRED, "sources"],
  tool:        [...COMMON_REQUIRED, "sources"],
  leaderboard: [...COMMON_REQUIRED, "sources"],
  entity:      [...COMMON_REQUIRED, "sources"],
  source:      [...COMMON_REQUIRED, "source_type", "url"],
  paper:       [...COMMON_REQUIRED, "sources"],
  model:       [...COMMON_REQUIRED, "sources", "developer"],
  synthesis:   [...COMMON_REQUIRED, "sources"],
  industry:    [...COMMON_REQUIRED, "sources"],
  index:       ["title", "type", "publish"],
};

// 推荐字段（缺失 = warn）。提升页面元信息丰富度但不阻塞
const TYPE_RECOMMENDED: Record<string, string[]> = {
  benchmark:   ["author_mode", "language", "year", "status"],
  concept:     ["author_mode"],
  tool:        ["author_mode"],
  leaderboard: ["author_mode"],
  entity:      ["author_mode"],
  source:      ["author_mode", "ingested", "discusses"],
  paper:       ["author_mode", "arxiv_id"],
  model:       ["author_mode", "release_date"],
  synthesis:   ["author_mode"],
  industry:    ["author_mode"],
};

// ── Helpers ────────────────────────────────────────────────────────────────

function extractFrontmatter(content: string): { fm: Record<string, unknown> | null; error?: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { fm: null, error: "缺少 frontmatter（---...---）" };
  try {
    const fm = yaml.load(match[1]) as Record<string, unknown>;
    return { fm };
  } catch (e) {
    return { fm: null, error: `frontmatter YAML 解析失败: ${e}` };
  }
}

function validateDate(val: unknown, field: string): string[] {
  if (typeof val !== "string") return [`${field} 必须是字符串日期（YYYY-MM-DD），实际: ${typeof val}`];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return [`${field} 格式错误，期望 YYYY-MM-DD，实际: ${val}`];
  return [];
}

function walkDir(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        results.push(...walkDir(fullPath));
      } else if (entry.endsWith(".md") && entry !== ".gitkeep") {
        results.push(fullPath);
      }
    }
  } catch { /* ignore */ }
  return results;
}

// ── Validate ───────────────────────────────────────────────────────────────

interface ValidationResult {
  file: string;
  errors: string[];
  warnings: string[];
}

function validateFile(filePath: string, content: string): ValidationResult {
  const rel = relative(ROOT, filePath);
  const result: ValidationResult = { file: rel, errors: [], warnings: [] };
  const { fm, error } = extractFrontmatter(content);

  if (!fm) {
    result.errors.push(error ?? "frontmatter 解析失败");
    return result;
  }

  const type = fm["type"] as string;
  if (!type) { result.errors.push("缺少必填字段: type"); return result; }
  if (!VALID_TYPES.has(type)) result.errors.push(`type 非法: "${type}"，允许值: ${[...VALID_TYPES].join(", ")}`);

  const required = TYPE_REQUIRED[type] ?? COMMON_REQUIRED;
  for (const field of required) {
    const val = fm[field];
    if (val === undefined || val === null || val === "") result.errors.push(`缺少必填字段: ${field}`);
  }

  const recommended = TYPE_RECOMMENDED[type] ?? [];
  for (const field of recommended) {
    const val = fm[field];
    if (val === undefined || val === null || val === "") result.warnings.push(`推荐字段缺失: ${field}`);
  }

  if (fm["author_mode"] && !VALID_AUTHOR_MODE.has(fm["author_mode"] as string))
    result.errors.push(`author_mode 非法: "${fm["author_mode"]}"，允许值: llm, human, mixed`);
  if (fm["confidence"] && !VALID_CONFIDENCE.has(fm["confidence"] as string))
    result.errors.push(`confidence 非法: "${fm["confidence"]}"，允许值: draft, verified, promoted`);
  if (type === "benchmark" && fm["status"] && !VALID_STATUS.has(fm["status"] as string))
    result.errors.push(`status 非法: "${fm["status"]}"，允许值: ${[...VALID_STATUS].join(", ")}`);
  if (type === "source" && fm["source_type"] && !VALID_SOURCE_TYPES.has(fm["source_type"] as string))
    result.errors.push(`source_type 非法: "${fm["source_type"]}"`);

  if (type === "benchmark" && fm["domain"]) {
    const domains = Array.isArray(fm["domain"]) ? fm["domain"] : [fm["domain"]];
    for (const d of domains) {
      if (!VALID_DOMAINS.has(d as string)) result.errors.push(`domain 非法: "${d}"`);
    }
  }

  for (const dateField of ["as_of_date", "last_verified", "ingested", "published"]) {
    if (fm[dateField] !== undefined) result.errors.push(...validateDate(fm[dateField], dateField));
  }

  if (fm["publish"] !== undefined && typeof fm["publish"] !== "boolean")
    result.errors.push(`publish 必须是 boolean，实际: ${typeof fm["publish"]}`);

  for (const listField of ["sources", "discusses"]) {
    if (fm[listField] !== undefined && !Array.isArray(fm[listField]))
      result.errors.push(`${listField} 必须是数组，实际: ${typeof fm[listField]}`);
  }

  // Warnings
  if (fm["confidence"] === "draft" && fm["author_mode"] === "human")
    result.warnings.push("human 写作的页面 confidence 建议至少为 verified");
  if (type === "benchmark" && !fm["arxiv_id"] && !fm["official_url"])
    result.warnings.push("benchmark 页建议提供 arxiv_id 或 official_url");

  return result;
}

// ── CLI Entry ──────────────────────────────────────────────────────────────

const files = walkDir(WIKI_DIR);
let totalFiles = 0, errorFiles = 0, totalErrors = 0, totalWarnings = 0;
const allResults: ValidationResult[] = [];

for (const f of files) {
  const content = readFileSync(f, "utf-8");
  const result = validateFile(f, content);
  allResults.push(result);
  totalFiles++;
  if (result.errors.length > 0) errorFiles++;
  totalErrors += result.errors.length;
  totalWarnings += result.warnings.length;
}

let hasOutput = false;
for (const r of allResults) {
  if (r.errors.length === 0 && r.warnings.length === 0) continue;
  hasOutput = true;
  console.log(`\n📄 ${r.file}`);
  for (const e of r.errors) console.log(`  ❌ ${e}`);
  for (const w of r.warnings) console.log(`  ⚠️  ${w}`);
}

console.log("\n" + "─".repeat(60));
console.log(`扫描: ${totalFiles} 文件 | 有错误: ${errorFiles} | 错误: ${totalErrors} | 警告: ${totalWarnings}`);
if (totalErrors > 0) {
  console.log("❌ frontmatter 校验失败");
  process.exit(1);
} else if (!hasOutput) {
  console.log("✅ 所有文件 frontmatter 校验通过");
}
