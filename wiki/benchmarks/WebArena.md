---
title: "WebArena"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2023
authors: ["Shuyan Zhou", "Frank F. Xu", "Hao Zhu", "Xuhui Zhou", "Robert Lo", "Abishek Sridhar", "Xianyi Cheng", "Yonatan Bisk", "Daniel Fried", "Uri Alon", "Graham Neubig"]
arxiv_id: "2307.13854"
official_url: "https://webarena.dev"
license: "Apache 2.0"
size: 812
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Zhou, S., et al. (2023). WebArena: A Realistic Web Environment for Building Autonomous Agents. ICLR 2024."
---

# WebArena

## 概述

WebArena 是由 CMU 等机构于 2023 年提出的 Web 浏览代理评测基准，提供了一个**可复现的真实 Web 环境**，用于评测 AI 代理在浏览网页、操作 Web 应用、完成实际网络任务方面的能力。与使用快照或模拟环境的早期工作不同，WebArena 搭建了完整的自托管 Web 生态系统。

## 环境设计

WebArena 包含 5 个自托管的功能完整的 Web 应用：

| 网站 | 类型 | 原型 |
|------|------|------|
| **OneStopShop** | 电子商务 | 仿 Amazon |
| **CMS** | 内容管理 | 仿 WordPress |
| **Reddit** | 社区论坛 | 仿 Reddit/Lemmy |
| **GitLab** | 代码托管 | 仿 GitLab |
| **Map** | 地图服务 | 仿 OpenStreetMap |

所有网站相互关联，支持跨站任务（如"在 Reddit 上发帖询问 OneStopShop 中某商品的价格"）。

## 任务构成

WebArena 包含 **812 道**涵盖 3 类任务的测试：

1. **信息检索**（Information Retrieval）：在 Web 应用中搜索和提取信息
2. **站点导航**（Site Navigation）：完成页面浏览、表单填写等操作
3. **内容创建**（Content Creation）：撰写帖子、提交评论、创建 issue 等

任务用自然语言描述，代理通过操控浏览器（点击、输入、滚动）来完成。

## 评测方法

WebArena 采用功能性评测（Functional Evaluation）：

- **基于结果**：检查任务完成后 Web 应用的状态是否符合预期（而非检查操作路径）
- **程序化验证**：通过 API 查询数据库状态、页面内容等，自动判断任务是否完成
- **细粒度评分**：部分任务支持部分完成得分

## 挑战性

WebArena 发布时，顶级模型（GPT-4）的整体任务完成率仅约 **14.4%**，远低于人类的 ~78%，展示了 Web 代理任务的高难度：

主要挑战包括：
- **长程规划**：完成复杂任务平均需要 10+ 步操作
- **HTML 理解**：需要解析复杂的 DOM 结构
- **错误恢复**：操作失误后需要识别并纠正路径
- **跨站协调**：需要在多个应用间传递信息

## 发展与扩展

- **VisualWebArena**（2024）：扩展为多模态版本，增加了视觉感知任务
- **WorkArena**（2024）：聚焦企业 SaaS 场景（ServiceNow）的代理任务
- **WebArena-Lite**：精简版，降低评测成本
- **Mind2Web**：更大规模的真实网站操作记录数据集

## 意义

WebArena 确立了 Web 代理评测的重要范式：使用可复现的自托管环境，以功能性结果为评测标准。其代码和环境镜像完全开源，推动了 Web Agent 研究的快速发展。

## 局限性

- 搭建和维护 WebArena 环境需要较高的工程投入
- 5 个网站覆盖的任务类型仍有局限
- 静态环境可能随时间失去与真实 Web 的对应性

## 相关基准

- **GAIA**：真实世界 AI 助手任务评测，包含 Web 搜索
- **AgentBench**：综合多任务智能体评测
- **Mind2Web**：真实网站操作轨迹数据集
