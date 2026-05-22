---
title: "D 维度：Agent / 工具调用 / Web-GUI 评测"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
review_status: "未审阅（LLM 起草 + 自动表）"
next_review_due: "2026-08-22"
sources:
  - "https://crfm.stanford.edu/helm/"
  - "https://lmarena.ai/"
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=D frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: D
domain:
  - synthesis
---

# D 维度：Agent / 工具调用 / Web-GUI 评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: D` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

通用 agent + tool-use + web/GUI 操作 + software engineering agent

## 决策入门段（Tier 1 LLM 起草 / opinion）

通用 agent：AgentBench / GAIA / tau-bench；tool-use：BFCL / ToolBench / API-Bank；Web/GUI：WebArena / VisualWebArena / OSWorld / Mind2Web / BrowserGym；SWE：SWE-bench-Verified 系列；安全：AgentHarm。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: D` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=D:START -->

## D 维度 Agent / 工具调用 / Web-GUI（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 子类 | 题量 | 年份 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[OSWorld|OSWorld]] | web-gui | — | 2024 | 约 50-61%（Claude-Sonnet-4.5） | — |
| [[tau-bench|τ-bench (tau-bench)]] | general | 477 | 2024 | 高于 Opus 4（Claude-Sonnet-4.5） | — |
| [[AgentBench|AgentBench]] | general | 1091 | 2023 | — | — |
| [[AgentBoard|AgentBoard]] | general | — | — | — | — |
| [[AITZ|AITZ]] | general | — | 2024 | — | — |
| [[ALFWorld|ALFWorld]] | general | 3553 | 2021 | — | — |
| [[Android-Control|Android-Control]] | web-gui | — | 2024 | — | — |
| [[AndroidWorld|AndroidWorld]] | web-gui | — | 2024 | — | — |
| [[API-Bank|API-Bank]] | tool-use | 2138 | 2023 | — | — |
| [[AppWorld|AppWorld]] | general | — | 2024 | — | — |
| [[BEHAVIOR-1K|BEHAVIOR-1K]] | general | — | — | — | — |
| [[BiGGen-Bench|BiGGen-Bench]] | general | 765 | 2024 | — | — |
| [[BrowserGym|BrowserGym]] | web-gui | — | — | — | — |
| [[GAIA|GAIA (General AI Assistants)]] | general | 466 | 2023 | — | — |
| [[Habitat|Habitat (Embodied AI Simulator)]] | general | — | — | — | — |
| [[Mind2Web|Mind2Web]] | web-gui | — | — | — | — |
| [[MINT|MINT (Multi-turn INteractive Tool-use)]] | tool-use | 586 | 2023 | — | — |
| [[MLGym-Bench|MLGym-Bench]] | general | — | 2025 | — | — |
| [[MobileMiniWob++|MobileMiniWob++]] | web-gui | — | 2024 | — | — |
| [[Nestful|Nestful]] | tool-use | — | 2024 | — | — |
| [[Online-Mind2Web|Online-Mind2Web]] | web-gui | — | 2025 | — | — |
| [[PARTNR|PARTNR]] | general | — | 2024 | — | — |
| [[RobustAPI|RobustAPI]] | general | — | 2024 | — | — |
| [[ScienceWorld|ScienceWorld]] | general | 30 | 2022 | — | — |
| [[ScreenSpot|ScreenSpot]] | general | — | 2024 | — | — |
| [[ScreenSpot-Pro|ScreenSpot Pro]] | general | — | 2025 | — | — |
| [[StableToolBench|StableToolBench]] | tool-use | — | — | — | — |
| [[ToolACE|ToolACE]] | tool-use | — | 2024 | — | — |
| [[ToolBench|ToolBench]] | tool-use | 126486 | 2023 | — | — |
| [[VisualWebArena|VisualWebArena]] | web-gui | — | — | — | — |
| [[VisualWebBench|VisualWebBench]] | web-gui | — | 2024 | — | — |
| [[WebArena|WebArena]] | web-gui | 812 | 2023 | — | — |
| [[WebVoyager|WebVoyager]] | web-gui | — | 2024 | — | — |
| [[WebWalkerQA|WebWalkerQA]] | web-gui | — | 2025 | — | — |
| [[WindowsAgentArena|WindowsAgentArena]] | general | — | 2024 | — | — |
| [[xLAM|xLAM]] | tool-use | — | 2024 | — | — |
| [[tau2-bench|τ²-Bench]] | general | — | 2025 | — | — |
| [[tau3-bench|τ³-Bench]] | general | — | 2025 | — | — |

_共 38 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=D:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]


- [[AgentBench]] · [[GAIA]] · [[SWE-bench-Verified]] · [[Mind2Web]]
