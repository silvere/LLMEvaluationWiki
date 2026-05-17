---
title: "MMMU"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [multimodal, knowledge, reasoning]
language: en
year: 2023
authors: ["Yue et al."]
arxiv_id: "2311.16502"
official_url: "https://mmmu-benchmark.github.io"
license: ""
size: 11550
format: multiple-choice
status: active
saturation_threshold: 0.75
sources: [""]
---

# MMMU（Massive Multitask Multi-modal Understanding）

> 覆盖 30 个学科的专家级多模态评测基准，用于测试模型真正理解图像与文字结合内容的能力。

## 概述

MMMU 于 2023 年发布，全称 Massive Multitask Multi-modal Understanding，目标是衡量多模态大模型在专家级知识任务上的实际理解能力。区别于早期仅测试图像描述或简单视觉问答的基准，MMMU 的题目要求模型同时处理图像和文字，并结合专业领域知识作出推理——例如读懂医学影像、理解工程图纸或解析化学分子结构。

基准共包含 11,550 道题，跨越 30 个学科、183 个子类别，涵盖艺术、商业、医学、理工、人文、社会科学六大方向。题目素材来源于大学教材、专业考试和学术资料，整体难度设计面向大学本科及以上水平。每道题均配有一张或多张图像，图像不是装饰，而是解题的必要信息来源。

MMMU 的重要性在于它揭示了当前多模态模型的深层能力短板。其更难版本 MMMU-Pro 将主流模型的准确率压降至 16.8%–26.9%，说明很多模型依赖表面的文字线索而非真正理解图像内容，多模态推理能力与人类专家存在显著差距。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 大小 | 11,550 题（30 个学科，183 个子类） |
| 题目格式 | 多模态选择题（图文结合） |
| 覆盖领域 | 多模态、知识、推理 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态，尚未饱和。饱和阈值设定为 75%，当前主流前沿多模态模型的成绩在 50%–65% 区间（具体数字因版本和测试配置不同而有差异，以原始论文及各模型报告为准）。MMMU-Pro 的引入进一步拉开了区分度。污染风险相对较低，因为题目图像难以被预训练语料完整覆盖。

## 主要局限

- **评测成本高**：包含图像的多模态题目需要调用支持视觉的模型接口，评测计算和 API 成本显著高于纯文本基准。
- **学科覆盖不均**：不同学科的题目数量和难度分布不一致，部分冷门专业子类的题目数量少，统计方差较大。
- **MMMU-Pro 尚缺广泛对比数据**：Pro 版发布后，许多旧模型未重新评测，横向对比受限。

## 相关页面

- [[MMLU]]
- [[benchmark-saturation]]
- [[multimodal-eval]]

## 主流模型得分（来自 wiki/models/）

> 以下分数来自 wiki/models/ 中各模型的官方/技术报告数据。准确数字以模型方公布为准。

| 模型 | 分数 | 备注 |
|------|------|------|
| [[Qwen3.5|Qwen 3.5 (397B-A17B)]] | 85.0 | 2026-02 |
