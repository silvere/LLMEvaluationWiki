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
| [[AgentBench|AgentBench]] | general | 1091 | 2023 | 54.3%（GPT-5） | — |
| [[AndroidWorld|AndroidWorld]] | web-gui | — | 2024 | 65.2%（Claude-Opus-4.7） | — |
| [[GAIA|GAIA (General AI Assistants)]] | general | 466 | 2023 | 74.6%（Claude-Sonnet-4.6） | — |
| [[OSWorld|OSWorld]] | web-gui | — | 2024 | 79.6%（Claude-Opus-4.7） | — |
| [[VisualWebArena|VisualWebArena]] | web-gui | — | — | 58.5%（Claude-Opus-4.7） | — |
| [[WebArena|WebArena]] | web-gui | 812 | 2023 | 68.4%（Claude-Opus-4.7） | — |
| [[tau-bench|τ-bench (tau-bench)]] | general | 477 | 2024 | 89.2%（Claude-Opus-4.7） | — |
| [[AgentBoard|AgentBoard]] | general | — | — | — | — |
| [[AITZ|AITZ]] | general | — | 2024 | — | — |
| [[ALFWorld|ALFWorld]] | general | 3553 | 2021 | — | — |
| [[Android-Control|Android-Control]] | web-gui | — | 2024 | — | — |
| [[API-Bank|API-Bank]] | tool-use | 2138 | 2023 | — | — |
| [[AppWorld|AppWorld]] | general | — | 2024 | — | — |
| [[AssistantBench|AssistantBench]] | web-gui | — | 2024 | — | — |
| [[BEHAVIOR-1K|BEHAVIOR-1K]] | general | — | — | — | — |
| [[BiGGen-Bench|BiGGen-Bench]] | general | 765 | 2024 | — | — |
| [[BrowserGym|BrowserGym]] | web-gui | — | — | — | — |
| [[Habitat|Habitat (Embodied AI Simulator)]] | general | — | — | — | — |
| [[Mind2Web|Mind2Web]] | web-gui | — | — | — | — |
| [[MINT|MINT (Multi-turn INteractive Tool-use)]] | tool-use | 586 | 2023 | — | — |
| [[2410.07095|MLE-bench: Evaluating Machine Learning Agents on Machine Learning Engineering]] | software-eng | — | 2024 | — | — |
| [[MLGym-Bench|MLGym-Bench]] | general | — | 2025 | — | — |
| [[MobileMiniWob++|MobileMiniWob++]] | web-gui | — | 2024 | — | — |
| [[Nestful|Nestful]] | tool-use | — | 2024 | — | — |
| [[Online-Mind2Web|Online-Mind2Web]] | web-gui | — | 2025 | — | — |
| [[2506.16042|OSWorld-Human: Benchmarking the Efficiency of Computer-Use Agents]] | web-gui | — | 2025 | — | — |
| [[PARTNR|PARTNR]] | general | — | 2024 | — | — |
| [[RobustAPI|RobustAPI]] | general | — | 2024 | — | — |
| [[ScienceWorld|ScienceWorld]] | general | 30 | 2022 | — | — |
| [[ScreenSpot|ScreenSpot]] | general | — | 2024 | — | — |
| [[ScreenSpot-Pro|ScreenSpot Pro]] | general | — | 2025 | — | — |
| [[StableToolBench|StableToolBench]] | tool-use | — | — | — | — |
| [[2410.03859|SWE-bench Multimodal: Do AI Systems Generalize to Visual Software Domains?]] | software-eng | — | 2024 | — | — |
| [[2502.12115|SWE-Lancer: Can Frontier LLMs Earn $1 Million from Real-World Freelance Software Engineering?]] | software-eng | — | 2025 | — | — |
| [[2412.14161|TheAgentCompany: Benchmarking LLM Agents on Consequential Real World Tasks]] | software-eng | — | 2024 | — | — |
| [[ToolACE|ToolACE]] | tool-use | — | 2024 | — | — |
| [[ToolBench|ToolBench]] | tool-use | 126486 | 2023 | — | — |
| [[2402.01622|TravelPlanner: A Benchmark for Real-World Planning with Language Agents]] | general | — | 2024 | — | — |
| [[VisualWebBench|VisualWebBench]] | web-gui | — | 2024 | — | — |
| [[WebVoyager|WebVoyager]] | web-gui | — | 2024 | — | — |
| [[WebWalkerQA|WebWalkerQA]] | web-gui | — | 2025 | — | — |
| [[2409.08264|Windows Agent Arena: Evaluating Multi-Modal OS Agents at Scale]] | web-gui | — | 2024 | — | — |
| [[WindowsAgentArena|WindowsAgentArena]] | general | — | 2024 | — | — |
| [[WorkArena|WorkArena]] | web-gui | — | 2024 | — | — |
| [[xLAM|xLAM]] | tool-use | — | 2024 | — | — |
| [[tau2-bench|τ²-Bench]] | general | — | 2025 | — | — |
| [[tau3-bench|τ³-Bench]] | general | — | 2025 | — | — |

_共 47 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=D:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]


- [[AgentBench]] · [[GAIA]] · [[SWE-bench-Verified]] · [[Mind2Web]]
