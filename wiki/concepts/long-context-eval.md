---
title: "长上下文评测（Long-Context Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources: []
aliases:
  - long context evaluation
  - long-context evaluation
  - 长上下文评测
domain:
  - long-context
---

# 长上下文评测（Long-Context Evaluation）

> 评测 LLM 在 128K-1M+ token 输入下保持理解、检索、推理能力的方法学集合。从 2023 年 [[NIAH|Needle-in-a-Haystack]] 这种简单 retrieval 测试，演化到 [[RULER]] / [[LongBench-v2]] / [[NeedleBench]] 等多维度评测套件。

## 核心议题

- **Needle 在不同位置的回忆率**：早期 NIAH 系列发现 LLM 在长 context 中部位置回忆率显著下降（"middle is lost"）
- **多 needle / 多 hop**：单个 needle 测试饱和后，evaluation 转向多 needle、多 hop、跨段推理
- **位置偏差 vs 内容偏差**：让 LLM 处理同样信息但放在不同 context 位置，对比回答质量差异
- **噪声鲁棒性**：在 needle 之外注入大量看似相关的 distractor
- **真实任务长 context**：[[LongBench-v2]] 等用真实长文档（学术论文、法律文书）测试 QA / summarization

## 代表基准

- [[NIAH]]、[[RULER]]、[[NeedleBench]]、[[LongBench]]、[[LongBench-v2]]、[[InfiniBench]]

## 相关页面

- [[Zhilin-Yang]]（Moonshot Kimi 长上下文产品）
- [[Yi-Tay]]（LRA 早期长序列评测）
- [[benchmark-design]]
