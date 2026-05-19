/**
 * migrate-sota-from-tables.ts
 *
 * 把 wiki/benchmarks/*.md 里现有的 "## 主流模型得分（来自 wiki/models/）" markdown 表
 * 解析后写入 frontmatter `sota:` 字段（前 Top-5）。
 *
 * - 表格格式假设：`| [[Slug|Title]] | 分数字符串 | 备注 |`
 * - 作者已按分数倒序写表，脚本保序取前 5
 * - 不解析数字、不重排序——保留原始 score 字符串
 * - 备注中含 agent/harness 关键字时写入 notes，**不**自动填 harness（避免误判）
 * - 已有 frontmatter sota 字段则跳过（不覆盖人工编辑）
 *
 * 用法:
 *   npx tsx scripts/migrate-sota-from-tables.ts --dry    # dry-run，打印 preview
 *   npx tsx scripts/migrate-sota-from-tables.ts          # 落盘
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const TABLE_HEADER = /^##\s+主流模型得分/m;
const TOP_N = 5;

interface SotaEntry {
  score: string;
  model: string;
  harness?: string | null;
  date?: string;
  source?: string;
  notes?: string;
}

interface FM {
  sota?: SotaEntry[];
  [k: string]: unknown;
}

function parseTable(body: string): SotaEntry[] {
  // 定位 ## 主流模型得分... 区块到下一个 ## 之间
  const start = body.search(TABLE_HEADER);
  if (start < 0) return [];
  const after = body.slice(start);
  const nextH2 = after.slice(2).search(/^##\s/m);
  const block = nextH2 > 0 ? after.slice(0, nextH2 + 2) : after;

  const entries: SotaEntry[] = [];
  const lines = block.split("\n");
  for (const line of lines) {
    // 必须形如 `| [[Slug|Title]] | score | notes |`
    const m = line.match(/^\|\s*\[\[([^\]|]+)(?:\|[^\]]*)?\]\]\s*\|\s*([^|]+?)\s*\|\s*([^|]*?)\s*\|/);
    if (!m) continue;
    const slug = m[1].trim();
    if (!slug) continue;
    const score = m[2].trim();
    const notes = m[3].trim();
    entries.push({
      score,
      model: slug,
      harness: null,
      notes: notes || undefined,
    });
    if (entries.length >= TOP_N) break;
  }
  return entries;
}

function processFile(filePath: string, dry: boolean): "skipped" | "noop" | "migrated" {
  const content = readFileSync(filePath, "utf-8");
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) return "skipped";
  let fm: FM;
  try {
    fm = (yaml.load(fmMatch[1]) as FM) ?? {};
  } catch {
    return "skipped";
  }
  if (fm.sota && Array.isArray(fm.sota) && fm.sota.length > 0) {
    return "noop"; // 不覆盖已有
  }

  const body = content.slice(fmMatch[0].length);
  const entries = parseTable(body);
  if (entries.length === 0) return "noop";

  // 写回 frontmatter（保留其他字段顺序，把 sota 追加到末尾）
  const newFmRaw = fmMatch[1].replace(/\s+$/, "") + "\nsota:\n" +
    entries.map((e) => {
      const lines = [`  - score: "${e.score.replace(/"/g, '\\"')}"`,
                     `    model: "${e.model}"`,
                     `    harness: null`];
      if (e.notes) lines.push(`    notes: "${e.notes.replace(/"/g, '\\"')}"`);
      return lines.join("\n");
    }).join("\n");

  const newContent = "---\n" + newFmRaw + "\n---\n" + body;
  if (!dry) writeFileSync(filePath, newContent);
  return "migrated";
}

const args = new Set(process.argv.slice(2));
const dry = args.has("--dry");

const files = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
let migrated = 0, noop = 0, skipped = 0;
const migratedList: string[] = [];

for (const f of files) {
  const r = processFile(f, dry);
  if (r === "migrated") {
    migrated++;
    migratedList.push(f.split("/").pop()!.replace(/\.md$/, ""));
  } else if (r === "noop") noop++;
  else skipped++;
}

console.log(`${dry ? "[DRY-RUN] " : ""}migrated=${migrated}  noop=${noop}  skipped=${skipped}`);
if (migratedList.length > 0) {
  console.log("\n已迁移的 benchmark:");
  for (const s of migratedList) console.log(`  - ${s}`);
}
