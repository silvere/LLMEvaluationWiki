---
title: "Scalable Oversight"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources: []
aliases:
  - scalable oversight
  - 可扩展监督
domain:
  - safety
---

# Scalable Oversight

> 当 AI 系统能力可能超过人类评测者个人理解水平时，如何设计仍可靠的评测/监督协议。是 [[safety-eval-landscape]] / [[capability-elicitation]] 议题的核心方法学线索。

## 核心方法

- **Debate**：让两个 AI 互相辩论同一问题，人类只判断哪方论证更可信
- **Weak-to-Strong Supervision**：用能力较弱的 supervisor 监督更强的模型，研究 reward signal degradation
- **AI-Assisted Human Evaluation**：人类评测者借助 AI 工具（fact-check、引用核查）来评估超过个人水平的输出
- **Recursive Reward Modeling (RRM)**：递归地用 AI 帮助评估更强 AI 的训练 reward
- **Constitutional AI**：把价值规则显式化，让 AI 在监督环路中执行
- **Process-based Supervision**：评估推理过程而非仅看最终输出（详见 [[process-reward-model]]）

## 代表研究者与机构

- [[Samuel-Bowman]]（NYU / Anthropic）
- [[Julian-Michael]]（NYU CDS）
- [[Anthropic]]（RLHF + Constitutional AI）
- [[ARC-Alignment]]（ELK + debate 议程）
- [[OpenAI]]（superalignment 团队）

## 相关页面

- [[capability-elicitation]]
- [[process-reward-model]]
- [[rlhf]]
- [[safety-eval-landscape]]
- [[GPQA]]
