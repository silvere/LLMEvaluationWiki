---
title: "DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: report
url: "https://arxiv.org/abs/2405.04434"
arxiv_id: "2405.04434"
authors: ["DeepSeek-AI"]
published: "2024-05-07"
ingested: "2026-05-14"
license: "DeepSeek Model License"
discusses: ["[[deepseek|DeepSeek]]", "[[scaling-laws|混合专家架构]]", "[[deepseek-v2-2024|MoE]]", "[[inference-time-scaling|推理效率]]", ""]
sources:
  - "https://arxiv.org/abs/2405.04434"
---

# DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model

> DeepSeek 发布 DeepSeek-V2，一个 236B 参数的混合专家（MoE）模型，通过 Multi-head Latent Attention（MLA）和 DeepSeekMoE 架构实现高性能与低推理成本的平衡。

## 核心主张
- [CLAIM]: DeepSeek-V2 总参数量 236B，每次前向传播激活约 21B 参数（稀疏激活），在 MMLU 等基准上达到与 Llama 3 70B 相当的水平，但推理成本约为其 1/5。
- [CLAIM]: 提出 Multi-head Latent Attention（MLA）技术，通过低秩压缩 KV cache，在不损失注意力表达能力的前提下将 KV cache 内存减少约 93.3%。
- [CLAIM]: DeepSeekMoE 架构将专家细粒度化（更多更小的专家）并使用共享专家（shared expert），在相同激活参数量下比标准 MoE 性能更强。
- [CLAIM]: 在中文理解和生成任务上，DeepSeek-V2 超越同等规模的英文主导模型，反映了中文预训练数据的充分投入。

## 方法论摘要

在 8.1 万亿 tokens（含中英文）上预训练，随后进行监督微调和 RLHF 对齐（DeepSeek-V2-Chat）。评测在 MMLU、GSM8K、HumanEval、Chinese SimpleQA 等标准基准上进行。推理效率通过实际部署吞吐量测试衡量。

## 数据与结果

- 总参数：236B，激活参数：21B
- 预训练数据：8.1 万亿 tokens
- MMLU（5-shot）：约 78.5%（Llama 3 70B：82.0%）
- HumanEval：约 81.1%
- GSM8K：约 92.2%
- 推理吞吐量：约为 DeepSeek 67B 的 5.76 倍，成本约为 Llama 3 70B 的 1/5

## 局限与争议

- 训练数据的中英文比例和数据来源未完整披露。
- MLA 的实现细节复杂，硬件适配（非标准 CUDA kernel）影响部署便捷性。
- 实际推理效率数字依赖特定硬件配置，可比性受限。
- 与最大规模闭源模型（GPT-4、Claude 3 Opus）相比仍有差距。

## 相关 wiki 页

- [[deepseek|DeepSeek]]
- [[scaling-laws|混合专家架构]]
- [[deepseek-v2-2024|MoE]]
- [[inference-time-scaling|推理效率]]
- [[open-vs-closed-model-eval|开源模型]]
