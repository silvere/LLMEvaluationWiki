# CLAUDE.md — LLMEvaluationWiki 操作经验手册

> 本文件是 Claude Code 针对此项目的经验积累，记录已踩过的坑、可靠流程和机制约束。
> 每次 session 结束后如有新发现，请在对应章节追加。

---

## 1. 项目快速上手

```
主仓库：  /Users/jingweisun/Code/LLMEvaluationWiki/
wiki 内容：wiki/（8 大目录）
静态站点：quartz/（Quartz v4 submodule）
构建输出：quartz/public/
本地预览：http://localhost:8083（python server PID 可能不固定，用 ps aux | grep 8083 确认）
```

### 常用命令（均从仓库根目录执行）

```bash
npm run build-index     # 重建 wiki/index.md（主页）
npm run fix-links       # 修复 sources/ 下中文 wikilink → 英文 slug
npm run check-all       # fix-links + validate + build-index + lint 全套检查
npm run validate        # 校验 frontmatter 必填字段
npm run lint            # 检查 wiki 规范

# Quartz 重建（耗时约 30s，必须在 quartz/ 目录内执行）
cd quartz && npx quartz build --directory ../wiki
```

### 服务器启停

```bash
# 查看当前服务器 PID
ps aux | grep wiki_server

# 重启服务器（旧 PID 替换实际值）
kill <PID>
python3 /tmp/wiki_server.py /Users/jingweisun/Code/LLMEvaluationWiki/quartz/public 8083 &
```

---

## 2. 已踩坑 — 必读

### 2.1 wiki_server.py 的 arXiv ID 404 问题

**现象**：`/sources/2404.07440` 返回 404，但 `2404.07440.html` 文件存在。

**根因**：`os.path.splitext("2404.07440")` 返回 `("2404", ".07440")`，脚本误以为已有扩展名，不走 `.html` fallback。

**修复**（`/tmp/wiki_server.py`）：
```python
# 错误写法
if not os.path.exists(path) and not os.path.splitext(path)[1]:

# 正确写法——直接判断 .html 是否存在
if not os.path.exists(path) and os.path.exists(path + ".html"):
```

**影响范围**：所有含点号的文件名（arXiv ID、版本号如 `v1.0`）都会触发此 bug。

---

### 2.2 build-index.ts 生成的 wikilink 格式

**现象**：侧边栏条目点击后 404。

**根因**：`[[完整标题]](path)` 中的 wikilink 部分用全标题，Quartz 按 slug（basename）解析，找不到匹配文件。此外，`[[wikilink]](path)` 这种格式会让 Quartz 把括号内路径当 markdown href，导致链接指向错误目录。

**正确格式**（当前 build-index.ts 已修复）：
```typescript
// 用文件 basename 作 slug，全标题作显示名
const slug = p.file.replace(/\.md$/, "").split("/").pop() ?? p.title;
const wikilink = slug === p.title ? `[[${slug}]]` : `[[${slug}|${p.title}]]`;
lines.push(`- ${wikilink}${cb}...`);  // 不要拼 (path)，否则 Quartz 会误用
```

---

### 2.3 index.md 必须放在 wiki/ 目录下

**现象**：Quartz build 提示 "missing index.md home page file"，首页 `index.html` 不生成。

**根因**：Quartz 使用 `--directory ../wiki` 构建，内容根目录是 `wiki/`，而 `build-index.ts` 原本写到仓库根目录 `LLMEvaluationWiki/index.md`。

**修复**：`scripts/build-index.ts` 中 `INDEX_PATH = join(WIKI_DIR, "index.md")`（已修复）。

---

### 2.4 wikilink 死链批量治理流程

全局死链扫描脚本（在 `wiki/` 目录执行）：

```python
import os, re, glob
from collections import Counter
wiki_dir = "."
known_slugs = set()
for path in glob.glob("**/*.md", recursive=True):
    known_slugs.add(os.path.splitext(os.path.basename(path))[0].lower())
# 也加载 aliases
alias_re = re.compile(r'aliases:\s*\n((?:  - .+\n)+)', re.MULTILINE)
for path in glob.glob("**/*.md", recursive=True):
    for m in alias_re.finditer(open(path).read()[:600]):
        for line in m.group(1).splitlines():
            a = line.strip().lstrip('- ').strip().lower()
            if a: known_slugs.add(a)
wikilink_re = re.compile(r'\[\[([^\]|#]+)(?:\|[^\]]*)?\]\]')
broken = Counter()
for path in glob.glob("**/*.md", recursive=True):
    for lnk in wikilink_re.findall(open(path).read()):
        slug = lnk.strip().lower().replace(" ", "-")
        if slug not in known_slugs and lnk.strip().lower() not in known_slugs:
            broken[lnk.strip()] += 1
for link, count in broken.most_common():
    print(f"{count:3d}x  [[{link}]]")
```

