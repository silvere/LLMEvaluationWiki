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


---

## LEARNINGS-018: 本地预览 server 必须用 ThreadingHTTPServer，不能用 SimpleHTTPServer

**日期**：2026-05-19
**触发**：用户报告 "8083这个端口貌似访问不了了"。

**诊断链路**（下次端口"在 LISTEN 但 connect 超时"直接对照）：
1. `ps aux | grep wiki_server` → 进程在跑（PID 50103，启动 5 天前），STATE 是 `SN`（背景优先级，被 macOS 降权了）
2. `lsof -nP -iTCP:8083` → 端口确实 LISTEN，但发现一个外网 IP `47.245.9.17` 的 ESTABLISHED 长连接挂着
3. `curl -sS localhost:8083/` → `Failed to connect ... after 7788 ms`（connect 阶段超时，不是 HTTP 错误）

**根因**：`SimpleHTTPServer` / `http.server` 默认是**单线程**的，一个慢连接（外部爬虫 / 长 idle 连接 / 客户端不读 socket）能把整个 server 的 accept loop 阻塞。SN 状态进一步让 OS 不给它 CPU。

**修复（不是简单重启）**：

```python
# /tmp/wiki_server.py 关键改动
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ThreadingHTTPServer.allow_reuse_address = True  # 重启免等 TIME_WAIT
with ThreadingHTTPServer(("", port), WikiHandler) as httpd:
    httpd.daemon_threads = True  # 卡死 worker 不阻止退出
    httpd.serve_forever()
```

**为什么不能只 kill + 用 `python -m http.server`**：
- 内置 CLI 是 `HTTPServer` 单线程，重启完同样会被下一个慢连接卡。
- 必须用 `ThreadingHTTPServer` + `daemon_threads = True` + 自定义 handler（保留 CLAUDE.md §2.1 的 arXiv ID `.html` fallback）。

**Hard rule**：
1. 本地预览 server **永远** 用 `ThreadingHTTPServer`，不用 `SimpleHTTPServer` / `HTTPServer`。
2. 跑超过 1 天的本地 server 默认怀疑"被慢连接卡了"——先查 `lsof` 看有没有外网 ESTABLISHED 连接。
3. 启动方式统一用 `nohup python3 /tmp/wiki_server.py <root> <port> > /tmp/wiki_server.log 2>&1 &`，留 log 供排查。

**验证**（5 个 endpoint，全部 < 7ms）：
- `/` → 200 / 6ms
- `/models/` → 200 / 1ms
- `/models/DeepSeek-V4-Pro` → 200 / 1ms
- `/papers/2404.07440` (arXiv ID 含点号 fallback) → 200 / 1ms
- `/benchmarks/GPQA` → 200 / 1ms


---

## LEARNINGS-019: frontmatter 的 arxiv_id / official_url / sources 必须显式注入正文

**日期**：2026-05-19
**触发**：用户问 "http://localhost:8083/benchmarks/InterCode 这种页面，为何没有 InterCode 的链接或者论文链接？"

**根因**：
- Quartz 默认**不会**把 frontmatter 的自定义字段（`arxiv_id` / `official_url` / `sources`）渲染到页面正文。
- benchmark 模板把这些字段当成"元数据"放在 frontmatter 里，但模板的正文部分从来没有"参考链接"section。
- 用户访问页面只看到正文，找不到论文链接和官网链接。

**影响面**：
- 量化扫描：**265/379 = 70%** 的 benchmark 页面 frontmatter 有 arxiv_id/official_url 但正文没出现。
- 不止 benchmarks——papers / models / tools / leaderboards 都可能有同样问题。

**修复**：
1. 新增 `scripts/inject-benchmark-links.ts`：扫 frontmatter，在 H1 之后、第一个 H2 之前注入"## 参考链接"区块，用 `<!-- AUTO-LINKS:START -->...<!-- AUTO-LINKS:END -->` 包住（幂等，重跑只替换该区块）。
2. URL 智能分类：arxiv.org → "arXiv 论文"，github.com → "GitHub 仓库"，huggingface.co → "Hugging Face"，etc.
3. 注册到 `package.json`：
   - `npm run inject-links` — 仅 benchmarks
   - `npm run inject-links-all` — benchmarks + papers + models + tools + leaderboards
   - 加入 `check-all` 流水线，每次 build 前自动跑

