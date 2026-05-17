# LLMEvaluationWiki — Learnings 沉淀

## [BEST_PRACTICE-20260515-001] arXiv 批量论文质量评估：本地 PDF 解析优于外部 API

**Priority**: High
**Status**: Validated（v3 成功跑通 820 候选→100 下载→90 入库）
**Area**: scripts/arxiv-ingest-*

**Summary**: 批量评估学术论文质量时，**不要依赖** Semantic Scholar / OpenAlex 这类有严格限流的外部 API。改用**本地 PDF 解析 + 多维度信号融合**。

**Details**:
- v2 用 Semantic Scholar 拿 citation/affiliation：免费版 100 req/5min，3.5s 延迟 + 重试也会把 100 篇论文拖到 30+ 分钟，且数据缺失率高（新论文未入库 / 限流返回 empty）。最终 0 篇 excellent。
- v3 砍掉所有外部 API，纯本地评估：
  - **元数据预筛**（title 命中 benchmark/evaluation + abstract 含 LLM 名字）
  - **PDF 头部正则**识别机构（顶级实验室 acknowledgment 通常在首页）
  - **LLM 多样性**（统计 PDF 全文中提及的不同模型数）
  - **引用数量**（数 references 章节的 `[N]` 或编号条目）
  - **venue**（PDF 头部命中 NeurIPS/ICLR 等关键词）
  - **rigor**（表格数 + 定量结果 + 引用数）
  - **页数惩罚**（< 6 页扣分）
- 综合分满分 25，阈值 12 给出合理筛选率（90/100 通过）。

**Suggested Action**:
- 后续任何"批量学术质量评估"任务，优先沿用 `scripts/arxiv-ingest-v3.py` 模式：单一数据源（arXiv）+ 本地 PDF 解析。
- 仅在需要绝对引用数（如做 meta-review）时再调外部 API，并加缓存。
- 关键代码片段：`parse_pdf()` 提取信号 + `quality_score()` 融合（见 v3 行 173-260）。

---

## [CORRECTION-20260515-002] Python stdout 在 background 任务里必须 line-buffered

**Priority**: Medium
**Status**: Fixed
**Area**: scripts/

**Summary**: `python3 scripts/foo.py &` 时 stdout 被重定向到文件 → 默认 block buffered → `print()` 即便完成也看不到输出。Monitor 工具收不到事件，外人以为脚本死了。

**Details**:
- v2 跑了 8 分钟 stdout 0 字节，让我误判脚本卡死直接 kill 掉。实际可能只是 buffer 没刷。
- 解决方案三件套：
  1. `sys.stdout.reconfigure(line_buffering=True)` 在脚本开头
  2. `print(..., flush=True)` 在每个关键节点
  3. 启动时加 `PYTHONUNBUFFERED=1` 环境变量

**Suggested Action**: 任何要 backgrounded + monitored 的 Python 脚本，**必须**三件套全上。

---

## [BEST_PRACTICE-20260515-003] sources/ 入库的 frontmatter 字段约定

**Priority**: Medium
**Status**: Validated
**Area**: wiki/sources/

**Summary**: 自动生成的 source 文件必须包含 `quality_score` + `score_breakdown` 字段，便于人审时快速判断保留/删除。

**Details**:
v3 在 source frontmatter 加入：
```yaml
quality_score: 24
score_breakdown: "meta=6 lab=T1(6) llms=5(3) venue=5 kw=70(2) rigor=2 pages=69"
pages: 69
```
正文末尾打印评分明细块，明确展示分数来源。

**Suggested Action**: 后续自动生成内容（不只 sources，benchmarks/concepts 也一样）都遵循"打分透明化"原则，便于后续审阅和清理低质量页。

---

## [CORRECTION-20260515-004] "导入 wiki" ≠ 写 source 文件，而是建立**双向关联**

**Priority**: High
**Status**: Validated
**Area**: scripts/arxiv-ingest-*

**Summary**: 用户语境下"导入到 wiki"的含义被我误解了。仅在 `wiki/papers/` 写一个 source 文件**不算导入**——必须：
1. 严格按质量筛选（用户原话："质量好的再导入"，即 ≥18 分而非 ≥12 分）
2. 在相关主题页（benchmarks/concepts/industry）**追加反向 wikilink**
3. 若新论文 claim 与现有 wiki 内容冲突，**主动纠正/补强**正文段落

