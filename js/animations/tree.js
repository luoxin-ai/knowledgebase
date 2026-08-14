/* ================================================================
 * tree.js —— 二叉树遍历动画（先序 / 中序 / 后序 三模式）
 * ----------------------------------------------------------------
 * 固定示例树（节点 1~7），mode 由 animModes 的 data-mode 驱动：
 *   preorder / inorder / postorder
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  class TreeTraversalAnimation extends AnimationBase {
    constructor(canvas, config){
      super(canvas, Object.assign({}, config, {mode:(config&&config.mode)||'preorder'}));
    }
    get tree(){
      return {
        1:{v:'1',l:2,r:3,x:340,y:40},
        2:{v:'2',l:4,r:5,x:200,y:110},
        3:{v:'3',l:null,r:6,x:480,y:110},
        4:{v:'4',l:null,r:null,x:120,y:180},
        5:{v:'5',l:7,r:null,x:280,y:180},
        6:{v:'6',l:null,r:null,x:560,y:180},
        7:{v:'7',l:null,r:null,x:220,y:250}
      };
    }
    generateSteps(){
      const mode=this.mode||'preorder';
      const order=[]; const t=this.tree;
      const f=(id)=>{
        if(id===null||id===undefined) return;
        if(mode==='preorder') order.push(id);
        f(t[id].l);
        if(mode==='inorder') order.push(id);
        f(t[id].r);
        if(mode==='postorder') order.push(id);
      };
      f(1);
      const names={preorder:'先序遍历（根→左→右）',inorder:'中序遍历（左→根→右）',postorder:'后序遍历（左→右→根）'};
      this.steps=[];
      const visited=[];
      order.forEach((nid,idx)=>{
        visited.push(nid);
        this.steps.push({node:nid,visited:[...visited],desc:'第 '+(idx+1)+' 步：访问节点 '+t[nid].v});
      });
      this.steps.push({node:null,visited:[...visited],desc:'✓ 遍历完成，序列：'+visited.map(id=>t[id].v).join(' → ')});
      this.traversalName=names[mode];
    }
    render(){
      const ctx=this.ctx,w=LOGIC_W,h=LOGIC_H;
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      this._clear(w,h);
      this._text(this.traversalName||'二叉树遍历', w/2, 14, 13, '#5c6470');
      const t=this.tree;
      ctx.strokeStyle='#b8c2d4'; ctx.lineWidth=1.5;
      Object.keys(t).forEach(k=>{
        const n=t[k];
        if(n.l){ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(t[n.l].x,t[n.l].y);ctx.stroke();}
        if(n.r){ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(t[n.r].x,t[n.r].y);ctx.stroke();}
      });
      const visited=st?st.visited:[];
      const vs=new Set(visited);
      Object.keys(t).forEach(k=>{
        const n=t[k];
        const isCur=st&&st.node===n.id;
        const isVis=vs.has(n.id);
        ctx.beginPath();ctx.arc(n.x,n.y,20,0,Math.PI*2);
        ctx.fillStyle=isCur?'#e5484d':(isVis?'#16a34a':'#5b9bd5');
        ctx.fill();
        ctx.strokeStyle=isCur?'#c0392b':(isVis?'#15803d':'#2980b9');
        ctx.lineWidth=isCur?3:1.5; ctx.stroke();
        ctx.fillStyle='#fff';ctx.font='bold 13px "SF Mono",Menlo,Consolas,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText(n.v,n.x,n.y);
        if(isVis&&!isCur){
          const oi=visited.indexOf(n.id);
          ctx.beginPath();ctx.arc(n.x+17,n.y-17,9,0,Math.PI*2);
          ctx.fillStyle='#f59e0b';ctx.fill();
          ctx.fillStyle='#fff';ctx.font='bold 9px sans-serif';
          ctx.fillText(oi+1,n.x+17,n.y-17);
        }
      });
      this._text('遍历序列：'+(visited.length?visited.map(id=>t[id].v).join(' → '):'（尚未开始，点击播放）'), w/2, h-14, 12, '#4d5670');
    }
  }

  KB_ANIM.TreeTraversalAnimation = TreeTraversalAnimation;
})();