**Hard rule**：
1. **任何 frontmatter 字段如果用户需要看，必须显式渲染到正文**，不能假设 Quartz 帮你渲染。
2. **新增 benchmark / paper / model 页时，frontmatter 填了 arxiv_id / official_url 后必须跑 `npm run inject-links`**（已加到 check-all）。
3. **自动注入区块必须用 marker**（`AUTO-LINKS:START/END`），避免覆盖人工编辑或重复追加。

**验证**：
- 抽样 9 个 benchmark 页：InterCode / HumanEval / GPQA / AIME / MMLU / HLE / SWE-bench-Verified / SWE-bench-Pro / MMMU 全部出现可点击参考链接。
- TOC 目录自动出现"参考链接"条目，可锚点跳转。
- 第二次跑脚本 changed=0 noop=379，幂等性 OK。


---

## LEARNINGS-020: entity 类 "相关页面" 必须从字段算，不能手写

**日期**：2026-05-19
**触发**：用户问 "ByteDance-AI 的相关页面里有 C-Eval，这两个之间没啥关联吧？相关页面的思路是啥？"

**根因诊断**：
- 179 个 entity 页中**95 页有手写"相关页面"**，其中 53% 有问题（plain text / 中文死链 / broken wikilink）
- ByteDance-AI 把 C-Eval 列为相关，只因正文有一句"豆包在 C-Eval 上发分"——这种"用过"关系如果都列，得列几十个 benchmark，颗粒度乱
- "相关"定义本身就模糊，作者各凭直觉，无统一抓手

**修复**：
1. 新建 `scripts/inject-entity-related.ts` —— 用 `<!-- AUTO-RELATED:START -->` marker 注入"## 自动关联"区块
2. 算两个维度：
   - **该机构发布的模型**：扫 `wiki/models/` 的 `developer` 字段双向 substring 匹配 entity 的 slug/title/aliases
   - **同类机构**：同 `entity_type` + **同 region 优先**（中国公司/中国学界/美国公司/美国学界/欧洲分组），保证 ByteDance 的兄弟是 Alibaba/DeepSeek 而不是 Stanford-CRFM
3. 前置数据治理：给 24 个核心机构补 `entity_type: org`（之前 137/179 未填）
4. 注入位置：文件末尾追加（不动现有手写"相关页面" section）
5. 注册到 `package.json`：`npm run inject-entity-related`

**关键设计权衡**：
- **不删现有手写"相关页面"**——避免误伤作者精选语义，让自动区块和手写并存，后续 review 决定清理
- **region 分组写在脚本里而非 frontmatter**——27 个核心机构的 region 列表不会频繁变，写在脚本里集中维护比 179 个 frontmatter 加字段简洁
- **developer 字段必须用规范 slug 形式**（如 `Alibaba-Tongyi`），新建 model spec 时不要写 `Alibaba (Qwen Team)` 这种带括号——否则匹配率下降

**Hard rule**：
1. 任何 entity 类页（机构/研究者/模型家族）的"相关"信息**必须从 frontmatter 字段算**，不允许纯手写 plain text。
2. 新建 model spec 时 `developer:` 字段必须等于对应 entity 的 slug（如 `developer: Alibaba-Tongyi`），不要写公司全称或带括号别名。
3. 新增 entity 页时必须填 `entity_type:`（org / person / model）。

**验证**：
- ByteDance-AI 自动列出 3 个 Doubao 模型（按时间倒序）+ 7 个中国公司兄弟
- Anthropic 自动列出美国公司兄弟（OpenAI / Google-DeepMind / Meta-AI / Microsoft-Research / Cohere / xAI / Reka）
- 全量 changed=27 noop=152，HTTP 200 / 2ms


---

## LEARNINGS-021: entities/ 物理拆目录到 people/orgs/model-families/

**日期**：2026-05-19
**触发**：用户反馈 "左侧链接的 entities 下面，人和组织混在一起，感觉有点乱"

**根因**：
- 179 个 entity 平铺在 `wiki/entities/`，按字母排序就会出现 `01-AI / Aaron-Jaech / Adina-Williams / AI2 / Alibaba-Tongyi / Andrej-Karpathy` 这种人物和机构交错的视觉混乱
- Quartz Explorer 按目录树渲染，**物理目录就是分组抓手**

