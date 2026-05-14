---
title: "WildGuard"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2024
authors: ["Seungju Han", "Kavel Rao", "Allyson Ettinger", "Liwei Jiang", "Bill Yuchen Lin", "Nathan Lambert", "Yejin Choi", "Nouha Dziri"]
arxiv_id: "2406.18495"
official_url: "https://github.com/allenai/wildguard"
license: "Apache 2.0"
size: 13000
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2406.18495"
---

# WildGuard：野外安全交互评测与分类工具

## 概述

WildGuard 是 2024 年由 Allen Institute for AI 提出的开源安全评测工具和数据集，专注于**真实用户-AI 交互场景**中的安全性评测。它提供了一个包含约 **13,000 条**真实或接近真实的用户-AI 交互标注数据集，同时开源了一个基于 Mistral-7B 微调的安全分类器，用于判断提示词的有害性和模型回复的合规性。

## 框架设计

WildGuard 解决三个核心安全分类任务：

**1. 提示词有害性检测（Prompt Harmfulness Detection）：**
- 判断用户输入是否包含有害意图
- 覆盖直接有害请求和隐式越狱尝试

**2. 回复有害性检测（Response Harmfulness Detection）：**
- 判断模型回复是否包含有害内容
- 区分"有害回复"与"合规但提及有害话题的回复"

**3. 过度拒绝检测（Over-refusal Detection）：**
- 判断模型是否对安全的提问进行了不必要的拒绝
- 平衡安全性与有用性的核心指标

**数据构成：**
- 约 13,000 条标注样本，覆盖有害/无害、拒绝/回复等多种场景
- 数据来源包括真实用户-AI 对话日志和针对性合成数据
- 覆盖 13 个有害类别（对应 AI 安全研究的主流分类体系）

## 评分机制

WildGuard 工具输出三元分类（有害/良性/不确定），并计算：
- 各类别的 F1 Score
- 整体准确率
- 与人工标注的 Cohen's Kappa 一致性系数

对比评测中还与 GPT-4、Llama Guard、OpenAI Moderation API 进行性能对比。

## 数据特点

- 提供完整训练集、验证集和测试集划分
- 标注来自多位安全专家，保证标注质量
- 包含"灰色地带"（边界案例）的细粒度标注
- 基于 Apache 2.0 开源，支持商业和研究用途
- WildGuard 分类器在大多数安全分类任务上优于同规模开源工具

## 主要发现与局限

WildGuard 揭示了安全分类中的关键问题：
- 现有开源安全工具（如 Llama Guard 1）对过度拒绝问题缺乏关注
- 真实用户交互中约 15–20% 的拒绝案例是不必要的过度拒绝
- 7B 级别的微调模型可接近 GPT-4 在安全分类上的表现

主要局限在于标注数据主要为英文；某些模糊边界案例（涉及文化差异的话题）标注一致性较低；分类器本身可能存在对某些风格越狱的盲区。

## 参考文献

Han, S., Rao, K., Ettinger, A., et al. (2024). WildGuard: Open One-Stop Moderation Tools for Safety Risks, Jailbreaks, and Refusals of LLMs. *arXiv:2406.18495*.
