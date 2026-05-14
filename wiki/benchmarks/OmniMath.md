---
title: "OmniMath"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, reasoning]
language: en
year: 2024
authors: ["Bofei Gao", "Feifan Song", "Zhe Yang", "Zefan Cai", "Yibo Miao", "Qingxiu Dong", "Lei Li", "Chenghao Ma", "Liang Chen", "Runxin Xu", "Zhengyang Tang", "Benyou Wang", "Daoguang Zan", "Shanghaoran Quan", "Ge Zhang", "Lei Sha", "Yichang Zhang", "Xuancheng Ren", "Tianyu Liu", "Baobao Chang"]
arxiv_id: "2410.07985"
official_url: "https://omni-math.github.io/"
license: ""
size: 4428
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2410.07985"
  - "https://omni-math.github.io/"
---

# OmniMath

> 包含4428道来自全球各类数学竞赛的开放式数学题，覆盖从国家级到国际级数学竞赛，是评测模型奥林匹克级数学推理能力的大规模基准。

## 概述

OmniMath由Gao等人于2024年发布，汇集了来自全球超过100场数学竞赛的题目，包括国际数学奥林匹克（IMO）、美国数学奥林匹克（USAMO）、Putnam竞赛、中国数学奥林匹克等权威赛事。数据集的特点是覆盖面广（"omni"），既包含近年的竞赛题（降低数据污染风险），也包含历史经典题目。

题目难度分级从竞赛入门到IMO级别，每道题均标注了来源竞赛、年份、难度级别和所属数学子领域（代数、几何、数论、组合等）。评测时使用GPT-4作为评判模型，对模型生成的解答进行正确性判断，同时支持与参考答案的自动比对。

OmniMath的发布恰逢大模型数学能力快速提升的时期，为区分不同能力层次的前沿模型提供了重要参照。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 4,428 道 |
| 来源竞赛数 | 100+ 场 |
| 覆盖竞赛 | IMO、USAMO、Putnam、中国数学奥林匹克等 |
| 数学子领域 | 代数、几何、数论、组合 |
| 答案类型 | 开放式（需完整推导） |
| 评测方式 | LLM评判 + 参考答案比对 |

## SOTA 表现

| 模型 | 准确率 |
|------|-------|
| o1（2024） | ~60% |
| GPT-4o | ~48% |
| Claude 3.5 Sonnet | ~42% |
| 开源前沿模型 | ~35-45% |

注：OmniMath难度极高，即使最强模型也难以超过60%，具有较好的区分度。

## 主要挑战与局限

- **评测主观性**：开放式解答的正确性判断依赖LLM评判，存在误判风险，尤其对于非标准但正确的解法。
- **数据污染风险**：部分历史竞赛题可能已出现在模型训练数据中，影响结果可靠性。
- **计算成本高**：LLM评判每道题需要额外的推理成本，大规模评测费用较高。
- **证明类题目难以自动评测**：几何证明、数论证明等需要逻辑严密性的题目，自动评判准确率有限。
- **难度分布不均**：部分竞赛（如IMO）题目极难，可能导致评测结果分布过于集中在低分段。

## 相关页面

- [[MATH]]
- [[MATH500]]
- [[AIME]]
- [[OlympiadBench]]
- [[FrontierMath]]
- [[AMC23]]
