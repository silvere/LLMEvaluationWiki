---
title: "Hugging Face Open LLM Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
aliases:
  - Open-LLM-Leaderboard
---

# Hugging Face Open LLM Leaderboard

> Hugging Face 运营的开源模型自动评测排行榜，覆盖最广泛的开源模型数量。

## 基本信息

- **运营者**：Hugging Face
- **当前版本**：v2（2024 年更新，替换了原始 v1 版本）
- **评测规模**：截至 2024 年已评测 3,000+ 模型
- **技术后端**：EleutherAI lm-evaluation-harness

## 评测机制

- **统一硬件**：所有模型在 Hugging Face 提供的统一 GPU 集群上运行，消除硬件差异导致的分数不可比。
- **YAML 标准化配置**：每个 benchmark 的评测参数（shot 数、prompt 格式、答案提取方式）通过 YAML 文件固定，保证可复现性。
- **分数归一化**：将各 benchmark 分数统一映射，随机表现 → 0，完美表现 → 100，便于跨任务聚合。

## 版本演进

**v1（原版）**  
覆盖 ARC、HellaSwag、MMLU、TruthfulQA 等早期经典 benchmark，因普及度过高而受到严重数据污染，顶部模型分数趋于饱和，区分度下降。

**v2（2024 年更新）**  
更换了全套 benchmark，引入 IFEval、BBH、MATH Lvl 5、GPQA、MUSR、MMLU-Pro 等更难、污染程度更低的任务，重新拉开顶部模型的区分度。

## 优势

- **规模最大**：3,000+ 已评测模型，覆盖绝大多数公开发布的开源模型。
- **自动化提交**：模型作者通过 Hugging Face Hub 提交，自动加入评测队列，流程标准化。
- **免费访问**：所有评测结果公开，降低了开源社区的研究成本。

## 局限与挑战

- **仅覆盖开源模型**：商业闭源模型（GPT-4、Claude 等）不在榜单范围内，无法与开源模型直接比较。
- **自动评测局限**：依赖选择题或有限格式答案，开放式生成能力无法评测。
- **污染问题**：v1 benchmark 被广泛用于针对性优化，v2 也面临同样的时间衰减问题。
- **刷榜风险**：部分模型通过针对特定 benchmark 的微调提升分数，而非真实能力提升。

## 相关页面

- [[lm-evaluation-harness]] — 技术后端
- [[EleutherAI]] — 后端框架开发者
- [[benchmark-contamination]] — v1 → v2 更换原因之一
- [[goodharts-law]] — 开源排行榜的通用困境
