---
title: "Qwen 3.5 (397B-A17B)"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://qwenlm.github.io/blog/"
  - "https://huggingface.co/Qwen"
  - "https://venturebeat.com/technology/alibabas-qwen-3-5-397b-a17-beats-its-larger-trillion-parameter-model-at-a"
developer: "Alibaba (Qwen Team)"
release_date: "2026-02-16"
family: "Qwen 3.5"
context_length: "256K"
modality: "text + image"
license: "Apache 2.0 (open weights)"
model_id: "qwen3.5-397b-a17b"
domain:
  - model-spec
aliases:
  - qwen3.5
  - Qwen-3.5
  - qwen3-5
---

# Qwen 3.5 (397B-A17B)

> 阿里通义千问 2026-02 旗舰开源模型，397B 总参 / 17B 激活，多项推理与编码 benchmark 超越前代 Qwen3-Max（1T+）的同时，256K context 解码速度快 19 倍。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Alibaba-Tongyi]] |
| 发布时间 | 2026-02-16 |
| 模型家族 | Qwen 3.5 |
| 总参数 | 397B |
| 激活参数 | 17B（MoE） |
| 上下文长度 | 256K |
| 注意力 | Gated Delta Networks + Sparse MoE |
| 模态 | text + image |
| 许可 | Apache 2.0（开源权重） |
| 官方 model_id | `qwen3.5-397b-a17b` |

## 评测表现（公开数据）

| Benchmark | 分数 | 备注 |
|-----------|-----|------|
| MathVision | 88.6 | 超越 GPT-5.2 (83.0) 与 Gemini 3 Pro (86.6) |
| MMMU | 85.0 | |
| IFBench | 76.5 | |
| MultiChallenge | 67.6 | |
| BFCL-V4 | 72.2 | function calling |

> 数据来源：官方博客 + VentureBeat 报道。在多项推理/编码 benchmark 上击败前代 1T+ 参数的 Qwen3-Max。256K context 解码速度比 Qwen3-Max 快 19 倍，比 Qwen3-235B-A22B 快 7.2 倍。

## 前代/相关模型

- [[Qwen3]] 系列（235B-A22B / 32B / Thinking）
- [[Qwen2.5-72B]]
- 后续版本：[[Qwen3.6]]（Max-Preview，2026 Q2）

## 备注

本页基于阿里官方公告整理；详尽测试结果请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] 等独立榜单。
