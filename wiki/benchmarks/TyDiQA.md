---
title: "TyDi QA (Typologically Diverse Question Answering)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, multilingual]
language: multilingual
year: 2020
authors: ["Jonathan H. Clark", "Eunsol Choi", "Michael Collins", "Dan Garrette", "Tom Kwiatkowski", "Vitaly Nikolaev", "Jennimaria Palomaki"]
arxiv_id: "2003.05002"
official_url: "https://github.com/google-research-datasets/tydiqa"
license: "Apache 2.0"
size: 204000
format: open-ended
status: active
saturation_threshold: 0.85
sources:
  - "Clark, J.H., et al. (2020). TyDi QA: A Benchmark for Information-Seeking Question Answering in Typologically Diverse Languages. TACL 2020."
---

# TyDi QA

## 概述

TyDi QA（Typologically Diverse Question Answering）是由 Google Research 于 2020 年发布的多语言信息检索型问答基准，专注于覆盖**类型学多样性（typological diversity）**的语言——即在语言结构（语序、形态学、书写系统等）上尽可能不同的语言组合。这一设计克服了许多多语言数据集中语言分布偏向印欧语系的问题。

## 语言选择原则

TyDi QA 的语言选择基于类型学多样性，覆盖 **11 种语言**：

| 语言 | 特点 |
|------|------|
| 阿拉伯语（Arabic） | 闪语族，形态丰富，右到左书写 |
| 孟加拉语（Bengali） | 印度-雅利安语，独特文字系统 |
| 芬兰语（Finnish） | 乌拉尔语系，高度形态屈折 |
| 印度尼西亚语（Indonesian） | 南岛语族，词序灵活 |
| 日语（Japanese） | 日语系，三套书写系统 |
| 斯瓦希里语（Kiswahili） | 班图语族，名词类系统 |
| 韩语（Korean） | 语系孤立，黏着语 |
| 俄语（Russian） | 斯拉夫语，高度格变化 |
| 泰卢固语（Telugu） | 达罗毗荼语系 |
| 泰语（Thai） | 汉藏语系，无词间空格 |
| 英语（English） | 印欧语系参考语言 |

## 数据规模

| 分割 | 数量 |
|------|------|
| 训练集 | 166,962 |
| 开发集 | 18,670 |
| 测试集 | 18,668 |
| 合计 | ~204,000 |

## 任务设计

TyDi QA 包含两种评测任务：

1. **Primary Task（原始任务）**：无英语答案参考，用每种语言的原始维基百科文章作为上下文，完全在目标语言内进行问答（更难，更真实）
2. **Gold Passage Task（黄金段落任务）**：提供包含答案的段落，模型只需从段落中抽取答案（类似 SQuAD 格式，难度较低）

两种任务均为**抽取式**（从原文中定位答案片段），评测指标为 F1 分数和精确匹配（EM）。

## 数据收集方法

TyDi QA 的问题由**母语者**独立撰写（而非翻译英文问题），问题创作者无法看到文章内容（"information-seeking"设置），确保问题反映真实信息需求而非答案反推。

## 与其他多语言 QA 的对比

| 基准 | 语言数 | 构建方式 | 类型学多样性 |
|------|--------|---------|------------|
| TyDi QA | 11 | 原创（各语言） | 高 |
| XNLI | 15 | 翻译 | 中 |
| MLQA | 7 | 翻译 | 低 |
| XQuAD | 11 | 翻译 | 低 |

## 评测意义

1. **真实多语言能力评测**：由于问题在各语言中独立创作，TyDi QA 比翻译数据集更能测试模型对各语言语言特性的真实理解
2. **形态学挑战**：芬兰语的 15 种格、泰卢固语的复杂形态变化等，对依赖英语预训练的模型构成显著挑战
3. **推动跨语言迁移研究**：TyDi QA 是 mT5、mDeBERTa 等多语言模型在零样本跨语言迁移研究中的核心基准

## 局限性

- 仅覆盖 11 种语言，仍不能代表世界语言的完整多样性
- 抽取式格式不适合评测开放式生成能力
- 维基百科数据来源导致知识分布偏向有维基百科的语言

## 相关基准

- **XNLI**：跨语言推理，15 种语言
- **XQuAD**：11 种语言版 SQuAD，翻译构建
- **MKQA**：多语言知识密集型问答
- **Belebele**：122 种语言的多选阅读理解
