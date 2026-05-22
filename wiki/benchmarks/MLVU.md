---
title: MLVU
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
- long-context
year: 2024
arxiv_id: '2406.04264'
status: active
dimension: long-ctx
sota:
- score: 85.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/JUNJIE99/MLVU
  notes: MLVU long video understanding accuracy
- score: 84.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/JUNJIE99/MLVU
  notes: accuracy
- score: 83.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/JUNJIE99/MLVU
  notes: accuracy
- score: 82.0%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/JUNJIE99/MLVU
  notes: accuracy
- score: 64.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/JUNJIE99/MLVU
  notes: accuracy, 2024 baseline
---

# MLVU

> 面向长视频理解的多任务综合评测基准，视频时长从数分钟到数小时，系统评测模型的长视频推理能力。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 85.5% | MLVU long video understanding accuracy | 2026-03 | [link](https://github.com/JUNJIE99/MLVU) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 84.2% | accuracy | 2026-04 | [link](https://github.com/JUNJIE99/MLVU) |
| 🥉 | [[GPT-5]] | 🚫 no | 83.5% | accuracy | 2025-09 | [link](https://github.com/JUNJIE99/MLVU) |
| 4 | [[Qwen3.6]] | 🚫 no | 82.0% | accuracy | 2026-04 | [link](https://github.com/JUNJIE99/MLVU) |
| 5 | [[GPT-4o]] | 🚫 no | 64.5% | accuracy, 2024 baseline | 2024-05 | [link](https://github.com/JUNJIE99/MLVU) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2406.04264](https://arxiv.org/abs/2406.04264)

<!-- AUTO-LINKS:END -->

## 概述

MLVU（Multi-task Long Video Understanding）由北京大学等机构于 2024 年提出，是专门针对**长视频理解**的综合评测基准。与现有视频基准主要关注数秒到数分钟的短视频不同，MLVU 的视频时长从 3 分钟到 2 小时不等，平均时长约 12 分钟，覆盖了视频摘要、事件定位、角色识别、情节推理等多个需要长时序理解的任务。

MLVU 定义了 9 种任务类型，分为整体性理解任务（需要综合全视频信息）和细节性检索任务（需要在长视频中定位特定信息），覆盖了"长视频理解"的两类核心需求。评测结果显示，当时多数模型在长时序场景下表现显著下降，而专门优化过长上下文的模型（如 Gemini 1.5 Pro）则展现出明显优势。

MLVU 是长视频理解研究领域的重要参考基准，与 LVBench、Video-MME 共同构成了 2024 年长视频评测的主要基准体系。

## 任务格式

- **视频数量**：约 1,334 段视频（含多种时长分布）
- **问题数量**：约 2,593 道问题
- **视频时长**：3 分钟到 2 小时，平均约 12 分钟
- **任务类型**：9 类，包括视频摘要生成、主题识别、绘图推理、异常检测、针线检索（Needle-in-a-Haystack）等
- **问题格式**：多项选择题（整体性任务）和开放式生成（摘要类任务）
- **评分方式**：多选题自动评分；开放式任务由 GPT-4 辅助评分

## 主要指标

- **M-Avg**：多选题任务的平均准确率（主要报告指标）
- **G-Avg**：生成类任务的 GPT-4 评分均值
- **任务细分**：9 类任务分别报告
- **时长细分**：按视频时长分组（<10 分钟、10-30 分钟、>30 分钟）分析性能衰减

## 局限性

- 视频来源以英文内容为主（电影、教学视频等），语言和文化多样性有限
- 开放式生成任务的 GPT-4 评分存在一致性问题，且成本较高
- 长视频的高帧率采样受制于模型上下文窗口，实际测试时多数模型需进行帧采样

## 相关页面
- [[LVBench]]
- [[VideoMME]]
- [[TempCompass]]
