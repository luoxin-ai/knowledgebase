# SVG 图示方案 v2（定稿）

> 状态：定稿，待开工。本版已吸收评审报告（`svg-diagram-review.md`）全部修订与用户四条补充：
> 1. 允许产出架构图；2. 针对性设计，需要才加；3. 每个图独立产生、按 id 引入章节；4. 分章配图由方案给定，唯一标准是帮助理解。

## 1. 原则（不可妥协）

- **帮助理解是唯一准入标准。** 一张图只要属于下列两类之一即准入，不以"考试高频"为硬门槛：
  1. **关系/结构型**：知识的本体是"组成与连接关系"（冯·诺依曼五大部件、存储层次、CPU 组成、总线拓扑、树的演进链）。这类内容文字是"逐个罗列"，图是"整体呈现"，理解效率本质不同。
  2. **章级心智地图**：一章内多个并列/演进的知识点（BST→AVL→红黑→B/B+），用一张架构/演进图建立整章框架，放在章首或章中总览位置。
  - 仍需排除：已有动画覆盖的"过程/步骤"不再配静态图（动画讲过程，结构图讲组成，两者不冲突；但同一知识点若动画已把关系讲透则不重复）。
- **降低耦合是第一架构标准。** 生成器只保留 2 个；坐标写死在数据里，生成器做哑巴渲染器；图与图之间零共享。
- **零依赖、无构建。** 纯函数生成 SVG 字符串，颜色全部走 CSS 变量，深/浅色自动适配。
- **可测。** 生成器无 DOM 依赖，smoke 测试对每个图做 schema 校验，fail loudly。

## 2. 架构：图独立产生，章节按 id 引入

```
data/11408/diagrams-ds.js 等         js/svg/registry.js        js/svg/generators.js
（每科一个图数据文件）                 （KB_DIAG 注册表）          （渲染引擎）
----------------------------         -----------------        ------------------
KB_DIAG.register({                   KB_DIAG.register()        KB_SVG.graph(data)
  id:'ds-avl-ll',                    KB_DIAG.get(id)           KB_SVG.bitfield(data)
  svgType:'graph',                   KB_DIAG.list()            （哑巴渲染器，无自动布局）
  title:'AVL · LL 型旋转',
  data:{ nodes:[...], edges:[...] }
})

js/core/renderer.js                  data/11408/data-structure.js
-------------------                  ---------------------------
renderDiagram(b):                    { type:'diagram', ref:'ds-avl-ll',
  d = KB_DIAG.get(b.ref)               title:'LL 型旋转', summary:'...' }
  → d.svg ? d.svg                     （章节只写引用，不含图形数据）
    : KB_SVG[d.svgType](d.data)
```

关键性质：
- **渲染期按 id 查表**，与 quiz 文件的 quizFor 模式一致；数据文件加载顺序无关。
- **章节文件保持瘦**：不含坐标数据，图的新增/修改不触碰章节文件。
- **图可复用**：同一 id 可被多章引用。
- **图可独立测试**：smoke 遍历 KB_DIAG 注册表逐图校验。

加载接线：
- `index.html` 增加 `<script src="js/svg/registry.js">`、`<script src="js/svg/generators.js">`（在 renderer.js 之前）。
- `data/manifest.js` 在每科教材文件后加对应 `diagrams-*.js`。
- `js/core/renderer.js` 的 `BlockRenderers` 增加 `diagram` 一个 case（≤ 10 行）。

## 3. 两个生成器的输入契约（全部，不再增加）

### 3.1 `graph` —— 通用节点-边哑巴渲染器

覆盖：树、状态机、资源分配图、哈希桶对比、架构图（rect 节点平铺/层叠）、索引结构。

