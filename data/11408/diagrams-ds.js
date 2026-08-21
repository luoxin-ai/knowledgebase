/* ================================================================
 * data/11408/diagrams-ds.js —— 数据结构科图示（KB_DIAG 注册）
 * ----------------------------------------------------------------
 * 图类型：graph（节点-边），坐标写死。渲染由 js/svg/generators.js 完成。
 * 挂载位置见 data-structure.js 对应 concept 块后（或章首 blocks[0]）。
 * ================================================================ */
(function(){
  'use strict';
  const R = KB_DIAG.register.bind(KB_DIAG);

  /* ——— AVL 四种旋转（转前失衡 → 转后平衡，左右并排） ——— */
  R({ id:'ds-avl-ll', svgType:'graph', title:'AVL · LL 型旋转（右单旋）',
    data:{ title:'AVL · LL 型旋转（右单旋）', width:680, height:260,
      nodes:[
        {id:'a1',shape:'circle',x:150,y:60,label:'3',tone:'red',r:20},
        {id:'a2',shape:'circle',x:150,y:140,label:'2',r:20},
        {id:'a3',shape:'circle',x:150,y:220,label:'1',r:20},
        {id:'b2',shape:'circle',x:470,y:140,label:'2',tone:'green',r:20},
        {id:'b1',shape:'circle',x:400,y:220,label:'1',r:20},
        {id:'b3',shape:'circle',x:540,y:220,label:'3',r:20}
      ],
      edges:[ {from:'a1',to:'a2',arrow:false},{from:'a2',to:'a3',arrow:false},
               {from:'b2',to:'b1',arrow:false},{from:'b2',to:'b3',arrow:false} ],
      notes:[ {x:340,y:70,text:'右单旋',small:true},{x:150,y:24,text:'失衡',small:true},
               {x:470,y:104,text:'平衡',small:true} ] } });

  R({ id:'ds-avl-rr', svgType:'graph', title:'AVL · RR 型旋转（左单旋）',
    data:{ title:'AVL · RR 型旋转（左单旋）', width:680, height:260,
      nodes:[
        {id:'a1',shape:'circle',x:150,y:60,label:'1',tone:'red',r:20},
        {id:'a2',shape:'circle',x:150,y:140,label:'2',r:20},
        {id:'a3',shape:'circle',x:150,y:220,label:'3',r:20},
        {id:'b2',shape:'circle',x:470,y:140,label:'2',tone:'green',r:20},
        {id:'b1',shape:'circle',x:400,y:220,label:'1',r:20},
        {id:'b3',shape:'circle',x:540,y:220,label:'3',r:20}
      ],
      edges:[ {from:'a1',to:'a2',arrow:false},{from:'a2',to:'a3',arrow:false},
               {from:'b2',to:'b1',arrow:false},{from:'b2',to:'b3',arrow:false} ],
      notes:[ {x:340,y:70,text:'左单旋',small:true},{x:150,y:24,text:'失衡（右链）',small:true},
               {x:470,y:104,text:'平衡',small:true} ] } });

  R({ id:'ds-avl-lr', svgType:'graph', title:'AVL · LR 型旋转（先左后右双旋）',
    data:{ title:'AVL · LR 型旋转（先左后右双旋）', width:680, height:260,
      nodes:[
        {id:'a3',shape:'circle',x:150,y:60,label:'3',tone:'red',r:20},
        {id:'a1',shape:'circle',x:100,y:140,label:'1',r:20},
        {id:'a2',shape:'circle',x:200,y:220,label:'2',r:20},
        {id:'b2',shape:'circle',x:470,y:140,label:'2',tone:'green',r:20},
        {id:'b1',shape:'circle',x:400,y:220,label:'1',r:20},
        {id:'b3',shape:'circle',x:540,y:220,label:'3',r:20}
      ],
      edges:[ {from:'a3',to:'a1',arrow:false},{from:'a1',to:'a2',arrow:false},
               {from:'b2',to:'b1',arrow:false},{from:'b2',to:'b3',arrow:false} ],
      notes:[ {x:340,y:70,text:'先左后右双旋',small:true},{x:150,y:24,text:'失衡',small:true},
               {x:470,y:104,text:'平衡',small:true} ] } });

  R({ id:'ds-avl-rl', svgType:'graph', title:'AVL · RL 型旋转（先右后左双旋）',
    data:{ title:'AVL · RL 型旋转（先右后左双旋）', width:680, height:260,
      nodes:[
        {id:'a1',shape:'circle',x:150,y:60,label:'1',tone:'red',r:20},
        {id:'a3',shape:'circle',x:200,y:140,label:'3',r:20},
        {id:'a2',shape:'circle',x:100,y:220,label:'2',r:20},
        {id:'b2',shape:'circle',x:470,y:140,label:'2',tone:'green',r:20},
        {id:'b1',shape:'circle',x:400,y:220,label:'1',r:20},
        {id:'b3',shape:'circle',x:540,y:220,label:'3',r:20}
      ],
      edges:[ {from:'a1',to:'a3',arrow:false},{from:'a3',to:'a2',arrow:false},
               {from:'b2',to:'b1',arrow:false},{from:'b2',to:'b3',arrow:false} ],
      notes:[ {x:340,y:70,text:'先右后左双旋',small:true},{x:150,y:24,text:'失衡',small:true},
               {x:470,y:104,text:'平衡',small:true} ] } });

  /* ——— 二叉排序树结构性质 ——— */
  R({ id:'ds-bst', svgType:'graph', title:'二叉排序树（BST）结构',
    data:{ title:'二叉排序树（BST）结构', width:680, height:250,
      nodes:[
        {id:'n50',shape:'circle',x:340,y:50,label:'50',r:20},
        {id:'n30',shape:'circle',x:230,y:130,label:'30',r:20},
        {id:'n70',shape:'circle',x:450,y:130,label:'70',r:20},
        {id:'n20',shape:'circle',x:170,y:210,label:'20',r:20},
        {id:'n40',shape:'circle',x:290,y:210,label:'40',r:20},
        {id:'n60',shape:'circle',x:400,y:210,label:'60',r:20},
        {id:'n80',shape:'circle',x:510,y:210,label:'80',r:20}
      ],
      edges:[ {from:'n50',to:'n30',arrow:false},{from:'n50',to:'n70',arrow:false},
               {from:'n30',to:'n20',arrow:false},{from:'n30',to:'n40',arrow:false},
               {from:'n70',to:'n60',arrow:false},{from:'n70',to:'n80',arrow:false} ],
      notes:[ {x:340,y:18,text:'左子树 < 根 < 右子树',small:false} ] } });

  /* ——— 堆：数组 ↔ 完全二叉树双视图 ——— */
  R({ id:'ds-heap-view', svgType:'graph', title:'堆：数组下标 ↔ 完全二叉树',
    data:{ title:'堆：数组下标 ↔ 完全二叉树', width:680, height:320,
      nodes:[
        {id:'a1',shape:'rect',x:138,y:80,w:56,h:36,label:'9',tone:'blue'},
        {id:'a2',shape:'rect',x:248,y:80,w:56,h:36,label:'7',tone:'blue'},
        {id:'a3',shape:'rect',x:358,y:80,w:56,h:36,label:'8',tone:'blue'},
        {id:'a4',shape:'rect',x:468,y:80,w:56,h:36,label:'5',tone:'blue'},
        {id:'a5',shape:'rect',x:578,y:80,w:56,h:36,label:'6',tone:'blue'},
        {id:'t9',shape:'circle',x:340,y:170,label:'9',r:18,tone:'green'},
        {id:'t7',shape:'circle',x:250,y:230,label:'7',r:18},
        {id:'t8',shape:'circle',x:430,y:230,label:'8',r:18},
        {id:'t5',shape:'circle',x:205,y:290,label:'5',r:18},
        {id:'t6',shape:'circle',x:290,y:290,label:'6',r:18}
      ],
      edges:[ {from:'a1',to:'t9',dashed:true,arrow:false},{from:'a2',to:'t7',dashed:true,arrow:false},
               {from:'a3',to:'t8',dashed:true,arrow:false},{from:'a4',to:'t5',dashed:true,arrow:false},
               {from:'a5',to:'t6',dashed:true,arrow:false} ],
      notes:[ {x:340,y:30,text:'大顶堆：父 ≥ 子（小顶堆则父 ≤ 子）——堆序性质'},
               {x:340,y:58,text:'数组下标 i ↔ 完全二叉树（左孩子 2i、右孩子 2i+1，1-based）',small:true} ] } });

  /* ——— 查找结构演进（章首心智地图） ——— */
  R({ id:'ds-tree-evolution', svgType:'graph', title:'查找结构演进：由优缺点驱动的选型链',
    data:{ title:'查找结构演进：由优缺点驱动的选型链', width:680, height:230,
      nodes:[
        {id:'bst',shape:'rect',x:90, y:120,w:110,h:56,label:'BST',tone:'red'},
        {id:'avl',shape:'rect',x:250,y:120,w:110,h:56,label:'AVL',tone:'amber'},
        {id:'rb', shape:'rect',x:410,y:120,w:110,h:56,label:'红黑树',tone:'green'},
        {id:'bt', shape:'rect',x:570,y:120,w:110,h:56,label:'B/B+树',tone:'blue'}
      ],
      edges:[ {from:'bst',to:'avl',label:'失衡退化'},{from:'avl',to:'rb',label:'旋转代价'},
               {from:'rb',to:'bt',label:'磁盘 IO'} ],
      notes:[ {x:90, y:200,text:'O(n) 最坏',small:true},{x:250,y:200,text:'严格平衡 h=logn',small:true},
               {x:410,y:200,text:'近似平衡 少旋转',small:true},{x:570,y:200,text:'多路 矮胖 适配外存',small:true} ] } });

  /* ——— 排序五大类族谱（章首） ——— */
  R({ id:'ds-sort-overview', svgType:'graph', title:'排序五大类族谱',
    data:{ title:'排序五大类族谱', width:680, height:230,
      nodes:[
        {id:'root',shape:'rect',x:340,y:40, w:120,h:44,label:'内部排序',tone:'blue'},
        {id:'ins', shape:'rect',x:100,y:140,w:90, h:40,label:'插入类',tone:'blue'},
        {id:'exc', shape:'rect',x:220,y:140,w:90, h:40,label:'交换类',tone:'blue'},
        {id:'sel', shape:'rect',x:340,y:140,w:90, h:40,label:'选择类',tone:'blue'},
        {id:'mer', shape:'rect',x:460,y:140,w:90, h:40,label:'归并类',tone:'blue'},
        {id:'rad', shape:'rect',x:580,y:140,w:90, h:40,label:'基数类',tone:'blue'}
      ],
      edges:[ {from:'root',to:'ins',arrow:false},{from:'root',to:'exc',arrow:false},
               {from:'root',to:'sel',arrow:false},{from:'root',to:'mer',arrow:false},
               {from:'root',to:'rad',arrow:false} ],
      notes:[ {x:100,y:190,text:'直接/折半/希尔',small:true},{x:220,y:190,text:'冒泡/快速',small:true},
               {x:340,y:190,text:'简单/堆',small:true},{x:460,y:190,text:'二路归并',small:true},
               {x:580,y:190,text:'多关键字',small:true} ] } });

  /* =============== 章首主记忆图（仅凭一图回忆整章） =============== */

  /* ——— 第1章 绪论：数据结构三要素 + 算法两大复杂度（分区容器版） ——— */
  R({ id:'ds-ch1-overview', svgType:'graph', title:'绪论 · 主记忆图',
    data:{ width:680, height:290, title:'绪论 · 主记忆图',
      containers:[
        {id:'cds', tone:'green', x:185,y:160,w:280,h:130,label:'数据结构三要素'},
        {id:'calg',tone:'amber', x:495,y:160,w:280,h:130,label:'算法'}
      ],
      nodes:[
        {id:'l', shape:'rect',x:100,y:120,w:96,h:38,label:'逻辑结构',tone:'green'},
        {id:'s', shape:'rect',x:210,y:120,w:96,h:38,label:'存储结构',tone:'green'},
        {id:'o', shape:'rect',x:155,y:175,w:96,h:38,label:'数据运算',tone:'green'},
        {id:'t', shape:'rect',x:440,y:130,w:120,h:44,label:'时间复杂度',tone:'amber'},
        {id:'sp',shape:'rect',x:565,y:130,w:120,h:44,label:'空间复杂度',tone:'amber'}
      ],
      edges:[ {from:'cds',to:'calg',label:'求解问题的两大维度'} ],
      notes:[ {x:100,y:150,text:'线性/树/图',small:true},{x:210,y:150,text:'顺序/链式',small:true},
               {x:440,y:184,text:'O 大O记法',small:true},{x:565,y:184,text:'辅助空间',small:true},
               {x:340,y:262,text:'数据结构解决「怎么存」，算法解决「怎么算」，复杂度衡量「有多好」',small:true} ] } });

  /* ——— 第2章 线性表：顺序表 vs 链表 对比双栏 ——— */
  R({ id:'ds-ch2-overview', svgType:'graph', title:'线性表 · 主记忆图',
    data:{ width:680, height:300, title:'线性表 · 主记忆图',
      containers:[
        {id:'cseq',tone:'green',x:180,y:150,w:300,h:170,label:'顺序表（数组）'},
        {id:'clnk',tone:'amber',x:500,y:150,w:300,h:170,label:'链表（指针）'}
      ],
      nodes:[
        {id:'s1',shape:'rect',x:180,y:112,w:240,h:34,label:'随机存取 O(1)',tone:'green'},
        {id:'s2',shape:'rect',x:180,y:158,w:240,h:34,label:'插删 O(n) 需移动',tone:'green'},
        {id:'k1',shape:'rect',x:500,y:112,w:240,h:34,label:'插删 O(1) 改指针',tone:'amber'},
        {id:'k2',shape:'rect',x:500,y:158,w:240,h:34,label:'查找 O(n) 顺序扫',tone:'amber'}
      ],
      edges:[ {from:'cseq',to:'clnk',label:'同一逻辑结构的两种存储取舍',curve:0.18} ],
      notes:[ {x:340,y:284,text:'静态链表：用数组+游标模拟指针，兼具两者特点',small:true} ] } });

  /* ——— 第3章 栈、队列与数组 ——— */
  R({ id:'ds-ch3-overview', svgType:'graph', title:'栈、队列与数组 · 主记忆图',
    data:{ width:680, height:300, title:'栈、队列与数组 · 主记忆图',
      containers:[
        {id:'cstk',tone:'red',  x:120,y:140,w:190,h:150,label:'栈 LIFO'},
        {id:'cque',tone:'green',x:340,y:140,w:190,h:150,label:'队列 FIFO'},
        {id:'carr',tone:'blue', x:560,y:140,w:190,h:150,label:'数组/矩阵压缩'}
      ],
      nodes:[
        {id:'stk1',shape:'rect',x:120,y:112,w:150,h:32,label:'括号匹配·表达式·递归',tone:'red'},
        {id:'que1',shape:'rect',x:340,y:100,w:150,h:32,label:'循环队列判空满',tone:'green'},
        {id:'que2',shape:'rect',x:340,y:142,w:150,h:32,label:'双端队列',tone:'green'},
        {id:'arr1',shape:'rect',x:560,y:112,w:150,h:32,label:'行/列优先寻址',tone:'blue'}
      ],
      edges:[],
      notes:[ {x:120,y:170,text:'后进先出，栈顶操作',small:true},
               {x:560,y:170,text:'对称/三角/稀疏压缩',small:true},
               {x:340,y:284,text:'栈与队列都是「操作受限的线性表」——受限方式即考点',small:true} ] } });

  /* ——— 第4章 树与二叉树 ——— */
  R({ id:'ds-ch4-overview', svgType:'graph', title:'树与二叉树 · 主记忆图',
    data:{ width:680, height:340, title:'树与二叉树 · 主记忆图',
      containers:[
        {id:'cprop',tone:'blue', x:340,y:64, w:620,h:72, label:'二叉树性质（根基）'},
        {id:'ctrav',tone:'green',x:105,y:205,w:180,h:120,label:'遍历与还原'},
        {id:'cclu', tone:'amber',x:295,y:205,w:170,h:120,label:'线索二叉树'},
        {id:'ccnv', tone:'green',x:475,y:205,w:170,h:120,label:'树/森林转换'},
        {id:'chuf', tone:'red',  x:617,y:205,w:106,h:120,label:'哈夫曼树'}
      ],
      nodes:[
        {id:'trav1',shape:'rect',x:105,y:180,w:150,h:34,label:'前中后+层次',tone:'green'},
        {id:'clu1', shape:'rect',x:295,y:180,w:140,h:34,label:'空指针→前驱后继',tone:'amber'},
        {id:'cnv1', shape:'rect',x:475,y:180,w:140,h:34,label:'左孩子右兄弟',tone:'green'},
        {id:'huf1', shape:'rect',x:617,y:180,w:80, h:34,label:'WPL最小',tone:'red'}
      ],
      edges:[ {from:'cprop',to:'ctrav',arrow:false},{from:'cprop',to:'cclu',arrow:false},
               {from:'cprop',to:'ccnv',arrow:false},{from:'cprop',to:'chuf',arrow:false} ],
      notes:[ {x:340,y:56,text:'n0=n2+1 · 第i层≤2^(i-1) · 高 ⌊log2n⌋+1 · 完全二叉树',small:true},
               {x:105,y:236,text:'两遍历定唯一',small:true},{x:617,y:236,text:'前缀编码',small:true},
               {x:340,y:318,text:'一切应用（遍历/线索/转换/哈夫曼）都建立在「五性质 + 左孩子右兄弟」之上',small:true} ] } });

  /* ——— 第5章 图：底座(存储+遍历) 撑起四大应用 ——— */
  R({ id:'ds-ch5-overview', svgType:'graph', title:'图 · 主记忆图',
    data:{ width:680, height:340, title:'图 · 主记忆图',
      containers:[
        {id:'cbase',tone:'gray', x:340,y:70, w:620,h:80, label:'底座：存储 + 遍历'},
        {id:'cmst', tone:'green',x:110,y:230,w:180,h:110,label:'最小生成树'},
        {id:'csp',  tone:'amber',x:300,y:230,w:170,h:110,label:'最短路径'},
        {id:'ctopo',tone:'green',x:480,y:230,w:160,h:110,label:'拓扑排序'},
        {id:'ccrit',tone:'red',  x:620,y:230,w:100,h:110,label:'关键路径'}
      ],
      nodes:[
        {id:'stor',shape:'rect',x:220,y:60,w:180,h:34,label:'存储：邻接矩阵/邻接表',tone:'gray'},
        {id:'trav',shape:'rect',x:470,y:60,w:180,h:34,label:'遍历：BFS / DFS',tone:'gray'},
        {id:'mst1',shape:'rect',x:110,y:212,w:160,h:32,label:'Prim / Kruskal',tone:'green'},
        {id:'sp1', shape:'rect',x:300,y:212,w:150,h:32,label:'Dijkstra / Floyd',tone:'amber'},
        {id:'topo1',shape:'rect',x:480,y:212,w:130,h:32,label:'AOV 入度为0',tone:'green'},
        {id:'crit1',shape:'rect',x:620,y:212,w:80, h:32,label:'AOE 最长路',tone:'red'}
      ],
      edges:[ {from:'cbase',to:'cmst',arrow:false},{from:'cbase',to:'csp',arrow:false},
               {from:'cbase',to:'ctopo',arrow:false},{from:'cbase',to:'ccrit',arrow:false} ],
      notes:[ {x:115,y:262,text:'Kruskal 配并查集',small:true},
               {x:340,y:318,text:'所有图算法都跑在「存储结构 + 遍历」之上；按问题选算法：连通→MST，距离→最短路径，先后→拓扑/关键路径',small:true} ] } });

  /* ——— 第8章 串：朴素 → KMP 优化演进 ——— */
  R({ id:'ds-ch8-overview', svgType:'graph', title:'串 · 主记忆图',
    data:{ width:680, height:280, title:'串 · 主记忆图',
      containers:[
        {id:'cbf', tone:'red',  x:180,y:150,w:290,h:160,label:'朴素匹配'},
        {id:'ckmp',tone:'green',x:510,y:150,w:290,h:160,label:'KMP'}
      ],
      nodes:[
        {id:'bf1',shape:'rect',x:180,y:120,w:230,h:34,label:'主串回退',tone:'red'},
        {id:'bf2',shape:'rect',x:180,y:165,w:230,h:34,label:'O(nm)',tone:'red'},
        {id:'kmp1',shape:'rect',x:510,y:120,w:230,h:34,label:'next 数组 主串不回退',tone:'green'},
        {id:'kmp2',shape:'rect',x:510,y:165,w:230,h:34,label:'O(n+m)',tone:'green'}
      ],
      edges:[ {from:'cbf',to:'ckmp',label:'消除主串回溯'} ],
      notes:[         {x:340,y:262,text:'next[j]=最长相等前后缀长度+1；nextval 进一步优化——手算 next 是必考',small:true} ] } });

  /* ——— 第6章 查找：三大查找路线（章末主记忆图） ——— */
  R({ id:'ds-ch6-overview', svgType:'graph', title:'查找 · 主记忆图',
    data:{ width:680, height:300, title:'查找 · 主记忆图',
      containers:[
        {id:'cseq', tone:'green',x:100,y:150,w:180,h:150,label:'线性表查找'},
        {id:'ctree',tone:'blue', x:340,y:150,w:180,h:150,label:'树表查找'},
        {id:'chash',tone:'amber',x:580,y:150,w:170,h:150,label:'散列查找'}
      ],
      nodes:[
        {id:'seq1',shape:'rect',x:100,y:118,w:140,h:34,label:'顺序/折半/分块',tone:'green'},
        {id:'seq2',shape:'rect',x:100,y:162,w:140,h:34,label:'ASL 成功/失败',tone:'green'},
        {id:'tree1',shape:'rect',x:340,y:118,w:140,h:34,label:'BST→AVL→红黑→B',tone:'blue'},
        {id:'tree2',shape:'rect',x:340,y:162,w:140,h:34,label:'平衡因子·旋转',tone:'blue'},
        {id:'hash1',shape:'rect',x:580,y:118,w:140,h:34,label:'构造+冲突处理',tone:'amber'},
        {id:'hash2',shape:'rect',x:580,y:162,w:140,h:34,label:'装填因子 α',tone:'amber'}
      ],
      edges:[ {from:'cseq',to:'ctree',label:'结构升级'},{from:'ctree',to:'chash',label:'外存/散列'} ],
      notes:[ {x:340,y:40,text:'ASL 平均查找长度（成功/失败）是贯穿所有查找的统一度量',small:false},
               {x:100,y:246,text:'顺序 O(n)/折半 O(log n)',small:true},
               {x:340,y:246,text:'树高决定效率',small:true},
               {x:580,y:246,text:'冲突≠失败，α 影响效率',small:true} ] } });

  /* ——— 第7章 排序：五大类 + 稳定性（章末主记忆图） ——— */
  R({ id:'ds-ch7-overview', svgType:'graph', title:'排序 · 主记忆图',
    data:{ width:680, height:320, title:'排序 · 主记忆图',
      containers:[
        {id:'cins', tone:'green',x:70, y:160,w:130,h:150,label:'插入类'},
        {id:'cexc', tone:'amber',x:205,y:160,w:130,h:150,label:'交换类'},
        {id:'csel', tone:'blue', x:340,y:160,w:130,h:150,label:'选择类'},
        {id:'cmer', tone:'green',x:475,y:160,w:130,h:150,label:'归并类'},
        {id:'crad', tone:'gray', x:610,y:160,w:130,h:150,label:'基数类'}
      ],
      nodes:[
        {id:'ins1',shape:'rect',x:70, y:130,w:110,h:32,label:'直接/折半/希尔',tone:'green'},
        {id:'ins2',shape:'rect',x:70, y:174,w:110,h:32,label:'稳定',tone:'green'},
        {id:'exc1',shape:'rect',x:205,y:130,w:110,h:32,label:'冒泡/快排',tone:'amber'},
        {id:'exc2',shape:'rect',x:205,y:174,w:110,h:32,label:'快排不稳定',tone:'amber'},
        {id:'sel1',shape:'rect',x:340,y:130,w:110,h:32,label:'简单/堆',tone:'blue'},
        {id:'sel2',shape:'rect',x:340,y:174,w:110,h:32,label:'都不稳定',tone:'blue'},
        {id:'mer1',shape:'rect',x:475,y:130,w:110,h:32,label:'二路归并',tone:'green'},
        {id:'mer2',shape:'rect',x:475,y:174,w:110,h:32,label:'稳定',tone:'green'},
        {id:'rad1',shape:'rect',x:610,y:130,w:110,h:32,label:'多关键字',tone:'gray'},
        {id:'rad2',shape:'rect',x:610,y:174,w:110,h:32,label:'稳定',tone:'gray'}
      ],
      edges:[],
      notes:[ {x:340,y:42,text:'稳定 / 时间(最好·最坏·平均) / 空间 是三大比较维度',small:false},
               {x:340,y:302,text:'堆排属选择类；快排平均最优但最坏 O(n²) 且不稳定；归并稳定但需 O(n) 辅助空间',small:true} ] } });
})();
