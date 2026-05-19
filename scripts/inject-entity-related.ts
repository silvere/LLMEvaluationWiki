/**
 * inject-entity-related.ts
 *
 * 为 wiki/entities/*.md 注入"## 自动关联"区块，包含：
 *   - 该 entity 发布的模型（自动从 wiki/models/ 的 developer 字段算）
 *   - 同类 entity（同 entity_type）
 *
 * 用 marker <!-- AUTO-RELATED:START --> ... <!-- AUTO-RELATED:END --> 幂等。
 * 不动现有手写的 "## 相关页面" section，新区块追加在它之后。
 *
 * 用法:
 *   npx tsx scripts/inject-entity-related.ts              # 全量执行
 *   npx tsx scripts/inject-entity-related.ts --dry        # dry-run
 *   npx tsx scripts/inject-entity-related.ts --preview ByteDance-AI  # 预览单页
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { sync as glob } from "glob";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

const MARK_START = "<!-- AUTO-RELATED:START -->";
const MARK_END = "<!-- AUTO-RELATED:END -->";

interface FM {
  title?: string;
  entity_type?: string;
  aliases?: string[];
  developer?: string;
  family?: string;
  release_date?: string;
}

interface EntityInfo {
  slug: string;
  title: string;
  entity_type: string;
  aliases: string[];
}

interface ModelInfo {
  slug: string;
  title: string;
  developer: string;
  release_date: string;
}

function extractFM(content: string): { fm: FM; bodyStart: number } {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { fm: {}, bodyStart: 0 };
  try {
    return { fm: (yaml.load(m[1]) as FM) ?? {}, bodyStart: m[0].length };
  } catch {
    return { fm: {}, bodyStart: m[0].length };
  }
}

function basenameNoExt(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[（）()\s]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

// ── Load all entities & models ─────────────────────────────────────────────
const entityFiles = glob("wiki/entities/**/*.md", { cwd: ROOT, absolute: true });
const modelFiles = glob("wiki/models/*.md", { cwd: ROOT, absolute: true });

const entities: EntityInfo[] = entityFiles.map((p) => {
  const { fm } = extractFM(readFileSync(p, "utf-8"));
  return {
    slug: basenameNoExt(p),
    title: (fm.title as string) ?? basenameNoExt(p),
    entity_type: (fm.entity_type as string) ?? "",
    aliases: (fm.aliases as string[]) ?? [],
  };
});

const models: ModelInfo[] = modelFiles.map((p) => {
  const { fm } = extractFM(readFileSync(p, "utf-8"));
  return {
    slug: basenameNoExt(p),
    title: (fm.title as string) ?? basenameNoExt(p),
    developer: (fm.developer as string) ?? "",
    release_date: (fm.release_date as string) ?? "",
  };
});

// Build entity lookup keys (slug / title / aliases all normalized)
const entityKeys = new Map<string, EntityInfo>();
for (const e of entities) {
  const keys = new Set<string>([normalize(e.slug), normalize(e.title)]);
  for (const a of e.aliases) keys.add(normalize(String(a)));
  for (const k of keys) {
    if (k) entityKeys.set(k, e);
  }
}

// ── Compute auto-related per entity ────────────────────────────────────────
function findModelsForEntity(e: EntityInfo): ModelInfo[] {
  // 匹配 developer 字段：去括号 + normalize
  const targets = new Set<string>([normalize(e.slug), normalize(e.title)]);
  for (const a of e.aliases) targets.add(normalize(String(a)));

  const hits: ModelInfo[] = [];
  for (const m of models) {
    if (!m.developer) continue;
    const devNorm = normalize(m.developer);
    // 双向 substring 匹配，兼容 "Alibaba-Tongyi" vs "Alibaba (Qwen Team)" 这类
    for (const t of targets) {
      if (t && (devNorm.includes(t) || t.includes(devNorm))) {
        hits.push(m);
        break;
      }
    }
  }
  // 按发布时间倒序
  hits.sort((a, b) => (b.release_date ?? "").localeCompare(a.release_date ?? ""));
  return hits;
}

