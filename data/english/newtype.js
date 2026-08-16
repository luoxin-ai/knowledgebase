/* ================================================================
 * data/english/newtype.js —— 新题型专项（考研英语一）
 * ----------------------------------------------------------------
 * ch1 三种题型介绍：七选五 / 排序题 / 小标题题 + 方法论 + 七选五典型例题 2 空
 * ch2 例题演练 7 题：衔接句、排序、小标题综合训练
 * qid 前缀 en-nt-，answer 小写，explain 以「故选 X。」结尾
 * ================================================================ */
KB.register({
  id: 'newtype',
  folder: 'english',
  type: 'book',
  title: '新题型专项',
  source: '考研英语一专项训练',
  updated: '2026-08',
  chapters: [
    /* ==================== 第 1 章 三种题型介绍 ==================== */
    {
      id: 'ch1', num: 1, title: '三种题型解读与方法', titleEn: 'New Type Intro',
      summary: '七选五、排序、小标题的题型特点与解题方法。',
      blocks: [
        { type: 'concept', title: '题型概览与考情',
          exam: { freq: '高频', forms: ['七选五', '排序题', '小标题题'], score: '10 分（5 空×2 分）' },
          points: [
            '新题型英语一共 10 分，5 空，每空 2 分，2010 年起三种题型轮流出题。',
            '七选五：从 7 个候选项中选 5 个填入原文空缺处，考查语篇衔接。',
            '排序题：打乱段落顺序，考生按篇章逻辑重新排列，考查篇章结构。',
            '小标题题：从 7 个标题中为 5 个段落选配主旨，考查概括能力。'
          ],
          summary: '三种题型形式不同，但核心一致——都在考「段与段、句与句如何衔接成篇」。',
          details: [
            { h: '七选五', body: '正确项常靠代词指代、转折/因果信号词、词汇复现与前后的语义呼应来确定位置。' },
            { h: '排序题', body: '关键看每段首句能否承接上段尾句，段尾句能否引出下段首句，串成一条逻辑链。' },
            { h: '小标题题', body: '标题是对段落主旨的高度浓缩，正确标题的关键词通常能在段落中找到同义替换。' }
          ]
        },
        { type: 'keypoint', title: '解题方法论：四类线索',
          exam: { freq: '高频', forms: ['七选五', '排序题', '小标题题'], score: '10 分' },
          points: [
            '七选五三步：先通读全文与选项、圈出各选项关键词，再回填空格，最后代入全文复核。',
            '代词线索：选项含 it/they/this/that/such 等代词时，空前必须有可指代对象，否则必错。',
            '逻辑线索：however/but 表转折，therefore/as a result 表因果，for example 表举例，信号词直接锁定空位。',
            '复现线索：==同词复现、同义替换、反义对比==是七选五最重要的判断依据。',
            '排序题技巧：逐段读首尾句，找「上段尾 → 下段头」的衔接词；含指代词或转折词的段落不可能是首段。',
            '小标题题技巧：定位段落主旨句（多为首句或末句），提炼关键词，再与标题做同义匹配。'
          ],
          summary: '新题型核心四线索：代词指代、逻辑信号词、词汇复现、首尾衔接。',
          details: [
            { h: '七选五的选项位置', body: '段首空（总起或承上）、段中空（举例或解释）、段末空（总结或引出下文），不同位置要看不同的线索。' },
            { h: '排序题的首段排除', body: '段首含 this/that/such/so 等指代词，或 however/therefore 等衔接词的段落，几乎不可能是首段。' },
            { h: '小标题的排除法', body: '只概括段落局部细节、或概括范围超出本段的标题优先排除；正解往往是段落主语的同义表达。' }
          ]
        },
        { type: 'quiz', title: '典型例题：七选五（2 空）',
          exam: { freq: '高频', forms: ['七选五'], score: '10 分' },
          summary: '短文语境挖两空，训练「举例衔接」与「递进铺垫」两类线索。',
          questions: [
            { qid: 'en-nt-1', stem: '短文语境：\nUrban green spaces do far more than beautify a city. 1______. Moreover, studies show that regular access to parks reduces stress and encourages physical activity.\n\n请选出最适合填入 1______ 处的一句。',
              options: ['Trees and lawns, for example, can lower summer temperatures by several degrees.', 'However, many cities suffer from a shortage of affordable housing.', 'Public transportation remains a key factor in urban development.', 'Few residents actually visit parks on a regular basis.'],
              answer: 'a',
              explain: '解析:空处承接首句「绿色空间的作用远不止美化城市」，需具体展开其功能。A 以 for example 举例说明树木草坪能降温，是典型的「举例衔接」，故选 A。B 话题跳到住房问题，脱离上下文；C 讲公共交通，与公园主题无关；D 说居民很少逛公园，与全文正面立场相悖。' },
            { qid: 'en-nt-2', stem: '短文语境：\nUrban green spaces do far more than beautify a city. Moreover, studies show that regular access to parks reduces stress and encourages physical activity. 2______. City planners, therefore, are increasingly treating green spaces as essential infrastructure rather than decoration.\n\n请选出最适合填入 2______ 处的一句。',
              options: ['The economic benefits are equally striking, as property values rise near parks.', 'By contrast, indoor exercise has little effect on mental health.', 'Suburban life, however, appeals to many young families.', 'Air pollution, unfortunately, remains a serious problem in most cities.'],
              answer: 'a',
              explain: '解析:空处位于段末，前面已列环境与健康两方面收益，空后 therefore 引出「被视为基础设施」的结论，空处应补充另一维度的收益以形成==递进==。A 补充经济效益（as 引导从句说明原因），与结论衔接最紧，故选 A。B 用 by contrast 却无对照对象；C 话题转向郊区生活，与结论无关；D 谈空气污染，与全文正面立场相反。' }
          ]
        }
      ]
    },

    /* ==================== 第 2 章 例题演练 ==================== */
    {
      id: 'ch2', num: 2, title: '进阶技巧与真题演练', titleEn: 'Advanced',
      summary: '衔接句、排序、小标题的专项演练。',
      blocks: [
        { type: 'concept', title: '实战要点回顾',
          exam: { freq: '高频', forms: ['七选五', '排序题', '小标题题'], score: '10 分' },
          points: [
            '七选五：先标选项关键词（名词、代词、逻辑词），再回填。',
            '排序题：按「首尾句衔接」找链条，遇两难时先排能确定的段落。',
            '小标题：找段首或段末主旨句，做关键词同义匹配。'
          ],
          summary: '实战时先易后难：先填能确定位置的选项，逐步缩小候选范围。',
          details: [
            { h: '真题时间分配', body: '新题型建议 15-20 分钟内完成，为阅读与写作留足时间。' }
          ]
        },
        { type: 'quiz', title: '例题演练 7 题',
          exam: { freq: '高频', forms: ['七选五', '排序题', '小标题题'], score: '10 分' },
          summary: '七选五 3 题、排序题 2 题、小标题 2 题，综合训练四类衔接线索。',
          questions: [
            { qid: 'en-nt-3', stem: '短文语境：\nOnline learning has grown rapidly in recent years. ______. For this reason, many universities now offer both online and offline courses.\n\n请选出最适合填入 ______ 处的一句。',
              options: ['However, students still prefer traditional classrooms.', 'It allows learners to study at their own pace and location.', 'Teachers are generally reluctant to adopt new technology.', 'The cost of higher education has risen sharply over the past decade.'],
              answer: 'b',
              explain: '解析:空前说线上学习快速发展，空后用 For this reason 引出「许多大学同时提供线上线下课程」的结果，空处应给出线上学习受欢迎的**原因**——它让学习者自由安排时间地点，故选 B。A 说学生仍偏好传统课堂，与结果句矛盾；C 说教师不情愿用新技术，与「发展迅速」矛盾；D 谈学费上涨，与上下文无关。' },
            { qid: 'en-nt-4', stem: '短文语境：\nThe brain is remarkably adaptable, a quality scientists call neuroplasticity. ______. Studies show that taxi drivers develop larger areas of the brain associated with navigation.\n\n请选出最适合填入 ______ 处的一句。',
              options: ['It enables the brain to reorganize itself throughout life.', 'Neuroplasticity is limited to the early years of childhood.', 'Navigation skills are rarely improved by daily practice.', 'The brain stops changing once a person reaches adulthood.'],
              answer: 'a',
              explain: '解析:空前定义 neuroplasticity，空后以出租车司机大脑为例佐证，空处应承上说明这一特质的运作方式——It 指代 neuroplasticity，解释其「终生自我重组」的特性，故选 A。B 说塑性仅限于童年，与后文司机成年后大脑变化的例子矛盾；C 说导航技能难通过练习提高，与例子相反；D 说成年后大脑停止变化，与 neuroplasticity 的定义及例子均冲突。' },
            { qid: 'en-nt-5', stem: '短文语境：\nMany believe that remote work boosts productivity by eliminating commuting. ______. In fact, some employees report feeling isolated and less motivated at home.\n\n请选出最适合填入 ______ 处的一句。',
              options: ['This assumption, however, may not hold for everyone.', 'Consequently, office attendance has dropped sharply.', 'Commuting, after all, offers a useful transition time.', 'Therefore, companies should abandon remote work entirely.'],
              answer: 'a',
              explain: '解析:空前是普遍看法（远程办公提升效率），空后用 In fact 引出相反事实（员工感到孤立），空处应表转折——This assumption 指代前文看法，however 提示转折，故选 A。B consequently 表因果，与前文方向一致而非转折；C after all 虽提到通勤，但语义是「毕竟通勤有益」，无法衔接 In fact 后的反面事实；D therefore 引出结论，但「完全放弃远程办公」语气过强且无依据。' },
            { qid: 'en-nt-6', stem: '以下段落已被打乱顺序，哪一段【最不可能】是全文首段？',
              options: ['The nineteenth century witnessed the birth of the modern research university.', 'This system of knowledge classification later spread to Asia and Latin America.', 'In the early 1800s, German universities began to emphasize original research.', 'By 1900, scientific journals had become the main channel for publishing findings.'],
              answer: 'b',
              explain: '解析:首段通常客观引出话题。B 段首出现指代词 This system 与时间副词 later，说明它必须承接上文——上文需先介绍 this system 所指为何，故不可能作首段，故选 B。其余选项均为客观叙述的开端式表达，可以充当首段；A、C、D 从时间词（nineteenth century / early 1800s / 1900）看也符合文章起笔惯例。' },
            { qid: 'en-nt-7', stem: '某段段尾句是：The committee, however, failed to reach an agreement on the budget. 下列哪句最可能是下一段的开头？',
              options: ['The meeting was chaired by Professor Li, who had drafted the proposal.', 'As a result, the project had to be postponed until the following year.', 'Nevertheless, the team celebrated the completion of the first phase.', 'In 2015, the university launched a brand-new campus building project.'],
              answer: 'b',
              explain: '解析:上段尾说「委员会未就预算达成一致」，下段应顺承这一结果——As a result（因此）引出「项目被迫推迟」，==因果衔接==最紧密，故选 B。A 倒叙会议主持情况，与「未达成一致」的结尾无承接；C nevertheless 表转折，与「未达成一致」的结果矛盾；D 突然转入 2015 年新项目，话题断裂。' },
            { qid: 'en-nt-8', stem: '为下列段落选择最合适的小标题：\nCompanies that ignore online reviews often lose customers. By contrast, those that respond to negative feedback quickly tend to win back trust. In this sense, digital reputation has become a decisive factor in business success.',
              options: ['How to Write Effective Online Reviews', 'The Growing Power of Digital Reputation', 'The History of Customer Service', 'Why Small Businesses Fail Online'],
              answer: 'b',
              explain: '解析:段落主旨落在末句 In this sense...digital reputation has become a decisive factor in business success（数字口碑已成决定成败的因素），与标题 B「数字口碑的力量日益增强」同义对应，故选 B。A 讲如何撰写评论，是手段而非主旨；C 谈顾客服务史，段落未提历史；D 只覆盖忽视差评的企业这一局部，且「中小企业」是段落没有的信息。' },
            { qid: 'en-nt-9', stem: '为下列段落选择最合适的小标题：\nSleeping less than six hours a night is associated with a higher risk of heart disease. Regular exercise and a balanced diet, however, can partly offset the damage. Doctors therefore advise patients to treat rest as seriously as work.',
              options: ['The Economic Cost of Insomnia', 'How Exercise Builds Muscle', 'Treating Sleep as a Health Priority', 'The Latest Fashion in Dieting'],
              answer: 'c',
              explain: '解析:段落从睡眠不足的危害讲到医生的建议「像对待工作一样认真对待休息」，主旨即「把睡眠当作健康头等大事」，故选 C。A 谈失眠的经济成本，段落未涉及经济；B 谈运动增肌，段落重点在睡眠；D 谈节食时尚，段落建议的是「运动 + 均衡饮食 + 睡眠」整体，且无时尚含义。' }
          ]
        }
      ]
    }
  ]
});
