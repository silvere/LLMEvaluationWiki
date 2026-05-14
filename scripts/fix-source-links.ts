/**
 * fix-source-links.ts
 * 把 wiki/sources/*.md 里的中文 wikilink（[[中文名]]）修复为 [[英文-slug|中文名]]
 * 对找不到映射的 wikilink 写入 scripts/orphan-links.txt
 * 用法: npx tsx scripts/fix-source-links.ts
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const WIKI_DIR = join(ROOT, "wiki");
const SOURCES_DIR = join(WIKI_DIR, "sources");

function walkDir(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...walkDir(full));
    else if (entry.endsWith(".md")) results.push(full);
  }
  return results;
}

function extractFrontmatter(content: string): Record<string, unknown> | null {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  try { return yaml.load(m[1]) as Record<string, unknown>; }
  catch { return null; }
}

// 构建 title → slug 映射（跳过 sources/ 自身，避免循环引用）
const titleToSlug = new Map<string, string>();
const slugExists = new Set<string>();

for (const f of walkDir(WIKI_DIR)) {
  if (f.startsWith(SOURCES_DIR)) continue;
  const slug = basename(f, ".md");
  slugExists.add(slug.toLowerCase());
  const fm = extractFrontmatter(readFileSync(f, "utf-8"));
  if (!fm) continue;
  const title = String(fm["title"] ?? "").trim();
  if (title) titleToSlug.set(title, slug);
}

// 常见手写别名（中文显示名 → 英文 slug）
// 仅补充 walkDir 扫不到的 title→slug 关系
const MANUAL_ALIASES: Record<string, string> = {
  // 中文概念 → 英文概念 slug
  "基准污染":     "benchmark-contamination",
  "基准饱和":     "benchmark-saturation",
  "零样本评测":   "zero-shot-evaluation",
  "少样本评测":   "few-shot-evaluation",
  "思维链":       "chain-of-thought",
  "涌现能力":     "emergent-capabilities",
  "扩展定律":     "scaling-laws",
  "对齐评测":     "alignment-eval",
  "幻觉评测":     "hallucination-eval",
  "推理时扩展":   "inference-time-scaling",
  "自一致性":     "self-consistency",
  "人类评估":     "human-eval-protocol",
  "自动评测":     "automated-eval",
  "LLM 评测":     "llm-evaluation",
  "自然语言理解": "natural-language-understanding",
  "多任务评测":   "multi-task-evaluation",
  "多语言评测":   "multilingual-eval",
  "计算效率":     "compute-efficiency",
  "预训练":       "pretraining",
  "模型规模":     "model-scale",
  "对抗性数据生成": "adversarial-data-generation",
  "句子补全":     "sentence-completion",
  "语义相似度":   "semantic-similarity",
  "文本生成评测": "text-generation-eval",
  "自动评测指标": "automated-eval-metrics",
  "常识推理":     "commonsense-reasoning",
  "Chinchilla定律": "chinchilla-scaling-law",
  "知识图谱":     "knowledge-graph",
  // 英文别名（slug 大小写不一致时）
  "BIG-bench":    "big-bench",
  "BIG-Bench":    "big-bench",
  "BIGbench":     "big-bench",
  "GPT-4":        "gpt-4",
  "GPT4":         "gpt-4",
  "Claude":       "claude",
  "Gemini":       "gemini",
  "LLaMA":        "llama",
  "Llama":        "llama",
  "HELM":         "helm",
  "MMLU":         "mmlu",
  "GLUE":         "glue",
  "SuperGLUE":    "superglue",
  "HellaSwag":    "hellaswag",
  "BERT":         "bert",
  "BLEU":         "bleu",
  "ROUGE":        "rouge",
  "BERTScore":    "bertscore",
  "TruthfulQA":   "truthfulqa",
  "GSM8K":        "gsm8k",
  "HumanEval":    "humaneval",
  "MT-Bench":     "mt-bench",
  "LMSYS":        "lmsys",
  "Chatbot Arena":    "chatbot-arena",
  // 中文概念补充
  "少样本提示":       "few-shot-learning",
  "自洽性":           "self-consistency",
  "多数投票":         "self-consistency",
  "对齐":             "capability-vs-alignment",
  "对齐评测":         "capability-vs-alignment",
  "自动化评判":       "llm-as-judge",
  "多语言基准":       "multilingual-eval",
  "事实性评测":       "factuality-eval",
  "代码评测":         "code-eval",
  "软件工程评测":     "code-eval",
  "多模态模型":       "multimodal-eval",
  "多模态评测":       "multimodal-eval",
  "长上下文评测":     "CLongEval",
  "中文评测":         "chinese-llm-evaluation-landscape",
  "推理评测":         "reasoning-eval",
  "红队测试":         "red-teaming",
  "越狱":             "jailbreak",
  "越狱评测":         "jailbreak",
  "对话评测":         "multi-turn-eval",
  "多轮对话评测":     "multi-turn-eval",
  "位置偏差":         "position-bias",
  "Elo评分":          "elo-rating",
  "Elo 评分":         "elo-rating",
  "人类反馈":         "RLHF",
  "RLAIF":            "RLHF",
  "对抗性攻击":       "adversarial-robustness",
  "对抗鲁棒性":       "adversarial-robustness",
  "鲁棒性":           "adversarial-robustness",
  "安全评测":         "safety-eval-landscape",
  "RAG评测":          "RAG-eval",
  "RAG 评测":         "RAG-eval",
  "指令微调":         "instruction-following-eval",
  // 英文别名补充
  "BIG-bench Hard":   "big-bench",
  "Claude 3":         "claude",
  "Llama 2":          "llama",
  "Llama 3":          "llama",
  "Constitutional AI":  "RLHF",
  "InstructGPT":        "RLHF",
  "pass@k":             "humaneval",
  "Mistral":            "Mistral-AI",
  "FLAN":               "RLHF",
  "T0":                 "RLHF",
  "Codex":              "humaneval",
  "Min-K%":             "min-k-contamination",
  "MoE":                "deepseek-v2-2024",
  // 中文补充（有对应页）
  "偏好优化":           "DPO",
  "偏好模型":           "process-reward-model",
  "公平性评测":         "benchmark-design",
  "开源模型":           "open-vs-closed-model-eval",
  "成员推断攻击":       "membership-inference",
  "数据检测":           "min-k-contamination",
  "预训练数据":         "benchmark-contamination",
  "问答评测":           "MMLU",
  "领域评测":           "MMLU",
  "专业知识评测":       "MMLU",
  "专家知识评测":       "MMLU-Pro",
  "人类考试评测":       "MMLU",
  "模仿谬误":           "llm-as-judge-bias",
  "对抗性评测":         "adversarial-robustness",
  "拒绝率":             "safety-eval-landscape",
  "过度拒绝":           "safety-eval-landscape",
  "程序合成":           "humaneval",
  "程序执行理解":       "humaneval",
  "竞技编程":           "humaneval",
  "代码推理":           "humaneval",
  "相变":               "emergent-capabilities",
  "泛化能力":           "emergent-capabilities",
  "基准难度":           "benchmark-design",
  "协作基准构建":       "benchmark-design",
  "原子主张":           "factuality-eval",
  "多文档理解":         "CLongEval",
  "多维评测":           "HELM",
  "推理效率":           "inference-time-scaling",
  "效率评测":           "inference-time-scaling",
  "效率优化":           "inference-time-scaling",
  "计算成本":           "scaling-laws",
  "计算趋势":           "scaling-laws",
  "训练成本":           "scaling-laws",
  "算力增长":           "scaling-laws",
  "GPU算力":            "scaling-laws",
  "注意力机制":         "chain-of-thought",
  "分组查询注意力":     "inference-time-scaling",
  "滑动窗口注意力":     "CLongEval",
  "混合专家架构":       "scaling-laws",
  // 新论文引入的英文 slug 孤儿 → 映射到已有页面
  "reward-model":                   "process-reward-model",
  "RewardBench":                    "process-reward-model",
  "video-understanding":            "Video-MME",
  "long-video-understanding":       "CLongEval",
  "long-video-eval":                "CLongEval",
  "audio-video-understanding":      "multimodal-eval",
  "omnimodal-llm":                  "multimodal-eval",
  "streaming-video":                "multimodal-eval",
  "ai-generated-video-detection":   "multimodal-eval",
  "deepfake-detection":             "multimodal-eval",
  "benchmark-saturation":           "benchmark-design",
  "policy-gradient":                "RLHF",
  "reinforcement-learning-from-llm":"RLHF",
  "self-improvement":               "agent-eval",
  "appworld":                       "agent-eval",
};

for (const [alias, slug] of Object.entries(MANUAL_ALIASES)) {
  if (!titleToSlug.has(alias)) titleToSlug.set(alias, slug);
}

const WIKILINK_RE = /\[\[([^\]|]+?)(?:\|[^\]]*?)?\]\]/g;

let totalFixed = 0;
let totalFiles = 0;
const orphans = new Map<string, string[]>(); // link → [files it appears in]

for (const f of readdirSync(SOURCES_DIR)) {
  if (!f.endsWith(".md")) continue;
  const filePath = join(SOURCES_DIR, f);
  let content = readFileSync(filePath, "utf-8");
  let changed = false;

  const newContent = content.replace(WIKILINK_RE, (match, linkText: string) => {
    // 已经是 [[slug|display]] 形式，不动
    if (match.includes("|")) return match;

    const trimmed = linkText.trim();

    // 情况1: 直接命中 title→slug 映射
    if (titleToSlug.has(trimmed)) {
      const slug = titleToSlug.get(trimmed)!;
      if (slug !== trimmed) {
        changed = true;
        totalFixed++;
        return `[[${slug}|${trimmed}]]`;
      }
      return match; // slug 和显示名一样，不需改
    }

    // 情况2: 小写 slug 直接存在于 slugExists（英文精确匹配）
    if (slugExists.has(trimmed.toLowerCase())) {
      // 如果大小写不一样则规范化
      if (trimmed.toLowerCase() !== trimmed) {
        changed = true;
        totalFixed++;
        return `[[${trimmed.toLowerCase()}|${trimmed}]]`;
      }
      return match;
    }

    // 情况3: 找不到 → 记录 orphan
    if (!orphans.has(trimmed)) orphans.set(trimmed, []);
    orphans.get(trimmed)!.push(f);
    return match;
  });

  if (changed) {
    writeFileSync(filePath, newContent, "utf-8");
    totalFiles++;
  }
}

// 已确认无对应页面的白名单孤儿（超泛概念 / 法律领域 / 工业报告用语）
// 新增孤儿时先判断是否属于此类，若不是则必须在 MANUAL_ALIASES 里补映射
const KNOWN_ORPHANS = new Set([
  "AI产业", "AI反馈", "AI发展趋势", "AI安全", "AI治理", "AI能力进展",
  "大语言模型", "法律推理", "GitHub",
]);

const newOrphans = [...orphans.keys()].filter(k => !KNOWN_ORPHANS.has(k));

// 写孤儿链接报告
const orphanLines: string[] = [
  "# Orphan wikilinks in wiki/sources/",
  `# Generated: ${new Date().toISOString()}`,
  `# 白名单孤儿（已知无对应页，不需处理）：${KNOWN_ORPHANS.size} 个`,
  `# 新增孤儿（需要在 MANUAL_ALIASES 补映射或新建页面）：${newOrphans.length} 个`,
  "",
  "## 白名单孤儿",
];
for (const link of [...KNOWN_ORPHANS].sort()) {
  if (orphans.has(link)) {
    orphanLines.push(`[[${link}]] — in: ${[...new Set(orphans.get(link)!)].join(", ")}`);
  }
}
orphanLines.push("", "## 新增孤儿（需处理）");
for (const link of newOrphans.sort()) {
  orphanLines.push(`[[${link}]] — in: ${[...new Set(orphans.get(link)!)].join(", ")}`);
}
writeFileSync(join(__dirname, "orphan-links.txt"), orphanLines.join("\n") + "\n", "utf-8");

console.log(`✅ 修复完成：${totalFiles} 个文件，共 ${totalFixed} 处 wikilink 已修正`);
console.log(`⚠️  孤儿链接：${orphans.size} 个（白名单 ${KNOWN_ORPHANS.size} 个 / 新增 ${newOrphans.length} 个）`);

// CI 守卫：新增孤儿超过阈值则以非零退出码失败
const ORPHAN_THRESHOLD = 0;
if (newOrphans.length > ORPHAN_THRESHOLD) {
  console.error(`\n❌ fix-links 失败：发现 ${newOrphans.length} 个新增孤儿链接。`);
  console.error("   请在 scripts/fix-source-links.ts 的 MANUAL_ALIASES 里补充映射，或新建对应的 wiki 页面。");
  console.error("   详细列表见 scripts/orphan-links.txt（## 新增孤儿 节）。");
  process.exit(1);
}
