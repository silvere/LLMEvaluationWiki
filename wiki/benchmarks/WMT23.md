---
title: "WMT23 (Conference on Machine Translation 2023)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multilingual]
language: en
year: 2023
authors: ["Tom Kocmi", "Eleftherios Avramidis", "Rachel Bawden", "Ondřej Bojar", "Anton Dvorkin", "Christian Federmann", "Mark Fishel", "Markus Freitag", "Thamme Gowda", "Roman Grundkiewicz", "Barry Haddow", "Marzena Karpinska", "Philipp Koehn", "Singdhansu Chatterjee"]
arxiv_id: "2311.09979"
official_url: "https://www2.statmt.org/wmt23/"
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.85
sources:
  - "Kocmi, T., et al. (2023). Findings of the 2023 Conference on Machine Translation (WMT23). WMT 2023."
---

# WMT23

## 概述

WMT（Conference on Machine Translation）是机器翻译领域最权威的年度竞赛与评测会议，由 EMNLP 机器翻译工作坊演变而来。WMT23 于 2023 年举办，为该系列的第 23 届，包含多个翻译方向的竞赛任务，并发布了大规模多语言翻译评测数据集。WMT 系列是机器翻译质量评测和自动评测指标研究的标准数据来源。

## 主要任务与语言对

WMT23 包含通用翻译竞赛，覆盖以下主要语言对（部分）：

| 方向 | 语言对 |
|------|--------|
| 英↔德 | English ↔ German |
| 英↔中 | English ↔ Chinese |
| 英↔日 | English ↔ Japanese |
| 英↔俄 | English ↔ Russian |
| 英↔捷 | English ↔ Czech |
| 英↔希 | English ↔ Ukrainian |
| 英↔希 | English ↔ Hebrew |

此外还有专项任务：生物医学翻译、自动后编辑（APE）、质量估计（QE）、低资源语言翻译等。

## 人工评测：MQM

WMT23 及近年 WMT 竞赛采用 **MQM（Multidimensional Quality Metrics）** 框架进行人工评测，该框架：

- 将翻译错误按类型标注（忠实度、流利度、术语等）
- 按严重性（Critical/Major/Minor）计分
- 比早期的 Direct Assessment（DA）方法更细粒度，适合区分高质量系统

## 自动指标竞赛（Metrics Shared Task）

WMT23 包含专门的**自动评测指标竞赛**，测试各种自动指标（BLEU、chrF、COMET、MetricX 等）与 MQM 人工评测的相关性。WMT 指标竞赛的结果被广泛引用，是评测自动翻译指标可靠性的权威参考。

历年竞赛推动了翻译指标的持续进步：
- BLEU → METEOR → chrF → BERTScore → COMET → MetricX（GEMBA）

## 数据集

WMT23 提供的数据集包含：
- 各语言对的源语言测试集
- 参考译文
- 竞赛系统翻译输出
- 人工评测分数（MQM 标注）

这些数据被后续研究广泛用于开发和验证新的翻译评测指标。

## LLM 时代的影响

2022-2023 年起，LLM 开始以惊人的方式冲击机器翻译竞赛：

- GPT-4 等通用 LLM 在多个语言对上的翻译质量已达到或超过专门翻译系统
- "LLM 在翻译上是否已经达到人类水平"成为 WMT 讨论的核心议题
- WMT23 的人工评测结果首次将 GPT-4 系统排在多个竞赛任务的前列

## 局限性

- WMT 数据主要来自新闻领域，对其他文本类型（法律、文学、口语等）的代表性不足
- 竞赛排名每年变化，历史比较需注意评测标准变化
- 低资源语言的人工评测标注质量参差不齐

## 相关评测系列

- **WMT22**、**WMT24**：同系列的前后届竞赛
- **Flores-200**：200 种语言的翻译评测数据集
- **COMET**：WMT 人工评测中表现最优的自动翻译指标之一
