---
title: "DataComp-LM (DCLM)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://www.datacomp.ai/dclm/"
  - "https://arxiv.org/abs/2406.11794"
aliases:
  - DCLM
  - DataComp-LM
  - DataComp for Language Models
domain:
  - benchmark
  - pretraining
---

# DataComp-LM（DCLM）

> 由华盛顿大学 / Apple / TRI 等机构 2024-06 发布的「数据中心型」LM 评测协议：固定训练超参与模型结构，只让参赛者改进训练数据；从 Common Crawl 提取 240T token 的开放语料 DCLM-Pool，按 53 个下游任务统一评测。是 pretraining data curation 评测的事实标准。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官网**: [https://www.datacomp.ai/dclm/](https://www.datacomp.ai/dclm/)
- **arXiv**: [https://arxiv.org/abs/2406.11794](https://arxiv.org/abs/2406.11794)

<!-- AUTO-LINKS:END -->

## 设计

- **协议**：固定 model architecture + training recipe，仅评测数据 curation 策略
- **数据池**：DCLM-Pool（240T token，Common Crawl 抽取，最大可用开源训练语料）
- **规模档**：412M / 1B / 3B / 7B 参数 + 不同 token 预算（"compute-optimal" 多档）
- **评测**：53 个下游任务（含 [[MMLU]] / [[HellaSwag]] / [[ARC]] 等），统一 zero/few-shot 协议

## 关键结果

- **DCLM-BASELINE** 7B 模型在 2.6T token 训练后达到 64% MMLU 5-shot，超越同期 Llama-3-8B 的部分数据效率
- 验证 data curation 在固定 compute 下可贡献 >10% accuracy 提升

## 意义

- 是「数据是大模型 bottleneck」论的关键实证证据
- 影响 Llama 3 / Qwen 2 / DeepSeek-V2 等模型的数据筛选 pipeline 设计

## 相关页面

- [[MMLU]]
- [[HellaSwag]]
- [[pretraining-eval]]
- [[scaling-laws]]
