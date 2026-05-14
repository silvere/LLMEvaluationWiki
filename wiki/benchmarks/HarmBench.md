---
title: "HarmBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [safety]
language: en
year: 2024
authors: ["Mazeika et al."]
arxiv_id: "2402.04249"
official_url: "https://github.com/centerforaisafety/HarmBench"
license: ""
size: 0
format: multiple-choice
status: active
saturation_threshold: 0.80
sources: [""]
---

# HarmBench

> 标准化的 LLM 安全红队评测框架，统一衡量多种攻击方法对不同模型的攻击成功率。

## 概述

HarmBench 于 2024 年发布，由 Center for AI Safety 团队主导。其目标是为 LLM 安全红队测试提供标准化的评测基础设施，解决此前安全评测领域"各自为战"的碎片化问题——不同论文使用不同攻击方法、不同数据集、不同评判标准，导致研究结果难以横向对比。

HarmBench 的核心设计是统一框架：将多种主流攻击方法（包括 GCG 梯度优化攻击、PAIR 基于对话的越狱、TAP 树状攻击规划等）集成到同一评测流程，针对一批有代表性的有害请求（涵盖化学武器、网络攻击、虚假信息等类别），系统性测试各攻击方法对各目标模型的攻击成功率（Attack Success Rate，ASR）。

这一框架使得研究者可以在同等条件下比较：哪种攻击方法对哪类模型最有效？防护措施对哪类攻击的抵御效果更好？模型在安全微调后，对特定攻击的抵抗力是否提升？这些问题的标准化回答对于安全研究和模型迭代均有重要意义。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 大小 | 待核实（含多类有害请求类别） |
| 题目格式 | 对话（攻击-响应对，评判攻击成功与否） |
| 覆盖领域 | 安全（Safety） |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态。饱和阈值设为 80%，此处的含义为：若主流防御模型的整体 ASR 已被压降至 20% 以下（即 80% 的攻击被成功防御），则视为防御侧接近饱和。当前顶级对齐模型在 HarmBench 上的整体 ASR 已大幅下降，但特定攻击方法（如 GCG）对部分模型仍有一定效果（具体数值以原始论文为准）。攻击方法本身持续演进，HarmBench 需要定期更新以纳入新攻击。

## 主要局限

- **攻击方法覆盖存在滞后**：安全攻击领域演进迅速，HarmBench 纳入的攻击方法集合无法实时反映最新越狱技术，存在评测盲区。
- **ASR 评判依赖分类器**：判断模型是否"成功被攻击"通常借助字符串规则或分类器，存在误判，尤其对于措辞隐晦的有害输出识别准确率有限。
- **有害类别覆盖的伦理边界**：评测框架本身需要包含真实有害请求，如何在不助长实际危害的前提下开放评测数据，是持续存在的操作挑战。

## 相关页面

- [[TruthfulQA]]
- [[safety-eval-landscape]]
- [[red-teaming]]
