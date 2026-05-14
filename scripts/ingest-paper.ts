/**
 * ingest-paper.ts — Stage 1 of the paper ingest SOP
 *
 * 读取 raw/papers/<id>.pdf（或 PDF URL），生成 wiki/sources/<id>.md 草稿。
 * 不自动 commit，输出草稿后由用户确认再进入 Stage 2。
 *
 * 用法:
 *   npx tsx scripts/ingest-paper.ts <arxiv-id>        # 读 raw/papers/<id>.pdf
 *   npx tsx scripts/ingest-paper.ts --list            # 列出 _index.csv 里所有 paper
 *
 * 依赖: 需要设置 ANTHROPIC_API_KEY 环境变量
 */

import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const PAPERS_DIR = join(ROOT, "raw", "papers");
const INDEX_CSV = join(PAPERS_DIR, "_index.csv");
const SOURCES_DIR = join(ROOT, "wiki", "sources");
const TODAY = new Date().toISOString().split("T")[0];

const args = process.argv.slice(2);

if (args[0] === "--list") {
  const csv = readFileSync(INDEX_CSV, "utf-8").trim().split("\n");
  console.log(csv.join("\n"));
  process.exit(0);
}

const paperId = args[0];
if (!paperId) {
  console.error("用法: npx tsx scripts/ingest-paper.ts <arxiv-id>");
  process.exit(1);
}

const pdfPath = join(PAPERS_DIR, `${paperId}.pdf`);
const outPath = join(SOURCES_DIR, `${paperId}.md`);

if (!existsSync(pdfPath)) {
  console.error(`❌ PDF 不存在: ${pdfPath}`);
  console.error("请先把 PDF 放到 raw/papers/ 目录下，文件名用 arXiv ID 命名。");
  process.exit(1);
}

if (existsSync(outPath)) {
  console.error(`⚠️  sources 页面已存在: ${outPath}`);
  console.error("如需重新生成请先删除该文件。");
  process.exit(1);
}

// 调用 Anthropic API 分析 PDF
async function ingestWithAI(id: string): Promise<string> {
  const Anthropic = (await import("@anthropic-ai/sdk")).default;
  const client = new Anthropic();

  const pdfBase64 = readFileSync(pdfPath).toString("base64");

  const prompt = `你是 LLMEvaluationWiki 的知识工程师。请分析这篇论文并生成一个 wiki/sources/ 页面草稿。

格式要求：
\`\`\`markdown
---
title: "<完整论文标题>"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "${TODAY}"
last_verified: "${TODAY}"
sources:
  - "https://arxiv.org/abs/${id}"
year: <发表年份>
authors:
  - "<第一作者>"
discusses:
  - "[[相关wiki页slug1]]"
  - "[[相关wiki页slug2]]"
---

# <完整论文标题>

> <一句话核心贡献，30字以内>

## 核心贡献

<2-4 点，每点用 [REF: §X.Y] 标注原文章节来源>

## 主要 Claim

<用列表列出 3-6 个可被引用的核心主张，每条必须带 [REF: §X.Y] 页节引用>

## 方法/数据集

<简要描述评测方法或数据集，如有>

## 结果亮点

<关键数字/结论，带 [REF: Table X] 等来源标注>

## 局限性

<论文自述的局限或同行指出的问题>

## 相关页面

<wikilink 列表，仅使用已知存在的英文 kebab-case slug>
\`\`\`

重要：
- discusses 和相关页面里的 wikilink 必须使用英文 kebab-case slug（如 [[benchmark-contamination]]，不要用中文）
- 所有数字/结论必须有 [REF: §X] 标注，不可捏造
- confidence 保持 draft`;

  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4096,
    messages: [{
      role: "user",
      content: [
        {
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: pdfBase64,
          },
        },
        { type: "text", text: prompt },
      ],
    }],
  });

  const text = response.content.find(b => b.type === "text")?.text ?? "";
  // 提取代码块内容
  const match = text.match(/```markdown\n([\s\S]+?)\n```/);
  return match ? match[1] : text;
}

try {
  console.log(`📄 正在分析 ${pdfPath} ...`);
  const draft = await ingestWithAI(paperId);
  writeFileSync(outPath, draft, "utf-8");
  console.log(`✅ 草稿已写入: ${outPath}`);

  // 追加到 _index.csv
  const existingLines = readFileSync(INDEX_CSV, "utf-8").split("\n");
  const alreadyIndexed = existingLines.some(l => l.startsWith(paperId + ","));
  if (!alreadyIndexed) {
    appendFileSync(INDEX_CSV, `${paperId},,,,${TODAY},draft,wiki/sources/${paperId}.md\n`);
    console.log(`📝 已追加到 ${INDEX_CSV}（请手动补全 title/authors/year 列）`);
  }

  console.log("\n下一步（Stage 2，人工触发）：");
  console.log("  1. 审阅草稿并补全元数据");
  console.log("  2. 运行 npm run build-index");
  console.log("  3. 根据需要更新相关 wiki 页面");
} catch (e) {
  console.error("❌ 分析失败:", e);
  process.exit(1);
}
