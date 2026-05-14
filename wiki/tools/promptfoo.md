---
title: "promptfoo"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# promptfoo

## 概述

promptfoo 是一个开源的 LLM 测试和评测工具，支持命令行界面（CLI）操作，专为开发者设计。其核心功能包括：系统性的提示词测试、多模型 A/B 对比、红队（红队）安全测试，以及与 CI/CD 系统的无缝集成。promptfoo 的设计理念是让 LLM 测试像软件单元测试一样简单、可重复。

## 核心功能

**提示词测试**：
通过 YAML 配置文件定义测试用例，支持多种断言方式：
```yaml
prompts:
  - "Summarize this: {{text}}"
providers:
  - openai:gpt-4o
  - anthropic:claude-3-5-sonnet-20241022
tests:
  - vars:
      text: "Artificial intelligence is..."
    assert:
      - type: contains
        value: "AI"
      - type: llm-rubric
        value: "Is concise and accurate"
```

**多模型 A/B 对比**：
在相同输入下对比多个模型或同一模型不同版本的输出，生成对比报告，帮助开发者做模型选型或版本升级决策。

**红队测试**：
内置安全测试套件，自动生成各类对抗性输入（提示注入、越狱尝试、敏感内容请求等），批量测试模型的安全防护能力。

## CI/CD 集成

promptfoo 可以集成到 GitHub Actions 等 CI/CD 流程中，实现每次代码提交时自动运行 LLM 评测：
```bash
npx promptfoo eval
npx promptfoo view  # 打开可视化报告
```

## 支持的评判方式

- **精确匹配**：contains、equals、regex 等
- **LLM 评判**：使用指定模型评估输出质量（llm-rubric）
- **Python/JavaScript 自定义函数**：编写自定义评分逻辑
- **相似度**：基于向量相似度的语义匹配

## 适用场景

- 提示词工程迭代：系统测试不同提示词版本的效果
- 模型迁移验证：升级模型版本前验证行为一致性
- 安全红队测试：批量检测 LLM 应用的安全漏洞
- 回归测试：防止模型更新或提示词修改导致性能退化

## 访问方式

- 官方网站：[promptfoo.dev](https://www.promptfoo.dev/)
- GitHub：[github.com/promptfoo/promptfoo](https://github.com/promptfoo/promptfoo)
- 安装：`npm install -g promptfoo` 或 `npx promptfoo`
