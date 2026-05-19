#!/usr/bin/env tsx
/**
 * inject-backlinks-block.ts
 *
 * 给 wiki/entities/people/*.md（以及深层 entity person 页）注入
 * `<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START/END -->` 占位区块，
 * 让 sync-author-backlinks.ts 能写入论文反向链接列表。
 *
 * 插入位置：
 *   - 优先放在「## 相关页面」前
 *   - 否则放在文件末尾
 *
 * 用法：
 *   npx tsx scripts/inject-backlinks-block.ts              # 全部 person entity
 *   npx tsx scripts/inject-backlinks-block.ts --dry-run    # 预览
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const DRY_RUN = process.argv.includes("--dry-run");
const ENTITIES_DIR = "wiki/entities";

const BLOCK = `\n## 本 wiki 收录的该作者论文\n\n<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->\n（由 scripts/sync-author-backlinks.ts 自动维护，请勿手动编辑）\n<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->\n`;

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (e.endsWith(".md")) out.push(p);
  }
  return out;
}

function isPerson(content: string): boolean {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return false;
  try {
    const fm = yaml.load(m[1]) as Record<string, unknown>;
    return fm["entity_type"] === "person" || (fm["type"] === "entity" && !fm["entity_type"]);
  } catch { return false; }
}

let scanned = 0, alreadyHas = 0, injected = 0, skipped = 0;
const changes: string[] = [];

for (const fp of walk(ENTITIES_DIR)) {
  scanned++;
  const content = readFileSync(fp, "utf8");
  if (!isPerson(content)) { skipped++; continue; }
  if (content.includes("AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START")) {
    alreadyHas++; continue;
  }

  // 插入位置：「## 相关页面」之前
  let newContent: string;
  const relatedMatch = content.match(/^## 相关页面/m);
  if (relatedMatch) {
    const idx = content.indexOf(relatedMatch[0]);
    newContent = content.slice(0, idx) + BLOCK + "\n" + content.slice(idx);
  } else {
    // 文件末尾追加
    newContent = content.replace(/\n+$/, "") + "\n" + BLOCK;
  }

  if (!DRY_RUN) writeFileSync(fp, newContent);
  changes.push(fp);
  injected++;
}

console.log(`\n📊 扫描 ${scanned} md`);
console.log(`   非 person / 跳过: ${skipped}`);
console.log(`   已有占位符: ${alreadyHas}`);
console.log(`   注入: ${injected}${DRY_RUN ? "（dry-run）" : ""}`);
if (changes.length) {
  console.log(`\n📝 前 10 注入:\n  ${changes.slice(0, 10).join("\n  ")}`);
}
