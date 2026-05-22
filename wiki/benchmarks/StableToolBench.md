---
title: "StableToolBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2403.07714"
  - "https://github.com/THUNLP-MT/StableToolBench"
aliases:
  - StableToolBench
  - Stable-ToolBench
domain:
  - benchmark
  - agent
dimension: D
subdimension: tool-use
---

# StableToolBench

> 2024-03 由清华 NLP（THUNLP）联合 01.AI / Google / 港大发布，是 [[ToolBench]] 的稳定化升级：用虚拟 API server + GPT-4 judge 解决真实 API 不稳定导致的评测复现性问题。被 ACL 2024 Findings 收录。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2403.07714](https://arxiv.org/abs/2403.07714)
- **GitHub**: [https://github.com/THUNLP-MT/StableToolBench](https://github.com/THUNLP-MT/StableToolBench)

<!-- AUTO-LINKS:END -->

## 设计

- **虚拟 API server**：用 cache + LLM-based simulator 模拟 ToolBench 16K+ API
- **MirrorAPI**：训练一个 LLM 模拟 7K+ 工具响应，规避真实 API rate-limit / 下线 / 价格变化
- **稳定指标**：
  - **Solvable Pass Rate** —— 仅在「该任务可解」前提下评通过率
  - **Solvable Win Rate** —— GPT-4 judge pairwise 胜率
- **目的**：让 tool-use 评测 reproducible，跨时间可对比

## 与 ToolBench 关系

- [[ToolBench]]（[[Yujia-Qin]] et al., 2023）是 baseline，但用真实 API → 不稳定
- StableToolBench 是同团队的「修复版」，是后续 tool-use 论文的标准对照

## 相关页面

- [[ToolBench]]
- [[Yujia-Qin]]
- [[Tsinghua-NLP]]
- [[agent-eval]]
- [[tool-use-eval]]
