# 架构设计文档

> 一篇学完 · 可交互知识库 — 模块与数据流设计

## 1. 设计目标

| 目标 | 说明 |
| --- | --- |
| **零构建** | 纯静态 HTML/CSS/JS，本地双击可用，GitHub Pages 零配置托管 |
| **内容与代码分离** | 新增一本书/论文只需在 `data/` 加文件，引擎零改动 |
| **可扩展** | 支持任意 `文件夹 → 文件 → 章节 → 块` 四级结构，类型可无限扩充 |
| **移动端可用** | 侧边栏抽屉 + 响应式布局 |

## 2. 三层架构

```
┌─────────────────────────────────────────────────────┐
│  index.html — 应用骨架（顶栏/侧边栏/内容区/进度条）      │
├──────────────┬──────────────────┬───────────────────┤
│  数据层 data  │   核心层 js/core  │   动画层 animations │
│  _index.js   │  registry        │  base（基类）      │
│  各知识文件    │  markup          │  sort / tree      │
│  (KB.register)│  highlight       │  graph/huffman/kmp│
│              │  renderer        │  factory（注册表） │
│              │  sidebar/search  │                   │
│              │  app（入口）      │                   │
└──────────────┴──────────────────┴───────────────────┘
       注册表模式          渲染管线              工厂模式
```

依赖方向严格单向：`app → sidebar/search → renderer → registry`，`renderer → animations/factory`。动画层不反向依赖核心层。

## 3. 数据模型

```
Folder (文件夹)
 └── File (知识文件：book / paper / note)
      ├── type      资源类型
      ├── chapters[] 章节列表
      │    ├── id / num / title / titleEn / summary / est
      │    └── blocks[]  知识块
      │         ├── type   concept|keypoint|formula|code|table|animation|error
      │         ├── points[]  考点要点
      │         ├── summary   一句话精炼
      │         ├── details[] 可折叠详解 {h, body}
      │         └── 类型特有字段（code/formula/rows/mistakes/animType…）
```

### 注册表（registry.js）

`window.KB` 单例，职责：

- `KB.defineFolder({id, title, icon})` — 定义文件夹
- `KB.register({id, folder, type, title, chapters})` — 注册知识文件（自动归入文件夹）
- `KB.filesInFolder(id)` — 某文件夹下的文件（按注册顺序）
- `KB.allBlocks()` — 全库块索引（全局搜索数据源）
- `KB.state` — 当前激活文件 / 章节 / 块（驱动侧边栏高亮与滚动定位）

## 4. 渲染管线

```
用户点击章节
   │
   ▼
KB.render.renderChapter(file, chapterId)
   ├─ 按 block.type 分发到 BlockRenderers[type]
   │    ├─ concept/keypoint → points + summary + <details> 折叠详解
   │    ├─ code  → highlight.renderCodeBlock（行号+mac圆点+复制）
   │    ├─ table → data-table（稳定/不稳定着色）
   │    ├─ animation → 生成 <canvas> + 控件，push 进 KB_PENDING_ANIMS
   │    └─ error → 对错卡片（wrong/right/why）
   ├─ 面包屑 + 章节头 + 上一章/下一章导航
   ├─ KB_UI.onChapterRendered → 侧边栏激活态同步
   └─ KB_ANIM.initAnimations() → 消费 KB_PENDING_ANIMS
```

### 行内标记（markup.js）

先转义再替换，保证数据中不注入 HTML：

| 语法 | 输出 |
| --- | --- |
| `**文字**` | `<b class="mk-key">` 红色重点 |
| `==文字==` | `<mark class="mk-mem">` 琥珀荧光 |
| `` `代码` `` | `<code class="mk-code">` 行内代码 |
| `[[口诀]] …` / `[[警示]] …` | 口诀块 / 警示块 |

### 代码高亮（highlight.js）

单正则一次完成 C 语法着色（注释 / 字符串 / 关键字 / 类型 / 数字 → `tok-*` class），行号 + 复制按钮；原始代码存于 `data-code` 属性供复制。

## 5. 动画引擎

