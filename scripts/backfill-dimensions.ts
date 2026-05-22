#!/usr/bin/env tsx
/**
 * backfill-dimensions.ts
 *
 * 给已有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 批量回填
 * `dimension:` frontmatter 字段，基于现有 `domain:` 字段做规则映射。
 *
 * 映射规则（CLAUDE.md §3.7）：
 *   domain → dimension
 *   ─────────────────────
 *   knowledge / reasoning              → A
 *   instruction-following / dialog     → B
 *   retrieval                          → C
 *   agent                              → D
 *   multimodal / vision / video        → E（理解）或 F（生成，含 'generation' 关键词）
 *   audio                              → G
 *   code                               → H
 *   safety / hallucination / bias-fairness → I
 *   multilingual + 中文 alias          → J
 *   long-context                       → long-ctx
 *   science                            → 不映射（多维度交叉，留空）
 *
 *   type 推断（domain 不足以判断时）:
 *     type: harness                    → A/harness（除非特殊）
 *     title 含 leaderboard / Arena     → A/leaderboard
 *
 * 用法:
 *   npx tsx scripts/backfill-dimensions.ts --dry-run    # 预览
 *   npx tsx scripts/backfill-dimensions.ts              # 写入
 *   npx tsx scripts/backfill-dimensions.ts --overwrite  # 即使已有 dimension 也覆盖
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const DRY = process.argv.includes("--dry-run") || process.argv.includes("--dry");
const OVERWRITE = process.argv.includes("--overwrite");

interface FM {
  title?: string;
  type?: string;
  domain?: string | string[];
  dimension?: string;
  [k: string]: unknown;
}

function parseFM(content: string): { fm: FM; fmRaw: string; body: string } | null {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return null;
  try {
    const fm = (yaml.load(m[1]) as FM) ?? {};
    return { fm, fmRaw: m[0], body: content.slice(m[0].length) };
  } catch { return null; }
}

function normDomains(d?: string | string[]): string[] {
  if (!d) return [];
  if (typeof d === "string") return [d.trim().toLowerCase()];
  return d.map(x => String(x).trim().toLowerCase());
}

function inferDimension(fm: FM): string | null {
  const domains = normDomains(fm.domain);
  const title = (fm.title ?? "").toLowerCase();
  const type = fm.type;

  // 顶层规则：type 提示
  if (type === "harness") return "A"; // harness 默认基座 A，特殊场景再人工改

  // domain 映射（按优先级，先匹配 long-ctx 因为是横切）
  if (domains.includes("long-context")) return "long-ctx";
  if (domains.includes("code")) return "H";
  if (domains.includes("agent")) return "D";
  if (domains.includes("audio")) return "G";
  if (domains.includes("safety") || domains.includes("hallucination") || domains.includes("bias-fairness")) return "I";
  if (domains.includes("retrieval")) return "C";
  if (domains.includes("multilingual") && /中文|chinese|c-eval|cmmlu|cmm-/.test(title)) return "J";

  // 多模态：判断生成 vs 理解
  if (domains.includes("multimodal") || domains.includes("vision") || domains.includes("video")) {
    if (/generat|t2i|t2v|i2v|vbench|geneval|imagen|pickscore|hps|imagereward|fid|fvd|hrs-bench|dpg-bench|drawbench|evalcrafter|musi|music|mjhq|stable.?diffusion|hpsv|sdxl/i.test(title)) return "F";
    return "E";
  }

  if (domains.includes("instruction-following") || domains.includes("dialog")) return "B";
  if (domains.includes("knowledge") || domains.includes("reasoning") || domains.includes("math")) return "A";

  // title 启发式
  if (/leaderboard|arena/i.test(title)) return "A";
  if (/judge|reward|panda|prometheus|themis|compassjudger|llmbar/i.test(title)) return "K";

  return null;
}

function inferSubdimension(fm: FM, dimension: string): string | null {
  const title = (fm.title ?? "").toLowerCase();
  const type = fm.type;

  if (dimension === "A") {
    if (type === "harness") return "harness";
    if (type === "leaderboard") return "leaderboard";
    if (type === "benchmark") return "benchmark";
  }
  if (dimension === "F") {
    if (/i2v/i.test(title)) return "I2V";
    if (/t2v|video.?gen/i.test(title)) return "T2V";
    if (/t2i|imagen|sd|stable.?diffusion|mjhq/i.test(title)) return "T2I";
    if (/pickscore|hps|imagereward|mps|preference/i.test(title)) return "preference";
    if (/\bfid\b|\bfvd\b|metric/i.test(title)) return "metric";
  }
  if (dimension === "D") {
    if (/web|gui|browser|android|mobile|os.?world|workarena/i.test(title)) return "web-gui";
    if (/swe|software|code.?agent|terminal/i.test(title)) return "software-eng";
    if (/tool|api.?bank|bfcl|nestful|xlam|stable.?toolbench/i.test(title)) return "tool-use";
    return "general";
  }
  if (dimension === "I") {
    if (/garak|pyrit|petri|giskard|red.?team/i.test(title)) return "red-team-tool";
    if (/jailbreak|advbench|harm/i.test(title)) return "jailbreak";
    if (/toxi|content.?safe/i.test(title)) return "content-safety";
    return "safety-benchmark";
  }
  if (dimension === "K") {
    if (/judgebench|rewardbench|llmbar/i.test(title)) return "judge-benchmark";
    if (/reward.?model/i.test(title)) return "reward-model";
    return "judge-model";
  }
  return null;
}

function injectDimension(fmRaw: string, dimension: string, subdimension: string | null): string {
  // 在 frontmatter 末尾的 --- 前插入字段，避免破坏 YAML 排序
  let inject = `dimension: ${dimension}`;
  if (subdimension) inject += `\nsubdimension: ${subdimension}`;
  // 已有 dimension：替换
  if (/^dimension:/m.test(fmRaw)) {
    fmRaw = fmRaw.replace(/^dimension:.*$/m, `dimension: ${dimension}`);
    if (subdimension) {
      if (/^subdimension:/m.test(fmRaw)) {
        fmRaw = fmRaw.replace(/^subdimension:.*$/m, `subdimension: ${subdimension}`);
      } else {
        fmRaw = fmRaw.replace(/^dimension:.*$/m, `dimension: ${dimension}\nsubdimension: ${subdimension}`);
      }
    }
    return fmRaw;
  }
  // 否则插在 closing --- 前
  return fmRaw.replace(/\n---\n?$/, `\n${inject}\n---\n`);
}

const targets = [
  ...glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true }),
  ...glob("wiki/tools/**/*.md", { cwd: ROOT, absolute: true }),
  ...glob("wiki/harnesses/*.md", { cwd: ROOT, absolute: true }),
  ...glob("wiki/leaderboards/*.md", { cwd: ROOT, absolute: true }),
];

