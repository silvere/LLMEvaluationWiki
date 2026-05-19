#!/usr/bin/env tsx
/**
 * build-synthesis-tables.ts
 *
 * 跨页 aggregation：扫 wiki/benchmarks/*.md 的 frontmatter，按 domain 分组渲染
 * 横向对比表，插入到 wiki/synthesis/*.md 的命名 marker 区块。
 *
 * 与 inject-sota-table.ts 不同：那个是单页 in-place 渲染；本脚本是**跨页聚合**。
 *
 * 用法：
 *   npx tsx scripts/build-synthesis-tables.ts             # 全量
 *   npx tsx scripts/build-synthesis-tables.ts --dry-run   # 预览
 *
 * Marker 语法：
 *   <!-- AUTO-SYN-TABLE:domain=math:START -->
 *   ...自动生成...
 *   <!-- AUTO-SYN-TABLE:domain=math:END -->
 *
 * Domain 当前支持：math / code / safety / multimodal / long-context / agent / knowledge / chinese
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const DRY = process.argv.includes("--dry-run") || process.argv.includes("--dry");

interface SotaEntry { score: string; model: string; harness?: string | null; notes?: string; }
interface BenchFM {
  title?: string;
  type?: string;
  domain?: string | string[];
  size?: number | string;
  year?: number | string;
  arxiv_id?: string;
  saturation_status?: string;
  evaluation_protocol?: { default_shots?: string; default_cot?: boolean; scoring?: string; tool_use?: boolean };
  pitfalls?: string[];
  sota?: SotaEntry[];
  [k: string]: unknown;
}

interface BenchRow {
  slug: string;
  title: string;
  domains: string[];
  size?: number | string;
  year?: number | string;
  arxiv?: string;
  saturation: string;
  shots: string;
  scoring: string;
  topSota?: SotaEntry;
  firstPitfall?: string;
  fmHasSota: boolean;
  fmHasPitfalls: boolean;
}

const DOMAIN_GROUPS: Record<string, { match: string[]; title: string; ordering?: number }> = {
  math: { match: ["math"], title: "数学评测", ordering: 1 },
  code: { match: ["code"], title: "代码评测", ordering: 2 },
  agent: { match: ["agent"], title: "Agent 评测", ordering: 3 },
  safety: { match: ["safety"], title: "安全 / red-team 评测", ordering: 4 },
  multimodal: { match: ["multimodal", "vision", "video"], title: "多模态评测", ordering: 5 },
  "long-context": { match: ["long-context"], title: "长上下文评测", ordering: 6 },
  knowledge: { match: ["knowledge"], title: "知识 / 综合评测", ordering: 7 },
  science: { match: ["science"], title: "科学评测", ordering: 8 },
};

function parseFM(content: string): BenchFM | null {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  try { return (yaml.load(m[1]) as BenchFM) ?? null; } catch { return null; }
}

function normDomains(d?: string | string[]): string[] {
  if (!d) return [];
  if (typeof d === "string") return [d.trim().toLowerCase()];
  return d.map(x => String(x).trim().toLowerCase());
}

function loadBenchmarks(): BenchRow[] {
  const files = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
  const rows: BenchRow[] = [];
  for (const fp of files) {
    const c = readFileSync(fp, "utf8");
    const fm = parseFM(c);
    if (!fm) continue;
    const slug = fp.split("/").pop()!.replace(/\.md$/, "");
    const title = fm.title ?? slug;
    const domains = normDomains(fm.domain);
    rows.push({
      slug,
      title,
      domains,
      size: fm.size,
      year: fm.year,
      arxiv: fm.arxiv_id ? String(fm.arxiv_id) : undefined,
      saturation: fm.saturation_status ?? "—",
      shots: fm.evaluation_protocol?.default_shots ?? "—",
      scoring: fm.evaluation_protocol?.scoring ?? "—",
      topSota: Array.isArray(fm.sota) && fm.sota.length > 0 ? fm.sota[0] : undefined,
      firstPitfall: Array.isArray(fm.pitfalls) && fm.pitfalls.length > 0 ? fm.pitfalls[0] : undefined,
      fmHasSota: Array.isArray(fm.sota) && fm.sota.length > 0,
      fmHasPitfalls: Array.isArray(fm.pitfalls) && fm.pitfalls.length > 0,
    });
  }
  return rows;
}

function rowsForDomain(all: BenchRow[], domainKey: string): BenchRow[] {
  const group = DOMAIN_GROUPS[domainKey];
  if (!group) return [];
  return all.filter(r => r.domains.some(d => group.match.includes(d)));
}

function statusBadge(s: string): string {
  if (s === "saturated") return "🔴 saturated";
  if (s === "active") return "🟢 active";
  if (s === "deprecated") return "⚫ deprecated";
  return s;
}

function truncate(s: string | undefined, n: number): string {
  if (!s) return "—";
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

function renderTable(domainKey: string, rows: BenchRow[]): string {
  const group = DOMAIN_GROUPS[domainKey];
  const sorted = [...rows].sort((a, b) => {
    const fmA = a.fmHasSota ? 0 : 1;
    const fmB = b.fmHasSota ? 0 : 1;
    if (fmA !== fmB) return fmA - fmB;
    return a.title.localeCompare(b.title);
  });
  const head = "| Benchmark | 题量 | 年份 | 评测协议 | 当前 SOTA | Saturation | 主要 Pitfall |";
  const sep = "|---|---|---|---|---|---|---|";
  const body = sorted.map(r => {
    const protocol = r.shots !== "—" ? `${r.shots} / ${truncate(r.scoring, 30)}` : truncate(r.scoring, 30);
    const sota = r.topSota ? `${r.topSota.score}（${r.topSota.model}）` : "—";
    return `| [[${r.slug}|${r.title}]] | ${r.size ?? "—"} | ${r.year ?? "—"} | ${protocol} | ${sota} | ${statusBadge(r.saturation)} | ${truncate(r.firstPitfall, 80)} |`;
  }).join("\n");
  return [
    `<!-- AUTO-SYN-TABLE:domain=${domainKey}:START -->`,
    "",
    `## ${group.title}横向对比（自动生成）`,
    "",
    "> 由 `scripts/build-synthesis-tables.ts` 从各 benchmark 单页 frontmatter 自动聚合。**维护方式：改各 benchmark 页 frontmatter，不要手改本表。**",
    "",
    head,
    sep,
    body,
    "",
    `_共 ${sorted.length} 个 benchmark，最后更新：${new Date().toISOString().split("T")[0]}_`,
    "",
    `<!-- AUTO-SYN-TABLE:domain=${domainKey}:END -->`,
  ].join("\n");
}

function injectBlock(content: string, domainKey: string, block: string): { content: string; changed: boolean } {
  const startTag = `<!-- AUTO-SYN-TABLE:domain=${domainKey}:START -->`;
  const endTag = `<!-- AUTO-SYN-TABLE:domain=${domainKey}:END -->`;
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`${escape(startTag)}[\\s\\S]*?${escape(endTag)}`, "m");
  if (re.test(content)) {
    return { content: content.replace(re, block), changed: true };
  }
  return { content, changed: false };
}

function processFile(fp: string, allBenchmarks: BenchRow[]): { changed: boolean; injectedDomains: string[] } {
  const content = readFileSync(fp, "utf8");
  let newContent = content;
  const injected: string[] = [];
  for (const domainKey of Object.keys(DOMAIN_GROUPS)) {
    const startTag = `<!-- AUTO-SYN-TABLE:domain=${domainKey}:START -->`;
    if (!newContent.includes(startTag)) continue;
    const rows = rowsForDomain(allBenchmarks, domainKey);
    if (rows.length === 0) continue;
    const block = renderTable(domainKey, rows);
    const res = injectBlock(newContent, domainKey, block);
    if (res.changed) {
      newContent = res.content;
      injected.push(domainKey);
    }
  }
  const changed = newContent !== content;
  if (changed && !DRY) writeFileSync(fp, newContent);
  return { changed, injectedDomains: injected };
}

const benchmarks = loadBenchmarks();
const synthesisFiles = glob("wiki/synthesis/*.md", { cwd: ROOT, absolute: true });

console.log(`📊 扫到 ${benchmarks.length} 个 benchmark / ${synthesisFiles.length} 个 synthesis`);
const fmWithSota = benchmarks.filter(b => b.fmHasSota).length;
const fmWithPitfalls = benchmarks.filter(b => b.fmHasPitfalls).length;
console.log(`   有 sota frontmatter：${fmWithSota} / 有 pitfalls frontmatter：${fmWithPitfalls}`);

let totalChanged = 0;
for (const fp of synthesisFiles) {
  const { changed, injectedDomains } = processFile(fp, benchmarks);
  if (changed) {
    totalChanged++;
    console.log(`✅ ${fp.split("/").pop()}: 填充 ${injectedDomains.join(", ")}${DRY ? " (dry-run)" : ""}`);
  }
}
console.log(`\n总更新: ${totalChanged} 个 synthesis 文件${DRY ? "（dry-run）" : ""}`);
