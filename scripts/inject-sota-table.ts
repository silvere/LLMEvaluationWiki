/**
 * inject-sota-table.ts
 *
 * 读 wiki/benchmarks/*.md frontmatter 的 `sota:` 字段，渲染为
 * <!-- AUTO-SOTA:START --> ... <!-- AUTO-SOTA:END --> 区块，
 * 插入到 "## SOTA 表现" 后；若无该 H2，则插在第一个 H2 之前；
 * 若全文无 H2，则追加到文末。
 *
 * 幂等：marker 内整体替换；不动其他内容。
 *
 * 用法:
 *   npx tsx scripts/inject-sota-table.ts          # 全量
 *   npx tsx scripts/inject-sota-table.ts --dry    # dry-run
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const MARK_START = "<!-- AUTO-SOTA:START -->";
const MARK_END = "<!-- AUTO-SOTA:END -->";

interface SotaEntry {
  score: string;
  model: string;
  harness?: string | null;
  with_tools?: boolean | null;  // true=带 tools/agentic，false=裸模型，null=未知
  date?: string;
  source?: string;
  notes?: string;
}

function parseScore(s: string | undefined): number {
  if (!s) return -1;
  const m = String(s).match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : -1;
}

interface FM {
  sota?: SotaEntry[];
  [k: string]: unknown;
}

const MEDAL = ["🥇", "🥈", "🥉"];

function buildBlock(entries: SotaEntry[]): string {
  // 排序修复：按 score 数字降序（修复 GLM-5.1 排在 GLM-5 后面的 bug）
  // 复制数组避免 mutate 原 frontmatter
  const sorted = [...entries].sort((a, b) => parseScore(b.score) - parseScore(a.score));

  // 自适应列：只有当数据存在时才渲染该列
  const hasHarness = sorted.some((e) => e.harness);
  const hasTools = sorted.some((e) => e.with_tools !== undefined && e.with_tools !== null);
  const hasDate = sorted.some((e) => e.date);
  const hasSource = sorted.some((e) => e.source);

  const headerCols = ["#", "模型"];
  if (hasHarness) headerCols.push("Harness");
  if (hasTools) headerCols.push("Tools");
  headerCols.push("分数");
  headerCols.push("备注");
  if (hasDate) headerCols.push("时间");
  if (hasSource) headerCols.push("来源");

  const lines: string[] = [
    MARK_START,
    "",
    "## 模型得分排行",
    "",
    "> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。",
    "",
    "| " + headerCols.join(" | ") + " |",
    "|" + headerCols.map(() => "---").join("|") + "|",
  ];
  sorted.forEach((e, i) => {
    const rank = i < 3 ? MEDAL[i] : String(i + 1);
    const row: string[] = [rank, `[[${e.model}]]`];
    if (hasHarness) row.push(e.harness ? `[[${e.harness}]]` : "—");
    if (hasTools) {
      const tv = e.with_tools;
      row.push(tv === true ? "🔧 with" : tv === false ? "🚫 no" : "—");
    }
    row.push(e.score);
    row.push(e.notes ?? "");
    if (hasDate) row.push(e.date ?? "—");
    if (hasSource) row.push(e.source ? `[link](${e.source})` : "—");
    lines.push("| " + row.join(" | ") + " |");
  });
  lines.push("", MARK_END);
  return lines.join("\n");
}

function injectBlock(body: string, block: string): string {
  // 已有 marker → 替换
  const re = new RegExp(
    `${MARK_START.replace(/[!\-/]/g, "\\$&")}[\\s\\S]*?${MARK_END.replace(/[!\-/]/g, "\\$&")}`,
    "m",
  );
  if (re.test(body)) return body.replace(re, block);

  // 找 "## SOTA 表现" H2 → 在其后续 H2 之前插入
  const sotaH2 = body.match(/^##\s+SOTA\s+表现\s*$/m);
  if (sotaH2 && sotaH2.index !== undefined) {
    const after = body.slice(sotaH2.index);
    const nextH2 = after.slice(2).search(/^##\s/m);
    const insertAt = nextH2 > 0 ? sotaH2.index + nextH2 + 2 : sotaH2.index + after.length;
    return body.slice(0, insertAt) + "\n" + block + "\n\n" + body.slice(insertAt);
  }

  // 否则插在第一个 H2 之前
  const firstH2 = body.match(/^##\s/m);
  if (firstH2 && firstH2.index !== undefined) {
    return body.slice(0, firstH2.index) + block + "\n\n" + body.slice(firstH2.index);
  }
  return body.trimEnd() + "\n\n" + block + "\n";
}

function processFile(filePath: string, dry: boolean): "changed" | "noop" | "skipped" {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return "skipped";
  let fm: FM;
  try {
    fm = (yaml.load(fmMatch[1]) as FM) ?? {};
  } catch {
    return "skipped";
  }
  const entries = Array.isArray(fm.sota) ? fm.sota : [];
  if (entries.length === 0) return "noop";

  const block = buildBlock(entries);
  const body = content.slice(fmMatch[0].length);
  const newBody = injectBlock(body, block);
  if (newBody === body) return "noop";

  if (!dry) writeFileSync(filePath, fmMatch[0] + newBody);
  return "changed";
}

const args = new Set(process.argv.slice(2));
const dry = args.has("--dry");

const files = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
let changed = 0, noop = 0, skipped = 0;
for (const f of files) {
  const r = processFile(f, dry);
  if (r === "changed") changed++;
  else if (r === "noop") noop++;
  else skipped++;
}
console.log(`${dry ? "[DRY-RUN] " : ""}changed=${changed}  noop=${noop}  skipped=${skipped}  total=${files.length}`);
