---
title: VisualWebArena
type: benchmark
dimension: D
subdimension: web-gui
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-22'
last_verified: '2026-05-22'
sources:
- https://arxiv.org/abs/2401.13649
- https://github.com/web-arena-x/visualwebarena
- https://jykoh.com/vwa
aliases:
- VisualWebArena
- VWA
arxiv_id: '2401.13649'
official_url: https://jykoh.com/vwa
official_leaderboard: https://jykoh.com/vwa
license: Apache-2.0
org: CMU
github_url: https://github.com/web-arena-x/visualwebarena
domain:
- agent
- multimodal
sota:
- score: 58.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://jykoh.com/vwa
  notes: task success rate, multimodal web agent
- score: 56.2%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://jykoh.com/vwa
  notes: task success rate, multimodal web agent
- score: 54.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://jykoh.com/vwa
  notes: task success rate, multimodal web agent
- score: 38.5%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://jykoh.com/vwa
  notes: task success rate, 2024 baseline
---

# VisualWebArena（VWA）

> CMU 2024-02 推出（ACL 2024 Long）的 [[WebArena]] 多模态扩展。三类真实风格站点（Classifieds / Shopping / Reddit）× **910 任务**，要求 agent 同时理解图像 + 文本 prompt 完成操作。揭示顶级 multimodal agent 仅 **16.4% 成功率** vs 人类 **88.7%** 的巨大差距。

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🔧 with | 58.5% | task success rate, multimodal web agent | 2026-04 | [link](https://jykoh.com/vwa) |
| 🥈 | [[GPT-5]] | 🔧 with | 56.2% | task success rate, multimodal web agent | 2025-09 | [link](https://jykoh.com/vwa) |
| 🥉 | [[Gemini-3.1-Pro]] | 🔧 with | 54.0% | task success rate, multimodal web agent | 2026-03 | [link](https://jykoh.com/vwa) |
| 4 | [[GPT-4o]] | 🔧 with | 38.5% | task success rate, 2024 baseline | 2024-05 | [link](https://jykoh.com/vwa) |

<!-- AUTO-SOTA:END -->

## 设计

- **3 个环境**：Classifieds / Shopping / Reddit（真实站点风格 + 本地化部署）
- **910 任务**：每个含图像 + 文本指令，要求 agent 完成购买 / 上传 / 评论等
- **配套 leaderboard**：HuggingFace Space + 论文项目页

## 关键发现

- 顶级 multimodal agent（含 GPT-4V scaffold）**16.4% 成功率**
- 人类基线 **88.7%**
- 揭示「VLM 能看图但不会点」的能力鸿沟

## 评测圈意义

- 把 [[WebArena]] 文本 web agent 扩展到 multimodal，成为 multimodal agent 评测主流之一
- 与 [[OSWorld]] / [[Mind2Web]] / [[Online-Mind2Web]] 形成 web/GUI agent 评测矩阵
- 揭示 multimodal 模型在 GUI grounding 上的弱点

## 已知 pitfall

- 评测需本地部署 3 个站点（环境依赖大）
- 任务多样性集中在购物/分类/论坛，企业场景代表性有限
- agent scaffold（SeeAct / WebVoyager 等）选择对分数影响显著

## 相关页面

- [[WebArena]]
- [[Mind2Web]]
- [[OSWorld]]
- [[BrowserGym]]
- [[agent-eval]]
- [[multimodal-eval]]
