---
title: "COPA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2011
authors: ["Gordon et al."]
arxiv_id: ""
official_url: "https://people.ict.usc.edu/~gordon/copa.html"
license: "BSD-2-Clause"
size: 1000
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# COPA（Choice of Plausible Alternatives）

> 测试因果推理能力的经典二选一问答基准，要求选出最合理的原因或结果。

## 概述

COPA（Choice of Plausible Alternatives）由 Gordon 等人于 2011 年提出，是自然语言推理领域的经典早期基准之一。每道题给出一个前提句子，并要求模型从两个候选项中选择最合理的原因（cause）或结果（result）。

例如：
- 前提："这个女孩从椅子上摔了下来。"
- 问题："这发生的原因是什么？"
- 选项 A："她失去了平衡。" / 选项 B："她感到无聊。"

COPA 的设计重点在于测试**因果推理**（causal reasoning）能力，而非单纯的知识记忆。题目均来自日常生活场景，语言简洁，但推理链路清晰。

原始数据集仅有 500 道题（开发集 500），后扩展到 1,000 道（加入测试集 500）。由于规模极小，COPA 的评测结果置信区间较宽。数据集是 SuperGLUE 的组成任务之一，并衍生了多个多语言版本（如 X-COPA）。

由于规模小和题目相对简单，现代大型语言模型在 COPA 上的准确率已接近 100%，数据集已高度饱和，主要用于基础能力验证。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2011 |
| 数据量 | 1,000 题（开发集 500 + 测试集 500） |
| 格式 | 多选题（2 选 1） |
| 领域 | 因果推理 |
| 语言 | 英文 |
| 许可证 | BSD-2-Clause |
| 数据来源 | 手工构建 |

## SOTA 表现

当前顶尖大型语言模型在 COPA 上的准确率接近 100%。人类基线约为 99%。数据集已高度饱和，不再是有效的区分性基准。

## 主要挑战与局限

- **规模极小**：仅 1,000 道题，统计可靠性差，一两道题的差异会显著影响百分比结果
- **高度饱和**：现代大型模型已接近满分，区分能力极低
- **二选一格式**：随机基线 50%，容易通过猜测获得较高分
- **日常场景局限**：题目主要来自日常生活，不覆盖专业或复杂场景
- **因果方向简单**：大多数因果关系直观明显，缺乏深层因果推理

## 相关页面

- [[SuperGLUE]]
- [[CommonsenseQA]]
- [[SocialIQA]]
- [[HellaSwag]]
- [[GLUE]]
