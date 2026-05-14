---
title: "RefCOCOg"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2016
arxiv_id: "1608.00272"
status: active
---

# RefCOCOg

> RefCOCO 的 Google 版本，采用独立标注流程，生成更长、更自然的指代表达。

## 概述

RefCOCOg 是 RefCOCO 家族的第三个成员，由 Google 团队在与 RefCOCO/RefCOCO+ 相同时期独立标注。其核心区别在于**标注流程**：采用非游戏化的 Amazon Mechanical Turk 任务，标注者有更充裕的时间撰写描述，因此生成的指代表达**更长、更自然**，平均每条描述约 8.4 个单词（RefCOCO 约 3.6 个词，RefCOCO+ 约 3.5 个词）。

RefCOCOg 的描述通常融合了外观属性与位置关系，例如"坐在沙发左边、穿着红色毛衣的男孩"，更接近真实对话中的自然语言风格。这使其成为测试模型**长句理解与复合属性推理**的重要基准。

数据集包含约 **104,560 条指代表达**，覆盖 26,711 张图像。由于标注方式不同，其测试集划分也与 RefCOCO/RefCOCO+ 略有差异，分为 val 和 test 两个集合（无 testA/testB 区分）。

## 任务格式

- 输入：图像 + 自然流畅的长句指代表达
- 输出：目标物体的边界框（bounding box）
- 数据集划分：train / val / test（无 testA/testB）
- 总计约 104,560 条表达，26,711 张图像
- 平均表达长度约 8.4 个单词

## 主要指标

- **Acc@0.5**：预测框与 GT 框 IoU ≥ 0.5 的准确率（主要指标）
- **Acc@0.25** / **Acc@0.75**：不同 IoU 阈值下的准确率

## 局限性

- 更长的描述意味着更高的语言复杂度，对文本编码器要求更高，与简短指代场景的迁移性需单独验证。
- 所有图像同样来自 COCO，领域局限性与 RefCOCO 系列一致。
- 标注者背景以英语母语者为主，非英语指代场景未覆盖。

## 相关页面

- [[RefCOCO]]
- [[RefCOCO+]]
- [[ADE20K]]
