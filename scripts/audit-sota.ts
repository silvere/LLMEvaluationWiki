/**
 * audit-sota.ts
 *
 * 扫描 wiki/benchmarks/*.md 的 frontmatter `sota` 字段，输出数据质量问题清单：
 *   - 无 source URL
 *   - 无 date 时间戳
 *   - score 含"约/待更新"等模糊词
 *   - 排序异常（按数字降序应该有序但断裂）
 *   - 2026 frontier 模型覆盖不足
 *   - 无 with_tools 字段标注（agent benchmark 必须）
 *
 * 用法:
 *   npx tsx scripts/audit-sota.ts            # 控制台输出
 *   npx tsx scripts/audit-sota.ts --json     # JSON 格式输出
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

interface SotaEntry {
  score?: string;
  model?: string;
  harness?: string | null;
  with_tools?: boolean | null;
  date?: string;
  source?: string;
  notes?: string;
}

const FRONTIER_2026 = new Set([
  "GPT-5.5", "GPT-5", "Gemini-3.1-Pro", "Gemini-3-Flash",
  "Claude-Opus-4.7", "Claude-Sonnet-4.6", "Claude-Haiku-4.5",
  "DeepSeek-V4-Pro", "DeepSeek-V4-Flash",
  "GLM-5", "GLM-5.1", "Kimi-K2.6", "Kimi-K2.5", "Qwen3.6", "Qwen3.5",
  "Doubao-Seed-2.0", "Grok-4.3",
]);

function parseScore(s: string | undefined): number {
  if (!s) return NaN;
  const m = String(s).match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : NaN;
}

interface Audit {
  benchmark: string;
  sotaCount: number;
  issues: string[];
}

const files = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
const audits: Audit[] = [];
let totalWithSota = 0;
const aggregate = {
  no_source: 0, no_date: 0, vague_score: 0, no_with_tools: 0,
  order_anomaly: 0, frontier_missing: 0,
};

for (const f of files) {
  const text = readFileSync(f, "utf-8");
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) continue;
  let fm: { sota?: SotaEntry[]; dimension?: string };
  try { fm = (yaml.load(m[1]) as { sota?: SotaEntry[]; dimension?: string }) ?? {}; } catch { continue; }
  const sota = Array.isArray(fm.sota) ? fm.sota : [];
  if (sota.length === 0) continue;
  totalWithSota++;
  const bench = f.split("/").pop()!.replace(/\.md$/, "");
  // dimension F (visual gen) and G (audio gen) use T2V/T2I/audio models, not chat LLMs
  const skipFrontier = fm.dimension === "F" || fm.dimension === "G";
  const issues: string[] = [];

  const hasSource = sota.some((e) => e.source);
  const hasDate = sota.some((e) => e.date);
  const hasToolsFlag = sota.some((e) => e.with_tools !== undefined && e.with_tools !== null);
  const vague = sota.filter((e) => /(约|待更新|TBD)/.test(String(e.score ?? ""))).length;

  if (!hasSource) { issues.push("no_source"); aggregate.no_source++; }
  if (!hasDate) { issues.push("no_date"); aggregate.no_date++; }
  if (!hasToolsFlag) { issues.push("no_with_tools"); aggregate.no_with_tools++; }
  if (vague > 0) { issues.push(`vague×${vague}`); aggregate.vague_score++; }

  // 排序异常检测
  const nums = sota.slice(0, 8).map((e) => parseScore(e.score)).filter((n) => !isNaN(n));
  if (nums.length >= 3) {
    const out = nums.reduce((acc, n, i) => acc + (i > 0 && nums[i - 1] < n ? 1 : 0), 0);
    if (out > 0) { issues.push("order_anomaly"); aggregate.order_anomaly++; }
  }

  // frontier 覆盖（dimension F/G 为视频/音频生成模型，跳过 LLM frontier 检查）
  if (!skipFrontier) {
    const models = new Set(sota.map((e) => e.model ?? ""));
    const hit = [...models].filter((x) => FRONTIER_2026.has(x)).length;
    if (hit < 2) { issues.push(`frontier_${hit}/17`); aggregate.frontier_missing++; }
  }

  if (issues.length > 0) audits.push({ benchmark: bench, sotaCount: sota.length, issues });
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ total: totalWithSota, aggregate, audits }, null, 2));
} else {
  console.log(`=== sota 数据质量审计（${totalWithSota} 个 benchmark 有 sota 字段）===\n`);
  console.log("聚合统计:");
  for (const [k, v] of Object.entries(aggregate)) {
    const pct = totalWithSota ? Math.round((v * 100) / totalWithSota) : 0;
    console.log(`  ${k}: ${v}/${totalWithSota} (${pct}%)`);
  }
  console.log(`\n=== 待修清单 ===`);
  for (const a of audits) {
    console.log(`  ${a.benchmark.padEnd(28)} sota=${a.sotaCount}  issues: ${a.issues.join(", ")}`);
  }
  if (audits.length === 0) console.log("  ✅ 全部健康");
}
