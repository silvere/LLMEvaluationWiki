---
title: "HELM（Stanford CRFM）"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# HELM（Stanford CRFM）

> Stanford CRFM 开发的多维度 LLM 整体评测框架，强调评测的全面性和可复现性。

## 基本信息

- **全称**：Holistic Evaluation of Language Models
- **开发者**：Stanford Center for Research on Foundation Models（CRFM）
- **主要用途**：学术研究，多维度模型能力比较，可复现性评测

## 功能与特点

- **多维度评测**：不局限于准确率，同时评测准确性（Accuracy）、校准性（Calibration）、效率（Efficiency）、公平性（Fairness）、鲁棒性（Robustness）、毒性（Toxicity）等维度，提供模型的多侧面画像。
- **标准化分数**：将各任务分数归一化为统一量纲——随机表现映射到 0，完美表现映射到 100，便于跨任务和跨模型比较。
- **强调可复现性**：详细记录评测配置（模型版本、prompt 格式、随机种子等），支持第三方复现。
- **HELM Lite**：精简版评测套件，聚焦于最具代表性的核心 benchmark，降低评测成本，适合快速比较。

## 与其他框架的对比

HELM 与 lm-evaluation-harness 的主要区别在于评测哲学：Harness 以任务覆盖广度为优先，HELM 以多维度评测的系统性和可复现性为优先。HELM 更常见于学术发表，Harness 更常见于榜单运营。

## 局限与挑战

- **更新频率**：相比社区驱动的 Harness，HELM 的 benchmark 更新节奏较慢。
- **运行成本**：完整版 HELM 需要运行大量维度和任务，评测成本较高。
- **商业模型支持**：主要针对可访问权重的开源模型设计，商业 API 模型接入需额外配置。

## 相关页面

- [[Stanford-CRFM]] — 开发团队
- [[calibration]] — HELM 将校准作为核心评测维度之一
- [[lm-evaluation-harness]] — 评测框架横向对比
