---
title: "开源 vs 闭源模型评测"
type: concept
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
aliases:
  - open-vs-closed-model-eval
domain:
  - benchmark-design
---

# 开源 vs 闭源模型评测

> 开源模型与闭源 API 模型在评测方式、透明度、可重现性上存在根本差异，直接影响评测结论的可信度。

## 核心差异

| 维度 | 开源模型 | 闭源 API 模型 |
|------|---------|--------------|
| 权重可访问性 | 公开 | 不可见 |
| 可重现性 | 高（固定权重） | 低（API 版本随时变化） |
| 污染可审计 | 可检查训练数据 | 无法验证 |
| 推理控制 | 完全控制 | 受 API 约束 |
| 排行榜透明度 | 高 | 低（无法独立复现） |

## 评测挑战

**闭源模型：**
- API 版本静默更新（版本标注如 `gpt-4-0613`）可能导致前后评测不可比
- 无法控制系统提示、采样参数，影响基准一致性
- 训练数据污染无法独立审计

**开源模型：**
- 不同部署框架（vLLM、HuggingFace Transformers）可能产生不同输出
- 量化版本（GPTQ、AWQ）分数可能低于官方发布结果

## 对榜单的影响

[[Chatbot-Arena]] 等人类偏好榜单不区分开源/闭源，但开源模型在无监督部署条件下的对齐程度通常低于闭源对应体。

## 相关页面

- [[benchmark-contamination]] — 污染审计
- [[leaderboard-contamination]] — 榜单污染
- [[benchmark-design]] — 基准设计
