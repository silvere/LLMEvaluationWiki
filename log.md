# LLMEvaluationWiki 变更日志

> append-only 审计日志。每条记录格式（grep 友好）：
> `## [YYYY-MM-DD] <action> | <title> | <details>`
>
> Action 类型：`ingest` | `query` | `lint` | `schema-update` | `human-review`
>
> 用 grep 查看最近 5 条 ingest：
> ```bash
> grep "^## \[" log.md | grep ingest | tail -5
> ```

---

## [2026-05-13] schema-update | 初始化 AGENTS.md v0.1 | Session A 骨架建立
