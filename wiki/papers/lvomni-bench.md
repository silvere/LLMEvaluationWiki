---
title: "LVOmniBench: Pioneering Long Audio-Video Understanding Evaluation for Omnimodal LLMs"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2603.19217"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2603.19217"
year: 2026
authors:
  - "Keda Tao"
  - "Yuhua Zheng"
  - "Jia Xu"
  - "Wenjie Du"
discusses:
  - "[[lvomnibench|LVOmniBench]]"
  - "[[multimodal-eval|omnimodal-llm]]"
  - "[[multimodal-eval|audio-video-understanding]]"
  - "[[CLongEval|long-video-eval]]"
---

# LVOmniBench: Pioneering Long Audio-Video Understanding Evaluation for Omnimodal LLMs

> 首个专为长时音视频联合理解而设计的综合基准，平均视频时长超 34 分钟

## 核心贡献

- 提出 LVOmniBench，首个专为长视频跨模态音视频理解而设计的综合基准；275 个视频与 1,014 个 QA 对均经严格全人工筛选与标注 [REF: §3]
- 平均视频时长 2,069 秒（约 34 分 29 秒），是现有音视频理解基准平均时长的 6 倍以上（次长基准 AVUT 平均 384 秒）[REF: Table 1]
- 引入三级难度标注（低/中/高）和 9 类问题子类型（感知、理解、推理、逻辑），支持对 OmniLLM 能力的分层细粒度评估 [REF: §3.2, §3.3]
- 实验揭示当前 OmniLLM 的显著局限：开源模型准确率普遍低于 35%，最优闭源模型 Gemini-3.0-Pro 峰值准确率仅约 65% [REF: §4, Table 3]

## 主要 Claim

- Gemini-3.0-Pro（A+V）低难度 79.3%、中难度 68.1%、高难度 45.0%，为所有评测模型最高；开源最优 MiniCPM-o 4.5 平均仅 34.8% [REF: Table 3]
- 仅使用视频模态的 Gemini-3.0-Flash（V only）平均 49.3%，低于音视频联合的 Gemini-3.0-Flash（A+V）63.0%，证明音频模态对长视频理解至关重要 [REF: Table 3]
- 现有基准平均时长为 10–384 秒，LVOmniBench 为 2,069 秒，时间尺度大 6 倍以上 [REF: Table 1]
- 纯音频模型 Qwen2-Audio 平均 24.7%，接近四选一随机水平（25%），证明仅凭音频无法完成跨模态长视频理解 [REF: Table 3]
- 全部视频遵循 Creative Commons 协议，可供研究社区开放使用 [REF: §3.1]
- 从 1,500+ 候选 QA 对经三轮筛选（MLLM 单模态测试、LLM 检查、人工复核）保留 1,014 个高质量题目 [REF: §3.3]

## 方法 / 数据集规模

- 视频总数：275 个；来源：YouTube（Creative Commons 协议）[REF: §3.1]
- 视频时长范围：613–5,482 秒（约 10–90 分钟）；平均时长 34 分 29 秒（2,069 秒）[REF: Table 2]
- 覆盖 5 大类别、21 个细粒度子类（娱乐、生活方式、DIY 与烹饪、记录、影视）[REF: §3.1, Figure 3]
- QA 对总数：1,014 个，全选择题格式（A/B/C/D 四选一）；平均题目长度 16.4 词 [REF: Table 2]
- 难度分布 低:中:高 = 314:441:259 [REF: Table 2]
- 所需音频类型分布：语音:音乐:音效 = 763:137:114 [REF: §3.4]
- 评测模型（闭源）：Gemini-3.0-Pro/Flash、Gemini-2.0-Flash [REF: §4.1]
- 评测模型（开源音视频）：Ming-Flash-Omni-2.0-100B、MiniCPM-o 4.5、Qwen3-Omni-30B、video-SALMONN 2+ 7B、Qwen2.5-Omni-7B、VideoLLaMA2-7B [REF: §4.1]
- 视觉专项 baseline：Qwen3-VL-30B、Qwen3-VL-8B；音频专项 baseline：Qwen2-Audio [REF: Table 3]

## 主要实验结果

- Gemini-3.0-Pro（A+V）：低 79.3%，中 68.1%，高 45.0%，感知 65.4%，理解 67.5%，推理 65.8% [REF: Table 3]
- Gemini-3.0-Flash（A+V）：低 76.6%，中 63.0%，高 31.0% [REF: Table 3]
- 开源最优 MiniCPM-o 4.5：低 43.4%，中 34.1%，高 25.1%，平均 34.8% [REF: Table 3]
- Qwen3-Omni-30B 平均 35.8%；VideoLLaMA2-7B 最低 27.2% [REF: Table 3]
- Qwen3-VL-30B（纯视觉）平均 36.3%；Qwen2-Audio（纯音频）平均 24.7% [REF: Table 3]

## 局限性

- 当前仅支持多项选择题格式，开放式生成评估尚未覆盖
- 人工标注成本高，当前规模仅 275 个视频，扩展受限
- 各模型受限于最大上下文长度，评估时采用固定最大帧数，无法完整处理所有超长视频
- 视频来源为 YouTube 公开视频，可能存在领域分布偏差

## 相关页面

- [[lvomnibench|LVOmniBench]]
- [[multimodal-eval|omnimodal-llm]]
- [[multimodal-eval|audio-video-understanding]]
- [[CLongEval|long-video-eval]]
- [[multimodal-eval]]