**Details**:
- v3 第一轮把 90/100 都"导入"了——分数门槛 12 偏松；实际"质量好的"应是 ≥18（24 篇）
- 双向关联是"导入"的核心动作——单向 source→topic 不够，要 topic→source 也加上
- 实施方式：扫所有 source 的「相关 Wiki 页面」章节 → 反向构建 slug→sources 映射 → 在每个 topic 页末尾追加「## 近期相关研究（arXiv ...）」章节
- 正文补强是"纠正"的实质：把新论文的具体数据/论点写进主题段落而非只列在末尾

**Suggested Action**:
- v3+ 脚本应默认产出"高分（≥18）入 wiki/papers/ + 反向关联到 topic 页"两件套
- 仅写文件不算 done，必须验证反向关联存在
- 关键代码片段：`scripts/arxiv-ingest-v3.py` 应增加 stage 5b（反向关联生成），目前是手动 python 完成的，下次应内置

---

## [CORRECTION-20260515-005] 物理目录命名要直观：sources/ → papers/

**Priority**: Medium
**Status**: Validated（已重命名）
**Area**: wiki/

**Summary**: `wiki/sources/` 含义模糊（source 是"原始文献"还是"信息来源"？），用户实际希望看到 **papers** 这个直观分类。直接 rename + frontmatter type 调整，比保留命名+改 build-index 显示更彻底。

**Details**:
- 之前 wiki/sources/ 92 篇全是论文（83 arxiv + 9 非 arxiv）。一个目录混合"论文"和"其他来源"是反模式
- 重命名 wiki/sources → wiki/papers + frontmatter `type: source` → `type: paper`，连带改：
  - `scripts/build-index.ts` TYPE_ORDER 加 paper
  - `scripts/validate-frontmatter.ts` TYPE_REQUIRED 加 paper
  - `scripts/arxiv-ingest-v3.py` WIKI_SOURCES 路径
  - `raw/papers/_index.csv` source_page 字段批量替换
- 之后未来若有"其他类型 source"（博客、技术报告等），可重建 wiki/sources/ 但仅留非论文类

**Suggested Action**: 目录/类型命名遵循"扫一眼能看懂"原则。"sources" 太抽象，"papers"/"blogs"/"reports" 更直接。后续若加新 source 类型，按子类型建独立目录。

---

## [BEST_PRACTICE-20260515-006] backgrounded shell 后 pwd 会留在子目录，验证用绝对路径

**Priority**: Medium
**Status**: Validated（吃过亏）
**Area**: 任何多目录脚本

**Summary**: `cd quartz && ...` 完成后 shell 会留在 quartz/ 子目录，下一次 `ls raw/` 会找不到，让人误判数据丢失。**任何"用户校验数据是否真实存在"的命令，必须用绝对路径。**

**Details**:
- 这一轮被用户质疑"PDF 在哪？"时，我下意识 `ls raw/papers/` 返回 "No such file or directory"——差点误导用户以为数据丢失
- 根因：上一条命令 `cd quartz && npx quartz build` 把 shell cwd 留在 quartz/，相对路径解析错位
- 修复：用 `realpath` 或绝对路径 `ls /Users/jingweisun/Code/LLMEvaluationWiki/raw/papers/`

**Suggested Action**:
- 验证类命令（用户问"X 在哪""有多少"），统一用 `realpath` + 绝对路径
- 任何 `cd X && ...` 之后，下一条独立验证命令前显式 `cd $ROOT`

---

## [BEST_PRACTICE-20260515-007] arXiv API 限流：少而大的查询 > 多而小的查询

**Priority**: High
**Status**: Validated（v4 跑通 300 篇）
**Area**: scripts/arxiv-ingest-*

**Summary**: 向 arXiv API 发请求时，**24 个小查询（max_results=80）+ 翻页**会触发 HTTP 429 限流，且冷却时间长达 5-10 分钟；**6 个大查询（max_results=300）+ 10s 间隔**则稳定不限流。

