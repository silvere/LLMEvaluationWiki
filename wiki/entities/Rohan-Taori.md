---
title: "Rohan Taori"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Rohan Taori

Rohan Taori 是斯坦福大学计算机科学系博士研究生（CRFM，Center for Research on Foundation Models），Alpaca 模型的主要作者之一。他的研究集中于指令跟随（Instruction Following）评测和语言模型高效训练方法。

## 核心贡献

**Stanford Alpaca**：2023年3月，Taori 与 Ishaan Gulrajani、Tianyi Zhang、Yann Dubois 等斯坦福研究人员联合发布 Alpaca 模型。Alpaca 基于 Meta 的 LLaMA-7B 模型，使用 GPT-3.5 生成的52000条指令微调数据进行训练，总成本约为600美元。Alpaca 的发布具有重要的方法论意义：

- 证明了通过自指令（Self-Instruct）方法从强模型蒸馏出指令数据，可以以极低成本实现较好的指令跟随能力
- 推动了开源指令微调研究的热潮，使学术机构具备构建和评测指令跟随模型的能力
- 引发了关于用强模型输出作为评测标准（LLM-as-Judge）的方法论讨论，包括循环评测偏差问题

**指令跟随评测研究**：Taori 参与了 HELM（Holistic Evaluation of Language Models）等综合评测框架的相关讨论，关注如何客观评测模型的指令遵循质量，区分表面流畅性与实际任务完成能力。

## 对评测生态的影响

Alpaca 发布后，指令跟随能力成为 LLM 评测的核心维度之一，"指令遵循率"被纳入主流评测基准。Alpaca 使用的"Self-Instruct"数据生成方法也被后续多个数据集（如 ShareGPT 派生数据集）采用，推动了合成数据在评测中的方法论讨论。

Taori 的工作代表了学术界通过低成本开源模型推动 LLM 评测民主化的努力，使更多研究机构能够参与前沿模型的对比评测研究。
