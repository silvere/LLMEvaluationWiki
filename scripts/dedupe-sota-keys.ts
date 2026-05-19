/**
 * dedupe-sota-keys.ts
 *
 * 修复 frontmatter 中出现双 `sota:` 键的 benchmark（违法 YAML，导致 yaml.load 报错）。
 *
 * 策略：保留**最后一个** sota 块（更全量），删除前面所有 sota 块。
 *
 * 用法:
 *   npx tsx scripts/dedupe-sota-keys.ts --dry
 *   npx tsx scripts/dedupe-sota-keys.ts
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

function findSotaBlockRanges(fm: string): Array<[number, number]> {
  // 找所有 ^sota:\s*$（顶层 key）的位置，向后扫到下一个顶层 key 或 EOF
  const lines = fm.split("\n");
  const ranges: Array<[number, number]> = [];
  let curStart = -1;
  let inSota = false;
  let offset = 0;
  const lineOffsets: number[] = [];
  for (const ln of lines) {
    lineOffsets.push(offset);
    offset += ln.length + 1; // +1 for \n
  }
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    if (/^sota:\s*$/.test(ln)) {
      if (inSota) {
        // 上一段 sota 在此处结束
        ranges.push([curStart, lineOffsets[i]]);
      }
      curStart = lineOffsets[i];
      inSota = true;
    } else if (inSota && /^[a-zA-Z_][a-zA-Z0-9_]*:/.test(ln)) {
      // 进入下一个顶层 key
      ranges.push([curStart, lineOffsets[i]]);
      inSota = false;
      curStart = -1;
    }
  }
  if (inSota && curStart >= 0) {
    ranges.push([curStart, fm.length]);
  }
  return ranges;
}

function processFile(filePath: string, dry: boolean): "deduped" | "noop" | "skipped" {
  const content = readFileSync(filePath, "utf-8");
  const m = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return "skipped";
  const fm = m[1];
  const ranges = findSotaBlockRanges(fm);
  if (ranges.length <= 1) return "noop";

  // 保留最后一个 sota 块（更完整），删前面所有
  const keep = ranges[ranges.length - 1];
  const toDelete = ranges.slice(0, -1);

  // 倒序删（避免位置失效）
  let newFm = fm;
  for (let i = toDelete.length - 1; i >= 0; i--) {
    const [s, e] = toDelete[i];
    newFm = newFm.slice(0, s) + newFm.slice(e);
  }

  // 清理多余空行
  newFm = newFm.replace(/\n{3,}/g, "\n\n");

  const newContent = "---\n" + newFm + "\n---\n" + content.slice(m[0].length);
  if (!dry) writeFileSync(filePath, newContent);
  return "deduped";
}

const args = new Set(process.argv.slice(2));
const dry = args.has("--dry");

const files = glob("wiki/benchmarks/*.md", { cwd: ROOT, absolute: true });
let deduped = 0, noop = 0, skipped = 0;
for (const f of files) {
  const r = processFile(f, dry);
  if (r === "deduped") deduped++;
  else if (r === "noop") noop++;
  else skipped++;
}
console.log(`${dry ? "[DRY-RUN] " : ""}deduped=${deduped}  noop=${noop}  skipped=${skipped}  total=${files.length}`);
