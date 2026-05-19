---
title: "Qwen-VL"
type: entity
entity_type: model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2308.12966"
  - "https://github.com/QwenLM/Qwen-VL"
aliases:
  - Qwen-VL
  - Qwen2-VL
  - Qwen2.5-VL
  - Qwen3-VL
domain:
  - entity
---

# Qwen-VL（通义千问视觉语言模型）

> 阿里巴巴 [[Qwen]] 团队 2023-08 发布的多模态大模型分支：基于 Qwen-LM + 精心设计的 visual receptor + 3 阶段训练 pipeline + 多语言多模态语料。Qwen-VL 系列在 grounding / OCR / chart understanding / 多图理解等任务上长期领先开源模型，是中文多模态评测圈的事实标杆。

## 模型谱系

- **Qwen-VL（2023-08）**：首版，1.9B vision + 7B LM，引入 image-caption-box 三元对齐
- **Qwen-VL-Chat**：对齐后的对话版
- **Qwen2-VL（2024-09，2409.12191）**：Naive Dynamic Resolution，原生支持任意分辨率
- **Qwen2.5-VL（2025）**：进一步推升 video / document / GUI 理解
- **Qwen3-VL（2025）**：最新一代

## 评测表现

- **[[MMMU]] / [[CMMMU]]**：开源 LMM 第一梯队
- **[[MMVet]] / [[MMBench]]**：长期领先
- **OCR / chart / document**：Qwen-VL 早期主打的差异化能力
- **GUI agent**：Qwen2.5-VL 在 OSWorld / Mind2Web 等 GUI benchmark 上有专项优化

## 技术特色

- **Grounding 友好**：原生支持 bounding box 输出
- **多语言**：中英 + 多语种 OCR
- **Dynamic Resolution**：Qwen2-VL 起原生支持任意分辨率，不强制 resize

## 相关页面

- [[Qwen]]
- [[CMMMU]]
- [[MMMU]]
- [[MMVet]]
- [[multimodal-eval]]
- [[Junyang-Lin]]

<!-- AUTO-RELATED:START -->

## 自动关联

> 以下由 `scripts/inject-entity-related.ts` 自动维护——基于 `wiki/models/` 的 `developer` 字段与 `wiki/entities/` 的 `entity_type` 字段。手动编辑会被覆盖。

### 同类模型家族

- [[Stable-Diffusion-3|Stable Diffusion 3]]
- [[Qwen|Qwen (通义千问)]]
- [[Codex|Codex]]
- [[AlphaFold|AlphaFold]]

<!-- AUTO-RELATED:END -->
