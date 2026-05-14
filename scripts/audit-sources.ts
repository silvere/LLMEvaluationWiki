/**
 * audit-sources.ts
 * 扫描 wiki/sources/*.md，报告缺少 [REF] 引注的页面
 * 用法: npx tsx scripts/audit-sources.ts
 */

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const SOURCES_DIR = join(__dirname, "..", "wiki", "sources");

interface AuditResult {
  file: string;
  hasRef: boolean;
  hasSources: boolean;
  refCount: number;
  sourcesCount: number;
}

const results: AuditResult[] = [];

for (const f of readdirSync(SOURCES_DIR)) {
  if (!f.endsWith(".md")) continue;
  const content = readFileSync(join(SOURCES_DIR, f), "utf-8");

  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  let sourcesCount = 0;
  if (fmMatch) {
    try {
      const fm = yaml.load(fmMatch[1]) as Record<string, unknown>;
      sourcesCount = Array.isArray(fm["sources"]) ? (fm["sources"] as unknown[]).length : 0;
    } catch { /* ignore */ }
  }

  const refCount = (content.match(/\[REF:/g) ?? []).length;

  results.push({
    file: f,
    hasRef: refCount > 0,
    hasSources: sourcesCount > 0,
    refCount,
    sourcesCount,
  });
}

const noRef = results.filter(r => !r.hasRef);
const noSources = results.filter(r => !r.hasSources);
const bothMissing = results.filter(r => !r.hasRef && !r.hasSources);

console.log(`\n📊 Sources 质量审计（共 ${results.length} 篇）`);
console.log(`${"=".repeat(50)}`);
console.log(`✅ 有 [REF] 引注: ${results.length - noRef.length} 篇`);
console.log(`⚠️  缺 [REF] 引注: ${noRef.length} 篇`);
console.log(`⚠️  缺 sources 字段: ${noSources.length} 篇`);
console.log(`❌ 两者均缺: ${bothMissing.length} 篇`);

if (noRef.length > 0) {
  console.log(`\n缺 [REF] 的页面（${noRef.length} 篇）：`);
  for (const r of noRef.sort((a, b) => a.file.localeCompare(b.file))) {
    const tag = r.hasSources ? "  " : "❌";
    console.log(`  ${tag} ${r.file} (sources: ${r.sourcesCount})`);
  }
}

if (noSources.length > 0) {
  console.log(`\n缺 sources 字段的页面（${noSources.length} 篇）：`);
  for (const r of noSources.filter(r => r.hasRef).sort((a, b) => a.file.localeCompare(b.file))) {
    console.log(`     ${r.file}`);
  }
}
