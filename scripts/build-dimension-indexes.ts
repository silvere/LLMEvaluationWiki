#!/usr/bin/env tsx
/**
 * build-dimension-indexes.ts
 *
 * 一次性生成 14 篇 dimension index synthesis 页：
 *   wiki/synthesis/dimension-A-foundation.md ... dimension-K-judge.md
 *   wiki/synthesis/dimension-long-ctx.md / dimension-obs.md / dimension-infra.md
 *
 * 每篇含：
 *   - draft banner + 数据来源 section
 *   - LLM 起草决策入门段（Tier 1）
 *   - AUTO-SYN-TABLE:dimension=X marker（由 build-synthesis-tables.ts 填充）
 *
 * 已存在则跳过（避免覆盖手工修改）；--overwrite 强制覆盖。
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");
const SYN_DIR = join(ROOT, "wiki/synthesis");
const OVERWRITE = process.argv.includes("--overwrite");

mkdirSync(SYN_DIR, { recursive: true });

interface DimDef {
  key: string;
  slug: string;
  title: string;
  scope: string;
  tier1: string;
}

const DIMS: DimDef[] = [
  { key: "A", slug: "dimension-A-foundation", title: "A 维度：基座模型 / 通用能力评测",
    scope: "覆盖 LLM 基座的通用知识 / 推理 / 多任务能力评测（含 harness 框架 / benchmark 数据集 / 排行榜）",
    tier1: "若要评测一个新 base LLM：(1) 用 lm-eval / OpenCompass 等 harness 跑标准套件；(2) 报告 MMLU / MMLU-Pro / BBH / GPQA / HellaSwag 等 baseline；(3) 关注 HF Open LLM Leaderboard / LiveBench / Artificial Analysis 等社区排名。"
  },
  { key: "B", slug: "dimension-B-chat", title: "B 维度：Chat / Instruction-Following 评测",
    scope: "对话 + 指令遵循能力（含人类偏好对战、自动 judge 评测、格式约束验证）",
    tier1: "Chat 评测主流是 Chatbot Arena Elo + Arena-Hard-Auto + MT-Bench + AlpacaEval 2.0；Instruction 类用 IFEval + FollowBench。注意 length bias / style bias / position bias。"
  },
  { key: "C", slug: "dimension-C-rag", title: "C 维度：RAG / 检索增强评测",
    scope: "RAG 系统端到端 + retrieval 子系统 + embedding 评测",
    tier1: "RAG 系统级用 RAGAs / TruLens / ARES；retrieval 单独评用 MTEB / BEIR / MIRACL；中文用 C-MTEB。Domain 类用 FinanceBench / LegalBench-RAG。"
  },
  { key: "D", slug: "dimension-D-agent", title: "D 维度：Agent / 工具调用 / Web-GUI 评测",
    scope: "通用 agent + tool-use + web/GUI 操作 + software engineering agent",
    tier1: "通用 agent：AgentBench / GAIA / tau-bench；tool-use：BFCL / ToolBench / API-Bank；Web/GUI：WebArena / VisualWebArena / OSWorld / Mind2Web / BrowserGym；SWE：SWE-bench-Verified 系列；安全：AgentHarm。"
  },
  { key: "E", slug: "dimension-E-vlm", title: "E 维度：视觉理解（VLM/LMM）评测",
    scope: "图像理解 + 视频理解 + 文档/图表 OCR + 多模态推理",
    tier1: "图像：MMMU / MMBench / MathVista / MM-Vet / HallusionBench；视频：Video-MME / MVBench / EgoSchema / LongVideoBench；harness 用 LMMs-Eval / VLMEvalKit；中文用 CMMMU。"
  },
  { key: "F", slug: "dimension-F-visual-gen", title: "F 维度：视觉生成（图像/视频/I2V）评测 —— 业务核心",
    scope: "T2I + T2V + I2V + image edit + 偏好模型 + 经典指标，按 subdimension 五分组",
    tier1: "T2I 综合：HEIM / ImagenHub / GenEval / T2I-CompBench / DPG-Bench / MJHQ-30K；T2V：VBench / EvalCrafter / T2V-CompBench / VMBench；I2V：VBench-I2V；偏好模型：PickScore / HPSv2 / ImageReward；alignment 指标：VQAScore / GenAI-Bench；经典：clean-fid / FVD / torchmetrics。"
  },
  { key: "G", slug: "dimension-G-audio", title: "G 维度：音频 / 音乐生成评测",
    scope: "speech / music / audio understanding + generation",
    tier1: "通用 audio：AIR-Bench / AudioBench / VoiceBench / Dynamic-SUPERB；音乐：MusicBench / Mustango / MuChoMusic / CMI-Bench；指标：FAD（Fréchet Audio Distance）；HELM Audio 是综合套件。"
  },
  { key: "H", slug: "dimension-H-code", title: "H 维度：代码能力评测",
    scope: "函数级 + 仓库级 + agent 编程 + 代码理解",
    tier1: "函数级（已饱和）：HumanEval+ / MBPP+ / EvalPlus / MultiPL-E；防污染：LiveCodeBench（按时间窗）；仓库级 agent：SWE-bench-Verified（必报 scaffold）+ SWE-bench-Pro；代码理解：BigCodeBench / CRUXEval；多语言代码：MultiPL-E。"
  },
  { key: "I", slug: "dimension-I-safety", title: "I 维度：安全 / 对齐 / Red-teaming",
    scope: "红队工具 + safety benchmark + jailbreak + content safety + 危险能力",
    tier1: "红队工具：garak / PyRIT / Giskard / Petri / promptfoo；safety benchmark：HarmBench / JailbreakBench / AdvBench / WMDP / SafetyBench；agent 安全：AgentHarm；content：ToxiGen / RealToxicityPrompts。"
  },
  { key: "J", slug: "dimension-J-chinese", title: "J 维度：中文评测",
    scope: "中文 base / chat / 多模态 / 长文本 评测",
    tier1: "知识 + 推理：C-Eval / CMMLU / AGIEval / GAOKAO-Bench；综合：SuperCLUE / Xiezhi；专业：CMB（医疗）；多模态：CMMMU；retrieval：C-MTEB；榜单：CompassRank。"
  },
  { key: "K", slug: "dimension-K-judge", title: "K 维度：Judge 校准 / Meta-evaluation",
    scope: "评测 LLM-as-Judge / Reward Model 自身的准确性与稳健性",
    tier1: "Judge benchmark：RewardBench / JudgeBench / LLMBar / MT-Bench Human Judgments；开源 Judge 模型：Prometheus 2 / JudgeLM / PandaLM / Auto-J / Themis / CompassJudger。Judge 评测要同时看 accuracy + position bias + length bias。"
  },
  { key: "long-ctx", slug: "dimension-long-ctx", title: "长上下文评测（横切维度）",
    scope: "32K-1M+ token context 下的 retrieval / reasoning / generation 能力",
    tier1: "合成召回：NIAH / Sequential-NIAH；系统化：RULER / HELMET / BABILong；真实下游任务：LongBench v2 / InfiniteBench / L-Eval / LooGLE；视频长上下文：InfiniBench / Video-MME 长视频子集。"
  },
  { key: "obs", slug: "dimension-obs", title: "Observability / 商业评测平台（横切维度）",
    scope: "production LLM 应用的 tracing / logging / 持续评测 / prompt 管理 / 实验编排",
    tier1: "开源：Langfuse / Arize Phoenix / OpenLLMetry / Helicone；商业：LangSmith / Braintrust / Weave (W&B) / Comet Opik / Confident-AI / Patronus / Galileo / Fiddler；通用 monitoring：Datadog / Evidently。"
  },
  { key: "infra", slug: "dimension-infra", title: "评测基础设施（横切维度）",
    scope: "推理引擎 / model serving / 加速框架（**非评测工具本身**，是评测时被依赖的基础设施）",
    tier1: "推理：vLLM / SGLang / TGI（HuggingFace）/ TensorRT-LLM（NVIDIA）；本类不直接是评测工具，但所有 evaluation harness 几乎都需依赖其一加速；评测结果对推理后端敏感（temperature / sampling 实现差异）。"
  },
];

function buildPage(d: DimDef): string {
  return `---
title: "${d.title}"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
review_status: "未审阅（LLM 起草 + 自动表）"
next_review_due: "2026-08-22"
sources:
  - "https://crfm.stanford.edu/helm/"
  - "https://lmarena.ai/"
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=${d.key} frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: ${d.key}
domain:
  - synthesis
---

# ${d.title}

> ⚠️ **Draft 状态**：横向对比表由 \`scripts/build-synthesis-tables.ts\` 从各单页 frontmatter \`dimension: ${d.key}\` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

${d.scope}

## 决策入门段（Tier 1 LLM 起草 / opinion）

${d.tier1}

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 \`wiki/{benchmarks,tools,harnesses,leaderboards}/*.md\` 的 frontmatter \`dimension: ${d.key}\` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 \`npx tsx scripts/build-synthesis-tables.ts\` 同步

<!-- AUTO-SYN-TABLE:dimension=${d.key}:START -->
<!-- AUTO-SYN-TABLE:dimension=${d.key}:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]
${d.key === "F" ? "- [[VBench]] · [[HEIM]] · [[GenEval]] · [[T2I-CompBench]] · [[MJHQ-30K]] · [[Stable-Diffusion-3]]" : ""}
${d.key === "K" ? "- [[RewardBench]] · [[JudgeBench]] · [[Prometheus]] · [[llm-as-judge]]" : ""}
${d.key === "D" ? "- [[AgentBench]] · [[GAIA]] · [[SWE-bench-Verified]] · [[Mind2Web]]" : ""}
`;
}

let written = 0, skipped = 0;
for (const d of DIMS) {
  const fp = join(SYN_DIR, `${d.slug}.md`);
  if (existsSync(fp) && !OVERWRITE) { skipped++; console.log(`⏭️  ${d.slug}.md exists, skip (--overwrite to force)`); continue; }
  writeFileSync(fp, buildPage(d));
  written++;
  console.log(`✅ ${d.slug}.md`);
}
console.log(`\n📊 14 dim index pages: written=${written}, skipped=${skipped}`);
