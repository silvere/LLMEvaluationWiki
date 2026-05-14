---
title: "MedQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: multilingual
year: 2021
authors: ["Jin et al."]
arxiv_id: "2009.13081"
official_url: "https://github.com/jind11/MedQA"
license: "MIT"
size: 12723
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# MedQA

> 基于美国医学执照考试（USMLE）的医学推理问答基准，同时包含中国和台湾医学考试题目。

## 概述

MedQA 由 Jin 等人于 2021 年提出（发表于 Applied Sciences 2021）。该数据集从多个国家的医学执照考试中收集题目，旨在评测语言模型的医学知识理解和临床推理能力。

数据集包含三个版本：
- **USMLE（美国）**：约 12,723 道美国医学执照考试题（Step 1-3），四选一或五选一
- **中国国家医师资格考试**：约 34,251 道题（含中文版本）
- **台湾医师考试**：约 14,123 道题

USMLE 版本是引用最广泛的版本。USMLE 考试分为三个阶段：Step 1 测试基础医学科学，Step 2 CK 测试临床知识，Step 3 测试临床实践。这些题目要求综合运用病理生理、药理、微生物等基础医学知识和临床推理能力，对模型的医学推理能力是重大挑战。

MedQA 是评测医学 AI 能力的标准基准之一，与 PubMedQA 和 MedMCQA 共同构成医学 NLP 评测的核心套件。GPT-4 在 USMLE Step 1-3 上均超过医师执照考试及格线（约 60%），在医学 AI 领域引起广泛关注。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2021 |
| 数据量 | USMLE 约 12,723 题，全部约 60k+ |
| 格式 | 多选题（4-5 选 1） |
| 领域 | 医学知识、临床推理 |
| 语言 | 英文（主）、中文 |
| 许可证 | MIT |
| 数据来源 | USMLE、中国/台湾医师考试 |

## SOTA 表现

GPT-4 在 MedQA (USMLE) 上的准确率约为 87%，超过医师执照考试及格线（约 60%）。顶尖医学专用模型（如 MedPaLM 2）准确率更高，接近 90%。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **医学知识时效性**：医学知识和诊疗指南不断更新
- **题目版权**：USMLE 题目存在版权问题，实际使用的题目可能是近似版本
- **临床背景依赖**：部分题目需要大量临床背景知识
- **评测局限**：多选题格式无法测试实际临床决策和操作能力
- **中英文差异**：中文版题目在语言和知识体系上与英文版存在差异

## 相关页面

- [[PubMedQA]]
- [[LegalBench]]
- [[MMLU]]
- [[FinanceBench]]
