/* ================================================================
 * graph.js —— 图遍历动画（BFS 队列 / DFS 栈 双模式）
 * ----------------------------------------------------------------
 * 无向图：A-B-C-D 环 + E/F 分支；mode: bfs / dfs
 * 容器条动态展示队列/栈内容，橙色角标为访问序号
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  class GraphTraversalAnimation extends AnimationBase {
    constructor(canvas, config){
      super(canvas, Object.assign({}, config, {mode:(config&&config.mode)||'bfs'}));
    }
    get graph(){
      return {
        nodes:[
          {id:0,label:'A',x:100,y:70},{id:1,label:'B',x:290,y:70},
          {id:2,label:'C',x:100,y:210},{id:3,label:'D',x:290,y:210},
          {id:4,label:'E',x:480,y:70},{id:5,label:'F',x:480,y:210}
        ],
        adj:[[1,2],[0,3,4],[0,3],[1,2,5],[1,5],[3,4]]
      };
    }
    generateSteps(){
      const g=this.graph, mode=this.mode||'bfs';
      const visited=[], disc=new Set([0]);
      this.steps=[];
      if(mode==='bfs'){
        const q=[0];
        this.steps.push({visit:null,container:[...q],visited:[],desc:'从 A 出发，A 入队'});
        while(q.length){
          const u=q.shift();
          visited.push(u);
          this.steps.push({visit:u,container:[...q],visited:[...visited],desc:'出队访问 '+g.nodes[u].label});
          g.adj[u].forEach(v=>{
            if(!disc.has(v)){disc.add(v);q.push(v);
              this.steps.push({visit:null,container:[...q],visited:[...visited],desc:g.nodes[u].label+' 的邻点 '+g.nodes[v].label+' 入队'});}
          });
        }
      } else {
        const s=[0];
        this.steps.push({visit:null,container:[...s],visited:[],desc:'从 A 出发，A 压栈'});
        while(s.length){
          const u=s.pop();
          visited.push(u);
          this.steps.push({visit:u,container:[...s],visited:[...visited],desc:'出栈访问 '+g.nodes[u].label});
          const nbrs=g.adj[u].filter(v=>!disc.has(v));
          [...nbrs].reverse().forEach(v=>{
            disc.add(v);s.push(v);
            this.steps.push({visit:null,container:[...s],visited:[...visited],desc:g.nodes[u].label+' 的邻点 '+g.nodes[v].label+' 压栈'});
          });
        }
      }
      this.steps.push({visit:null,container:[],visited:[...visited],desc:'✓ 遍历完成，顺序：'+visited.map(i=>g.nodes[i].label).join(' → ')});
    }
    render(){
      const ctx=this.ctx,w=LOGIC_W,h=LOGIC_H;
      const g=this.graph;
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      const mode=this.mode||'bfs';
      this._clear(w,h);
      this._text(mode==='bfs'?'广度优先遍历 BFS · 队列':'深度优先遍历 DFS · 栈', w/2, 14, 13, '#5c6470');
      ctx.strokeStyle='#b8c2d4';ctx.lineWidth=1.5;
      g.adj.forEach((nbrs,u)=>{nbrs.forEach(v=>{if(v>u){ctx.beginPath();ctx.moveTo(g.nodes[u].x,g.nodes[u].y);ctx.lineTo(g.nodes[v].x,g.nodes[v].y);ctx.stroke();}});});
      const visited=st?st.visited:[];
      const vs=new Set(visited);
      g.nodes.forEach(n=>{
        const isCur=st&&st.visit===n.id, isVis=vs.has(n.id);
        ctx.beginPath();ctx.arc(n.x,n.y,24,0,Math.PI*2);
        ctx.fillStyle=isCur?'#e5484d':(isVis?'#16a34a':'#5b9bd5');
        ctx.fill();
        ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.stroke();
        ctx.fillStyle='#fff';ctx.font='bold 14px "SF Mono",Menlo,Consolas,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText(n.label,n.x,n.y);
        if(isVis&&!isCur){
          const oi=visited.indexOf(n.id);
          ctx.beginPath();ctx.arc(n.x+19,n.y-19,9,0,Math.PI*2);
          ctx.fillStyle='#f59e0b';ctx.fill();
          ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';
          ctx.fillText(oi+1,n.x+19,n.y-19);
        }
      });
      const ctr=st?st.container:[];
      this._text(mode==='bfs'?'队列：':'栈：', 14, h-36, 12, '#5c6470','left');
      ctr.forEach((nid,idx)=>{
        const x=70+idx*42;
        ctx.fillStyle='#eef4fb';ctx.strokeStyle='#9db8d2';
        this._roundRect(x,h-50,36,28,5);ctx.fill();ctx.stroke();
        this._text(g.nodes[nid].label,x+18,h-36,13,'#2c3e50');
      });
      this._text('访问顺序：'+(visited.length?visited.map(i=>g.nodes[i].label).join(' → '):'（尚未开始，点击播放）'), w/2, h-8, 11, '#4d5670');
    }
  }

  KB_ANIM.GraphTraversalAnimation = GraphTraversalAnimation;
})();
