---
title: "如何选择代码评测基准（决策树）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
review_status: "未审阅（LLM 起草）"
next_review_due: "2026-08-19"
sources:
  - "https://arxiv.org/abs/2107.03374"
  - "https://arxiv.org/abs/2403.07974"
  - "https://www.swebench.com/verified.html"
  - "https://www.nist.gov/media/748456"
derived_from:
  - "wiki/benchmarks/HumanEval.md"
  - "wiki/benchmarks/LiveCodeBench.md"
  - "wiki/benchmarks/SWE-bench-Verified.md"
  - "wiki/benchmarks/MBPP.md"
  - "wiki/benchmarks/BigCodeBench.md"
domain:
  - synthesis
  - code
---

# 如何选择代码评测基准（决策树）

> ⚠️ **Draft 状态**：对比表由 `scripts/build-synthesis-tables.ts` 自动聚合 benchmark 单页 frontmatter（事实层 grounded）；决策树与推荐组合为 LLM 起草 + 编辑判断，未经领域专家正式审阅。

> 目标读者：在 LLM 评测中需要决定「我该用哪个 code benchmark」的工程师与研究员。代码评测正从「函数级 pass@k」过渡到「仓库级 agent」，跨代差异很大。

## 数据来源与生成方法（透明化）

| 内容 | Tier | 来源 | 可信度 |
|---|---|---|---|
| 横向对比表 | **Tier 2 事实** | 自动 aggregate 自单页 frontmatter | ⭐⭐⭐⭐ |
| Pitfall 列表 | **Tier 2 事实** | 单页 frontmatter（WebSearch 核实） | ⭐⭐⭐ |
| 决策树结构 | **Tier 1 框架** | LLM 起草 | ⭐⭐ |
| 推荐组合 | **Tier 3 判断** | 编辑判断 | ⭐⭐ |

## TL;DR — 决策

| 你的场景 | 推荐 | [Tier] 理由 |
|---|---|---|
| 验证模型「能写函数」 | [[HumanEval]] + [[MBPP]] / EvalPlus | [opinion] 经典但已饱和 |
| 防训练污染 | [[LiveCodeBench]] | [grounded] 每月新题、按 cutoff 过滤 |
| 仓库级 / Agent | [[SWE-bench-Verified]] | [grounded] 500 题人工筛 |
| 长 horizon agent | tau-bench-code / Terminal-Bench / SWE-bench Pro | [opinion] |

## 决策树（[Tier 1] LLM 起草）

```
你要测的是什么？
│
├── 单函数级代码生成
│   │
│   ├── 要历史可比（论文标配）→ HumanEval + MBPP（已饱和）
│   ├── 要更严格 unit test → HumanEval+ / EvalPlus
│   ├── 要防污染时间过滤 → LiveCodeBench
│   └── 要多语言 → MultiPL-E
│
├── 仓库级 / Agent 编程
│   │
│   ├── 主流对照 → SWE-bench-Verified 500 题
│   ├── 想测长 horizon → SWE-bench-Pro / OpenHands-Agent
│   ├── 要含 shell / 文件操作 → Terminal-Bench / OSWorld
│   └── 多轮工具调用 → tau-bench-code
│
└── 代码理解（非生成）
    ├── 综合 → BigCodeBench / CodeXGLUE
    └── bug detection → CRUXEval / RepoBench
```

<!-- AUTO-SYN-TABLE:domain=code:START -->

## 代码评测横向对比（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各 benchmark 单页 frontmatter 自动聚合。**维护方式：改各 benchmark 页 frontmatter，不要手改本表。**

