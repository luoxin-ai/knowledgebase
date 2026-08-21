# 一篇学完 · 可交互知识库

> 用「精讲 + 详解 + 动画」的方式，把 408 四门课与数学一三科嚼碎成可交互的复习内容。
> 纯静态、零依赖、双击即用，同时支持 GitHub Pages 托管。

## 特性

- **文件浏览器侧边栏**：`目录 → 大科目 → 文件` 递归树，点击文件右侧加载，支持优雅收缩
- **考研全科覆盖**：408 计算机基础 + 301 数学一 + 101 政治 + 201 英语一，同库管理
- **七种知识块**：概念 / 考点 / 公式 / 代码 / 表格 / 动画 / 易错，数据驱动渲染
- **精讲 + 详解平铺**：每个考点先给要点与一句话概括，下方直接展开完整推导、定理证明与例题
- **19 个 Canvas 动画**：每个动画带「逐步讲解栏」，播放/步进时同步显示当前步骤在做什么
- **章末课后练习**：每章附自测题（全库 1346 题），点击选项即时判分，复习/测验双模式
- **学习进度**：作答自动记录，章末显示掌握度，错题本自动收集、重做移出
- **全局搜索**：跨全部知识文件搜索，结果按文件分组，点击跳转并高亮
- **极简黑白灰设计**：纯白底、近黑文字、苹果蓝唯一点缀、细线留白

## 内容一览（408 四门课 + 数学一三科）

| 科目 | 文件 | 章节 | 考点块 | 动画 |
| --- | --- | --- | --- | --- |
| 数据结构 | `data/11408/data-structure.js` | 8 章（绪论/线性表/栈队列数组/树/图/查找/排序/串） | 109 | 冒泡、快排、堆排、归并、二叉树遍历、图遍历、哈夫曼、KMP |
| 计算机组成原理 | `data/11408/computer-org.js` | 6 章（概述/数据表示/存储系统/指令系统/CPU/总线与I/O） | 69 | — |
| 操作系统 | `data/11408/operating-system.js` | 5 章（概述/进程线程/内存/文件/I/O） | 52 | 进程调度、页面置换 |
| 计算机网络 | `data/11408/computer-network.js` | 6 章（体系结构/物理层/数据链路层/网络层/传输层/应用层） | 56 | 滑动窗口 |
| 高等数学 | `data/11408/higher-math.js` | 8 章（极限/微分/积分/向量与空间几何/多元微分/多元积分/级数/常微分方程） | 61 | — |
| 线性代数 | `data/11408/linear-algebra.js` | 6 章（行列式/矩阵/向量/方程组/特征值/二次型） | 41 | — |
| 概率论与数理统计 | `data/11408/probability.js` | 7 章（事件概率/一维变量/多维变量/数字特征/大数定律/数理统计/参数估计） | 46 | — |

全库共 **716 个知识块**（概念 195 / 考点 176 / 表格 55 / 易错 45 / 公式 35 / 代码 27 / 动画 19 / 习题 119；另含图示 45 张），内容对齐王道考研 408 考纲与考研数学一大纲，可用于复习。

## 快速开始

### 本地使用（最简单）

```bash
# 克隆或下载本项目后，直接双击 index.html
# 或在项目根目录起一个静态服务：
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```

> 纯静态 + JS 全局注册，**不需要任何构建步骤**，本地双击即可运行。

### GitHub Pages 部署

1. 把项目推到 GitHub 仓库
2. 仓库 `Settings → Pages → Source` 选择 `main` 分支的根目录
3. 访问 `https://<你的用户名>.github.io/<仓库名>/`

## 项目结构

