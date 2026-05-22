---
title: Codeforces
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
year: 2024
arxiv_id: '2501.01257'
status: active
sota:
- score: '3206'
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-04
  source: https://codersera.com/blog/deepseek-v4-vs-claude-opus-4-7/
  notes: Elo（CodeElo 框架，Legendary Grandmaster 级）
- score: '3020'
  model: Doubao-Seed-2.0
  harness: null
  with_tools: false
  date: 2025-11
  source: https://team.doubao.com/zh/special/doubao_seed
  notes: Elo（Pro），Doubao-Seed-2.0 报告
- score: '2727'
  model: o3
  harness: null
  with_tools: false
  date: 2026-01
  source: https://openai.com/index/openai-o3-system-card/
  notes: Elo，真实 Codeforces 提交（99.8th percentile）
- score: '2029'
  model: DeepSeek-R1
  harness: null
  with_tools: false
  date: 2025-01
  source: https://arxiv.org/abs/2501.12948
  notes: Elo（CodeElo），96.3th percentile，DeepSeek R1 报告
- score: '808'
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-06
  source: https://codeforces.com/blog/entry/133874
  notes: Elo，Codeforces 官方评测帖（11th percentile，2024 基线）
- score: '94'
  model: Kimi-K1.5
  harness: null
  with_tools: false
  date: 2025-01
  source: https://arxiv.org/abs/2501.12599
  notes: percentile（非 Elo），Kimi K1.5 报告（注：与上方 Elo 不同量纲）
dimension: H
---

# Codeforces

> 以 Codeforces 竞技编程平台真题为基础、采用 ELO 评分系统评测 LLM 竞技编程能力上限的基准体系（代表性实现：CodeElo）。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[DeepSeek-V4-Pro]] | 🚫 no | 3206 | Elo（CodeElo 框架，Legendary Grandmaster 级） | 2026-04 | [link](https://codersera.com/blog/deepseek-v4-vs-claude-opus-4-7/) |
| 🥈 | [[Doubao-Seed-2.0]] | 🚫 no | 3020 | Elo（Pro），Doubao-Seed-2.0 报告 | 2025-11 | [link](https://team.doubao.com/zh/special/doubao_seed) |
| 🥉 | [[o3]] | 🚫 no | 2727 | Elo，真实 Codeforces 提交（99.8th percentile） | 2026-01 | [link](https://openai.com/index/openai-o3-system-card/) |
| 4 | [[DeepSeek-R1]] | 🚫 no | 2029 | Elo（CodeElo），96.3th percentile，DeepSeek R1 报告 | 2025-01 | [link](https://arxiv.org/abs/2501.12948) |
| 5 | [[GPT-4o]] | 🚫 no | 808 | Elo，Codeforces 官方评测帖（11th percentile，2024 基线） | 2024-06 | [link](https://codeforces.com/blog/entry/133874) |
| 6 | [[Kimi-K1.5]] | 🚫 no | 94 | percentile（非 Elo），Kimi K1.5 报告（注：与上方 Elo 不同量纲） | 2025-01 | [link](https://arxiv.org/abs/2501.12599) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2501.01257](https://arxiv.org/abs/2501.01257)

<!-- AUTO-LINKS:END -->

## 概述

Codeforces 竞技编程平台（codeforces.com）创建于 2009 年，是全球最具影响力的算法竞赛平台之一，拥有超过 40 万道题目和数百万注册用户，题目难度覆盖入门到 IOI/ICPC 级别，并使用基于 TrueSkill 的 **ELO/Rating 评分系统**对参赛选手建立可比较的能力等级。

以 Codeforces 题目为基础评测 LLM 代码生成能力的方法论在 2024-2025 年间形成系统体系，代表性工作为 Qwen 团队于 2025 年 1 月发布的 **CodeElo**（arXiv 2501.01257）。CodeElo 通过以下创新解决了传统竞技编程 LLM 评测的核心挑战：其一，将模型解答**直接提交至 Codeforces 官方评测服务器**（online judge），利用平台私有测试用例和 Special Judge 进行评测，彻底避免了测试用例泄露问题；其二，构建了与平台人类参赛者**可比较的 ELO 评分计算系统**，使模型能力得以在统一标尺上与人类水平对比。

CodeElo 基准包含近 6 个月的 Codeforces 竞赛真题，附带比赛分组（Division）、题目难度分（Rating）和算法标签等元数据。对 30 个开源模型和 3 个闭源模型的评测结果显示，绝大多数模型难以解决最简单的题目，仅 o1-mini 和 QwQ-32B-Preview 显著超越其他模型，且大部分模型的 ELO 评分落在人类参赛者的后 20%。

## 任务格式

- 题目来源：Codeforces 最近 6 个月竞赛题目（含 Division 1-4 全部组别）
- 题目元数据：比赛组别、题目难度分（Rating 800–3500）、算法标签（如 DP、图论、数学）
- 输入输出：标准算法竞赛格式（stdin/stdout），支持 Special Judge 和交互题
- 模型提交：直接向 Codeforces 官方服务器提交代码，使用平台私有测试用例和评判系统
- 评测：基于比赛时间线模拟提交，计算与平台人类参赛者可比较的 ELO 评分
- 支持语言：C++、Python 等 Codeforces 支持的主流编程语言

## 主要指标

- **ELO Rating**：基于平台人类参赛者评分体系计算的模型能力评分，主要指标，可直接与人类水平对比
- **Pass@1**：单次生成通过测试的题目比例
- **按难度分层的通过率**：分别统计不同 Rating 区间（如 ≤1000、1001–1500、1501–2000 等）的解题比例，分析模型能力上限
- **按算法类型分层的通过率**：分析模型在特定算法（DP、数据结构、数学等）上的强弱

## 局限性

- 评测依赖 Codeforces 在线评测服务器，存在提交频率限制、网络延迟和平台可用性风险
- ELO 评分受提交顺序、比赛选择和模型随机性影响显著——研究表明，变换提交顺序可导致评分波动高达 394 分，比赛选择不同可造成同一模型差距达 1,122 分
- 题目来源于近期竞赛，对数据新鲜度有要求，需持续更新以避免训练集污染
- 评测效率低，每道题的在线评测成本高，难以支持大规模超参数调优实验
- 竞技编程能力不能代表通用软件工程能力，模型在 CF 上的表现与实际工程代码质量的相关性有待验证

## 相关页面

- [[LiveCodeBench]]
- [[HumanEval]]
- [[APPS]]
- [[SWE-bench-Verified]]

