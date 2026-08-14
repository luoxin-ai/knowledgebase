/* ================================================================
 * os.js —— 操作系统动画：页面置换（FIFO/LRU/OPT）+ 进程调度（FCFS/SJF/RR）
 * ----------------------------------------------------------------
 * 均为「快照步骤」模式，继承 AnimationBase，挂载 KB_ANIM，
 * 由 factory.js 注册到 AnimationFactories。
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  /* ==================== 页面置换动画 ==================== */
  class PageReplaceAnimation extends AnimationBase {
    generateSteps(){
      const pages = this.config.pages || [7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1];
      const fn = this.config.frames || 3;
      const mode = this.mode || 'FIFO';
      const frames = [], last = [];
      this.steps = [];
      let tick = 0;
      pages.forEach((p, idx) => {
        tick++;
        const pos = frames.indexOf(p);
        if(pos >= 0){
          if(mode === 'LRU') last[pos] = tick;
          this.steps.push({ hit:true, page:p, idx, frames:[...frames], desc:'访问页 '+p+'，命中，页框不变' });
          return;
        }
        let victim = null;
        if(frames.length < fn){
          frames.push(p); last.push(tick);
        } else {
          let evict = 0;
          if(mode === 'FIFO'){
            evict = 0;
          } else if(mode === 'LRU'){
            for(let i=1;i<fn;i++) if(last[i] < last[evict]) evict = i;
          } else { /* OPT：淘汰未来最晚才用（或永不再用）的页 */
            let far = -1;
            for(let i=0;i<fn;i++){
              const nxt = pages.indexOf(frames[i], idx+1);
              if(nxt === -1){ evict = i; break; }
              if(nxt > far){ far = nxt; evict = i; }
            }
          }
          victim = frames[evict];
          frames[evict] = p; last[evict] = tick;
        }
        this.steps.push({ hit:false, page:p, idx, frames:[...frames], victim,
          desc: victim === null ? ('访问页 '+p+'，缺页，装入空页框')
                                : ('访问页 '+p+'，缺页，淘汰页 '+victim) });
      });
      const faults = this.steps.filter(s=>!s.hit).length;
      this.steps.push({ done:true, frames:[...frames], desc:'✓ 完成 · 共缺页 '+faults+' 次 / '+pages.length+' 次访问' });
    }
    render(){
      const total = this.steps.length;
      const st = this.steps[Math.min(this.currentStep, total-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      const modeName = {FIFO:'FIFO', LRU:'LRU', OPT:'OPT'}[this.mode||'FIFO'] || '';
      this._text('页面置换 · '+modeName+'（'+this.config.frames+' 个页框）', w/2, 20, 13, '#111', 'center', true);
      /* 访问序列 */
      const pages = this.config.pages || [];
      const cw = 30, gap = 5, y0 = 48;
      const seqW = pages.length*(cw+gap) - gap;
      const sx = (w - seqW)/2;
      pages.forEach((p, i) => {
        const x = sx + i*(cw+gap);
        const cur = (i === Math.min(this.currentStep, pages.length-1) && !st.done);
        ctx.fillStyle = cur ? '#0a84ff' : '#f4f4f5';
        this._roundRect(x, y0, cw, cw, 6); ctx.fill();
        this._text(String(p), x+cw/2, y0+cw/2, 11, cur ? '#fff' : '#111');
      });
      /* 页框 */
      const fw = 92, fh = 44, fy = 120, fgap = 16;
      const frames = st.frames || [];
      const n = Math.max(this.config.frames||3, 3);
      const fx = (w - (n*fw + (n-1)*fgap))/2;
      for(let i=0;i<n;i++){
        const x = fx + i*(fw+fgap);
        const val = frames[i];
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = st.hit ? '#16803c' : (st.done ? '#dcdcdc' : '#cf2230');
        ctx.lineWidth = st.hit ? 2 : 1;
        this._roundRect(x, fy, fw, fh, 8); ctx.fill(); ctx.stroke();
        this._text(val === undefined || val === null ? '' : String(val), x+fw/2, fy+fh/2, 16, '#111', 'center', true);
        this._text('页框 '+(i+1), x+fw/2, fy+fh+14, 10, '#9ca3af');
      }
      this._text(st.hit ? '命中' : (st.done ? '结束' : '缺页'), w/2, fy+fh+40, 12, st.hit ? '#16803c' : (st.done ? '#9ca3af' : '#cf2230'), 'center', true);
    }
  }

  /* ==================== 进程调度动画（甘特图） ==================== */
  class ProcessScheduleAnimation extends AnimationBase {
    generateSteps(){
      const procs = (this.config.processes || [
        { id:'P1', arrive:0, burst:4 },
        { id:'P2', arrive:1, burst:3 },
        { id:'P3', arrive:2, burst:1 },
        { id:'P4', arrive:3, burst:2 }
      ]).map(p=>({ ...p, remain:p.burst, done:false, finish:-1 }));
      const mode = this.mode || 'FCFS';
      const quantum = this.config.quantum || 2;
      this.steps = [];
      const gantt = [];
      let time = 0, finished = 0;
      const n = procs.length;
      while(finished < n){
        /* 选一个就绪进程 */
        let pick = -1;
        const ready = procs.filter(p=>!p.done && p.arrive <= time);
        if(ready.length === 0){ time++; continue; }
        if(mode === 'FCFS') pick = procs.indexOf(ready[0]);
        else if(mode === 'SJF'){
          let minB = Infinity;
          ready.forEach(p=>{ if(p.remain < minB){ minB = p.remain; pick = procs.indexOf(p); } });
        } else { /* RR：按到达顺序 + 循环，这里按 arrive 排序取最早就绪 */
          pick = procs.indexOf(ready[0]);
        }
        const p = procs[pick];
        const run = (mode === 'RR') ? Math.min(quantum, p.remain) : p.remain;
        gantt.push({ id:p.id, start:time, end:time+run });
        time += run; p.remain -= run;
        if(p.remain === 0){ p.done = true; p.finish = time; finished++; }
        const wait = procs.reduce((s,q)=> s + (q.done ? (q.finish - q.arrive - q.burst) : 0), 0);
        this.steps.push({ gantt:[...gantt], time, desc:'调度 '+p.id+' 运行 '+run+' 个单位时间' });
      }
      const totalWait = procs.reduce((s,q)=> s + (q.finish - q.arrive - q.burst), 0);
      const avg = (totalWait / n).toFixed(1);
      this.steps.push({ gantt:[...gantt], time, done:true,
        desc:'✓ 完成 · 平均等待时间 = '+avg });
    }
    render(){
      const total = this.steps.length;
      const st = this.steps[Math.min(this.currentStep, total-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      const modeName = {FCFS:'FCFS', SJF:'SJF', RR:'RR（时间片 '+this.config.quantum+'）'}[this.mode||'FCFS'] || '';
      this._text('进程调度 · '+modeName, w/2, 20, 13, '#111', 'center', true);
      const colors = ['#0a84ff','#34c759','#ff9500','#af52de','#ff3b30','#00b8c8'];
      const colorOf = id => colors[parseInt(String(id).replace(/\D/g,'')||0) % colors.length];
      /* 甘特图 */
      const gy = 70, gh = 60;
      const gantt = st.gantt || [];
      const maxT = Math.max(st.time, 1);
      const scale = (w - 80) / maxT;
      gantt.forEach(seg => {
        const x = 40 + seg.start*scale, wd = (seg.end-seg.start)*scale;
        ctx.fillStyle = colorOf(seg.id);
        this._roundRect(x, gy, wd, gh, 4); ctx.fill();
        if(wd > 26) this._text(seg.id, x+wd/2, gy+gh/2, 12, '#fff', 'center', true);
      });
      /* 时间轴刻度 */
      ctx.fillStyle = '#9ca3af';
      for(let t=0; t<=maxT; t++){
        const x = 40 + t*scale;
        this._text(String(t), x, gy+gh+14, 10, '#9ca3af');
      }
      /* 图例 */
      const procs = this.config.processes || [];
      const legY = 180;
      procs.forEach((p, i) => {
        const x = 80 + i*110;
        ctx.fillStyle = colorOf(p.id);
        this._roundRect(x, legY, 12, 12, 3); ctx.fill();
        this._text(p.id+' 到达'+p.arrive+' 运行'+p.burst, x+18, legY+6, 11, '#111', 'left');
      });
      this._text(st.done ? '完成' : '第 '+Math.min(this.currentStep, total-1)+' 步', w/2, legY+34, 11, '#9ca3af');
    }
  }

  KB_ANIM.PageReplaceAnimation = PageReplaceAnimation;
  KB_ANIM.ProcessScheduleAnimation = ProcessScheduleAnimation;
})();
