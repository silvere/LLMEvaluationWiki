---
title: "Do-Not-Answer"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2023
authors: ["Yuxia Wang", "Haonan Li", "Xudong Han", "Preslav Nakov", "Timothy Baldwin"]
arxiv_id: "2308.13387"
official_url: "https://github.com/Libr-AI/do-not-answer"
license: "Apache 2.0"
size: 939
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2308.13387"
---

# Do-Not-Answer：拒答能力系统评测基准

## 概述

Do-Not-Answer 是 2023 年提出的专门评测大语言模型**拒绝回答有害问题**能力的基准数据集。它包含 **939 道**精心设计的有害问题，覆盖 5 大风险类别和 12 个子类别，旨在系统化地评测模型的安全边界识别能力，是该领域首批大规模系统性评测数据集之一。

## 任务设计

Do-Not-Answer 的核心理念是：收集那些**负责任的语言模型应当拒绝回答**的问题，并评测模型是否能正确识别并拒绝这些问题。

**五大风险类别（Risk Areas）：**

1. **信息与内容安全（Information & Content Safety）**
   - 非法活动指导（合成药物、武器制造等）
   - 有害内容生成（骚扰、仇恨言论）

2. **有害内容生成（Harmful Content Generation）**
   - 歧视性内容
   - 误导性信息生成

3. **人类-AI 交互伦理（Human-AI Interaction Ethics）**
   - 角色扮演绕过安全约束
   - 过度情感依赖诱导

4. **恶意使用（Malicious Uses）**
   - 针对个人的攻击工具
   - 大规模操纵和欺骗

5. **政治敏感（Political Sensitivity）**
   - 政治偏见生成
   - 选举干预

## 评分机制

Do-Not-Answer 提供两种评分方式：
- **自动评分**：基于 ChatGPT 的二分类（应拒绝/已拒绝），将模型回复提交给 ChatGPT 判断是否属于拒绝回答
- **细粒度分析**：人工标注模型回复的行动类型（完全遵从/部分遵从/明确拒绝/规避等）
- 报告**拒绝率（Refusal Rate）**和**安全率（Safety Rate）**

## 数据特点

- 939 道问题均经过人工验证，确保确实属于"不应回答"的范畴
- 每道问题附有风险类别和子类别标签
- 数据集支持中英双语（提供中文翻译版本）
- 开源 Apache 2.0 许可证，可自由用于研究

## 主要发现与局限

Do-Not-Answer 的评测揭示了不同模型安全策略的差异：
- ChatGPT 和 Claude 对绝大多数问题能正确拒绝（安全率 > 90%）
- 开源模型（早期版本）在政治敏感和角色扮演类问题上拒绝率较低
- 不同语言（英中）下，同一模型的拒绝率存在显著差异
- 部分模型通过含糊回答（而非明确拒绝）来规避安全问题，难以用简单指标捕捉

主要局限在于评测仅覆盖"应拒绝"场景，无法评估过度拒绝（False Positive）问题；ChatGPT 自动评分存在评分偏差；问题覆盖的危害类别受设计时期认知局限影响。

## 参考文献

Wang, Y., Li, H., Han, X., Nakov, P., & Baldwin, T. (2023). Do-Not-Answer: A Dataset for Evaluating Safeguards in LLMs. *arXiv:2308.13387*.
