---
title: "Online-Mind2Web"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - reasoning
year: 2025
arxiv_id: "2504.01382"
status: active
---

# Online-Mind2Web

> 俄亥俄州立大学 NLP 团队发布的在线网页 Agent 评测基准，包含 300 个真实多样任务、覆盖 136 个网站，论文揭示当前主流 Web Agent 在真实环境中的能力被严重高估（arXiv:2504.01382，COLM 2025）。

## 概述

Online-Mind2Web 是俄亥俄州立大学 NLP Group（OSU-NLP-Group）发布的在线网页 Agent 评测基准，作为论文"An Illusion of Progress? Assessing the Current State of Web Agents"（arXiv:2504.01382）的核心贡献，于 2025 年发布，被 COLM（Conference on Language Modeling）2025 收录。数据集已在 [[Hugging-Face|Hugging Face]]（osunlp/Online-Mind2Web）和 GitHub（OSU-NLP-Group/Online-Mind2Web）开源。

该工作是对现有 Web Agent 基准的系统性批判与改进。研究团队发现，当前最广泛使用的在线 Web Agent 基准（如 WebVoyager）存在严重缺陷：任务覆盖面窄、网站多样性不足、许多任务存在"捷径"（仅靠 Google 搜索可解决 51% 的任务）、且自动评估与人工评估的一致性很低。基于此，团队构建了 Online-Mind2Web，覆盖 136 个真实网站的 300 个多样化任务，并设计了新的 LLM-as-Judge 评估方法（与人工判断一致性约 85%）。

评测结果令人警醒：除 Claude Computer Use 3.7（Anthropic）和 Operator（OpenAI）外，大多数新发布的 Web Agent 甚至不如 2024 年初发布的简单基线 SeeAct。Operator 的任务成功率也仅为 61%，揭示了 Web Agent 研究领域的"进步幻觉"。

## 任务格式

- **任务数量**：300 个
- **网站覆盖**：136 个真实网站
- **任务领域**：购物、金融、旅行、政务、餐饮、住房、交通等多个日常生活领域
- **任务形式**：开放性自然语言指令，Agent 需在真实浏览器环境中完成实际操作（点击、填表、搜索等）
- **执行环境**：真实浏览器（非离线静态 HTML），需处理动态页面、登录状态、CAPTCHA 等真实网页挑战
- **评估方式**：
  - 人工评估：人工判断任务是否成功完成
  - 自动评估：基于 LLM-as-Judge 方法，与人工判断一致性约 85%
- **评测频率**：在线评测（任务在真实网页上执行，结果实时变化）

## 主要指标

- **任务成功率（Task Success Rate）**：Agent 成功完成任务的比例，主要指标
- **分领域成功率**：按任务类型（购物/金融/旅行等）分别统计
- **与人工基线对比**：提供人类完成相同任务的参考成功率

**关键结果**（截至 2025 年初）：
- Claude Computer Use 3.7（Anthropic）：最强表现
- Operator（OpenAI）：成功率 61%
- 多数其他商业/开源 Web Agent：成功率低于 SeeAct（2024 年初简单基线）
- 人类成功率：接近 100%（作为上界参考）

## 局限性

- **任务范围为英文网站**：主要覆盖英文网站，对中文、多语言网站的评测不足
- **任务成功定义难以标准化**：部分任务的"成功"具有主观性（如"找到价格最合适的商品"），即便 85% 的人机一致性也存在误判
- **网站动态性导致可重复性差**：真实网站内容随时间变化，同一 Agent 在不同时间评测可能得到不同结果
- **高执行成本**：每次评测需在真实浏览器中运行，时间和 API 成本较高，难以大规模评测
- **300 任务统计功效有限**：相对于真实 Web 任务的长尾分布，300 个任务仍可能遗漏重要场景

## 相关页面

- [[agent-eval]]
- [[MINT]]
- [[WebArena]]
- [[SWE-bench-Verified]]
