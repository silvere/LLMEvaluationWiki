---
title: "G 维度：音频 / 音乐生成评测"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=G frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: G
domain:
  - synthesis
---

# G 维度：音频 / 音乐生成评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: G` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

speech / music / audio understanding + generation

## 决策入门段（Tier 1 LLM 起草 / opinion）

通用 audio：AIR-Bench / AudioBench / VoiceBench / Dynamic-SUPERB；音乐：MusicBench / Mustango / MuChoMusic / CMI-Bench；指标：FAD（Fréchet Audio Distance）；HELM Audio 是综合套件。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: G` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=G:START -->

## G 维度 音频 / 音乐（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[CMI-Bench|CMI-Bench]] | — | 2025 | — | — | — |
| [[MusicEval|MusicEval]] | — | 2025 | — | — | — |
| [[SingMOS-Pro|SingMOS-Pro]] | — | 2024 | — | — | — |
| [[SongEval|SongEval]] | — | 2025 | — | — | — |

_共 4 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=G:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



