---
title: AIME
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-22'
last_verified: '2026-05-22'
domain:
- math
- reasoning
language: en
year: 1983
authors:
- MAA (Mathematical Association of America)
arxiv_id: ''
official_url: https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions
official_leaderboard: https://artificialanalysis.ai/evaluations/aime
license: 题目版权归 MAA / AoPS
size: 30
format: open-ended
saturation_status: active
sources:
- https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions
- https://maa.org/math-competitions/american-invitational-mathematics-examination-aime
evaluation_protocol:
  default_shots: 0-shot
  default_cot: true
  tool_use: false
  scoring: exact-match accuracy（每题答案 0-999 整数）
  sampling: 推理模型常用 pass@1 / pass@N（N=16/32/64）/ majority-vote@N
pitfalls:
- '**年份混淆**：''AIME 88%'' 没意义。AIME 2022 / 2023 / 2024 / 2025 / 2026 每年新题，污染程度不同，必须明确报告年份'
- 题目数量极小（每年 15 题 × 2 套 = 30 题），单次 run 方差 5-10pt，必须 multi-seed + majority-vote
- 推理模型 vs 非推理模型评测协议不同：o1 / DeepSeek-R1 / Claude Thinking 默认 maj@64，普通 LLM 默认 0-shot CoT 单 run，跨论文比较前必须看 sampling 协议
- 题目从 2024-02 起被部分 LLM 训练语料抓取（AoPS 网站爬取），2024 年题分数虚高；2025-2026 题相对干净
- Doubao Seed 2.0 98.3% 等高分需确认是哪一年题 + 何种采样协议（Doubao-Seed 报告 maj@64）
sota:
- score: 100%
  model: Kimi-K2.6
  harness: null
  with_tools: true
  date: 2026-05
  source: https://llm-stats.com/benchmarks/aime
  notes: K2 Thinking 0905, perfect, with tools
- score: 100%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2026-04
  source: https://artificialanalysis.ai/evaluations/aime-2025
  notes: GPT-5.2 xhigh, AIME 2025
- score: 100%
  model: Gemini-3-Flash
  harness: null
  with_tools: true
  date: 2026-01
  source: https://artificialanalysis.ai/
  notes: Reasoning, AIME 2025
- score: 98.3%
  model: Doubao-Seed-2.0
  harness: null
  with_tools: true
  date: 2026-02
  source: https://www.volcengine.com/
  notes: Pro, maj@N
- score: 96.1%
  model: Kimi-K2.5
  harness: null
  with_tools: true
  date: 2026-05
  source: https://llm-stats.com/benchmarks/aime-2025
  notes: Reasoning
- score: 95.7%
  model: GLM-5.1
  harness: null
  with_tools: true
  date: 2026-03
  source: https://huggingface.co/zai-org/GLM-5.1
  notes: AIME 2025
- score: 94.6%
  model: GPT-5
  harness: null
  date: 2025-08
  source: https://openai.com/index/introducing-gpt-5/
  notes: 初版
  with_tools: false
- score: 92.7%
  model: GLM-5
  harness: null
  with_tools: true
  date: 2026-02
  source: https://huggingface.co/zai-org/GLM-5
  notes: AIME 2026 I
- score: 88.0%
  model: o3
  harness: null
  with_tools: true
  date: 2024-12
  source: https://openai.com/
- score: 86.7%
  model: Doubao-Seed-1.6
  harness: null
  with_tools: true
  date: 2025-06
  source: https://www.volcengine.com/
  notes: Seed-Thinking
- score: 86.7%
  model: Gemini-2.5-Pro
  harness: null
  date: 2025-06
  source: https://deepmind.google/
  with_tools: false
- score: 81.2%
  model: GPT-5.5
  harness: null
  date: 2026-04
  source: https://openai.com/
  notes: Pro
  with_tools: false
- score: 81.0%
  model: Qwen3
  harness: null
  with_tools: true
  date: 2025-08
  source: https://qwenlm.github.io/
  notes: thinking
