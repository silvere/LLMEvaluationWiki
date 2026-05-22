---
title: "E 维度：视觉理解（VLM/LMM）评测"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=E frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: E
domain:
  - synthesis
---

# E 维度：视觉理解（VLM/LMM）评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: E` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

图像理解 + 视频理解 + 文档/图表 OCR + 多模态推理

## 决策入门段（Tier 1 LLM 起草 / opinion）

图像：MMMU / MMBench / MathVista / MM-Vet / HallusionBench；视频：Video-MME / MVBench / EgoSchema / LongVideoBench；harness 用 LMMs-Eval / VLMEvalKit；中文用 CMMMU。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: E` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=E:START -->

## E 维度 视觉理解（VLM）（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[AI2D|AI2D]] | 15000 | 2016 | — | 98.5%（Gemini-3.1-Pro） | — |
| [[ChartQA|ChartQA]] | 9608 | 2022 | — | 96.5%（Gemini-3.1-Pro） | — |
| [[CMM-Math|CMM-Math]] | — | 2024 | — | 92.5%（Qwen3.6） | — |
| [[CMMMU|CMMMU]] | — | — | — | 85.2%（Qwen3.6） | — |
| [[DocVQA|DocVQA]] | 50000 | 2020 | — | 97.2%（Gemini-3.1-Pro） | — |
| [[EgoSchema|EgoSchema]] | — | 2023 | — | 84.5%（Gemini-3.1-Pro） | — |
| [[MathVision|MathVision]] | — | 2024 | — | 71.2%（Gemini-3.1-Pro） | — |
| [[MathVista|MathVista]] | 6141 | 2023 | — | 82.5%（Gemini-3.1-Pro） | — |
| [[MMBench|MMBench]] | 3000 | 2023 | — | 95.8%（Gemini-3.1-Pro） | — |
| [[MMMU|MMMU]] | 11550 | 2023 | — | 86.0%（Qwen3.6） | — |
| [[MMMU-Pro|MMMU-Pro]] | 3460 | 2024 | — | 68.2%（Gemini-3.1-Pro） | — |
| [[MMStar|MMStar]] | 1500 | 2024 | — | 79.8%（Gemini-3.1-Pro） | — |
| [[MMVet|MMVet]] | 218 | 2023 | — | 92.5%（Claude-Opus-4.7） | — |
| [[OCRBench|OCRBench]] | 1000 | 2023 | — | 92.8%（Qwen3.6） | — |
| [[RealWorldQA|RealWorldQA]] | — | 2024 | — | 82.5%（Gemini-3.1-Pro） | — |
| [[ScienceQA|ScienceQA]] | 21208 | 2022 | — | 99.0%（GPT-5） | — |
| [[TextVQA|TextVQA]] | 45336 | 2019 | — | 90.5%（Claude-Opus-4.7） | — |
| [[Video-MME|Video-MME]] | 2700 | 2024 | — | 88.5%（Gemini-3.1-Pro） | — |
| [[VQAv2|VQAv2]] | 2150000 | 2017 | — | 89.5%（Gemini-3.1-Pro） | — |
| [[ADE20K|ADE20K]] | — | 2017 | — | — | — |
| [[All-Angles-Bench|All-Angles-Bench]] | — | 2025 | — | — | — |
| [[ARKitScenes|ARKitScenes]] | — | 2021 | — | — | — |
| [[BLINK|BLINK]] | — | 2024 | — | — | — |
| [[CC-OCR|CC-OCR]] | — | 2024 | — | — | — |
| [[CG-Bench|CG-Bench]] | — | 2024 | — | — | — |
| [[CHAIR|CHAIR]] | — | 2018 | — | — | — |
| [[CharadesSTA|Charades-STA]] | — | 2017 | — | — | — |
| [[CharXiv|CharXiv]] | — | 2024 | — | — | — |
| [[ChronoMagic-Bench|ChronoMagic-Bench]] | — | 2024 | — | — | — |
| [[COCO-Stuff-164K|COCO-Stuff-164K]] | — | 2018 | — | — | — |
| [[CountBench|CountBench]] | — | 2024 | — | — | — |
| [[CRPE|CRPE]] | — | 2024 | — | — | — |
| [[DA-2K|DA-2K]] | — | 2024 | — | — | — |
| [[EMMA|EMMA]] | — | 2024 | — | — | — |
| [[EvalMuse-Alignment|EvalMuse-Alignment]] | — | 2024 | — | — | — |
| [[EvalMuse-Structure|EvalMuse-Structure]] | — | 2024 | — | — | — |
| [[Event-Bench|Event-Bench]] | — | 2024 | — | — | — |
| [[FETV|FETV]] | — | 2023 | — | — | — |
| [[FSC-147|FSC-147]] | — | 2021 | — | — | — |
| [[GeoSense|GeoSense]] | — | 2025 | — | — | — |
| [[InfiniBench|InfiniBench]] | — | — | — | — | — |
| [[InfoVQA|InfoVQA]] | — | 2022 | — | — | — |
| [[LEGO-Puzzles|LEGO-Puzzles]] | — | 2025 | — | — | — |
| [[LLaVA-Bench|LLaVA-Bench]] | — | 2023 | — | — | — |
| [[Mantis-Eval|Mantis-Eval]] | — | 2024 | — | — | — |
| [[MathVerse|MathVerse]] | 2612 | 2024 | — | — | — |
| [[MIRB|MIRB]] | — | 2024 | — | — | — |
| [[MMBench-Video|MMBench-Video]] | — | 2024 | — | — | — |
| [[MME|MME]] | 2194 | 2023 | — | — | — |
| [[MME-CoT|MME-CoT]] | — | 2025 | — | — | — |
| [[MME-RealWorld|MME-RealWorld]] | — | 2024 | — | — | — |
| [[MME-Unify|MME-Unify]] | — | 2025 | — | — | — |
| [[MME-VideoOCR|MME-VideoOCR]] | — | 2025 | — | — | — |
| [[MMIU|MMIU]] | — | 2024 | — | — | — |
| [[MMMB|MMMB]] | — | 2024 | — | — | — |
| [[MMT-Bench|MMT-Bench]] | — | 2024 | — | — | — |
| [[MMVP|MMVP]] | — | 2024 | — | — | — |
| [[MMVU|MMVU]] | — | 2024 | — | — | — |
| [[MotionBench|MotionBench]] | — | 2024 | — | — | — |
| [[Movie-Gen-Video-Bench|Movie Gen Video Bench]] | — | 2024 | — | — | — |
| [[MT-Video-Bench|MT-Video-Bench]] | — | 2025 | — | — | — |
| [[MTVQA|MTVQA]] | — | 2024 | — | — | — |
| [[MuirBench|MuirBench]] | — | 2024 | — | — | — |
| [[Multilingual-MMBench|Multilingual MMBench]] | — | 2024 | — | — | — |
| [[NYU-Depth-V2|NYU-Depth-V2]] | — | 2012 | — | — | — |
| [[OCRBench-V2|OCRBench V2]] | — | 2024 | — | — | — |
| [[OmniEval|OmniEval]] | — | 2025 | — | — | — |
| [[OVOBench|OVO-Bench]] | — | 2025 | — | — | — |
| [[PerceptionTest|PerceptionTest]] | — | 2023 | — | — | — |
| [[PhyBench|PhyBench]] | — | 2024 | — | — | — |
| [[Physics-IQ|Physics-IQ]] | — | 2025 | — | — | — |
| [[PhyX|PhyX]] | — | 2025 | — | — | — |
| [[R-Bench|R-Bench]] | — | 2024 | — | — | — |
| [[RefCOCO|RefCOCO]] | — | 2016 | — | — | — |
| [[RefCOCO+|RefCOCO+]] | — | 2016 | — | — | — |
| [[RefCOCOg|RefCOCOg]] | — | 2016 | — | — | — |
| [[SEED-Bench|SEED-Bench]] | 19242 | 2023 | — | — | — |
| [[SEEDBench-2-Plus|SEEDBench-2-Plus]] | — | 2024 | — | — | — |
| [[StreamBench|StreamBench]] | — | 2024 | — | — | — |
| [[SUN-RGBD|SUN-RGBD]] | — | 2015 | — | — | — |
| [[TACoS|TACoS]] | — | 2013 | — | — | — |
| [[TempCompass|TempCompass]] | — | 2024 | — | — | — |
| [[TemporalBench|TemporalBench]] | — | 2024 | — | — | — |
| [[TOMATO|TOMATO]] | — | 2024 | — | — | — |
| [[VCBench|VCBench]] | — | 2024 | — | — | — |
| [[VCR|VCR]] | — | 2024 | — | — | — |
| [[VE-Bench|VE-Bench]] | — | 2024 | — | — | — |
| [[Video-Holmes|Video-Holmes]] | — | 2025 | — | — | — |
| [[VideoGen-Eval|VideoGen-Eval 1.0]] | — | 2024 | — | — | — |
| [[VMBench|VMBench]] | — | 2025 | — | — | — |
| [[WildVision|WildVision]] | 0 | 2024 | — | — | — |
| [[WorldModelBench|WorldModelBench]] | — | 2024 | — | — | — |
| [[WorldScore|WorldScore]] | — | 2024 | — | — | — |
| [[XBench|XBench]] | — | 2025 | — | — | — |

_共 94 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=E:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



