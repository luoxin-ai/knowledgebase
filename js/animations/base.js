/* ================================================================
 * base.js —— 动画引擎基类 + 共享绘图工具
 * ----------------------------------------------------------------
 * 设计约定：
 *   - 逻辑画布 680×300，通过 _fit() 按容器宽度等比缩放（含 DPR）
 *   - 每个动画 = steps 数组（快照序列）+ 状态机（play/pause/step/reset）
 *   - 子类只需实现 generateSteps() 与 render()
 *   - ALL_ANIMS 记录所有存活实例，窗口 resize 时统一 _fit + render
 * ================================================================ */
(function(){
  'use strict';

  const LOGIC_W = 680, LOGIC_H = 300;
  const ALL_ANIMS = [];

  class AnimationBase {
    constructor(canvas, config){
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.config = config || {};
      this.isPlaying = false;
      this.speed = 1;
      this.currentStep = 0;
      this.steps = [];
      this.lastStepTime = 0;
      this.stepInterval = 650;
      this.rafId = null;
      this.statusEl = null;
      this.captionEl = null;
      this.mode = (config && config.mode) || null;
      this._fit();
      this.generateSteps();
      this.render();
      ALL_ANIMS.push(this);
    }
    /* 逻辑坐标 -> 物理像素适配（容器宽度 + devicePixelRatio） */
    _fit(){
      /* 已脱离 DOM 的旧实例（章节切换后）不做适配，避免 parentElement 为 null 抛错 */
      if(!this.canvas.parentElement) return;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const w = Math.max(320, Math.floor(rect.width));
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = w * dpr;
      this.canvas.height = LOGIC_H * dpr;
      this.ctx.setTransform(this.canvas.width/LOGIC_W, 0, 0, this.canvas.height/LOGIC_H, 0, 0);
    }
    generateSteps(){}
    render(){}
    setMode(mode){ if(this.mode !== null){ this.mode = mode; this.generateSteps(); this.currentStep = 0; } }

    /* ---- 状态机 ---- */
    play(){
      /* 审计 M2：连点播放若无 isPlaying 守卫会再开一条 rAF 循环，两条循环并发推进 currentStep → 双倍速。
         已播放中直接返回；仅当动画已结束(currentStep 到尾)或暂停时允许（重新）启动 */
      if(this.isPlaying) return;
      if(this.currentStep >= this.steps.length) this.reset();
      this.isPlaying = true;
      this.lastStepTime = performance.now();
      if(this.statusEl) this.statusEl.classList.remove('done');
      this._loop();
    }
    pause(){
      this.isPlaying = false;
      if(this.rafId){ cancelAnimationFrame(this.rafId); this.rafId = null; }
    }
    reset(){
      this.pause();
      this.currentStep = 0;
      this.render();
      this._setStatus('就绪，点击播放');
      this._syncCaption();
    }
    stepForward(){
      this.pause();
      if(this.currentStep < this.steps.length){
        this.currentStep++;
        this.render();
        this._setStatus();
        this._syncCaption();
      } else this._setStatus('✓ 完成');
    }
    setSpeed(s){ this.speed = parseFloat(s) || 1; }
    _loop(){
      if(!this.isPlaying) return;
      const now = performance.now();
      if(now - this.lastStepTime >= this.stepInterval/this.speed){
        if(this.currentStep < this.steps.length){
          this.currentStep++;
          this.render();
          this._setStatus();
          this._syncCaption();
          this.lastStepTime = now;
        } else {
          this.pause();
          this._setStatus('✓ 动画完成');
          return;
        }
      }
      this.rafId = requestAnimationFrame(()=>this._loop());
    }
    _setStatus(msg){
      if(this.statusEl){
        const step = this.steps[this.currentStep-1];
        const txt = msg || (step && step.desc) || ('步骤 '+this.currentStep+'/'+this.steps.length);
        this.statusEl.textContent = txt;
        this.statusEl.classList.toggle('done', /✓|完成/.test(txt));
      }
    }
    /* 同步「讲解区」：显示当前画面所对应步骤的完整描述 */
    _syncCaption(){
      if(!this.captionEl) return;
      const total = this.steps.length;
      if(this.currentStep >= total){
        this.captionEl.textContent = '✓ 已完成 · 共 '+total+' 步';
        return;
      }
      const st = this.steps[this.currentStep];
      if(st && st.desc) this.captionEl.textContent = (this.currentStep+1)+' / '+total+' · '+st.desc;
    }

    /* ---- 绘图辅助（逻辑坐标 680×300） ---- */
    _clear(w,h,color){ this.ctx.fillStyle = color || '#fbfcff'; this.ctx.fillRect(0,0,w||LOGIC_W,h||LOGIC_H); }
    _text(str,x,y,size,color,align,bold){
      const ctx = this.ctx;
      ctx.fillStyle = color || '#3a4150';
      ctx.font = (bold?'bold ':'') + (size||13) + 'px "SF Mono",Menlo,Consolas,"PingFang SC",sans-serif';
      ctx.textAlign = align || 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(str,x,y);
    }
    _roundRect(x,y,w,h,r){
      const ctx=this.ctx; ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
      ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath();
    }
  }

  window.KB_ANIM_BASE = { AnimationBase, LOGIC_W, LOGIC_H, ALL_ANIMS };
})();
