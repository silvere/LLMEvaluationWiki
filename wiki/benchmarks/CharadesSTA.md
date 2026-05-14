---
title: "Charades-STA"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2017
arxiv_id: "1705.02101"
status: active
---

# Charades-STA

> 基于 Charades 数据集的时序动作定位基准，要求模型将自然语言描述与视频中的时间段对齐。

## 概述

Charades-STA 于 2017 年发布，是在 Charades 数据集基础上为**时序句子定位**（Temporal Sentence Grounding）任务构建的扩展基准。Charades 数据集包含约 9,848 个日常室内活动视频（平均时长约 30 秒），由众包标注者按脚本拍摄完成。Charades-STA 在此基础上为 16,128 段查询-时间段对提供了时序对齐标注。

与 TACoS（仅限烹饪）不同，Charades-STA 覆盖更广泛的日常室内活动场景（清洁、阅读、烹饪、锻炼等），且视频均由真人按照自然剧本拍摄，更接近真实家庭环境中的行为记录。

Charades-STA 是时序视频定位领域的核心基准之一，大量自然语言视频定位方法（如 CTRL、LGI、VSLNet 等）均在此基准上报告结果，是该领域进展的重要参照。

## 任务格式

- 来自 Charades 的 6,672 个视频（平均约 30 秒）
- 16,128 段查询-时间段对（训练/测试分别约 12,408 / 3,720 对）
- 任务：给定视频 + 自然语言查询，预测对应的起止时间
- 评分采用 tIoU 阈值下的召回率

## 主要指标

- **R@1, tIoU=0.5**：主要指标，在 IoU ≥ 0.5 时的 Recall@1
- **R@1, tIoU=0.7**：更严格阈值下的 Recall@1
- **mIoU**：平均时序交并比

## 局限性

- 视频场景限于室内日常活动，泛化至户外或专业场景的能力未经验证。
- 众包拍摄的视频在行为自然度上与真实记录视频（如 Ego4D）有一定差距，可能引入拍摄偏差。
- 部分语言查询与视频内容的对应关系较为宽泛，标注存在一定歧义。

## 相关页面

- [[TACoS]]
- [[TOMATO]]
- [[EgoSchema]]
