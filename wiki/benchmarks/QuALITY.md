---
title: "QuALITY"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, long-context]
language: en
year: 2022
authors: ["Pang et al."]
arxiv_id: "2112.08608"
official_url: "https://github.com/nyu-mll/quality"
license: "Apache-2.0"
size: 2523
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# QuALITY（Question Answering with Long Input Texts, Yes!）

> 基于长篇文章（平均约 5,000 词）的多选阅读理解基准，专门测试模型在长文本上的深度理解能力。

## 概述

QuALITY 由 Pang 等人于 2022 年提出（发表于 NAACL 2022），来自纽约大学。该数据集专门针对**长文本理解**场景：文章平均约 5,000 词，远超 SQuAD 等传统阅读理解数据集的文章长度，更接近现实中的长篇阅读场景。

数据集来源于 Gutenberg 项目和 Standard Ebooks 的公版科幻小说和文学作品。题目由专业标注者编写，要求只有在仔细阅读整篇文章之后才能回答，不允许通过局部段落检索得出答案。这是 QuALITY 的核心设计原则，也是其区别于其他阅读理解数据集的关键。

数据集包含 2,523 道四选一多选题，来自 233 篇文章（2,086 个文章-题目对）。每道题还标注了"难度"：专家标注者是否需要重新阅读才能确认答案。约 50% 的题目被标注为"难题（hard）"。

QuALITY 是评测语言模型长文本阅读理解能力的重要基准，被长上下文模型（如 Claude、GPT-4 Turbo）广泛用于能力验证。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2022 |
| 数据量 | 2,523 道题（来自 233 篇文章） |
| 格式 | 多选题（4 选 1） |
| 领域 | 长文本阅读理解 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 平均文章长度 | 约 5,000 词 |

## SOTA 表现

当前长上下文大型语言模型（如 GPT-4、Claude 3 系列）在 QuALITY 上的准确率超过 90%。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **规模较小**：仅 2,523 道题，统计稳定性有限
- **文学作品偏向**：来源主要为科幻小说，不代表其他长文本类型（如技术文档、法律文件）
- **需真正阅读全文**：无法通过检索特定段落捷径解答，对短上下文窗口模型不公平
- **长上下文计算成本**：长文本处理需要更多计算资源
- **翻译挑战**：文学作品翻译难度高，不易扩展到多语言版本

## 相关页面

- [[LongBench]]
- [[HELMET]]
- [[NeedleInAHaystack]]
- [[L-Eval]]
- [[SCROLLS]]
