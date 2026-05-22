---
title: "B 维度：Chat / Instruction-Following 评测"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=B frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: B
domain:
  - synthesis
---

# B 维度：Chat / Instruction-Following 评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: B` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

对话 + 指令遵循能力（含人类偏好对战、自动 judge 评测、格式约束验证）

## 决策入门段（Tier 1 LLM 起草 / opinion）

Chat 评测主流是 Chatbot Arena Elo + Arena-Hard-Auto + MT-Bench + AlpacaEval 2.0；Instruction 类用 IFEval + FollowBench。注意 length bias / style bias / position bias。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: B` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=B:START -->

## B 维度 Chat / Instruction-Following（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[Chatbot-Arena|Chatbot Arena]] | 6000000 | 2023 | user-defined / Bradley-Terry (Elo-like) | 1287 (top 10 at release)（Yi-Lightning） | 🟢 active |
| [[IFEval|IFEval]] | 541 | 2023 | 0-shot / Prompt-level / Instruction-le… | 100.0%（Kimi-K2.5） | 🔴 saturated |
| [[AlignBench|AlignBench]] | 683 | 2023 | — | — | — |
| [[AlpacaEval|AlpacaEval]] | 805 | 2023 | — | — | — |
| [[AlpacaEval-2.0|AlpacaEval 2.0]] | 805 | 2024 | — | — | — |
| [[ArenaHard|Arena-Hard]] | 500 | 2024 | — | — | — |
| [[CoQA|CoQA]] | 127000 | 2019 | — | — | — |
| [[FollowBench|FollowBench]] | 820 | 2023 | — | — | — |
| [[MADial-Bench|MADial-Bench]] | — | 2024 | — | — | — |
| [[MT-Bench|MT-Bench]] | 80 | 2023 | — | — | — |
| [[MT-Bench-101|MT-Bench-101]] | 1388 | 2024 | — | — | — |
| [[MultiChallenge|MultiChallenge]] | — | 2025 | — | — | — |
| [[ShareGPT|ShareGPT]] | 90000 | 2023 | — | — | — |
| [[WildBench|WildBench]] | 1024 | 2024 | — | — | — |

_共 14 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=B:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



