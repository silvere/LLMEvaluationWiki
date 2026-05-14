---
title: "CValues"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety, bias-fairness]
language: zh
year: 2023
authors: ["Guohai Xu", "Jiayi Liu", "Ming Yan", "Haotian Xu", "Jinghui He", "Huixing Jiang", "Zheng Cao", "Wei Wang", "Jian Wu", "Chenliang Li", "Weifeng Chen", "Jianquan Li", "Guoxin Li", "Weiming Lu", "Haibo Wang", "Ji Zhang", "Fuzheng Zhang", "Di Zhang", "Kun Gai"]
arxiv_id: "2307.09705"
official_url: "https://github.com/X-PLUG/CValues"
license: "Apache 2.0"
size: 2000
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2307.09705"
---

# CValues：中文大语言模型价值观对齐评测基准

## 概述

CValues 是 2023 年由阿里巴巴团队提出的中文大语言模型**价值观对齐**评测基准。它专注于评测中文 LLM 在**安全性（Safety）**和**责任性（Responsibility）**两个维度上的价值对齐程度，包含约 **2,000 条**测试样本，是首批系统化评测中文模型价值观的重要基准之一。

## 任务设计

CValues 的核心理念是：一个对齐良好的中文语言模型，不仅要拒绝有害请求（安全性），还应在合法合规前提下积极提供帮助（责任性）。两者缺一不可。

**双维度评测框架：**

**1. 安全性（Safety）：**
评测模型是否能正确识别并拒绝以下有害请求：
- 违法违规内容（涉及中国法律的违规行为）
- 道德伦理禁区（诽谤、侵权、仇恨言论）
- 社会有害内容（虚假信息、色情、暴力）
- 政治敏感内容（涉及中国政治红线的话题）

**2. 责任性（Responsibility）：**
评测模型是否在合法合理情境下提供有效帮助，而非过度拒绝：
- 教育知识问答
- 健康医疗咨询（合规范围内）
- 法律常识解答
- 日常生活协助

**评测形式：**
主要采用**对比式多项选择（Comparison-based Multiple Choice）**：给定问题和两个模型回答，要求选出更符合价值观的回答，或直接判断单条回答是否合适。

## 评分机制

CValues 采用以下评分方式：
- 对比选择准确率（两选一）
- 分别统计安全性得分和责任性得分
- 综合得分（安全性和责任性的加权平均）

## 数据特点

- 约 2,000 条测试样本，涵盖安全和责任两大类
- 数据完全面向中文语境，覆盖中国法律法规和社会文化规范
- 提供人工标注的偏好对（Preference Pairs），可用于 RLHF 研究
- 发布训练集数据（约 145,000 条偏好对），支持中文价值观对齐训练

## 主要发现与局限

CValues 的评测揭示了中文模型价值对齐的现状：
- 大多数中文模型在安全性上表现较好，但责任性（避免过度拒绝）仍有欠缺
- 涉及中国政治敏感话题的安全边界识别是主要挑战
- 英文基础模型在不经中文特化训练的情况下，对中国法律法规红线识别不足

主要局限在于评测标准高度依赖中国法律和社会规范，不适用于其他语言/文化环境的评测；覆盖范围相对有限（2,000 条）；"责任性"的定义边界较为模糊。

## 参考文献

Xu, G., Liu, J., Yan, M., et al. (2023). CValues: Measuring the Values of Chinese Large Language Models from Safety to Responsibility. *arXiv:2307.09705*.
