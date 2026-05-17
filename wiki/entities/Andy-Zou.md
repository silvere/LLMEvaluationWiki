---
title: "Andy Zou"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources: []
aliases:
  - Andy Zou
domain:
  - entity
---

# Andy Zou

> CMU 博士生，AI 安全与对齐评测前沿研究者；HarmBench、Universal and Transferable Adversarial Attacks（GCG）、Representation Engineering 等关键工作的核心作者。

## 基本信息

- **所属机构**：Carnegie Mellon University (CMU)；Center for AI Safety (CAIS)
- **研究方向**：AI safety / Adversarial attacks / Representation engineering / Red-teaming
- **导师**：Zico Kolter / Matt Fredrikson

## 评测领域主要贡献

**HarmBench**（[[HarmBench]]）：作为核心作者，建立 LLM 越狱攻击和防御的标准化评测框架；定义 7 大类 + 510 行为的红队测试集，是 2024 后 safety eval 的事实基准之一。

**GCG（Greedy Coordinate Gradient）攻击**：与 Zifan Wang 等共同提出针对 LLM 的通用可迁移对抗攻击方法，发表 *Universal and Transferable Adversarial Attacks on Aligned Language Models*（2023），是 jailbreak 评测、安全鲁棒性评测的 baseline 方法。

**Representation Engineering（RepE）**：提出从 hidden state 操控模型行为的方法论；为「白盒安全评测」「explainability 评测」开辟新方向，对应到对齐评测中的 mechanistic interpretability 方向。

**WMDP（Weapons of Mass Destruction Proxy）**：参与 dangerous capability evaluation 设计，定义可代理测量大规模杀伤性武器相关知识泄露风险的评测集。

## 代表性工作

- HarmBench（2024 ICML）
- GCG / Universal Adversarial Attacks（2023）
- Representation Engineering: A Top-Down Approach to AI Transparency
- WMDP

## 相关页面

- [[HarmBench]]
- [[Center-for-AI-Safety]]
- [[safety-eval-landscape]]
- [[Zico-Kolter]]
- [[red-teaming]]
