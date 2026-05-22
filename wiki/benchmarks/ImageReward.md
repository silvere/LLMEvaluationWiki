---
title: "ImageReward"
type: tool
dimension: F
subdimension: preference
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2304.05977"
  - "https://github.com/THUDM/ImageReward"
aliases:
  - ImageReward
  - Image-Reward
arxiv_id: "2304.05977"
official_url: "https://github.com/THUDM/ImageReward"
license: "Apache-2.0"
org: "THUDM (清华大学)"
github_url: "https://github.com/THUDM/ImageReward"
domain:
  - multimodal
  - vision
---

# ImageReward

> 清华大学 [[Zhipu-AI|智谱]] 团队 2023-04 推出的**首个**通用 T2I 人类偏好 reward model（NeurIPS 2023）。基于 **137K 专家标注**（rating + ranking 双重）训练 BLIP-large。是 T2I RLHF 流派的奠基工作之一。

## 设计

- **基座**：BLIP-large 修改 head
- **训练数据**：137K 个 prompt-image pair 的专家 rating + ranking
- **标注 pipeline**：systematic annotation pipeline（rating + ranking 双重）→ 比单一 rating 更稳健
- **输出**：单一 reward score（可作 RLHF reward）

## 性能

- HPD v2 测试集 74.0%（弱于后续 [[PickScore]] / [[HPSv2]]）
- 但在「专家偏好」任务上仍有优势（专家标注 vs 众包）

## 评测圈意义

- **首个通用 T2I reward model**，奠定 T2I 偏好建模范式
- 推动 RLHF / DPO 用于 T2I（如 ReFL / DiffusionDPO）
- 与 [[PickScore]] / [[HPSv2]] 形成「专家 vs 真实用户 vs 平衡数据」三种数据范式

## 已知 pitfall

- 137K 标注体量小于 PickScore 的百万级
- 「专家」偏好可能与真实用户偏好有差距
- 已被 HPSv2 在多个 benchmark 上超越，但仍是「专家偏好」的代表

## 相关页面

- [[PickScore]]
- [[HPSv2]]
- [[Zhipu-AI]]
- [[reward-modeling]]
- [[GenEval]]