- score: 79.8%
  model: DeepSeek-R1
  harness: null
  with_tools: true
  date: 2025-01
  source: https://api-docs.deepseek.com/
- score: 78.3%
  model: Claude-3.7-Sonnet
  harness: null
  with_tools: true
  date: 2025-02
  source: https://www.anthropic.com/
  notes: extended thinking
- score: 77.5%
  model: Kimi-K1.5
  harness: null
  with_tools: true
  date: 2025-01
  source: https://moonshot.ai/
- score: 74.4%
  model: o1
  harness: null
  with_tools: true
  date: 2024-09
  source: https://openai.com/
- score: 53.1%
  model: Kimi-K2
  harness: null
  date: 2025-07
  source: https://moonshot.ai/
  with_tools: false
- score: 9.5%
  model: GPT-4o
  harness: null
  date: 2024-05
  source: https://openai.com/
  notes: 已被覆盖
  with_tools: false
dimension: A
subdimension: benchmark
---

# AIME（American Invitational Mathematics Examination）

> 美国高中数学邀请赛题目构成的评测基准，每年更新，天然抗污染，是当前区分顶级模型数学推理能力的核心指标。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions](https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions)

<!-- AUTO-LINKS:END -->

## 概述

AIME 即美国数学邀请赛，自 1983 年起每年举办，由美国数学竞赛（AMC）组织出题。作为 LLM 评测基准，AIME 题目直接来自官方年度竞赛，每年新增 30 道题（AIME I 和 AIME II 各 15 题），答案均为 0 至 999 之间的整数，无法通过选择题猜测获益。题目覆盖代数、几何、数论、概率、组合数学等高中竞赛数学的核心领域。

AIME 成为主流 LLM 评测基准的关键背景是：GSM8K 和 MATH 相继饱和后，业界需要更能反映顶级模型数学推理上限的评测标准。AIME 的高难度（人类参赛者平均得分约为满分 15 分中的 3-5 分）和每年更新的特性，使其成为目前最重要的数学评测基准之一。由于新题每年由 AMC 官方出题，训练截止日期之后的新题对模型构成真实挑战，有效缓解了数据污染问题。

模型在 AIME 上的进步轨迹也是大模型数学能力飞跃最直观的证明之一：早期 GPT-4o 仅能解答约 9.3% 的题目，而 o1 达到 74.4%，此后各前沿模型持续刷新记录，Gemini 2.5 Pro 等模型达到 95%（无工具辅助），部分模型配合代码执行工具甚至达到 100%。这一进步速度本身也引发了对"AIME 是否会像 MATH 一样快速饱和"的讨论。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 1983 年起（每年持续更新） |
| 大小 | 动态增长（每年新增约 30 题） |
| 题目格式 | 开放性（0-999 整数答案，open-ended） |
| 覆盖领域 | 数学、推理（代数、几何、数论、概率、组合） |
| 语言 | 英文 |
| 许可证 | 待更新（AMC 官方版权） |

## SOTA 表现

- GPT-4o：约 9.3%
- o1：约 74.4%
- Gemini 2.5 Pro（无工具）：约 95%
- Gemini 2.5 Pro（含代码执行）：约 100%
- Seed2.0 Pro：约 98.3%

