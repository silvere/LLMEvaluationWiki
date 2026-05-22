---
title: "LLMBar"
type: benchmark
dimension: K
subdimension: judge-benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2310.07641"
  - "https://github.com/princeton-nlp/LLMBar"
aliases:
  - LLMBar
  - LLM-Bar
arxiv_id: "2310.07641"
official_url: "https://github.com/princeton-nlp/LLMBar"
license: "MIT"
org: "Princeton NLP"
github_url: "https://github.com/princeton-nlp/LLMBar"
domain:
  - dialog
  - safety
---

# LLMBar

> Princeton NLP 2023-10 推出的 meta-evaluation 数据集，**专门评测 LLM judge 的公平性 / 抗欺骗性**。设计核心是「distractive output pair」——一个正确但风格朴素的答案 vs 一个错误但表面华丽（更长、更结构化、更多 emoji）的答案，看 judge 是否被表面质量欺骗。

## 设计

- **419 个 distractive pair**：每对一个客观正确答案 + 一个表面华丽但错误的答案
- **5 个子集**：Natural / Neighbor / GPTInst / GPTOut / Manual（按 distractor 来源分）
- **指标**：judge 选对（pick the correct）的准确率
- **判断对象**：GPT-4 / Claude / 开源 judge 等

## 关键发现

- 几乎所有 judge 都对**长度偏差**、**风格偏差**、**self-preference** 有明显敏感
- 加 "Be objective" 类指令能部分缓解
- 强调「judge 评测」与「judge 偏好」是两个不同问题

## 评测圈意义

- 是 [[JudgeBench]] / [[RewardBench]] 之外评测 judge **稳健性**的关键 benchmark
- 推动 length-controlled / style-controlled judge 设计
- 与 [[Arena-Hard-Auto]] 的 length-controlled win rate 思路一脉相承

## 已知 pitfall

- 419 对样本量偏小，单次结果方差大
- 5 个子集 distractor 风格差异显著，整体平均易掩盖问题
- 已部分纳入主流 judge benchmark 训练集，新 judge 可能 hack

## 相关页面

- [[JudgeBench]]
- [[RewardBench]]
- [[Arena-Hard-Auto]]
- [[llm-as-judge]]
