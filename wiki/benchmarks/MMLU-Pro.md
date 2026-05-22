---
title: MMLU-Pro
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
domain:
- knowledge
- reasoning
language: en
year: 2024
authors:
- Yubo Wang
- Xueguang Ma
- Ge Zhang
- Yuansheng Ni
- Abhranil Chandra
- Shiguang Guo
- Weiming Ren
- Aaran Arulraj
- Xuan He
- Ziyan Jiang
- Wenhu Chen
arxiv_id: '2406.01574'
official_url: https://github.com/TIGER-AI-Lab/MMLU-Pro
official_leaderboard: https://huggingface.co/spaces/TIGER-Lab/MMLU-Pro
license: MIT
size: 12032
format: multiple-choice
saturation_status: active
sources:
- https://arxiv.org/abs/2406.01574
- https://github.com/TIGER-AI-Lab/MMLU-Pro
evaluation_protocol:
  default_shots: 5-shot CoT
  default_cot: true
  tool_use: false
  scoring: accuracy (10-way MCQ)
pitfalls:
- '**10 选项 vs MMLU 4 选项**：随机基线 10% vs 25%，分数与 MMLU 不可直接对比，常被混淆'
- MMLU-Pro 引入更多推理密集题，对 CoT 启用与否敏感（CoT 与非 CoT 差距 5-15pt），跨论文比较必须确认协议
- 尚未饱和：顶级模型 ~80-85%（DeepSeek-R1 84%，Claude Opus 4.6 ~82%），仍有区分度，是当前 MMLU 类替代首选
- 答案提取脚本敏感：CoT 输出多样格式，不同评测框架的解析规则不一致
- 14 学科分布不均（如 'engineering' 与 'philosophy' 题量差大），分子科目分数信噪比有限
dimension: A
subdimension: benchmark
sota:
- score: 90.99%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://artificialanalysis.ai/evaluations/mmlu-pro
  notes: MMLU-Pro（10 选项，比 MMLU 难得多）
- score: 89.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2025-12
  source: https://artificialanalysis.ai/evaluations/mmlu-pro
  notes: extended thinking
- score: 88.5%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2025-12
  source: https://llm-stats.com/benchmarks/mmlu-pro
  notes: Qwen3.6 Plus VL 版
- score: 87.4%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://arxiv.org/abs/2406.01574
  notes: MMLU-Pro 原始论文评测
- score: 77.4%
  model: Claude-3.5-Sonnet
  harness: null
  with_tools: false
  date: 2024-06
  source: https://llm-stats.com/benchmarks/mmlu-pro
  notes: 2024 初版，已被 4.x 系列大幅超越
---

# MMLU-Pro（Massive Multitask Language Understanding - Pro）

> MMLU 的升级版本，将选项数从 4 扩展至 10，并引入更多推理密集型题目，以恢复原 MMLU 已丧失的区分力。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://github.com/TIGER-AI-Lab/MMLU-Pro](https://github.com/TIGER-AI-Lab/MMLU-Pro)

<!-- AUTO-LINKS:END -->

## 概述

MMLU-Pro 于 2024 年由 Wang 等人发布，直接动机是应对原 MMLU 接近饱和的问题。随着顶级模型在 MMLU 上的分数逼近 88-90%，继续将其作为主要评测指标已失去实际意义，需要一个难度更高、区分度更强的继任基准。

MMLU-Pro 在原 MMLU 基础上做了两项关键改动：第一，将每道题的选项数从 4 个扩展至 10 个，随机猜测基线从 25% 降至 10%，极大压缩了猜测空间，要求模型具备更扎实的知识掌握；第二，大幅增加推理密集型题目的比例，相较于 MMLU 中部分依赖记忆即可作答的题目，MMLU-Pro 更强调多步推理过程的正确性。数据集共包含 12,032 道题，覆盖与 MMLU 相似的知识领域体系。

MMLU-Pro 的发布为 2024 年后的模型评测提供了一个更具挑战性的知识与推理综合基准。由于难度更高，当前顶级模型的表现仍有明显上升空间，尚未出现 MMLU 那样的天花板效应，因此成为 MMLU 退休后的主要接替选项之一。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 大小 | 12,032 题 |
| 题目格式 | 10 选项选择题（multiple-choice） |
| 覆盖领域 | 知识、推理（多学科，与 MMLU 体系类似） |
| 语言 | 英文 |
| 许可证 | 待更新 |

## SOTA 表现

- 顶级模型（2024-2025 年）：待更新


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 90.99% | MMLU-Pro（10 选项，比 MMLU 难得多） | 2026-02 | [link](https://artificialanalysis.ai/evaluations/mmlu-pro) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 89.5% | extended thinking | 2025-12 | [link](https://artificialanalysis.ai/evaluations/mmlu-pro) |
| 🥉 | [[Qwen3.6]] | 🚫 no | 88.5% | Qwen3.6 Plus VL 版 | 2025-12 | [link](https://llm-stats.com/benchmarks/mmlu-pro) |
| 4 | [[GPT-4o]] | 🚫 no | 87.4% | MMLU-Pro 原始论文评测 | 2024-05 | [link](https://arxiv.org/abs/2406.01574) |
| 5 | [[Claude-3.5-Sonnet]] | 🚫 no | 77.4% | 2024 初版，已被 4.x 系列大幅超越 | 2024-06 | [link](https://llm-stats.com/benchmarks/mmlu-pro) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **选项数增加带来的标注难度**：10 选项设计减少了猜测空间，但也意味着干扰项的设计质量直接影响题目有效性；部分题目的干扰项质量参差不齐，可能引入非预期的作答策略。
- **与 MMLU 的相关性问题**：MMLU-Pro 在设计上继承了 MMLU 的学科框架，若原 MMLU 题库存在数据污染，部分污染效应可能传导至 MMLU-Pro 的知识型题目上。
- **推理题评分依赖最终答案**：与 MMLU 一样，评分依然基于最终选项是否正确，而非推理过程本身，模型可能通过捷径得到正确答案而推理路径存在错误。

## 相关页面

- [[MMLU]]
- [[GPQA]]
- [[BBH]]
- [[benchmark-saturation]]
- [[data-contamination]]