// 内置 region 分组，把 org 类拆细，避免 ByteDance ↔ Stanford-CRFM 这种弱关联
const REGION: Record<string, string[]> = {
  china_company: ["Alibaba-Tongyi", "ByteDance-AI", "Baidu-AI", "Tencent-AI", "DeepSeek", "Moonshot-AI", "Zhipu-AI", "01-AI", "MiniMax"],
  china_academy: ["Shanghai-AI-Lab", "Beijing-Academy-of-AI", "Tsinghua-NLP", "Tencent-AI-Lab", "SJTU"],
  us_company:    ["OpenAI", "Anthropic", "Google-DeepMind", "Meta-AI", "Microsoft-Research", "xAI", "Cohere", "Reka"],
  us_academy:    ["AI2", "Stanford-CRFM", "Stanford-NLP", "Princeton-AI", "Hugging-Face", "MLCommons", "Center-for-AI-Safety", "Epoch-AI", "METR"],
  eu:            ["Mistral-AI", "Multimodal-Art-Projection"],
};

function regionOf(slug: string): string | null {
  for (const [r, members] of Object.entries(REGION)) {
    if (members.includes(slug)) return r;
  }
  return null;
}

function findSiblings(e: EntityInfo, max = 8): EntityInfo[] {
  if (!e.entity_type) return [];
  const myRegion = regionOf(e.slug);
  // 同 entity_type + 优先同 region
  const same = entities.filter((x) => x.slug !== e.slug && x.entity_type === e.entity_type);
  if (!myRegion) return same.slice(0, max);
  const sameRegion = same.filter((x) => regionOf(x.slug) === myRegion);
  const otherRegion = same.filter((x) => regionOf(x.slug) !== myRegion);
  return [...sameRegion, ...otherRegion].slice(0, max);
}

function buildBlock(e: EntityInfo): string | null {
  const myModels = findModelsForEntity(e);
  const siblings = findSiblings(e);

  if (myModels.length === 0 && siblings.length === 0) return null;

  const lines: string[] = [MARK_START, "", "## 自动关联", ""];
  lines.push("> 以下由 `scripts/inject-entity-related.ts` 自动维护——基于 `wiki/models/` 的 `developer` 字段与 `wiki/entities/` 的 `entity_type` 字段。手动编辑会被覆盖。");
  lines.push("");

  if (myModels.length > 0) {
    lines.push("### 该机构发布的模型 Spec");
    lines.push("");
    for (const m of myModels) {
      const date = m.release_date ? `（${m.release_date}）` : "";
      lines.push(`- [[${m.slug}|${m.title}]]${date}`);
    }
    lines.push("");
  }

  if (siblings.length > 0) {
    const labelMap: Record<string, string> = {
      org: "同类机构",
      person: "同领域研究者",
      model: "同类模型家族",
    };
    lines.push(`### ${labelMap[e.entity_type] ?? "同类 entity"}`);
    lines.push("");
    for (const s of siblings) {
      lines.push(`- [[${s.slug}|${s.title}]]`);
    }
    lines.push("");
  }

  lines.push(MARK_END);
  return lines.join("\n");
}

function injectBlock(content: string, block: string): string {
  // 已有 marker 段 → 替换
  const re = new RegExp(
    `${MARK_START.replace(/[!\-/]/g, "\\$&")}[\\s\\S]*?${MARK_END.replace(/[!\-/]/g, "\\$&")}`,
    "m",
  );
  if (re.test(content)) {
    return content.replace(re, block);
  }
  // 插在文件末尾（保留尾部换行）
  return content.replace(/\s*$/, "\n\n" + block + "\n");
}

// ── CLI ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const dry = args.includes("--dry");
const previewIdx = args.indexOf("--preview");
const previewSlug = previewIdx >= 0 ? args[previewIdx + 1] : null;

if (previewSlug) {
  const file = entityFiles.find((f) => basenameNoExt(f) === previewSlug);
  if (!file) {
    console.error(`entity 未找到: ${previewSlug}`);
    process.exit(1);
  }
  const e = entities.find((x) => x.slug === previewSlug)!;
  const block = buildBlock(e);
  if (!block) {
    console.log(`[preview] ${previewSlug}: 无可生成的关联（developer/sibling 都为空）`);
    process.exit(0);
  }
  console.log(`=== [preview] ${previewSlug} 将要注入的区块 ===`);
  console.log(block);
  process.exit(0);
}

let changed = 0, noop = 0;
for (const file of entityFiles) {
  const slug = basenameNoExt(file);
  const e = entities.find((x) => x.slug === slug)!;
  const block = buildBlock(e);
  if (!block) {
    noop++;
    continue;
  }
  const content = readFileSync(file, "utf-8");
  const newContent = injectBlock(content, block);
  if (newContent === content) {
    noop++;
    continue;
  }
  if (!dry) writeFileSync(file, newContent);
  changed++;
}

console.log(`${dry ? "[DRY-RUN] " : ""}changed=${changed}  noop=${noop}  total=${entityFiles.length}`);
