---
title: "Stanford CRFM"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Stanford CRFM

> 斯坦福大学基础模型研究中心，HELM 评测框架的开发者。

## 基本信息

- **全称**：Center for Research on Foundation Models
- **所属机构**：Stanford University（斯坦福大学）
- **性质**：学术研究中心
- **成立背景**：随"基础模型"（Foundation Models）概念的提出而成立，专注于研究大规模预训练模型的能力、局限和社会影响

## 主要贡献

### HELM（Holistic Evaluation of Language Models）
Stanford CRFM 最具影响力的评测工作，提出多维度整体评测方法论，覆盖准确性、校准性、效率、公平性、鲁棒性、毒性等维度。HELM 强调评测结果的可复现性，要求详细记录评测配置。详见 [[helm]]。

### HELM Lite
HELM 的精简版本，筛选最具代表性的核心 benchmark 子集，在保持综合性的同时大幅降低评测成本，适合资源受限的研究团队使用。

### 基础模型概念推广
Stanford CRFM 发布的报告系统性地定义和推广了"基础模型"概念，奠定了该领域的术语体系，对整个 LLM 研究生态的概念框架有深远影响。

## 对评测生态的影响

HELM 提出的"整体评测"理念挑战了单一 benchmark 驱动的评测文化，强调没有任何单一指标能完整衡量模型能力。这一理念已被评测社区广泛接受，影响了后续多维度评测框架的设计思路。

HELM 对公平性和社会影响的关注，也推动了 LLM 评测从纯能力评测向负责任 AI 评测的拓展。

## 局限

- HELM 框架的完整运行成本较高，限制了其在快速迭代场景中的实际使用频率。
- 相比 EleutherAI Harness 的社区驱动模式，CRFM 的更新节奏较慢，部分 benchmark 覆盖滞后。

## 相关页面

- [[helm]] — 核心技术贡献
- [[calibration]] — HELM 将校准纳入核心评测维度
- [[goodharts-law]] — HELM 的多维度理念正是对单一指标 Goodhart 问题的回应