**Details**:
- v4 第一次启动用 24 查询 × 2 翻页 + 1.5s 间隔，**第二个查询就 429**，进程被卡死
- 改成 6 大查询 + 10s 间隔后，跑通 1200 候选 / 300 下载 / 47 入库
- arXiv 限流策略推测：按 IP + 时间窗内请求数，单个大请求 vs 多个小请求是质的差异

**Suggested Action**:
- 后续 arXiv 批量任务，单次 `max_results` 提到 300，查询数控制 ≤ 8 个
- 加 retry + 指数 backoff（4 次重试，15s/30s/45s/60s）
- 每查询间隔 ≥ 10s（v3 的 3s 偶尔过线，v4 的 10s 稳）
- 触发 429 后，**冷却 8 分钟以上**才能复测（30s/60s/120s/240s 探测均失败，480s 成功）

---

## [BEST_PRACTICE-20260515-008] ingest pipeline 应内置反向关联 Stage（按 LEARNINGS-004 落地）

**Priority**: High
**Status**: Validated（v4 内置 Stage 6 自动执行）
**Area**: scripts/arxiv-ingest-*

**Summary**: v3 的反向关联是手动 python 脚本完成的，分两步走容易遗忘；v4 把反向关联做成 pipeline 的 Stage 6，与质量分流一起完成，不再有 "下载完了忘记建链接" 的窗口。

**Details**:
- 反向关联逻辑（slug→sources 映射 + topic 页追加章节）封装在 `build_reverse_links(excellent_papers)` 函数
- Stage 5 写入 wiki/papers/ 后立即触发 Stage 6
- 跑 v4 实测：47 篇 excellent → 14 个 topic 页自动追加 `## 近期相关研究` 章节
- 关键代码：`scripts/arxiv-ingest-v4.py` 行 230-280

**Suggested Action**:
- 任何"向 wiki 入库"的批量脚本，必须内置反向关联 Stage
- 手动后处理 = 流程脆弱 = 容易跳步

---

## [KNOWLEDGE_GAP-20260515-009] 用户搜不到新论文 = 浏览器缓存了旧 contentIndex.json

**Priority**: Medium
**Status**: Validated
**Area**: wiki.jerryai.cn 用户体验

**Summary**: Quartz 重建后，contentIndex.json 文件名通常不变（无 hash），浏览器会缓存。用户访问新页面时，URL 直接访问可命中（HTTP 200），但搜索框搜不到新内容——因为本地内存里的 index 是旧的。

**Details**:
- 用户搜"FTII"搜不到时，第一反应是怀疑 ingest 失败
- 实际情况：contentIndex.json 已正确生成（curl 验证 + Python 解析都能找到 FTII）
- 唯一缺口：浏览器使用了旧的内存索引

**Suggested Action**:
- 短期：用户 `Cmd + Shift + R` 强制刷新
- 中期：考虑给 Quartz `contentIndex.json` 输出加 query string hash（如 `?v={build_timestamp}`），让浏览器自动绕过缓存。需研究 Quartz 是否暴露这个 hook
- 长期：写 Cloudflare Workers 给 `*.json` 加 `Cache-Control: no-cache, must-revalidate`
- 这条已在 CLAUDE.md §2.5 提过——但现在加了具体诊断流程：`curl /static/contentIndex.json | grep <term>` 验证服务器端，确认是浏览器缓存

---

## [BEST_PRACTICE-20260516-010] 反向链接必须带作者署名，不只是 title

**Priority**: High
**Status**: Validated（v5+ pipeline 内置 byline）
**Area**: scripts/arxiv-ingest-v5+.py

**Summary**: 反向链接显示 `[[2410.12564|FTII-Bench]]` 不够——用户希望看到论文是谁写的。v5 反向关联模板改为 `[[id|title]] · {first_author} 等 · score {N}/25`，让作者直接出现在 topic 页的"近期相关研究"区。

**Details**:
- 用户原话："这些优质的论文作者没有体现出来呀"
- 修复方法两步：
  1. 论文 frontmatter 加 `first_author: "X"` 字段（提取自 authors 字符串首位）
  2. Stage 6 反向关联生成时，把作者署名拼进 wikilink 后面的描述文本
