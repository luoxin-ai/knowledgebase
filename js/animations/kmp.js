/* ================================================================
 * kmp.js —— KMP 字符串匹配动画
 * ----------------------------------------------------------------
 * 主串/模式串/next 数组三行展示；匹配=绿、失配=红、当前位=琥珀
 * config.main / config.pattern 可自定义；内置 next 数组推导
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  class KMPAnimation extends AnimationBase {
    constructor(canvas, config){ super(canvas, config); }
    get main(){ return this.config.main || 'ABABABCABAB'; }
    get pat(){ return this.config.pattern || 'ABABC'; }
    generateSteps(){
      const main=this.main, pat=this.pat;
      this.next=this._buildNext(pat);
      this.steps=[];
      let i=0,j=0;
      while(i<main.length){
        if(j===-1||main[i]===pat[j]){
          this.steps.push({i,j,match:true,desc:'比较 main['+i+']='+main[i]+' 与 pat['+j+']='+pat[j]+' ✓ 相同'});
          i++;j++;
          if(j===pat.length){
            this.steps.push({i,j,match:null,done:true,start:i-j,desc:'✓ 匹配成功！模式串在主串中出现的位置 = '+(i-j)});
            break;
          }
        } else {
          this.steps.push({i,j,match:false,desc:'比较 main['+i+']='+main[i]+' 与 pat['+j+']='+pat[j]+' ✗ 失配 → j 回退到 next['+j+']='+this.next[j]});
          j=this.next[j];
        }
      }
      if(j!==pat.length && i>=main.length){
        this.steps.push({i:i,j:j,match:null,done:false,desc:'主串扫描完毕，未找到匹配'});
      }
    }
    _buildNext(p){
      const next=new Array(p.length).fill(0); next[0]=-1;
      let j=0,k=-1;
      while(j<p.length-1){
        if(k===-1||p[j]===p[k]){j++;k++;next[j]=k;}
        else k=next[k];
      }
      return next;
    }
    render(){
      const ctx=this.ctx,w=LOGIC_W,h=LOGIC_H;
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      this._clear(w,h);
      this._text('KMP 字符串匹配 · 主串 "'+this.main+'"  模式串 "'+this.pat+'"', w/2, 14, 13, '#5c6470');
      const bw=38,bh=44,x0=30;
      const start=st?(st.i-st.j):0;
      ctx.font='11px sans-serif';ctx.textAlign='left';ctx.textBaseline='middle';
      ctx.fillStyle='#5c6470';ctx.fillText('主串 S',8,72);
      for(let k=0;k<this.main.length;k++){
        const x=x0+k*bw;
        const isCur=st&&st.i===k&&!st.done;
        ctx.fillStyle=isCur?'#fdf3e3':'#f4f6f8';
        ctx.strokeStyle=isCur?'#d97706':'#d0d7de';
        ctx.lineWidth=isCur?2.5:1;
        this._roundRect(x+1,50,bw-2,bh,6);ctx.fill();ctx.stroke();ctx.lineWidth=1;
        this._text(this.main[k],x+bw/2,50+bh/2,15,'#2c3e50');
      }
      ctx.fillStyle='#5c6470';ctx.fillText('模式串 P',8,152);
      for(let k=0;k<this.pat.length;k++){
        const x=x0+(start+k)*bw;
        const isCur=st&&st.j===k&&!st.done;
        const isMatched=st&&st.match===true&&st.j===k;
        const isFailed=st&&st.match===false&&st.j===k;
        ctx.fillStyle=isMatched?'#e8f7ee':(isFailed?'#fdeef0':(isCur?'#fdf3e3':'#eef4fb'));
        ctx.strokeStyle=isMatched?'#16a34a':(isFailed?'#e5484d':(isCur?'#d97706':'#9db8d2'));
        ctx.lineWidth=isCur?2.5:1;
        this._roundRect(x+1,130,bw-2,bh,6);ctx.fill();ctx.stroke();ctx.lineWidth=1;
        this._text(this.pat[k],x+bw/2,130+bh/2,15,'#2c3e50');
      }
      ctx.fillStyle='#5c6470';ctx.font='11px sans-serif';ctx.fillText('next 数组',8,222);
      for(let k=0;k<this.next.length;k++){
        const x=x0+k*46;
        const isUsed=st&&st.match===false&&st.j===k;
        ctx.fillStyle=isUsed?'#fdf3e3':'#f8f9fa';
        ctx.strokeStyle='#d0d7de';
        this._roundRect(x+1,206,42,30,5);ctx.fill();ctx.stroke();
        this._text(String(this.next[k]),x+22,221,13,isUsed?'#d97706':'#5c6470');
      }
      if(st&&st.done&&st.match===null){
        this._text('✓ 匹配成功！出现位置 = '+st.start, w/2, 258, 14, '#16a34a','center',true);
      } else {
        const lines=st?st.desc.split('\n'):['就绪'];
        this._text(lines[0],w/2,258,12,'#5c6470');
      }
      if(st) this._text('i='+st.i+'  j='+st.j, w/2, 278, 11, '#98a0ae');
    }
  }

  KB_ANIM.KMPAnimation = KMPAnimation;
})();
