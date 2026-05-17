---
title: "Tatsunori Hashimoto"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources: []
aliases:
  - Tatsu Hashimoto
  - Tatsunori B. Hashimoto
domain:
  - entity
---

# Tatsunori Hashimoto

> Stanford CS 助理教授，CRFM（基础模型研究中心）核心成员；评测方法论与可信度（calibration / hallucination / 数据污染）方向的代表研究者，HELM、DataComp-LM 等多个评测项目的核心推动者。

## 基本信息

- **所属机构**：Stanford University，Computer Science Department；Stanford CRFM
- **研究方向**：LLM evaluation / Reliable AI / Data-Centric ML / Statistical foundations of LLMs
- **学历背景**：MIT 博士（机器学习 / 统计），Stanford 博后

## 评测领域主要贡献

**HELM（Holistic Evaluation of Language Models）**：作为 Stanford CRFM 共同主导者之一，参与设计 HELM 多维评测框架，把准确率、稳健性、公平性、效率、毒性等 7 大维度系统化，奠定 2022 后学术 LLM 评测的多轴范式。

**DataComp-LM**：与 Tristan Thrush 等合作的数据中心化预训练评测基准；通过固定模型架构而比较训练数据质量，催生了「评测数据集，不是评测模型」的新研究方向。

**Self-Rewarding & Constitutional 风格评测**：在 RLHF/RLAIF 评测可靠性方面有系列论文，讨论 LLM-as-Judge 的位置偏差、自我偏好偏差等系统性缺陷量化。

**Hallucination / Calibration 测度**：提出多个用于测量 LLM 输出置信度与真实正确性之间差距的指标（如 FACTOR、SemanticEntropy 类）；对应到 [[TruthfulQA]] [[SimpleQA]] 等评测基准的方法论改进。

## 代表性工作

- HELM v1/v2（共同作者）
- DataComp-LM 评测套件
- 系列 LLM-as-Judge 偏差量化论文（2023-2025）
- Calibration / SemanticEntropy 等不确定性度量方法

## 相关页面

- [[HELM-Leaderboard]]
- [[Stanford-CRFM]]
- [[llm-as-judge]]
- [[benchmark-contamination]]
- [[truthfulness-eval]]
