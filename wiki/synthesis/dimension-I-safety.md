---
title: "I 维度：安全 / 对齐 / Red-teaming"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=I frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: I
domain:
  - synthesis
---

# I 维度：安全 / 对齐 / Red-teaming

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: I` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

红队工具 + safety benchmark + jailbreak + content safety + 危险能力

## 决策入门段（Tier 1 LLM 起草 / opinion）

红队工具：garak / PyRIT / Giskard / Petri / promptfoo；safety benchmark：HarmBench / JailbreakBench / AdvBench / WMDP / SafetyBench；agent 安全：AgentHarm；content：ToxiGen / RealToxicityPrompts。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: I` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=I:START -->

## I 维度 安全 / 对齐 / Red-team（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 子类 | 题量 | 年份 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[AdvBench|AdvBench]] | jailbreak | 500 | 2023 | — | — |
| [[AgentHarm|AgentHarm]] | safety-benchmark | — | — | — | — |
| [[BBQ|BBQ]] | safety-benchmark | 58492 | 2022 | — | — |
| [[BeaverTails|BeaverTails]] | safety-benchmark | 330000 | 2023 | — | — |
| [[CValues|CValues]] | safety-benchmark | 2000 | 2023 | — | — |
| [[Do-Not-Answer|Do-Not-Answer]] | safety-benchmark | 939 | 2023 | — | — |
| [[FActScore|FActScore]] | safety-benchmark | 500 | 2023 | — | — |
| [[FEVER|FEVER]] | safety-benchmark | 185445 | 2018 | — | — |
| [[FLASK|FLASK]] | safety-benchmark | 1740 | 2023 | — | — |
| [[garak|garak]] | red-team-tool | — | — | — | — |
| [[GenVidBench|GenVidBench]] | safety-benchmark | — | 2025 | — | — |
| [[HallusionBench|HallusionBench]] | safety-benchmark | 1129 | 2023 | — | — |
| [[HaluEval|HaluEval]] | safety-benchmark | 35000 | 2023 | — | — |
| [[HarmBench|HarmBench]] | jailbreak | 0 | 2024 | — | — |
| [[Holmes-VAU|Holmes-VAU]] | safety-benchmark | — | 2024 | — | — |
| [[JailbreakBench|JailbreakBench]] | jailbreak | 100 | 2024 | — | — |
| [[MMHal-Bench|MMHal-Bench]] | safety-benchmark | — | 2023 | — | — |
| [[Petri|Petri]] | red-team-tool | — | — | — | — |
| [[POPE|POPE]] | safety-benchmark | 8910 | 2023 | — | — |
| [[PyRIT|PyRIT]] | red-team-tool | — | — | — | — |
| [[RealToxicityPrompts|RealToxicityPrompts]] | content-safety | 100000 | 2020 | — | — |
| [[S-Eval|S-Eval]] | safety-benchmark | — | 2024 | — | — |
| [[SafeBench|SafeBench]] | safety-benchmark | — | 2024 | — | — |
| [[SafetyBench|SafetyBench]] | safety-benchmark | 11435 | 2023 | — | — |
| [[SALAD-Bench|SALAD-Bench]] | safety-benchmark | — | 2024 | — | — |
| [[SimpleQA|SimpleQA]] | safety-benchmark | 4326 | 2024 | — | — |
| [[StereoSet|StereoSet]] | safety-benchmark | 17000 | 2021 | — | — |
| [[StrongREJECT|StrongREJECT]] | safety-benchmark | 313 | 2024 | — | — |
| [[SuperCLUE-Safety|SuperCLUE-Safety]] | safety-benchmark | — | 2023 | — | — |
| [[SysBench|SysBench]] | safety-benchmark | — | 2024 | — | — |
| [[ToxiGen|ToxiGen]] | content-safety | 274000 | 2022 | — | — |
| [[TruthfulQA|TruthfulQA]] | safety-benchmark | 817 | 2022 | — | — |
| [[WiCE|WiCE]] | safety-benchmark | 761 | 2023 | — | — |
| [[WildChat|WildChat]] | safety-benchmark | 1000000 | 2024 | — | — |
| [[WildGuard|WildGuard]] | safety-benchmark | 13000 | 2024 | — | — |
| [[WinoBias|WinoBias]] | safety-benchmark | 3160 | 2018 | — | — |
| [[WMDP|WMDP (Weapons of Mass Destruction Proxy)]] | safety-benchmark | — | — | — | — |
| [[XSTest|XSTest]] | safety-benchmark | 250 | 2023 | — | — |

_共 38 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=I:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



