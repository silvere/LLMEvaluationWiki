---
title: "Dan Hendrycks"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Dan Hendrycks

> MMLU、MATH、MMMU 等多个核心 benchmark 的主要作者，LLM 评测体系贡献最多的个人研究者之一。

## 基本信息

- **所属**：UC Berkeley（博士）→ Center for AI Safety（CAIS，非营利组织）
- **身份**：AI 安全研究员，多个标志性 benchmark 的创建者

## 主要 Benchmark 贡献

### MMLU（Massive Multitask Language Understanding）
覆盖 57 个学科领域的多选题评测集，是衡量 LLM 知识广度的最广泛引用 benchmark 之一。MMLU 曾在 LLM 能力讨论中几乎不可或缺，但因高度普及而受到严重数据污染（估计膨胀约 19.0%）。

### MATH
高难度数学竞赛题 benchmark，覆盖代数、几何、数论等数学分支，测试模型的数学推理深度。GPT-4 级别模型发布时大幅提升 MATH 分数，成为重要里程碑指标。

### MMMU（Massive Multitask Multimodal Understanding）
将 MMLU 的多学科覆盖扩展到多模态（图文）场景，包含需要理解图表、图像的大学级题目。MMMU-Pro 进一步增加难度，将 LMM 准确率压至 16.8%-26.9%。

### HarmBench
专注模型安全评测的 benchmark，系统性地测试模型对各类有害请求的拒绝能力，是红队测试研究的重要基准。

## 研究方向与影响

Dan Hendrycks 的研究横跨能力评测（MMLU、MATH）和安全评测（HarmBench）两个核心方向，是少数在两个方向都有标志性贡献的研究者。他在 CAIS 的工作聚焦于从长远视角研究 AI 安全风险，包括灾难性风险和价值对齐问题。

其创建的 benchmark 已成为全球 LLM 研究的基础设施，被数百篇论文引用，也被 OpenAI、Anthropic、Google 等机构用于模型评测报告。

## 局限

- MMLU 和 MATH 的广泛使用也带来了 Goodhart 定律问题：模型开始专门针对这些 benchmark 优化，分数的信息量随之下降。

## 相关页面

- [[benchmark-contamination]] — MMLU 污染数据来源
- [[multimodal-eval]] — MMMU 相关内容
- [[red-teaming]] — HarmBench 相关内容
- [[goodharts-law]] — 高知名度 benchmark 的共同困境
