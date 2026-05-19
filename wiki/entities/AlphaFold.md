---
title: "AlphaFold"
type: entity
entity_type: model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://www.nature.com/articles/s41586-021-03819-2"
  - "https://www.nature.com/articles/s41586-024-07487-w"
aliases:
  - AlphaFold
  - AlphaFold2
  - AlphaFold3
  - AF2
  - AF3
domain:
  - entity
---

# AlphaFold（蛋白质结构预测系列）

> [[Google-DeepMind]] 研发的蛋白质结构预测模型系列，由 [[Demis-Hassabis]] 主导。AlphaFold2（2020，CASP14）首次达到原子级精度，2024 获诺贝尔化学奖（Hassabis + Jumper）；AlphaFold3（2024）扩展到 protein-ligand / DNA / RNA 复合体。是 AI for Science 评测协议（[[CASP]]）的核心参考。

## 演进

- **AlphaFold1（2018）**：CASP13，已显著领先但未达原子级
- **AlphaFold2（2020）**：[[CASP]]14 GDT-TS 92.4，0.96 Å RMSD vs 第二名 2.8 Å，事实上「解决」蛋白质单体结构预测
- **AlphaFold-Multimer（2021）**：扩展到 protein complex
- **AlphaFold3（2024）**：扩展到 protein + ligand + DNA / RNA / ion，所有生物分子统一架构（diffusion-based）
- **AlphaFold Server（2024）**：免费在线服务，社区共享

## 评测里程碑

- 2020 CASP14：宣告 AI 在结构预测领域达到实验级精度
- 2024 Nobel 化学奖（Hassabis + Jumper + David Baker）
- 2024-25 CASP16：AlphaFold3 + Boltz-1 等扩展到多生物分子

## 评测协议影响

- 「held-out blind test + 长周期社区共识」（[[CASP]]）成为 AI for Science 评测范式
- 推动 NeurIPS / ICLR 等会议接受「pure benchmark paper」作为主要 contribution

## 相关页面

- [[CASP]]
- [[Demis-Hassabis]]
- [[Google-DeepMind]]
- [[ai-for-science-eval]]
