/* ================================================================
 * extra.js —— 补充动画：Cache 映射 / 指令流水线 / 黎曼和 / 矩阵乘法
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  /* ============ Cache 地址映射（直接 / 组相联 / 全相联） ============ */
  class CacheMapAnimation extends AnimationBase {
    generateSteps(){
      const blocks = this.config.blocks || 8;          /* Cache 行数 */
      const addrs = this.config.addrs || [0x0, 0x8, 0x4, 0xC, 0x10, 0x18];
      const mode = this.mode || 'direct';
      const lines = [];
      this.steps = [];
      addrs.forEach((a, k)=>{
        let line = 0, tag = 0;
        if(mode==='direct'){ line = a % blocks; tag = Math.floor(a/blocks); }
        else if(mode==='assoc'){ line = lines.length < blocks ? lines.length : -1; tag = a; } /* 全相联:任意行 */
        else { const sets = blocks/2; line = (a % sets)*2; tag = Math.floor(a/sets); }        /* 2 路组相联 */
        if(mode==='assoc' && line===-1){ line = k % blocks; }
        if(mode==='set'){ line = line + (k % 2); }  /* 组内两路轮流示意 */
        const present = lines.indexOf(line)>=0 && (this._tags||[])[lines.indexOf(line)]===tag;
        lines.push(line); (this._tags = this._tags||[]).push(tag);
        this.steps.push({ addr:a, line, tag, hit: !!present,
          desc: (present?'命中':'装入')+'：地址 0x'+a.toString(16).toUpperCase()+' → '+(mode==='assoc'?'任意行':'第 '+line+' 行')+'（tag='+tag+'）' + (present?'，tag 相同，命中':'') });
      });
      const hits = this.steps.filter(s=>s.hit).length;
      this.steps.push({ done:true, lines:[], desc:'✓ 完成 · 共 '+addrs.length+' 次访问，命中 '+hits+' 次' });
    }
    render(){
      const st = this.steps[Math.min(this.currentStep, this.steps.length-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      const modeName = {direct:'直接映射', set:'二路组相联', assoc:'全相联'}[this.mode||'direct'];
      this._text('Cache 映射 · '+modeName, w/2, 20, 13, '#111', 'center', true);
      const blocks = this.config.blocks || 8;
      /* Cache 行 */
      const bw = 90, bh = 26, gy = 50, gap = 6;
      const gx = w/2 - bw/2;
      for(let i=0;i<blocks;i++){
        const y = gy + i*(bh+gap);
        const active = !st.done && st.line===i;
        ctx.fillStyle = active ? (st.hit ? '#34c759' : '#0a84ff') : '#fff';
        ctx.strokeStyle = '#dcdcdc'; ctx.lineWidth = 1;
        this._roundRect(gx, y, bw, bh, 5); ctx.fill(); ctx.stroke();
        this._text('行 '+i+(active?('  tag='+st.tag):''), gx+bw/2, y+bh/2, 11, active?'#fff':'#111');
      }
      /* 地址分解 */
      if(!st.done){
        const ay = gy + blocks*(bh+gap) + 16;
        this._text('访问地址 0x'+st.addr.toString(16).toUpperCase(), w/2, ay, 12, '#111', 'center', true);
        this._text(st.hit?'命中':'未命中 · 装入', w/2, ay+20, 11, st.hit?'#16803c':'#cf2230','center',true);
      } else {
        this._text(st.desc, w/2, gy + blocks*(bh+gap) + 16, 12, '#16803c', 'center', true);
      }
    }
  }

  /* ============ 指令流水线甘特图（5 段） ============ */
  class PipelineAnimation extends AnimationBase {
    generateSteps(){
      const n = this.config.instructions || 5;
      const stages = ['取指 IF','译码 ID','执行 EX','访存 MEM','写回 WB'];
      this.steps = [{ t:0, desc:'五段流水线：'+n+' 条指令依次进入' }];
      const total = n + 4;
      for(let t=1;t<=total;t++){
        const desc = stages.map((s,si)=>{
          const li = t - si - 1;
          return (li>=0 && li<n) ? ('I'+(li+1)+s.split(' ')[0]) : null;
        }).filter(Boolean).join(' · ');
        this.steps.push({ t, desc: t<=4 ? ('时刻 '+t+'：'+desc) : ('时刻 '+t+'：'+desc) });
      }
      this.steps.push({ t:total, done:true, desc:'✓ 完成 · '+n+' 条指令 '+total+' 拍（加速比 '+(n*5/total).toFixed(2)+'）' });
    }
    render(){
      const st = this.steps[Math.min(this.currentStep, this.steps.length-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      this._text('指令流水线 · 时空图', w/2, 20, 13, '#111', 'center', true);
      const n = this.config.instructions || 5;
      const stages = ['IF','ID','EX','MEM','WB'];
      const cw = Math.min(54, (w-200)/(n+4)), rh = 30, gx = 110, gy = 44;
      /* 指令行 */
      for(let i=0;i<n;i++){
        const y = gy + i*rh;
        this._text('指令 I'+(i+1), gx-10, y+rh/2, 11, '#111', 'right', true);
        stages.forEach((s,si)=>{
          const t0 = i + si + 1;
          const active = st.t >= t0;
          const isNow = st.t === t0;
          ctx.fillStyle = isNow ? '#0a84ff' : (active ? '#dbeeff' : '#f4f4f5');
          ctx.strokeStyle = '#e0e0e0';
          const x = gx + (t0-1)*cw, y2 = y+4, hh = rh-8;
          this._roundRect(x, y2, cw-2, hh, 4); ctx.fill(); ctx.stroke();
          this._text(s, x+(cw-2)/2, y2+hh/2, 9.5, active && !isNow ? '#555' : (isNow?'#fff':'#bbb'));
        });
      }
      /* 时间轴 */
      for(let t=1;t<=n+4;t++) this._text(String(t), gx+(t-1)*cw+(cw-2)/2, gy+n*rh+12, 9.5, '#9ca3af');
      this._text(st.desc, w/2, gy+n*rh+34, 11, st.done?'#16803c':'#111');
    }
  }

  /* ============ 黎曼和逼近定积分 ============ */
  class RiemannAnimation extends AnimationBase {
    generateSteps(){
      const n = this.config.n || 10;
      const a = 0, b = 2;   /* ∫₀² x² dx = 8/3 */
      this.steps = [];
      [2,4,8,16,32].slice(0, Math.min(5, Math.max(2,n))).forEach((m)=>{
        const dx = (b-a)/m;
        let s = 0;
        for(let i=0;i<m;i++){ const x = a + i*dx; s += x*x*dx; }
        this.steps.push({ m, sum:s, desc:m+' 个矩形：黎曼和 = '+s.toFixed(4)+'（精确值 8/3 ≈ 2.6667）' });
      });
      this.steps.push({ m:200, sum:8/3, done:true, desc:'✓ 完成 · n→∞ 黎曼和 → 定积分 = 8/3 ≈ 2.6667' });
    }
    render(){
      const st = this.steps[Math.min(this.currentStep, this.steps.length-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      this._text('定积分的黎曼和逼近：∫₀² x² dx', w/2, 18, 13, '#111', 'center', true);
      /* 坐标系 */
      const ox = 80, oy = h-46, pw = w-160, ph = h-100;
      const sx = pw/2, sy = ph/4;   /* x:0..2 y:0..4 */
      ctx.strokeStyle = '#c8c8c8'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(ox,oy); ctx.lineTo(ox+pw,oy); ctx.moveTo(ox,oy); ctx.lineTo(ox,oy-ph); ctx.stroke();
      /* 矩形 */
      const m = st.m;
      if(m<=200){
        const dx = 2/m;
        for(let i=0;i<m;i++){
          const x = i*dx, y = x*x;
          ctx.fillStyle = 'rgba(10,132,255,.30)';
          const rx = ox + x*sx, rw = Math.max(dx*sx, 0.5);
          const rh2 = y*sy;
          ctx.fillRect(rx, oy-rh2, rw, rh2);
        }
      }
      /* 曲线 y=x² */
      ctx.strokeStyle = '#0a84ff'; ctx.lineWidth = 2;
      ctx.beginPath();
      for(let px=0;px<=pw;px+=2){
        const x = px/sx, y = x*x;
        const X = ox+px, Y = oy - y*sy;
        px===0 ? ctx.moveTo(X,Y) : ctx.lineTo(X,Y);
      }
      ctx.stroke();
      this._text('黎曼和 S = '+st.sum.toFixed(4), ox+pw/2, 40, 13, st.done?'#16803c':'#111', 'center', true);
      this._text('矩形数 n = '+st.m, ox+pw/2, oy+18, 11, '#9ca3af', 'center');
    }
  }

  /* ============ 矩阵乘法 C = A×B（逐元素高亮） ============ */
  class MatrixMulAnimation extends AnimationBase {
    generateSteps(){
      const A = this.config.A || [[1,2],[3,4]];
      const B = this.config.B || [[5,6],[7,8]];
      const n = A.length;
      this.steps = [];
      for(let i=0;i<n;i++) for(let j=0;j<n;j++){
        let s = 0, terms = [];
        for(let k=0;k<n;k++){ s += A[i][k]*B[k][j]; terms.push(A[i][k]+'×'+B[k][j]); }
        this.steps.push({ i, j, terms, val:s,
          desc:'C['+i+']['+j+'] = '+terms.join(' + ')+' = '+s });
      }
      this.steps.push({ done:true, desc:'✓ 完成 · C = A×B' });
    }
    render(){
      const st = this.steps[Math.min(this.currentStep, this.steps.length-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      this._text('矩阵乘法 C = A × B', w/2, 20, 13, '#111', 'center', true);
      const A = this.config.A || [[1,2],[3,4]];
      const B = this.config.B || [[5,6],[7,8]];
      const n = A.length;
      const cell = 34, gap = 6;
      const draw = (M, x0, y0, hl)=>{
        for(let i=0;i<M.length;i++) for(let j=0;j<M[0].length;j++){
          const hlRow = hl && hl.rows && hl.rows.indexOf(i)>=0;
          const hlCol = hl && hl.cols && hl.cols.indexOf(j)>=0;
          ctx.fillStyle = hlRow||hlCol ? '#dbeeff' : '#fff';
          ctx.strokeStyle='#dcdcdc';
          const x = x0+j*(cell+gap), y=y0+i*(cell+gap);
          this._roundRect(x,y,cell,cell,5); ctx.fill(); ctx.stroke();
          this._text(String(M[i][j]), x+cell/2, y+cell/2, 12, hlRow||hlCol?'#0a84ff':'#111');
        }
      };
      const y0 = 56, ax = w/2-215, bx = w/2-45, cx = w/2+125;
      draw(A, ax, y0, !st.done?{rows:[st.i]}:null);
      draw(B, bx, y0, !st.done?{cols:[st.j]}:null);
      /* C 矩阵 */
      const steps = this.steps;
      const done = steps.filter(s=>!s.done).slice(0, this.currentStep+1);
      for(let i=0;i<n;i++) for(let j=0;j<n;j++){
        const e = done.find(s=>s.i===i&&s.j===j);
        const x = cx+j*(cell+gap), y=y0+i*(cell+gap);
        const isNow = !st.done && st.i===i && st.j===j;
        ctx.fillStyle = e ? (isNow?'#0a84ff':'#fff') : '#f7f7f8';
        ctx.strokeStyle='#dcdcdc';
        this._roundRect(x,y,cell,cell,5); ctx.fill(); ctx.stroke();
        if(e) this._text(String(e.val), x+cell/2, y+cell/2, 12, isNow?'#fff':'#111');
      }
      this._text('A', ax+cell/2, y0+n*(cell+gap)+10, 11, '#9ca3af','center',true);
      this._text('B', bx+cell/2, y0+n*(cell+gap)+10, 11, '#9ca3af','center',true);
      this._text('C', cx+cell/2, y0+n*(cell+gap)+10, 11, '#9ca3af','center',true);
      if(st.done) this._text('✓ C = A×B', w/2, y0+n*(cell+gap)+34, 12, '#16803c','center',true);
    }
  }

  KB_ANIM.CacheMapAnimation = CacheMapAnimation;
  KB_ANIM.PipelineAnimation = PipelineAnimation;
  KB_ANIM.RiemannAnimation = RiemannAnimation;
  KB_ANIM.MatrixMulAnimation = MatrixMulAnimation;
})();
