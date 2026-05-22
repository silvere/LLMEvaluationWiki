---
title: Mind2Web
type: benchmark
dimension: D
subdimension: web-gui
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-22'
last_verified: '2026-05-22'
sources:
- https://arxiv.org/abs/2306.06070
- https://github.com/OSU-NLP-Group/Mind2Web
- https://osu-nlp-group.github.io/Mind2Web/
aliases:
- Mind2Web
- Mind2Web-1
- Mind2Web-2
arxiv_id: '2306.06070'
official_url: https://osu-nlp-group.github.io/Mind2Web/
license: Apache-2.0
org: Ohio State University (OSU-NLP)
github_url: https://github.com/OSU-NLP-Group/Mind2Web
domain:
- agent
sota:
- score: 68.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://osu-nlp-group.github.io/Mind2Web/
  notes: Mind2Web element accuracy (web task generalization)
- score: 66.2%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://osu-nlp-group.github.io/Mind2Web/
  notes: element accuracy
- score: 64.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://osu-nlp-group.github.io/Mind2Web/
  notes: element accuracy
- score: 60.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: true
  date: 2026-02
  source: https://deepseek.com
  notes: element accuracy
- score: 50.0%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://osu-nlp-group.github.io/Mind2Web/
  notes: element accuracy, 2024 baseline
---

# Mind2Web

> Ohio State University NLP Group 2023-06 推出（NeurIPS 2023 Spotlight）的**首个** generalist web agent benchmark + 数据集。覆盖 **137 网站 / 31 领域 / 2,000+ 真实开放任务**（vs 此前仿真站点）。是 web agent 评测的奠基工作。

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🔧 with | 68.5% | Mind2Web element accuracy (web task generalization) | 2026-04 | [link](https://osu-nlp-group.github.io/Mind2Web/) |
| 🥈 | [[GPT-5]] | 🔧 with | 66.2% | element accuracy | 2025-09 | [link](https://osu-nlp-group.github.io/Mind2Web/) |
| 🥉 | [[Gemini-3.1-Pro]] | 🔧 with | 64.0% | element accuracy | 2026-03 | [link](https://osu-nlp-group.github.io/Mind2Web/) |
| 4 | [[DeepSeek-V4-Pro]] | 🔧 with | 60.5% | element accuracy | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🔧 with | 50.0% | element accuracy, 2024 baseline | 2024-05 | [link](https://osu-nlp-group.github.io/Mind2Web/) |

<!-- AUTO-SOTA:END -->

## 数据规模

| 项 | 数量 |
|---|---|
| Websites | 137 个真实网站 |
| Domains | 31 |
| Tasks | 2,000+（众包指令 + 动作序列） |

## 演进

- **Mind2Web 1**（2023-06）：静态数据集，离线评测 action 预测准确率
- **Mind2Web 2**（2025，NeurIPS'25 D&B）：130 个 long-horizon agentic search 任务，**agent-as-judge** 评测，需要实时浏览（1,000+ 小时人工构建）
- **Online-Mind2Web**：assessing the current state of web agents，实际成功率

## 评测圈意义

- 把 web agent 评测从仿真（MiniWoB++）推到真实站点
- 数据集成为后续 [[WebArena]] / [[VisualWebArena]] / [[BrowserGym]] 等的对照基线
- 揭示当前 web agent 离线评测高、在线实战低的鸿沟

## 已知 pitfall

- Mind2Web 1 离线评测（action prediction）与真实在线任务有 gap
- 137 网站需要爬数据 + reproducibility 难
- v1 / v2 / Online-Mind2Web 用法不同，跨论文比较需明示

## 相关页面

- [[WebArena]]
- [[VisualWebArena]]
- [[BrowserGym]]
- [[Online-Mind2Web]]
- [[AgentBench]]
- [[agent-eval]]
