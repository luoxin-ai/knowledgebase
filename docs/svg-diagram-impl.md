# Phase 1 配图实施清单（逐张细化）

> 依据 `svg-diagram-plan.md` v2.1。每张图给出：挂载位置（精确到现有块）、画面布局草样、svgData 数据草样。
> 坐标均为 viewBox 680×300（个别高图 680×340）逻辑坐标，开工时按此直接落数据。
> 图 id 规则：`{科}-{内容}`，数据文件 `data/11408/diagrams-{ds,os,co,cn}.js`。

## 挂载约定

章节中插入： `{ type:'diagram', ref:'<图id>', title:'…', summary:'…' }`
位置一律放在对应 concept 块**之后**（先文字立概念，再图直观呈现）；章级总览图放该章 `blocks[0]`（章首）。

---

## A 组 · 计组结构/架构图（5 张）

### A1 `co-von-neumann` 冯·诺依曼机结构
- **挂载**：computer-org.js `冯·诺依曼机结构` concept（现 29 行）之后。
- **布局**：中央"运算器+控制器"合为 CPU 大框，左侧输入设备、右侧输出设备、下方主存储器，箭头标数据流（实线）/控制流（虚线）。
- **草样**：
```
        输入设备 ──数据──> ┌─────────────┐ ──数据──> 输出设备
                          │  CPU        │
   主存储器 <==数据/地址==> │ 运算器+控制器 │
                          └─────────────┘
                    控制器 ╌╌控制流╌╌> 各部件
```
- **svgData**：nodes: 输入(60,150) 存储器(340,250) CPU 大框含 运算器(280,120)/控制器(400,120) 输出(620,150)；edges: 实线数据流（入→CPU、CPU→出、存储↔CPU），虚线控制流（控制器→其余四者）。全部 rect。

### A2 `co-mem-hierarchy` 存储层次结构
- **挂载**：computer-org.js `存储层次结构` concept（现 305 行）之后。
- **布局**：金字塔五层（寄存器/Cache/主存/辅存/外存），左缘标注"速度↑ 成本↑"、右缘"容量↑"，越上越窄。
- **草样**：
```
        ┌─寄存器─┐      快 · 贵
       ┌──Cache──┐       ↑
      ┌───主存────┐       │ 速度/成本
     ┌────辅存─────┐      │
    ┌─────外存──────┐     慢 · 廉 · 大容量
```
- **svgData**：5 个 rect 自上而下递增宽度、垂直堆叠；notes 左"速度↑ 成本↑"右"容量↑"。tone 由 blue→gray 渐冷。

### A3 `co-cpu-composition` CPU 的功能与组成
- **挂载**：computer-org.js `CPU 的功能与组成` concept（现 568 行）之后。
- **布局**：外框 CPU，内分左右两大块（运算器 / 控制器），下横一条"内部总线"贯穿。
- **草样**：
```
┌──────────────── CPU ────────────────┐
│ ┌─运算器─┐   ┌─控制器─┐              │
│ │ALU/ACC/│   │PC/IR/ID│              │
│ │PSW/暂存│   │/时序电路 │              │
│ └───────┘   └────────┘              │
│ ════════ 内部总线 ════════            │
└─────────────────────────────────────┘
```
- **svgData**：rect 容器 + 内嵌 rect；运算器(180,140) 控制器(460,140) 内部总线(340,240)。notes 标各寄存器名。

### A4 `co-bus-topology` 总线拓扑对比
- **挂载**：computer-org.js `总线分类` concept（现 728 行）之后。
- **布局**：横向并排三小图——单总线 / 双总线 / 三总线，各标 CPU/主存/IOP 挂接差异。
- **草样**：
```
 单总线            双总线             三总线
CPU—主存—I/O   CPU═主存(主存总线)   CPU═主存
 ═══总线═══      └—I/O(I/O总线)    DMA═I/O + 系统总线
```
- **svgData**：三组（每组 3-4 rect + 1-3 横线边），x 分三区 60/280/500。notes 标总线名。

