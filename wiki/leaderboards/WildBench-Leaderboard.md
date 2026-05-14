---
title: "WildBench Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# WildBench Leaderboard

## 概述

WildBench Leaderboard 由艾伦人工智能研究所（Allen Institute for AI）维护，基于 WildBench v2 评测框架。其核心理念是使用**真实用户查询**来评测模型能力，而非人工设计的标准化问题，从而更接近模型在实际部署场景中的表现。

## 数据来源

WildBench 的评测集来自 WildChat 数据集——该数据集收集了真实用户与 ChatGPT 的对话记录（用户同意匿名共享）。评测团队从中筛选出具有代表性、难度适中且适合自动评测的查询，构建了一个更贴近真实使用场景的基准测试集。

与 AlpacaEval 的人工构造指令不同，WildBench 的任务分布直接反映了用户实际需求，包括复杂的多步推理、创意写作、代码调试、信息检索等多种真实场景。

## 评分方式

WildBench v2 使用两种核心评分机制：

- **WB-Score**：模型回答的绝对质量评分，由 GPT-4-Turbo 对回答进行 1-10 分打分
- **WB-Reward**：相对于参考模型的胜率，类似于 AlpacaEval 的成对比较方式

最终排名综合考虑两种指标，以减少单一评分方式的偏差。

## 排行榜特点

**优势**：
- 真实用户查询提高了生态效度（ecological validity）
- 任务分布多样，覆盖真实使用场景中的长尾需求
- 提供任务类别细分，可查看各类型任务上的表现

**局限性**：
- WildChat 数据集主要为英文内容，多语言代表性不足
- 依赖 GPT-4 评判，存在与 AlpacaEval 类似的评判偏差问题
- 真实用户查询的质量参差不齐，部分查询可能缺乏清晰的评测标准

## 与生态中其他排行榜的关系

WildBench 填补了学术基准（如 MMLU、HellaSwag）与真实使用场景之间的空白。它与 Chatbot Arena 的区别在于：WildBench 采用固定评测集，可快速复现；Chatbot Arena 是实时人类投票，无法快速测试新模型。

## 访问方式

- 官方排行榜：[allenai.org/blog/wildbench](https://allenai.org/blog/wildbench)
- GitHub：[github.com/allenai/WildBench](https://github.com/allenai/WildBench)
- HuggingFace Space：allenai/WildBench
