# 优化任务清单（交接文档）

> 执行前提：本文档自包含，不依赖其他上下文。按优先级从上往下做，每项独立可交付。
> 约束：项目是纯静态零依赖站点，不改构建方式；数据层与渲染层分离，新增文档只改 `data/manifest.js`。

---

## P0 修复：quiz-ds-b.js 存在 10 处答案字母错误

文件：`data/11408/quiz-ds-b.js`

这些题的解析内容是正确的，但 `answer` 字段写错（誊写错位）。判分逻辑读 answer，因此当前会把对的判错。**必须逐条修改 answer 字段**：

| # | 行号 | 题目关键词 | 当前 answer | 改为 |
|---|---|---|---|---|
| 1 | 29 | 拓扑排序只能作用于 | d | b（DAG） |
| 2 | 32 | 非连通图连通分量个数等于 | c | b（DFS 调用次数） |
| 3 | 40 | Dijkstra 算法设计思想 | d | c（贪心） |
| 4 | 61 | {2,1,4,3,5,6} 建 AVL 最终树根 | d | c（根是 4） |
| 5 | 101 | 8 个元素 2 路归并趟数 | c | b（3 趟） |
| 6 | 141 | 串的特殊性体现在 | d | b（元素是字符） |
| 7 | 144 | next 数组只与什么有关 | d | b（模式串自身结构） |
| 8 | 146 | T=abcaabbc 的 next 数组 | c | a（0 1 1 1 2 2 3 1） |
| 9 | 149 | 两串相等的充要条件 | d | c（长度相等且对应字符相同） |
| 10 | 150 | nextval 的优化作用 | a | b（省去无效比较） |

同文件附带修改：

- 行 20 题干「其边表结点总数为」选项 n+2e：改为「其存储结构（顶点表+边表）结点总数为」，与答案 c 匹配。

文件：`data/11408/quiz-ds-a.js`（答案均正确，仅 3 处解析末尾笔误）：

| 行号 | 题目 | 解析末尾「选 C」改为「选 B」 |
|---|---|---|
| 374 | 高度 h 满二叉树结点数 | answer=b 正确，解析文字错 |
| 394 | 二叉链表空指针域 n+1 | 同上 |
| 446 | 哈夫曼树总结点数 2n−1 | 同上 |

测试增强：`test/smoke.test.js` 补一条弱校验——解析文本中出现的「选 X」必须与 answer 一致（正则 `/选\s*([A-D])/`，取最后一次匹配比对），可自动拦截此类错位。

完成标准：`node test/smoke.test.js` 全绿，答案分布 a/b/c/d 更均衡。

---

## P1 quiz 随机化

文件：`js/core/renderer.js` 的 `renderQuiz()`（约 106 行起）

现状：题目按数据文件固定顺序渲染、选项顺序固定、`data-answer` 明文写在 DOM 上（F12 可见）。

要求：

1. 题目乱序：渲染前洗牌 `questions`（Fisher-Yates）
2. 选项乱序：每题独立洗牌 options，按映射重排正确字母
3. 答案不明文：`data-answer` 移除，判分时从内存按 quiz block id + 题号查表
4. 两种模式：复习模式（顺序）为默认，测验模式（乱序 + 解析在作答后才显示）
5. 只改渲染层，数据文件不动

注意：`initQuiz()`（约 125 行起）的事件委托判分逻辑需同步适配乱序后的题号映射。

---

## P2 学习进度系统（答题驱动）

新增 `js/core/progress.js`（约 100~150 行），在 `index.html` 引入。

存储（localStorage）：

- `kb:quiz:<fileId>:<chId>:<qi>` → `{ pick, correct, ts }` 作答记录
- `kb:wrong` → 错题引用集合（fileId/chId/qi）
- `kb:master` → 手动标记的已掌握考点块 id 集合

功能：

1. 章掌握度：聚合作答记录，正确率 ≥ 80% 自动点亮；侧边栏章节行显示「21/25」
2. 错题本：侧边栏顶部虚拟入口「错题重做」，点击渲染错题卷，重做正确后移出错题本
3. 考点块手动三态标记：已掌握 / 存疑 / 未学，`renderer.js` 块标题栏注入切换按钮
4. `sidebar.js` 文件树聚合显示文件级完成度

注意：quiz 洗牌后 qi 不稳定，记录需用稳定的题目标识（建议 stem 前 32 字符 hash 或数据文件中补 `qid` 字段）。

---

## P3 URL 路由

文件：`js/core/app.js`

- 切换文件/章节时写 `location.hash`（格式 `#<fileId>/<chId>`）
- 启动时解析 hash 恢复位置，监听 `hashchange`
- 约 40 行，收益是刷新不丢位置、可分享链接

## P4 暗色模式

文件：`css/main.css` + `js/core/app.js`

- CSS 变量已集中定义，加 `[data-theme="dark"]` 覆盖变量集即可
- Canvas 动画颜色适配：`js/animations/base.js` 取色改读 CSS 变量或监听主题切换重绘
- 顶栏加切换按钮，偏好存 localStorage，默认跟随 `prefers-color-scheme`

## P5 快捷键

文件：`js/core/app.js`（全局 keydown 委托，输入框聚焦时跳过）

- `/` 聚焦搜索；`n/p` 下一章/上一章；`j/k` 上下滚动；`?` 弹出快捷键说明

## P6 打印样式

文件：`css/main.css` 加 `@media print`：隐藏侧栏/动画控件/按钮，展开所有 details（含 quiz 解析），块级 `break-inside: avoid`。

## P7 内容补齐（长期，可按科分批）

1. 六科章末自测：按 quiz-ds-a/b 的数据格式为计组、OS、网络、高数、线代、概率各建 quiz 文件（每章 25 题，注册 `hidden: true` + `quizFor` 映射，参照现有两文件的结构与 `KB.quizChapterFor` 机制）
2. 补动画：计组 Cache 映射（直接/组相联，参照 `os.js` 格子布局）、指令流水线甘特图；高数黎曼和逼近；线代矩阵乘法高亮。动画基类 `js/animations/base.js` 已抽象，新类型在 `factory.js` 注册即可
3. `data/papers/` 目前仅 1 篇示例：补 2~3 篇或从 README 弱化该卖点

## P8 工程化

- `test/smoke.test.js` 补数据校验：`animType` 必须存在于 `factory.js` 注册表、`folder` 引用有效、id 全局唯一
- 数据量增长后把 `loader.js` 串行全量加载改为按需加载（点开文件才 fetch）
