---
title: "InfiniBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2406.19875"
  - "https://vision-cair.github.io/Infinibench/"
aliases:
  - InfiniBench
domain:
  - benchmark
  - video
  - multimodal
---

# InfiniBench

> KAUST Vision-CAIR 2024-06 推出的超长视频理解 benchmark：1,000+ 小时电影 / 电视剧素材，平均 53 分钟（最长 201 分钟），108.2K QA pairs 覆盖 9 类技能（grounding + reasoning）。是 LMM 在「电影级长视频」场景下的事实测评，揭示 GPT-4o 在 grounding 类只能拿 47.1%。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2406.19875](https://arxiv.org/abs/2406.19875)
- **项目主页**: [https://vision-cair.github.io/Infinibench/](https://vision-cair.github.io/Infinibench/)

<!-- AUTO-LINKS:END -->

## 设计

- **视频规模**：>1,000 小时，平均 53 分钟，max 201 分钟（3.35h）
- **任务数**：108.2K QA（MCQ + open-ended）
- **9 类技能**：scene transitions / character actions / deep context / multi-event linking 等
- **评测**：MCQ 用 accuracy；open-ended 由 GPT-4o 打 0-5 分

## 结果

- 最佳模型 GPT-4o 在 grounding-based skills 仅 47.1%
- 大多数 LMM 接近随机基线，说明长视频理解仍远未解决

## 与其他长视频 benchmark 关系

- [[Video-MME]] 关注短-长 mix；InfiniBench 专攻电影级
- [[LongBench-v2]] 文本长上下文；InfiniBench 视频长上下文
- [[MT-Video-Bench]] 关注多轮视频对话

## 相关页面

- [[Video-MME]]
- [[multimodal-eval]]
- [[long-context-eval]]
