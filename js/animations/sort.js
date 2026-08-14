/* ================================================================
 * sort.js —— 四大排序动画：冒泡 / 快排 / 堆排 / 归并
 * ----------------------------------------------------------------
 * 均为「条形图 + 快照步骤」模式：
 *   compare=橙 / swap=红 / 已确定=绿 / pivot=紫 / 归并区间=蓝
 * 类挂载到 KB_ANIM 命名空间，由 factory.js 统一注册到 AnimationFactories
 * ================================================================ */
(function(){
  'use strict';
  const { AnimationBase, LOGIC_W, LOGIC_H } = KB_ANIM_BASE;
  window.KB_ANIM = window.KB_ANIM || {};

  /* ==================== 排序条形图公共绘制 ==================== */
  function drawSortBars(anim, arr, opts){
    const ctx=anim.ctx, w=LOGIC_W, h=LOGIC_H;
    const o=opts||{};
    const compare=o.compare||[], swap=o.swap||[];
    const sortedSet=o.sortedSet||new Set();
    const n=arr.length, padL=30, padR=30, padT=44, padB=34;
    const maxV=Math.max.apply(null,arr);
    const bw=(w-padL-padR)/n;
    anim._clear(w,h);
    if(o.title) anim._text(o.title, w/2, 16, 13, '#5c6470','center');
    if(o.subtitle) anim._text(o.subtitle, w/2, 31, 10.5, '#98a0ae','center');
    for(let i=0;i<n;i++){
      const bh=Math.max(4,(arr[i]/maxV)*(h-padT-padB));
      const x=padL+i*bw, y=h-padB-bh;
      let color='#5b9bd5';
      if(sortedSet.has(i)) color='#16a34a';
      if(compare.indexOf(i)>-1) color='#f59e0b';
      if(swap.indexOf(i)>-1) color='#e5484d';
      if(o.pivot===i) color='#8e44ad';
      if(o.boundary!==undefined && i>=o.boundary && !sortedSet.has(i)) color='rgba(155,89,182,.3)';
      ctx.fillStyle=color;
      anim._roundRect(x+1.5, y, bw-3, bh, 3); ctx.fill();
      anim._text(String(arr[i]), x+bw/2, h-padB+13, 10, '#98a0ae');
    }
    if(o.pivotLow!==undefined && o.pivotHigh!==undefined && o.pivotLow<o.pivotHigh){
      const x1=padL+o.pivotLow*bw+bw/2, x2=padL+o.pivotHigh*bw+bw/2;
      ctx.strokeStyle='rgba(142,68,173,.5)'; ctx.setLineDash([4,3]);
      ctx.beginPath(); ctx.moveTo(x1, padT-12); ctx.lineTo(x2, padT-12); ctx.stroke();
      ctx.setLineDash([]);
    }
    if(o.mergeLow!==undefined && o.mergeHigh!==undefined){
      const x1=padL+o.mergeLow*bw+bw/2, x2=padL+o.mergeHigh*bw+bw/2;
      ctx.strokeStyle='rgba(52,152,219,.7)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(x1,h-padB+3); ctx.lineTo(x2,h-padB+3); ctx.stroke();
      ctx.fillStyle='rgba(52,152,219,.22)';
      anim._roundRect(x1-bw/2,h-padB-4,(x2-x1)+bw,10,4); ctx.fill();
      ctx.lineWidth=1;
    }
  }

  /* ==================== 冒泡排序 ==================== */
  class BubbleSortAnimation extends AnimationBase {
    generateSteps(){
      const arr=[...this.config.data], n=arr.length;
      const sortedSet=new Set(); this.steps=[];
      for(let i=0;i<n-1;i++){
        let swapped=false;
        for(let j=0;j<n-1-i;j++){
          this.steps.push({type:'compare',arr:[...arr],compare:[j,j+1],sortedSet:new Set(sortedSet),
            desc:'比较 '+arr[j]+' 与 '+arr[j+1]});
          if(arr[j]>arr[j+1]){
            const a=arr[j],b=arr[j+1];
            [arr[j],arr[j+1]]=[arr[j+1],arr[j]];
            this.steps.push({type:'swap',arr:[...arr],swap:[j,j+1],sortedSet:new Set(sortedSet),
              desc:'交换 '+a+' 与 '+b});
            swapped=true;
          }
        }
        sortedSet.add(n-1-i);
        this.steps.push({type:'mark',arr:[...arr],sortedSet:new Set(sortedSet),
          desc:'位置 '+(n-1-i)+' 已确定'});
        if(!swapped){ for(let k=0;k<=n-2-i;k++) sortedSet.add(k); break; }
      }
      for(let k=0;k<n;k++) sortedSet.add(k);
      this.steps.push({type:'done',arr:[...arr],sortedSet:new Set(sortedSet),desc:'✓ 排序完成'});
    }
    render(){
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      const arr=st?st.arr:this.config.data;
      drawSortBars(this,arr,{title:'冒泡排序 · 相邻逆序交换',compare:st&&st.compare||[],swap:st&&st.swap||[],sortedSet:st&&st.sortedSet||new Set()});
    }
  }

  /* ==================== 快速排序 ==================== */
  class QuickSortAnimation extends AnimationBase {
    generateSteps(){
      const arr=[...this.config.data];
      const sortedSet=new Set(); this.steps=[];
      const record=(type,extra)=>this.steps.push(Object.assign({type,arr:[...arr],sortedSet:new Set(sortedSet)},extra));
      const partition=(low,high)=>{
        const pivot=arr[high];
        record('pivot',{pivot,pivotIndex:high,low,high,desc:'选择枢轴 '+pivot+'（末尾元素）'});
        let i=low-1;
        for(let j=low;j<high;j++){
          record('compare',{compare:[j],pivot,pivotIndex:high,low,high,desc:'比较 '+arr[j]+' 与枢轴 '+pivot});
          if(arr[j]<pivot){
            i++;
            if(i!==j){
              const a=arr[i],b=arr[j];
              [arr[i],arr[j]]=[arr[j],arr[i]];
              record('swap',{swap:[i,j],pivot,pivotIndex:high,low,high,desc:'交换 '+a+' 与 '+b});
            }
          }
        }
        if(i+1!==high){
          const a=arr[i+1],b=arr[high];
          [arr[i+1],arr[high]]=[arr[high],arr[i+1]];
          record('swap',{swap:[i+1,high],pivot,pivotIndex:high,low,high,desc:'枢轴 '+b+' 归位（交换 '+a+' 与 '+b+'）'});
        }
        return i+1;
      };
      const qs=(low,high)=>{
        if(low<high){
          const p=partition(low,high);
          sortedSet.add(p);
          record('sorted',{sorted:[p],low,high,desc:'位置 '+p+' 已确定'});
          qs(low,p-1); qs(p+1,high);
        } else if(low===high && !sortedSet.has(low)){
          sortedSet.add(low);
          record('sorted',{sorted:[low],low,high,desc:'位置 '+low+' 已确定'});
        }
      };
      qs(0,arr.length-1);
      for(let k=0;k<arr.length;k++) sortedSet.add(k);
      record('done',{desc:'✓ 排序完成'});
    }
    render(){
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      const arr=st?st.arr:this.config.data;
      drawSortBars(this,arr,{title:'快速排序 · 分治划分',pivot:st&&st.pivotIndex!==undefined?st.pivotIndex:-1,
        compare:st&&st.compare||[],swap:st&&st.swap||[],sortedSet:st&&st.sortedSet||new Set(),
        pivotLow:st&&st.low, pivotHigh:st&&st.high});
    }
  }

  /* ==================== 堆排序 ==================== */
  class HeapSortAnimation extends AnimationBase {
    generateSteps(){
      const arr=[...this.config.data], n=arr.length;
      const sortedSet=new Set(); this.steps=[];
      let heapSize=n;
      const rec=(type,extra)=>this.steps.push(Object.assign({type,arr:[...arr],sortedSet:new Set(sortedSet),heapSize},extra));
      const sift=(i,size)=>{
        while(true){
          let largest=i, l=2*i+1, r=2*i+2;
          if(l<size){
            rec('compare',{compare:[i,l],desc:'比较 '+arr[i]+' 与 '+arr[l]});
            if(arr[l]>arr[largest]) largest=l;
          }
          if(r<size){
            rec('compare',{compare:[largest,r],desc:'比较 '+arr[largest]+' 与 '+arr[r]});
            if(arr[r]>arr[largest]) largest=r;
          }
          if(largest!==i){
            const a=arr[i],b=arr[largest];
            [arr[i],arr[largest]]=[arr[largest],arr[i]];
            rec('swap',{swap:[i,largest],desc:'交换 '+a+' 与 '+b+'（下沉调整）'});
            i=largest;
          } else break;
        }
      };
      for(let i=Math.floor(n/2)-1;i>=0;i--){
        rec('build',{desc:'构建大根堆 · 堆化位置 '+i});
        sift(i,n);
      }
      rec('buildDone',{desc:'✓ 大根堆构建完成，堆顶 = '+arr[0]});
      for(let i=n-1;i>0;i--){
        const a=arr[0],b=arr[i];
        [arr[0],arr[i]]=[arr[i],arr[0]];
        sortedSet.add(i); heapSize=i;
        rec('extract',{swap:[0,i],desc:'堆顶 '+a+' 与末尾 '+b+' 交换'});
        sift(0,heapSize);
      }
      sortedSet.add(0);
      rec('done',{desc:'✓ 排序完成'});
    }
    render(){
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      const arr=st?st.arr:this.config.data;
      drawSortBars(this,arr,{title:'堆排序 · 大根堆 + 堆顶下沉',boundary:st&&st.heapSize!==undefined?st.heapSize:undefined,
        compare:st&&st.compare||[],swap:st&&st.swap||[],sortedSet:st&&st.sortedSet||new Set()});
    }
  }

  /* ==================== 归并排序 ==================== */
  class MergeSortAnimation extends AnimationBase {
    generateSteps(){
      const arr=[...this.config.data];
      const sortedSet=new Set(); this.steps=[];
      const rec=(type,extra)=>this.steps.push(Object.assign({type,arr:[...arr],sortedSet:new Set(sortedSet)},extra));
      const temp=[];
      const merge=(low,mid,high)=>{
        rec('mergeStart',{mergeLow:low,mergeHigh:high,desc:'合并区间 ['+low+','+high+']'});
        let i=low,j=mid+1,k=0;
        while(i<=mid && j<=high){
          rec('compare',{compare:[i,j],mergeLow:low,mergeHigh:high,desc:'比较 '+arr[i]+' 与 '+arr[j]});
          if(arr[i]<=arr[j]) temp[k++]=arr[i++];
          else temp[k++]=arr[j++];
        }
        while(i<=mid){ temp[k++]=arr[i++]; }
        while(j<=high){ temp[k++]=arr[j++]; }
        for(let t=0;t<k;t++){
          arr[low+t]=temp[t];
          rec('copy',{copy:[low+t],mergeLow:low,mergeHigh:high,desc:'写入 '+temp[t]+' 到位置 '+(low+t)});
        }
        rec('mergeDone',{mergeLow:low,mergeHigh:high,desc:'区间 ['+low+','+high+'] 合并完成'});
      };
      const ms=(low,high)=>{
        if(low<high){
          const mid=Math.floor((low+high)/2);
          rec('divide',{mergeLow:low,mergeHigh:high,desc:'划分 ['+low+','+mid+'] 与 ['+(mid+1)+','+high+']'});
          ms(low,mid); ms(mid+1,high); merge(low,mid,high);
        }
      };
      ms(0,arr.length-1);
      for(let k=0;k<arr.length;k++) sortedSet.add(k);
      rec('done',{desc:'✓ 排序完成'});
    }
    render(){
      const st=this.steps[Math.min(this.currentStep,this.steps.length-1)];
      const arr=st?st.arr:this.config.data;
      drawSortBars(this,arr,{title:'归并排序 · 分而治之',
        compare:st&&st.compare||[],swap:st&&st.swap||[],sortedSet:st&&st.sortedSet||new Set(),
        mergeLow:st&&st.mergeLow!==undefined?st.mergeLow:undefined,
        mergeHigh:st&&st.mergeHigh!==undefined?st.mergeHigh:undefined});
    }
  }

  KB_ANIM.BubbleSortAnimation = BubbleSortAnimation;
  KB_ANIM.QuickSortAnimation  = QuickSortAnimation;
  KB_ANIM.HeapSortAnimation   = HeapSortAnimation;
  KB_ANIM.MergeSortAnimation  = MergeSortAnimation;
})();
