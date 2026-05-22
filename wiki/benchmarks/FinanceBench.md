---
title: FinanceBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- knowledge
- reasoning
language: en
year: 2023
authors:
- Islam et al.
arxiv_id: '2311.11944'
official_url: https://github.com/patronus-ai/financebench
license: CC-BY-4.0
size: 150
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: A
subdimension: benchmark
sota:
- score: 92.8%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://huggingface.co/datasets/PatronusAI/financebench
  notes: accuracy with retrieval tool access
- score: 90.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://huggingface.co/datasets/PatronusAI/financebench
  notes: accuracy with retrieval tool access
- score: 88.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://huggingface.co/datasets/PatronusAI/financebench
  notes: accuracy with retrieval tool access
- score: 86.0%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: true
  date: 2026-02
  source: https://deepseek.com
  notes: accuracy with retrieval tool access
- score: 81.0%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: accuracy with retrieval, 2024 baseline
---

# FinanceBench

> 基于真实上市公司财务报告的金融问答基准，评测模型对财务文档的准确理解和数值推理能力。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2311.11944](https://arxiv.org/abs/2311.11944)
- **官方主页**: [https://github.com/patronus-ai/financebench](https://github.com/patronus-ai/financebench)

<!-- AUTO-LINKS:END -->

## 概述

FinanceBench 由 Islam 等人于 2023 年提出，来自 Patronus AI。该数据集专注于评测语言模型对**真实金融文档**（主要是上市公司 10-K、10-Q 等 SEC 报告）的理解和推理能力，是金融 AI 评测领域的重要基准。

数据集包含 150 道问题，来自真实的公司年报和季报。题目涵盖多种金融分析任务：
- **数值提取**：从财务报表中提取特定数字
- **计算推理**：基于财务数据进行计算（如收入增长率、毛利率等）
- **比较分析**：对比不同年度或公司的财务指标
- **定性理解**：理解管理层讨论和分析部分的文字内容

FinanceBench 的独特价值在于：
1. **真实性**：使用真实的 SEC 报告，而非模拟数据
2. **准确性要求高**：金融数据的错误代价极大，要求近乎完美的准确率
3. **长文档**：真实年报通常数十至数百页，测试长文本处理能力
4. **数值推理**：需要精确的数学计算

研究发现，即使是 GPT-4 在 FinanceBench 上的准确率也只有约 50-60%，显示当前模型在金融文档精确理解方面仍有较大提升空间。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 150 道问题 |
| 格式 | 开放式（数值/文本答案） |
| 领域 | 金融文档理解 |
| 语言 | 英文 |
| 许可证 | CC-BY-4.0 |
| 数据来源 | 真实 SEC 财务报告 |

## SOTA 表现

顶尖大型语言模型（GPT-4o、Claude 3.5 Sonnet 等）在 FinanceBench 上配合 RAG 系统的准确率约为 70-85%。具体最新成绩见各模型官方技术报告及 GitHub。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🔧 with | 92.8% | accuracy with retrieval tool access | 2025-09 | [link](https://huggingface.co/datasets/PatronusAI/financebench) |
| 🥈 | [[Claude-Opus-4.7]] | 🔧 with | 90.5% | accuracy with retrieval tool access | 2026-04 | [link](https://huggingface.co/datasets/PatronusAI/financebench) |
| 🥉 | [[Gemini-3.1-Pro]] | 🔧 with | 88.5% | accuracy with retrieval tool access | 2026-03 | [link](https://huggingface.co/datasets/PatronusAI/financebench) |
| 4 | [[DeepSeek-V4-Pro]] | 🔧 with | 86.0% | accuracy with retrieval tool access | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🔧 with | 81.0% | accuracy with retrieval, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **规模极小**：150 道题统计可靠性非常有限
- **数据时效性**：财务数据反映特定时间点，可能存在模型训练数据泄露
- **数值精确性要求高**：金融计算需要精确到小数位
- **文档格式复杂**：PDF 格式的财务报告中表格、图表处理困难
- **覆盖公司有限**：主要涉及美国上市公司，不代表全球金融市场

## 相关页面

- [[LegalBench]]
- [[MedQA]]
- [[DROP]]
- [[NaturalQuestions]]
- [[MMLU]]
