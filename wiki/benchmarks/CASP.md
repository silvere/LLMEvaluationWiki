---
title: "CASP (Critical Assessment of Structure Prediction)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://predictioncenter.org/"
aliases:
  - CASP
  - Critical Assessment of Structure Prediction
domain:
  - benchmark
  - science
---

# CASP（Critical Assessment of Structure Prediction）

> 自 1994 起每两年举办一次的蛋白质结构预测盲测，由 Maryland 大学 Prediction Center 组织。CASP14（2020）见证 [[AlphaFold|AlphaFold2]] 达到原子级精度（0.96 Å RMSD vs 第二名 2.8 Å），CASP15（2022）扩展到 protein complex，CASP16（2024-2025）转向 RNA / ligand / [[AlphaFold|AlphaFold3]] 等多模态生物分子。是科学 AI 评测的金标准。

## 设计

- **盲测协议**：实验测定但未公开的结构作为 hidden test set，参赛队伍提交预测
- **指标**：GDT-TS（Global Distance Test Total Score）/ RMSD / lDDT
- **类别**：Regular targets / Server targets / Refinement / Contacts / Complexes / RNA / Ligand

## 里程碑

- **CASP14（2020）**：AlphaFold2 中位 GDT-TS 92.4，宣告蛋白质结构预测问题被 AI 「解决」
- **CASP15（2022）**：AlphaFold-Multimer / RoseTTAFold2 进军 complex
- **CASP16（2024-25）**：[[AlphaFold|AlphaFold3]] / Boltz-1 等扩展到 protein-ligand / protein-nucleic-acid 复合体

## 评测圈意义

- 「held-out test set + 长周期盲测」是抵抗 [[benchmark-contamination|数据污染]] 的范例协议
- AI for Science 评测可复用该 cadence 设计（每 2 年盲测、社区共识）

## 相关页面

- [[AlphaFold]]
- [[Google-DeepMind]]
- [[ai-for-science-eval]]
- [[benchmark-contamination]]
