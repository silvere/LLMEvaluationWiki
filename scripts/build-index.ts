/**
 * build-index.ts
 * 扫描 wiki/ 所有 markdown，重建 index.md
 * 用法: npm run build-index
 * AI 禁止直接编辑 index.md，必须通过此脚本生成。
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const WIKI_DIR = join(ROOT, "wiki");
const INDEX_PATH = join(WIKI_DIR, "index.md");
const TODAY = new Date().toISOString().split("T")[0];

interface PageMeta {
  title: string;
  type: string;
  file: string;
  confidence: string;
  status?: string;
  domain?: string[];
  year?: number;
  publish: boolean;
}

function extractFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try { return yaml.load(match[1]) as Record<string, unknown>; }
  catch { return null; }
}

function walkDir(dir: string): string[] {
  const results: string[] = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) results.push(...walkDir(full));
      else if (entry.endsWith(".md") && entry !== ".gitkeep") results.push(full);
    }
  } catch { /* ignore */ }
  return results;
}

const TYPE_ORDER = ["benchmark", "concept", "tool", "leaderboard", "entity", "source", "synthesis", "industry"];
const TYPE_LABELS: Record<string, string> = {
  benchmark:   "benchmarks/ — 评测集",
  concept:     "concepts/ — 概念与方法",
  tool:        "tools/ — 评测工具链",
  leaderboard: "leaderboards/ — 榜单",
  entity:      "entities/ — 机构与人物",
  source:      "sources/ — 原始文献摘要",
  synthesis:   "synthesis/ — 综合分析",
  industry:    "industry/ — 行业垂类",
};

// §7 校验：wiki/synthesis/ 下不允许存在 sources 为空的页面
const SYNTHESIS_DIR = join(WIKI_DIR, "synthesis");
let synthViolations = 0;
try {
  for (const f of walkDir(SYNTHESIS_DIR)) {
    const fm = extractFrontmatter(readFileSync(f, "utf-8"));
    if (!fm) continue;
    const sources = fm["sources"];
    if (!Array.isArray(sources) || sources.length === 0) {
      console.error(`❌ synthesis 页面缺少 sources：${f}`);
      synthViolations++;
    }
  }
} catch { /* synthesis dir may not exist */ }
if (synthViolations > 0) {
  console.error(`\n⛔ build-index 中止：${synthViolations} 篇 synthesis 页面违反 §7（sources 为空）。`);
  console.error("   请补充 sources 引用，或将文件移至 private/synthesis-draft/。");
  process.exit(1);
}

const pages: PageMeta[] = [];
for (const f of walkDir(WIKI_DIR)) {
  const content = readFileSync(f, "utf-8");
  const fm = extractFrontmatter(content);
  if (!fm) continue;
  const rel = relative(ROOT, f);
  pages.push({
    title:      String(fm["title"] ?? rel),
    type:       String(fm["type"] ?? "unknown"),
    file:       rel,
    confidence: String(fm["confidence"] ?? "draft"),
    status:     fm["status"] ? String(fm["status"]) : undefined,
    domain:     Array.isArray(fm["domain"]) ? (fm["domain"] as string[]) : undefined,
    year:       fm["year"] ? Number(fm["year"]) : undefined,
    publish:    fm["publish"] === true,
  });
}

const grouped: Record<string, PageMeta[]> = {};
for (const t of TYPE_ORDER) grouped[t] = [];
for (const p of pages) {
  if (grouped[p.type]) grouped[p.type].push(p);
}
for (const key of Object.keys(grouped)) {
  grouped[key].sort((a, b) => a.title.localeCompare(b.title, "zh-CN"));
}

const counts: Record<string, number> = {};
let total = 0;
for (const t of TYPE_ORDER) { counts[t] = grouped[t].length; total += grouped[t].length; }

const lines: string[] = [];
lines.push(`---
title: LLMEvaluationWiki 全量索引
type: index
publish: true
last_generated: ${TODAY}
---

# LLMEvaluationWiki 索引

> ⚠️ 本文件由 \`scripts/build-index.ts\` 自动生成，**请勿手动编辑**。
> 每次 \`/ingest\` 操作完成后会自动重建。上次生成：${TODAY}

---

## 统计

| 类别 | 页数 |
|------|------|`);

for (const t of TYPE_ORDER) lines.push(`| ${t} | ${counts[t]} |`);
lines.push(`| **合计** | **${total}** |`, "");

for (const t of TYPE_ORDER) {
  lines.push(`---\n\n## ${TYPE_LABELS[t]}\n`);
  if (grouped[t].length === 0) { lines.push("*（尚无内容）*\n"); continue; }
  for (const p of grouped[t]) {
    const cb = p.confidence === "draft" ? " `draft`" : p.confidence === "promoted" ? " `promoted`" : "";
    const sb = p.status && p.status !== "active" ? ` \`${p.status}\`` : "";
    const db = p.domain?.slice(0, 3).join(", ") ?? "";
    const yb = p.year ? ` (${p.year})` : "";
    const slug = p.file.replace(/\.md$/, "").split("/").pop() ?? p.title;
    const wikilink = slug === p.title ? `[[${slug}]]` : `[[${slug}|${p.title}]]`;
    lines.push(`- ${wikilink}${cb}${sb}${db ? " · " + db : ""}${yb}`);
  }
  lines.push("");
}

writeFileSync(INDEX_PATH, lines.join("\n"), "utf-8");
console.log(`✅ index.md 已重建：${total} 个页面（${TODAY}）`);
for (const t of TYPE_ORDER) {
  if (counts[t] > 0) console.log(`   ${t}: ${counts[t]}`);
}