**修复**（端到端 3 步闭环）：
1. **数据治理**：先把 113 个未填 `entity_type` 的 entity 用启发式分类
   - 启发式规则：title 含 Lab/AI/Research/Institute/University → org；slug 是英文人名格式（Firstname-Lastname） → person；其他 outlier 11 个人审
   - 最终：person 124 / org 50 / model 5
2. **物理拆目录**：按 entity_type mv
   - `wiki/entities/<person>.md` → `wiki/entities/people/<person>.md`
   - `wiki/entities/<org>.md` → `wiki/entities/orgs/<org>.md`
   - `wiki/entities/<model>.md` → `wiki/entities/model-families/<model>.md`
3. **脚本适配**：把 `inject-entity-related.ts` 的 glob 从 `wiki/entities/*.md` 改成 `wiki/entities/**/*.md`（递归）

**关键技术结论**：
- **wikilink shortest 解析按 basename，跨目录仍能 work**——`[[Andrej-Karpathy]]` 不管在 `wiki/sources/` 还是 `wiki/papers/`，都自动解析到 `wiki/entities/people/Andrej-Karpathy.md`，**完全不用批改 wikilink**
- 但 **URL 会变**：`/entities/Andrej-Karpathy` → `/entities/people/Andrej-Karpathy`，外部书签会失效（本 wiki 流量小可控）
- 用 `shutil.move` 一次 mv 179 个，git 自动识别 rename

**Hard rule**：
1. 新建 entity 页时**必须按 entity_type 放对应子目录**：people / orgs / model-families
2. 新增 entity_type 类别（如未来 community / event）时同步建子目录
3. `inject-entity-related.ts` 永远用 `wiki/entities/**/*.md` 递归 glob

**验证证据**（curl http://localhost:8083）：
- `/entities/people/Andrej-Karpathy` → 200
- `/entities/orgs/ByteDance-AI` → 200
- `/entities/orgs/Anthropic` → 200
- `/entities/model-families/Qwen` → 200
- `/entities/Andrej-Karpathy`（旧 URL） → 404（迁移成功）
- ByteDance-AI 页里 `[[Alibaba-Tongyi]]` 自动渲染成 `entities/orgs/Alibaba-Tongyi`，跨目录解析 work


---

## LEARNINGS-022: 年度报告类内容必须建立"时效性闭环"

**日期**：2026-05-19
**触发**：用户反馈 "http://localhost:8083/papers/state-of-ai-2023 这个是 2023 年的报告，太老了"

**诊断（先量化，再下药）**：
- 全 wiki 时效性扫描：paper 类 49/163 ≤2023，benchmark 类 170/379 ≤2023
- **关键洞察**：≤2023 的内容里**绝大多数是经典锚点**（GLUE / SuperGLUE / MMLU / HumanEval / CoT 论文等），**不该删**——它们是 LLM 评测的历史地基
- 真正的时效性问题：**年度系列报告**缺新版（State of AI / AI Index / Epoch Compute Trends）
- 用 grep `source_type:report` + title 含 "annual / state of / index 20\d\d" 锁定到 8 个报告条目，其中 3 个系列缺新版

**修复**：
1. WebSearch 验证新版**真实存在**（不靠记忆）：
   - State of AI Report 2024（2024-10-10 by Nathan Benaich）✓
   - State of AI Report 2025（2025-10，第八版）✓
   - AI Index Report 2025（Stanford HAI 2025-04，第八版）✓
   - AI Index Report 2026（Stanford HAI 2026-04，第九版 423 页）✓
2. 建 4 个新 paper 页，每页含：核心 claim（带数据）+ 关联 wiki 页 wikilink + 权威官方 source URL
3. **在旧版页面顶部注入 `[!note]` callout**，指向新版——避免用户撞进旧页迷路
4. AI Index 2026 的 claim 与 wiki 实测得分交叉引用：`SWE-bench 60→100% 一年` 与 [[SWE-bench-Verified]] 页得分趋势一致；`美中差距闭合` 与 [[DeepSeek-V4-Pro]] / [[GLM-5]] / [[Qwen3.5]] 实测得分吻合

