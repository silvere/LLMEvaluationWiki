---
title: "Meta Llama 3"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: report
url: "https://ai.meta.com/blog/meta-llama-3/"
arxiv_id: ""
authors: ["Meta AI"]
published: "2024-04-18"
ingested: "2026-05-14"
license: "Meta Llama 3 Community License"
discusses: ["[[LLaMA|Llama 3]]", "[[open-vs-closed-model-eval|开源模型]]", "[[instruction-following-eval|指令微调]]", "[[safety-eval-landscape|安全评测]]"]
sources:
  - "https://ai.meta.com/blog/meta-llama-3/"
---

# Meta Llama 3

> Meta 发布 Llama 3 系列（8B 和 70B），在同等规模开源模型中达到最强性能，并宣布将发布 400B+ 参数更大版本。

## 核心主张
- [CLAIM]: Llama 3 在 15 万亿 tokens 上预训练，是 Llama 2 训练数据量的约 7 倍，代码数据比例提升约 4 倍，数据质量筛选更为严格。
- [CLAIM]: Llama 3 8B 在多个标准基准上超越 Mistral 7B 和 Gemma 7B，70B 版本接近或超越 Gemini Pro 1.5（部分任务）。
- [CLAIM]: Llama 3-Instruct 通过监督微调、拒绝采样（Rejection Sampling）、PPO 和 DPO 组合对齐，在 MT-Bench 等对话评测上表现优于前代。
- [CLAIM]: Meta 采用更精细的安全过滤体系，包括 Llama Guard 和 Code Shield 等安全工具链，并在报告中提供了安全评测数据。

## 方法论摘要

预训练使用 15T tokens 的公开网络数据（经过质量过滤和去重），上下文窗口为 8K tokens（相对 Llama 2 的 4K 加倍）。对话版通过多阶段对齐：SFT → 拒绝采样 → PPO → DPO。安全评测使用 Meta 内部评测集和标准安全基准。

## 数据与结果

- 预训练数据：15 万亿 tokens
- 上下文窗口：8,192 tokens
- Llama 3 8B MMLU（5-shot）：约 66.6%（Mistral 7B：63.5%）
- Llama 3 70B MMLU（5-shot）：约 82.0%（Llama 2 70B：68.9%）
- HumanEval：70B 约 81.7%
- 400B+ 版本（训练中）：部分基准超过 GPT-4

## 局限与争议

- 15T token 预训练数据的具体来源和版权状态未完整披露。
- 8K 上下文窗口相对同期竞争模型（支持 100K+ 的 Claude、Gemini）较短。
- 对话版对齐数据的标注质量和规模未详细说明。
- "接近 GPT-4"的评测结论依赖具体基准选择，综合能力差距仍存在。

## 相关 wiki 页

- [[LLaMA|Llama 3]]
- [[LLaMA|Llama 2]]
- [[open-vs-closed-model-eval|开源模型]]
- [[instruction-following-eval|指令微调]]
- [[rlhf|RLHF]]