- 论文页正文 byline 改成"**第一作者**: X | 全部作者: ..."

**Suggested Action**:
- 任何"反向引用列表"格式，必须包含：链接 + 标题 + 第一作者 + 评分/日期
- 已落到 `scripts/arxiv-ingest-v5.py` 的 `build_reverse_links` 函数

---

## [BEST_PRACTICE-20260516-011] 论文 claim 要写进 benchmark 正文段落，不只是末尾列表

**Priority**: High
**Status**: Validated
**Area**: wiki 内容深度

**Summary**: 用户反馈"论文和 WIKI 内容之间的关系感觉也没有特别够"——只在 benchmark 页末尾加"## 近期相关研究"列表是不够的，需要把论文具体 claim、作者、数据写进 benchmark 正文段落（"主要挑战与局限"、"SOTA 表现"等）。

**Details**:
- 例：AIME.md 加段落引用 LiveMathematicianBench（He 等）"前沿模型仅 43.5%"，与 AIME 上 95%+ 的高分形成对比，把作者+数据+论点融入到"主要挑战"段落
- 例：safety-eval-landscape.md 加段落引用 VCT（Götting 等）"43.8% 准确率，超越 94% 病毒学家"具体数字
- 不只是 [[wikilink]]，而是把具体发现写成完整句子，用 wikilink 提供锚点
- 已覆盖 14 个核心 topic 页

**Suggested Action**:
- ingest 入库后必须做"正文段落级融合"：在每个相关 benchmark/concept 页找到合适段落（"主要挑战"/"SOTA"/"局限"），加入论文具体发现 + 作者 + 数据 + wikilink
- 未来可写自动化脚本：扫所有 ≥18 paper 的 claim，按 topic 聚合，主动 propose 段落更新（人工 review）

---

## [ERROR-20260516-012] arXiv API 限流冷却时间需要 5-10 分钟

**Priority**: Medium
**Status**: Validated
**Area**: scripts/arxiv-ingest-*

**Summary**: v5 完成后立刻启 v6 会再次触发 429 限流，4 次 retry 全失败。两个 pipeline 间隔需 ≥ 10 分钟才能稳定。

**Details**:
- v4 完成 → 等 ~60min → v5 启动 OK
- v5 完成 → 立刻启 v6 → Stage 1 第一个查询就 429，retry 1/2/3/4 全失败
- v5 实际 wall-clock 用了 ~5 分钟（含 PDF 下载），结束后 arXiv 限流计数仍未清零

**Suggested Action**:
- 连续启动 ingest pipeline，pipeline 之间强制 sleep ≥ 600s
- 或在 pipeline 末尾自动 sleep 600s 作为礼貌延迟
- 已在 `scripts/arxiv-ingest-v6.py` 验证：限流后立刻启第二个 pipeline = 卡死

---

## [BEST_PRACTICE-20260516-013] 研究者 entity 建设：按"曝光分"分级，不主观挑选

**Priority**: High
**Status**: Validated（新增 65 个研究者 entity，70→135）
**Area**: wiki/entities/

**Summary**: 用户问"Shunyu Yao 这种级别的作者要不要建 entity"。**底层逻辑**：不该主观挑选"知名作者"，而是按数据驱动的"曝光分"做分级。

**曝光分公式**：
```
score = 1 × paper_count
      + 3 × benchmark_authorship_count
      + 1 × (paper_count where quality_score >= 18)
```

**分级阈值**：
- ≥10：必建 entity（如 Shunyu Yao 12 分 = 4 个 benchmark co-author）
- 6-9：选建 entity（2-3 个 benchmark co-author）
- <6：不建（单次出现作者，建 entity 价值低，ROI 倒挂）

**关键原则——不 hallucinate**：
- entity stub **只列 wiki 内可验证的关联**：参与的 benchmark wikilink + first-author 论文 wikilink
- 不编造机构、不杜撰简介、不写 H-index
- 标注 `confidence: draft`，待人工编辑后 `promoted`

**Details**:
- 数据来源：wiki/benchmarks/ 的 frontmatter `authors` 数组 + wiki/papers/ 的 first_author 字段
- 同时给 benchmark 页正文里首次出现的人名做 wikilink 化（如 "由 [[Dan-Hendrycks|Dan Hendrycks]] 等人提出"）
- 反向链接列表里 "· {first_author} 等" 也尽量 wikilink 化（若 entity 已存在）