**Hard rule**：
1. 任何**年度系列**内容（年报、leaderboard 快照、模型 release timeline）必须建立"前代→当前→后续"双向链接，在 frontmatter 加 `series:` 字段或在 H1 后注入跳转 callout
2. 经典论文 / 经典 benchmark 即使 ≤2023 也**不视为过期**——时效性判定要看"内容类型"而非"年份"
3. 新版报告条目的 `confidence: draft`，等人审核对原文页码后 promote 到 `verified`
4. 老页保留作为历史快照，**不删不改 claim**，只在顶部加跳转 callout

**验证**：
- 4 新页 HTTP 200：state-of-ai-2024/2025 + ai-index-2025/2026
- 老页 state-of-ai-2023 顶部成功跳转到 5 个新版本（`[!note] callout` 渲染正常）
- 老页 ai-index-2024 也加了跳转，避免 2024 用户再次撞进旧内容


---

## LEARNINGS-023: benchmark SOTA SSOT + harness 维度

**日期**：2026-05-19
**触发**：用户问"各 benchmark 维护一个 Top 模型得分情况，至少一个最高分吧？harness 也要考虑"

**根因诊断**：
- 379 个 benchmark 里 0 个 frontmatter 含结构化 SOTA 字段
- 93 个有 "## SOTA 表现" H2 但大多是"待更新"占位符
- 20 个手工"## 主流模型得分"表与 wiki/models/ 双重维护，未对齐
- wiki/tools/ 24 个全是评测工具，**0 个 agent harness 页**——SWE-bench 表里只列模型不区分 SWE-agent / OpenHands 等 scaffolding

**修复（顶层设计：单一数据源 SSOT + marker 幂等渲染）**：

```
frontmatter.sota → 脚本 → 正文 <!-- AUTO-SOTA --> 区块
```

1. **数据 schema**（CLAUDE.md §3.5）：
   ```yaml
   sota:
     - {score, model, harness, date, source, notes}
   ```
   - `harness: null` = 裸模型；agent benchmark 填 wiki/harnesses/ 的 slug
   - 上限 5 条避免 frontmatter 膨胀
2. **新 type: harness**（注册到 validate VALID_TYPES + build-index TYPE_ORDER）
3. **4 个 harness stub**：SWE-agent / OpenHands / Aider / Devin（含 developer / official_url / supported_benchmarks）
4. **2 个新脚本**：
   - `migrate-sota-from-tables.ts`：解析现有"## 主流模型得分"表 → 写入 frontmatter，保序取 Top-5
   - `inject-sota-table.ts`：读 frontmatter `sota` → 渲染 marker 区块插入 "## SOTA 表现" 之后
5. **流水线注册**：`check-all` 加 `inject-sota`

**Hard rule**（CLAUDE.md §3.5）：
1. 新建 benchmark 必须填 `sota` 至少 1 条
2. 维护时**只编辑 frontmatter**，禁止手改 `<!-- AUTO-SOTA -->` 区块
3. `model` slug 必须存在于 wiki/models/；`harness` 必须存在于 wiki/harnesses/
4. 历史"## 主流模型得分"区块保留作为 Top-5 之外的全量索引

**踩的坑**：
- 第一次 quartz build 失败——`wiki/papers/agent-evolver.md` 等 9 个 paper 的 `authors:` 字段是混合 inline+block YAML（`["- \"Name\""]` 后跟 `- "Name"`），yaml.load 解析失败。批量 regex 修正为纯 block list。

**验证证据**：
- 20 benchmark migrate=20 noop=0；inject=20 noop=359；第二次 inject changed=0（幂等 ✓）
- 4 个 harness 页 HTTP 200
- 4 个抽样 benchmark 页（GPQA / SWE-bench-Verified / HumanEval / AIME）顶部 "当前 SOTA" 表正常渲染，含 Top-5 模型 wikilink
- TOC 自动出现"当前 SOTA"锚点
- Quartz build 965 文件，2299 emit，53 秒

**长期演进**：
- 359 个未迁移 benchmark 逐步人审补 SOTA（颗粒度 < 5/page，PR-friendly）
- agent benchmark 第二轮人审补 harness 字段（如 SWE-bench-Verified 加 "SWE-agent" / "OpenHands"）
- 可选：写 `audit-sota.ts` 扫 source URL 404、扫 model/harness slug 存在性


