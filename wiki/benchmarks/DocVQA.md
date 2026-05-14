---
title: "DocVQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2020
authors: ["Minesh Mathew", "Dimosthenis Karatzas", "C.V. Jawahar"]
arxiv_id: "2007.00398"
official_url: "https://www.docvqa.org"
license: ""
size: 50000
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2007.00398"
---

# DocVQA：文档视觉问答基准

## 概述

DocVQA 是 2020 年由 Mathew 等人提出的文档视觉问答基准，发表于 WACV 2021。它专注于评测模型从**真实扫描文档图像**中提取信息并回答问题的能力，包含 **50,000 余道**问答对，来源于约 12,767 张扫描工业文档图像，是文档理解领域最重要的标准基准之一。

## 任务设计

DocVQA 的文档图像来自 **UCSF 工业文档库（Industry Documents Library）**，包含烟草行业历史文件，涵盖：
- 表单（Forms）
- 信件（Letters）
- 传真（Faxes）
- 广告（Advertisements）
- 科学报告（Scientific Reports）
- 收据与发票（Receipts/Invoices）

问题类型广泛，包括：
- **信息提取**：从文档中定位并提取特定数据（如日期、姓名、数字）
- **数值推理**：基于文档数据进行简单计算
- **列表提取**：从表格或列表中检索多个条目
- **句子查找**：定位满足条件的文本段落

## 评分机制

DocVQA 使用 **ANLS（Average Normalized Levenshtein Similarity）** 指标，而非精确字符串匹配。ANLS 通过计算预测答案与标准答案之间的归一化编辑距离来衡量相似度：
- 当归一化编辑距离 ≤ 0.5 时，按相似度计分
- 当归一化编辑距离 > 0.5 时，计 0 分

这一指标对 OCR 错误和轻微表述差异具有较好的容错性。

## 数据特点

- 训练集约 39,463 道，验证集 5,349 道，测试集 5,188 道
- 图像分辨率差异较大，部分文档图像质量较低
- 通过官方竞赛平台（DocVQA Challenge）维护测试集答案，防止数据泄露
- 2022 年推出 **InfographicsVQA** 和 **SlideVQA** 作为扩展变体

## 主要发现与局限

DocVQA 在发布时大幅推动了文档理解技术的发展：
- 早期纯 OCR+NLP 流水线在 DocVQA 上 ANLS 约为 67%
- 端到端文档理解模型（如 LayoutLM、Donut）通过结合空间布局信息显著提升性能
- GPT-4V 等通用多模态模型在无专门微调的情况下 ANLS 可达 88% 以上

主要局限在于文档图像来源单一（历史工业文档），与现代业务文档存在分布差异；部分问题答案存在歧义，ANLS 指标仍有一定局限。

## 参考文献

Mathew, M., Karatzas, D., & Jawahar, C. V. (2020). DocVQA: A Dataset for VQA on Document Images. *arXiv:2007.00398*. WACV 2021.
