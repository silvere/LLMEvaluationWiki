---
title: "Evaluation Reproducibility Crisis"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://en.wikipedia.org/wiki/AI_Snake_Oil"
aliases:
  - evaluation reproducibility crisis
  - eval reproducibility
  - 评测可重复性危机
domain:
  - other
---

# Evaluation Reproducibility Crisis

> LLM 评测在 2024-26 年的"可重复性危机"——同一 benchmark 在不同评测框架（HELM vs LM-Eval vs OpenCompass）、不同 prompt 模板、不同随机种子下分数差 3-5% 甚至更多，导致跨论文的 leaderboard 难以可靠对比。

## 核心问题

- **评测框架差异**：[[HELM]] / [[LM-Evaluation-Harness]] / [[OpenCompass]] / [[Inspect-AI]] 对同一 benchmark 的 prompt 模板、回答解析、scoring 规则各有差异
- **模型版本漂移**：API 模型（GPT-4 / Claude / Gemini）背后实际权重持续微调，同一 API 名称 6 个月前后表现不同
- **种子敏感性**：sampling temperature / random seed 对 pass@1 影响显著，1-2% 的"提升"可能在统计上不可靠
- **训练集泄露**：[[benchmark-contamination|数据污染]]——评测集出现在预训练数据里
- **Sample-efficient 估计缺失**：[[2605.11209]] 指出当模型趋近饱和时，不采用 sample-efficient 估计会让小差异噪声大于信号

## 代表性研究 / 批判者

- [[Sayash-Kapoor]] + [[Arvind-Narayanan]]：*AI Snake Oil* (Princeton 2024) 系统批判
- [[Tatsunori-Hashimoto]]：HELM 团队推动评测协议标准化
- [[Samuel-Bowman]]：在 GLUE/SuperGLUE 时代即关注 benchmark validity
- [[Stephen-Casper]]：tampering attack 揭示评测稳定性下界

## 缓解方向

- 多框架交叉验证
- 公开 prompt / 解析代码 / 随机种子
- 报告置信区间（如基于 [[Kendall-tau]] 的稳定性测度）
- 动态评测（[[Chatbot-Arena]] 类持续投票）

## 相关页面

- [[benchmark-contamination]]
- [[benchmark-saturation]]
- [[capability-elicitation]]
- [[llm-as-judge]]
