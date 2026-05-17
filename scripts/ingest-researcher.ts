/**
 * ingest-researcher.ts
 *
 * 半自动建立 wiki/entities/<Name-Slug>.md 人物 stub。
 *
 * 用法（关键参数 --name 必填，其他可选）：
 *
 *   npx tsx scripts/ingest-researcher.ts \
 *     --name "Jacob Steinhardt" \
 *     --affiliation "UC Berkeley" \
 *     --position "Assistant Professor" \
 *     --education "Stanford PhD,MIT BS" \
 *     --focus "alignment,LLM evaluation,robust ML" \
 *     --homepage "https://jsteinhardt.stat.berkeley.edu/" \
 *     --scholar "https://scholar.google.com/citations?user=LKv32bgAAAAJ" \
 *     --arxiv "https://arxiv.org/a/steinhardt_j_1" \
 *     --aliases "Jacob B. Steinhardt,雅各布·斯坦哈特" \
 *     --tagline "Berkeley 助理教授，评测方法论与对齐评测的代表研究者"
 *
 *   # 仅预览不写入
 *   npx tsx scripts/ingest-researcher.ts --name "Test" --dry-run
 *
 *   # 强制覆盖已存在的同名页
 *   npx tsx scripts/ingest-researcher.ts --name "..." --force
 *
 * 建完后建议再跑：
 *   npx tsx scripts/sync-author-backlinks.ts --name "Full Name"
 */

import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const ENTITIES_DIR = join(ROOT, "wiki", "entities");

interface Args {
  name?: string;
  slug?: string;
  affiliation?: string;
  position?: string;
  education?: string;
  focus?: string;
  homepage?: string;
  scholar?: string;
  arxiv?: string;
  aliases?: string;
  tagline?: string;
  dryRun: boolean;
  force: boolean;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { dryRun: false, force: false };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    switch (k) {
      case "--name":         a.name = v; i++; break;
      case "--slug":         a.slug = v; i++; break;
      case "--affiliation":  a.affiliation = v; i++; break;
      case "--position":     a.position = v; i++; break;
      case "--education":    a.education = v; i++; break;
      case "--focus":        a.focus = v; i++; break;
      case "--homepage":     a.homepage = v; i++; break;
      case "--scholar":      a.scholar = v; i++; break;
      case "--arxiv":        a.arxiv = v; i++; break;
      case "--aliases":      a.aliases = v; i++; break;
      case "--tagline":      a.tagline = v; i++; break;
      case "--dry-run":      a.dryRun = true; break;
      case "--force":        a.force = true; break;
    }
  }
  return a;
}

function nameToSlug(name: string): string {
  // "Jacob Steinhardt" → "Jacob-Steinhardt"
  // 保留 ASCII + 中文，空白和分隔符变 -
  return name.trim().replace(/\s+/g, "-").replace(/[^\w一-鿿-]/g, "");
}

function commaList(s: string | undefined): string[] {
  if (!s) return [];
  return s.split(",").map(x => x.trim()).filter(Boolean);
}

