---
title: "Artificial Analysis Leaderboard"
type: leaderboard
publish: true
confidence: draft
as_of_date: "2026-05-15"
last_verified: "2026-05-15"
aliases:
  - artificial-analysis
  - Artificial Analysis
domain:
  - leaderboard
  - benchmark-design
official_url: "https://artificialanalysis.ai/leaderboards/models"
update_frequency: continuous
---

# Artificial Analysis Leaderboard

> 由独立 AI 分析机构 Artificial Analysis 维护的多维 LLM 综合评测排行榜，同时评测智能能力（Intelligence）、推理速度（Speed）和使用成本（Cost），是工业界选型 LLM API 的重要参考。

## 概述

Artificial Analysis（artificialanalysis.ai）是由 Micah Hill-Smith 和 George Cameron 联合创立的独立 AI 评测机构，持续追踪 **100+ 个大语言模型**和 **500+ 个 API 提供商**的综合表现。

与其他排行榜（如 [[LMSYS-Chatbot-Arena]] 专注对话偏好、[[HuggingFace-Open-LLM-Leaderboard]] 专注开源模型学术基准）不同，Artificial Analysis 的核心定位是**企业/开发者选型工具**，将智能、速度、成本三个维度同时量化，帮助用户在"最强"和"最划算"之间权衡。

排行榜采用 **Intelligence Index** 作为智能能力的综合指标，融合了 10 项以上主流基准测试分数（包括 [[GPQA-Diamond]]、[[HLE]]、[[MMLU]]、[[MATH]]、[[HumanEval]] 等），加权计算后形成单一可比分数。同时追踪每个模型在不同 API 提供商下的真实速度（tokens/sec）和每百万 token 成本，支持横向比较同一模型在不同云服务商上的性价比差异。

## 评测维度

### 智能能力（Intelligence Index）
- **Intelligence Index v4.0**：融合 10+ 基准测试的加权综合分，包括：
  - [[GPQA-Diamond]]（研究生级科学推理）
  - [[HLE]]（人类最难考试）
  - [[MMLU-Pro]]（专业知识）
  - [[MATH]]、[[AIME]]（数学竞赛）
  - [[LiveCodeBench]]（代码生成）
  - [[IFEval]]（指令跟随）
- 覆盖旗舰模型和各类开源模型，持续更新新发布模型的分数

### 推理速度（Speed）
- **吞吐量（Throughput）**：tokens/second（输出速度）
- **首字节延迟（TTFT）**：从发送请求到收到第一个 token 的时间
- 按 API 提供商细分（同一模型在 OpenAI、Together AI、Fireworks、AWS 等不同平台上的速度差异）

### 使用成本（Cost）
- **输入成本**：$/百万 token（input）
- **输出成本**：$/百万 token（output）
- **性价比指数**：在相同 Intelligence Index 下的成本效益比

## 数据特点

- **持续实时更新**：每周或每月追踪最新模型发布，数据新鲜度高
- **多提供商对比**：同一底层模型（如 Llama 3.1 70B）在不同云服务商上的速度/成本差异被单独追踪
- **历史趋势图**：提供 Intelligence vs Cost 散点图和历史时序图，可视化"前沿曲线"演进
- **独立中立**：不依附任何 AI 公司，采购或 API 提供商无法直接干预排名

## 局限性

- Intelligence Index 的权重分配未完全公开，加权方式影响最终排名
- 速度测试受网络、服务商负载、测试时间段影响，存在波动
- 主要覆盖商业 API 模型，自托管开源模型的速度/成本数据需自行评估
- 与 [[Chatbot-Arena]] 等人类偏好评测无直接可比性，智能指标不等于用户满意度

## 相关页面

- [[LMSYS-Chatbot-Arena]] — 人类偏好排行榜
- [[HuggingFace-Open-LLM-Leaderboard]] — 开源模型学术基准排行
- [[Scale-SEAL-Leaderboard]] — Scale AI 的综合评测排行
- [[HELM-Leaderboard]] — Stanford HELM 多维评测
- [[OpenCompass-Sinian]] — 国内开源评测平台
