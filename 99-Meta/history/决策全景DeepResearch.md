# 从 Karpathy 的 LLM Wiki 到你的评测知识库：一份启动前的全景决策文档

**本文一句话**：把 Karpathy 在 2026-04 公开的 [`llm-wiki.md`](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 三层架构作为**创作工作流**，选 **Docusaurus 3.x + Cloudflare Pages + Pagefind + Giscus** 作为**发布栈**，用"**议题为主轴、模态为标签**"的 IA 组织内容，以 CC BY 4.0 开放授权，第 30 天发布 3–5 篇 flagship 建立人设，第 90 天开源仓库，第 180 天完成从单人到小社区的过渡。本文给出这一路径的完整论证、技术细节、内容清单与返工风险规避清单。

以下章节自成体系，也可并列阅读。

---

# 第一部分｜Karpathy LLM Wiki 理念：这是一套创作哲学，不只是工具推荐

## 为什么要从 Karpathy 的理念开始谈

2026 年 4 月 2 日 Karpathy 发了一条后来被浏览 1600 万次的推文（[原推](https://x.com/karpathy/status/2039805659525644595)），两天后他在 [GitHub Gist 上发布 `llm-wiki.md`](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 作为该构想的"idea file"。这不是一个 launch 一个产品，而是**把一个可以迭代的"理念模板"公开放出来让别人的 Agent 去落地**，这本身就是 2026 年开源协作范式的一次示范——"在 LLM Agent 时代，分享代码的价值正在下降，分享 idea 的价值上升"。

对我们要做的"大模型评测知识库 wiki"来说，Karpathy 的这份 gist 不仅是灵感来源，更是**一份现成的架构骨架**。下面把他的原话与我们项目的映射逐条拆解。

## Karpathy 的四大核心论点（原文直引）

**关于 RAG 的局限**（这是他为什么要写 wiki 的起点）：

> "Most people's experience with LLMs and documents looks like RAG... but the LLM is rediscovering knowledge from scratch on every question. There's no accumulation."

他的诊断是：**RAG 不是知识管理，RAG 是每次查询重新发明轮子。** 评测知识库如果仅靠"把 500 篇评测论文喂进向量库然后让 LLM 每次重新检索"，就永远得不到"对某个 benchmark 污染问题的立场性综述"这种**编译过的知识**。

**关于"编译一次、常保新鲜"**：

> "Instead of just retrieving from raw documents at query time, the LLM **incrementally builds and maintains a persistent wiki** — a structured, interlinked collection of markdown files that sits between you and the raw sources."

他的 wiki 从 100 篇源文档增长到约 **40 万字**（博士论文体量），而他**"没有亲自写过其中一个字"**。所有的 bookkeeping——交叉引用、条目合并、矛盾记录——都由 LLM Agent 完成。

**关于人机分工**（这一句必须贴在评测 wiki 贡献者指南开头）：

> "You never (or rarely) write the wiki yourself — the LLM writes and maintains all of it. You're in charge of sourcing, exploration, and asking the right questions. The LLM does all the grunt work — the summarizing, cross-referencing, filing, and bookkeeping that makes a knowledge base actually useful over time."

**关于三层架构**（直接照抄到评测 wiki 即可）：

> "There are three layers: **Raw sources** — immutable. **The wiki** — a directory of LLM-generated markdown files. **The schema** — a document (e.g. CLAUDE.md or AGENTS.md) that tells the LLM how the wiki is structured."

## Karpathy 的其它可迁移理念

**教科书三层论**（[2025-01-31 推文](https://x.com/karpathy/status/1885026028428681698)）：他把教科书的 background / worked problems / practice 三部分，类比 LLM 训练的 pretraining / SFT / RL。对应到评测 wiki：**每篇条目应同时含阐述（讲清楚在测什么）+ 示例（走一遍完整 prompt→输出→评分）+ 开放题（给读者可探索的争议点）**。这样写出的 wiki 不仅是"知识参考书"，也是"教学材料"。

**nanochat 式的"单一复杂度维度"**：他的 [nanochat](https://github.com/karpathy/nanochat) 只暴露一个 `--depth` 超参，其他自动推导；2026-02-12 发布的 [microgpt](http://karpathy.github.io/2026/02/12/microgpt/) 把 GPT 训练+推理压缩到 200 行纯 Python。他的原话是"**I cannot simplify this any further. Everything else is just efficiency.**"——这告诉我们评测 wiki 的每个条目都应该有一个**"不可再简化的最小复现示例"**（比如"用 20 行代码算一次 MMLU 准确率"），而不是停留在公式。

**\"Eurekas per second\" 作为 KPI**（[Dwarkesh 访谈](https://www.dwarkesh.com/p/andrej-karpathy)）：他衡量教学产品的指标是"每秒顿悟数"，对应到评测 wiki 就是"读者读完这一页，是否解决了一个长久以来的困惑？"——每页底部建议放 reaction 按钮（🤯/🤔/😴），数据直接驱动 lint agent 的优先级。

**Git 历史即课程**：他的 [build-nanogpt](https://github.com/karpathy/build-nanogpt) 刻意保持 commit 的可教学性——"The git commits were specifically kept step by step and clean so that one can easily walk through the git commit history."——对应到评测 wiki：**Conventional Commits + 有叙事的 PR 描述**不只是规范，而是内容本身的一部分。

## 从 Karpathy 到评测 wiki：十五条可操作的设计原则

我把 Karpathy 的推文、Gist、博客、GitHub README、Dwarkesh 访谈的所有理念压缩成 15 条可直接执行的设计原则——这是评测 wiki 的"宪法"：

**源数据不可变，生成层可重编译**。`raw/` 层存论文 PDF、官方 leaderboard JSON 快照、arxiv 链接档——只读；`wiki/` 层存 LLM 与人协作生成的 markdown——随时可 rebuild。

**拒绝纯 RAG 作为主入口**。读者的主要消费方式是"浏览一个合成过的、有立场的页面"，不是"对着一堆 PDF 提问"。

**人类 curate，LLM file**。人决定收录哪个 benchmark、写入何种立场；LLM 做格式化、交叉链接、stale detection、矛盾检测。

**渐进式披露，单一复杂度旋钮**。每页开头 TL;DR（1 句话）→ 核心设定（3 段）→ 细节争议（可折叠）→ 可运行复现（外链 Colab）。

**从第一性原理重建**。每个指标（perplexity / pass@k / FAD / BT-Elo）必须附可运行的最小代码，而非只停留在公式。

**可执行代码 + 叙事解释融合**。每个 benchmark 条目不只是 markdown，还带一键 Colab 或 Pyodide REPL。

**纯文本 markdown 作为护城河**。拒绝 Notion / Roam / 任何专有格式；git + markdown + 可换前端。

**index.md 内容导航 + log.md 时序日志**。在 ~200 页以内规模，这对 LLM Agent 够用；超过再加 BM25/embedding 辅助。

**Lint 作为一等公民**。CI 每周跑一次 LLM lint：哪些条目超 90 天未更新？哪些 benchmark 已证实污染但 wiki 仍推荐？哪两页数据相互矛盾？

**可视化优先于公式**。每个指标至少配一张"小模型规模曲线"或"饱和点"图；效仿 [3Blue1Brown](https://www.3blue1brown.com/) 与 [Distill](https://distill.pub/) 风格。

**教科书三层结构**。每篇 = Exposition + Worked Problems + Practice。

**理解 > 使用**。页面目标不是"一行命令调 API 跑评测"，而是"让读者明白评测为何这么设计、它会在哪里误判"。

**Idea file 替代产品**。为每类评测模式（"如何设计 agent eval""如何做 LLM-as-judge 校准"）写 idea file，让读者的 Agent 在自己的场景里展开。

**Eurekas per second 作为产品 KPI**。每页 reaction 按钮的数据作为选题与重写优先级输入。

**敢于 hacky、迭代 > 完美**。Karpathy 自己都说 llm-wiki "是一堆 hacky 脚本"——MVP 不追求覆盖全、UI 精美；先把 20 个核心 benchmark 跑通三层架构。

## 评测 wiki 的 Karpathy-style 目录模板

把上述原则落地，目录树直接推荐：

```
llm-eval-wiki/
├── raw/                       # 不可变：论文 PDF、官方 repo 快照、leaderboard JSON
│   ├── papers/                # 按 arxiv ID 命名的 PDF
│   ├── benchmarks/            # 官方 spec 和示例
│   ├── transcripts/           # 相关播客与讲座文字稿
│   └── assets/                # 图片本地化备份
├── wiki/                      # LLM + 人编译的 markdown
│   ├── benchmarks/            # 每个 benchmark 一页
│   ├── concepts/              # 污染、效度、pass@k、BT 模型
│   ├── entities/              # 人名、机构、模型
│   ├── comparisons/           # "MMLU vs MMLU-Pro"、"Arena vs MT-Bench"
│   └── synthesis/             # 综述级长文："2026 评测现状"
├── index.md                   # 全站目录（LLM 首读）
├── log.md                     # 时序 append-only 日志
└── AGENTS.md                  # 给 Agent 看的 schema 和工作流说明
```

这个结构**和最终面向读者的 Docusaurus 站点目录不是同一个**。`raw/` + `wiki/` + `AGENTS.md` 是**作者本地的创作工作流**（用 Obsidian + Claude Code 管理），经人工精炼和 review 后**才会 sync 到发布仓库**。这是一个重要的分离：**内部 wiki 是"流"，发布 wiki 是"成品"**。Karpathy 的 gist 评论区有人（@kepano）特别强调了这一点——**把 LLM-generated 的 vault 与人手写的 vault 分开**，避免污染来源可追溯性。我们完全照搬：发布仓库的每篇 frontmatter 加 `author_mode: llm | human | mixed`。

---

# 第二部分｜对标 17 个成功知识库：提炼最佳实践与反模式

Karpathy 的理念告诉我们"为什么"，下面通过对 17 个成功技术知识库/博客的一手考察告诉我们"怎么做"。按优先级陈述关键发现。

## Lilian Weng：单人深度综述的工业标准

[lilianweng.github.io](https://lilianweng.github.io/) 是 AI 单人博客的黄金标准。技术栈 **Hugo + PaperMod + GitHub Pages**，极简：Posts / Archive / Tags / FAQ 四项导航。URL 格式 `/posts/YYYY-MM-DD-slug/`。每篇顶部显式 `Date | Estimated Reading Time | Author`。关键产出数据（实测 Archive 页）：**2021 年 6 篇，2022 年 4 篇，2023 年 3 篇，2024 年 3 篇**，平均每篇 **20–45 分钟阅读时长**（5000–12000 英文词）。据她访谈估计**单篇耗时数周到两个月**。

她的独特做法值得完全复制：**每篇附 BibTeX 引用块**（让学者能规范引用）、文章顶部内嵌 `[Updated on YYYY-MM-DD]` 版本日志（Diffusion 那篇被更新 4 次）、致谢显名同事作为 mini peer review（"Special thanks to John Schulman for direct edits on this post"）。

**给我们的启示**：不要把 wiki 想象成"百科全书式的条目堆"，而是"每篇是一篇能被引用的综述"。评测 wiki 的 flagship 条目（比如"LLM-as-Judge: 偏差全景与校准"）应按这个模式做成**可被 arXiv 论文引用的综述**，而不是"字典条目"。

## Hugging Face 生态：多产物互联的典范

HF 的 [blog](https://huggingface.co/blog) / [learn](https://huggingface.co/learn) / [cookbook](https://huggingface.co/learn/cookbook) / [Open LLM Leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard) 是一个**紧密互联的生态**。blog 仓库在 [`huggingface/blog`](https://github.com/huggingface/blog) 公开，所有文章都是 markdown；cookbook 仓库在 [`huggingface/cookbook`](https://github.com/huggingface/cookbook)，每个 recipe 是端到端 Jupyter Notebook，图片放独立 `cookbook-images` dataset 仓库。这是一个被验证过的可扩展文档工程范式。

**Open LLM Leaderboard v2** 值得特别学习：它以 **HF Space（Gradio app）** 部署，核心数据以 **两个 HF Dataset** 暴露：[`open-llm-leaderboard/results`](https://huggingface.co/datasets/open-llm-leaderboard/results) + `.../requests`。这个"**展示层 Gradio + 数据层 Dataset**"的解耦是评测 wiki leaderboard 页面的直接样板——我们不在 HTML 里硬编码分数，而是构建时从 YAML/CSV 读、运行时从 HF Dataset 拉更新。

## Papers with Code 的数据模型，以及它的教训

[paperswithcode.com](https://paperswithcode.com) 的核心贡献是把论文-代码-benchmark-数据集四者用 `<Task, Dataset, Metric>` 三元组模型统一起来。**但它于 2025 年 7 月 24 日在无预告下被 Meta 关停，重定向到 HF Trending Papers**。这给了我们两个相反方向的教训：**数据模型值得偷师，托管模式绝不可学**。

**反模式警告**：永远不要把关键基础设施押在单一商业公司的"公益承诺"上。评测 wiki 的所有数据必须**随时可导出**——建议每周 GitHub Actions 跑一次自动快照打包成 GitHub Release + 同步到 HuggingFace Dataset。

## Distill.pub 的奇迹与归档

[Distill.pub](https://distill.pub) 是可视化 ML 内容的巅峰，但 2021 年[官方宣布 Hiatus](https://distill.pub/2021/distill-hiatus/)。核心原因：**编辑志愿者 burnout**（每篇 50+ 小时 mentoring 不可持续），以及发现"**自发布**（David Ha 的 World Models 就是单页网站）效果几乎一样好"。

**给我们的启示非常明确**：不要把"同行评审"做成准入门槛；改为"发布→公开 Issue 讨论→PR 修正"的异步流水线。评测 wiki 的每篇文章应有 `status: draft | reviewed | canonical` 三级分层，允许 draft 级先上线、后期迭代——这也是 Anthropic 的 [transformer-circuits.pub](https://transformer-circuits.pub) "Circuits Updates" 月度系列的做法：**区分"论文级"和"组会级"两种产出**，让小成果也能见光。

## Jay Alammar 与 Sebastian Raschka：个人品牌的两条路

[Jay Alammar](https://jalammar.github.io) 的 Illustrated 系列是可视化驱动文章的典范，技术栈 **Jekyll + GitHub Pages**（fork 自 [jekyll-now](https://github.com/barryclark/jekyll-now)），CC BY-NC-SA 4.0。他的做法有两点特别值得借鉴：**系列文章用统一的视觉语言**（颜色/图例一致）让彼此互为 callback；**文章顶部列出所有社区翻译版本**（中/法/韩/日/俄/西/越/阿），鼓励分发。

[Sebastian Raschka](https://magazine.sebastianraschka.com) 走订阅制（$6/月, 18 万免费订阅 + 1000+ 付费）。他的可持续节奏是：**严格月频 + 6 月/12 月发年度 Papers 综述**；配套 GitHub 仓库 [`rasbt/LLMs-from-scratch`](https://github.com/rasbt/LLMs-from-scratch) 让读者能跑代码。一人兼顾博客、书、研究——他的诀窍是"**固定节奏 + 每篇产出都有跨产品复用价值**"。

## 中文世界的独特玩法

[Datawhale](https://github.com/datawhalechina) 提供了一个**开源教程如何组织**的教科书式示范：199+ 仓库，每个项目独立仓库 + `README`（中英）+ `docs/` + `.github.io/{project}` 在线阅读 + PDF releases + 社群二维码入口。**DOPMC**（Datawhale 开源项目管理委员会）协调跨项目决策。**贡献者按章节精确署名**——每个教程列出 Project Leader、Prospective Member、Core Contributors。代表项目如 [self-llm](https://github.com/datawhalechina/self-llm)、[leedl-tutorial](https://github.com/datawhalechina/leedl-tutorial)、[happy-llm](https://github.com/datawhalechina/happy-llm) 都值得作为 UI 与运营参考。

[动手学深度学习 d2l.ai](https://zh.d2l.ai) 的关键启示是**中英双仓独立演化**（`d2l-en` 和 `d2l-zh` 是两个独立仓库，章节编号对齐，允许不同节奏），而非单仓 i18n。这是我们项目应采纳的双语策略。

## 横向对比表：关键数据一目了然

| 对象 | SSG | 评论 | 搜索 | 许可 | 年产出 |
|---|---|---|---|---|---|
| Lil'Log | Hugo + PaperMod | 无 | 内建 | — | 4–8 篇 |
| HF Blog | 自建 | HF Hub | HF 搜索 | 多样 | 100+ |
| Distill | Distill Template | GH Issues | 无 | CC BY | 10–20（鼎盛） |
| Transformer Circuits | Distill 变体 | 无 | 无 | — | 月更 + 季度重磅 |
| EleutherAI Blog | Hugo | 无 | 内建 | — | 10–15 篇 |
| Ahead of AI | Substack | Substack | Substack | 付费 | 月更 + 加餐 |
| Jay Alammar | Jekyll | GH Discussions | 无 | CC BY-NC-SA | 3–6（黄金期） |
| Chip Huyen | Jekyll | Discord | 无 | 保留 | 月更 |
| Datawhale | docsify/MkDocs | Issue/群 | 无 | CC BY-NC-SA | 多项目并行 |
| d2l.ai | d2lbook | Discourse | Sphinx | CC BY-SA | 整本书级 |

## 必须避免的五条反模式

**反模式一：用"期刊式同行评审"作为准入门槛**——Distill 的覆灭教训。改为异步 + 分层（draft/reviewed/canonical）。

**反模式二：关键基础设施托管在单一商业公司**——Papers with Code 的覆灭教训。数据必须随时可导出，建议每周自动快照。

**反模式三：首发即追求永久成品形态**——The Gradient 2018 Distill Prize 评不出的教训。允许 "WIP" 标签，让不同成熟度内容都能被接纳。

**反模式四：评测条目与讨论/社区完全割裂**——机器之心式的"纯媒体"教训。每个 benchmark 页下方都应有 Giscus/Discussions 入口，永久可搜索。

**反模式五：单仓多语言 i18n 混合**——强行同步导致翻译长期滞后成"半僵尸"。采用 d2l.ai 式双仓对齐 + frontmatter 标记 last-synced commit。

---

# 第三部分｜评测领域的知识边界：wiki 的内容骨架

我们要覆盖的评测世界比大多数人想象的要大。按内容模块细化到可直接填充的程度。截至 2026 年 4 月的事实数字均已核验。

## 评测基础理论：读者最常忽视、但最不应缺席的章节

这部分要讲的不是某个 benchmark，而是**评测作为一门科学**的底层方法论。建议细分七个子章节。

**测量学基础**：信度（test-retest、inter-rater、internal consistency）、效度（construct / content / criterion / face）、可复现性（rerun / replication / conceptual）。LLM 特有现象：[τ-bench](https://arxiv.org/abs/2406.12045) 引入的 **pass^k** 指标——同一任务重复 k 次都通过——是对信度的直接操作化，即使最强模型（Claude Opus、GPT-5）在多轮重复中仍有显著退化。

**统计推断**：bootstrap 置信区间（Chatbot Arena 的做法）、McNemar / permutation test、功效分析。一个具体教训：MMLU 标准 CI 约 ±1%（14k 问题），因此 GPT-5.4 的 92% 与 Claude Opus 4.5 的 91% **在统计上不可区分**——这直接决定了"饱和"的定义。许多 benchmark（HumanEval 164 题、GPQA Diamond 198 题）power 实际很低，Δacc=1% 下 80% power 需要 2000+ 样本。

**Benchmark 病态与滥用**：Goodhart's Law、benchmark gaming、数据污染。典型案例：Kimi K2 在 HLE 报告 50% 但独立测试仅 29.4%；OpenAI 审计发现所有前沿模型能逐字复现 SWE-Bench Verified 的 gold patch；ARC Prize 2025 技术报告（[arXiv:2601.10904](https://arxiv.org/abs/2601.10904)）创造的"**knowledge-dependent overfitting**"概念——即使有 private set，若 public train 与 private test 过于 i.i.d. 且模型见过大量公共领域，依然可被 overfit。

**心理测量学对 LLM 评测的启示**：IRT（Item Response Theory）2PL/3PL 模型估计每题的 difficulty、discrimination、guessing，以及模型的潜在能力 θ。相关应用：TinyBenchmarks（[Polo et al. 2024](https://arxiv.org/abs/2402.14992)）、MetaBench、MEDIRT。核心意义是**用更少的题测更稳定的能力** + **识别"坏题"**（负 discrimination）+ **实现自适应测试（CAT）降低 70–90% 评测成本**。

**评测设计原则**：盲评（Chatbot Arena 的匿名对战）、随机化（选项顺序是 MMLU 偏差的主要来源）、counterbalancing。

**内部效度 vs 外部效度**：Anthropic 公布的 τ-bench 分数比 Alan/Medium 第三方复现高 10 个点，原因是 prompt optimization 未公开——这是典型的内部效度威胁。[GAIA](https://arxiv.org/abs/2311.12983) 的哲学正是 ecological validity——"对人类简单但繁琐"的任务。

**评测哲学基础**：留给第七部分深入。

## 文本评测：前 15 个 benchmark 的状态表

下表是截至 2026-04-23 的 snapshot，所有 SOTA 为 self-reported，scaffold 各异不可直接对比。

| Benchmark | 领域 | 规模 | SOTA | 饱和? | 污染 | 论文 |
|---|---|---|---|---|---|---|
| **MMLU** | 多学科 | 14k | ~92% | ✅ | 严重（6.5% 标错） | [2009.03300](https://arxiv.org/abs/2009.03300) |
| **MMLU-Pro** | 推理升级 | 12k | ~90% | 接近 | 中 | [2406.01574](https://arxiv.org/abs/2406.01574) |
| **MMLU-Redux** | 纠错版 | 5.7k | ~93% | 未 | 低 | [2406.04127](https://arxiv.org/abs/2406.04127) |
| **GPQA Diamond** | 博士 STEM | 198 | ~89% | 接近 | 中 | [2311.12022](https://arxiv.org/abs/2311.12022) |
| **MATH** | 竞赛数学 | 12.5k | ~95% | ✅ | 严重 | [2103.03874](https://arxiv.org/abs/2103.03874) |
| **FrontierMath** | 研究数学 | 300+50 | 50% (T4 38%) | ❌ | 低（私有） | [2411.04872](https://arxiv.org/abs/2411.04872) |
| **HumanEval** | 函数级代码 | 164 | >95% | ✅ | 严重 | [2107.03374](https://arxiv.org/abs/2107.03374) |
| **LiveCodeBench** | 动态竞赛 | 滚动 | ~80% | 部分 | 设计防污染 | [2403.07974](https://arxiv.org/abs/2403.07974) |
| **SWE-Bench Verified** | 真实 GitHub issue | 484 | 87.6% (Opus 4.7) | 接近 | 严重 | [2310.06770](https://arxiv.org/abs/2310.06770) |
| **SWE-Bench Pro** | 多语防污染 | 1865 | 64.3% | ❌ | 设计防污染 | Scale AI |
| **Chatbot Arena** | 人类偏好 | 6M+ votes | 动态 Elo | 持续 | 低 | [2403.04132](https://arxiv.org/abs/2403.04132) |
| **MT-Bench** | LLM-judge 多轮 | 80 | >9.5/10 | ✅ | 有 | [2306.05685](https://arxiv.org/abs/2306.05685) |
| **Arena-Hard** | Arena 精选硬题 | 500 | >90% | 部分 | 低 | LMSYS |
| **AlpacaEval 2.0 LC** | 长度去偏 judge | 805 | 70%+ | 部分 | 有 | [2404.04475](https://arxiv.org/abs/2404.04475) |
| **ARC-AGI-2** | 流体智能 | — | 54% / Kaggle 24% | ❌ | 设计防污染 | [2505.11831](https://arxiv.org/abs/2505.11831) |
| **Humanity's Last Exam** | 专家学术 | 2500+私 | 48.1% | ❌ | 私有 holdout | [2501.14249](https://arxiv.org/abs/2501.14249) |
| **LongBench** / **RULER** | 长文本 | — | NIAH 饱和 / RULER 32K+ 降级 | 部分 | 设计防污染 | [2404.06654](https://arxiv.org/abs/2404.06654) |
| **IFEval** | 指令遵循 | 541 | ~90% | 部分 | 中 | [2311.07911](https://arxiv.org/abs/2311.07911) |
| **LiveBench** | 动态多域 | 月更 | ~70% | 防饱和 | 月更防污染 | [2406.19314](https://arxiv.org/abs/2406.19314) |
| **HELM** | 多指标框架 | 42 scenarios | 持续 | N/A | 各异 | [2211.09110](https://arxiv.org/abs/2211.09110) |

**MVP 阶段前 15 个 benchmark 写作优先级**（按影响力 × 未饱和 × 方法论示范价值综合）：

第一梯队（**必须 flagship 级**）：MMLU + MMLU-Pro / Chatbot Arena / SWE-Bench Verified + Pro / HLE / HELM / ARC-AGI-2。这六个合起来撑起评测 wiki 的骨架：知识广度、人类偏好、Agent 编程、专家前沿、多指标哲学、流体智能。

第二梯队（**标准条目级**）：GPQA + Diamond / FrontierMath / LiveCodeBench + LiveBench / τ-bench / GAIA / MMMU + MMMU-Pro。

第三梯队（**支撑条目**）：OSWorld / RULER + NIAH / IFEval。

## 多模态评测：图文、视频、音频的不同病理

**图文评测**已相对成熟但大面积饱和。核心清单：[MMMU](https://mmmu-benchmark.github.io/) + MMMU-Pro（Gemini 3.1 Pro 82%）、[MMBench](https://github.com/open-compass/MMBench)（~90%）、[MME](https://arxiv.org/abs/2306.13394)、[SEED-Bench](https://arxiv.org/abs/2307.16125)、DocVQA（~95% ANLS 饱和）、ChartQA（~90%）。幻觉专用：[POPE](https://github.com/RUCAIBox/POPE)（~90% F1）、[HallusionBench](https://github.com/tianyi-lab/HallusionBench)（~70%，尚未饱和）。数学+视觉：[MathVista](https://mathvista.github.io)（~80%）、MATH-Vision（~60%，未饱和）、OlympiadBench（~50%）。

**视频评测**是 2026 最值得深挖的方向。**生成侧**的经典指标 FVD / CLIPSIM / Inception Score 对 motion coherence 和 object permanence 几乎无鉴别力——**2024 年后仅报告 FVD/CLIPSIM 不汇报 VBench/人评结果的论文，应当被视为 methodologically inadequate**，wiki 应明确表态。[VBench](https://github.com/Vchitect/VBench)（Huang et al. 2023, [2311.17982](https://arxiv.org/abs/2311.17982)）的 16 维度拆解是事实标准；[VBench-2.0](https://arxiv.org/abs/2503.21755) 引入 Physics、Commonsense、Creativity，标志着从 "superficial faithfulness" 向 "intrinsic faithfulness" 的转向。物理专用：[VideoPhy](https://videophy.github.io/)、PhyGenBench；组合生成：[T2V-CompBench](https://arxiv.org/abs/2407.14505)；时序变化：[ChronoMagic-Bench](https://arxiv.org/abs/2406.18522)。**理解侧**：[Video-MME](https://video-mme.github.io)（手工标注跨时长 11 秒–1 小时，~80%）、[MVBench](https://arxiv.org/abs/2311.17005)、[EgoSchema](https://arxiv.org/abs/2308.09126)、DeepMind 的 [Perception Test](https://github.com/google-deepmind/perception_test)、[TempCompass](https://arxiv.org/abs/2403.00476)（时序推理）。

**视频的独特成本/挑战**：Video-MME 长视频全套跑 Gemini 级模型需要数百 GPU 小时，人评时间从图像的 3 秒/张跳到 30 秒–3 分钟/段，Krippendorff's α 常 <0.5。评测 wiki 应明确提醒：Sora、Veo 2/3、Kling、Runway Gen-3、Luma、Pika 的宣传数字大部分来自 cherry-picked 展示，**学术 benchmark 数字与用户体感鸿沟巨大**。

**音频评测**分五个子域。**语音 ASR**：WER / CER + LibriSpeech / CommonVoice / GigaSpeech，已较成熟；低资源 + code-switching + 口音鲁棒性是新战场（FLEURS、SEAME）。**TTS**：主观 MOS / CMOS，自动化预测靠 [UTMOS](https://github.com/tarepan/SpeechMOS)（但高质量区 MUSHRA >80 饱和严重）、NISQA、DNSMOS。**音乐生成**：FAD、CLAP Score、[MusicCaps](https://www.kaggle.com/datasets/googleai/musiccaps)，但 Suno/Udio 事实上以人评为主，客观指标对 prosody/rhythm/harmony 仍不可靠。**通用音频理解**：[MMAU](https://mmaubench.github.io/)（[2410.19168](https://arxiv.org/abs/2410.19168)，Gemini 1.5 Pro 66.15% vs 人类 82.23%）、[MMAU-Pro](https://arxiv.org/abs/2508.13992)（5305 实例、49 技能、最长 10 分钟 clips、Qwen2.5-Omni-7B 52.2%）。**端到端语音 LLM**（GPT-4o Voice / [Moshi](https://kyutai.org/Moshi.pdf) / GLM-4-Voice / Step-Audio 2）：turn-taking、barge-in、emotion、paralinguistic control、**text-dominance / modality arbitration** 是 2026 年最前沿维度。

## Agent 评测：scaffold 比模型重要、污染漏洞遍地

| Benchmark | 领域 | SOTA 2026-04 | 已知问题 | 论文 |
|---|---|---|---|---|
| **WebArena** | 真实网站 | ~50–60% | eval() 注入漏洞 | [2307.13854](https://arxiv.org/abs/2307.13854) |
| **OSWorld Verified** | 真实 OS | 76.26% | VM state 污染 | [2404.07972](https://arxiv.org/abs/2404.07972) |
| **GAIA** | 通用助手 | ~98% | HF 答案泄露 + normalize_str 漏洞 | [2311.12983](https://arxiv.org/abs/2311.12983) |
| **τ-bench** | 客服对话 | Opus >70% | Anthropic 未公开 prompt 优化 | [2406.12045](https://arxiv.org/abs/2406.12045) |
| **τ²-bench** | 双控客服 | ~60% | 新 | [2506.07982](https://arxiv.org/abs/2506.07982) |
| **MLE-Bench** | ML 工程 Kaggle | 16.9% | familiarity 实验 | [2410.07095](https://arxiv.org/abs/2410.07095) |
| **Terminal-Bench** | 复杂终端 | ~82% | curl hack | [tbench.ai](https://tbench.ai) |
| **AppWorld** | 交互 coding | ~40% | — | [2407.18901](https://arxiv.org/abs/2407.18901) |

**Agent 评测的核心启示**：scaffold 差异可达 20+ 个百分点（SWE-Bench 的 mini-agent bash-only vs Claude Code vs Codex harness）；Berkeley RDI 2025 系统性揭示 WebArena、OSWorld、SWE-bench、Terminal-Bench 均有不同程度 **eval 漏洞**——这是一个专门的子章节话题。trace-based evaluation 分 trajectory correctness / step-wise / episode-wise 三类。

## LLM-as-Judge：评测 wiki 最难写、但最不可缺的章节

这是整个评测领域 2024–2026 年变化最快的方向（6 个主要 survey 版本、20+ benchmark、50+ bias mitigation 方法），也是评测 wiki 最核心的方法论章节。

**基础范式**：pairwise（与人评一致性 80–85%，成本 O(n²)）、pointwise（成本 O(n) 但分数稳定性差）、listwise（RewardBench 2 开始用，permutation consensus 优势）。开山之作：[Zheng et al. NeurIPS 2023](https://arxiv.org/abs/2306.05685)。

**已知偏差**必须系统梳理：

- **位置偏差**：[Shi et al. 2024](https://arxiv.org/abs/2406.07791) 在 15 judges × 22 任务 × 40 candidates × ~150k 实例上证明 position bias 非随机；单纯交换候选顺序可使代码评测 accuracy 变化 >10%。
- **长度/冗长偏差**：[Length-Controlled AlpacaEval](https://arxiv.org/abs/2404.04475) 把 baseline 提示为 "as much detail as possible" 能将 win-rate 从 50% 拉到 64%，提示简洁降到 23%。引入 GLM 长度控制将 Spearman 与 Chatbot Arena 相关从 0.94 提升到 0.98。
- **自我偏好偏差**：GPT 判 GPT、Claude 判 Claude 倾向加 3–7 分。
- **风格偏差**（Markdown、emoji、列表、粗体）：LMArena 2024-08 发布 [Style Control 博客](https://blog.lmarena.ai/blog/2024/style-control/)——在 Bradley-Terry 中加入 length、header、list 计数作为独立变量；style-controlled 后 GPT-4o-mini、Grok-2-mini 下跌，Claude 3.5 Sonnet、Llama-3.1-405B 上升。
- **授权偏差**：引用权威（"According to Nature..."）导致 judge 高估。

**校准与缓解**：position swap 双向评测、rubric-based vs holistic（Prometheus 证明 rubric-conditioned scoring 相关性提升 >0.2）、MoA-Judge（[Verga et al. 2024](https://arxiv.org/abs/2404.18796) "Replacing Judges with Juries"）、Reasoning Judge（RL 训练 judgement thinking）、Permutation-consensus listwise。

**Weak-to-Strong**：[OpenAI Superalignment 论文](https://arxiv.org/abs/2312.09390)（GPT-2 监督 GPT-4 恢复大部分 GPT-3.5 能力）；[Meta Self-Rewarding LM](https://arxiv.org/abs/2401.10020)（Iterative DPO 打败 GPT-4 0613）。

**关键 judge benchmark**：[MT-Bench](https://arxiv.org/abs/2306.05685)、[Arena-Hard](https://www.lmsys.org/blog/2024-04-19-arena-hard/)（与 Arena 一致性 89.1%）、[AlpacaEval 2.0 LC](https://tatsu-lab.github.io/alpaca_eval/)、[JudgeBench](https://arxiv.org/abs/2410.12784)、[Prometheus 2](https://github.com/prometheus-eval/prometheus-eval)、[RewardBench](https://github.com/allenai/reward-bench) + RewardBench 2、BIGGEN Bench、M-Prometheus、[CompassJudger-1](https://arxiv.org/abs/2410.16256)。

综述推荐：[Gu et al. 2024 survey](https://arxiv.org/abs/2411.15594)、[Li et al. 2024](https://arxiv.org/abs/2412.05579)、[Awesome-LLMs-as-Judges](https://github.com/CSHaitao/Awesome-LLMs-as-Judges)。

## 人工评测：工业真相与容易被忽略的数学

**质控流程**：双标 / 三标 / 黄金集。黄金集 50–200 题盲插，session 里 10–20%；标注员 <80% 准确率暂停。一致性统计：**Cohen's κ**（二元）、**Fleiss' κ**（多人名义）、**Krippendorff's α**（任意规模/测量级/缺失数据，阈值 0.667 tentative、0.800 reliable）。LMArena 内部 Krippendorff α >0.6 可接受；Anthropic RLHF κ >0.7；MT-Bench agreement 80% 视为可用。核心参考：[Artstein & Poesio 2008 综述](https://aclanthology.org/J08-4004/)。

**评测形式**：Likert 认知负担高且中位偏差；pairwise 最常用；ranking 信息量最大但成本最高。多维度 rubric（helpfulness / harmlessness / honesty + 任务特定维度）比单一 overall 稳定。采样策略：stratified、adversarial、active（高分歧优先）。

**Chatbot Arena 数学**：Bradley-Terry MLE（online Elo 在"玩家水平不变"假设下的 MLE）+ bootstrap 1000 次置信区间 + Extended BT 支持 style control。[原论文](https://arxiv.org/abs/2403.04132)（Chiang et al. ICML 2024）。获得 ±5 Elo 精度需要每个模型约 3000 votes。

**专家 vs 众包成本**：MTurk $0.10–0.50/task（开放生成不可靠，[Karpinska EMNLP 2021](https://aclanthology.org/2021.emnlp-main.97/) 证明）；Scale AI / Surge $1–10/task（frontier labs 主用）；Prolific 欧洲为主；专家（医学/法律/数学 PhD 级）$50–200/小时，GPQA Diamond 与 HLE 都需要。

## 评测基础设施：trace-first 已经是共识

**开源 eval harness**：

- [**lm-evaluation-harness**](https://github.com/EleutherAI/lm-evaluation-harness)（EleutherAI）：200+ 任务、25+ 后端，HF Open LLM Leaderboard 驱动，核心抽象 Task/Model/Filter/Metric，支持 loglikelihood/loglikelihood_rolling/generate_until 三种请求。
- [**Inspect AI**](https://inspect.aisi.org.uk/)（UK AISI, 2024-05 开源）：Anthropic / DeepMind / METR / Apollo Research / CAISI 采用；核心抽象 Dataset → Task → Solver → Scorer；first-class tool use、Sandbox (Docker/K8s/Proxmox)、Eval Log 可视化、VS Code 插件；[Inspect Evals](https://ukgovernmentbeis.github.io/inspect_evals/) 集成 200+ 社区实现。**对比 lm-eval-harness**：Inspect 更面向 agent / 多轮 / 安全评测；lm-eval 更侧重静态 MCQ / loglikelihood。
- [**Promptfoo**](https://www.promptfoo.dev/)：YAML 驱动、CI/CD 友好。
- [**OpenCompass**](https://github.com/open-compass/opencompass)（Shanghai AI Lab）：6 能力维度、70+ 数据集、400k 问题，含 CompassJudger-1 与 CompassArena。
- [**DeepEval**](https://github.com/confident-ai/deepeval)：pytest 风格单元测试。
- [**Ragas**](https://docs.ragas.io/)：RAG 专用（context precision / recall、faithfulness、answer relevancy）。

**Trace-first 平台**：[LangSmith](https://smith.langchain.com/)、[Langfuse](https://langfuse.com/)（开源 + OTel 原生）、[Arize Phoenix](https://phoenix.arize.com/)、[AgentOps](https://www.agentops.ai/)、[W&B Weave](https://wandb.ai/site/weave)。

**OpenTelemetry GenAI Semantic Conventions**（2024-04 起由 OTel GenAI SIG 推进，截至 2026-03 多数仍为 experimental）：关键属性 `gen_ai.request.model`、`gen_ai.provider.name`、`gen_ai.operation.name`、`gen_ai.usage.input_tokens`、`gen_ai.evaluation.score.label`。Agent Framework conventions 另行推进（Tasks、Actions、Agents、Teams、Artifacts、Memory）。CrewAI 原生，AutoGen / LangGraph / Semantic Kernel 通过 Traceloop / Langtrace / OpenLIT 等 instrumentation。[OTel GenAI docs](https://opentelemetry.io/docs/specs/semconv/gen-ai/)。

**评测成本估算**：MMLU ~15k 题约 $10–30；Humanity's Last Exam ~2.5k reasoning 模型 $100–500；agent eval（SWE-bench、GAIA）单次 $1000+。降成本靠 stratified + adaptive sampling（tiny benchmarks 只需 5–10% 样本）、early stopping、caching、ensemble judge → single judge with calibrated threshold。

## 前沿议题：wiki 必须保持的"活的章节"

**benchmark 污染**：[Sainz et al. 2023](https://arxiv.org/abs/2310.18018) 定义层级；检测靠 n-gram overlap、perplexity permutation test（[Oren et al.](https://arxiv.org/abs/2310.17623)）、canary strings（BIG-Bench、AgentHarm GUID）、membership inference。

**动态 benchmark 范式**：[LiveBench](https://livebench.ai/)（月度更新，ICLR 2025 Spotlight）、[LiveCodeBench](https://livecodebench.github.io/)（持续收集 LeetCode/AtCoder/CodeForces，按发布日期切片）、HLE-Rolling。

**下一代 benchmark 与 separability**：95% CI 下仍能排名不同模型的能力——Arena-Hard 达 87.4%，MT-Bench 仅 22.6%。这是现代 benchmark 设计的核心指标。

**对抗评测与红队**：[HarmBench](https://www.harmbench.org/)、[MLCommons AILuminate v1.0](https://mlcommons.org/benchmarks/ailuminate/)（12 hazard × 24k+ prompts × 英法双语）、[Cybench](https://cybench.github.io/)、[Anthropic Sabotage Evaluations](https://assets.anthropic.com/m/377027d5b36ac1eb/original/Sabotage-Evaluations-for-Frontier-Models.pdf)、Apollo Research deception evals、METR autonomous replication。

**安全评测**：[AgentHarm](https://arxiv.org/abs/2410.09024)（UK AISI + Gray Swan, ICLR 2025, 110 恶意任务）、[InjecAgent](https://arxiv.org/abs/2403.02691)（tool IPI 攻击，ReAct-GPT-4 24% 易受）、OpenAgentSafety、CUAHarm、OS-Harm、SafeArena。规范框架：[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)、Anthropic [RSP v3](https://www.anthropic.com/news/anthropics-responsible-scaling-policy)（ASL 分级，ASL-3 在 Claude Opus 4 预防性激活）、[OpenAI Preparedness](https://openai.com/safety/preparedness)（cyber/CBRN/persuasion/autonomy × Low/Medium/High/Critical）、DeepMind Frontier Safety Framework。

**真实世界分布**：[WildChat](https://huggingface.co/datasets/allenai/WildChat-1M)（1M ChatGPT 对话 + 人口学/请求头）、[LMSYS-Chat-1M](https://huggingface.co/datasets/lmsys/lmsys-chat-1m)、[WildBench](https://allenai.github.io/WildBench/)（WB-Reward/WB-Score 与 Arena Elo 相关 0.98）。

**涌现能力争议**：[Schaeffer et al. NeurIPS 2023 Outstanding Paper "Are Emergent Abilities a Mirage?"](https://arxiv.org/abs/2304.15004) 证明 >92% BIG-Bench 涌现能力只在 Exact String Match / Multiple Choice Grade 两种 nonlinear 指标下出现；换成 Token Edit Distance、Brier Score 平滑消失。**这警示 wiki**：metric choice 本身是整个"涌现/AGI 讨论"的主要混淆变量。

**自动生成 benchmark**：AutoBencher、[Benchbuilder](https://arxiv.org/abs/2406.11939)（从 1M 对话自动提取 500 难题 = Arena-Hard）。前沿担忧：synthetic benchmark 若由 LLM 自己生成 + 自己评测是否构成循环论证？

## 评测哲学：wiki 的底层观念

**capability vs performance**：Anthropic RSP 明确区分——capability evaluation 要求 best-effort elicitation（prompt engineering / fine-tuning / scaffolding 充分激发）；deployment performance 可用任何 guardrails。这是 frontier lab 共同采纳的区分。

**capability eval vs alignment eval**：前者问"能做什么"，后者问"会做什么"。GPQA / HLE / ARC-AGI 解决前者；HHH、Constitutional AI、RLHF 解决后者。两者有时冲突——极端 aligned 的模型会在 harmful task 上故意失败，但 capability 评测者需要 "evil twin" 才能测上界（Anthropic Sabotage Evaluations 即为此）。

**Chollet "intelligence as generalization"**：[On the Measure of Intelligence](https://arxiv.org/abs/1911.01547) 定义 intelligence 为 "skill-acquisition efficiency on unknown tasks"。[ARC-AGI-2](https://arxiv.org/abs/2505.11831) 2025-03 发布，人类 100% 在 ≤2 次尝试完成，当前顶级模型 54%；ARC-AGI-3 将引入交互式推理（exploration、planning、memory、goal acquisition）。"Refinement loops"（per-task iterative program optimization with feedback）在 2025 成为主导范式；[ARC Prize 2025 技术报告](https://arxiv.org/abs/2601.10904) 首次给 "knowledge-dependent overfitting" 概念命名。

**行为主义 vs 内部表征**：主流评测是 black-box 行为主义；interpretability-based eval（probing、activation patching、circuit discovery）衡量模型是否"真的理解"。Anthropic 的 [transformer-circuits.pub](https://transformer-circuits.pub/)、Goodfire、DeepMind GemmaScope 的 sparse autoencoders 是典型。行为主义可被 gaming（training to the test），内部 eval 更难伪造但可扩展性低。

**dangerous capability 评测哲学对比**：Anthropic RSP（ASL 分级 + Capability Thresholds + Required Safeguards + "race to the top"）；OpenAI Preparedness（四类 × 四级）；DeepMind Frontier Safety Framework（Critical Capability Levels + mitigation）；Meta Frontier AI Framework（outcome-based，不做 capability thresholds）。分歧核心：谁评测（first-party vs AISI vs 政府）、能否公开细节、是否训练前暂停（Meta 明确拒绝）。

---

# 第四部分｜技术栈决策：为什么是 Docusaurus

## 核心结论（再次）

针对我们的场景——中英双语、内容是评测这种高度动态的知识、需要代码与交互、3–5 人启动、未来社区化——技术栈的**明确推荐**是 **Docusaurus 3.x + Cloudflare Pages + Pagefind + Giscus + Plausible**。

## 为什么不选 MkDocs + Material（即便它最流行）

过去三年技术圈对 MkDocs + Material 的惯性推荐在 **2025 年 11 月彻底失效**。关键事件：

- **Material for MkDocs 2025-11-05 进入 maintenance mode**（[官方声明](https://squidfunk.github.io/mkdocs-material/blog/2025/11/11/insiders-now-free-for-everyone/)），仅承诺 12 个月 bug 与安全修复。
- 底层 MkDocs 1.x 已 18 个月无新 release；MkDocs 2.0 破坏兼容。
- 社区分裂为至少五股势力：[Zensical](https://squidfunk.github.io/mkdocs-material/blog/2025/11/05/zensical/)（squidfunk 团队新起炉灶）、MaterialX（社区 fork）、ProperDocs（oprypin fork）、MkDocs 1.x 残留维护、MkDocs 2.0。
- 背景参考：[Florian Maas 2026-04 "Collapse of MkDocs" 深度分析](https://fpgmaas.com/blog/collapse-of-mkdocs/)。

我们项目是 2026 开新坑——绑定一个正在分裂并可能在 18 个月内需要大规模迁移的生态，是最显然的返工陷阱。

## 为什么选 Docusaurus：六个原因

**i18n 原生 + Crowdin 一等集成**。Docusaurus 的 [i18n 教程](https://docusaurus.io/docs/i18n/crowdin) 是全行业 SSG 里最成熟的中文翻译工作流：docs 主仓 → Crowdin → i18n 目录 → 构建两份站点。

**文档版本化原生**。不像 MkDocs 需要装 `mike` 插件；Docusaurus 内置 `docusaurus docs:version 1.0`。即便我们**选择不用软件式 v1/v2 版本化**（见后），需要时能无痛开启是一张保险。

**MDX v3 原生**。评测 wiki 的交互组件（`<Leaderboard slug="mmlu" />`、`<PromptDiff before="..." after="..." />`、`<BenchmarkRadar models={...} />`）可以直接写在 markdown 里。

**Algolia DocSearch 对 OSS 免费**且原生支持，contextual search 能按语言 + 版本过滤。

**社区与范本**。React Native、Jest、Prettier、Babel、Redux、Zustand 都是 Docusaurus 站——证明它能承载大型社区化文档。

**最低"未来返工"风险**。Meta 维护 + 62.7k stars + 周下载 ~1M + 3.9.x 稳定迭代。

## 次优：Astro + Starlight

[Starlight](https://starlight.astro.build/) 是一个值得独立 day-1 原型对比的选择。优点：**岛屿架构**（content 默认零 JS，交互组件按需 hydrate）、**Pagefind 内置无需配置**、支持 React/Vue/Svelte 任意组件混用、i18n 原生、构建速度显著快于 Next/Nextra（1000 页 ~18s vs Nextra ~52s）、Lighthouse 分数业界最佳。唯一短板是**版本化不原生**。如果团队愿意用 Astro，Starlight 很可能带来更好的开发体验与更快的站点。建议 Lead 和主力工程师**各自 1 天原型**再定——但如果要走捷径，Docusaurus 是更"无脑安全"的默认。

## 所有 SSG 一张对比表

| SSG | 推荐度 | i18n | 版本化 | 交互组件 | 主要风险 |
|---|---|---|---|---|---|
| **Docusaurus 3.x** | **首选** | 原生+Crowdin | 原生 | MDX v3 | 构建较慢 |
| **Astro + Starlight** | **强次选** | 原生 | 无 | 任意框架 | 版本化需自制 |
| **VitePress 1.6** | 备选 | 原生 | 插件 | Vue SFC | Vue 生态偏小 |
| Nextra v4 | 谨慎 | 有但弱 | MDX | React | v3→v4 破坏性迁移 |
| Fumadocs | 观望 | 手动 | 手动 | MDX+headless | 生态不稳 |
| MkDocs + Material | **不选** | 插件 | mike | 无 MDX | 维护模式、生态分裂 |
| Hugo | 备选 | 原生 | 有 | Shortcodes | Go template 陡 |
| Jekyll | 不选 | 插件 | 无 | Liquid | 构建慢、生态老 |
| Quartz | 不选 | 弱 | 无 | 有限 | 定位小众 |
| Hexo | 不选 | 多语言差 | 无 | Shortcodes | 英文社区弱 |
| Jupyter Book | 特殊 | 基础 | 无 | 直嵌 notebook | 非 wiki 原生 |
| Quarto | 特殊 | 基础 | 无 | OJS/Shiny | 更像"书"而非 wiki |
| GitBook | 不选 | 有 | 有 | 专有 | SaaS 锁定 |

**特别说明**：如果团队未来要做"评测学教科书"（类 d2l.ai 风格，带可运行 notebook 章节 + PDF 输出），**Quarto** 是独立的杀手级选择——但它回答的不是 wiki 问题，是"书"问题。我们的主站用 Docusaurus，附属的"评测手册"可以用 Quarto 单独做。

## 交互内容与代码嵌入

评测 wiki 需要的交互组件和对应技术：

| 需求 | 推荐 |
|---|---|
| 浏览器中跑 Python | **Pyodide + JupyterLite**（纯静态、无后端） |
| 可执行小片段 | **Pyodide REPL** iframe 嵌入 |
| 数据可视化 | **Observable Plot / ECharts / D3** |
| 云端 notebook | **Colab** 链接 + Binder 备用 |
| LLM demo | **HuggingFace Spaces** iframe |
| 可复现 notebook | **Marimo**（反应式 notebook，有 WASM 版） |
| 手绘架构图 | **Excalidraw** `.excalidraw.svg` |
| 协作白板 | **tldraw** |
| 代码式图表 | **Mermaid** + **D2** |
| 精细数据叙事 | **D3 + Svelte island** |
| 视频动画 | **Manim** 离线渲染 |

**评测场景的具体实现建议**：

- **交互式 leaderboard**：构建期把 `data/benchmarks/*.yaml` 转 JSON；运行期用 Observable Plot 或 ECharts 渲染；客户端 Fuse.js 做过滤；定时 GitHub Action 从 HF Open LLM Leaderboard API 拉数据 PR。
- **Tokenizer 可视化**：用 [`@xenova/transformers.js`](https://github.com/xenova/transformers.js) 在浏览器端加载 tokenizer；或用 tiktoken 的 JS port。Karpathy 做过 [tiktokenizer](https://tiktokenizer.vercel.app/)，值得仿制。
- **Benchmark 雷达图**：`<BenchmarkRadar models={[...]} benchmarks={[...]} />` MDX 组件。
- **判分偏差演示**：两列并排显示模型 A/B 回答，中间"GPT-4 as judge"偏好条，可点"翻转选项"演示 position bias。
- **成本计算器**：输入 model × tokens → 输出 $。
- **公式**：**KaTeX**（MathJax 慢 10x 且 95% 场景 KaTeX 够用）。

**架构原则**：数据与视图严格分离——所有评测数据放 `data/` 目录（YAML/JSON/CSV），视图是 `<Leaderboard src="data/benchmarks/mmlu.yaml" />` 组件。同一数据源驱动多处渲染（leaderboard、雷达图、表格、搜索）。

## 托管与中国大陆访问

**Cloudflare Pages**（全球主站）+ **不建镜像**（MVP 阶段）。

背景事实：`pages.dev` 证书不在大陆（[CF 官方 FAQ](https://developers.cloudflare.com/china-network/faq/)），直接访问非常慢甚至失败；所有国际 CDN 在大陆都不稳定；ICP 备案需要公司实体且政策收紧；Cloudflare China Network 需要 Enterprise plan + ICP + JD Cloud 审核，**不适合开源项目**。

**推荐分级策略**：

- **MVP 阶段（0–6 月）**：主站 Cloudflare Pages 全球，接受大陆访问慢。**不折腾镜像**。先看中文流量占比。
- **中期（6–12 月）**：若中文访问需求显著（>20% 读者），建立 Gitee Pages 镜像或社区同学自愿维护的腾讯云 COS 镜像。用 DNSPod 地域解析分流（大陆 CNAME 到镜像）。所有内链相对路径以便整站复制。
- **成熟期（若有公司实体）**：阿里云全站加速 / 腾讯云 EdgeOne 回源 Cloudflare Pages，月成本 ¥100+。

## 搜索

启动期 **Pagefind**（Starlight 内置，Docusaurus 有插件）；增长到 500+ 页若需要更好 typo tolerance 申请 **Algolia DocSearch**（OSS 免费，审核约 2 周）。中文分词 Pagefind 需设 `site-languages` 并考虑接入 `segmentit`。

## 双语 i18n 策略

**路径**：`/en/` + `/zh/` 平行目录，**无默认根语言**，对 SEO 友好且可扩展 ja/ko。单域名（`llmeval.org/en/...`）优于分站（`en.llmeval.org`）。

**不强制同步**。frontmatter 记 `translation_status: stub | draft | machine | reviewed`，页面顶部自动显示横幅（"本文为机器翻译"或"此文暂无中文版，回退显示英文版"）。CI 脚本 `check-i18n-sync.py` 对比英文 commit，中文 stale >30 天自动提 Issue。

**人机分工**：flagship 文章人工翻译 + 专家审校；目录页/辅助内容允许 LLM 辅助（明示）+ 人工 review。维护 `glossary.yaml`（Transformer / Attention / RLHF / benchmark / judge / validity 等术语的首选中英对照），翻译时强制对齐。

## 评论与分析

**Giscus**（基于 GitHub Discussions）+ **Plausible** 或 **Umami**（自托管）。Giscus 支持 reactions、reply thread、严格 pathname 匹配；比 Utterances（基于 Issues、无嵌套）与 Disqus（广告、隐私差）都好。Plausible 和 Umami 脚本 <1KB、无 Cookie banner、隐私友好。

---

# 第五部分｜避免返工的十三条架构决策

这是用户最关心的部分。把每一条决策的"如果错了就要大规模返工"的陷阱点列清楚，给出明确立场。

## URL 路由与 slug 规范

**立场**：议题目录 + kebab-case slug + 永久化 URL + 301 管理。

```
/en/benchmarks/mmlu/
/en/benchmarks/mmlu-pro/
/en/judges/llm-as-judge/
/en/judges/reward-bench/
/en/methods/data-contamination/
/en/philosophy/construct-validity/
/en/infrastructure/lm-evaluation-harness/
```

规则硬约束：复数名词目录（Wikipedia 风格）；全小写 ASCII 即使在中文版（`/zh/benchmarks/mmlu/` 而非 `/zh/评测集/mmlu/`，对 SEO 友好且便于跨引用）；最多 3 层嵌套；**一旦发布，URL 不改**——必须改时仓库根 `_redirects` 加 301，每次 PR 改路径必须同时加。

## 目录结构：议题为主轴而非模态

**立场**：议题（benchmarks / judges / methods / infrastructure / philosophy）作为一级目录，模态（text / vision-language / audio / video / code / agent）作为 tag 与交叉索引。

理由：评测的本质论是跨模态的（LLM-as-judge、污染、统计检验都跨模态）；按模态分一级会让这些共通议题变成"杂项"二等公民；新增模态要改一级目录是重返工。Karpathy 的 LLM Wiki 实践也证明"按概念而非按来源组织"更能累积。

## 图表格式标准

| 用途 | 格式 | 工具 |
|---|---|---|
| 架构/流程图 | **Mermaid** | SSG 内置，Git diff 友好 |
| 复杂/自定义风格 | **Excalidraw** `.excalidraw.svg` | excalidraw.com，JSON + SVG 双版本 |
| 纯数据图 | **ECharts / Observable Plot** | 组件化 |
| 截图/照片 | **PNG/JPEG** 优化后 <200KB | ImageOptim/Squoosh |
| 矢量 logo | **SVG** | — |

**硬规则**：禁止直接截图的流程图、无源文件 JPG 图表；PR 必须上传源文件到 `assets/diagrams/<slug>.excalidraw` 或 `.mermaid`。

## 数学公式：KaTeX

快 10x、服务器端可预渲染、覆盖 95% ML 论文符号；Docusaurus 用 `remark-math` + `rehype-katex`。MathJax 不推荐。

## 代码可执行性：分级

- 简单片段（<50 行）→ Pyodide REPL（页面右上"Run"按钮）
- 需要 torch/transformers → Google Colab 链接（"open in colab" 徽章）+ Binder 备用
- CLI 命令（`lm_eval --model ...`）→ 纯代码块 + copy 按钮
- 全 pipeline → 独立 repo + 本站链接

## 引用与参考文献

**BibTeX + 脚本生成**。每篇文章配 `references.bib`；构建脚本把 `[@weng2023llm]` 替换成编号和底部参考；Docusaurus 用 `remark-citations`，Quarto 原生支持 CSL。每篇文末放 `@article{authoryear_slug}` 块（Lilian Weng 做法）让读者 copy citation。

引用规则：**优先 arXiv 原文 > 官方 repo > 作者博客 > 二手报道**；评测集必须引论文 + 官方 repo；benchmark 数字必须注 "as of [date], from [source]"；未经来源核实的数字不入库。

## 版本化：living document，不打 v1/v2

**立场**：不用软件式版本化，用 living doc + changelog。

理由：评测知识每天变，软件式 versioning 会造成仓库膨胀和维护成本爆炸。

机制：
- frontmatter `last_updated` 从 Git commit 自动取
- 每篇顶部显示 "Last updated / First published / Commits: link"
- 整站 `/changelog/` 页按月汇总（CI 脚本从 Git log 生成）
- 重大修订保留 `/archive/2025/mmlu-old.md` 并在新版顶部链回去

Docusaurus 原生版本化 feature 保留但不启用。leaderboard 类动态内容可单独上版本（Git tag + 每周自动快照）。

## SEO 与可发现性

- sitemap.xml 自动生成 → 提交 Google Search Console + Bing + 百度
- robots.txt 允许 GPTBot / Google-Extended（知识库希望被 LLM 引用）
- Open Graph：frontmatter `og_image` 默认用 Vercel `@vercel/og` 或 Cloudflare `og-img` 自动生成
- JSON-LD：Schema.org `Article` + `TechArticle`；评测集页用 `Dataset`
- **AI 引擎优化（GEO）**：提供 `llms.txt`（已有部分爬虫支持），列出 flagship 文章
- 英文 SEO 优先；**中文无 ICP 情况下百度曝光有限，接受依赖社交传播**

## License

**内容：CC BY 4.0**（非 BY-SA、非 BY-NC）。

理由：BY-SA 的 copyleft 对翻译和教学有摩擦；BY-NC 阻碍教材和公司培训等正常引用；对一个希望被 LLM 引用、被教育者复用的知识库，**BY 4.0 最大化传播**。这一点比 Lilian Weng 的 BY-NC-SA 和 Jay Alammar 的 BY-NC-SA 更开放——我们不是个人博客，我们是基础设施。

**代码：Apache 2.0**（多专利条款，企业贡献者友好，与 Transformers / LangChain 一致）。

**AI 生成内容披露**：frontmatter `ai_assisted: true`；文末说明"本文部分段落由 GPT/Claude 辅助起草，由 [姓名] 审校"；机器翻译段落需 banner。

## 内容更新机制

- **Conventional Commits** = changelog（`feat(mmlu): add 2026 update`）
- last-modified 自动从 Git（Docusaurus `showLastUpdateTime: true`）
- RSS/Atom feed 必须有
- 全站 /changelog/ 按月自动汇总

## 评论：Giscus 二选一

Giscus > Utterances > Disqus。页面底部同时放"在 GitHub 编辑本页" + "报告错误"链接（连 issue 模板），作为更正式反馈通道。

## Analytics：Plausible 或 Umami

不选 Google Analytics。若需要看大陆流量分布，百度统计作为次要渠道。

## 字体与排版（中英混排）

**系统字体栈**，不自托管全量中文字体（WOFF2 子集仍 500KB+）。

字体栈：`-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif`。代码字体 `"JetBrains Mono", "Fira Code", ui-monospace, monospace`。

排版规则：`remark-pangu` 或 `remark-autocorrect` 插件在构建时自动中英间插空格；正文中文用全角标点，代码与术语保留半角；中文段落 `line-height: 1.75`。

---

# 第六部分｜MVP 路线图：Day 1 到 Day 365

## 生产力参考（真实数据校准预期）

| 人物 | 频率 | 篇均词数 | 单篇耗时 |
|---|---|---|---|
| **Lilian Weng** | 4–8 篇/年 | 8000–15000 | 20–80 小时 |
| **Jay Alammar** | 3–6 篇/年（黄金期） | 3000–6000 | 30–60 小时（可视化耗时） |
| **Sebastian Raschka** | 月更（Substack） + 月 0–1（博客） | 3000–10000 | 10–40 小时 |

**诚实的工作量评估**：**单人全覆盖所有模态评测不可能**。单人年产出上限预期：8–15 篇 flagship + 30–50 篇短条目 ≈ 4 万字/年。想全量覆盖 50+ benchmark + 十几个方法论议题 + 多模态（视频/音频/Agent），**至少需要 3–5 人团队 + 10+ 外部贡献者**。

## 团队分工：主题 owner 制

**主题 owner** 优于 **模态 owner**。理由：冷启动期主题 owner 能成为"深度专家"产出高质量内容；模态 owner 容易让非主流模态变成冷宫。

推荐角色：

| 角色 | 负责 | 典型产出 |
|---|---|---|
| **Lead / Editor** | IA、选题、质量、外部关系 | 目录、首页、flagship 联合作者 |
| **Benchmarks Owner** | benchmark 条目 + leaderboard | 月 3–5 篇更新 |
| **Judges & Methods Owner** | 判分偏差、统计、污染 | 深度文章为主 |
| **Infrastructure Owner** | 评测框架、复现、代码 | 教程 + 工具帖 |
| **Community Manager** | 翻译协调、PR 评审、社媒 | 非内容，运营 |

多模态覆盖靠引入**外部客座作者**（vision/audio/video/embodied 各 1–2 位），而非自己硬刚。

## 阶段性目标

### Day 1：启动当日

- 注册 GitHub Org（`llmeval-wiki` 或类似）+ 主仓 `docs`
- `npx create-docusaurus@latest` 初始化
- 决定域名（`llm-eval.org` / `evalwiki.ai` / 类似，英中双音节）+ Cloudflare Pages 连接
- 添加 `LICENSE`（CC BY 4.0 content、Apache 2.0 code）、`README.md`、`CODE_OF_CONDUCT.md`（Contributor Covenant v2.1）、`CONTRIBUTING.md` 骨架

### Week 1

- i18n 骨架（`/en/` + `/zh/` 平行）
- 议题目录按方案 A 创建空页面 + TODO
- KaTeX + Mermaid + Giscus + Pagefind 配置
- CI：GitHub Actions 构建 + 部署 CF Pages + `lychee` 链接检查 + markdown lint
- PR/Issue 模板、Giscus Discussion 分类
- `glossary.yaml` v0.1（30–50 核心术语中英对照）

### Month 1（Day 1–30）：0→1 私有打磨

**目标：内部可用、3–5 篇 flagship 完成，暂不公开宣传。**

技术清单：Analytics、RSS、OG Image 自动生成、`data/benchmarks/*.yaml` schema、`<Leaderboard>` / `<BenchmarkCard>` 组件、双语同步检查脚本、llms.txt。

Flagship 文章（英文优先，中文可 2/5）：

- **"What Is LLM Evaluation? A Practitioner's Primer"**（入门 + 概念地图）
- **"MMLU: Deep Dive"**（旗舰案例，含污染/饱和/MMLU-Pro）
- **"LLM-as-a-Judge: How It Works, Where It Fails"**（判分专题）
- **"Data Contamination: Definitions, Detection, Mitigation"**（方法论）
- **"Evaluating Multimodal Models: From MMMU to Video-MME"**（多模态全景）

### Month 2–3：1→10 公开开源

- **Day 30**：公开 GitHub 仓库；发帖 HN + X + 知乎 + r/MachineLearning + HF 社区
- Day 30–60：补 10 篇基础条目（每 benchmark 短条目 + 每议题综述）
- Day 60：启动首批外部贡献者招募（社交媒体 + `help-wanted` 标签）；每周固定 office hour（Discord）
- **Day 90**：首次 "Good First Issue Friday"（一天集中 merge 新贡献者 PR）

### Month 4–6：稳定扩张

- 5–10 位外部贡献者（每人至少 1 PR merged）
- 翻译团队（每语言 1 主翻译 + 2 reviewer）
- 月度 retrospective 公开贴（学 EleutherAI）
- 与研究者联动（paper authors review 自家 benchmark 条目）
- 每周 1 篇节奏（新文或大修）
- 开始接 conference sponsorship / HF / academic lab grant

### Month 7–12：社区化

- 建立**议事会**（3–5 maintainers），月度视频会议
- `GOVERNANCE.md`（决策、版本、License 变更程序）
- 尝试 GitHub Sponsors / Open Collective / NumFOCUS / LF AI 孵化
- 首届线上 contributor summit
- 目标：50+ 文章、20+ 活跃贡献者、5k+ 月访问

---

# 第七部分｜运营机制：PR 模板、质量把控、治理

## 贡献者招募路径

Issue 标签分层：`good first issue` / `help wanted` / `needs expert` / `translation` / `review`。`CONTRIBUTORS.md` + 首页"Recent Contributors"（all-contributors bot）。定向邀请：benchmark 条目 PR 后主动 @ 原论文作者邀 review。学生项目合作 GSoC / OSPP / MLH（Year 2）。社交挖掘：每周 DM 1–2 位写评测推文的研究者。

## PR 模板

```markdown
## Type
- [ ] New article  - [ ] Update existing  - [ ] Translation  - [ ] Bug fix  - [ ] Infra

## Checklist
- [ ] Frontmatter 完整（title, summary, last_updated, translation_status）
- [ ] 所有引用含 arXiv/DOI 链接
- [ ] KaTeX 渲染通过
- [ ] 图片有 source 文件 committed
- [ ] `lychee` 链接检查通过
- [ ] sidebars.ts / navigation 已加
- [ ] benchmark 数字有 primary source
- [ ] AI-assisted? 若是在 frontmatter 披露

## Reviewers
- Subject matter: @owner
- Editorial: @editor
- Translation (if applicable): @translator
```

Reviewer 轮值：核心 maintainer 按周 first responder（24h triage）；主题 PR 分给对应 owner；**merge 前至少 2 approvals**。

## 三层质量审核

- **技术正确性**：subject matter expert 或 owner
- **编辑**：Lead/Editor 行文、风格、连贯
- **事实核查**：对所有数字/引用 spot check（每篇至少 3 处核对原始论文）

Style Guide（`CONTRIBUTING.md`）：禁止无 citation 性能数字；所有 benchmark 数字注 "as of [date], from [source]"；避免炒作用语（"革命性""颠覆"）；区分事实/观点/猜测。

外部 reviewer：维护 external reviewers 列表（学术朋友、原作者）；flagship 发布前公开 draft 征求 1–2 周意见；敏感内容（新 benchmark、污染指控）≥2 位领域专家 review。

## 治理

CoC：Contributor Covenant v2.1 直接采纳；conduct@llm-eval.org 邮箱。

`GOVERNANCE.md`：
- 日常决策：2 maintainer approval
- IA/License/治理变更：**Lazy consensus**（72h 无反对即通过），反对则 maintainer 会议多数票
- License 变更：全 maintainer 一致同意 + 社区通知 4 周
- Maintainer 6 月无活跃 → 荣誉退休

冲突解决：CoC committee（3 人，至少 1 位 maintainer 外成员），独立邮箱，每案 2 周内回复。

---

# 第八部分｜关键决策一页纸

| 决策项 | 推荐 | 次选 | 否决 |
|---|---|---|---|
| SSG | **Docusaurus 3.x** | Astro + Starlight | MkDocs / Jekyll / Hexo / GitBook |
| 托管 | **Cloudflare Pages** | Vercel / Netlify | 自建 VPS |
| 搜索 | **Pagefind** → Algolia（>500 页） | Meilisearch | Disqus / GoogleCSE |
| 评论 | **Giscus** | Utterances | Disqus |
| Analytics | **Plausible / Umami** | — | Google Analytics |
| i18n | **/en/ + /zh/ 平行，不强同步** | — | 单域名强同步 |
| IA | **议题为主轴**（方案 A） | — | 按模态分一级目录 |
| 数据 | **YAML in `data/` + 组件渲染** | — | 硬编码在 MD |
| 公式 | **KaTeX** | — | MathJax |
| 图表 | **Mermaid + Excalidraw** | ECharts | 直接截图 |
| 内容 License | **CC BY 4.0** | CC BY-SA 4.0 | CC BY-NC |
| 代码 License | **Apache 2.0** | MIT | GPL |
| 版本化 | **Living doc + changelog** | — | 软件式 v1/v2 |
| 字体 | **系统字体栈** | 子集化 Noto | 自托管全量中文 |
| 中国大陆 | **CF 全球 + 暂不镜像** | 腾讯云 + ICP | CF China Network |
| 团队 | **主题 owner 制** | 模态 owner 制 | — |
| 创作工作流 | **Obsidian + Claude Code (Karpathy 三层) → 发布仓库** | — | 直接在发布仓库写 |

---

# 第九部分｜六个诚实的开放问题

最后，有六个问题我必须诚实标注"需要你进一步决策"而非一刀切推荐。

**Docusaurus vs Starlight 的最终拍板**。两者都能胜任；差异是开发体验（Starlight 快/轻，Docusaurus 大而全）。建议 Lead 和主力工程师各用 1 天原型 5 个页面 + 1 个 `<Leaderboard>` 组件，对比写起来是否顺手。

**中国大陆访问策略**。若有公司实体资源可备案 → 腾讯云 EdgeOne 回源 CF Pages 是最佳双站方案；没资源 → 接受访问慢，不做镜像。6 个月后看中文流量再决定是否投入。

**版本化的边界**。leaderboard 类极频繁变化的内容，是否单独 Git tag 每周快照？建议第一年不做，观察维护负担与社区需求。

**是否引入 Karpathy LLM Wiki 模式作为内部创作工作流**。**强烈建议"是"**：作者本地用 Obsidian + Claude Code 维护 private `raw/` + `wiki/`（消化论文、沉淀卡片），精炼后人工迁到发布仓库。发布的 wiki 是"成品"，不是 AI 的 stream of thought。

**中英双语的优先级**。若目标读者以研究者为主，英文优先（ArXiv 社区、Twitter 讨论）；若目标是中文工程社区普及，中文优先。**建议英文为 canonical，中文为高质量翻译**——这是 Datawhale、d2l.ai 的路径。

**产出频率的现实预期**。不要承诺"周更"；设"双周一篇 flagship + 每周多篇小更新"更可持续。Lilian Weng 4–8 篇/年、Jay Alammar 3–6 篇/年是单人博客天花板；3–5 人团队若能做到年 30–50 篇 flagship + 200+ 条目更新，已属极强输出。

---

# 尾声：为什么这件事值得做

Karpathy 的 [`llm-wiki.md`](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 最后一段写道：

> "The idea is related in spirit to Vannevar Bush's Memex (1945) — a personal, curated knowledge store with associative trails between documents... The part he couldn't solve was who does the maintenance. The LLM handles that."

1945 年 Bush 的 Memex 构想里缺的那一块——"谁来维护"——在 2026 年终于被 LLM 解决。这让"对一个快速演化的技术领域做持续的、有立场的、交叉引用的知识综述"从"博士论文级苦役"变成"一个小团队 + 几个 Agent 可以跑起来的项目"。

LLM 评测领域本身正处于剧烈的认识论危机——MMLU / HumanEval / MATH 饱和、Papers with Code 消失、benchmark 污染遍地、Distill.pub 归档、判分器自身的偏差尚未被驯服、Agent 评测还在石器时代。这意味着**现在进入这个领域、做一个"持续维护的、有立场的、开源的"评测 wiki**，不仅是一个知识产品，更是对这个领域元问题（"我们到底怎么知道模型变好了？"）的直接参与。

Karpathy 替你开了头，17 位前辈（Lilian Weng、Jay Alammar、Sebastian Raschka、EleutherAI、Anthropic Interpretability 团队、Datawhale……）替你证明了"个人/小团队做学术级知识库"的可行性，Docusaurus / Cloudflare Pages / Giscus / Pagefind 替你铺好了技术底座，CC BY 4.0 替你解决了传播问题。

剩下的唯一变量是：**从今天开始、写第一个 flagship 条目**。

"What I cannot create, I do not understand." 这句费曼的话是 Karpathy 在 LLM101n 首页写的。对你来说，它可以改写成：

**"What I cannot evaluate, I do not understand."**

这就是评测 wiki 存在的理由，也是它的第一个 flagship 文章题目。