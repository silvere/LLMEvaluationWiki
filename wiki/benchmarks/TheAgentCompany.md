---
title: "TheAgentCompany"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - code
year: 2024
arxiv_id: "2412.14161"
status: active
---

# TheAgentCompany

> 企业真实工作流代理评测基准，模拟一家软件公司的日常任务环境，评测 AI 代理在代码开发、项目管理、文档协作等实际工作场景中的自主完成能力。

## 概述

TheAgentCompany 由 CMU、UIUC 等机构于 2024 年发布，是迄今为止最贴近真实软件企业工作环境的代理评测基准。该基准构建了一个完整的模拟软件公司环境，配备真实工具栈：GitLab（代码仓库）、Jira（项目管理）、Confluence（文档协作）、Slack（团队沟通）、以及标准开发环境（Shell、浏览器、IDE）。

与沙箱化的代码生成测试不同，TheAgentCompany 的任务要求代理在工具链之间协调操作，完成跨平台的复合工作流。例如：阅读 Jira 工单 → 理解需求 → 在 GitLab 检出代码 → 实现功能 → 提交 PR → 在 Confluence 更新文档 → 在 Slack 通知相关人员。

基准包含 175 个专业任务，覆盖 SWE（软件工程）、PM（项目管理）、DS（数据科学）、Admin（行政）、HR 等五类岗位职能。任务难度从简单（30 分钟内可完成）到复杂（需多小时多工具协作）梯度分布。评测结果揭示：最先进代理仅能完成约 24% 的任务，大量多步骤跨工具任务对当前代理仍是挑战。

## 任务格式

- **任务总数**：175 个
- **岗位类型**：SWE 开发、产品经理（PM）、数据科学（DS）、行政（Admin）、HR
- **工具环境**：GitLab、Jira、Confluence、Slack、Linux Shell、Web 浏览器
- **评估方式**：基于自动化测试脚本的完成度打分（0/0.5/1 三档或细粒度部分分）
- **任务来源**：参考真实软件公司内部工单和工作任务设计
- **时间限制**：每任务最长 1 小时

## 主要指标

- **任务完成率（Task Completion Rate）**：任务全部完成的比例
- **部分完成分（Partial Score）**：基于子步骤完成度的细粒度评分
- **岗位分类准确率**：SWE/PM/DS/Admin/HR 各类任务的分项表现
- **工具使用效率**：完成任务所需工具调用步骤数

## 局限性

- 模拟环境与真实企业环境仍有差距，真实场景中的人际协作、组织政治等软因素无法覆盖
- 175 个任务规模较小，采样偏差可能影响结论泛化
- 任务难度评级依赖人工标注，不同标注者对"完成"的定义可能不一致

## 相关页面

- [[SWE-bench]]
- [[AgentBench]]
- [[MLE-Bench]]
- [[IT-Bench]]
