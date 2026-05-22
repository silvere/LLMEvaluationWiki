---
title: "JudgeLM"
type: tool
dimension: K
subdimension: judge-model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2310.17631"
  - "https://github.com/baaivision/JudgeLM"
aliases:
  - JudgeLM
  - JudgeLM-7B
  - JudgeLM-33B
arxiv_id: "2310.17631"
official_url: "https://github.com/baaivision/JudgeLM"
license: "Apache-2.0"
org: "BAAI Vision"
github_url: "https://github.com/baaivision/JudgeLM"
domain:
  - dialog
---

# JudgeLM

> BAAI Vision 2023-10 推出的 fine-tuned scalable LLM judge（ICLR 2025 Spotlight）。提供 7B/13B/33B 三档，专门 fine-tune 用于评测 open-ended 输出。引入 swap augmentation / reference support / reference drop 三项技术降低 judge 偏差。

## 关键贡献

- **三项防偏差技术**：
  - Swap augmentation：训练时随机交换 A/B 位置，缓解 position bias
  - Reference support：可选喂入参考答案
  - Reference drop：训练时随机 drop 参考避免过拟合
- **吞吐**：JudgeLM-7B 8×A100 上 3 分钟评 5000 对，比 sequential CoT judge 快 133×
- **准确率**：超过 PandaLM-7B / Auto-J-13B / GPT-3.5（在 JudgeLM 自有 validation set 上）

## 已知 pitfall

- 训练数据由 GPT-4 生成偏好标签 → 继承 GPT-4 偏好风格
- 「自己 validation set 上 SOTA」≠ 跨任务泛化
- 跨语言能力弱（英文为主）

## 相关页面

- [[PandaLM]]
- [[Auto-J]]
- [[RewardBench]]
- [[llm-as-judge]]
