---
title: "τ³-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
aliases:
  - tau3-bench
  - tau-cubed-bench
domain:
  - agent
  - dialog
year: 2025
arxiv_id: ""
status: active
---

# τ³-Bench

> Sierra Research 发布的 τ-bench 第三代版本，新增银行（Banking）领域，引入语音（Voice）评估模态，并对航空和零售域的 50+ 任务进行了深度审计和修复，是目前 τ 系列中覆盖最广、任务质量最高的版本。

## 概述

τ³-Bench（tau-cubed-bench，2025，Sierra Research）是 [[tau-bench|τ-bench]] 系列的第三代迭代，在 [[tau2-bench|τ²-Bench]] 的三领域基础上进一步扩展：

**核心新增内容**：

1. **银行（Banking）新领域**：银行客服场景覆盖账户管理、转账操作、贷款咨询、信用卡争议等高风险金融任务，工具调用具有更强的现实合规约束（如需要身份验证步骤才能操作账户）
2. **语音模态（Voice Evaluation）**：扩展评测框架支持**语音 agent**，测试语音输入/输出 agent 在同等任务下与文本 agent 的性能差距
3. **历史任务质量修复**：对 τ-bench 和 τ²-Bench 中 50+ 个存在歧义或错误的任务进行了系统性审计和修正，提高基准的可靠性
4. **更细粒度的错误分类**：引入 8 类错误类型标注（工具参数错误、状态理解错误、合规违反等），方便研究者定位 agent 的具体失败模式

τ³-Bench 的银行域引入使评测覆盖了金融行业特有的强合规性约束，是当前少数能评测 agent 在"高风险"业务场景下行为合规性的基准之一。

## 任务格式

- **领域覆盖**：零售、航空、电信、银行四大客服场景（+ 语音模态）
- **交互方式**：文本 agent 对话 + 语音 agent 对话（双轨评测）
- **任务质量**：经过系统审计，歧义任务已清理，每个任务有明确唯一正确解
- **评估方式**：Task Success Rate + 错误类型分类报告

## 主要指标

- **Task Success Rate (TSR)**：四个领域的加权平均任务成功率
- **Voice vs Text Gap**：语音 agent 与文本 agent 在同任务上的性能差距
- **Error Type Distribution**：8 类错误类型的频率分布，用于能力诊断

## 局限性

- 银行域任务的合规约束来自美国金融监管框架，对其他国家监管环境适用性有限
- 语音评测部分目前依赖特定 TTS/ASR 系统，评测结果与语音系统质量耦合
- 作为系列最新版本，社区基准线和对比实验数据尚不充分

## 相关页面

- [[tau-bench]]
- [[tau2-bench]]
- [[AgentBench]]
- [[TheAgentCompany]]
- [[BFCL]]
