---
title: "MLE-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - code
  - science
year: 2024
arxiv_id: "2410.07095"
status: active
---

# MLE-Bench

> 机器学习工程代理评测基准（Machine Learning Engineering Benchmark），使用真实 Kaggle 竞赛任务评测 AI 代理端到端完成 ML 工程项目的能力。

## 概述

MLE-Bench 由 OpenAI 于 2024 年发布，使用来自 Kaggle 平台的 75 个真实机器学习竞赛任务评测 AI 代理的综合 ML 工程能力。与代码生成基准（如 HumanEval、SWE-bench）不同，MLE-Bench 要求代理完成完整的 ML 工作流：理解问题描述、进行数据探索（EDA）、特征工程、模型选择、训练调优，最终生成满足精度要求的提交文件。

基准的核心创新在于使用 **Kaggle 竞赛银牌（top 10%）或以上排名**作为通过标准，提供了客观可量化的专家水平参照系。参赛选手需要在时间和算力约束下完成竞赛，与人类参赛者直接对比。

MLE-Bench 覆盖表格数据、计算机视觉、自然语言处理、时间序列等多类 ML 任务，并特别设计了沙箱环境以防止代理"作弊"（如直接搜索已有解答）。评测结果显示，即使是最先进的代理系统，也仅能在少数任务上达到铜牌（top 40%）水平，距离银牌差距显著。

## 任务格式

- **任务数量**：75 个真实 Kaggle 竞赛
- **任务类型**：分类、回归、图像识别、NLP、推荐系统、时间序列预测
- **通过标准**：达到 Kaggle 竞赛银牌排名（top 10%）
- **时间限制**：每任务 24 小时 CPU/GPU 时间
- **执行环境**：隔离沙箱，禁止访问互联网和公开解答
- **评估方式**：竞赛官方指标（AUC、RMSE、mAP 等），与历史排行榜对比

## 主要指标

- **银牌达成率（Silver Medal Rate）**：达到 top 10% 的任务比例
- **铜牌达成率（Bronze Medal Rate）**：达到 top 40% 的任务比例
- **有效提交率**：成功生成合规提交文件的任务比例
- **分数归一化排名**：在各竞赛排行榜中的百分位

## 局限性

- 受计算资源限制，代理在 24 小时内的表现与给予充足资源时差距显著
- Kaggle 竞赛数据可能已部分出现在模型预训练数据中（数据污染风险）
- 任务覆盖领域以监督学习为主，强化学习、大模型微调等前沿 ML 范式覆盖不足

## 相关页面

- [[SWE-bench]]
- [[SWE-Lancer]]
- [[AgentBench]]
- [[TheAgentCompany]]