**常见修复手段**：
- 现有页 slug 不匹配 → 在目标页 frontmatter 加 `aliases: [wrong-slug]`
- 页面不存在但高频引用（≥5x）→ 创建 stub 页
- 已删除页的残留引用 → 批量 `re.sub` 移除 wikilink
- 中文显示名 → 要么加 alias，要么用 `[[english-slug|中文名]]` 格式

---

### 2.5 Quartz 搜索索引缓存

**现象**：搜索不到新页面。

**原因**：浏览器将 `contentIndex.json` 缓存在内存中，Quartz 重建后旧索引仍生效。

**解法**：在浏览器执行强制刷新 `Cmd+Shift+R`，或开 DevTools → Network → Disable cache。

---

### 2.6 synthesis/ 必须有 sources（§7 约束）

`build-index.ts` 在构建时会校验 `wiki/synthesis/*.md` 的 `sources:` 字段，若为空则退出 code 1。
草稿放 `private/synthesis-draft/`，审阅后再挪到 `wiki/synthesis/`。

---

## 3. 内容约定

### 3.1 文件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| benchmarks/ | 官方名 PascalCase | `MT-Video-Bench.md`, `GSM8K.md` |
| concepts/ | kebab-case | `benchmark-saturation.md` |
| entities/ | PascalCase | `GPT-4.md`, `LLaMA.md` |
| sources/ | 论文 slug（标题 kebab）或 arXiv ID | `mt-video-bench.md`, `2404.07440.md` |

### 3.2 wikilink 规范

- **永远用英文 slug**，中文用 alias 或 `[[slug|中文名]]` 显示
- `[[slug]]` 按文件 basename 解析（`markdownLinkResolution: "shortest"`）
- 路径中的 `/` 不影响 Quartz 的 shortest 解析，可省略目录前缀

### 3.3 必填 frontmatter

```yaml
---
title: "..."
type: benchmark|concept|tool|leaderboard|entity|source|synthesis|industry
publish: true
confidence: draft|promoted
as_of_date: "YYYY-MM-DD"
last_verified: "YYYY-MM-DD"
sources: []          # source 类型必填，synthesis 必须非空
domain:
  - ...
---
```

---

## 4. 已建立的关键缺失页（2026-05-14 补建）

以下 stub 页是此前多处引用但缺失而导致死链的，已补建：

- `concepts/benchmark-saturation.md` (24x 引用)
- `concepts/safety-eval-landscape.md` (19x 引用，alias: AI安全评测)
- `concepts/open-vs-closed-model-eval.md` (8x 引用)
- `benchmarks/MTEB.md`
- `entities/LLaMA.md` (alias: llama)
- `entities/GPT-4.md` (alias: gpt-4, InstructGPT)
- `entities/Claude.md` (alias: claude)
- `entities/Gemini.md` (alias: gemini)

**已添加 aliases 的现有页**：
- `concepts/benchmark-contamination.md` → alias: `data-contamination`
- `leaderboards/HuggingFace-Open-LLM-Leaderboard.md` → alias: `Open-LLM-Leaderboard`
- `concepts/multimodal-eval.md` → alias: `multimodal-evaluation`, `多模态评测`
- `concepts/llm-as-judge.md` → alias: `llm-as-judge-bias`
- `tools/BIG-bench-framework.md` → alias: `big-bench`, `BIG-Bench`

---

## 5. 禁止操作（红线）

- **不得手动编辑 `wiki/index.md`**，只能通过 `npm run build-index` 生成
- **不得将 synthesis/ 下无 sources 的页面推送到公网**（见 §2.6）
- **`private/` 和 `99-Meta/` 目录不对外渲染**（已在 `ignorePatterns` 中）
- **sources/ 文件内部人员姓名不得出现**（如阅读组成员名字）
- **不得修改 `quartz/` submodule 代码**（只改 `quartz.config.ts` 和 `quartz.layout.ts`）