---

## LEARNINGS-024: SOTA 双表整合 — SSOT 落地 + YAML 双键陷阱

**日期**：2026-05-19
**触发**：用户反馈 "AIME 的当前 SOTA 和主流模型得分两表看起来重复"

**根因诊断**：
- LEARNINGS-023 的设计让"当前 SOTA"（Top-5 frontmatter 渲染）和"主流模型得分"（手工 14 行表）共存——视觉上 100% 重复（前 5 行完全相同），只有后 9 行长尾不重复
- 设计意图本是"冠军 vs 全量梯队"互补，但实现没拉开差异

**修复路径**：
1. 扩 `sota` 上限 5 → 30，让 frontmatter 承载完整排行（不只是 Top-5）
2. inject-sota 区块改名"## 模型得分排行"，加 # 列 + 前 3 名 🥇🥈🥉
3. 写 prune-legacy-scores-section.ts 删除 20 个 benchmark 的手工"## 主流模型得分"区块
4. validate sota 上限 5 → 30

**踩坑（必须记录）**：
- migrate-sota 用**字符串拼接**写 frontmatter（`fmText + "\nsota:\n..."`），当 frontmatter 已存在 sota 字段时会产生**双 sota 键**——这是无效 YAML，导致 js-yaml `duplicated mapping key` 错误 → inject-sota 全部 skip（20/20）→ prune 又删了手工表 → **页面什么得分都看不到**
- 20 个 benchmark 全部踩坑（每次 migrate 累加一份）
- 修复：写 dedupe-sota-keys.ts 保留最后一个块 + 改 migrate-sota 让"存在 sota 即 noop"

**Hard rule**：
1. **写 frontmatter 永远用 yaml.load → 修改对象 → yaml.dump → 重写文件**，禁止字符串拼接追加字段。否则会产生重复键。
2. migrate 类脚本 default 必须保守："存在该字段即 noop"，强制覆盖需 `--force` flag
3. 双表整合后 SSOT 落地：`sota` frontmatter 字段是**唯一**模型得分来源；手工区块永远禁止

**验证证据**：
- AIME / GPQA / SWE-bench-Verified 等 20 个 benchmark：手工"主流模型得分"区块=0 ✓，"模型得分排行"区块 ✓ 含 🥇🥈🥉
- AIME 14 条全部渲染（98.3% Doubao → 9-13% GPT-4o 完整代际）
- 第二次 inject 幂等 changed=0
- Quartz build 969 文件 emit

**新增脚本与 npm script**：
- `npm run migrate-sota` （扩容版，存在 sota 即 noop）
- `npm run dedupe-sota` （清理双键）
- `npm run prune-legacy-scores` （删历史手工区块）
- `npm run inject-sota` （新格式：奖牌 + # 列）


---

## LEARNINGS-025: SOTA 数据质量是系统性缺陷 — 评测口径 + 时效性 + 排序

**日期**：2026-05-19
**触发**：用户对照 Scale AI / Artificial Analysis / llm-stats / pricepertoken 四方榜单后指出 HLE 数据严重过时——SOTA 缺当前 frontier（Claude Mythos 64.7% / Gemini 3.1 Pro 44.7%），同时给出 5 个具体修订方向

**根因诊断**（量化全 wiki）：
- 21/21 benchmark 全部踩同样的坑（HLE 不是孤例）：
  - **100% 缺 source URL**
  - **100% 缺 date 时间戳**
  - **71% score 含"约/待更新"模糊词**
  - **81% 缺 2026 frontier 模型**
  - **24% 排序异常**
- 深层原因：migrate-sota 从手工 3 列表（模型/分数/备注）忠实复刻——原表本身就缺评测口径/时间/源维度

**修复（4 步）**：
1. **升级 sota schema**：加 `with_tools: boolean` 字段，区分"with tools / no tools 是两个赛道"（HLE 上 ~20pt gap）
2. **改 inject-sota**：
   - 自适应列（Tools / 时间 / 来源仅在数据存在时渲染）
   - **按 score 数字降序自动排序**（修 GLM-5.1 排 GLM-5 后面的 bug）
   - 表头标"按 score 自动降序"