（以上分数来源于各机构发布的技术报告，具体评测条件（题目年份、轮次、工具使用）请参阅原始来源）


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Kimi-K2.6]] | 🔧 with | 100% | K2 Thinking 0905, perfect, with tools | 2026-05 | [link](https://llm-stats.com/benchmarks/aime) |
| 🥈 | [[GPT-5]] | 🔧 with | 100% | GPT-5.2 xhigh, AIME 2025 | 2026-04 | [link](https://artificialanalysis.ai/evaluations/aime-2025) |
| 🥉 | [[Gemini-3-Flash]] | 🔧 with | 100% | Reasoning, AIME 2025 | 2026-01 | [link](https://artificialanalysis.ai/) |
| 4 | [[Doubao-Seed-2.0]] | 🔧 with | 98.3% | Pro, maj@N | 2026-02 | [link](https://www.volcengine.com/) |
| 5 | [[Kimi-K2.5]] | 🔧 with | 96.1% | Reasoning | 2026-05 | [link](https://llm-stats.com/benchmarks/aime-2025) |
| 6 | [[GLM-5.1]] | 🔧 with | 95.7% | AIME 2025 | 2026-03 | [link](https://huggingface.co/zai-org/GLM-5.1) |
| 7 | [[GPT-5]] | 🚫 no | 94.6% | 初版 | 2025-08 | [link](https://openai.com/index/introducing-gpt-5/) |
| 8 | [[GLM-5]] | 🔧 with | 92.7% | AIME 2026 I | 2026-02 | [link](https://huggingface.co/zai-org/GLM-5) |
| 9 | [[o3]] | 🔧 with | 88.0% |  | 2024-12 | [link](https://openai.com/) |
| 10 | [[Doubao-Seed-1.6]] | 🔧 with | 86.7% | Seed-Thinking | 2025-06 | [link](https://www.volcengine.com/) |
| 11 | [[Gemini-2.5-Pro]] | 🚫 no | 86.7% |  | 2025-06 | [link](https://deepmind.google/) |
| 12 | [[GPT-5.5]] | 🚫 no | 81.2% | Pro | 2026-04 | [link](https://openai.com/) |
| 13 | [[Qwen3]] | 🔧 with | 81.0% | thinking | 2025-08 | [link](https://qwenlm.github.io/) |
| 14 | [[DeepSeek-R1]] | 🔧 with | 79.8% |  | 2025-01 | [link](https://api-docs.deepseek.com/) |
| 15 | [[Claude-3.7-Sonnet]] | 🔧 with | 78.3% | extended thinking | 2025-02 | [link](https://www.anthropic.com/) |
| 16 | [[Kimi-K1.5]] | 🔧 with | 77.5% |  | 2025-01 | [link](https://moonshot.ai/) |
| 17 | [[o1]] | 🔧 with | 74.4% |  | 2024-09 | [link](https://openai.com/) |
| 18 | [[Kimi-K2]] | 🚫 no | 53.1% |  | 2025-07 | [link](https://moonshot.ai/) |
| 19 | [[GPT-4o]] | 🚫 no | 9.5% | 已被覆盖 | 2024-05 | [link](https://openai.com/) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **潜在饱和风险**：顶级模型在 AIME 上的分数增长速度极快，部分模型已接近满分。若此趋势持续，AIME 也可能在数年内达到饱和，届时需要更高难度的竞赛题（如 IMO 级别）作为接替。[[2604.01754|LiveMathematicianBench]]（2026-05）实测发现：在更高难度的"数学家级别"题集上，GPT-5/Gemini-3 等前沿模型仅能达到 43.5% 准确率，与 AIME 上 95%+ 的表现形成强烈对比，这间接证实 AIME 的"高分"在更难分布上**不具备稳健泛化**。
- **评测年份依赖性**：不同模型报告的 AIME 分数往往基于不同年份的题目（如 AIME 2024 vs AIME 2025），直接对比需确认题目集完全一致，否则难度差异影响可比性。
- **工具使用条件不统一**：部分评测允许代码执行（Python 解题）、搜索或多轮迭代，部分仅允许直接生成，不同条件下的分数差异悬殊，跨报告比较时需特别注意评测协议。
- **饱和后的统计噪声放大**：当顶级模型在 AIME 上趋近 100% 时，模型间真实差距已小于标准评估的统计误差。[[2605.11209|Measuring Five-Nines Reliability]] 证明这种情况下若不采用 sample-efficient 估计，常见的"提升 1-2 个百分点"声明很可能在统计上不可靠（详见 [[benchmark-saturation]]）。

## 相关页面

- [[MATH]]
- [[GSM8K]]
- [[benchmark-saturation]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2411.09772|Beyond Static Tools: Evaluating Large Language Models for Cryptographic Misuse Detection]] · Zohaib Masood 等 · score 19/25

