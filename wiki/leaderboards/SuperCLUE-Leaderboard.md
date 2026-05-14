---
title: "SuperCLUE Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# SuperCLUE Leaderboard

## 概述

SuperCLUE Leaderboard 由 SuperCLUE 团队维护，是中文大语言模型综合能力评测的主要参考排行榜之一。SuperCLUE 以中文 NLP 基准 CLUE 为基础演进而来，专注于评测大语言模型在中文任务上的综合能力，填补了国际主流排行榜对中文能力覆盖不足的空白。

## 评测体系

SuperCLUE 构建了多个评测维度：

**SuperCLUE-Open（主观评测）**：
- 通过中文用户真实查询评测模型的开放式对话能力
- 使用 GPT-4 或人工评判回答质量
- 覆盖知识问答、写作、推理、指令跟随等类别

**SuperCLUE-Opt（客观评测）**：
- 标准化选择题形式的客观评测
- 涵盖中文阅读理解、常识推理、中国文化知识等

**SuperCLUE-Safety（安全评测）**：
- 专项评测模型对中文语境下有害内容的拒绝能力
- 考虑中国特定的内容安全要求

## 中文评测的独特价值

与英文评测不同，SuperCLUE 评测涉及中文特有的挑战：
- 成语、诗词、文言文等传统文化内容理解
- 中文语法的歧义和多义现象
- 中国特定的社会文化常识
- 繁简体转换及方言相关内容

## 排行榜特点

**优势**：
- 目前最系统性的中文 LLM 评测平台之一
- 同时收录国内外主流模型，便于横向比较
- 定期更新，跟踪中文 AI 模型的快速发展
- 提供细分能力维度，不仅限于总分排名

**局限性**：
- 部分评测细节未完全公开，可复现性有限
- 评测任务设计可能存在对某些模型的不均衡影响
- 商业模式下评测资源获取有一定限制

## 在中文评测生态中的地位

SuperCLUE 与 CMMLU、C-Eval 等纯学术评测基准互补。C-Eval 和 CMMLU 侧重标准化客观题，SuperCLUE 更全面地覆盖对话、开放式生成和安全等维度，是国内 LLM 能力评估的重要参考。

## 访问方式

- 官方网站：[superclue.ai](https://superclue.ai/)
- GitHub：SuperCLUE 相关开源评测工具