| Benchmark | 题量 | 年份 | 评测协议 | 当前 SOTA | Saturation | 主要 Pitfall |
|---|---|---|---|---|---|---|
| [[Codeforces|Codeforces]] | — | 2024 | — | 3206（DeepSeek-V4-Pro） | — | — |
| [[HumanEval|HumanEval]] | 164 | 2021 | 0-shot / pass@k（k 通常为 1，最初论文用 pass@1/1… | 约 92-95%（Claude-3.7-Sonnet） | 🔴 saturated | 样本量太小（164 题），统计噪声大，单次 run 1-2 个百分点波动很常见 |
| [[LiveCodeBench|LiveCodeBench]] | 600 | 2024 | 0-shot / pass@1（部分变体支持 pass@5） | 约 80%（Gemini-2.5-Pro） | 🟢 active | **必须报告时间窗**：'LiveCodeBench 80%' 没意义，必须说 '2024-08 之后题目 80%'，否则无法排除污染 |
| [[SWE-bench-Pro|SWE-bench Pro]] | — | 2025 | — | 58.6%（Kimi-K2.6） | — | — |
| [[SWE-bench-Verified|SWE-bench Verified]] | 500 | 2024 | agent-driven / % resolved (patch passes ALL … | 80.6%（Gemini-3.1-Pro） | 🟢 active | Verified ≠ Full ≠ Lite：常被混淆。Verified 500 题、Full 2,294 题、Lite 300 题，分数不可直接对比 |
| [[Aider-Polyglot|Aider Polyglot]] | — | 2024 | — | — | — | — |
| [[APPS|APPS]] | 10000 | 2021 | — | — | — | — |
| [[BFCL|BFCL]] | — | 2024 | — | — | — | — |
| [[BigCodeBench|BigCodeBench]] | 1140 | 2024 | — | — | — | — |
| [[BIRD|BIRD]] | 12751 | 2023 | — | — | — | — |
| [[CanItEdit|CanItEdit]] | — | 2023 | — | — | — | — |
| [[ClassEval|ClassEval]] | — | 2023 | — | — | — | — |
| [[CodeApex|CodeApex]] | — | 2023 | — | — | — | — |
| [[CodeContests|CodeContests]] | 13610 | 2022 | — | — | — | — |
| [[CRUXEval|CRUXEval]] | 800 | 2024 | — | — | — | — |
| [[DS-1000|DS-1000]] | 1000 | 2022 | — | — | — | — |
| [[Effibench|Effibench]] | — | 2024 | — | — | — | — |
| [[EvalPerf|EvalPerf]] | 0 | 2024 | — | — | — | — |
| [[EvoEval|EvoEval]] | 0 | 2024 | — | — | — | — |
| [[FairCoder|FairCoder]] | — | 2025 | — | — | — | — |
| [[FullStackBench|FullStackBench]] | — | 2024 | — | — | — | — |
| [[HumanEval-V|HumanEval-V]] | — | 2024 | — | — | — | — |
| [[HumanEval-X|HumanEval-X]] | 820 | 2023 | — | — | — | — |
| [[HumanEval-XL|HumanEval-XL]] | — | 2024 | — | — | — | — |
| [[HumanEvalPack|HumanEvalPack]] | 984 | 2023 | — | — | — | — |
| [[InterCode|InterCode]] | 0 | 2023 | — | — | — | — |
| [[IT-Bench|IT-Bench]] | — | 2025 | — | — | — | — |
| [[LCB|LCB]] | — | 2024 | — | — | — | — |
| [[LiveBench|LiveBench]] | — | 2024 | — | — | — | — |
| [[MBPP|MBPP]] | 974 | 2021 | — | — | — | — |
| [[MBPP-Plus|MBPP+]] | 974 | 2023 | — | — | — | — |
| [[McEval|McEval]] | — | 2024 | — | — | — | — |
| [[ML-Bench|ML-Bench]] | — | 2024 | — | — | — | — |
| [[MLE-Bench|MLE-Bench]] | — | 2024 | — | — | — | — |
| [[Multi-SWE-bench|Multi-SWE-bench]] | — | 2025 | — | — | — | — |
| [[MultiPL-E|MultiPL-E]] | — | 2022 | — | — | — | — |
| [[PaperBench|PaperBench]] | — | 2025 | — | — | — | — |
| [[Plot2Code|Plot2Code]] | — | 2024 | — | — | — | — |
| [[SciCode|SciCode]] | 338 | 2024 | — | — | — | — |
| [[Spider|Spider]] | 10181 | 2018 | — | — | — | — |
| [[SUPER|SUPER]] | — | 2024 | — | — | — | — |
| [[SWE-bench|SWE-bench]] | 2294 | 2023 | — | — | — | — |
| [[SWE-bench-Lite|SWE-bench Lite]] | 300 | 2023 | — | — | — | — |
| [[SWE-Lancer|SWE-Lancer]] | — | 2025 | — | — | — | — |
| [[SWT-Bench|SWT-Bench]] | — | 2024 | — | — | — | — |
| [[TDD-Bench-Verified|TDD-Bench Verified]] | — | 2024 | — | — | — | — |
| [[TheAgentCompany|TheAgentCompany]] | — | 2024 | — | — | — | — |

_共 47 个 benchmark，最后更新：2026-05-19_

<!-- AUTO-SYN-TABLE:domain=code:END -->

<!-- AUTO-SYN-TABLE:domain=agent:START -->

## Agent 评测横向对比（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各 benchmark 单页 frontmatter 自动聚合。**维护方式：改各 benchmark 页 frontmatter，不要手改本表。**

| Benchmark | 题量 | 年份 | 评测协议 | 当前 SOTA | Saturation | 主要 Pitfall |
|---|---|---|---|---|---|---|
| [[OSWorld|OSWorld]] | — | 2024 | — | 约 50-61%（Claude-Sonnet-4.5） | — | — |
| [[SWE-bench-Pro|SWE-bench Pro]] | — | 2025 | — | 58.6%（Kimi-K2.6） | — | — |
| [[SWE-bench-Verified|SWE-bench Verified]] | 500 | 2024 | agent-driven / % resolved (patch passes ALL … | 80.6%（Gemini-3.1-Pro） | 🟢 active | Verified ≠ Full ≠ Lite：常被混淆。Verified 500 题、Full 2,294 题、Lite 300 题，分数不可直接对比 |
| [[tau-bench|τ-bench (tau-bench)]] | 477 | 2024 | — | 高于 Opus 4（Claude-Sonnet-4.5） | — | — |
| [[AgentBench|AgentBench]] | 1091 | 2023 | — | — | — | — |
| [[AITZ|AITZ]] | — | 2024 | — | — | — | — |
| [[ALFWorld|ALFWorld]] | 3553 | 2021 | — | — | — | — |
| [[Android-Control|Android-Control]] | — | 2024 | — | — | — | — |
| [[AndroidWorld|AndroidWorld]] | — | 2024 | — | — | — | — |
| [[API-Bank|API-Bank]] | 2138 | 2023 | — | — | — | — |
| [[AppWorld|AppWorld]] | — | 2024 | — | — | — | — |
| [[BEHAVIOR-1K|BEHAVIOR-1K]] | — | — | — | — | — | — |
| [[BFCL|BFCL]] | — | 2024 | — | — | — | — |
| [[BiGGen-Bench|BiGGen-Bench]] | 765 | 2024 | — | — | — | — |
| [[GAIA|GAIA (General AI Assistants)]] | 466 | 2023 | — | — | — | — |
| [[Habitat|Habitat (Embodied AI Simulator)]] | — | — | — | — | — | — |
| [[InterCode|InterCode]] | 0 | 2023 | — | — | — | — |
| [[IT-Bench|IT-Bench]] | — | 2025 | — | — | — | — |
| [[MINT|MINT (Multi-turn INteractive Tool-use)]] | 586 | 2023 | — | — | — | — |
| [[MLE-Bench|MLE-Bench]] | — | 2024 | — | — | — | — |
| [[MLGym-Bench|MLGym-Bench]] | — | 2025 | — | — | — | — |
| [[MobileMiniWob++|MobileMiniWob++]] | — | 2024 | — | — | — | — |
| [[Multi-SWE-bench|Multi-SWE-bench]] | — | 2025 | — | — | — | — |
| [[Nestful|Nestful]] | — | 2024 | — | — | — | — |
| [[Online-Mind2Web|Online-Mind2Web]] | — | 2025 | — | — | — | — |
| [[PaperBench|PaperBench]] | — | 2025 | — | — | — | — |
| [[PARTNR|PARTNR]] | — | 2024 | — | — | — | — |
| [[RobustAPI|RobustAPI]] | — | 2024 | — | — | — | — |
| [[ScienceWorld|ScienceWorld]] | 30 | 2022 | — | — | — | — |
| [[ScreenSpot|ScreenSpot]] | — | 2024 | — | — | — | — |
| [[ScreenSpot-Pro|ScreenSpot Pro]] | — | 2025 | — | — | — | — |
| [[StableToolBench|StableToolBench]] | — | — | — | — | — | — |
| [[SUPER|SUPER]] | — | 2024 | — | — | — | — |
| [[SWE-bench|SWE-bench]] | 2294 | 2023 | — | — | — | — |
| [[SWE-bench-Lite|SWE-bench Lite]] | 300 | 2023 | — | — | — | — |
| [[SWE-Lancer|SWE-Lancer]] | — | 2025 | — | — | — | — |
| [[TDD-Bench-Verified|TDD-Bench Verified]] | — | 2024 | — | — | — | — |
| [[TheAgentCompany|TheAgentCompany]] | — | 2024 | — | — | — | — |
| [[ToolACE|ToolACE]] | — | 2024 | — | — | — | — |
| [[ToolBench|ToolBench]] | 126486 | 2023 | — | — | — | — |
| [[VisualWebBench|VisualWebBench]] | — | 2024 | — | — | — | — |
| [[WebArena|WebArena]] | 812 | 2023 | — | — | — | — |
| [[WebVoyager|WebVoyager]] | — | 2024 | — | — | — | — |
| [[WebWalkerQA|WebWalkerQA]] | — | 2025 | — | — | — | — |
| [[WindowsAgentArena|WindowsAgentArena]] | — | 2024 | — | — | — | — |
| [[xLAM|xLAM]] | — | 2024 | — | — | — | — |
| [[tau2-bench|τ²-Bench]] | — | 2025 | — | — | — | — |
| [[tau3-bench|τ³-Bench]] | — | 2025 | — | — | — | — |

_共 48 个 benchmark，最后更新：2026-05-19_

<!-- AUTO-SYN-TABLE:domain=agent:END -->

## 推荐组合（[Tier 3] 编辑判断）

**通用 LLM 发布报告**：HumanEval+ + MBPP+ + LiveCodeBench（cutoff 后窗口）+ MultiPL-E

**代码模型专项**：上面 + BigCodeBench + CRUXEval + SWE-bench-Verified（scaffold = SWE-agent）

**Agent / coding assistant**：SWE-bench-Verified + Terminal-Bench + tau-bench-code + OSWorld

**最严格 ablation**：LiveCodeBench（按月切窗）+ SWE-bench-Pro + 私有 hold-out set

## 已知失效组合 / 不推荐

- ❌ 只报 HumanEval：完全饱和，无信息量
- ❌ SWE-bench Verified 不报 scaffold：跨论文不可比
- ❌ LiveCodeBench 不报时间窗：可能拿模型 cutoff 内题虚高
- ❌ SWE-bench Lite 与 Verified 分数对照：不同集合不可比

## 相关页面

- [[HumanEval]] · [[LiveCodeBench]] · [[SWE-bench-Verified]] · [[MBPP]] · [[BigCodeBench]]
- [[tau-bench]] · [[OSWorld]]
- [[benchmark-saturation]] · [[benchmark-contamination]]
- [[choose-math-benchmark]] · [[benchmark-pitfalls-cheatsheet]]
