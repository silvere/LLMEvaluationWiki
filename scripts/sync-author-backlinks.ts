/**
 * sync-author-backlinks.ts
 *
 * 给 wiki/entities/<person>.md 的「本 wiki 收录的该作者论文」区块
 * 自动填入 wiki/papers/ 中 authors 含此人的论文列表。
 *
 * 用法：
 *   npx tsx scripts/sync-author-backlinks.ts                  # 同步全部 person
 *   npx tsx scripts/sync-author-backlinks.ts --name "Junyang Lin"
 *   npx tsx scripts/sync-author-backlinks.ts --dry-run
 *
 * 匹配规则：
 *   - 用 entity 页的 title 和 aliases 作为候选名集合
 *   - 在 paper 的 authors 数组里精确匹配（不敏感大小写、忽略首尾空格）
 *   - 找到则在 entity 页填 `- [[paper-slug|paper-title]]（年份）` 列表
 *   - 整块替换（幂等）
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const WIKI = join(ROOT, "wiki");
const ENTITIES_DIR = join(WIKI, "entities");
const PAPERS_DIR = join(WIKI, "papers");

const BLOCK_START = "<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->";
const BLOCK_END = "<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->";

interface Args {
  nameFilter?: string;
  dryRun: boolean;
}

function parseArgs(argv: string[]): Args {
  const a: Args = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--name" && argv[i + 1]) { a.nameFilter = argv[++i]; }
    else if (argv[i] === "--dry-run") { a.dryRun = true; }
  }
  return a;
}

function listMd(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isFile() && entry.endsWith(".md")) out.push(full);
  }
  return out;
}

function extractFrontmatter(content: string): Record<string, unknown> | null {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  try { return yaml.load(m[1]) as Record<string, unknown>; }
  catch { return null; }
}

function normalize(s: string): string {
  return s.trim().toLowerCase();
}

interface Paper {
  slug: string;
  title: string;
  authors: string[];
  published: string;       // YYYY-MM-DD 或 ""
  year: string;            // 4 位
}

function loadPapers(): Paper[] {
  const result: Paper[] = [];
  for (const fp of listMd(PAPERS_DIR)) {
    const text = readFileSync(fp, "utf-8");
    const fm = extractFrontmatter(text);
    if (!fm) continue;
    const rawAuthors = fm["authors"];
    let authorsList: string[];
    if (Array.isArray(rawAuthors)) {
      authorsList = rawAuthors.map(String);
    } else if (typeof rawAuthors === "string") {
      // 逗号分隔字符串格式（v3+ ingest 输出常见这样）
      authorsList = rawAuthors.split(",").map(s => s.trim()).filter(Boolean);
    } else {
      continue;
    }
    const slug = basename(fp).replace(/\.md$/, "");
    const title = String(fm["title"] ?? slug).replace(/^"|"$/g, "");
    const published = String(fm["published"] ?? "");
    const year = (published.match(/^\d{4}/) || ["?"])[0];
    result.push({
      slug,
      title,
      authors: authorsList,
      published,
      year,
    });
  }
  return result;
}

interface Person {
  filepath: string;
  slug: string;
  title: string;
  aliases: string[];
  candidates: Set<string>;  // 全部候选名（lowercase）
}

function loadPersons(filter?: string): Person[] {
  const out: Person[] = [];
  for (const fp of listMd(ENTITIES_DIR)) {
    const text = readFileSync(fp, "utf-8");
    const fm = extractFrontmatter(text);
    if (!fm) continue;
    // 必须是 person 类（缺 entity_type 的也允许，向后兼容）
    const et = fm["entity_type"];
    if (et && et !== "person") continue;
    const slug = basename(fp).replace(/\.md$/, "");
    const title = String(fm["title"] ?? slug);
    if (filter && filter !== title && filter !== slug) continue;
    const aliases = Array.isArray(fm["aliases"])
      ? fm["aliases"].map(String)
      : typeof fm["aliases"] === "string"
      ? [String(fm["aliases"])]
      : [];
    const candidates = new Set<string>();
    candidates.add(normalize(title));
    for (const a of aliases) candidates.add(normalize(a));
    // 也加 slug 的去连字符形式（如 "Jacob-Steinhardt" → "jacob steinhardt"）
    candidates.add(normalize(slug.replace(/-/g, " ")));
    out.push({ filepath: fp, slug, title, aliases, candidates });
  }
  return out;
}

function findMatchingPapers(person: Person, papers: Paper[]): Paper[] {
  const matched: Paper[] = [];
  for (const p of papers) {
    for (const author of p.authors) {
      if (person.candidates.has(normalize(author))) {
        matched.push(p);
        break;
      }
    }
  }
  // 按年份倒序
  matched.sort((a, b) => b.year.localeCompare(a.year) || a.title.localeCompare(b.title));
  return matched;
}

function buildBlock(person: Person, papers: Paper[]): string {
  if (papers.length === 0) {
    return `${BLOCK_START}\n*（截至 ${new Date().toISOString().slice(0, 10)}，本 wiki 暂未收录 ${person.title} 作为作者的论文）*\n${BLOCK_END}`;
  }
  const lines = [BLOCK_START];
  lines.push(`*共 ${papers.length} 篇（截至 ${new Date().toISOString().slice(0, 10)}，按发表年份倒序）*`);
  lines.push("");
  for (const p of papers) {
    lines.push(`- [[${p.slug}|${p.title}]]（${p.year}）`);
  }
  lines.push(BLOCK_END);
  return lines.join("\n");
}

function applyBlock(text: string, newBlock: string): { text: string; changed: boolean } {
  const startRe = new RegExp(BLOCK_START.replace(/[-]/g, "\\-").replace(/[!]/g, "\\!"));
  const endRe = new RegExp(BLOCK_END.replace(/[-]/g, "\\-").replace(/[!]/g, "\\!"));
  const startIdx = text.search(startRe);
  const endIdx = text.search(endRe);
  if (startIdx === -1 || endIdx === -1) {
    // 没有 block 标记 — 不强插，警告即可
    return { text, changed: false };
  }
  // 找到 end 标记的实际行尾
  const endOfEnd = endIdx + BLOCK_END.length;
  const replaced = text.slice(0, startIdx) + newBlock + text.slice(endOfEnd);
  return { text: replaced, changed: replaced !== text };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const papers = loadPapers();
  const persons = loadPersons(args.nameFilter);

  console.log(`扫到 ${papers.length} 篇 papers，${persons.length} 个 person entity${args.nameFilter ? `（filter: ${args.nameFilter}）` : ""}`);
  console.log("");

  let updated = 0, skipped_no_block = 0, no_match = 0;
  const noBlockSkipped: string[] = [];

  for (const person of persons) {
    const matches = findMatchingPapers(person, papers);
    const text = readFileSync(person.filepath, "utf-8");
    const block = buildBlock(person, matches);
    const { text: newText, changed } = applyBlock(text, block);

    if (newText === text && text.indexOf(BLOCK_START) === -1) {
      skipped_no_block++;
      noBlockSkipped.push(person.slug);
      continue;
    }
    if (matches.length === 0) no_match++;

    if (!args.dryRun && changed) {
      writeFileSync(person.filepath, newText, "utf-8");
    }
    if (changed) {
      updated++;
      console.log(`✅ ${person.slug}: ${matches.length} 篇匹配`);
    }
  }

  console.log("");
  console.log(`总更新: ${updated} 个 entity${args.dryRun ? "（DRY-RUN，未写入）" : ""}`);
  console.log(`其中 0 篇匹配: ${no_match}`);
  console.log(`无 AUTO-GENERATED 块跳过: ${skipped_no_block}`);
  if (noBlockSkipped.length && noBlockSkipped.length <= 10) {
    console.log(`  跳过列表: ${noBlockSkipped.join(", ")}`);
  }
}

main();
