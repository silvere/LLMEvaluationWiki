#!/usr/bin/env tsx
/**
 * fix-authors-format.ts
 *
 * 把所有 wiki/papers/*.md 和 wiki/sources/*.md 的 frontmatter.authors 字段
 * 从字符串形式（"Alice Wang, Bob Lee, et al."）统一转换为 JSON 数组形式
 * （["Alice Wang", "Bob Lee", ...]）以便 sync-author-backlinks.ts 可靠匹配。
 *
 * 支持的输入形式：
 *   - 已是 YAML 数组：保持不变
 *   - 单行字符串："Alice Wang, Bob Lee" → ["Alice Wang", "Bob Lee"]
 *   - 带 et al：会被剥离
 *
 * 用法：
 *   npx tsx scripts/fix-authors-format.ts                # 全仓扫描 + 修改
 *   npx tsx scripts/fix-authors-format.ts --dry-run      # 仅预览
 *   npx tsx scripts/fix-authors-format.ts --dir wiki/papers/
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DRY_RUN = process.argv.includes("--dry-run");
const dirArgIdx = process.argv.indexOf("--dir");
const TARGETS = dirArgIdx >= 0
  ? [process.argv[dirArgIdx + 1]]
  : ["wiki/papers", "wiki/sources"];

function walkMd(dir: string): string[] {
  const out: string[] = [];
  let entries: string[];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const e of entries) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walkMd(p));
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

// 解析作者字符串 → 数组。处理 ", ", " and ", "; "，剥离 "et al"
function parseAuthorsString(raw: string): string[] {
  let s = raw.trim();
  // 去掉首尾引号
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  // 移除 et al. / 等
  s = s.replace(/[,;]?\s*et\s+al\.?$/i, "");
  // 分割
  const parts = s
    .split(/\s*[,;]\s*|\s+and\s+/)
    .map(p => p.trim())
    .filter(p => p.length > 0 && p.toLowerCase() !== "et al" && p.toLowerCase() !== "et al.");
  return parts;
}

function formatAuthorsArray(authors: string[]): string {
  return JSON.stringify(authors); // ["Alice", "Bob"]
}

let scanned = 0, modified = 0, alreadyArray = 0, missing = 0;
const changes: { path: string; before: string; after: string }[] = [];

for (const targetDir of TARGETS) {
  for (const fp of walkMd(targetDir)) {
    scanned++;
    const content = readFileSync(fp, "utf8");
    if (!content.startsWith("---")) continue;
    const fmEnd = content.indexOf("\n---", 4);
    if (fmEnd < 0) continue;
    const fm = content.slice(0, fmEnd + 4);
    const body = content.slice(fmEnd + 4);

    // 只匹配一行的 authors（不跨行）
    const m = fm.match(/^(authors:\s*)(.+)$/m);
    if (!m) { missing++; continue; }
    const value = m[2].trim();

    // 已经是数组形式（以 [ 开头）
    if (value.startsWith("[")) { alreadyArray++; continue; }

    // 跨行 YAML 数组（- 开头的多行），跳过
    if (value === "" || value === "|" || value === ">") {
      alreadyArray++;
      continue;
    }

    const parsed = parseAuthorsString(value);
    if (parsed.length === 0) continue;
    const newValue = formatAuthorsArray(parsed);
    const newFm = fm.replace(m[0], `${m[1]}${newValue}`);
    changes.push({ path: fp, before: value, after: newValue });
    if (!DRY_RUN) {
      writeFileSync(fp, newFm + body);
    }
    modified++;
  }
}

console.log(`\n📊 扫描 ${scanned} 个 md`);
console.log(`   已是数组: ${alreadyArray}`);
console.log(`   修改: ${modified}${DRY_RUN ? "（dry-run）" : ""}`);
console.log(`   无 authors 字段: ${missing}\n`);

if (changes.length > 0) {
  console.log("📝 前 10 个变更:");
  for (const c of changes.slice(0, 10)) {
    console.log(`\n  ${c.path}`);
    console.log(`    OLD: ${c.before.slice(0, 100)}${c.before.length > 100 ? "..." : ""}`);
    console.log(`    NEW: ${c.after.slice(0, 100)}${c.after.length > 100 ? "..." : ""}`);
  }
}
