/* ================================================================
 * data/11408/diagrams-co.js —— 计算机组成原理科图示（KB_DIAG 注册）
 * ----------------------------------------------------------------
 * 多数图类型为 graph（节点-边）；co-datapath 为 raw 逃生舱一次性图。
 * ================================================================ */
(function(){
  'use strict';
  const R = KB_DIAG.register.bind(KB_DIAG);

  /* ——— 冯·诺依曼机结构 ——— */
  R({ id:'co-von-neumann', svgType:'graph', title:'冯·诺依曼机结构',
    data:{ width:680, height:400,
      nodes:[
        {id:'frame',shape:'rect',x:340,y:160,w:240,h:160,label:'',tone:'blue'},
        {id:'in', shape:'rect',x:70, y:160,w:90, h:50,label:'输入设备',tone:'gray'},
        {id:'out',shape:'rect',x:600,y:160,w:90, h:50,label:'输出设备',tone:'gray'},
        {id:'mem',shape:'rect',x:340,y:340,w:120,h:50,label:'主存储器',tone:'amber'},
        {id:'alu',shape:'rect',x:300,y:160,w:80, h:40,label:'运算器',tone:'blue'},
        {id:'con',shape:'rect',x:400,y:160,w:80, h:40,label:'控制器',tone:'blue'}
      ],
      edges:[
        {from:'in', to:'frame',label:'数据'},
        {from:'frame',to:'out',label:'数据'},
        {from:'mem',to:'frame',label:'地址/数据'},
        {from:'frame',to:'mem',dashed:true,label:'控制流'},
        {from:'con',to:'in',  dashed:true,label:'控制'},
        {from:'con',to:'out', dashed:true,label:'控制'},
        {from:'con',to:'mem', dashed:true,label:'控制'}
      ],
      notes:[ {x:340,y:90,text:'存储程序 + 五大部件：运算器/控制器/存储器/输入/输出',small:false} ] } });

  /* ——— 存储层次结构（金字塔） ——— */
  R({ id:'co-mem-hierarchy', svgType:'graph', title:'存储层次结构',
    data:{ width:680, height:290,
      nodes:[
        {id:'r0',shape:'rect',x:340,y:50, w:140,h:34,label:'寄存器',tone:'blue'},
        {id:'r1',shape:'rect',x:340,y:95, w:210,h:34,label:'Cache',tone:'blue'},
        {id:'r2',shape:'rect',x:340,y:140,w:280,h:34,label:'主存',tone:'amber'},
        {id:'r3',shape:'rect',x:340,y:185,w:350,h:34,label:'辅存',tone:'gray'},
        {id:'r4',shape:'rect',x:340,y:230,w:410,h:34,label:'外存',tone:'gray'}
      ],
      edges:[],
      notes:[ {x:60,y:50,text:'快·贵 ↑',small:false},{x:660,y:250,text:'容量 ↑',small:false} ] } });

  /* ——— CPU 的功能与组成 ——— */
  R({ id:'co-cpu-composition', svgType:'graph', title:'CPU 的功能与组成',
    data:{ width:680, height:320,
      nodes:[
        {id:'frame',shape:'rect',x:340,y:140,w:320,h:150,label:'',tone:'blue'},
        {id:'alu',shape:'rect',x:180,y:120,w:130,h:50,label:'运算器\nALU·ACC·PSW',tone:'blue'},
        {id:'con',shape:'rect',x:480,y:120,w:130,h:50,label:'控制器\nPC·IR·ID',tone:'blue'},
        {id:'bus',shape:'rect',x:340,y:215,w:300,h:30,label:'内部总线',tone:'gray'}
      ],
      edges:[ {from:'con',to:'alu',arrow:false},{from:'con',to:'bus',arrow:false},{from:'bus',to:'alu',arrow:false} ],
      notes:[ {x:340,y:60,text:'CPU = 运算器 + 控制器 + 内部总线（寄存器组）',small:false} ] } });

  /* ——— 总线拓扑对比 ——— */
  R({ id:'co-bus-topology', svgType:'graph', title:'总线拓扑对比',
    data:{ width:680, height:320,
      nodes:[
        {id:'c1',shape:'rect',x:70, y:70, w:80,h:40,label:'CPU',tone:'blue'},
        {id:'m1',shape:'rect',x:70, y:170,w:80,h:40,label:'主存',tone:'blue'},
        {id:'i1',shape:'rect',x:70, y:270,w:80,h:40,label:'I/O',tone:'blue'},
        {id:'c2',shape:'rect',x:290,y:70, w:80,h:40,label:'CPU',tone:'blue'},
        {id:'m2',shape:'rect',x:290,y:170,w:80,h:40,label:'主存',tone:'blue'},
        {id:'i2',shape:'rect',x:290,y:270,w:80,h:40,label:'I/O',tone:'blue'},
        {id:'c3',shape:'rect',x:510,y:70, w:80,h:40,label:'CPU',tone:'blue'},
        {id:'m3',shape:'rect',x:510,y:170,w:80,h:40,label:'主存',tone:'blue'},
        {id:'i3',shape:'rect',x:510,y:270,w:80,h:40,label:'I/O',tone:'blue'}
      ],
      edges:[
        {from:'c1',to:'m1',dashed:true},{from:'m1',to:'i1',dashed:true},
        {from:'c2',to:'m2',dashed:true},{from:'c2',to:'i2',dashed:true},
        {from:'c3',to:'m3',dashed:true},{from:'m3',to:'i3',dashed:true}
      ],
      notes:[ {x:70,y:30,text:'单总线',small:false},{x:290,y:30,text:'双总线',small:false},{x:510,y:30,text:'三总线',small:false} ] } });

  /* ——— Cache 地址位段（bitfield） ——— */
  R({ id:'co-cache-addr', svgType:'bitfield', title:'Cache 地址位段（直接映射）',
    data:{ totalBits:32, bitLabels:true,
      segs:[ {name:'标记',bits:22,tone:'blue',note:'tag'},
             {name:'行索引',bits:8,tone:'amber',note:'行/组号'},
             {name:'块内偏移',bits:2,tone:'green',note:'块大小 4B'} ] } });

  /* ——— 指令格式位段（bitfield） ——— */
  R({ id:'co-instr-fmt', svgType:'bitfield', title:'指令格式位段',
    data:{ totalBits:32, bitLabels:true,
      segs:[ {name:'操作码',bits:6,tone:'blue',note:'op'},
             {name:'源寄存器',bits:5,tone:'amber',note:'rs'},
             {name:'目的寄存器',bits:5,tone:'amber',note:'rd'},
             {name:'偏移/立即数',bits:16,tone:'green',note:'imm'} ] } });

  /* ——— 简化数据通路（raw 逃生舱：一次性图） ——— */
  R({ id:'co-datapath', title:'简化数据通路（取指周期）',
    svg:
'<svg class="dg-svg" viewBox="0 0 680 240" width="100%" preserveAspectRatio="xMidYMid meet" '+
'role="img" aria-label="简化数据通路">'+
'<title>简化数据通路（取指周期）</title>'+
'<defs><marker id="dp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'+
'<path d="M0,0 L10,5 L0,10 z" fill="var(--text-3)"></path></marker></defs>'+
'<g class="dg-node tone-blue"><rect class="dg-shape" x="30" y="100" width="70" height="40" rx="8"></rect>'+
'<text class="dg-label" x="65" y="120">PC</text></g>'+
'<g class="dg-node tone-blue"><rect class="dg-shape" x="150" y="100" width="70" height="40" rx="8"></rect>'+
'<text class="dg-label" x="185" y="120">MAR</text></g>'+
'<g class="dg-node tone-amber"><rect class="dg-shape" x="280" y="95" width="90" height="50" rx="8"></rect>'+
'<text class="dg-label" x="325" y="120">主存</text></g>'+
'<g class="dg-node tone-blue"><rect class="dg-shape" x="430" y="100" width="70" height="40" rx="8"></rect>'+
'<text class="dg-label" x="465" y="120">MDR</text></g>'+
'<g class="dg-node tone-green"><rect class="dg-shape" x="560" y="70" width="70" height="40" rx="8"></rect>'+
'<text class="dg-label" x="595" y="90">IR</text></g>'+
'<g class="dg-node tone-green"><rect class="dg-shape" x="560" y="140" width="70" height="40" rx="8"></rect>'+
'<text class="dg-label" x="595" y="160">ALU</text></g>'+
'<path class="dg-edge" d="M100,120 L150,120" marker-end="url(#dp-arrow)"></path>'+
'<path class="dg-edge" d="M220,120 L280,120" marker-end="url(#dp-arrow)"></path>'+
'<path class="dg-edge" d="M370,120 L430,120" marker-end="url(#dp-arrow)"></path>'+
'<path class="dg-edge" d="M500,120 L558,92" marker-end="url(#dp-arrow)"></path>'+
'<path class="dg-edge" d="M500,124 L558,158" marker-end="url(#dp-arrow)"></path>'+
'<text class="dg-note" x="340" y="210">取指：PC→MAR→主存→MDR→IR（指令）；运算数据→ALU</text>'+
'</svg>' });

  /* =============== 章首主记忆图 =============== */

  /* ——— 第1章 计算机系统概述 ——— */
  R({ id:'co-ch1-overview', svgType:'graph', title:'计算机系统概述 · 主记忆图',
    data:{ width:680, height:290, title:'计算机系统概述 · 主记忆图',
      containers:[
        {id:'cvn', tone:'green',x:180,y:150,w:300,h:160,label:'冯·诺依曼机'},
        {id:'cperf',tone:'amber',x:500,y:150,w:300,h:160,label:'性能指标'}
      ],
      nodes:[
        {id:'vn1',shape:'rect',x:180,y:118,w:240,h:34,label:'存储程序 + 五大部件',tone:'green'},
        {id:'vn2',shape:'rect',x:180,y:164,w:240,h:34,label:'运算器中心→存储器中心',tone:'green'},
        {id:'pf1',shape:'rect',x:500,y:118,w:240,h:34,label:'CPI / 主频 / MIPS',tone:'amber'},
        {id:'pf2',shape:'rect',x:500,y:164,w:240,h:34,label:'CPU时间=指令数×CPI×T',tone:'amber'}
      ],
      edges:[ {from:'cvn',to:'cperf',label:'结构决定性能'} ],
      notes:[ {x:340,y:266,text:'层次观：硬件↑ 软件↓；存储容量 K/M/G 注意二进制 vs 十进制',small:true} ] } });

  /* ——— 第2章 数据的表示与运算 ——— */
  R({ id:'co-ch2-overview', svgType:'graph', title:'数据的表示与运算 · 主记忆图',
    data:{ width:680, height:300, title:'数据的表示与运算 · 主记忆图',
      containers:[
        {id:'cnum',tone:'green',x:100,y:150,w:170,h:150,label:'定点数'},
        {id:'cflt',tone:'amber',x:280,y:150,w:170,h:150,label:'浮点数'},
        {id:'calu',tone:'green',x:460,y:150,w:170,h:150,label:'运算与ALU'},
        {id:'cchk',tone:'red',  x:620,y:150,w:110,h:150,label:'校验码'}
      ],
      nodes:[
        {id:'num1',shape:'rect',x:100,y:118,w:130,h:32,label:'原/反/补/移码',tone:'green'},
        {id:'num2',shape:'rect',x:100,y:162,w:130,h:32,label:'补码加减·溢出',tone:'green'},
        {id:'flt1',shape:'rect',x:280,y:140,w:130,h:34,label:'IEEE754 阶码+尾数',tone:'amber'},
        {id:'alu1',shape:'rect',x:460,y:118,w:130,h:32,label:'乘Booth/除',tone:'green'},
        {id:'alu2',shape:'rect',x:460,y:162,w:130,h:32,label:'串/并行进位',tone:'green'},
        {id:'chk1',shape:'rect',x:620,y:140,w:86, h:34,label:'奇偶/海明/CRC',tone:'red'}
      ],
      edges:[ {from:'cnum',to:'cflt',label:'表示'},{from:'cnum',to:'calu',label:'运算'},{from:'calu',to:'cchk',label:'检错'} ],
      notes:[ {x:340,y:284,text:'核心：补码统一加减；溢出看符号；IEEE754=符号+阶码(移码)+尾数(隐藏1)',small:true} ] } });

  /* ——— 第3章 存储系统（竖向层次带） ——— */
  R({ id:'co-ch3-overview', svgType:'graph', title:'存储系统 · 主记忆图',
    data:{ width:680, height:380, title:'存储系统 · 主记忆图',
      containers:[
        {id:'ccache',tone:'blue', x:340,y:52, w:620,h:64, label:''},
        {id:'cram',  tone:'amber',x:340,y:142,w:620,h:64, label:''},
        {id:'cvm',   tone:'green',x:340,y:232,w:620,h:64, label:''},
        {id:'cext',  tone:'gray', x:340,y:322,w:620,h:64, label:''}
      ],
      nodes:[
        {id:'cache',shape:'rect',x:180,y:52,w:150,h:36,label:'Cache',tone:'blue'},
        {id:'ram',  shape:'rect',x:180,y:142,w:150,h:36,label:'主存 RAM',tone:'amber'},
        {id:'vm',   shape:'rect',x:180,y:232,w:150,h:36,label:'虚拟存储器',tone:'green'},
        {id:'ext',  shape:'rect',x:180,y:322,w:150,h:36,label:'外存',tone:'gray'}
      ],
      edges:[ {from:'ccache',to:'cram',label:'命中率/映射/替换'},{from:'cram',to:'cvm',label:'页表/TLB'},{from:'cvm',to:'cext',label:'请求调页'} ],
      notes:[ {x:520,y:52,text:'三种映射 + LRU',small:true},
               {x:520,y:142,text:'SRAM/DRAM·多体交叉',small:true},
               {x:520,y:232,text:'局部性·页面置换',small:true},
               {x:340,y:372,text:'目标：以主存价格逼近 Cache 速度、外存容量',small:true} ] } });

  /* ——— 第4章 指令系统 ——— */
  R({ id:'co-ch4-overview', svgType:'graph', title:'指令系统 · 主记忆图',
    data:{ width:680, height:300, title:'指令系统 · 主记忆图',
      containers:[
        {id:'cfmt',tone:'green',x:130,y:150,w:210,h:150,label:'指令格式'},
        {id:'cadr',tone:'amber',x:390,y:150,w:230,h:150,label:'寻址方式（灵魂）'},
        {id:'carc',tone:'red',  x:600,y:150,w:150,h:150,label:'CISC/RISC'}
      ],
      nodes:[
        {id:'fmt1',shape:'rect',x:130,y:118,w:160,h:32,label:'操作码+地址码',tone:'green'},
        {id:'fmt2',shape:'rect',x:130,y:162,w:160,h:32,label:'定长/扩展操作码',tone:'green'},
        {id:'adr1',shape:'rect',x:390,y:112,w:190,h:32,label:'立即/直接/间接/寄存器',tone:'amber'},
        {id:'adr2',shape:'rect',x:390,y:158,w:190,h:32,label:'基址/变址/相对→EA',tone:'amber'},
        {id:'arc1',shape:'rect',x:600,y:140,w:110,h:34,label:'复杂 vs 精简',tone:'red'}
      ],
      edges:[ {from:'cfmt',to:'cadr',label:'地址码需寻址'},{from:'cadr',to:'carc',label:'风格取舍'} ],
      notes:[ {x:340,y:284,text:'寻址是灵魂：每种方式都归结为「如何算出有效地址 EA」',small:true} ] } });

  /* ——— 第5章 中央处理器 ——— */
  R({ id:'co-ch5-overview', svgType:'graph', title:'中央处理器 · 主记忆图',
    data:{ width:680, height:310, title:'中央处理器 · 主记忆图',
      containers:[
        {id:'ccyc', tone:'green',x:100,y:150,w:170,h:160,label:'指令周期'},
        {id:'cdp',  tone:'amber',x:280,y:150,w:170,h:160,label:'数据通路'},
        {id:'cctl', tone:'green',x:460,y:150,w:170,h:160,label:'控制器'},
        {id:'cpipe',tone:'red',  x:620,y:150,w:110,h:160,label:'流水线'}
      ],
      nodes:[
        {id:'cyc1',shape:'rect',x:100,y:118,w:130,h:32,label:'取指/间址/执行/中断',tone:'green'},
        {id:'dp1', shape:'rect',x:280,y:118,w:130,h:32,label:'PC→MAR→主存',tone:'amber'},
        {id:'dp2', shape:'rect',x:280,y:162,w:130,h:32,label:'→MDR→IR',tone:'amber'},
        {id:'ctl1',shape:'rect',x:460,y:140,w:130,h:34,label:'硬布线 vs 微程序',tone:'green'},
        {id:'pipe1',shape:'rect',x:620,y:118,w:86,h:32,label:'三类冒险',tone:'red'},
        {id:'pipe2',shape:'rect',x:620,y:162,w:86,h:32,label:'吞吐/加速比',tone:'red'}
      ],
      edges:[ {from:'ccyc',to:'cdp',label:'按周期走'},{from:'cdp',to:'cctl',label:'控制器发令'},{from:'cctl',to:'cpipe',label:'并行提速'} ],
      notes:[ {x:340,y:288,text:'CPU=运算器+控制器；流水线提吞吐但引入结构/数据/控制冒险',small:true} ] } });

  /* ——— 第6章 总线与输入输出系统 ——— */
  R({ id:'co-ch6-overview', svgType:'graph', title:'总线与 I/O 系统 · 主记忆图',
    data:{ width:680, height:300, title:'总线与 I/O 系统 · 主记忆图',
      containers:[
        {id:'cbus',tone:'green',x:180,y:150,w:300,h:160,label:'总线'},
        {id:'cio', tone:'amber',x:510,y:150,w:300,h:160,label:'I/O 控制方式'}
      ],
      nodes:[
        {id:'bus1',shape:'rect',x:180,y:118,w:240,h:32,label:'分类 · 仲裁 · 定时',tone:'green'},
        {id:'bus2',shape:'rect',x:180,y:164,w:240,h:32,label:'单/双/三总线拓扑',tone:'green'},
        {id:'io1', shape:'rect',x:510,y:118,w:240,h:32,label:'程序查询→中断→DMA→通道',tone:'amber'},
        {id:'io2', shape:'rect',x:510,y:164,w:240,h:32,label:'CPU 介入递减 效率递增',tone:'amber'}
      ],
      edges:[ {from:'cbus',to:'cio',label:'总线是 I/O 的通路'} ],
      notes:[ {x:340,y:284,text:'中断=被动响应外设请求；DMA=成块传送不打扰 CPU；通道=专用处理机',small:true} ] } });
})();
