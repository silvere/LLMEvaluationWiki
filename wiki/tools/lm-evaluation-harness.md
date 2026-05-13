---
title: "Language Model Evaluation Harness（EleutherAI）"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Language Model Evaluation Harness（EleutherAI）

> EleutherAI 开发的开源 LLM 评测框架，学术界事实标准。

## 基本信息

- **全称**：Language Model Evaluation Harness
- **开发者**：EleutherAI
- **开源地址**：github.com/EleutherAI/lm-evaluation-harness
- **主要用途**：学术研究、Hugging Face Open LLM Leaderboard 的官方后端

## 功能与特点

- **覆盖范围广**：支持 100+ benchmark，涵盖推理、知识、代码、数学、安全等多类任务。
- **统一接口**：为不同 benchmark 提供一致的评测流程，包括 few-shot 设置、答案提取、指标计算，极大降低了跨 benchmark 比较的门槛。
- **模型接入灵活**：支持 Hugging Face Transformers 模型、OpenAI API、vLLM 推理后端等多种接入方式。
- **高可复现性**：标准化的配置文件使评测结果可被其他研究者精确复现。
- **与 Hugging Face 深度集成**：Open LLM Leaderboard 使用统一 GPU 集群运行 Harness，保证了 3,000+ 模型排名的可比性。

## 性能数据

根据 xFinder 框架的测评，Harness 的答案提取准确率为 67.80%，低于 OpenCompass 的 74.38%。这一差距主要来自对复杂格式或非标准输出的解析能力，但不影响其在标准化 benchmark 上的广泛适用性。

## 局限与挑战

- **答案提取准确率**：相比部分竞争框架，答案提取在某些开放式或复杂格式输出上存在偏差。
- **维护成本**：100+ benchmark 的持续维护工作量大，部分旧版 benchmark 实现可能滞后于官方更新。
- **评测速度**：全套 benchmark 运行耗时较长，适合批量离线评测而非快速迭代。

## 相关页面

- [[EleutherAI]] — 开发团队
- [[HuggingFace-Open-LLM-Leaderboard]] — 主要应用场景
- [[opencompass]] — 主要竞争框架，答案提取率更高
