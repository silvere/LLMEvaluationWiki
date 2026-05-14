---
title: "Zero-SCROLLS"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [long-context, reasoning]
language: en
year: 2023
authors: ["Shaham et al."]
arxiv_id: "2305.14196"
official_url: "https://www.zero.scrolls-benchmark.com/"
license: "Multiple"
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# Zero-SCROLLS

> SCROLLS 的零样本评测版本，去除了 few-shot 示例，更适合评测当代大型语言模型的长文本理解能力。

## 概述

Zero-SCROLLS 由 Shaham 等人于 2023 年提出（发表于 EMNLP 2023），是 SCROLLS 基准的零样本（zero-shot）变体版本。原版 SCROLLS 在设计时主要面向需要 few-shot 提示的早期预训练语言模型，而 Zero-SCROLLS 面向当代指令微调的大型语言模型（如 ChatGPT、GPT-4、Claude 等），它们更适合零样本指令跟随场景。

Zero-SCROLLS 的主要改进包括：
- **去除 few-shot 示例**：避免示例本身占用宝贵的上下文窗口
- **更新评测提示**：使用更适合指令微调模型的自然语言提示
- **新增子任务**：在原版 SCROLLS 基础上进行了部分任务调整
- **实时排行榜**：提供持续更新的模型排名

Zero-SCROLLS 包含与 SCROLLS 相似的长文档任务（GovReport、SumScr、QMSum、Qasper、NarrativeQA、QuALITY、ContractNLI 等），但通过零样本设置更准确地评测现代大型语言模型在未见任务上的泛化能力。

该基准使得研究者可以更公平地比较不同指令微调策略和上下文窗口大小对长文本理解能力的影响。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 子任务数 | 与 SCROLLS 相似，部分有调整 |
| 格式 | 开放式（零样本） |
| 领域 | 多领域长文档 |
| 语言 | 英文 |
| 许可证 | 各子任务许可证不同 |
| 评测设置 | 零样本（Zero-shot） |

## SOTA 表现

顶尖长上下文大型语言模型在 Zero-SCROLLS 各子任务上的表现见官方排行榜。

## 主要挑战与局限

- **零样本敏感度**：评测结果对提示词（prompt）设计较为敏感
- **ROUGE 评测局限**：与 SCROLLS 相同，摘要评测指标不够可靠
- **长文本计算开销**：需要大上下文窗口支持
- **子任务质量差异**：继承了 SCROLLS 各子任务的质量问题
- **排行榜更新延迟**：社区提交不够活跃时排行榜可能反映过时信息

## 相关页面

- [[SCROLLS]]
- [[LongBench]]
- [[HELMET]]
- [[QuALITY]]
- [[NeedleInAHaystack]]
