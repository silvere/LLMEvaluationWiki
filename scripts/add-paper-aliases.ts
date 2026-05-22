#!/usr/bin/env tsx
/**
 * add-paper-aliases.ts
 *
 * 给本轮新建的 wiki/papers/*.md（arxiv ID 文件名）加 aliases，使 [[人类可读名]] wikilink 命中。
 * 用法：npx tsx scripts/add-paper-aliases.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

// arxiv_id → 别名列表
const PAPER_ALIASES: Record<string, string[]> = {
  "2506.01937": ["RewardBench 2", "RewardBench-2"],
  "2405.01535": ["Prometheus 2", "Prometheus-2", "Prometheus2"],
  "2412.06559": ["ProcessBench"],
  "2501.03124": ["PRMBench"],
  "2502.14191": ["Multimodal RewardBench", "Multimodal-RewardBench"],
  "2305.17926": ["Fair Evaluators", "Fair-Evaluators", "LLMs are not Fair Evaluators"],
  "2503.21755": ["VBench-2.0", "VBench 2.0", "VBench2.0"],
  "2411.13503": ["VBench++", "VBench-plusplus", "VBench-pp"],
  "2311.01813": ["FETV"],
  "2412.09645": ["Evaluation Agent", "Evaluation-Agent"],
  "2512.16853": ["GenEval 2", "GenEval-2", "GenEval2", "Soft-TIFA"],
  "2508.03789": ["HPSv3", "HPS v3", "HPS-v3"],
  "2303.11897": ["TIFA"],
  "2404.16820": ["Gecko"],
  "2502.12115": ["SWE-Lancer", "SWE Lancer"],
  "2410.03859": ["SWE-bench-Multimodal", "SWE-bench Multimodal", "SWE-bench-M"],
  "2410.07095": ["MLE-bench"],
  "2412.14161": ["TheAgentCompany", "The Agent Company"],
  "2402.01622": ["TravelPlanner"],
  "2409.08264": ["Windows Agent Arena", "WindowsAgentArena"],
  "2506.16042": ["OSWorld-Human", "OSWorld Human"],
  "2504.08942": ["AgentRewardBench"],
  "2509.07968": ["SimpleQA Verified", "SimpleQA-Verified"],
  "2505.11831": ["ARC-AGI-2", "ARC-AGI 2", "ARC-AGI2"],
  "2502.05167": ["NoLiMa"],
  "2503.10497": ["MMLU-ProX"],
  "2406.04127": ["Are We Done with MMLU?", "MMLU-Redux", "Are-We-Done-with-MMLU"],
};

const FM_RE = /^---\n([\s\S]*?)\n---/;

let updated = 0;
for (const [arxivId, aliases] of Object.entries(PAPER_ALIASES)) {
  const fp = join(ROOT, "wiki", "papers", `${arxivId}.md`);
  let raw: string;
  try {
    raw = readFileSync(fp, "utf8");
  } catch {
    console.warn(`⚠️  ${arxivId}.md not found`);
    continue;
  }
  const m = raw.match(FM_RE);
  if (!m) {
    console.warn(`⚠️  ${arxivId}.md no frontmatter`);
    continue;
  }
  const fm = (yaml.load(m[1]) || {}) as Record<string, unknown>;

  const existing = Array.isArray(fm.aliases) ? (fm.aliases as string[]) : [];
  const merged = Array.from(new Set([...existing, ...aliases]));
  fm.aliases = merged;

  const newFm = yaml.dump(fm).trimEnd();
  const next = raw.replace(FM_RE, `---\n${newFm}\n---`);
  if (next !== raw) {
    writeFileSync(fp, next);
    console.log(`✓ ${arxivId}.md → ${aliases.join(", ")}`);
    updated++;
  }
}
console.log(`\nDone: ${updated} files updated`);
