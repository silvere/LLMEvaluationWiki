---
title: "BeaverTails"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety, bias-fairness]
language: en
year: 2023
authors: ["Jiaming Ji", "Mickel Liu", "Juntao Dai", "Xuehai Pan", "Chi Zhang", "Ce Bian", "Boyuan Chen", "Ruiyang Sun", "Yizhou Wang", "Yaodong Yang"]
arxiv_id: "2307.04657"
official_url: "https://sites.google.com/view/pku-beavertails"
license: "CC BY NC SA 4.0"
size: 330000
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2307.04657"
---

# BeaverTails：安全对齐研究数据集

## 概述

BeaverTails 是 2023 年由北京大学提出的大规模安全对齐数据集，发表于 NeurIPS 2023 数据集赛道。它包含约 **33 万条**问答对，每条均附有**安全性标注**（Safe/Unsafe）和**有害类别标签**，旨在为 RLHF（基于人类反馈的强化学习）和安全对齐研究提供高质量数据基础。

## 数据设计

BeaverTails 的构建流程如下：

**数据来源：**
- 从 Alpaca、ShareGPT 等指令数据集中收集 QA 对
- 通过众包平台（Amazon Mechanical Turk）进行人工安全标注
- 每条数据由多名标注员独立判断，取多数投票

**标注体系：**
- **安全性标签**：Safe（安全）/ Unsafe（不安全）
- **14 个有害类别**（多标签，可同时属于多类）：
  1. 仇恨言论（Hate Speech）
  2. 暴力（Violence）
  3. 自我伤害（Self-Harm）
  4. 色情（Sexual Content）
  5. 身体伤害（Physical Harm）
  6. 财产犯罪（Property Crime）
  7. 欺诈（Deception/Fraud）
  8. 间谍/网络攻击（Cybercrime）
  9. 政治操纵（Political Manipulation）
  10. 武器（Weapons）
  11. 毒品（Drugs）
  12. 人体实验（Unethical Research）
  13. 隐私侵犯（Privacy Violation）
  14. 歧视（Discrimination）

**数据规模分布：**
- 安全问答对：约 23 万条
- 不安全问答对：约 10 万条

## 评分机制

BeaverTails 作为训练/评测数据集使用，通常配合以下评测方式：
- 训练安全分类器，在测试集上计算 F1/AUC
- 用于 RLHF 奖励模型训练，评测对齐效果
- 通过人工评估验证模型在不同有害类别上的拒绝/遵从率

## 数据特点

- 迄今为止覆盖最广泛的多类别安全对齐标注数据集之一
- 同时包含问题（Prompt）和回答（Response）两级标注
- 提供完整的原始标注分歧数据，支持标注质量研究
- CC BY NC SA 4.0 许可，仅供非商业研究使用

## 主要发现与局限

BeaverTails 的大规模标注揭示了安全对齐研究的重要发现：
- 不同有害类别的标注一致性差异显著（隐私侵犯类别标注者间分歧最大）
- 训练于 BeaverTails 的奖励模型能有效区分微妙的安全性差异
- 使用 BeaverTails 进行 RLHF 微调能显著降低模型生成有害内容的概率

主要局限在于标注来自众包平台，质量参差不齐；有害类别定义受特定文化背景影响；数据主要为英文，多语言泛化性有限；部分"安全"标注可能包含微妙有害内容（边缘案例）。

## 参考文献

Ji, J., Liu, M., Dai, J., et al. (2023). BeaverTails: Towards Improved Safety Alignment of LLM via a Human-Preference Dataset. *arXiv:2307.04657*. NeurIPS 2023.
