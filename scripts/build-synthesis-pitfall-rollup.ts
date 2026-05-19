#!/usr/bin/env tsx
/**
 * build-synthesis-pitfall-rollup.ts
 *
 * 扫所有 benchmark frontmatter 的 `pitfalls:` 数组，按关键词聚类后渲染到
 * wiki/synthesis/benchmark-pitfalls-cheatsheet.md 的 marker 区块。
 *
 * Marker：<!-- AUTO-PITFALL-ROLLUP:START -->...:END -->
 *
 * 用法:
 *   npx tsx scripts/build-synthesis-pitfall-rollup.ts
 *   npx tsx scripts/build-synthesis-pitfall-rollup.ts --dry-run
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const DRY = process.argv.includes("--dry-run") || process.argv.includes("--dry");

const START = "<!-- AUTO-PITFALL-ROLLUP:START -->";
const END = "<!-- AUTO-PITFALL-ROLLUP:END -->";

const CATEGORIES: { key: string; title: string; keywords: RegExp }[] = [
  { key: "contamination", title: "数据污染 / 训练泄漏", keywords: /污染|contamination|训练语料|训练数据|见过/i },
  { key: "saturation", title: "饱和 / 区分度", keywords: /饱和|saturat|区分度|无区分/i },
  { key: "subset-confusion", title: "子集 / variant 混淆", keywords: /variant|子集|混淆|Verified|Diamond|Pro|CF|Redux|不可对比|不可直接|MATH-500/i },
  { key: "position-bias", title: "选项位置偏差", keywords: /位置偏差|选项|偏好.*选项|A 位置|position bias|偏好 A/i },
  { key: "scaffold", title: "Scaffold / harness 敏感", keywords: /scaffold|harness|框架.*敏感|SWE-agent|OpenHands|Aider|Devin/i },
  { key: "sample-size", title: "题量小 / 统计方差", keywords: /题量|样本|方差|噪声|multi-seed|maj@|统计/i },
  { key: "protocol-default", title: "评测协议默认值分歧", keywords: /shot|CoT|strict|loose|协议.*分歧|默认.*shot/i },
  { key: "judge-bias", title: "Judge / 评测者偏差", keywords: /judge|偏好|length|长度|self-preference/i },
  { key: "tool-toggle", title: "工具 / 推理时增强开关", keywords: /工具|tool|RAG|self-consistency|best-of-N|inference-time/i },
  { key: "version-year", title: "版本 / 年份混淆", keywords: /年份|version|variant|时间窗|cutoff|发布日期/i },
];

interface Pitfall { text: string; sourceSlug: string; sourceTitle: string; }

function parseFM(content: string): Record<string, unknown> | null {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  try { return (yaml.load(m[1]) as Record<string, unknown>) ?? null; } catch { return null; }
}

const benchmarkFiles = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
const allPitfalls: Pitfall[] = [];
for (const fp of benchmarkFiles) {
  const c = readFileSync(fp, "utf8");
  const fm = parseFM(c);
  if (!fm) continue;
  const slug = fp.split("/").pop()!.replace(/\.md$/, "");
  const title = (fm.title as string) ?? slug;
  const pitfalls = fm.pitfalls;
  if (!Array.isArray(pitfalls)) continue;
  for (const p of pitfalls) {
    if (typeof p === "string" && p.trim().length > 0) {
      allPitfalls.push({ text: p.trim(), sourceSlug: slug, sourceTitle: title });
    }
  }
}

const buckets: Record<string, Pitfall[]> = {};
const uncategorized: Pitfall[] = [];
for (const p of allPitfalls) {
  let matched = false;
  for (const cat of CATEGORIES) {
    if (cat.keywords.test(p.text)) {
      buckets[cat.key] = buckets[cat.key] ?? [];
      buckets[cat.key].push(p);
      matched = true;
      break;
    }
  }
  if (!matched) uncategorized.push(p);
}

const lines: string[] = [START, ""];
lines.push("## Pitfall 跨页聚合（自动生成）");
lines.push("");
lines.push("> 由 `scripts/build-synthesis-pitfall-rollup.ts` 从各 benchmark 单页 frontmatter `pitfalls:` 字段聚合，按关键词聚类。**维护方式：改各 benchmark 页 frontmatter，不要手改本节。**");
lines.push("");
lines.push(`_扫描 ${benchmarkFiles.length} 个 benchmark，含 pitfalls 字段的 ${new Set(allPitfalls.map(p => p.sourceSlug)).size} 页，共 ${allPitfalls.length} 条 pitfall。_`);
lines.push("");

for (const cat of CATEGORIES) {
  const items = buckets[cat.key];
  if (!items || items.length === 0) continue;
  lines.push(`### ${cat.title}（${items.length} 条）`);
  lines.push("");
  for (const p of items) {
    lines.push(`- ${p.text}（[[${p.sourceSlug}|${p.sourceTitle}]]）`);
  }
  lines.push("");
}

if (uncategorized.length > 0) {
  lines.push(`### 其他（${uncategorized.length} 条，未归类）`);
  lines.push("");
  for (const p of uncategorized) {
    lines.push(`- ${p.text}（[[${p.sourceSlug}|${p.sourceTitle}]]）`);
  }
  lines.push("");
}

lines.push(`_最后更新：${new Date().toISOString().split("T")[0]}_`);
lines.push("");
lines.push(END);
const block = lines.join("\n");

const cheatsheet = join(ROOT, "wiki/synthesis/benchmark-pitfalls-cheatsheet.md");
const content = readFileSync(cheatsheet, "utf8");
const re = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "m");

let newContent: string;
let changed: boolean;
if (re.test(content)) {
  newContent = content.replace(re, block);
  changed = newContent !== content;
} else {
  newContent = content.trimEnd() + "\n\n" + block + "\n";
  changed = true;
}

if (changed && !DRY) writeFileSync(cheatsheet, newContent);
console.log(`📊 共 ${allPitfalls.length} 条 pitfall 聚合，归类 ${allPitfalls.length - uncategorized.length} 条，未归类 ${uncategorized.length} 条`);
console.log(`${changed ? "✅" : "ℹ️"} cheatsheet ${changed ? (DRY ? "would update (dry-run)" : "updated") : "no change"}`);