let scanned = 0, written = 0, hasDim = 0, noInfer = 0;
const dimCount: Record<string, number> = {};

for (const fp of targets) {
  scanned++;
  const content = readFileSync(fp, "utf8");
  const parsed = parseFM(content);
  if (!parsed) continue;
  const { fm, fmRaw, body } = parsed;
  if (fm.dimension && !OVERWRITE) {
    hasDim++;
    dimCount[fm.dimension] = (dimCount[fm.dimension] ?? 0) + 1;
    continue;
  }
  const dim = inferDimension(fm);
  if (!dim) { noInfer++; continue; }
  const sub = inferSubdimension(fm, dim);
  dimCount[dim] = (dimCount[dim] ?? 0) + 1;
  const newFmRaw = injectDimension(fmRaw, dim, sub);
  if (!DRY) writeFileSync(fp, newFmRaw + body);
  written++;
}

console.log(`\n📊 扫描 ${scanned} 文件 | 已有 dimension: ${hasDim} | ${DRY ? "wouldWrite" : "written"}: ${written} | 无法推断: ${noInfer}`);
console.log("\n📈 dimension 分布:");
const sorted = Object.entries(dimCount).sort((a, b) => b[1] - a[1]);
for (const [d, n] of sorted) console.log(`  ${d}: ${n}`);
