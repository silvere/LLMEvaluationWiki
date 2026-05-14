---
title: "JailbreakBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2024
authors: ["Patrick Chao", "Edoardo Debenedetti", "Alexander Robey", "Maksym Andriushchenko", "Francesco Croce", "Vikash Sehwag", "Edgar Dobriban", "Nicolas Flammarion", "George J. Pappas", "Florian Tramèr", "Hamed Hassani", "Eric Wong"]
arxiv_id: "2404.01318"
official_url: "https://jailbreakbench.github.io"
license: "MIT"
size: 100
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2404.01318"
---

# JailbreakBench：越狱攻击标准化评测框架

## 概述

JailbreakBench 是 2024 年提出的**标准化越狱攻击评测框架**，旨在解决越狱研究中评测协议不一致、结果难以复现的问题。它包含 **100 道**精心策划的越狱场景（JBB-Behaviors），并提供统一的攻击代码实现、评分工具链和公开排行榜，是越狱研究领域最重要的标准化基准。

## 框架设计

**JBB-Behaviors（100 道越狱场景）：**
- 从 AdvBench 等现有数据集筛选并人工精选的 100 条有害行为
- 覆盖 10 个有害类别：
  1. 化学与生物武器
  2. 网络攻击
  3. 虚假信息与操纵
  4. 金融犯罪
  5. 政府攻击
  6. 仇恨言论
  7. 物理暴力
  8. 版权侵犯
  9. 隐私侵犯
  10. 其他有害内容
- 每道场景附有标准化的行为描述和目标回复开头

**标准化评测流程：**
1. 使用统一的提示词格式和 API 调用协议
2. 使用 **Llama Guard 2** 作为自动评判模型
3. 支持人工二次校验
4. 提供可复现的代码库和结果归档

## 评分机制

JailbreakBench 采用双层评分：
- **自动评分**：Llama Guard 2 判断模型输出是否违反安全策略（有害/无害）
- **人工确认**：对于存疑案例进行人工标注
- 最终报告**攻击成功率（ASR）**，定义为被判定有害的回复占总测试数的比例

## 数据特点

- 100 道场景覆盖范围系统化，各类别分布均衡
- 配套开源代码库，内置 GCG、PAIR、AutoDAN 等主流攻击算法实现
- 提供公开排行榜，持续追踪不同攻击方法对不同模型的效果
- 版本化管理，确保历史结果可溯源比较

## 主要发现与局限

JailbreakBench 的建立显著改善了越狱研究的可比性：
- 统一评测协议下，不同攻击方法的效果差异比之前宣称的更小
- Llama Guard 自动评分与人工评分的一致性约为 85–90%
- 当前最强防御（如 PAIR 对抗训练）仍有 5–15% 的 ASR

主要局限在于 100 道场景覆盖广度有限；Llama Guard 评分可能存在对某些绕过方式的盲点；攻击方法更新迭代速度极快，排行榜维护压力大；标准化流程可能对某些最新攻击策略不适用。

## 参考文献

Chao, P., Debenedetti, E., Robey, A., et al. (2024). JailbreakBench: An Open Robustness Benchmark for Jailbreaking Large Language Models. *arXiv:2404.01318*.
