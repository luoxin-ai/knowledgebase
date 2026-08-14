/* ================================================================
 * network.js —— 计算机网络动画：滑动窗口（GBN 退 N 步）
 * ----------------------------------------------------------------
 * 演示发送方窗口在帧序列上滑动：发送 → 累积确认 → 窗口右移。
 * 挂载 KB_ANIM，由 factory.js 注册。
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  class SlidingWindowAnimation extends AnimationBase {
    generateSteps(){
      const total = this.config.total || 10;
      const win = this.config.window || 4;
      this.steps = [];
      const sent = [], acked = [];
      let base = 0;
      this.steps.push({ sent:[...sent], acked:[...acked], base,
        desc:'发送窗口大小 = '+win+'，初始覆盖帧 0..'+(win-1) });
      for(let i=0; i<total; i++){
        sent.push(i);
        this.steps.push({ sent:[...sent], acked:[...acked], base,
          desc:'发送帧 '+i+'（窗口内，等待确认）' });
        acked.push(i);
        base = Math.max(0, i - win + 1);
        const hi = Math.min(base + win - 1, total - 1);
        this.steps.push({ sent:[...sent], acked:[...acked], base,
          desc:'收到 ACK '+i+'，窗口右移到 '+base+'..'+hi });
      }
      this.steps.push({ sent:[...sent], acked:[...acked], base, done:true,
        desc:'✓ 完成 · 共发送 '+total+' 帧' });
    }
    render(){
      const total = this.steps.length;
      const st = this.steps[Math.min(this.currentStep, total-1)];
      if(!st) return;
      const ctx = this.ctx, w = LOGIC_W, h = LOGIC_H;
      this._clear(w, h);
      this._text('滑动窗口 · GBN 后退 N 帧', w/2, 22, 13, '#111', 'center', true);
      const n = this.config.total || 10;
      const win = this.config.window || 4;
      const cw = 40, gap = 8;
      const seqW = n*(cw+gap) - gap;
      const sx = (w - seqW)/2;
      const y0 = 96;
      const acked = st.acked || [], sent = st.sent || [], base = st.base || 0;
      /* 窗口范围框 */
      const lo = Math.min(base, n-1), hi = Math.min(base + win - 1, n-1);
      const wx = sx + lo*(cw+gap) - 4, ww = (hi-lo+1)*(cw+gap) - gap + 8;
      ctx.strokeStyle = '#0a84ff'; ctx.lineWidth = 2;
      this._roundRect(wx, y0-10, ww, cw+20, 10); ctx.stroke();
      for(let i=0;i<n;i++){
        const x = sx + i*(cw+gap);
        let fill = '#f4f4f5', txt = '#111';
        if(acked.indexOf(i) >= 0){ fill = '#34c759'; txt = '#fff'; }
        else if(sent.indexOf(i) >= 0){ fill = '#ffcc00'; txt = '#111'; }
        this._roundRect(x, y0, cw, cw, 7);
        ctx.fillStyle = fill; ctx.fill();
        ctx.strokeStyle = '#e0e0e0'; ctx.lineWidth = 1; ctx.stroke();
        this._text(String(i), x+cw/2, y0+cw/2, 13, txt, 'center', true);
      }
      this._text('绿=已确认  黄=已发送待确认  蓝框=发送窗口', w/2, y0+cw+26, 11, '#9ca3af');
      this._text('窗口范围 ['+lo+'..'+hi+']', w/2, y0+cw+44, 12, '#0a84ff', 'center', true);
    }
  }

  KB_ANIM.SlidingWindowAnimation = SlidingWindowAnimation;
})();
