---
title: "RULER"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [long-context, reasoning, retrieval]
language: en
year: 2024
authors: ["Hsieh et al."]
arxiv_id: "2404.06654"
official_url: "https://github.com/hsiehjackson/RULER"
license: ""
size: 0
format: multiple-choice
status: active
saturation_threshold: 0.80
sources: [""]
---

# RULER（Ruler Unified Long-context Evaluation for Language Models）

> 专为测试长上下文理解能力设计的综合评测框架，覆盖 4K 到 128K 的上下文长度，揭示模型声称能力与实际性能之间的差距。

## 概述

RULER 于 2024 年发布，全称 Ruler Unified Long-context Evaluation for Language Models，是专门评测大语言模型长上下文处理能力的综合框架。其设计动机源于一个普遍现象：许多模型在技术规格上声称支持 128K 乃至更长的上下文窗口，但在实际使用中，随着输入长度增加，模型性能往往大幅下滑，尤其是在需要从长文档中精准检索或跨段落推理时。

RULER 提供多种任务类型，涵盖单跳检索（needle-in-a-haystack 变体）、多跳推理（需要跨多个证据片段推理）、聚合任务（统计某类信息出现次数）以及问答任务。所有任务均可在不同上下文长度（4K、8K、16K、32K、64K、128K）下运行，使得研究者可以系统性地观察模型能力随上下文长度的衰减曲线。

RULER 的核心贡献在于用可控、可重复的方式量化了"上下文长度声称值"与"有效上下文长度"之间的差距——后者是模型真正能可靠利用的上下文范围。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 大小 | 待核实（依任务类型和长度配置动态生成） |
| 题目格式 | 多种任务（检索、多跳推理、聚合、问答） |
| 覆盖领域 | 长上下文、推理、检索 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态。由于任务可按上下文长度参数化生成，理论上不易因题目记忆而被污染。随着模型上下文窗口规格持续扩大（部分模型已声称支持 1M token），RULER 的高端测试配置仍有评测价值。饱和阈值设为 80%，当前多数顶级模型在 4K-16K 段表现尚可，但在 64K 以上长度下性能普遍下滑明显（具体数值以各模型论文为准）。

## 主要局限

- **合成任务与真实场景存在差距**：RULER 的部分任务（如在大量填充文本中检索特定字符串）属于合成构造，与用户真实使用长上下文的场景不完全等价。
- **填充文本质量影响结果**：Needle-in-a-haystack 类任务对填充文本的选择敏感，若填充文本与关键信息存在语义关联，会影响结果的可解释性。
- **缺乏标准化排行榜**：RULER 尚无被广泛认可的统一排行榜，各方测试结果需注意配置是否一致。

## 相关页面

- [[LongBench-v2]]
- [[LongBench-v2]]
- [[data-contamination]]
