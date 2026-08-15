/* ================================================================
 * registry.js —— 知识库注册表
 * ----------------------------------------------------------------
 * 职责：
 *   1. 管理文件夹（folder，可嵌套：目录 → 科目 → 小科目）与文件（file）
 *   2. 数据文件通过 KB.register({...}) 注册自身
 *   3. 文件夹通过 KB.defineFolder({ id, title, icon, parent }) 定义
 *   4. 维护全局状态：当前激活文件 / 章节 / 块
 * 用法：
 *   KB.defineFolder({ id:'11408', title:'11408 考研', icon:'📚' });
 *   KB.defineFolder({ id:'408', title:'408 计算机基础', icon:'🖥️', parent:'11408' });
 *   KB.register({ id:'ds', folder:'408', type:'book', title:'数据结构', chapters:[...] });
 * ================================================================ */
window.KB = (function(){
  'use strict';

  const folders = {};   // id -> { id,title,icon,parent,files:[fileId...] }
  const files   = {};   // id -> fileDef

  const state = {
    activeFile:    null,   // 文件 id
    activeChapter: null,   // 章节 id
    activeBlock:   null    // 块 id
  };

  return {
    /* ---- 文件夹（支持嵌套） ---- */
    defineFolder(def){
      if(!def || !def.id) throw new Error('[KB] defineFolder 需要 id');
      folders[def.id] = { icon:'📁', title:def.id, files:[], parent:null, ...def };
    },
    getFolder(id){ return folders[id]; },
    listFolders(){ return Object.values(folders); },
    /* 顶层文件夹（parent 为空的） */
    rootFolders(){ return Object.values(folders).filter(f=>!f.parent); },
    /* 某文件夹下的子文件夹（按注册顺序） */
    childFolders(parentId){ return Object.values(folders).filter(f=>f.parent===parentId); },

    /* ---- 文件 ---- */
    register(file){
      if(!file || !file.id) throw new Error('[KB] register 需要文件 id');
      files[file.id] = file;
      if(file.folder && !file.hidden){
        if(!folders[file.folder]) this.defineFolder({ id:file.folder, title:file.folder });
        if(folders[file.folder].files.indexOf(file.id) < 0) folders[file.folder].files.push(file.id);
      }
      return file;
    },
    getFile(id){ return files[id]; },
    listFiles(){ return Object.values(files); },
    /* 侧边栏可见文件（hidden 的习题文件不显示，只作章末内嵌数据源） */
    listVisibleFiles(){ return Object.values(files).filter(f=>!f.hidden); },
    /* 某文件夹下的所有文件（按注册顺序） */
    filesInFolder(folderId){
      const f = folders[folderId];
      return f ? f.files.map(id=>files[id]).filter(Boolean) : [];
    },
    /* 章末课后练习映射：教材章号 → 习题章
       教材文件用 quizFiles: ['quiz-ds-a','quiz-ds-b'] 声明数据源；
       各习题文件用 quizFor: { book:'ds', fromNum:1 } 声明自己覆盖教材的第几章起 */
    quizChapterFor(bookId, num){
      const all = this.quizChaptersFor(bookId, num);
      return all.length ? all[0] : null;
    },
    /* 同一教材章可能有多个习题文件覆盖（如马原的单选 + 多选）：返回全部命中的习题章 */
    quizChaptersFor(bookId, num){
      const target = files[bookId];
      if(!target || !target.quizFiles) return [];
      const out = [];
      for(const qid of target.quizFiles){
        const qf = files[qid];
        if(!qf || !qf.quizFor || qf.quizFor.book !== bookId) continue;
        const idx = num - (qf.quizFor.fromNum||1);
        if(idx >= 0 && idx < (qf.chapters||[]).length) out.push(qf.chapters[idx]);
      }
      return out;
    },
    /* 判断激活文件是否属于某文件夹（含其子孙文件夹） */
    folderContainsActive(folderId){
      const f = this.getActiveFile();
      if(!f) return false;
      let cur = f.folder;
      while(cur){
        if(cur === folderId) return true;
        const fo = folders[cur];
        cur = fo ? fo.parent : null;
      }
      return false;
    },
    /* 某文件夹的完整祖先链（从根到它自身），用于面包屑路径 */
    folderAncestors(folderId){
      const chain = [];
      let cur = folderId;
      while(cur){
        chain.unshift(cur);
        const fo = folders[cur];
        cur = fo ? fo.parent : null;
      }
      return chain;
    },

    /* ---- 状态 ---- */
    state,
    setActiveFile(id){ state.activeFile = id; },
    setActiveChapter(id){ state.activeChapter = id; },
    setActiveBlock(id){ state.activeBlock = id; },
    getActiveFile(){ return files[state.activeFile] || null; },

    /* ---- 全库搜索数据源（hidden 文件如章末习题不入搜索，避免跳到脱离上下文的孤岛） ---- */
    allBlocks(){
      const out = [];
      this.listFiles().forEach(file=>{
        if(file.hidden) return;
        (file.chapters||[]).forEach(ch=>{
          (ch.blocks||[]).forEach((b,bi)=>{
            out.push({ file, chapter:ch, block:b, index:bi });
          });
        });
      });
      return out;
    },
    /* 块 id → 块数据（含 hidden 习题文件；quiz 模式切换重渲染时找回数据用） */
    blockById(id){
      for(const file of this.listFiles()){
        for(const ch of (file.chapters||[])){
          for(const b of (ch.blocks||[])){
            if(b.id === id) return b;
          }
        }
      }
      return null;
    }
  };
})();
