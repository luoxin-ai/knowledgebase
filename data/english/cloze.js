/* ================================================================
 * data/english/cloze.js —— 完形填空专项（考研英语一）
 * ----------------------------------------------------------------
 * ch1 题型解读与解题步骤：题型特点 + 四步定位法 + 简化真题语段 5 空
 * ch2 进阶技巧与例题演练：9 道单句 / 短语境题
 * qid 前缀 en-cl-，answer 小写，explain 以「故选 X。」结尾
 * ================================================================ */
KB.register({
  id: 'cloze',
  folder: 'english',
  type: 'book',
  title: '完形填空专项',
  source: '考研英语一专项训练',
  updated: '2026-08',
  chapters: [
    /* ==================== 第 1 章 题型解读与解题步骤 ==================== */
    {
      id: 'ch1', num: 1, title: '完形填空题型解读', titleEn: 'Cloze Intro',
      summary: '题型特点、解题步骤。',
      blocks: [
        { type: 'concept', title: '题型特点与考情',
          exam: { freq: '高频', forms: ['完形填空'], score: '10 分（20 题×0.5）' },
          points: [
            '英语一完形填空共 20 空，每空 0.5 分，总计 10 分，位于试卷第一部分。',
            '文章长约 240-280 词，多为社会、科普、文化类议论文或说明文，改编自英美报刊。',
            '首句与段首句一般不设空，往往是全文或段落的主题句，是解题的钥匙。',
            '考点三分天下：逻辑关系（约 30%）、实词词义辨析（约 45%）、固定搭配与语篇衔接（约 25%）。'
          ],
          summary: '完形填空考查的是「在语篇中准确用词」，本质是语篇理解与词汇功底的结合。',
          details: [
            { h: '体裁与题材', body: '以议论文、说明文为主，常涉及科技、教育、心理、经济等话题，与阅读理解题材高度重合。' },
            { h: '首句价值', body: '首句通常完整呈现且不挖空，它交代了文章的话题、背景与作者态度，**必须精读**。' },
            { h: '命题偏好', body: '逻辑关系词（however/therefore/although 等）与实词（动词、名词、形容词）辨析是两大命题重点。' }
          ]
        },
        { type: 'keypoint', title: '解题方法论：四步定位法',
          exam: { freq: '高频', forms: ['完形填空'], score: '10 分' },
          points: [
            '第一步「通读首句抓主旨」：先读首句乃至首段，明确话题、体裁与作者倾向，带着主线做题。',
            '第二步「瞻前顾后找逻辑」：观察空前后的信号词——however/but 表转折，therefore/hence 表因果，although/while 表让步，and/in addition 表并列递进。',
            '第三步「词汇复现与搭配」：优先找同词复现、同义复现、反义复现，以及固定搭配，可直接锁定答案。',
            '第四步「代入通读复核」：全部选完后快速回读全文，确认语篇连贯、逻辑自洽。'
          ],
          summary: '完形四步法：通读定主旨 → 找逻辑 → 看复现搭配 → 代入复核。',
          details: [
            { h: '逻辑关系词', body: 'however 表转折、therefore 表因果、although 表让步、in addition 表递进、for example 表举例。注意 unlike、instead、rather than 等隐性转折信号。' },
            { h: '词汇复现', body: '同词复现（原词再次出现）、同义复现（近义词替换）、反义复现（反义词对比），三者合称完形的==复现三线==。' },
            { h: '固定搭配', body: '如 take...into account、be confronted with、as a result of、give rise to 等，平时积累，考场见到搭配即优先锁定。' }
          ]
        },
        { type: 'quiz', title: '典型例题：真题语段简化（5 空）',
          exam: { freq: '高频', forms: ['完形填空'], score: '10 分' },
          summary: '将真题 20 空压缩为 5 空，保留逻辑关系词与词汇复现两条主线。',
          questions: [
            { qid: 'en-cl-1', stem: '短文语境（每空对应一处）：\nSocial media has transformed the way people communicate. Users are now rewarded for quick reactions, which has 1______ a culture of instant response. Research suggests that constant interruptions weaken our capacity to focus on complex problems.\n\n1______ 处应选',
              options: ['given rise to', 'given way to', 'taken charge of', 'put up with'],
              answer: 'a',
              explain: '解析:give rise to 意为「引起、导致」，a culture of instant response 是「快速反应」带来的结果，语义契合，故选 A。B give way to 是「让位于」，方向相反；C taken charge of「掌管」主语应是机构或个人，此处主语 which 指代前句整件事，不搭配；D put up with「忍受」与产生某种文化的语境无关。' },
            { qid: 'en-cl-2', stem: '短文语境（每空对应一处）：\nResearch suggests that constant interruptions weaken our capacity to 2______ on complex problems. Meanwhile, the fear of missing out, commonly known as FOMO, keeps people checking their phones endlessly.\n\n2______ 处应选',
              options: ['depend', 'focus', 'count', 'rely'],
              answer: 'b',
              explain: '解析:capacity to focus on 意为「专注于……的能力」，与 constant interruptions（不断被打断）构成反义照应——打断削弱专注力，故选 B。四个选项都可接 on，但 depend/count/rely on 均表示「依赖、依靠」，与 capacity 搭配语义不通；且后文 checking their phones 正是注意力涣散的体现，focus 最贴切。' },
            { qid: 'en-cl-3', stem: '短文语境（每空对应一处）：\nMeanwhile, the fear of missing out, 3______ known as FOMO, keeps people checking their phones endlessly. However, psychologists point out that such anxiety is not unavoidable.\n\n3______ 处应选',
              options: ['formally', 'commonly', 'barely', 'recently'],
              answer: 'b',
              explain: '解析:commonly known as 是高频搭配「通常被称为」，FOMO 是「错失恐惧症」这一心理现象的通称，故选 B。A formally「正式地」与 fear of missing out 这种日常心理现象的称呼语境不符；C barely「几乎不」与 known as 组合语义矛盾；D recently「最近地」表示时间，与 known as（静态称呼）不搭配。' },
            { qid: 'en-cl-4', stem: '短文语境（每空对应一处）：\nHowever, psychologists 4______ out that such anxiety is not unavoidable; regular breaks from screens can help restore attention. As one expert puts it, the key is to strike a balance between staying connected and staying focused.\n\n4______ 处应选',
              options: ['point', 'carry', 'turn', 'figure'],
              answer: 'a',
              explain: '解析:point out 意为「指出」，后接 that 宾语从句表示专家学者的观点陈述，且 However 表转折——上段说焦虑不可避免，此处心理学家「指出」并非如此，故选 A。B carry out「执行」后接 plan/task，不接 that 从句表观点；C turn out「结果是」后接 that 从句时主语应为 it 或事件，此处主语是 psychologists；D figure out「弄清楚」通常接 how/what 疑问成分，与 that 从句搭配不符。' },
            { qid: 'en-cl-5', stem: '短文语境（每空对应一处）：\nAs one expert puts it, the key is to 5______ a balance between staying connected and staying focused.\n\n5______ 处应选',
              options: ['strike', 'hit', 'beat', 'knock'],
              answer: 'a',
              explain: '解析:strike a balance 是==固定搭配==「达成平衡」，尤其指在两种相反需求之间取得均衡，与 between staying connected and staying focused（保持连接与保持专注之间）完美契合，故选 A。B hit、C beat、D knock 虽都有「打、击」义，但均不能与 a balance 构成固定搭配，属于形近义异干扰项。' }
          ]
        }
      ]
    },

    /* ==================== 第 2 章 进阶技巧与例题演练 ==================== */
    {
      id: 'ch2', num: 2, title: '进阶技巧与真题演练', titleEn: 'Advanced',
      summary: '逻辑关系词、搭配与语篇衔接的专项演练。',
      blocks: [
        { type: 'concept', title: '进阶解题意识',
          exam: { freq: '高频', forms: ['完形填空'], score: '10 分' },
          points: [
            '把每个空都放进「句内逻辑 → 句间逻辑 → 段间逻辑」三个层级去判断。',
            '动词题看主语与宾语：who does what to whom，谁对谁做什么。',
            '名词题看上下文的修饰与复现，警惕形近但义异的选项。'
          ],
          summary: '进阶关键：由「单句选词」升级为「语篇定位」。',
          details: [
            { h: '词义辨析要领', body: '区分近义词时抓核心语义差别，如 meet 强调「满足（标准/需求）」、reach 强调「达到（目标/共识）」、attain 强调「获得（成就）」，再结合宾语判断。' },
            { h: '语篇衔接要领', body: '关注空前后的代词指代与过渡句，正确答案往往「藏」在上文或下文里，不脱离语篇单独看空。' }
          ]
        },
        { type: 'quiz', title: '例题演练 9 题',
          exam: { freq: '高频', forms: ['完形填空'], score: '10 分' },
          summary: '每题给出单句或短语境，综合考查逻辑关系、词义辨析与固定搭配。',
          questions: [
            { qid: 'en-cl-6', stem: 'Many people assume that automation will destroy jobs. ______, history shows that new technologies tend to create new kinds of work.',
              options: ['Therefore', 'However', 'Moreover', 'Similarly'],
              answer: 'b',
              explain: '解析:空前说「摧毁工作」，空后说「创造新工作」，语义相反，应填转折词 however，故选 B。A therefore 表因果，前后应构成因果而非对立；C moreover 表递进，用于补充支持；D similarly 表类比，均与「相反」的语义关系不符。' },
            { qid: 'en-cl-7', stem: 'The team repeated the experiment three times to ensure the results were reliable. ______, the findings were accepted by the scientific community.',
              options: ['Meanwhile', 'Nevertheless', 'Consequently', 'Otherwise'],
              answer: 'c',
              explain: '解析:空前是「为确保结果可靠而重复实验」，空后是「结论被科学界接受」，前因后果，填 consequently（因此），故选 C。A meanwhile 表同时进行，两件事非并列发生；B nevertheless 表转折，此处无对立；D otherwise 表「否则」，表示条件不满足时的相反结果，均不构成因果关系。' },
            { qid: 'en-cl-8', stem: '______ the project was highly ambitious, the engineers managed to complete it ahead of schedule.',
              options: ['Although', 'Because', 'Unless', 'Since'],
              answer: 'a',
              explain: '解析:前半句说「项目非常宏大」，后半句说「提前完成」，构成让步关系——尽管宏大，还是完成了，故选 A。B because 与 D since 表因果，宏大不是提前完成的原因；C unless 表条件「除非」，语义不通。' },
            { qid: 'en-cl-9', stem: 'The new regulation requires all factories to ______ strict emission standards within two years.',
              options: ['meet', 'break', 'set', 'limit'],
              answer: 'a',
              explain: '解析:meet standards 为固定搭配「符合、达到标准」，与 strict emission standards（严格的排放标准）搭配，故选 A。B break 多接 rules/law（违反规定），break standards 搭配不通；C set standards 是「制定标准」，但此处主语是工厂、宾语是既定标准，且法律要求工厂是「执行」而非「制定」；D limit 无 limit standards 搭配。' },
            { qid: 'en-cl-10', stem: 'When writing an academic paper, you should take your readers\' background into ______.',
              options: ['account', 'mind', 'thought', 'note'],
              answer: 'a',
              explain: '解析:take...into account 为==固定搭配==「把……考虑进去」，与你应把读者背景考虑进来语义契合，故选 A。B take...into mind 无此搭配，mind 常见于 keep...in mind（记在心里）；C take...into thought 不是固定搭配；D 常见表达是 take note of「注意到」，介词不接 into。' },
            { qid: 'en-cl-11', stem: 'The government has invested heavily in public libraries. These ______ have made reading more accessible to rural residents.',
              options: ['investments', 'expenses', 'arrangements', 'statements'],
              answer: 'a',
              explain: '解析:前句出现 invested，后句 These ______ 用==同词复现==指代前句的投入，故选 A investments。B expenses「开支」偏消极且与 invest 不构成词根复现；C arrangements「安排」、D statements「声明」均与上文的 invested 无复现关系，属于脱离语篇的干扰项。' },
            { qid: 'en-cl-12', stem: 'Unlike his conservative colleagues, who prefer familiar methods, the young researcher is ______ enough to try unconventional approaches.',
              options: ['bold', 'polite', 'nervous', 'greedy'],
              answer: 'a',
              explain: '解析:Unlike 引出==反义对照==，前半说老同事保守、偏好熟悉方法，空处应与「保守」相反，bold（大胆的）与后文的尝试非常规方法完美契合，故选 A。B polite「礼貌的」与保守与否无关；C nervous「紧张的」与勇于尝试相悖；D greedy「贪婪的」语义明显不符。' },
            { qid: 'en-cl-13', stem: 'Residents who walk or cycle to work report lower stress and better sleep, suggesting that ______ exercise is enough to benefit mental health.',
              options: ['moderate', 'severe', 'temporary', 'occasional'],
              answer: 'a',
              explain: '解析:步行、骑车属于适度的有氧运动，moderate（适度的）与通勤场景最契合，故选 A。B severe「剧烈的、严重的」与 walking 相悖；C temporary「临时的」修饰 exercise 不合理；D occasional「偶尔的」与文中 who walk or cycle to work 暗示的规律性矛盾——若只是偶尔运动，难言「足以受益」。' },
            { qid: 'en-cl-14', stem: 'The exhibition attracted record numbers of visitors, greatly ______ the organizers\' expectations.',
              options: ['exceeding', 'declining', 'approaching', 'measuring'],
              answer: 'a',
              explain: '解析:空前说「参观人数创纪录」，创纪录意味着超出预期，exceed expectations 为==高频搭配==「超出预期」，故选 A。B declining「下降」与 record numbers（创纪录）矛盾；C approaching「接近」力度不足，创纪录应超出而非接近；D measuring「测量」语义不通。' }
          ]
        }
      ]
    }
  ]
});
