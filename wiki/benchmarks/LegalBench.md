---
title: "LegalBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2023
authors: ["Guha et al."]
arxiv_id: "2308.11462"
official_url: "https://hazyresearch.stanford.edu/legalbench/"
license: "CC-BY-4.0"
size: 0
format: other
status: active
saturation_threshold: 0.90
sources: []
---

# LegalBench

> 由法学院学生和法律专家合作构建的 162 个法律推理任务集合，覆盖法律推理的多个维度。

## 概述

LegalBench 由 Guha 等人于 2023 年提出，来自斯坦福大学 Hazy Research Lab（发表于 NeurIPS 2023）。该基准是迄今为止最全面的法律推理评测套件，由超过 40 位法学院学生和法律专家共同构建，历时数年完成。

LegalBench 包含 162 个独立的法律任务，覆盖 6 类核心法律推理能力：
1. **问题识别（Issue Spotting）**：识别法律案例中的关键法律问题
2. **规则回忆（Rule Recall）**：回忆和引用相关法律规则
3. **规则解释（Rule Interpretation）**：解释法律条文的含义
4. **规则应用（Rule Application）**：将法律规则应用于具体事实
5. **规则结论（Rule Conclusion）**：得出法律结论
6. **解释性推理（Interpretive Reasoning）**：进行法律解释推理

这 6 类能力对应于 IRAC（Issue, Rule, Application, Conclusion）法律推理框架，是法学院一年级学生必须掌握的基本法律分析方法。

任务来源广泛，包括：真实法律文件、判决书、合同、法学院考试题、法律理解测验等。题型多样，包括分类、抽取、是否判断等，使用多种评测指标。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 子任务数 | 162 个 |
| 格式 | 多种（分类/抽取/判断） |
| 领域 | 法律推理 |
| 语言 | 英文 |
| 许可证 | CC-BY-4.0 |
| 涵盖法律类型 | 美国联邦和州法律为主 |

## SOTA 表现

顶尖大型语言模型（GPT-4、Claude 3 等）在 LegalBench 的平均准确率约为 55-70%，不同任务差异显著。具体最新成绩见各模型官方技术报告及官方排行榜。

## 主要挑战与局限

- **美国法律偏向**：主要覆盖美国法律体系，对其他法律体系的评测有限
- **任务难度差异大**：162 个任务难度从基础到专家级不等
- **法律知识时效性**：法律会随立法和判例不断更新
- **任务聚合困难**：162 个任务的指标各异，宏平均可能掩盖重要细节
- **需要真实执业资质验证**：更高阶的任务需要专业律师才能可靠评测

## 相关页面

- [[MedQA]]
- [[FinanceBench]]
- [[MMLU]]
- [[AGIEval]]
- [[ReClor]]
