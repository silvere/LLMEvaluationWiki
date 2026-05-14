---
title: "PIQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2020
authors: ["Bisk et al."]
arxiv_id: "1911.11641"
official_url: "https://yonatanbisk.com/piqa/"
license: "AFL-3.0"
size: 16113
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# PIQA（Physical Intuition Question Answering）

> 测试模型对物理世界直觉和日常常识的理解能力的二选一问答基准。

## 概述

PIQA（Physical Intuition QA）由 Bisk 等人于 2019 年提出（发表于 AAAI 2020），专注于测试模型对物理世界的直觉理解。与其他常识推理数据集不同，PIQA 特别关注**具身知识**（embodied knowledge），即关于物体属性、材料特性和物理操作的日常直觉，这类知识往往在文本语料中极少被明确描述。

每道题目给出一个目标（goal），要求模型从两个解决方案（solution）中选择更合适的一个。例如，如何用勺子舀起粘稠的液体，或如何防止盆栽土壤变干。这类问题对人类来说显而易见，但对于主要从文本中学习的语言模型来说颇具挑战性。

数据集通过众包方式构建：首先招募标注者提供涉及物理操作的目标描述，再由另一批标注者分别提供正确和错误的解决方案。最终通过验证筛选高质量样本。

数据集共约 16,000 道题，分为训练集（约 12,000）、验证集（约 1,800）和隐藏测试集（约 3,000）。测试集标签不公开，需要通过官方接口评测。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2020 |
| 数据量 | 约 16,113 题 |
| 格式 | 多选题（2 选 1） |
| 领域 | 物理常识、具身知识 |
| 语言 | 英文 |
| 许可证 | AFL-3.0 |
| 数据来源 | 众包（AMT） |

## SOTA 表现

当前顶尖大型语言模型在 PIQA 上的准确率已超过 90%。人类基线约为 94%。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **题目仅限物理常识**：不覆盖社会、文化等其他类型常识
- **二选一格式简单**：模型可通过猜测获得较高基线（50%）
- **测试集封闭**：标签不公开，自评需通过官方提交
- **文化偏差**：日常操作习惯具有文化特异性，可能对非英语文化背景不公平
- **与训练数据重叠**：常识题目内容可能与大型语言模型的训练数据高度重叠

## 相关页面

- [[HellaSwag]]
- [[CommonsenseQA]]
- [[SocialIQA]]
- [[WinoGrande]]
- [[ARC]]
