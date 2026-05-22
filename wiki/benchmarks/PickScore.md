---
title: "PickScore"
type: tool
dimension: F
subdimension: preference
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2305.01569"
  - "https://github.com/yuvalkirstain/PickScore"
aliases:
  - PickScore
  - Pick-a-Pic
arxiv_id: "2305.01569"
official_url: "https://github.com/yuvalkirstain/PickScore"
license: "MIT"
org: "Tel Aviv University"
github_url: "https://github.com/yuvalkirstain/PickScore"
domain:
  - multimodal
  - vision
---

# PickScore

> 2023-05 推出的 CLIP-based T2I 偏好打分模型。基于 **Pick-a-Pic 数据集**（百万级真实用户对生成图的偏好投票）训练，在「预测人类偏好」任务上达到**超人**表现。是 T2I 论文 RLHF / preference fine-tune 的常用 reward signal。

## 设计

- **基座**：CLIP-H/14
- **训练数据**：Pick-a-Pic v1 + v2（百万级 prompt × 多模型生成图 × 人工投票）
- **指标**：给定 prompt + 两张图，预测人类更偏好哪张
- **报告准确率**：HPD v2 测试集 79.8%（vs HPSv2 83.3% / ImageReward 74.0%）

## 评测圈意义

- 「**用真实用户数据**训练偏好模型」的代表（vs HPSv2 用 ChatGPT 排序）
- 被广泛用作 T2I 模型 RLHF / DPO 训练的 reward
- 与 [[HPSv2]] / [[ImageReward]] 形成 T2I 偏好模型三件套

## 已知 pitfall

- 训练数据由 Stable Diffusion 1.x 时代的图主导，对 FLUX/SD3 时代有 distribution gap
- 易被「美学风格」骗（rewards 高 aesthetic 而非高 alignment）
- 与 [[ImageReward]] 在不同 prompt 类型上互有胜负

## 相关页面

- [[HPSv2]]
- [[ImageReward]]
- [[reward-modeling]]
- [[GenEval]]
- [[multimodal-eval]]
