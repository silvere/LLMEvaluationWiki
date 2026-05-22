---
title: FEVER
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- knowledge
- hallucination
language: en
year: 2018
authors:
- Thorne et al.
arxiv_id: '1803.05355'
official_url: https://fever.ai/
license: CC-BY-SA-3.0
size: 185445
format: multiple-choice
status: active
saturation_threshold: 0.9
sources: []
dimension: I
subdimension: safety-benchmark
sota:
- score: 95.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: label accuracy on FEVER dev set
- score: 95.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: label accuracy on FEVER dev set
- score: 94.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: label accuracy on FEVER dev set
- score: 93.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: label accuracy on FEVER dev set
- score: 91.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: label accuracy, 2024 baseline
---

# FEVER（Fact Extraction and VERification）

> 大规模事实核查基准，要求模型从 Wikipedia 中检索证据并判断声明的真实性。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1803.05355](https://arxiv.org/abs/1803.05355)
- **官方主页**: [https://fever.ai/](https://fever.ai/)

<!-- AUTO-LINKS:END -->

## 概述

FEVER 由 Thorne 等人于 2018 年提出，来自谢菲尔德大学和爱丁堡大学（发表于 NAACL 2018）。该数据集是 NLP 领域最重要的**事实核查**（fact verification）基准之一，对推动该研究方向的发展起到了关键作用。

数据集构建方式：从 Wikipedia 中提取声明，由标注者通过修改、否定或增加干扰信息的方式生成声明，再由另一批标注者验证并标注支持证据。每条声明被标注为以下三类之一：
- **SUPPORTS**（支持）：Wikipedia 中有证据支持该声明
- **REFUTES**（反驳）：Wikipedia 中有证据反驳该声明
- **NOT ENOUGH INFO**（信息不足）：Wikipedia 中没有足够信息判断

数据集共约 185,445 条声明，分为训练集（145,449）、开发集（19,998）和测试集（19,998）。系统需要同时完成证据检索和判断两个子任务。

FEVER 推动了多个重要研究方向的发展，包括证据检索、自动化事实核查流程和多跳事实推理。FEVER 2.0 进一步引入了对抗样本。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 数据量 | 约 185,445 条声明 |
| 格式 | 三分类（SUPPORTS/REFUTES/NOT ENOUGH INFO） |
| 领域 | 事实核查 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-3.0 |
| 数据来源 | Wikipedia + 众包标注 |

## SOTA 表现

顶尖系统在 FEVER 共享任务中的标签准确率超过 90%。结合 Wikipedia 检索的完整流程（证据 + 判断）的得分略低。具体最新成绩见官方排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 95.8% | label accuracy on FEVER dev set | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 95.0% | label accuracy on FEVER dev set | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 94.5% | label accuracy on FEVER dev set | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 93.8% | label accuracy on FEVER dev set | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 91.0% | label accuracy, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **依赖 Wikipedia 覆盖范围**：仅能核查 Wikipedia 中包含的事实
- **时效性问题**：Wikipedia 内容更新，历史数据可能与当前内容不符
- **NOT ENOUGH INFO 类别模糊**：区分"信息不足"和"无法证伪"本身存在主观性
- **声明生成偏差**：人工修改的声明可能存在系统性模式，导致模型学到捷径
- **检索-推理耦合**：错误的检索会影响推理准确性

## 相关页面

- [[TruthfulQA]]
- [[FActScore]]
- [[HaluEval]]
- [[SimpleQA]]
- [[NaturalQuestions]]
