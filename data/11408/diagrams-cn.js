/* ================================================================
 * data/11408/diagrams-cn.js —— 计算机网络科图示（KB_DIAG 注册）
 * ================================================================ */
(function(){
  'use strict';
  const R = KB_DIAG.register.bind(KB_DIAG);

  /* ——— 五层体系结构总览（章首，层次带） ——— */
  R({ id:'cn-layer-overview', svgType:'graph', title:'计算机网络 · 五层体系结构总览',
    data:{ width:680, height:340, title:'计算机网络 · 五层体系结构总览',
      containers:[
        {id:'capp',tone:'blue', x:340,y:56, w:620,h:56,label:''},
        {id:'ctr', tone:'blue', x:340,y:120,w:620,h:56,label:''},
        {id:'cnet',tone:'amber',x:340,y:184,w:620,h:56,label:''},
        {id:'clk', tone:'green',x:340,y:248,w:620,h:56,label:''},
        {id:'cph', tone:'gray', x:340,y:312,w:620,h:56,label:''}
      ],
      nodes:[
        {id:'app', shape:'rect',x:300,y:56, w:200,h:34,label:'应用层',tone:'blue'},
        {id:'tr',  shape:'rect',x:300,y:120,w:200,h:34,label:'传输层',tone:'blue'},
        {id:'net', shape:'rect',x:300,y:184,w:200,h:34,label:'网络层',tone:'amber'},
        {id:'lk',  shape:'rect',x:300,y:248,w:200,h:34,label:'数据链路层',tone:'green'},
        {id:'ph',  shape:'rect',x:300,y:312,w:200,h:34,label:'物理层',tone:'gray'}
      ],
      edges:[],
      notes:[
        {x:120,y:56, text:'第6章',small:true},{x:120,y:120,text:'第5章',small:true},
        {x:120,y:184,text:'第4章',small:true},{x:120,y:248,text:'第3章',small:true},
        {x:120,y:312,text:'第2章',small:true},
        {x:570,y:56, text:'报文',small:true},{x:570,y:120,text:'报文段',small:true},
        {x:570,y:184,text:'分组',small:true},{x:570,y:248,text:'帧',small:true},
        {x:570,y:312,text:'比特',small:true}
      ] } });

  /* ——— TCP 连接状态机 ——— */
  R({ id:'cn-tcp-states', svgType:'graph', title:'TCP 连接状态机',
    data:{ title:'TCP 连接状态机', width:680, height:440,
      nodes:[
        {id:'c0',shape:'rect',x:340,y:30, w:110,h:34,label:'CLOSED',tone:'gray'},
        {id:'c1',shape:'rect',x:340,y:80, w:110,h:34,label:'SYN_SENT',tone:'blue'},
        {id:'c2',shape:'rect',x:340,y:130,w:110,h:34,label:'SYN_RCVD',tone:'blue'},
        {id:'c3',shape:'rect',x:340,y:180,w:120,h:34,label:'ESTABLISHED',tone:'green'},
        {id:'c4',shape:'rect',x:340,y:250,w:110,h:34,label:'FIN_WAIT_1',tone:'blue'},
        {id:'c5',shape:'rect',x:340,y:300,w:110,h:34,label:'FIN_WAIT_2',tone:'blue'},
        {id:'c6',shape:'rect',x:340,y:350,w:110,h:34,label:'TIME_WAIT',tone:'amber'},
        {id:'c7',shape:'rect',x:340,y:400,w:110,h:34,label:'CLOSED',tone:'gray'},
        {id:'ls',shape:'rect',x:540,y:80, w:110,h:34,label:'LISTEN',tone:'blue'},
        {id:'cw',shape:'rect',x:540,y:250,w:110,h:34,label:'CLOSE_WAIT',tone:'red'},
        {id:'la',shape:'rect',x:540,y:300,w:110,h:34,label:'LAST_ACK',tone:'red'}
      ],
      edges:[
        {from:'c0',to:'c1',label:'主动打开'},
        {from:'c0',to:'ls',label:'被动打开'},
        {from:'ls',to:'c2',label:'收到SYN'},
        {from:'c2',to:'c3',label:'SYN+ACK'},
        {from:'c1',to:'c3',label:'ACK'},
        {from:'c3',to:'c4',label:'主动关闭'},
        {from:'c4',to:'c5',label:'ACK'},
        {from:'c5',to:'c6',label:'FIN'},
        {from:'c6',to:'c7',label:'2MSL 超时'},
        {from:'c3',to:'cw',label:'收到FIN'},
        {from:'cw',to:'la',label:'发送FIN'},
        {from:'la',to:'c7',label:'ACK'}
      ],
      notes:[ {x:340,y:16,text:'三次握手建连 · 四次挥手断连',small:true} ] } });

  /* =============== 章首主记忆图 =============== */

  /* ——— 第2章 物理层 ——— */
  R({ id:'cn-ch2-overview', svgType:'graph', title:'物理层 · 主记忆图',
    data:{ width:680, height:290, title:'物理层 · 主记忆图',
      containers:[
        {id:'cbase',tone:'green',x:100,y:150,w:170,h:150,label:'通信基础'},
        {id:'cthm', tone:'red',  x:280,y:150,w:170,h:150,label:'两大定理'},
        {id:'csw',  tone:'amber',x:460,y:150,w:170,h:150,label:'交换方式'},
        {id:'cmux', tone:'green',x:620,y:150,w:110,h:150,label:'信道复用'}
      ],
      nodes:[
        {id:'base1',shape:'rect',x:100,y:118,w:130,h:32,label:'码元/波特/比特率',tone:'green'},
        {id:'base2',shape:'rect',x:100,y:162,w:130,h:32,label:'编码(曼彻斯特)',tone:'green'},
        {id:'thm1',shape:'rect',x:280,y:118,w:130,h:32,label:'奈奎斯特(无噪)',tone:'red'},
        {id:'thm2',shape:'rect',x:280,y:162,w:130,h:32,label:'香农(有噪)',tone:'red'},
        {id:'sw1', shape:'rect',x:460,y:140,w:130,h:34,label:'电路/报文/分组',tone:'amber'},
        {id:'mux1',shape:'rect',x:620,y:140,w:86, h:34,label:'FDM/TDM/WDM/CDM',tone:'green'}
      ],
      edges:[ {from:'cbase',to:'cthm',label:'基础推出上限'} ],
      notes:[ {x:340,y:284,text:'核心：两条极限定理决定速率上限——奈氏看码元、香农看信噪比',small:true} ] } });

  /* ——— 第3章 数据链路层 ——— */
  R({ id:'cn-ch3-overview', svgType:'graph', title:'数据链路层 · 主记忆图',
    data:{ width:680, height:300, title:'数据链路层 · 主记忆图',
      containers:[
        {id:'cfrm', tone:'gray', x:100,y:150,w:170,h:150,label:'组帧'},
        {id:'cerr', tone:'red',  x:280,y:150,w:170,h:150,label:'差错控制'},
        {id:'cflow',tone:'amber',x:460,y:150,w:170,h:150,label:'流量/可靠'},
        {id:'cmac', tone:'green',x:620,y:150,w:110,h:150,label:'介质访问'}
      ],
      nodes:[
        {id:'frm1',shape:'rect',x:100,y:140,w:130,h:34,label:'透明传输 填充',tone:'gray'},
        {id:'err1',shape:'rect',x:280,y:140,w:130,h:34,label:'奇偶/CRC 模2除',tone:'red'},
        {id:'flow1',shape:'rect',x:460,y:118,w:130,h:32,label:'停等/GBN/SR',tone:'amber'},
        {id:'flow2',shape:'rect',x:460,y:162,w:130,h:32,label:'滑动窗口',tone:'amber'},
        {id:'mac1',shape:'rect',x:620,y:140,w:86, h:34,label:'CSMA/CD、CA',tone:'green'}
      ],
      edges:[ {from:'cfrm',to:'cerr',label:'成帧后检错'},{from:'cerr',to:'cflow',label:'可靠传输'},{from:'cflow',to:'cmac',label:'共享信道'} ],
      notes:[ {x:340,y:284,text:'端到端可靠靠「确认+重传+滑动窗口」；以太网 MAC 帧 + 交换机自学习收尾',small:true} ] } });

  /* ——— 第4章 网络层 ——— */
  R({ id:'cn-ch4-overview', svgType:'graph', title:'网络层 · 主记忆图',
    data:{ width:680, height:290, title:'网络层 · 主记忆图',
      containers:[
        {id:'cip',  tone:'green',x:100,y:150,w:170,h:150,label:'IP 数据报'},
        {id:'caddr',tone:'amber',x:280,y:150,w:170,h:150,label:'IP 编址'},
        {id:'crt',  tone:'green',x:460,y:150,w:170,h:150,label:'路由协议'},
        {id:'caux', tone:'gray', x:620,y:150,w:110,h:150,label:'辅助协议'}
      ],
      nodes:[
        {id:'ip1',shape:'rect',x:100,y:140,w:130,h:34,label:'格式与分片',tone:'green'},
        {id:'addr1',shape:'rect',x:280,y:118,w:130,h:32,label:'分类/子网/CIDR',tone:'amber'},
        {id:'addr2',shape:'rect',x:280,y:162,w:130,h:32,label:'IPv6',tone:'amber'},
        {id:'rt1',shape:'rect',x:460,y:140,w:130,h:34,label:'RIP/OSPF/BGP',tone:'green'},
        {id:'aux1',shape:'rect',x:620,y:140,w:86, h:34,label:'ARP/ICMP',tone:'gray'}
      ],
      edges:[ {from:'caddr',to:'crt',label:'编址决定选路'},{from:'cip',to:'caddr',label:'报文携带地址'} ],
      notes:[ {x:340,y:284,text:'灵魂是「转发」：子网划分与 CIDR 聚合是计算密集点，路由协议分内部/外部',small:true} ] } });

  /* ——— 第5章 传输层（UDP 对照 + TCP 三支） ——— */
  R({ id:'cn-ch5-overview', svgType:'graph', title:'传输层 · 主记忆图',
    data:{ width:680, height:330, title:'传输层 · 主记忆图',
      containers:[
        {id:'cudp',tone:'gray', x:80, y:165,w:130,h:160,label:'UDP'},
        {id:'ctcp',tone:'red',  x:440,y:70, w:460,h:64, label:''},
        {id:'cconn',tone:'amber',x:255,y:235,w:200,h:110,label:'连接管理'},
        {id:'cflow',tone:'green',x:462,y:235,w:170,h:110,label:'流量控制'},
        {id:'ccong',tone:'green',x:625,y:235,w:110,h:110,label:'拥塞控制'}
      ],
      nodes:[
        {id:'udp1',shape:'rect',x:80, y:165,w:100,h:34,label:'无连接 开销小',tone:'gray'},
        {id:'tcp1',shape:'rect',x:440,y:70, w:280,h:36,label:'TCP：面向连接 可靠字节流',tone:'red'},
        {id:'conn1',shape:'rect',x:255,y:235,w:160,h:32,label:'三次握手/四次挥手',tone:'amber'},
        {id:'flow1',shape:'rect',x:462,y:235,w:130,h:32,label:'滑动窗口',tone:'green'},
        {id:'cong1',shape:'rect',x:625,y:235,w:86, h:32,label:'慢启动等',tone:'green'}
      ],
      edges:[ {from:'ctcp',to:'cconn',arrow:false},{from:'ctcp',to:'cflow',arrow:false},{from:'ctcp',to:'ccong',arrow:false} ],
      notes:[ {x:340,y:318,text:'TCP 三大机制保可靠：连接管理、流量控制、拥塞控制（慢启动/拥塞避免/快重传/快恢复）',small:true} ] } });

  /* ——— 第6章 应用层 ——— */
  R({ id:'cn-ch6-overview', svgType:'graph', title:'应用层 · 主记忆图',
    data:{ width:680, height:280, title:'应用层 · 主记忆图',
      containers:[
        {id:'cmodel',tone:'gray', x:85, y:140,w:130,h:150,label:'应用模型'},
        {id:'cdns',  tone:'green',x:225,y:140,w:130,h:150,label:'DNS'},
        {id:'chttp', tone:'amber',x:365,y:140,w:130,h:150,label:'HTTP'},
        {id:'cmail', tone:'green',x:505,y:140,w:130,h:150,label:'电子邮件'},
        {id:'cdhcp', tone:'gray', x:625,y:140,w:100,h:150,label:'DHCP'}
      ],
      nodes:[
        {id:'model1',shape:'rect',x:85, y:140,w:100,h:34,label:'C/S 与 P2P',tone:'gray'},
        {id:'dns1',shape:'rect',x:225,y:140,w:100,h:34,label:'域名解析 53',tone:'green'},
        {id:'http1',shape:'rect',x:365,y:140,w:100,h:34,label:'万维网 80',tone:'amber'},
        {id:'mail1',shape:'rect',x:505,y:140,w:100,h:34,label:'SMTP/POP3/IMAP',tone:'green'},
        {id:'dhcp1',shape:'rect',x:625,y:140,w:80, h:34,label:'动态 67/68',tone:'gray'}
      ],
      edges:[],
      notes:[ {x:340,y:266,text:'记忆点：各协议工作流程 + 端口号；FTP 另记 20(数据)/21(控制)',small:true} ] } });
})();
