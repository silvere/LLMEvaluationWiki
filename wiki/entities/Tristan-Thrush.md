---
title: "Tristan Thrush"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources: []
aliases:
  - Tristan Thrush
domain:
  - entity
---

# Tristan Thrush

> Stanford / Allen AI 评测研究者，DataComp-LM 主导作者之一；专注「数据为先（data-centric）」评测范式与稳健性测度。

## 基本信息

- **所属机构**：Stanford University（前 Allen AI / Hugging Face）
- **研究方向**：Data-centric ML / Pretraining evaluation / Multimodal benchmark design
- **合作圈**：与 Tatsunori Hashimoto、Ludwig Schmidt、Vaishaal Shankar 等共同推动数据中心化评测

## 评测领域主要贡献

**DataComp-LM**：作为核心作者，建立首个固定模型架构、只比较预训练数据质量的大规模评测基准（DCLM 1B / 7B 系列）。该范式扭转了 LLM 评测仅关注「模型 + 训练步数」的传统视角，让数据质量成为可量化的独立维度。

**DataComp（多模态版本）**：与图像-文本预训练数据相关的对应评测套件 DataComp（前身），为 CLIP 类模型提供 standardized 训练数据评测。

**Robustness / OOD eval**：参与 Adversarial NLI（[[ANLI]]）等对抗稳健性评测的早期工作，关注模型在分布外测试集上的表现稳定性。

## 代表性工作

- DataComp-LM（2024 NeurIPS）
- DataComp（multimodal training set evaluation，2023）
- Dynabench 早期参与（动态评测框架）

## 相关页面

- [[Stanford-CRFM]]
- [[AI2]]
- [[Hugging-Face]]
- [[Tatsunori-Hashimoto]]
- [[benchmark-design]]