### A5 `co-datapath` 简化数据通路（raw）
- **挂载**：computer-org.js `数据通路` concept（现 598 行）之后。
- **说明**：一次性图，走 raw 逃生舱（三条铁律）。PC→MAR→主存→MDR→IR/ALU 取指数据流。
- **草样**：
```
PC → MAR → 主存 → MDR → IR(指令) / ALU(数据)
              ↑____地址总线____|
```

---

## B 组 · 章级心智地图 / 演进图（4 张，放章首 blocks[0]）

### B1 `ds-tree-evolution` 查找结构演进（重点示例）
- **挂载**：data-structure.js 查找章 ch6（现 742 行）`blocks` 开头。
- **布局**：横向演进链，四节点自下标注"解决的问题"，边标注演进动因（优缺点）。
- **草样**：
```
BST ──失衡退化为链表──> AVL ──旋转频繁/严格──> 红黑树 ──磁盘IO/层深──> B/B+树
O(n)最坏                严格平衡 h=logn        近似平衡 少旋转      多路 矮胖 适配外存
```
- **svgData**：4 个 rect 水平排列 x=90/250/410/570，y=120；edges 三条水平箭头，label 分别"失衡退化"/"旋转代价"/"磁盘层深"；notes 下方标各自复杂度/特性。tone: BST=red(缺陷) AVL=amber 红黑=green B+=blue。

### B2 `ds-sort-overview` 排序五大类族谱
- **挂载**：data-structure.js 排序章 ch7（现 ~956 行）`blocks` 开头。
- **布局**：顶层"内部排序"分五支——插入/交换/选择/归并/基数，每支挂具体算法。
- **草样**：
```
                    内部排序
      ┌────┬────┬────┬────┐
     插入  交换  选择  归并  基数
     直插  冒泡  简选  二路  多关键字
     折半  快排  堆排  归并
     希尔
```
- **svgData**：根 rect(340,50) + 5 类 rect(x=90..590,y=140) + 各类下挂算法 note(y=180+)。edges 树形连线 arrow:false。

### B3 `os-ch2-overview` 进程章知识骨架
- **挂载**：operating-system.js ch2（现 212 行）`blocks` 开头。
- **布局**：中心"进程"辐射六大块——概念/状态转换/调度/同步互斥/通信/死锁。
- **草样**：
```
        概念/组成   状态转换   调度
              \     |     /
              【 进程管理 】
              /     |     \
         同步互斥  通信   死锁
```
- **svgData**：中心 rect(340,150) + 六 rect 环绕（上三 y=60、下三 y=250）；edges 中心→各 arrow:false。

### B4 `cn-layer-overview` 计网五层总览
- **挂载**：computer-network.js ch1（现 22 行）`blocks` 开头。
- **布局**：五层纵向堆叠，每层右标数据单位（比特/帧/分组/报文段/报文），左标对应章号。
- **草样**：
```
ch6 应用层     报文
ch5 传输层     报文段
ch4 网络层     分组
ch3 数据链路层 帧
ch2 物理层     比特
```
- **svgData**：5 rect 垂直堆叠(x=300,y=60..260)，notes 左列章号、右列数据单位。

---

## C 组 · 原保留理解增量图（11 张）

### C1-C4 `ds-avl-ll/rr/lr/rl` AVL 四种旋转（4 张）
- **挂载**：data-structure.js `平衡二叉树 AVL` concept（现 810 行）之后，四张连排。
- **布局**：每张左右两棵小树——"转前(失衡)"→"转后(平衡)"，中间箭头，标失衡节点与旋转方向。
- **草样**（LL）：
```
   3(失衡)              2
  /        右旋        / \
 2        ───>       1   3
 /
1
```
- **svgData**：每图两组 circle 节点（左组转前、右组转后）+ 中央旋转箭头 note。LL/RR 单旋 3 节点，LR/RL 双旋 4-5 节点。失衡节点 tone:red。

