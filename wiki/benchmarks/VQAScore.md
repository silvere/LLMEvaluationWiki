---
title: "VQAScore"
type: tool
dimension: F
subdimension: metric
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2404.01291"
  - "https://linzhiqiu.github.io/papers/vqascore/"
aliases:
  - VQAScore
  - VQA-Score
arxiv_id: "2404.01291"
official_url: "https://linzhiqiu.github.io/papers/vqascore/"
license: "Research"
org: "CMU + Meta"
domain:
  - multimodal
  - vision
---

# VQAScore

> CMU 林志谦等 2024-04 推出的 text-to-visual 对齐评测指标（ECCV 2024）。核心思路：用 **VQA 模型** 判断「这张图是否如 prompt 描述」，分数 = VQA 模型说 yes 的概率。**off-the-shelf VLM** 即可，无需训练。多个 benchmark 上 SOTA，碾压 CLIPScore。

## 设计

- **简单到不像评测指标**：score = P(VQA model says "yes" | image, prompt = "Does this image show <prompt>?")
- **off-the-shelf**：用现成 VLM（CLIP-FlanT5 / GPT-4V）即可，无需 fine-tune
- **多 benchmark SOTA**：在 GenAI-Bench / T2I-CompBench / Winoground / EqBen 等多个 benchmark 上超过 CLIPScore / BLIPScore / PickScore 等

## 评测圈意义

- 「**用 VLM 评测 T2V**」的代表方法，把生成评测复用到判别 VLM
- 配合 [[GenAI-Bench]] 形成评测套件
- 推动「LLM-as-judge for visual」范式

## 已知 pitfall

- 评分上限 = VLM 自身能力上限（VLM 错就跟着错）
- 不同 VLM 给出的分数不可对比（CLIP-FlanT5 vs GPT-4V 差异大）
- 对长 prompt / 复杂 relation 仍有边界

## 相关页面

- [[GenAI-Bench]]
- [[GenEval]]
- [[CLIPScore]]
- [[llm-as-judge]]
- [[multimodal-eval]]