function yamlList(items: string[], indent = 2): string {
  if (items.length === 0) return "[]";
  return "\n" + items.map(x => `${" ".repeat(indent)}- ${JSON.stringify(x).replace(/^"(.*)"$/, '"$1"')}`).join("\n");
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildMarkdown(a: Args): string {
  const name = a.name!;
  const aliasList = commaList(a.aliases);
  const eduList = commaList(a.education);
  const focusList = commaList(a.focus);
  const sources: string[] = [];
  if (a.homepage) sources.push(a.homepage);
  if (a.scholar)  sources.push(a.scholar);

  const lines: string[] = [];
  lines.push("---");
  lines.push(`title: ${JSON.stringify(name)}`);
  lines.push(`type: entity`);
  lines.push(`entity_type: person`);
  lines.push(`publish: true`);
  lines.push(`author_mode: llm`);
  lines.push(`confidence: draft`);
  lines.push(`as_of_date: "${today()}"`);
  lines.push(`last_verified: "${today()}"`);
  lines.push(`sources:${sources.length ? yamlList(sources, 2) : " []"}`);
  if (aliasList.length) {
    lines.push(`aliases:${yamlList(aliasList, 2)}`);
  }
  if (a.affiliation)  lines.push(`affiliation: ${JSON.stringify(a.affiliation)}`);
  if (a.position)     lines.push(`position: ${JSON.stringify(a.position)}`);
  if (eduList.length) lines.push(`education:${yamlList(eduList, 2)}`);
  if (focusList.length) lines.push(`research_focus:${yamlList(focusList, 2)}`);
  if (a.homepage)     lines.push(`homepage: ${JSON.stringify(a.homepage)}`);
  if (a.scholar)      lines.push(`google_scholar: ${JSON.stringify(a.scholar)}`);
  if (a.arxiv)        lines.push(`arxiv_id: ${JSON.stringify(a.arxiv)}`);
  lines.push(`domain:`);
  lines.push(`  - entity`);
  lines.push("---");
  lines.push("");
  lines.push(`# ${name}`);
  lines.push("");
  if (a.tagline) {
    lines.push(`> ${a.tagline}`);
    lines.push("");
  } else {
    lines.push(`> *（待补充 1 句话定位）*`);
    lines.push("");
  }

  lines.push("## 基本信息");
  lines.push("");
  if (a.affiliation) lines.push(`- **所属机构**：${a.affiliation}`);
  if (a.position)    lines.push(`- **职位**：${a.position}`);
  if (eduList.length) lines.push(`- **学历背景**：${eduList.join("；")}`);
  if (a.homepage || a.scholar || a.arxiv) {
    const linkParts: string[] = [];
    if (a.homepage) linkParts.push(`[主页](${a.homepage})`);
    if (a.scholar)  linkParts.push(`[Google Scholar](${a.scholar})`);
    if (a.arxiv)    linkParts.push(`[arXiv](${a.arxiv})`);
    lines.push(`- **链接**：${linkParts.join(" · ")}`);
  }
  lines.push("");

  lines.push("## 评测领域主要贡献");
  lines.push("");
  lines.push(`*（待补充：2-4 段描述其在 LLM 评测 / 训练 / 对齐 / 安全 / 多模态 / 推理等领域的具体贡献，每段引用代表论文 \\[\\[arxiv-id|Title\\]\\]）*`);
  lines.push("");

  lines.push("## 代表性工作");
  lines.push("");
  lines.push("*（待补充）*");
  lines.push("");

  lines.push("## 本 wiki 收录的该作者论文");
  lines.push("");
  lines.push(`<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->`);
  lines.push(`*（由 scripts/sync-author-backlinks.ts 自动维护，运行 \`npx tsx scripts/sync-author-backlinks.ts --name "${name}"\` 填入）*`);
  lines.push(`<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->`);
  lines.push("");

  lines.push("## 相关页面");
  lines.push("");
  lines.push("*（待补充：链接到相关机构、同领域研究者、相关 benchmark / concept）*");
  lines.push("");

  return lines.join("\n");
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.name) {
    console.error("❌ 必填: --name \"Full Name\"");
    console.error("用法见文件头注释");
    process.exit(1);
  }
  const slug = args.slug || nameToSlug(args.name);
  const target = join(ENTITIES_DIR, `${slug}.md`);

  if (existsSync(target) && !args.force) {
    console.error(`❌ 已存在: ${target}（用 --force 覆盖）`);
    process.exit(1);
  }

  const md = buildMarkdown(args);

  if (args.dryRun) {
    console.log("=== DRY-RUN 预览 ===\n");
    console.log(`目标路径: ${target}\n`);
    console.log(md);
    return;
  }

  writeFileSync(target, md, "utf-8");
  console.log(`✅ 已${existsSync(target) && args.force ? "覆盖" : "创建"}: ${target}`);
  console.log(`下一步: npx tsx scripts/sync-author-backlinks.ts --name "${args.name}"`);
}

main();