**Suggested Action**:
- 之后每次 ingest 完，运行 entity 同步脚本：
  - 扫所有 paper 的 first_author + benchmark co-author
  - 按曝光分自动 propose 新 entity stub（不直接 commit，列表给人工 review）
- 已有 entity 页（70 个 thought leader）和新建 entity（65 个 benchmark co-author）形成互补：思想领袖 vs 实操者
- 关键代码逻辑见本次会话的 inline python（可重构为 `scripts/sync-author-entities.py`）

---

## [BEST_PRACTICE-20260517-014] Model Spec 应作为独立类型，区别于 entity（公司/人物）

**Priority**: High
**Status**: Validated（23 个 model spec 已建立）
**Area**: wiki schema

**Summary**: 之前模型相关页面散落在 entity（GPT-4.md / Claude.md / LLaMA.md）和公司 entity（DeepSeek.md / Moonshot-AI.md）中，没有明确的"模型 spec"类型。新增 `type: model` 类型 + `wiki/models/` 目录后，模型谱系/版本/评测能集中管理。

**Details**:
- 注册位置：
  - `scripts/build-index.ts` 的 `TYPE_ORDER` 加 `model`
  - `scripts/validate-frontmatter.ts` 的 `TYPE_REQUIRED` 加 `model: [..., "sources", "developer", "release_date"]`
- model frontmatter 关键字段：developer / release_date / family / context_length / modality / license
- 每个 spec 页结构：基本信息表 + 评测表现表（含 benchmark wikilink）+ 前代/相关模型链
- entity 页（GPT-4 / Claude / DeepSeek / Moonshot-AI 等）反向加 "## 模型版本" 区，列出该家族/机构下的具体 model spec wikilink
- 共 23 个模型 spec 覆盖：OpenAI 5 · Anthropic 4 · Google 3 · DeepSeek 2 · Alibaba 2 · Moonshot 2 · ByteDance 2 · Meta 2 · 01.AI 1

**Suggested Action**:
- 后续每发布一个 top tier 模型，按 `scripts/build-models.py` 的模板加一行 MODELS 数据，跑脚本即可
- benchmark 分数严格按官方/技术报告，标注 "数据来源：模型卡 / 技术报告"，加 `confidence: draft` 待 audit
- 不收录中小型模型（避免泛滥）；阈值定为"有官方技术报告 + 在主流 leaderboard 上 top 30"

---

## [CORRECTION-20260517-015] Model spec 不能凭记忆生成，必须 WebFetch/WebSearch 官方源

**Priority**: Critical (踩红线二)
**Status**: Validated（用户质问 → 立刻修正）
**Area**: scripts/build-models*.py

**Summary**: 用户问 "你的大模型的信息来源是啥？应该是去官网上查找搜索吧？"——指出我之前 23 个 model spec 全部凭训练数据/记忆生成，**未经任何官方源验证**。

**Details**:
- 一旦验证就发现严重过时：
  - Claude **当前为 Opus 4.7 / Sonnet 4.6 / Haiku 4.5**，不是我之前写的 "Sonnet 4.5"
  - OpenAI **当前默认 GPT-5.5**（2026-04 API），不是 GPT-5
  - Gemini **当前 3.1 Pro / 3 Flash**，不是 2.5 Pro
  - Kimi **当前 K2.6**（2026-04），不是 K2
  - Doubao **Seed 2.0 已发布**（2026-02）
  - DeepSeek **V3.1 已发布**（2025-08）
- 修复后：
  - 所有 23 个旧 spec 加官方 source URL（platform.claude.com / openai.com/index/ / blog.google / seed.bytedance.com / huggingface deepseek-ai 等）
  - 数据来源注解："本 wiki 内的具体分数为 ingest 时记录，可能与最新官方数字有出入，权威数据请直接访问官方 sources 链接"
  - 补建 10 个新版本 spec（基于 WebSearch 验证）

