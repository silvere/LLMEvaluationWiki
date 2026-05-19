/**
 * inject-benchmark-links.ts
 *
 * 把 benchmark / paper / model / concept / tool 等页 frontmatter 里的
 * arxiv_id / official_url / sources 渲染成一段可点击的"参考链接"区块，
 * 插入到正文 H1 标题之后、首个 H2 之前。
 *
 * 幂等：靠 <!-- AUTO-LINKS:START --> ... <!-- AUTO-LINKS:END --> marker，
 * 每次重跑只替换这一段。
 *
 * 用法:
 *   npx tsx scripts/inject-benchmark-links.ts            # 默认 benchmarks/
 *   npx tsx scripts/inject-benchmark-links.ts --all      # benchmarks + papers + models + tools + leaderboards
 *   npx tsx scripts/inject-benchmark-links.ts --dry      # 只打印 diff，不写盘
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const MARK_START = "<!-- AUTO-LINKS:START -->";
const MARK_END = "<!-- AUTO-LINKS:END -->";

interface FM {
  arxiv_id?: string;
  official_url?: string;
  sources?: string[];
  homepage?: string;
  github?: string;
}

function extractFM(content: string): { fm: FM | null; fmRaw: string; bodyStart: number } {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: null, fmRaw: "", bodyStart: 0 };
  try {
    const fm = yaml.load(m[1]) as FM;
    return { fm, fmRaw: m[0], bodyStart: m[0].length };
  } catch {
    return { fm: null, fmRaw: m[0], bodyStart: m[0].length };
  }
}

function classifyUrl(url: string): string {
  const u = url.toLowerCase();
  if (u.includes("arxiv.org")) return "arXiv";
  if (u.includes("github.com")) return "GitHub";
  if (u.includes("huggingface.co")) return "Hugging Face";
  if (u.includes("openai.com")) return "OpenAI";
  if (u.includes("anthropic.com")) return "Anthropic";
  if (u.includes("deepmind.google") || u.includes("ai.google")) return "Google";
  if (u.includes("paperswithcode.com")) return "Papers with Code";
  if (u.endsWith(".github.io") || u.includes(".github.io/")) return "项目主页";
  if (u.endsWith(".org") || u.includes(".org/")) return "官网";
  return "官网";
}

function buildLinkBlock(fm: FM): string | null {
  const links: string[] = [];
  const seen = new Set<string>();

  const add = (url: string, label?: string) => {
    if (!url) return;
    const clean = url.trim();
    if (!clean || seen.has(clean)) return;
    seen.add(clean);
    const display = label ?? classifyUrl(clean);
    links.push(`- **${display}**: [${clean}](${clean})`);
  };

  if (fm.arxiv_id) {
    const id = fm.arxiv_id.trim();
    const url = id.startsWith("http") ? id : `https://arxiv.org/abs/${id}`;
    add(url, "arXiv 论文");
  }
  if (fm.official_url) add(fm.official_url, "官方主页");
  if (fm.homepage) add(fm.homepage, "项目主页");
  if (fm.github) add(fm.github, "GitHub 仓库");
  if (Array.isArray(fm.sources)) {
    for (const s of fm.sources) {
      if (typeof s === "string" && s.trim()) add(s);
    }
  }

  if (links.length === 0) return null;

  return `${MARK_START}\n\n## 参考链接\n\n${links.join("\n")}\n\n${MARK_END}`;
}

function injectBlock(body: string, block: string): string {
  // 已有 marker 段 → 替换
  const existing = new RegExp(
    `${MARK_START.replace(/[!\-]/g, "\\$&")}[\\s\\S]*?${MARK_END.replace(/[!\-]/g, "\\$&")}`,
    "m",
  );
  if (existing.test(body)) {
    return body.replace(existing, block);
  }

  // 插入位置：第一个 H2 (`## `) 之前；若全文无 H2，则在 H1 + blockquote 之后追加
  const h2Match = body.match(/^## /m);
  if (h2Match && h2Match.index !== undefined) {
    return body.slice(0, h2Match.index) + block + "\n\n" + body.slice(h2Match.index);
  }
  return body.trimEnd() + "\n\n" + block + "\n";
}

function processFile(path: string, dry: boolean): "changed" | "noop" | "skipped" {
  const content = readFileSync(path, "utf-8");
  const { fm, fmRaw, bodyStart } = extractFM(content);
  if (!fm) return "skipped";

  const block = buildLinkBlock(fm);
  if (!block) return "noop";

  const body = content.slice(bodyStart);
  const newBody = injectBlock(body, block);
  if (newBody === body) return "noop";

  if (!dry) {
    writeFileSync(path, fmRaw + newBody);
  }
  return "changed";
}

const args = new Set(process.argv.slice(2));
const dry = args.has("--dry");
const all = args.has("--all");

const targets = all
  ? ["wiki/benchmarks/*.md", "wiki/papers/*.md", "wiki/models/*.md", "wiki/tools/*.md", "wiki/leaderboards/*.md"]
  : ["wiki/benchmarks/*.md"];

let changed = 0, noop = 0, skipped = 0;
for (const pattern of targets) {
  for (const file of glob(pattern, { cwd: ROOT, absolute: true })) {
    const r = processFile(file, dry);
    if (r === "changed") changed++;
    else if (r === "noop") noop++;
    else skipped++;
  }
}

console.log(`${dry ? "[DRY-RUN] " : ""}changed=${changed}  noop=${noop}  skipped=${skipped}`);
