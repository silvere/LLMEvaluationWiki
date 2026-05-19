/**
 * prune-legacy-scores-section.ts
 *
 * 删除手工维护的 "## 主流模型得分（来自 wiki/models/）" 区块——
 * 数据已经迁移到 frontmatter `sota:`，由 inject-sota-table.ts 重新渲染为
 * "## 模型得分排行"，避免双表重复。
 *
 * 安全策略：仅删除从 `## 主流模型得分` 标题开始、到下一个 `## ` 或 EOF 为止的范围。
 * 不动其他章节。可幂等。
 *
 * 用法:
 *   npx tsx scripts/prune-legacy-scores-section.ts --dry
 *   npx tsx scripts/prune-legacy-scores-section.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const TITLE_RE = /^##\s+主流模型得分.*$/m;

function processFile(filePath: string, dry: boolean): "pruned" | "noop" {
  const content = readFileSync(filePath, "utf-8");
  const m = content.match(TITLE_RE);
  if (!m || m.index === undefined) return "noop";

  const start = m.index;
  // 找下一个 ## 标题
  const after = content.slice(start + m[0].length);
  const nextH2 = after.search(/^##\s/m);
  const end = nextH2 >= 0 ? start + m[0].length + nextH2 : content.length;

  // 删除 [start, end)，并清掉前后多余空行
  const before = content.slice(0, start).replace(/\n+$/, "\n\n");
  const tail = content.slice(end).replace(/^\n+/, "");
  const newContent = before + tail;

  if (!dry) writeFileSync(filePath, newContent);
  return "pruned";
}

const args = new Set(process.argv.slice(2));
const dry = args.has("--dry");

const files = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
let pruned = 0, noop = 0;
for (const f of files) {
  const r = processFile(f, dry);
  if (r === "pruned") pruned++;
  else noop++;
}
console.log(`${dry ? "[DRY-RUN] " : ""}pruned=${pruned}  noop=${noop}  total=${files.length}`);