**Suggested Action**:
- **Hard rule**: 任何"模型 spec / 性能数据 / 版本号"页面，frontmatter sources 字段必须**至少包含 1 个官方 URL**，validate-frontmatter 应加入此校验
- 任何 "model_id 字段" 必须取自官方文档（如 `claude-opus-4-7` / `gpt-5.5`），不能猜
- 跨日更新：每月跑一次"模型 spec audit"——WebFetch 官方页 + diff 当前 wiki 数据，自动 propose 更新

---

## [BEST_PRACTICE-20260517-016] benchmark 页双向显示模型得分

**Priority**: High
**Status**: Validated（18 个 benchmark 页加入模型得分表）
**Area**: wiki 双向链接

**Summary**: model spec 列出"在 X benchmark 上得分 Y"，应反向在 benchmark 页加 "## 主流模型得分（来自 wiki/models/）" 表，汇总所有模型在该 benchmark 上的分数排名。

**Details**:
- 实现：扫所有 wiki/models/*.md 的 "## 评测表现" 表格，按 benchmark slug 聚合 (model, score) → 在 benchmark 页追加表格
- 实测覆盖：GPQA (16 模型), MMLU (16), AIME (13), SWE-bench-Verified (12), MATH (10), HumanEval (8), LiveCodeBench (5), HLE (3), Codeforces (4) 等
- 表格按分数排序，每行可点击进入对应 model spec
- 关键代码在本次 inline python，可重构为 `scripts/sync-model-benchmark-scores.py`

**Suggested Action**:
- 每次新增/更新 model spec 后，跑同步脚本，让 benchmark 页同步更新
- 数据冲突标注："分数若与最新官方报告不一致，以 model spec sources 链接为准"
- 未来考虑加 "评测条件" 列（with thinking / with tools / standard）以避免对比误导

---

## LEARNINGS-017: 模型 spec 必须做系统性搜索，不靠记忆裁决"是否最新"

**日期**：2026-05-17
**触发**：用户连续两次批评——"你的大模型的信息来源是啥？我觉得应该是去官网上查找和搜索吧？"以及更尖锐的"Deepseek V4 不都出了么？你这信息源不行啊，你要系统的搜索和研究，确保信息源的正确完整。"

**根因**：
- 第一次建 model spec 时直接用训练数据写参数与分数（踩红线二：未验证）。
- 修正后只 patch 已建好的 23+10 个 spec 的 sources 字段，**没有反向问"我是不是漏了模型"**——这是 P8 的格局缺失：修了眼前的错，没回头扫"同类问题还有几个埋着"。
- DeepSeek V4 已于 2026-04-24 发布，Qwen3.5/3.6、GLM-5/5.1、Grok 4.3 全部漏掉。

**修复**：本轮一次性补 7 个 spec（DeepSeek-V4-Pro/Flash, Qwen3.5/3.6, GLM-5/5.1, Grok-4.3）+ 反向更新 8 个 benchmark 页（SWE-bench-Verified/Pro, HLE, GPQA, AIME, MathVision, MMMU, Codeforces）。

**Hard rule（强制约束）**：
1. **任何 model spec 类工作之前，必须先做"截至 today 的旗舰模型清单"扫描**——按 vendor 平行 WebSearch（OpenAI / Anthropic / Google / DeepSeek / Alibaba Qwen / Moonshot Kimi / Zhipu GLM / xAI Grok / Doubao 字节 / Meta Llama / Mistral 至少 11 家）。
2. **每个 spec 的 frontmatter `sources` 字段必须至少有 1 个官方 URL**（vendor 官方 docs / blog / HuggingFace org page）。AA / VentureBeat 等第三方源只能作为 secondary，不能作为 sole source。
3. **完成一批 spec 后必须自问 3 次："还有什么 vendor 我没扫？"** 这条规则若不写进 SOP，下次还会漏。
4. **任何 spec 的 confidence 默认 `draft`**，要由人审过实际跑过的 benchmark 数字才能 promote 到 `promoted`。

**预防机制**：
- 在新一轮 model spec 任务开始时，**第一步必须**是 `WebSearch` 11 家 vendor 的"latest model 2026"，**第二步**才是写文件。
- 若用户给的是"补全 / 完善"类指令，**默认含义就是要扫缺漏**，不是只 patch 现有的。