```
├── index.html              # 入口页（顶栏 / 侧边栏 / 内容区 / 右侧目录）
├── css/
│   └── main.css            # 设计系统 v5.0（极简黑白灰）+ 全部样式
├── js/
│   ├── core/               # 核心层
│   │   ├── registry.js     # KB 注册表：文件夹 / 文件 / 状态 / 全库索引
│   │   ├── markup.js       # 行内标记：**重点** ==记忆== `代码` [[口诀]] [[警示]]
│   │   ├── highlight.js    # C 代码高亮 + 编辑器风格代码块
│   │   ├── renderer.js     # 七种块渲染器 + 章节/文件渲染管线
│   │   ├── sidebar.js      # 文件树 / 收缩 / 抽屉 / 滚动定位 / 进度条
│   │   ├── search.js       # 全局搜索面板
│   │   ├── loader.js       # 按 manifest 串行动态加载数据文件
│   │   └── app.js          # 入口：初始化 + 事件委托 + resize 适配
│   └── animations/         # 动画层
│       ├── base.js         # AnimationBase 基类（逻辑坐标 + DPR 适配 + 讲解栏）
│       ├── sort.js         # 八大排序动画（插入/希尔/冒泡/快排/选择/堆/归并/基数）
│       ├── tree.js         # 二叉树遍历（先/中/后序）
│       ├── graph.js        # 图 BFS / DFS
│       ├── huffman.js      # 哈夫曼树构建
│       ├── kmp.js          # KMP 匹配
│       ├── os.js           # 进程调度 / 页面置换
│       ├── network.js      # 滑动窗口（GBN）
│       └── factory.js      # 动画工厂注册 + 控件绑定
├── data/                   # 数据层（只加文件，不改引擎）
│   ├── manifest.js         # ★ 数据文件清单（新增文档只改这里）
│   ├── 11408/
│   │   ├── _index.js       # 文件夹定义：11408 → 408 / 301 数学一 / 101 政治 / 201 英语一
│   │   ├── data-structure.js   # 数据结构（8 章 109 块）
│   │   ├── computer-org.js     # 计算机组成原理（6 章 69 块）
│   │   ├── operating-system.js # 操作系统（5 章 52 块）
│   │   ├── computer-network.js # 计算机网络（6 章 56 块）
│   │   ├── higher-math.js      # 高等数学（8 章 61 块）
│   │   ├── linear-algebra.js   # 线性代数（6 章 41 块）
│   │   ├── probability.js      # 概率论与数理统计（7 章 46 块）
│   │   ├── quiz-*.js           # 各科章末习题（hidden，quizFor 映射注入章末）
│   ├── politics/               # 101 政治（隶属 11408）
│   │   ├── maoyuan.js          # 马原（8 章 27 块）+ 单选/多选 100 题
│   │   ├── maozedong.js        # 毛中特（5 章 20 块）+ 单选/多选 50 题
│   │   ├── sixiang.js          # 习思想概论（2024 大纲独立设课，3 章 11 块）+ 单选/多选 30 题
│   │   ├── shigang.js          # 史纲（8 章 30 块）+ 单选/多选 80 题
│   │   └── sixiu.js            # 思修法基（7 章 27 块）+ 单选/多选 70 题
│   └── english/                # 201 英语一（隶属 11408）
│       ├── cloze.js            # 完形填空专项（方法 + 14 题）
│       ├── reading-simu.js     # 模拟阅读精读 5 篇（含题）
│       ├── newtype.js          # 新题型专项（方法 + 9 题）
│       ├── translation.js      # 翻译专项（方法 + 8 题）
│       └── writing.js          # 作文模板（小作文/大作文）
├── test/
│   └── smoke.test.js       # 回归冒烟测试（node test/smoke.test.js）
├── docs/
│   └── ARCHITECTURE.md     # 架构设计文档
└── archive/
    └── 408-review-legacy.html  # v1.0 单文件版归档
```

## 如何添加自己的知识

**核心原则：`index.html` 永远不用改，新增文档只在 `data/manifest.js` 追加一行路径。**

### 添加一个文件夹

在 `data/` 下新建 `_index.js` 定义层级（用 `parent` 实现嵌套）：

```js
KB.defineFolder({ id: 'my-root', title: '我的目录' });
KB.defineFolder({ id: 'my-sub',  title: '我的科目', parent: 'my-root' });
```

### 添加一个知识文件

