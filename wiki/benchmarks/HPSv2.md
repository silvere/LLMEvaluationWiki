---
title: "HPSv2"
type: tool
dimension: F
subdimension: preference
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2306.09341"
  - "https://github.com/tgxs002/HPSv2"
aliases:
  - HPSv2
  - HPS-v2
  - HPS v2
  - Human Preference Score v2
  - HPSv2.1
arxiv_id: "2306.09341"
official_url: "https://github.com/tgxs002/HPSv2"
license: "Apache-2.0"
org: "CUHK MMLab"
github_url: "https://github.com/tgxs002/HPSv2"
domain:
  - multimodal
  - vision
---

# HPSv2（Human Preference Score v2）

> 香港中文大学 MMLab 2023-06 推出的 T2I 偏好评分模型。基于 **HPD v2 数据集**（更平衡的人类偏好标注）训练，准确率全面超过 [[PickScore]] / [[ImageReward]]。HPSv2.1 进一步迭代到 84.1%。

## 性能对比（HPD v2 测试集）

| 模型 | 准确率 |
|---|---|
| **HPSv2.1** | **84.1%** |
| **HPSv2** | **83.3%** |
| PickScore | 79.8% |
| ImageReward | 74.0% |

## 设计

- **基座**：CLIP-H/14 fine-tune
- **训练数据**：HPD v2 = **更平衡**的 prompt 类型 + 多模型生成图（解决 PickScore 数据偏 SD 1.x 的问题）
- **算法响应性**：HPSv2 对「真实算法改进」的响应度更好（不仅是 aesthetic 偏好）

## 评测圈意义

- 当前公认的 T2I 偏好模型 SOTA 之一
- 是新 T2I 模型 release 时 reward signal 的首选（vs PickScore）
- 推动「benchmark 数据集平衡性」的方法论

## 已知 pitfall

- 与 [[ImageReward]] 在不同 prompt 上互有胜负，单一指标不可全信
- 训练数据集 prompt 风格分布仍有偏（如偏多写实少抽象）
- 对 photo-realistic 模型评分偏高，对艺术风格模型评分偏低

## 相关页面

- [[PickScore]]
- [[ImageReward]]
- [[reward-modeling]]
- [[GenEval]]
- [[multimodal-eval]]