```js
{
  width: 680, height: 300,            // viewBox，可省（默认 680×300）
  nodes: [
    { id:'a', x:340, y:40, label:'50',
      shape:'circle'|'rect',          // 默认 circle；rect 用于状态/架构/位块
      w:110, h:44,                    // rect 必填
      tone:'blue'|'green'|'red'|'amber'|'gray'  // 语义色，映射 CSS 变量，默认 blue
    }
  ],
  edges: [
    { from:'a', to:'b', label:'调度', // label 可省
      curve:0..1,                     // 弯曲度，默认 0（直线）
      arrow:true,                     // 默认 true；树边可 false
      dashed:false }
  ],
  notes: [ { x, y, text, tone? } ]    // 自由标注（如「左子树」）
}
```

规则：x/y 一律由作者写死；生成器不做任何自动布局；任何图形状变化只改数据。

### 3.2 `bitfield` —— 位段条

覆盖：cache 地址划分、指令格式、CIDR 网络/主机位、页式地址。

```js
{
  totalBits: 32,
  segs: [ { name:'标记', bits:22, note:'tag' },
          { name:'行索引', bits:8 },
          { name:'块内偏移', bits:2 } ],
  bitLabels: true                     // 是否标 31..0 位号
}
```

规则：segs 的 bits 之和必须等于 totalBits（smoke 校验）。

### 3.3 raw SVG 逃生舱（一次性图专用）

`KB_DIAG.register({ id, svg:'<svg ...>' })`。仅当某图型只有一个使用点时允许。三条铁律：
1. 颜色必须走 CSS 变量，禁写死 hex 色值；
2. 禁任何外部引用（http、字体、图片、脚本）；
3. 必须含 viewBox、role="img"、`<title>`/`<desc>`，进 smoke 结构校验。
全库 raw 图占比上限 20%，超过即把该图型抽象成生成器。

## 4. 分章配图清单（衡量结果，唯一标准是帮助理解）

### Phase 1（本次开工，约 20 张）

#### A. 结构与关系图（计组为主，文字罗列 → 整体呈现）

| 图 id | 科目 · 章 · 挂载位置 | 图型 | 帮助理解的价值 |
|-------|----------------------|------|----------------|
| co-von-neumann | 计组 · ch1 · 替换/紧邻「冯·诺依曼机结构」concept | graph | 五大部件 + 数据/控制流连接关系，文字是罗列、图是结构 |
| co-mem-hierarchy | 计组 · ch3 · 紧邻「存储层次结构」concept | graph | 寄存器→Cache→主存→辅存的层级 + 速度/容量/成本反向梯度 |
| co-cpu-composition | 计组 · ch5 · 紧邻「CPU 的功能与组成」concept | graph | 运算器/控制器/寄存器组/内部总线的组成关系 |
| co-bus-topology | 计组 · ch6 · 紧邻「总线分类」concept | graph | 单总线 / 双总线 / 三总线拓扑对比 |
| co-datapath | 计组 · ch5 · 紧邻「数据通路」concept | raw | 简化数据通路（PC→MAR→MDR→ALU），一次性图走逃生舱 |

#### B. 章级心智地图 / 演进图（新增图型，放章首或章中）

| 图 id | 科目 · 章 | 图型 | 帮助理解的价值 |
|-------|-----------|------|----------------|
| ds-tree-evolution | DS · ch6 查找 · 章首总览 | graph | BST（失衡缺陷）→AVL（严格平衡）→红黑（近似平衡）→B/B+（多路，适配外存），由优缺点驱动的演进链，一张图建立整章框架 |
| ds-sort-overview | DS · ch7 排序 · 章首 | graph | 插入/交换/选择/归并/基数 五大类族谱，先见森林再见树木 |
| os-ch2-overview | OS · ch2 · 章首 | graph | 进程概念→状态→控制→同步→通信→死锁 的知识骨架 |
| cn-layer-overview | 计网 · ch1 · 章首 | graph | 五层体系结构一章全貌，后续各章定位图 |

#### C. 原 Phase 1 保留图（理解增量已论证）