在文件夹目录下新建 `data/<目录>/<名字>.js`，并在 `data/manifest.js` 追加一行：

```js
KB.register({
  id: 'my-file',           // 全局唯一
  folder: 'my-sub',        // 所属文件夹 id
  type: 'book',            // book | paper | note
  title: '我的笔记',
  source: '出处说明',
  updated: '2026-08',
  chapters: [
    {
      id: 'ch1', num: 1, title: '第一章', titleEn: 'Chapter 1',
      summary: '本章概述……',
      blocks: [ /* 见下方七种块 */ ]
    }
  ]
});
```

### 七种知识块

```js
blocks: [
  // 1. 概念 / 2. 考点：points 考点要点 + summary 一句话 + details 详解（直接平铺）
  { type: 'concept', title: '……',
    points: ['要点一', '要点二'],
    summary: '**加粗**是重点，==双等号==是记忆，`反引号`是行内代码',
    details: [ { h: '小标题', body: '详细推导、定理证明或例题……' } ] },

  // 3. 公式
  { type: 'formula', title: '……',
    formula: 'lim(x→0) sin x / x = 1', details: [] },

  // 4. 代码：自动行号 + 高亮 + 复制 + 复杂度表
  { type: 'code', title: '……', lang: 'C',
    code: 'int main(){ return 0; }',
    explain: [ { line: 1, text: '这行在干嘛' } ],
    complexity: { best: 'O(n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(1)', stability: '稳定' } },

  // 5. 表格
  { type: 'table', title: '……',
    headers: ['列1', '列2'], rows: [['a', 'b']], note: '备注' },

  // 6. 动画：animType 见 js/animations/factory.js，可配 animModes 切换模式
  { type: 'animation', title: '……', animType: 'pageReplace',
    animConfig: { mode: 'FIFO', frames: 3, pages: [7,0,1,2,0,3] },
    animModes: [ { value: 'FIFO', label: 'FIFO' }, { value: 'LRU', label: 'LRU' } ] },

  // 7. 易错：wrong/right 对错卡片
  { type: 'error', title: '……',
    mistakes: [ { title: '常见错误', wrong: '错误写法……', right: '正确写法……', why: '为什么' } ] }
]
```

### 可用的动画类型

| animType | 说明 | 模式（animModes） |
| --- | --- | --- |
| `bubbleSort` / `quickSort` / `heapSort` / `mergeSort` | 四大排序 | — |
| `treeTraversal` | 二叉树遍历 | preorder / inorder / postorder |
| `graphTraversal` | 图遍历 | bfs / dfs |
| `huffman` | 哈夫曼树 | — |
| `kmp` | KMP 匹配 | — |
| `pageReplace` | 页面置换 | FIFO / LRU / OPT |
| `processSchedule` | 进程调度 | FCFS / SJF / RR |
| `slidingWindow` | 滑动窗口 | — |

### 行内标记速查

| 写法 | 效果 |
| --- | --- |
| `**文字**` | 重点加粗高亮 |
| `==文字==` | 记忆荧光 |
| `` `代码` `` | 行内代码 |
| `[[口诀]] 内容` | 口诀提示块 |
| `[[警示]] 内容` | 警示块 |

## 架构一图流

```
数据层 data/*.js            核心层 js/core/*            动画层 js/animations/*
KB.register({...})     →   KB.registry 索引        KB_PENDING_ANIMS
  （manifest.js 驱动加载）    KB.render.renderChapter → KB_ANIM.initAnimations
                            KB_UI.renderTree        → AnimationFactories[type]
                            KB.search.init          → AnimationBase 步进状态机 + 讲解栏
```

详见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。

## 测试

```bash
node test/smoke.test.js
```

无 DOM 依赖的 Node 冒烟测试：验证注册表层级、块数据完整性、渲染管线无重复 id、19 类动画可实例化并步进到完成、排序结果有序、KMP 命中位置、README 数字与实况一致等；push/PR 由 GitHub Actions 自动运行（.github/workflows/ci.yml）。

## 许可

[MIT](LICENSE) © 2026 一篇学完