### 基类（animations/base.js）

- **逻辑坐标** `680×300`，`_fit()` 按容器宽度等比缩放并适配 `devicePixelRatio`
- **快照步骤**：子类 `generateSteps()` 生成 `steps[]`（每步含 `arr/desc/高亮信息`），`render()` 按 `currentStep` 重绘
- **状态机**：`play / pause / stepForward / reset / setSpeed`，rAF 驱动，`stepInterval / speed` 控制节奏
- **统一适配**：`ALL_ANIMS` 记录存活实例，窗口 resize 时 `refitAll()` 统一重绘

### 工厂（animations/factory.js）

```js
AnimationFactories = {
  bubbleSort:    (c,cfg)=>new KB_ANIM.BubbleSortAnimation(c,cfg),
  quickSort:     (c,cfg)=>new KB_ANIM.QuickSortAnimation(c,cfg),
  heapSort:      (c,cfg)=>new KB_ANIM.HeapSortAnimation(c,cfg),
  mergeSort:     (c,cfg)=>new KB_ANIM.MergeSortAnimation(c,cfg),
  treeTraversal: (c,cfg)=>new KB_ANIM.TreeTraversalAnimation(c,cfg),
  graphTraversal:(c,cfg)=>new KB_ANIM.GraphTraversalAnimation(c,cfg),
  huffman:       (c,cfg)=>new KB_ANIM.HuffmanAnimation(c,cfg),
  kmp:           (c,cfg)=>new KB_ANIM.KMPAnimation(c,cfg)
}
```

新增动画三步：① 写一个继承 `AnimationBase` 的类（挂到 `KB_ANIM`）② 在 `AnimationFactories` 注册 `animType` ③ 数据文件里写 `{type:'animation', animType:'xxx', animConfig:{...}}`。控件（播放/暂停/步进/重置/变速/模式 chip）由工厂自动绑定，无需额外代码。

## 6. 数据流时序（首次打开）

```
DOMContentLoaded
   │
   ├─ KB_UI.renderTree()          // 按注册顺序渲染 文件夹→文件→章节 树
   ├─ initTree()                  // 树点击委托
   │    ├─ .ti.folder  → 展开/收起
   │    ├─ .ti.file    → loadFile(默认第一章节)
   │    └─ .ti.chapter → renderChapter
   ├─ initNav()                   // 内容区 上一章/下一章 委托
   ├─ KB.search.init()            // 搜索面板（Enter/Escape/点击跳转）
   ├─ KB_UI.initProgressBar()     // 顶部进度条
   ├─ KB_UI.initCollapse()        // 侧边栏收缩
   ├─ KB_UI.initDrawer()          // 移动端抽屉
   ├─ KB_UI.initScrollSpy()       // 滚动定位（rAF 节流）
   ├─ loadFile(第一个文件)          // 渲染首个章节
   └─ resize 监听 → KB_ANIM.refitAll()
```

## 7. 扩展指南

### 加一个资源类型（如 quiz 测验）

1. `renderer.js` 的 `BlockRenderers` 加 `quiz: renderQuiz`
2. 数据文件用 `{type:'quiz', ...}`
3. 搜索的 `blockSearchText` 视情况补充字段

### 加一种动画

见上文「动画工厂」一节，三处改动即可。

### 换肤

`css/main.css` 顶部 `:root` 中的 CSS 变量（`--accent/--surface/--radius/--shadow/--sidebar-w` 等），改变量即换主题。

## 8. 约定与注意事项

- 数据文件按 `_index.js` → 知识文件顺序在 `index.html` 加载，**新增文件需在 index.html 追加 `<script>`**
- 块 id 可省略，渲染时自动生成；动画块依赖 id 生成 `canvas-{id}` 等控件节点
- 行内标记**先转义后替换**，数据中不要写原始 HTML
- 动画 canvas 使用逻辑坐标 680×300，绘制代码只写逻辑坐标，缩放由基类处理
- 搜索/滚动定位均以 `.block` 为最小单位，新块类型要保证渲染成带 `data-block` 的 `<article class="block">`