| 图 id | 科目 · 章 | 图型 | 帮助理解的价值 |
|-------|-----------|------|----------------|
| ds-avl-ll / rr / lr / rl | DS · ch4 | graph ×4 | 旋转静态结构对照，必考 |
| ds-bst | DS · ch6 | graph | 左小右大结构性质即本体（移到查找章，紧邻 BST concept） |
| ds-heap-view | DS · ch4 | graph | 数组 ↔ 完全二叉树双视图 |
| os-proc-states | OS · ch2 | graph | 五状态转换 |
| os-deadlock-rag | OS · ch2 | graph | 环 = 死锁的直觉 |
| co-cache-addr | 计组 · ch3 | bitfield | 位段划分 |
| co-instr-fmt | 计组 · ch4 | bitfield | 操作码/地址码位段 |
| cn-tcp-states | 计网 · ch5 | graph | 状态机 |

> ds-bst 从 ch4 移到 ch6（查找章紧邻「二叉排序树 BST」concept），与 ds-tree-evolution 同章呼应。

### Phase 2（按需启动，不进本次范围）

| 图 id | 科目 · 章 | 图型 | 说明 |
|-------|-----------|------|------|
| cn-tcp-handshake | 计网 · ch5 | raw（先） | 三次握手/四次挥手时序；若时序型使用点 ≥3 再抽象 lifeline 生成器 |
| cn-cidr | 计网 · ch4 网络层 | bitfield | 生成器复用，成本近零 |
| ds-hash-cmp | DS · ch6 查找 | graph | 链地址 vs 开放定址对比 |
| ds-btree-cmp | DS · ch6 | graph | B 树 vs B+ 树结构差异 |
| os-inode | OS · ch4 文件管理 | graph | 多级索引结构 |
| os-ch3-overview | OS · ch3 内存管理 | graph | 内存管理章首心智地图（连续→分页→分段→段页→虚拟） |
| co-ch2-evolution | 计组 · ch2 | graph | 数据表示演进（原码→反码→补码→移码）解决问题链 |

### 明确不配图（衡量后的否定结论）

- **已被动画覆盖的"过程"**：8 种排序、树/图遍历、Huffman、KMP、页面置换、进程调度、滑动窗口、cache 映射、流水线、黎曼积分、矩阵乘法。结构图/演进图不受此限（讲组成与关系，非过程）。
- **文字/表格更优**：PV 模型（代码是本体）、ARP/DNS 文字步骤、DS 前三章与第 8 章、OS ch1/ch3/ch5（除 ch2 章首图外）。
- **整科不配图**：数学三科（plot 成本高、增量低）、政治、英语。
- **架构图已纳入 Phase 1**：co-von-neumann、co-cpu-composition、co-bus-topology、co-mem-hierarchy 及四张章级演进/总览图，均为 graph 的 rect 节点实现，无需新生成器。

## 5. 落地步骤（Phase 1）

1. `js/svg/registry.js`：KB_DIAG（register/get/list）。
2. `js/svg/generators.js`：KB_SVG.graph + KB_SVG.bitfield（哑巴渲染器）。
3. `js/core/renderer.js`：BlockRenderers 加 diagram case。
4. `css/main.css`：dg-node/dg-edge/dg-label/dg-note 等语义类，全部引用现有 CSS 变量。
5. `index.html`：两个 script 标签。
6. `data/11408/diagrams-{ds,os,co,cn}.js` 四个图数据文件（Phase 1 约 20 张图）。
7. `data/manifest.js`：四行。
8. 四个教材文件对应章节插入 `{type:'diagram', ref}` 块（放在相关 concept 块之后）。
9. `test/smoke.test.js`：schema 校验（每条 edge 引用存在的节点 id、bitfield 位数守恒、raw 铁律）+ 每图渲染产物含 `<svg` 断言 + ref 全部可解析断言。
10. README：新增块类型说明与图示数量。

## 6. 验收标准

- `npm test` 全绿；新增断言覆盖全部 Phase 1 图（约 20 张）。
- 全站零依赖、无构建；深/浅色下所有图清晰可读。
- 章节文件 diff 只含 ref 引用行，不含坐标数据。
- 图与图之间无共享数据；任意删一张图不影响其他任何图与任何测试（除其自身断言）。
