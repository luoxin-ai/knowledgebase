/* ================================================================
 * huffman.js —— 哈夫曼树构建动画
 * ----------------------------------------------------------------
 * 字母 A~E（权 5/2/7/4/9）逐步合并最小两棵子树，
 * 最终展示编码与 WPL 计算；红色高亮本步合并的节点
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  class HuffmanAnimation extends AnimationBase {
    constructor(canvas, config){ super(canvas, config); }
    get tree(){
      return {
        l0:{label:'A',w:5,x:110,y:190}, l1:{label:'B',w:2,x:230,y:270},
        l2:{label:'C',w:7,x:410,y:190}, l3:{label:'D',w:4,x:310,y:270},
        l4:{label:'E',w:9,x:570,y:190}, n1:{label:'6',w:6,x:270,y:190},
        n2:{label:'11',w:11,x:190,y:110}, n3:{label:'16',w:16,x:490,y:110},
        root:{label:'27',w:27,x:340,y:30}
      };
    }
    generateSteps(){
      const E=[['n1','l1'],['n1','l3'],['n2','l0'],['n2','n1'],['n3','l2'],['n3','l4'],['root','n2'],['root','n3']];
      this.steps=[
        {desc:'初始森林：A(5) B(2) C(7) D(4) E(9)\n选择权值最小的两个：B(2) 与 D(4)',edges:[],highlight:['l1','l3'],nodes:['l0','l1','l2','l3','l4']},
        {desc:'合并 B(2) + D(4) → 新节点 6',edges:E.slice(0,2),highlight:['l1','l3','n1'],nodes:['l0','l1','l2','l3','l4','n1']},
        {desc:'选择 A(5) 与 6，合并 → 新节点 11',edges:E.slice(0,4),highlight:['l0','n1','n2'],nodes:['l0','l1','l2','l3','l4','n1','n2']},
        {desc:'选择 C(7) 与 E(9)，合并 → 新节点 16',edges:E.slice(0,6),highlight:['l2','l4','n3'],nodes:['l0','l1','l2','l3','l4','n1','n2','n3']},
        {desc:'选择 11 与 16，合并 → 根节点 27\n哈夫曼树构建完成！',edges:E,highlight:['n2','n3','root'],nodes:['l0','l1','l2','l3','l4','n1','n2','n3','root']},
        {desc:'✓ 完成！编码：A:00 B:010 C:10 D:011 E:11\nWPL = 5×2+2×3+4×3+7×2+9×2 = 60',edges:E,highlight:[],nodes:['l0','l1','l2','l3','l4','n1','n2','n3','root']}
      ];
    }
    render(){
      const ctx=this.ctx,w=LOGIC_W,h=LOGIC_H;
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      this._clear(w,h);
      this._text('哈夫曼树构建 · 每次合并权值最小的两个节点', w/2, 14, 13, '#5c6470');
      if(!st) return;
      const t=this.tree;
      ctx.strokeStyle='#9db8d2';ctx.lineWidth=1.5;
      st.edges.forEach(([a,b])=>{const na=t[a],nb=t[b];if(na&&nb){ctx.beginPath();ctx.moveTo(na.x,na.y);ctx.lineTo(nb.x,nb.y);ctx.stroke();}});
      st.nodes.forEach(id=>{
        const n=t[id]; if(!n) return;
        const isHL=st.highlight.indexOf(id)>-1;
        ctx.beginPath();ctx.arc(n.x,n.y,22,0,Math.PI*2);
        ctx.fillStyle=isHL?'#e5484d':'#5b9bd5';
        ctx.fill();
        ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.stroke();
        ctx.fillStyle='#fff';ctx.font='bold 13px "SF Mono",Menlo,Consolas,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText(n.label,n.x,n.y);
        ctx.fillStyle='#5c6470';ctx.font='10.5px monospace';ctx.textAlign='center';
        ctx.fillText('w='+n.w,n.x,n.y+37);
      });
      const lines=st.desc.split('\n');
      lines.forEach((ln,i)=>this._text(ln,w/2,h-16+i*16,12,'#4d5670'));
    }
  }

  KB_ANIM.HuffmanAnimation = HuffmanAnimation;
})();
