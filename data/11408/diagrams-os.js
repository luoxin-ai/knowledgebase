/* ================================================================
 * data/11408/diagrams-os.js —— 操作系统科图示（KB_DIAG 注册）
 * ================================================================ */
(function(){
  'use strict';
  const R = KB_DIAG.register.bind(KB_DIAG);

  /* ——— 进程五状态转换 ——— */
  R({ id:'os-proc-states', svgType:'graph', title:'进程五状态转换',
    data:{ width:680, height:280,
      nodes:[
        {id:'new',  shape:'rect',x:100, y:150,w:100,h:44,label:'新建',tone:'blue'},
        {id:'ready',shape:'rect',x:280, y:70, w:100,h:44,label:'就绪',tone:'blue'},
        {id:'run',  shape:'rect',x:460, y:150,w:100,h:44,label:'运行',tone:'green'},
        {id:'blk',  shape:'rect',x:280, y:230,w:100,h:44,label:'阻塞',tone:'red'},
        {id:'term', shape:'rect',x:620, y:150,w:100,h:44,label:'终止',tone:'gray'}
      ],
      edges:[
        {from:'new', to:'ready', label:'接纳'},
        {from:'ready',to:'run',  label:'调度'},
        {from:'run', to:'ready', label:'抢占', curve:0.3},
        {from:'run', to:'blk',   label:'IO 等待', curve:0.15},
        {from:'blk', to:'ready', label:'事件发生'},
        {from:'run', to:'term',  label:'退出'}
      ],
      notes:[ {x:340,y:26,text:'新建→就绪→运行；运行↔就绪（调度/抢占）；运行→阻塞→就绪；运行→终止',small:true} ] } });

  /* ——— 死锁资源分配图 ——— */
  R({ id:'os-deadlock-rag', svgType:'graph', title:'死锁资源分配图（环 = 死锁）',
    data:{ width:680, height:280,
      nodes:[
        {id:'P1',shape:'circle',x:220,y:140,label:'P1',tone:'blue',r:22},
        {id:'P2',shape:'circle',x:420,y:140,label:'P2',tone:'blue',r:22},
        {id:'R1',shape:'rect',  x:300,y:55, w:70,h:40,label:'R1',tone:'red'},
        {id:'R2',shape:'rect',  x:340,y:225,w:70,h:40,label:'R2',tone:'red'}
      ],
      edges:[
        {from:'P1',to:'R2',label:'请求'},
        {from:'R2',to:'P2',label:'分配',dashed:true},
        {from:'P2',to:'R1',label:'请求'},
        {from:'R1',to:'P1',label:'分配',dashed:true}
      ],
      notes:[ {x:340,y:265,text:'P1 持 R1 等 R2，P2 持 R2 等 R1 → 循环等待，存在环即死锁',small:false} ] } });

  /* ——— 进程管理章知识骨架（章首，分区容器版） ——— */
  R({ id:'os-ch2-overview', svgType:'graph', title:'进程管理 · 主记忆图',
    data:{ width:680, height:300, title:'进程管理 · 主记忆图',
      containers:[
        {id:'cbase',tone:'blue', x:340,y:56, w:620,h:64, label:''},
        {id:'cst', tone:'green',x:100,y:180,w:180,h:130,label:'状态与调度'},
        {id:'csyn',tone:'amber',x:290,y:180,w:170,h:130,label:'同步与互斥'},
        {id:'cdl', tone:'red',  x:475,y:180,w:170,h:130,label:'死锁'},
        {id:'ccom',tone:'gray', x:620,y:180,w:90, h:130,label:'通信'}
      ],
      nodes:[
        {id:'core',shape:'rect',x:340,y:56,w:280,h:36,label:'进程=资源分配与调度的基本单位',tone:'blue'},
        {id:'st1',shape:'rect',x:100,y:150,w:150,h:32,label:'五状态转换',tone:'green'},
        {id:'st2',shape:'rect',x:100,y:192,w:150,h:32,label:'调度算法',tone:'green'},
        {id:'syn1',shape:'rect',x:290,y:150,w:150,h:32,label:'临界区/信号量',tone:'amber'},
        {id:'dl1',shape:'rect',x:475,y:150,w:150,h:32,label:'四条件·银行家',tone:'red'},
        {id:'com1',shape:'rect',x:620,y:172,w:70, h:32,label:'IPC',tone:'gray'}
      ],
      edges:[ {from:'cbase',to:'cst',arrow:false},{from:'cbase',to:'csyn',arrow:false},
               {from:'cbase',to:'cdl',arrow:false},{from:'cbase',to:'ccom',arrow:false},
               {from:'csyn',to:'cdl',label:'处理不当'} ],
      notes:[ {x:340,y:282,text:'状态驱动调度；并发需同步互斥；互斥/占有/不剥夺/环路四条件凑齐即死锁',small:true} ] } });

  /* =============== 章首主记忆图 =============== */

  /* ——— 第1章 操作系统概述 ——— */
  R({ id:'os-ch1-overview', svgType:'graph', title:'操作系统概述 · 主记忆图',
    data:{ width:680, height:290, title:'操作系统概述 · 主记忆图',
      containers:[
        {id:'cfeat',tone:'green',x:100,y:150,w:170,h:150,label:'四大特征'},
        {id:'cfunc',tone:'amber',x:280,y:150,w:170,h:150,label:'五大功能'},
        {id:'cmode',tone:'green',x:460,y:150,w:170,h:150,label:'运行环境'},
        {id:'cdev', tone:'gray', x:620,y:150,w:110,h:150,label:'发展分类'}
      ],
      nodes:[
        {id:'feat1',shape:'rect',x:100,y:140,w:130,h:34,label:'并发/共享/虚拟/异步',tone:'green'},
        {id:'func1',shape:'rect',x:280,y:140,w:130,h:34,label:'处理机/存储/文件/设备',tone:'amber'},
        {id:'mode1',shape:'rect',x:460,y:118,w:130,h:32,label:'内核态/用户态',tone:'green'},
        {id:'mode2',shape:'rect',x:460,y:162,w:130,h:32,label:'系统调用·中断',tone:'green'},
        {id:'dev1',shape:'rect',x:620,y:140,w:86, h:34,label:'批/分时/实时',tone:'gray'}
      ],
      edges:[ {from:'cfunc',to:'cmode',label:'靠内核态支撑'},{from:'cfeat',to:'cfunc',label:'特征体现于功能'} ],
      notes:[ {x:340,y:284,text:'核心：OS 是管理软硬件资源、对下隐藏细节、对上提供接口的系统软件',small:true} ] } });

  /* ——— 第3章 内存管理（演进链） ——— */
  R({ id:'os-ch3-overview', svgType:'graph', title:'内存管理 · 主记忆图',
    data:{ width:680, height:280, title:'内存管理 · 主记忆图',
      containers:[
        {id:'ccont',tone:'gray', x:100,y:140,w:170,h:150,label:'连续分配'},
        {id:'cpage',tone:'green',x:280,y:140,w:170,h:150,label:'分页/分段'},
        {id:'cvm',  tone:'amber',x:460,y:140,w:170,h:150,label:'虚拟内存'},
        {id:'crep', tone:'red',  x:620,y:140,w:110,h:150,label:'页面置换'}
      ],
      nodes:[
        {id:'cont1',shape:'rect',x:100,y:140,w:130,h:34,label:'单一/固定/动态分区',tone:'gray'},
        {id:'page1',shape:'rect',x:280,y:140,w:130,h:34,label:'地址变换+快表TLB',tone:'green'},
        {id:'vm1',  shape:'rect',x:460,y:140,w:130,h:34,label:'局部性原理',tone:'amber'},
        {id:'rep1', shape:'rect',x:620,y:140,w:86, h:34,label:'OPT/FIFO/LRU',tone:'red'}
      ],
      edges:[ {from:'ccont',to:'cpage',label:'碎片'},{from:'cpage',to:'cvm',label:'请求调页'},{from:'cvm',to:'crep',label:'缺页'} ],
      notes:[ {x:340,y:266,text:'主线：连续→离散（分页/分段/段页式）→虚拟；地址转换与置换算法是两大计算点',small:true} ] } });

  /* ——— 第4章 文件管理 ——— */
  R({ id:'os-ch4-overview', svgType:'graph', title:'文件管理 · 主记忆图',
    data:{ width:680, height:280, title:'文件管理 · 主记忆图',
      containers:[
        {id:'clog', tone:'green',x:100,y:140,w:170,h:150,label:'逻辑结构'},
        {id:'cdir', tone:'amber',x:280,y:140,w:170,h:150,label:'目录结构'},
        {id:'cphy', tone:'green',x:460,y:140,w:170,h:150,label:'物理分配'},
        {id:'cdisk',tone:'red',  x:620,y:140,w:110,h:150,label:'磁盘调度'}
      ],
      nodes:[
        {id:'log1',shape:'rect',x:100,y:140,w:130,h:34,label:'顺序/索引/索引顺序',tone:'green'},
        {id:'dir1',shape:'rect',x:280,y:140,w:130,h:34,label:'单级/两级/树形',tone:'amber'},
        {id:'phy1',shape:'rect',x:460,y:118,w:130,h:32,label:'连续/链接/索引',tone:'green'},
        {id:'phy2',shape:'rect',x:460,y:162,w:130,h:32,label:'UNIX 混合索引',tone:'green'},
        {id:'disk1',shape:'rect',x:620,y:140,w:86, h:34,label:'FCFS/SSTF/SCAN',tone:'red'}
      ],
      edges:[ {from:'cdir',to:'cphy',label:'按名定位到物理块'},{from:'cphy',to:'cdisk',label:'读写需调度'} ],
      notes:[ {x:340,y:266,text:'核心：实现「按名存取」；物理分配与多级索引文件大小计算是高频考点',small:true} ] } });

  /* ——— 第5章 I/O 管理 ——— */
  R({ id:'os-ch5-overview', svgType:'graph', title:'I/O 管理 · 主记忆图',
    data:{ width:680, height:290, title:'I/O 管理 · 主记忆图',
      containers:[
        {id:'cctl', tone:'amber',x:180,y:150,w:300,h:160,label:'I/O 控制方式'},
        {id:'csoft',tone:'green',x:510,y:150,w:300,h:160,label:'I/O 软件层次'}
      ],
      nodes:[
        {id:'ctl1',shape:'rect',x:180,y:120,w:240,h:32,label:'程序查询→中断→DMA→通道',tone:'amber'},
        {id:'ctl2',shape:'rect',x:180,y:165,w:240,h:32,label:'CPU 介入递减',tone:'amber'},
        {id:'soft1',shape:'rect',x:510,y:120,w:240,h:32,label:'用户→设备无关→驱动→中断处理',tone:'green'},
        {id:'soft2',shape:'rect',x:510,y:165,w:240,h:32,label:'缓冲/SPOOLing',tone:'green'}
      ],
      edges:[ {from:'cctl',to:'csoft',label:'控制方式落在软件层次'} ],
      notes:[ {x:340,y:284,text:'缓冲平滑速度差；SPOOLing 把独占设备改造为共享虚拟设备',small:true} ] } });
})();
