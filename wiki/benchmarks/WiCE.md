---
title: "WiCE"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [hallucination, reasoning]
language: en
year: 2023
authors: ["Kamoi et al."]
arxiv_id: "2303.08731"
official_url: "https://github.com/ryokamoi/wice"
license: "MIT"
size: 761
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# WiCE（Fine-grained Textual Entailment and Claim Decomposition）

> 细粒度文本蕴含评测基准，要求对声明进行子句级分解并逐条验证与支持文档的蕴含关系。

## 概述

WiCE 由 Kamoi 等人于 2023 年提出（发表于 EMNLP 2023）。该基准专注于**细粒度文本蕴含**（fine-grained textual entailment）任务，要求模型不仅判断整体声明是否被支持，还要对声明进行子句级（subclaim）分解，并逐条判断每个子声明是否被给定文档所支持。

WiCE 的设计动机来自于传统 NLI 任务（如 SNLI/MultiNLI）的局限：这些数据集通常对整句进行整体判断，无法识别声明中哪些具体部分是幻觉或错误的。WiCE 通过细粒度分解解决了这一问题。

数据集基于 Wikipedia，包含两类任务：
1. **声明验证（Claim Verification）**：给定文章段落和声明，判断声明是否被文章支持（SUPPORTS/PARTIALLY_SUPPORTS/NOT_SUPPORTED）
2. **子声明分解与验证**：将声明分解为最小语义单元，逐条判断蕴含关系

数据集共约 761 个实例，每个实例包含一段 Wikipedia 文章和一条声明（通常来自 FEVER 或 VitaminC 等数据集）。

WiCE 是评测模型事实核查细粒度推理能力的重要工具，特别适合用于检测部分幻觉（即声明中只有部分内容是错误的）。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 761 个实例 |
| 格式 | 细粒度蕴含分类（SUPPORTS/PARTIALLY_SUPPORTS/NOT_SUPPORTED） |
| 领域 | 事实核查、文本蕴含 |
| 语言 | 英文 |
| 许可证 | MIT |
| 数据来源 | Wikipedia + FEVER/VitaminC |

## SOTA 表现

顶尖大型语言模型在 WiCE 的整体声明验证准确率约为 70-80%，子声明级别的细粒度评测更具挑战性。具体成绩见原论文及 GitHub。

## 主要挑战与局限

- **规模较小**：761 个实例统计稳定性有限
- **子声明分解主观性**：不同标注者对声明的分解方式可能不同
- **PARTIALLY_SUPPORTS 类别难界定**：部分支持的边界主观性较强
- **领域局限**：主要基于 Wikipedia，不代表所有文本类型
- **评测指标复杂**：子声明级别的评测需要特殊评测逻辑

## 相关页面

- [[FEVER]]
- [[HaluEval]]
- [[FActScore]]
- [[TruthfulQA]]
- [[MultiNLI]]
