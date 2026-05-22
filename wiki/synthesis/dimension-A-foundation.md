---
title: "A 维度：基座模型 / 通用能力评测"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=A frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: A
domain:
  - synthesis
---

# A 维度：基座模型 / 通用能力评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: A` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

覆盖 LLM 基座的通用知识 / 推理 / 多任务能力评测（含 harness 框架 / benchmark 数据集 / 排行榜）

## 决策入门段（Tier 1 LLM 起草 / opinion）

若要评测一个新 base LLM：(1) 用 lm-eval / OpenCompass 等 harness 跑标准套件；(2) 报告 MMLU / MMLU-Pro / BBH / GPQA / HellaSwag 等 baseline；(3) 关注 HF Open LLM Leaderboard / LiveBench / Artificial Analysis 等社区排名。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: A` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=A:START -->

## A 维度 基座模型 / 通用能力（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[AGIEval|AGIEval]] | 8816 | 2023 | — | 90.2%（GPT-5） | — |
| [[AIME|AIME]] | 30 | 1983 | 0-shot / exact-match accuracy（每题答案 0-9… | 100%（Kimi-K2.6） | 🟢 active |
| [[AIME24|AIME 2024]] | 30 | 2024 | — | 92.5%（GPT-5） | — |
| [[AMC23|AMC23]] | 60 | 2023 | — | 88.5%（GPT-5） | — |
| [[ANLI|ANLI (Adversarial NLI)]] | 162000 | 2020 | — | 92.5%（GPT-5） | — |
| [[ARC|ARC]] | 7787 | 2018 | — | 99.1%（GPT-5） | — |
| [[ARC-AGI1|ARC-AGI1]] | — | 2019 | — | 95.0%（GPT-5.5） | — |
| [[ARC-AGI2|ARC-AGI2]] | — | 2025 | — | 85.0%（GPT-5.5） | — |
| [[ARC-c|ARC-Challenge]] | — | 2018 | — | 99.2%（GPT-5） | — |
| [[ARC-e|ARC-Easy]] | — | 2018 | — | 99.8%（GPT-5） | — |
| [[Arena-Hard-Auto|Arena-Hard-Auto]] | — | — | — | 92.1%（Claude-Opus-4.7） | — |
| [[BBH|BBH]] | 6511 | 2022 | — | 95.2%（Claude-Opus-4.7） | — |
| [[BoolQ|BoolQ]] | 15942 | 2019 | — | 96.2%（GPT-5） | — |
| [[CLUEWSC|CLUEWSC]] | — | 2020 | — | 96.5%（Qwen3.6） | — |
| [[CMMLU|CMMLU]] | 11528 | 2023 | — | 92.4%（Qwen3.6） | — |
| [[CNMO-2024|CNMO 2024]] | — | 2024 | — | 68.5%（DeepSeek-V4-Pro） | — |
| [[CommonsenseQA|CommonsenseQA]] | 12247 | 2019 | — | 90.2%（GPT-5） | — |
| [[DROP|DROP]] | 96567 | 2019 | — | 93.5%（GPT-5） | — |
| [[FinanceBench|FinanceBench]] | 150 | 2023 | — | 92.8%（GPT-5） | — |
| [[FrontierMath|FrontierMath]] | 0 | 2024 | — | 52.4%（GPT-5.5） | — |
| [[GPQA|GPQA]] | 448 | 2023 | 0-shot 或 5-shot / accuracy (4-way MCQ) | 94.6%（Claude-Opus-4.7） | 🔴 saturated |
| [[GSM8K|GSM8K]] | 8500 | 2021 | — | 97.5%（GPT-5） | — |
| [[HellaSwag|HellaSwag]] | 70000 | 2019 | — | 97.2%（Claude-Opus-4.7） | — |
| [[HLE|HLE]] | — | 2025 | — | 64.7%（Claude-Opus-4.7） | — |
| [[LegalBench|LegalBench]] | 0 | 2023 | — | 78.5%（GPT-5） | — |
| [[MATH|MATH]] | 12500 | 2021 | 0-shot 或 4-shot CoT（推理模型默认 0-shot） / exact-match accuracy（数值答案对比） | 99.4%（GPT-5） | 🔴 saturated |
| [[MathBench|MathBench]] | 3709 | 2024 | — | 86.5%（Qwen3.6） | — |
| [[MedQA|MedQA]] | 12723 | 2021 | — | 96.5%（GPT-5） | — |
| [[MGSM|MGSM]] | 2500 | 2023 | — | 94.5%（Claude-Opus-4.7） | — |
| [[MMLU|MMLU]] | 15908 | 2020 | 5-shot / accuracy (4-way MCQ) | 92.0%（GPT-5） | 🔴 saturated |
| [[MMLU-Pro|MMLU-Pro]] | 12032 | 2024 | 5-shot CoT / accuracy (10-way MCQ) | 90.99%（Gemini-3.1-Pro） | 🟢 active |
| [[MMLU-Redux|MMLU-Redux]] | — | 2024 | — | 95.8%（Claude-Opus-4.7） | — |
| [[MultiNLI|MultiNLI]] | 433000 | 2018 | — | 97.8%（GPT-5） | — |
| [[OlympiadBench|OlympiadBench]] | 8952 | 2024 | — | 62.6%（DeepSeek-R1） | — |
| [[PIQA|PIQA]] | 16113 | 2020 | — | 97.2%（GPT-5） | — |
| [[PubMedQA|PubMedQA]] | 273535 | 2019 | — | 82.5%（GPT-5） | — |
| [[RACE|RACE (ReAding Comprehension from Examinations)]] | 97687 | 2017 | — | 97.5%（GPT-5） | — |
| [[WinoGrad|Winograd Schema Challenge]] | 273 | 2012 | — | 98.5%（GPT-5） | — |
| [[WinoGrande|WinoGrande]] | 43985 | 2019 | — | 95.8%（GPT-5） | — |
| [[Agent-Leaderboard|Agent Leaderboard]] | — | — | — | — | — |
| [[Aider|Aider]] | — | — | — | — | — |
| [[Aider-Leaderboard|Aider Leaderboard]] | — | — | — | — | — |
| [[AlpacaEval-Leaderboard|AlpacaEval Leaderboard]] | — | — | — | — | — |
| [[AQuA|AQuA]] | — | 2017 | — | — | — |
| [[ARB|ARB]] | 0 | 2023 | — | — | — |
| [[2505.11831|ARC-AGI-2: A New Challenge for Frontier AI Reasoning Systems]] | — | 2025 | — | — | — |
| [[ArenaHard-Leaderboard|Arena-Hard Leaderboard]] | — | — | — | — | — |
| [[Artificial-Analysis-Leaderboard|Artificial Analysis Leaderboard]] | — | — | — | — | — |
| [[BBEH|BBEH]] | — | 2025 | — | — | — |
| [[BIG-bench-framework|BIG-bench 评测框架]] | — | — | — | — | ⚫ deprecated |
| [[BigCodeBench-Leaderboard|BigCodeBench Leaderboard]] | — | — | — | — | — |
| [[C3|C3]] | — | 2020 | — | — | — |
| [[chatbot-arena-platform|Chatbot Arena 平台（技术实现）]] | — | — | — | — | — |
| [[CipherBank|CipherBank]] | — | 2025 | — | — | — |
| [[Collie-Hard|Collie Hard]] | — | 2024 | — | — | — |
| [[COPA|COPA]] | 1000 | 2011 | — | — | — |
| [[CREAK|CREAK (Commonsense Reasoning over Entity Knowledge)]] | 13000 | 2021 | — | — | — |
| [[CUBE|CUBE]] | — | 2024 | — | — | — |
| [[Devin|Devin]] | — | — | — | — | — |
| [[DISC-Law-Eval|DISC-Law-Eval]] | — | 2023 | — | — | — |
| [[EntityQuestions|EntityQuestions]] | 22779 | 2021 | — | — | — |
| [[EvalPlus-Leaderboard|EvalPlus Leaderboard]] | — | — | — | — | — |
| [[FinEval|FinEval]] | — | 2023 | — | — | — |
| [[FinQA|FinQA]] | — | 2021 | — | — | — |
| [[FormalMATH|FormalMATH]] | — | 2025 | — | — | — |
| [[GAOKAO-Bench|GAOKAO-Bench]] | — | 2023 | — | — | — |
| [[Gecko|Gecko]] | — | 2024 | — | — | — |
| [[GeoQA|GeoQA]] | — | 2021 | — | — | — |
| [[GLUE|GLUE]] | 0 | 2018 | — | — | — |
| [[GPQA-Diamond|GPQA-Diamond]] | — | 2023 | — | — | — |
| [[Graphwalks|Graphwalks]] | — | 2024 | — | — | — |
| [[HELM-Leaderboard|HELM Leaderboard]] | — | — | — | — | — |
| [[HuggingFace-Open-LLM-Leaderboard|Hugging Face Open LLM Leaderboard]] | — | — | — | — | — |
| [[KoLA|KoLA]] | 0 | 2023 | — | — | — |
| [[KORBench|KORBench]] | — | 2024 | — | — | — |
| [[LAMBADA|LAMBADA]] | 5153 | 2016 | — | — | — |
| [[LawBench|LawBench]] | — | 2023 | — | — | — |
| [[LegalBench-RAG|LegalBench-RAG]] | — | 2024 | — | — | — |
| [[LexEval|LexEval]] | — | 2024 | — | — | — |
| [[LIFEBENCH|LIFEBENCH]] | — | 2025 | — | — | — |
| [[LiveBench-Leaderboard|LiveBench Leaderboard]] | — | — | — | — | — |
| [[LiveMathBench|LiveMathBench]] | 0 | 2024 | — | — | — |
| [[LMSYS-Chatbot-Arena|LMSYS Chatbot Arena]] | — | — | — | — | — |
| [[LogiQA|LogiQA]] | 8678 | 2020 | — | — | — |
| [[MARBLE|MARBLE]] | — | 2023 | — | — | — |
| [[MATH500|MATH500]] | 500 | 2023 | — | — | — |
| [[MathIF|MathIF]] | — | 2025 | — | — | — |
| [[MedBench|MedBench]] | — | 2024 | — | — | — |
| [[MIBench|MIBench]] | — | 2024 | — | — | — |
| [[Minerva|Minerva]] | 0 | 2022 | — | — | — |
| [[MixEval|MixEval]] | — | 2024 | — | — | — |
| [[MMMLU|MMMLU]] | 0 | 2024 | — | — | — |
| [[MMMU-Leaderboard|MMMU Leaderboard]] | — | — | — | — | — |
| [[Multi-IF|Multi-IF]] | — | 2024 | — | — | — |
| [[MuSR|MuSR]] | — | 2023 | — | — | — |
| [[OmniMath|OmniMath]] | 4428 | 2024 | — | — | — |
| [[Open-LLM-Leaderboard-v2|Open LLM Leaderboard v2]] | — | — | — | — | — |
| [[OpenBookQA|OpenBookQA]] | 5957 | 2018 | — | — | — |
| [[OpenHands|OpenHands]] | — | — | — | — | — |
| [[PolyMath|PolyMath]] | 0 | 2024 | — | — | — |
| [[PRM-Bench|PRM-Bench]] | — | 2025 | — | — | — |
| [[ProofWriter|ProofWriter]] | — | 2021 | — | — | — |
| [[Putnam|Putnam]] | 0 | 2024 | — | — | — |
| [[ReClor|ReClor]] | 6138 | 2020 | — | — | — |
| [[RISEBench|RISEBench]] | — | 2025 | — | — | — |
| [[Scale-SEAL-Leaderboard|Scale SEAL Leaderboard]] | — | — | — | — | — |
| [[SciBench|SciBench]] | 295 | 2023 | — | — | — |
| [[2509.07968|SimpleQA Verified: A Reliable Factuality Benchmark to Measure Parametric Knowledge]] | — | 2025 | — | — | — |
| [[SNLI|SNLI]] | 570152 | 2015 | — | — | — |
| [[SocialIQA|SocialIQA]] | 38000 | 2019 | — | — | — |
| [[SQuAD-2.0|SQuAD 2.0]] | 150000 | 2018 | — | — | — |
| [[StrategyQA|StrategyQA]] | 2780 | 2021 | — | — | — |
| [[SuperCLUE-Leaderboard|SuperCLUE Leaderboard]] | — | — | — | — | — |
| [[SuperGLUE|SuperGLUE]] | 0 | 2019 | — | — | — |
| [[SWE-agent|SWE-agent]] | — | — | — | — | — |
| [[SWE-bench-Leaderboard|SWE-bench Leaderboard]] | — | — | — | — | — |
| [[TheoremQA|TheoremQA]] | 800 | 2023 | — | — | — |
| [[TyDiQA|TyDi QA (Typologically Diverse Question Answering)]] | 204000 | 2020 | — | — | — |
| [[WildBench-Leaderboard|WildBench Leaderboard]] | — | — | — | — | — |
| [[WildVision-Arena|WildVision Arena]] | — | — | — | — | — |
| [[XCOPA|XCOPA (Cross-lingual Choice of Plausible Alternatives)]] | 11000 | 2021 | — | — | — |
| [[XNLI|XNLI (Cross-lingual Natural Language Inference)]] | 112500 | 2018 | — | — | — |
| [[ZebraLogicBench|ZebraLogicBench]] | — | 2024 | — | — | — |

_共 123 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=A:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



