/**
 * lint-wiki.ts
 * 检查 wiki/ 内容质量
 * 用法: npm run lint
 *
 * A. 矛盾（benchmark status 多页不一致）
 * B. 过时（last_verified > 90 天）
 * C. 孤儿页（无入链）
 * G. Frontmatter 错误
 * H. 死链（外部 URL）
 * I. Draft 积压（> 20 篇）
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const WIKI_DIR = join(ROOT, "wiki");
const TODAY = new Date();
const STALE_DAYS = 90;

function extractFrontmatter(content: string): Record<string, unknown> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try { return yaml.load(match[1]) as Record<string, unknown>; }
  catch { return null; }
}

function daysSince(dateStr: string): number {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return -1;
  return Math.floor((TODAY.getTime() - d.getTime()) / 86400000);
}

function extractWikilinks(content: string): string[] {
  return [...content.matchAll(/\[\[([^\]|#]+?)(?:[|#][^\]]*?)?\]\]/g)].map(m => m[1].trim());
}

function extractExternalUrls(content: string): string[] {
  return [...content.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)].map(m => m[1]);
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

// ── Collect pages ──────────────────────────────────────────────────────────

interface PageInfo {
  file: string;
  title: string;
  type: string;
  confidence: string;
  last_verified: string;
  status?: string;
  fm: Record<string, unknown>;
  inlinks: string[];
  wikilinks: string[];
  urls: string[];
}

const pages = new Map<string, PageInfo>();

for (const f of walkDir(WIKI_DIR)) {
  const content = readFileSync(f, "utf-8");
  const fm = extractFrontmatter(content);
  if (!fm) continue;
  const title = String(fm["title"] ?? "");
  if (!title) continue;
  pages.set(title.toLowerCase(), {
    file: relative(ROOT, f),
    title,
    type: String(fm["type"] ?? ""),
    confidence: String(fm["confidence"] ?? "draft"),
    last_verified: String(fm["last_verified"] ?? ""),
    status: fm["status"] ? String(fm["status"]) : undefined,
    fm,
    inlinks: [],
    wikilinks: extractWikilinks(content),
    urls: extractExternalUrls(content),
  });
}

for (const [, page] of pages) {
  for (const link of page.wikilinks) {
    const target = pages.get(link.toLowerCase());
    if (target) target.inlinks.push(page.title);
  }
}

// ── Lint Rules ─────────────────────────────────────────────────────────────

interface LintIssue { type: "error" | "warning"; rule: string; file: string; message: string; }
const issues: LintIssue[] = [];
const add = (type: "error" | "warning", rule: string, file: string, message: string) =>
  issues.push({ type, rule, file, message });

const VALID_TYPES = new Set(["benchmark", "concept", "tool", "leaderboard", "entity", "source", "synthesis", "industry"]);
const VALID_STATUS_SET = new Set(["active", "saturated", "contaminated", "deprecated"]);
const VALID_AUTHOR_MODE = new Set(["llm", "human", "mixed"]);
const VALID_CONFIDENCE = new Set(["draft", "verified", "promoted"]);
const COMMON_REQUIRED = ["title", "type", "publish", "author_mode", "confidence", "as_of_date", "last_verified"];

// A: Contradictions
const benchmarkStatus = new Map<string, { status: string; file: string }[]>();
for (const [, p] of pages) {
  if (p.type !== "benchmark") continue;
  if (!benchmarkStatus.has(p.title.toLowerCase())) benchmarkStatus.set(p.title.toLowerCase(), []);
  if (p.status) benchmarkStatus.get(p.title.toLowerCase())!.push({ status: p.status, file: p.file });
}
for (const [name, entries] of benchmarkStatus) {
  const statuses = new Set(entries.map(e => e.status));
  if (statuses.size > 1)
    add("error", "A-contradiction", entries[0].file, `benchmark "${name}" 在多页 status 不一致: ${entries.map(e => `${e.file}(${e.status})`).join(", ")}`);
}

// B: Stale
for (const [, p] of pages) {
  const days = daysSince(p.last_verified);
  if (days > STALE_DAYS)
    add("warning", "B-stale", p.file, `last_verified 已 ${days} 天（${p.last_verified}），超过 90 天`);
}

// C: Orphan
for (const [, p] of pages) {
  if (p.type === "source") continue;
  if (p.inlinks.length === 0)
    add("warning", "C-orphan", p.file, `孤儿页：无其他页面引用此页`);
}

// G: Frontmatter
for (const [, p] of pages) {
  if (!VALID_TYPES.has(p.type)) add("error", "G-schema", p.file, `type 非法: "${p.type}"`);
  for (const field of COMMON_REQUIRED) {
    if (!p.fm[field] && p.fm[field] !== false) add("error", "G-schema", p.file, `缺少必填字段: ${field}`);
  }
  if (p.fm["author_mode"] && !VALID_AUTHOR_MODE.has(String(p.fm["author_mode"])))
    add("error", "G-schema", p.file, `author_mode 非法: "${p.fm["author_mode"]}"`);
  if (p.fm["confidence"] && !VALID_CONFIDENCE.has(String(p.fm["confidence"])))
    add("error", "G-schema", p.file, `confidence 非法: "${p.fm["confidence"]}"`);
  if (p.type === "benchmark" && p.fm["status"] && !VALID_STATUS_SET.has(String(p.fm["status"])))
    add("error", "G-schema", p.file, `status 非法: "${p.fm["status"]}"`);
}

// I: Draft backlog
const draftCount = [...pages.values()].filter(p => p.confidence === "draft").length;
if (draftCount > 20)
  add("warning", "I-draft-backlog", "wiki/", `draft 积压：${draftCount} 篇 > 20 阈值，请优先审稿`);

// J: 空 bullet — `- ` 后无内容（Session G 死链清零留下的占位符模式）
for (const [, p] of pages) {
  const content = readFileSync(join(ROOT, p.file), "utf-8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (/^- *$/.test(lines[i])) {
      add("error", "J-empty-bullet", p.file, `空 bullet（行 ${i + 1}）—— 删除该行或填入内容`);
    }
  }
}

// H: Dead links (async, check up to 20 URLs)
const urlsToCheck: { url: string; file: string }[] = [];
for (const [, p] of pages) {
  for (const url of p.urls.slice(0, 3)) urlsToCheck.push({ url, file: p.file });
}

if (urlsToCheck.length > 0) {
  console.log(`🔍 检查 ${Math.min(urlsToCheck.length, 20)} 个外部链接...`);
  const results = await Promise.allSettled(
    urlsToCheck.slice(0, 20).map(async ({ url, file }) => {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 8000);
        const res = await fetch(url, { method: "HEAD", signal: ctrl.signal, redirect: "follow" });
        clearTimeout(t);
        return { url, file, ok: res.ok, status: res.status };
      } catch {
        return { url, file, ok: false, status: 0 };
      }
    })
  );
  for (const r of results) {
    if (r.status === "fulfilled" && !r.value.ok)
      add("warning", "H-deadlink", r.value.file, `外部链接不可达 (HTTP ${r.value.status}): ${r.value.url}`);
  }
}

// ── Output ─────────────────────────────────────────────────────────────────

const errors = issues.filter(i => i.type === "error");
const warnings = issues.filter(i => i.type === "warning");

if (errors.length > 0) {
  console.log("\n❌ 错误（必须修复）：");
  for (const e of errors) console.log(`  [${e.rule}] ${e.file}\n    ${e.message}`);
}
if (warnings.length > 0) {
  console.log("\n⚠️  警告：");
  for (const w of warnings) console.log(`  [${w.rule}] ${w.file}\n    ${w.message}`);
}

console.log("\n" + "─".repeat(60));
console.log(`扫描: ${pages.size} 页 | 错误: ${errors.length} | 警告: ${warnings.length} | Draft: ${draftCount}`);
if (errors.length > 0) { console.log("❌ lint 未通过"); process.exit(1); }
else if (issues.length === 0) console.log("✅ lint 全部通过");
else console.log("✅ 无硬性错误（有警告）");
