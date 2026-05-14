---
title: "IT-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - code
year: 2025
arxiv_id: ""
status: active
---

# IT-Bench

> IT 工作流代理评测基准，评测 AI 代理在真实 IT 运维和 DevOps 工作流场景中——包括服务器配置、日志分析、故障排查、CI/CD 流水线管理——的自主完成能力。

## 概述

IT-Bench 于 2025 年发布，专注于评测 AI 代理在 **IT 运维（IT Operations）和 DevOps** 领域的实际工作能力。与 SWE-bench（代码修复）和 TheAgentCompany（软件公司日常任务）不同，IT-Bench 聚焦于系统管理员和 DevOps 工程师的核心工作：管理服务器、排查网络问题、维护 CI/CD 流水线、处理安全事件等。

IT 运维任务具有独特的挑战性：
- **环境复杂性**：需要与真实操作系统、容器（Docker/Kubernetes）、云服务交互
- **多工具链**：Ansible、Terraform、Prometheus、Grafana、Elasticsearch 等专业工具
- **故障容忍度低**：生产环境中错误命令可能导致服务中断或数据丢失
- **诊断推理**：从日志、监控指标中识别根因需要领域专业知识

IT-Bench 构建了完整的虚拟化 IT 环境（基于容器技术），每个任务在隔离的模拟生产环境中执行，确保评测安全性的同时保持真实性。任务来源于真实 IT 工单系统的脱敏案例。

## 任务格式

- **任务总数**：约 300 个
- **任务类型**：服务器配置、故障排查、日志分析、CI/CD 管理、安全审计、容器编排
- **执行环境**：Docker 容器化虚拟 IT 环境
- **工具集**：Shell、SSH、Docker、Kubernetes、Ansible、监控工具
- **评估方式**：任务完成状态自动验证（服务是否正常运行、配置是否正确等）
- **时间限制**：每任务 30 分钟

## 主要指标

- **任务完成率（Task Completion Rate）**：成功完成任务的比例
- **零故障率（Zero-Disruption Rate）**：在不引入新问题的情况下完成任务的比例
- **任务类型分解分**：各类 IT 任务的专项表现
- **工具调用效率**：完成任务所需的平均命令数

## 局限性

- 虚拟化环境与真实生产环境仍有差距，部分复杂分布式系统问题难以完整模拟
- IT 工具链版本迭代快，基准的工具版本可能迅速过时
- 评测任务多为独立场景，缺少真实运维中常见的长期系统演化和历史背景依赖

## 相关页面

- [[TheAgentCompany]]
- [[SWE-bench]]
- [[AgentBench]]
- [[WebWalkerQA]]
