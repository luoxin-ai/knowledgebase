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
      if(file.folder){
        if(!folders[file.folder]) this.defineFolder({ id:file.folder, title:file.folder });
        if(folders[file.folder].files.indexOf(file.id) < 0) folders[file.folder].files.push(file.id);
      }
      return file;
    },
    getFile(id){ return files[id]; },
    listFiles(){ return Object.values(files); },
    /* 某文件夹下的所有文件（按注册顺序） */
    filesInFolder(folderId){
      const f = folders[folderId];
      return f ? f.files.map(id=>files[id]).filter(Boolean) : [];
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

    /* ---- 全库搜索数据源 ---- */
    allBlocks(){
      const out = [];
      this.listFiles().forEach(file=>{
        (file.chapters||[]).forEach(ch=>{
          (ch.blocks||[]).forEach((b,bi)=>{
            out.push({ file, chapter:ch, block:b, index:bi });
          });
        });
      });
      return out;
    }
  };
})();
