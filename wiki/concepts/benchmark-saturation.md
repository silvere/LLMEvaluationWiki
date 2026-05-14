---
title: "Benchmark 饱和"
type: concept
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
aliases:
  - benchmark-saturation
domain:
  - benchmark-design
---

# Benchmark 饱和

> 随着模型能力持续提升，某个评测基准上的得分趋近上限，不再能区分顶尖模型之间的能力差异。

## 定义

Benchmark 饱和（Benchmark Saturation）指在某个评测集上，当前最强模型的分数已经接近满分或人类基准，导致该基准失去区分度，无法衡量更高能力的增量。

典型案例：
- **GSM8K**：顶尖模型准确率持续在 95%+ 以上，已失去对前沿模型的区分力
- **MMLU**：多个模型接近或超过"人类专家"基准（约 89%）
- **HumanEval**：pass@1 接近 90%，难以区分顶尖代码模型

## 成因

1. **模型能力超越基准设计的预期上限** — 基准在设计时未预期到模型能力的快速增长
2. **训练数据污染** — 评测题目泄露到训练集，分数虚高（见 [[benchmark-contamination]]）
3. **基准规模不足** — 题量过少时，统计噪声掩盖模型间真实差异

## 应对策略

- 提升难度：[[MMLU-Pro]]、[[GPQA]]（研究生级别题目）
- 动态基准：定期换题，减少污染并追踪难度前沿
- 人机比较基准：使用人类专家难以达到的题目（如竞赛数学、奥数）

## 相关页面

- [[benchmark-contamination]] — 污染对分数虚高的影响
- [[benchmark-design]] — 基准设计原则
- [[dynamic-benchmarks-concept]] — 动态基准以对抗饱和
