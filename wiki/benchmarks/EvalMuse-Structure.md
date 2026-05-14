---
title: "EvalMuse-Structure"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2024
arxiv_id: "2412.18150"
status: active
---

# EvalMuse-Structure

> EvalMuse-40K 框架中的结构化评测子集，包含 12,000 张 AI 生成图像及对应的结构失真标注（边界框 + 结构评分），专门评估文生图模型输出的形态完整性与结构真实性（arXiv:2412.18150，AAAI 2025）。

## 概述

EvalMuse-Structure 是 EvalMuse-40K 综合评测框架的结构维度子集，整体框架于 2024 年 12 月发布于 arXiv（arXiv:2412.18150），并被 AAAI 2025 收录，同时入选 CVPR 2025 NTIRE 挑战赛的评测赛道之一。

EvalMuse-40K 是一个专为文生图（Text-to-Image，T2I）模型质量评测而设计的大规模细粒度基准，共收录 40,000 对图文数据，涵盖两大核心评测维度：
1. **文本对齐（Alignment）**：生成图像与文本提示的语义一致性
2. **结构完整性（Structure）**：生成图像中主体的形态合理性，关注是否存在结构失真

EvalMuse-Structure 专注于第二个维度——结构质量评测。研究团队观察到，当前文生图模型普遍存在结构失真问题，如手指数量异常、四肢扭曲、面部畸形等，而此前的文生图评测基准大多仅关注文本对齐，对结构质量缺乏系统评估。EvalMuse-Structure 通过人工标注的方式，对每张生成图像的结构失真位置（边界框）和整体结构评分进行精细标注，为训练和评估专门的结构质量评估模型提供了高质量数据基础。

## 任务格式

- **数据集规模**：12,000 张 AI 生成图像（10,000 训练 / 1,000 验证 / 1,000 测试）
- **标注内容**：
  - 结构评分（Structure Score）：每张图像的整体结构完整性评分（0–1 连续值）
  - 结构失真区域标注（Bounding Box）：使用边界框标出存在结构异常的区域
  - 每张图像由三名标注员独立标注，取平均以降低主观误差
- **生成来源**：使用多个主流 T2I 模型（SDXL、DALLE-3、Midjourney 等）在不同类型提示词下生成的图像
- **提示词类型**：写实风格（Photorealistic）和非写实风格（Non-photorealistic）两类
- **评估方式**：训练结构质量评估模型，在测试集上计算预测评分与人工评分的相关系数（SRCC/PLCC）

## 主要指标

- **SRCC（Spearman Rank Correlation Coefficient）**：模型预测结构评分与人工评分的排名相关系数
- **PLCC（Pearson Linear Correlation Coefficient）**：模型预测分数与人工评分的线性相关系数
- **NTIRE 2025 赛道排名**：EvalMuse-Structure 作为 CVPR 2025 NTIRE 挑战赛的结构评测赛道，以最终测试集上的 SRCC 作为排名依据

**与 EvalMuse-Alignment 的对比**：结构评测关注"生成图像自身是否合理"，对齐评测关注"生成图像是否符合文本描述"，二者形成互补的评测体系。

## 局限性

- **标注主观性**：结构"完整性"的判断标准存在一定主观性，不同文化背景或风格倾向的标注员可能产生分歧
- **生成模型覆盖偏向**：数据主要来自 2024 年前后的主流模型，随新一代 T2I 模型发布，训练数据的代表性可能下降
- **非写实内容评测困难**：卡通、插画等非写实风格图像的结构失真标准难以统一
- **未涵盖视频**：仅针对静态图像，不涉及视频生成的帧间结构一致性问题
- **细粒度语义覆盖不足**：结构评测粒度集中在人体和常见物体，对复杂场景（如多人交互、密集场景）的标注覆盖有限

## 相关页面

- [[multimodal-eval]]
- [[llm-as-judge]]
- [[MMMU]]
- [[Movie-Gen-Video-Bench]]