### C5 `ds-bst` 二叉排序树结构
- **挂载**：data-structure.js `二叉排序树 BST` concept（现 796 行）之后。
- **布局**：一棵示例 BST（50/30/70/20/40/60/80），标注"左<根<右"。
- **svgData**：即此前示例图坐标，circle 节点 3 层，notes"左子树""右子树"。

### C6 `ds-heap-view` 堆的数组↔树双视图
- **挂载**：data-structure.js 排序章 `堆排序：原理与特性` concept（现 1232 行）之前（堆结构先于堆排序）。
- **布局**：上排数组（下标 1..n），下排完全二叉树，虚线连接下标与节点对应。
- **草样**：
```
下标:  1    2    3    4    5
数组: [9]  [7]  [8]  [5]  [6]
树:       9
        /   \
       7     8
      / \
     5   6     (下标 i ↔ 左2i 右2i+1)
```
- **svgData**：数组 5 rect(y=80) + 树 5 circle(y=180/250) + 虚线 edges(dashed) 连对应。note 标父子下标公式。

### C7 `os-proc-states` 进程五状态转换
- **挂载**：operating-system.js `进程状态与转换` concept（现 244 行）之后。
- **布局**：即此前示例图——新建/就绪/运行/阻塞/终止 + 接纳/调度/抢占/IO等待/事件发生/退出。
- **svgData**：5 rect + 6 edge（含就绪↔运行往返 curve）。运行 tone:green 阻塞 tone:red。

### C8 `os-deadlock-rag` 死锁资源分配图
- **挂载**：operating-system.js `银行家算法(死锁避免)` concept（现 507 行）之前（紧邻死锁四条件讲解）。
- **布局**：P1→R1→P2→R2→P1 构成环，圆圈进程、方块资源，标"环 = 死锁"。
- **草样**：
```
P1 ──请求──> R2
 ↑            │
R1 <──请求── P2
(P1持R1等R2, P2持R2等R1, 循环等待)
```
- **svgData**：进程 2 circle + 资源 2 rect + 4 edge 成环；note"存在环 → 死锁"。

### C9 `co-cache-addr` Cache 地址位段（bitfield）
- **挂载**：computer-org.js `Cache 基本工作原理` concept（现 361 行）之后。
- **说明**：bitfield 生成器。32 位主存地址 = 标记/行索引(组相联为组索引)/块内偏移。
- **svgData**：`{ totalBits:32, segs:[{name:'标记',bits:22},{name:'行索引',bits:8},{name:'块内偏移',bits:2}] }`（直接映射示例），bitLabels 标 31..0。

### C10 `co-instr-fmt` 指令格式位段（bitfield）
- **挂载**：computer-org.js `指令格式` concept（现 476 行）之后。
- **svgData**：`{ totalBits:32, segs:[{name:'操作码',bits:6},{name:'源寄存器',bits:5},{name:'目的寄存器',bits:5},{name:'偏移/立即数',bits:16}] }`。

### C11 `cn-tcp-states` TCP 状态机
- **挂载**：computer-network.js `TCP 连接管理：三次握手与四次挥手` concept（现 599 行）之后。
- **布局**：CLOSED→SYN_SENT→ESTABLISHED→FIN_WAIT→…→TIME_WAIT→CLOSED，主干垂直、分支水平。
- **svgData**：约 11 状态 rect + 转换边 label（SYN/ACK/FIN/超时）。ESTABLISHED tone:green。

---

## 落地顺序（供开工执行）

1. 引擎：`js/svg/registry.js` + `js/svg/generators.js`（graph + bitfield）。
2. 渲染：`renderer.js` diagram case + `css/main.css` dg-* 类 + `index.html` 两个 script。
3. 数据：四个 `diagrams-*.js`（A5 co-datapath 为 raw）。
4. manifest 四行 + 四教材文件插入 diagram 块。
5. smoke：schema 校验 + 渲染断言（约 20 张）。
6. README 更新。

> 坐标草样已给出相对位置，开工时按此落成精确 svgData；若某图画面失衡，只调该图 data 的 x/y，不动生成器。
