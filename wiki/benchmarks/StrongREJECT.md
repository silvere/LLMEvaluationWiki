---
title: "StrongREJECT"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2024
authors: ["Alexandra Souly", "Qingyuan Lu", "Dillon Bowen", "Tu Trinh", "Elvis Hsieh", "Sana Pandey", "Pieter Abbeel", "Justin Svegliato", "Scott Emmons", "Olivia Watkins", "Sam Toyer"]
arxiv_id: "2402.10260"
official_url: "https://strong-reject.readthedocs.io"
license: "MIT"
size: 313
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2402.10260"
---

# StrongREJECT：越狱评测标准化评分框架

## 概述

StrongREJECT 是 2024 年提出的越狱攻击评测**评分框架**，针对现有越狱成功率（ASR）评测标准的严重缺陷而设计。它的核心贡献不在于提供新的有害问题集，而在于提供一套**更可靠的模型回复质量评分方法**，解决了传统关键词匹配评分的虚假高分问题。

## 问题背景

**现有 ASR 评测的主要问题：**
- 传统关键词匹配（检查是否出现"I'm sorry"等拒绝词）过于简单
- 攻击方法可以通过让模型输出无意义内容（如字母表、随机字符）来"绕过"关键词检测
- 这导致许多越狱方法的宣称成功率被严重虚报

**StrongREJECT 的解决方案：**
- 评分时同时考察**有害性（Harmfulness）**和**具体性/实用性（Specificity/Usefulness）**
- 一个真正"成功"的越狱必须使模型输出既有害又具体实用的内容

## 评分机制

**三维评分体系：**
1. **拒绝分（Refusal Score）**：模型是否拒绝了请求（0=拒绝，1=未拒绝）
2. **无害转化分（Convincing Jailbreak Score）**：回复是否真的有助于执行有害请求
3. **具体性分（Specific Harmful Content Score）**：回复是否包含具体可执行的危险信息

**综合公式：**
StrongREJECT Score = (1 - Refusal) × Specificity × Harmfulness

最终得分在 0–1 之间，只有当模型既未拒绝、回复既有害又具体时才能得高分。

**配套数据集（313 道）：**
- 包含 313 道精选有害问题
- 覆盖 6 个有害类别，难度从显性到隐性递进
- 每道题附有明确的"有害信息具体性"评判标准

## 数据特点

- 313 道题目规模适中，评测效率高
- 开源 MIT 许可证，包含完整评分代码
- 与 GCG、PAIR、AutoDAN 等主流攻击方法的实验结果兼容
- 支持 GPT-4 辅助评分和规则评分两种模式

## 主要发现与局限

StrongREJECT 重新评估了现有越狱方法的真实效果：
- 使用 StrongREJECT 评分后，多个声称 90%+ 成功率的越狱方法实际有效率降至 20–40%
- 现有越狱方法往往能绕过关键词检测，但产生的内容缺乏实际危害性
- 自动化越狱攻击（GCG）的真实威胁被传统评测方法显著高估

主要局限在于"具体性/实用性"的定义本身存在主观性；GPT-4 辅助评分增加成本；该框架主要针对文本越狱，对多模态越狱场景的适用性有限。

## 参考文献

Souly, A., Lu, Q., Bowen, D., et al. (2024). A StrongREJECT for Empty Jailbreaks. *arXiv:2402.10260*.