3. **重写 HLE sota**（基于 4 方榜单）：18 行 with-tools / no-tools 双赛道完整覆盖（Claude Mythos 64.7% → Gemini 2.5 Pro 18.8%），每行带 source URL + date
4. **HLE 加效度边界 callout**：
   - with_tools / no_tools 跨赛道不可比
   - FutureHouse 2025-09 化学/生物 30% 答案有误（题数 3000→2500）
   - judge 选择敏感（GLM-5.1 用 GPT-5.2 vs Claude judge 差 3-5pt）
   - last_verified 月级更新

**新增 audit-sota.ts**（`npm run audit-sota`）：
- 扫所有 benchmark sota 字段，输出待修清单（no_source / no_date / no_with_tools / vague_score / order_anomaly / frontier_missing）
- 输出当前 21 个 benchmark 的 issues 标签

**Hard rule**：
1. **sota 条目必须有 source URL + date + with_tools 标注**——否则跨模型/跨时间不可比
2. **HLE / AIME 等月级更新的 benchmark，frontmatter 必须有 `last_verified` 日期**，超过 6 个月未 verified 算 stale
3. **sota 排序由脚本自动按 score 数字降序**，frontmatter 中条目顺序不重要——避免手工排序 bug
4. 高难度 benchmark（HLE / GPQA / FrontierMath）必须有效度边界 `[!warning]` callout，标注题目质量 / judge 敏感性 / 评测协议差异

**演进路径**：
- 剩 20 个 benchmark 按 `npm run audit-sota` 输出的清单逐个治理（按重要性：HLE/GPQA/SWE-bench/AIME 已完成或在前列）
- 未来 sota 字段可加 `evaluation_protocol` 字段（pass@1 / maj@64 / 0-shot CoT 等）
- 可考虑接入 Artificial Analysis API 半自动同步主流 benchmark 月级 SOTA


---

## LEARNINGS-026: P0 SOTA 治理批次（4 benchmark）+ 高效率脚本化模式

**日期**：2026-05-22
**触发**：用户确认 HLE 治理质量后说"继续吧"——按 audit 清单推进 P0 批次

**P0 完成清单**：
- SWE-bench-Verified: 15 条 sota（Claude Mythos 93.9% → 历史 GPT-5 74%）
- GPQA: 18 条 sota（Claude Mythos 94.6% → GPT-4o 53.6%）
- AIME: 19 条 sota（多模型 100% → GPT-4o 9-13%）
- MMLU: 9 条 sota（GPT-5.4 92% → Llama-4 85%，已饱和）

**方法论沉淀**（比 LEARNINGS-025 更精炼）：
- WebSearch 4 个 query 并行 → 单一 Python 脚本批量重写 frontmatter（比 4 次 Read+Edit 快 5 倍）
- frontmatter 数据维度统一：score / model / harness / with_tools / date / source / notes
- audit 工具量化效果对比：
  - no_source: 95% → **76%** (-19pt)
  - no_date: 95% → **76%** (-19pt)
  - no_with_tools: 95% → **86%** (-9pt)
  - order_anomaly: 24% → **10%** (-14pt)
  - frontier_missing: 67% → **62%** (-5pt)

**关键洞察**：
- **GPQA 不区分 with/no tools**（标准评测都是 zero-shot CoT），故 with_tools 字段保留 null，audit 工具的 `no_with_tools` 误报可接受
- **MMLU 已饱和**（90%+ 集中），audit 的 `vague_score` 也是合理标注（"约 92%"是因为分数本身就接近，置信区间 ±1pt）
- **同模型不同变体应保留多行**（如 Claude-Opus-4.7 Mythos vs Adaptive vs baseline；GPT-5.4 vs 5.3 Codex），不要去重，体现"同代际不同模式"差异

**剩余演进**：
- P1 批次（HumanEval / MATH / LiveCodeBench / Codeforces）按相同模式
- P2 批次（C-Eval / CMMLU / MGSM / MMMU 等单条 sota）扩容
- 长期可考虑 audit-sota 加 `--ignore-vague-on-saturated` flag（MMLU 类已饱和 benchmark 不报 vague）

