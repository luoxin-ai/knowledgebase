/* ================================================================
 * data/english/writing.js —— 作文模板与范文（考研英语一 · 写作）
 * ----------------------------------------------------------------
 * 结构：ch1 小作文（应用文模板 + 范文）
 *       ch2 大作文（图画作文框架 + 话题素材 + 替换表 + 避坑 + 范文）
 * 模板句中的填空位统一用 ____ 表示，写作时替换为主题词/对象词。
 * ================================================================ */
KB.register({
  id: 'writing',
  folder: 'english',
  type: 'book',
  title: '作文模板与范文',
  cover: '✍️',
  source: '考研英语一写作 · 自编模板体系',
  updated: '2026-08',
  chapters: [
    /* ==================== 第 1 章 小作文（应用文） ==================== */
    {
      id: 'ch1', num: 1, title: '小作文（应用文）', titleEn: 'Practical Writing',
      summary: '建议信 / 感谢信 / 邀请信 / 道歉信 / 推荐信 / 通知告示六类模板 + 三段通用框架 + 范文 2 篇。',
      blocks: [
        { type: 'keypoint', title: '小作文通用三段框架',
          exam: { freq: '必考', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '格式三件套：==称呼（Dear Sir or Madam / Dear Mr. ____）+ 正文 + 落款（Yours sincerely, Li Ming）==',
            '第一段（1 句）：自我介绍 / 写信目的 —— I am writing to ____',
            '第二段（2~3 句）：展开要点（理由 / 细节 / 安排），用 First / Moreover / Finally 串联',
            '第三段（1~2 句）：礼貌收尾 —— 致谢 / 期待回复 / 表达愿望'
          ],
          summary: '小作文得分核心是==格式正确 + 目的明确 + 要点覆盖==，10 分中语言占 6.5、格式与内容占 3.5。',
          details: [
            { h: '第一段：开门见山', body: 'I am Li Ming, ____. I am writing this letter to ____ (express my gratitude / extend my sincere invitation / offer my suggestions regarding ____). [[口诀]] 目的句 I am writing to 一把梭，自我介绍看身份。' },
            { h: '第二段：要点展开', body: '万能串联词：To begin with, ____. Moreover, ____. Finally, ____. 每个要点 1~2 句即可，切忌堆砌。若题目给两个要点（如建议信「提出建议 + 说明理由」），必须==全部覆盖==，漏点是硬伤。' },
            { h: '第三段：礼貌收尾', body: '感谢：Thank you for your time and consideration. 期待回复：I am looking forward to your reply at your earliest convenience. 愿望：I would appreciate it if you could take my suggestions into account.' },
            { h: '格式警示', body: '[[警示]] 称呼后用逗号不用冒号；落款 Yours sincerely（收信人姓名不明时）或 Yours truly；签名必须写 Li Ming，==不得写自己真实姓名==；通知告示不用信件格式，用标题 + 日期 + 正文 + 署名。' }
          ]
        },

        { type: 'concept', title: '建议信（Letter of Suggestions）',
          exam: { freq: '高频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '语境：向个人 / 机构就某事提出改进建议（图书馆服务、社团活动、城市治理等）',
            '语气：==礼貌但坚定==，用 would / could / might 委婉表达',
            '必备句：目的句 + 建议句（I would suggest that...）+ 理由句'
          ],
          summary: '建议信 = 表明目的 → 分条给建议（附理由）→ 期待采纳，是最常考的小作文类型。',
          details: [
            { h: '开头目的句', body: 'I am writing to offer several practical suggestions regarding ____ (how to improve the service of our university library).' },
            { h: '正文建议句式', body: '① First and foremost, it would be beneficial to ____, because ____. ② Moreover, I would suggest that ____ (should) be ____, which would ____. ③ Finally, might it be possible to ____? This would not only ____ but also ____.' },
            { h: '结尾句', body: 'I hope you will find these suggestions constructive. Thank you for your attention, and I am looking forward to seeing positive changes in the near future.' },
            { h: '高频场景词', body: 'improve the efficiency of ____（提高效率）；take ... into consideration（考虑）；implement these proposals（落实建议）；feasible and cost-effective（可行且划算）。' }
          ]
        },

        { type: 'concept', title: '感谢信（Letter of Thanks）',
          exam: { freq: '高频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '语境：感谢他人的帮助 / 款待 / 支持（帮助渡过难关、接待参观、协助完成项目）',
            '必备要素：==指明受谢事件 + 说明影响 + 表达回报意愿==',
            '时态：受谢事件用过去时，感激之情用现在时'
          ],
          summary: '感谢信三步走：说明写信缘由 → 具体感谢什么及带来的影响 → 再次致谢并表愿。',
          details: [
            { h: '开头目的句', body: 'I am writing to extend my heartfelt gratitude for your ____(kind assistance / generous help / warm reception) during ____.' },
            { h: '正文展开句式', body: '① But for your help, I would never have ____（虚拟语气是加分点）. ② It was incredibly kind of you to ____, which enabled me to ____. ③ Your ____(patience / encouragement / expertise) made all the difference when I ____.' },
            { h: '结尾句', body: 'My gratitude is beyond words. If there is anything I can do for you in return, please do not hesitate to let me know.' },
            { h: '高分替换', body: 'thank → express / convey / extend my (sincere) gratitude；help → assistance / support / favor；very much → immensely / enormously / beyond words。' }
          ]
        },

        { type: 'concept', title: '邀请信（Letter of Invitation）',
          exam: { freq: '高频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '语境：邀请外教 / 专家 / 朋友参加比赛、庆典、讲座、志愿活动',
            '必备要素：==活动时间地点 + 活动内容 + 对方的角色（评委 / 嘉宾 / 主讲人）==',
            '时态：活动安排用将来时（will / is scheduled to）'
          ],
          summary: '邀请信 = 说明活动 → 说明时间地点与对方职责 → 期待对方应允。',
          details: [
            { h: '开头目的句', body: 'On behalf of ____(the Students\' Union), I am writing to cordially invite you to ____(serve as a judge in our English Speech Contest).' },
            { h: '正文要素句式', body: '① The contest is scheduled to take place in ____(the auditorium) at 2:00 p.m. on June 20th. ② Given your profound knowledge and rich experience in ____, we believe your participation will ____. ③ Your responsibilities will include ____, and it would be our great honor if you could ____.' },
            { h: '结尾句', body: 'We would feel much honored if you could accept our invitation. Please feel free to contact us at ____ if you have any questions about the event.' },
            { h: '高分表达', body: 'cordially / sincerely invite（诚挚邀请）；it would be our great honor（我方不胜荣幸）；on behalf of（代表）；decline 时用 we regret to inform you that...。' }
          ]
        },

        { type: 'concept', title: '道歉信（Letter of Apology）',
          exam: { freq: '中频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '语境：未能赴约 / 损坏物品 / 未能履行承诺，向对方致歉',
            '必备要素：==道歉事由 + 解释原因（不推责）+ 补救方案==',
            '结构口诀：道歉 → 原因 → 弥补 → 再道歉'
          ],
          summary: '道歉信核心逻辑：为____道歉 → 原因是____ → 拟以____弥补 → 恳请谅解。',
          details: [
            { h: '开头道歉句', body: 'I am writing to express my sincere apology for ____(failing to attend your birthday party / not returning the book on time).' },
            { h: '正文解释句式', body: '① The reason for my absence was that ____, which was entirely beyond my control. ② I fully understand that my carelessness has caused you great inconvenience, for which I feel terribly sorry.' },
            { h: '补救与结尾', body: '① To make up for my oversight, I would like to ____(invite you to dinner this weekend). ② I assure you that such a mistake will never happen again. Once again, please accept my deepest apology.' },
            { h: '高分表达', body: 'apologize to sb. for sth.；make up for / compensate for（弥补）；inconvenience caused（造成的不便）；sincere / deepest apology（诚挚歉意）。[[警示]] 解释原因≠找借口，语气要担责，避免 It was not my fault。' }
          ]
        },

        { type: 'concept', title: '推荐信（Letter of Recommendation）',
          exam: { freq: '中频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '语境：推荐一本书 / 一部电影 / 一个旅游景点 / 一门课程给某人',
            '必备要素：==点明推荐对象 + 两条推荐理由（内容、价值、口碑）==',
            '可套用建议信结构，但重心在「推荐理由」'
          ],
          summary: '推荐信 = 我要推荐____ → 理由一是____、理由二是____ → 强烈建议你体验。',
          details: [
            { h: '开头目的句', body: 'I am writing to recommend to you ____(a thought-provoking book entitled ____), which I believe will appeal to you enormously.' },
            { h: '正文理由句式', body: '① To begin with, the book offers a penetrating insight into ____, which will broaden your horizons. ② What makes it particularly recommendable is that ____. ③ It has received rave reviews from readers worldwide since its publication.' },
            { h: '结尾句', body: 'I am confident that you will find it rewarding and enjoyable. Should you need more information, please do not hesitate to contact me.' },
            { h: '高分表达', body: 'thought-provoking（发人深省）；a penetrating insight into（深刻洞察）；broaden one\'s horizons（开阔眼界）；rewarding and enjoyable（有收获又愉悦）。' }
          ]
        },

        { type: 'concept', title: '通知告示（Notice / Announcement）',
          exam: { freq: '高频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '格式与信件==完全不同==：标题（NOTICE / NOTICE OF ____ 居中）+ 日期（右下）+ 正文 + 署名（右下，单位名）',
            '正文仍按三段：活动介绍 → 时间地点与要求 → 报名 / 参与方式',
            '语境：招募志愿者、通知会议 / 活动、寻找失物'
          ],
          summary: '告示类最容易因==格式错误==丢分：无称呼、无 Yours sincerely，落款写发布单位（the Students\' Union）而非 Li Ming（除非题目要求）。',
          details: [
            { h: '标题与开头', body: '标题：Volunteers Wanted / NOTICE。开头：An international conference on ____ is to be held in our university on June 20th, and volunteers are needed to provide services for the participants.' },
            { h: '正文要素句式', body: '① The responsibilities of the volunteers include ____(registering participants and offering guidance). ② Applicants are expected to ____(have a good command of English and strong communication skills).' },
            { h: '报名方式与结尾', body: 'Those who are interested please sign up at the office of the Students\' Union or email us at ____ before June 10th. Come and join us!' },
            { h: '格式对比', body: '[[警示]] 信件五要素：称呼、正文、结尾客套、署名、（题目要求时）日期；告示四要素：标题、日期、正文、发布者。两者落款位置都在右下，但告示==没有称呼和 Yours sincerely==。' }
          ]
        },

        { type: 'concept', title: '范文 A：建议信（2016 英语一小作文）',
          exam: { freq: '高频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '真题语境：毕业后给图书馆提改善服务建议',
            '学结构：两段建议各配一个理由',
            '学语言：委婉语气 + 细节具体'
          ],
          summary: '满分结构：目的句 → 建议 1（理由）→ 建议 2（理由）→ 期待采纳。',
          details: [
            { h: '全文（约 110 词）', body: 'Dear Sir or Madam,\n\nAs a senior student who has benefited enormously from the library during the past four years, I am writing to offer several suggestions regarding the improvement of its service.\n\nFirst and foremost, it would be advisable to prolong the opening hours during the examination weeks, since a large number of students can hardly find seats at present. Moreover, the university might consider installing self-service machines for borrowing and returning books, which would save students a considerable amount of time.\n\nI hope you will find these proposals practical. Thank you for your time, and I am looking forward to seeing positive changes in the near future.\n\nYours sincerely,\nLi Ming' },
            { h: '语言点', body: '① As a senior student who...（同位语+定语从句开头，交代身份）；② it would be advisable to...（委婉建议）；③ since / which 引导原因与结果，使建议「有理有据」。' }
          ]
        },

        { type: 'concept', title: '范文 B：通知告示（2016 英语一小作文变体）',
          exam: { freq: '高频', forms: ['写作（小作文）'], score: '小作文 10 分' },
          points: [
            '真题语境：图书馆通知志愿者招募',
            '学格式：标题 + 日期 + 正文 + 署名四件套',
            '学语言：被动语态 + 要素完整'
          ],
          summary: '告示范文要点：活动 → 职责 → 要求 → 报名方式，一段也可完成，但分小段更清晰。',
          details: [
            { h: '全文（约 100 词）', body: 'NOTICE\n\nJune 20, 2026\n\nVolunteers are wanted for the orientation program for freshmen, which is scheduled to take place at the beginning of the coming semester.\n\nThe responsibilities of the volunteers mainly include showing the new students around the campus and helping them get familiar with the library, the laboratories and other facilities. Applicants are expected to be patient, enthusiastic and good at communication. Prior experience in volunteer work is a plus but not a must.\n\nThose who are interested please sign up at the office of the Students\' Union before July 10th. Come and join us!\n\nThe Students\' Union' },
            { h: '格式点', body: '[[警示]] 标题 NOTICE 居中加粗；日期写在标题右下方；署名为单位 the Students\' Union，==不写 Yours sincerely==。' }
          ]
        }
      ]
    },

    /* ==================== 第 2 章 大作文（图画作文） ==================== */
    {
      id: 'ch2', num: 2, title: '大作文（图画作文）', titleEn: 'Essay Writing',
      summary: '图画作文三段万能框架 + 五大话题素材库 + 高分替换表 + 避坑指南 + 范文 2 篇。',
      blocks: [
        { type: 'keypoint', title: '图画作文三段式万能框架',
          exam: { freq: '必考', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '第一段 描述图画：整体概括 → 细节刻画 → 图注翻译，==客观描述不加评论==',
            '第二段 阐释寓意：点明主题 → 举例/说理论证 → 小结意义',
            '第三段 评论建议：亮明态度 → 给出建议 → 升华展望（个人/社会/政府三选二）',
            '词数 160~200 词，三段比例约 3 : 5 : 4 行'
          ],
          summary: '英语一大作文连续 20 余年考图画作文：描述 → 寓意 → 评论，[[口诀]] 一描二议三升华，图注点题是关键。',
          details: [
            { h: '第一段功能句（描述图画）', body: '① 整体概括：As is vividly depicted in the drawing/cartoon, ____(主体) is/are doing ____(动作). ② 细节刻画：On the left/right, ____. In contrast, ____. ③ 图注翻译：The caption reads / indicates, \"____\".' },
            { h: '第二段功能句（阐释寓意）', body: '① 点明主题：The cartoonist aims to convey the message that ____ is of great significance in our life. ② 说理论证：Without ____, we would fail to ____. / It is ____ that enables us to ____. ③ 举例论证：A case in point is ____. / Take ____ as an example: ____. ④ 小结：In short, ____ is the very quality that ____.' },
            { h: '第三段功能句（评论建议）', body: '① 态度：In my opinion, ____ deserves our serious attention. ② 建议：For one thing, we should ____; for another, relevant authorities are expected to ____. ③ 展望：Only in this way can we ____（倒装加分）. / I firmly believe that a brighter future is awaiting us if ____.' },
            { h: '时间分配', body: '审题列提纲 5 分钟 → 写作 25 分钟 → 检查 5 分钟。[[警示]] 图注（caption）是命题人给的主题提示，==照抄翻译即可点题==，切勿视而不见；字数下限 160 词，写不到比写超时更危险。' }
          ]
        },

        { type: 'concept', title: '话题一：个人品质类',
          exam: { freq: '高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '常见主题：坚持、自信、乐观、团队合作、奋斗精神、逆境成长',
            '论证抓手：名人例 + 反面对照 + 名言',
            '与「青年成长」结合是近年命题热点'
          ],
          summary: '个人品质是图画作文==第一高频话题==，母题：品质 → 成就人生 / 缺失 → 一事无成。',
          details: [
            { h: '主题词库', body: 'perseverance（坚持）；self-confidence（自信）；optimism（乐观）；team spirit（团队精神）；a strong will（坚强意志）；diligence（勤奋）；courage to face adversity（直面逆境的勇气）。' },
            { h: '万能论证句', body: '① It is perseverance that separates the winners from the losers（强调句）. ② History abounds with examples: Thomas Edison failed thousands of times before inventing the light bulb（名人事例）. ③ Conversely, those who give up halfway will accomplish nothing, however brilliant they may be（反面对照）.' },
            { h: '名言警句', body: 'Where there is a will, there is a way. / Genius is one percent inspiration and ninety-nine percent perspiration. / A journey of a thousand miles begins with a single step.' }
          ]
        },

        { type: 'concept', title: '话题二：社会热点类',
          exam: { freq: '高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '常见主题：网络文化（网红、流量）、诚信缺失、食品安全、养老与孝道、健康生活方式',
            '论证抓手：现象普遍性 → 危害 → 治理建议（政府+个人）',
            '第三段建议 = 政府 on the one hand + 个人 on the other hand'
          ],
          summary: '社会热点常以讽刺漫画出现：描绘不良现象 → 剖析危害根源 → 呼吁解决。',
          details: [
            { h: '主题词库', body: 'integrity / credibility（诚信）；money-worship（拜金）；online celebrities / influencers（网红）；click-bait（标题党）；food safety（食品安全）；filial piety（孝道）；a healthy lifestyle（健康生活方式）。' },
            { h: '现象描述句', body: '① In recent years, ____ has become increasingly common in our society. ② Hardly can we open a social media app without being flooded with ____（否定倒装，加分）。' },
            { h: '危害与治理句', body: '危害：Such practices will not only mislead the public but also undermine social trust. 治理：The authorities concerned should tighten supervision and enact stricter regulations; meanwhile, individuals must enhance their awareness of ____.' }
          ]
        },

        { type: 'concept', title: '话题三：文化传承与交流类',
          exam: { freq: '中高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '常见主题：传统文化保护、文化自信、中西文化交流、节日与文化认同',
            '论证抓手：文化是民族的根 → 交流互鉴 → 保护与传播并重',
            '高频比喻图：桥梁、火锅、地球村'
          ],
          summary: '文化类母题：==文化如桥梁==（沟通）或==文化如根==（传承），正反皆可命题。',
          details: [
            { h: '主题词库', body: 'traditional culture（传统文化）；cultural heritage（文化遗产）；cultural confidence（文化自信）；cultural exchange / mutual learning（文化交流互鉴）；cultural identity（文化认同）；cultural diversity（文化多样性）。' },
            { h: '万能论证句', body: '① Culture is to a nation what the soul is to a man（类比句，加分）. ② Only when a nation values its own culture can it win respect from others（倒装）. ③ Cultural exchange enables different civilizations to draw on each other\'s strengths, thereby promoting common prosperity.' },
            { h: '建议句', body: 'It is advisable to integrate traditional culture into school curricula, and the media should shoulder the responsibility of spreading it among the younger generation.' }
          ]
        },

        { type: 'concept', title: '话题四：教育学习类',
          exam: { freq: '高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '常见主题：读书的价值、终身学习、实践与理论、家庭教育、素质教育 vs 唯分数论',
            '论证抓手：教育的本质 → 现实偏差 → 理想路径',
            '高频对比图：书堆下的孩子 vs 阳光下的孩子'
          ],
          summary: '教育类母题：==读书塑人==（正面）或==应试压抑天性==（反面），与青年话题天然结合。',
          details: [
            { h: '主题词库', body: 'lifelong learning（终身学习）；quality-oriented education（素质教育）；exam-oriented education（应试教育）；practical ability（实践能力）；all-round development（全面发展）；innovation and critical thinking（创新与批判性思维）。' },
            { h: '万能论证句', body: '① Reading makes a full man（引用培根名言）. ② Education should aim at cultivating well-rounded individuals rather than mere test-takers. ③ Knowledge acquired from books remains lifeless until it is put into practice.' },
            { h: '建议句', body: 'Parents and schools alike are supposed to strike a balance between academic performance and personal growth, encouraging children to explore the world beyond textbooks.' }
          ]
        },

        { type: 'concept', title: '话题五：科技伦理类',
          exam: { freq: '高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '常见主题：AI 与就业、科技双刃剑、网络依赖 / 手机沉迷、隐私保护、人与科技的关系',
            '论证抓手：科技带来便利 → 同时带来问题 → 关键在于==如何使用==',
            '近年最热命题方向，须重点准备'
          ],
          summary: '科技类母题：==科技是双刃剑==——既描述其利，也剖析其弊，最后落在「人主导科技」。',
          details: [
            { h: '主题词库', body: 'artificial intelligence（人工智能）；a double-edged sword（双刃剑）；technological innovation（科技创新）；information overload（信息过载）；privacy infringement（隐私侵犯）；digital age / era（数字时代）；rational use of technology（理性使用科技）。' },
            { h: '万能论证句', body: '① While technology has brought us unprecedented convenience, it has also given rise to problems never seen before（对比结构）. ② Were we controlled by the very tools we created, the consequences would be unimaginable（虚拟语气，加分）. ③ What ultimately matters is not technology itself, but the way we employ it.' },
            { h: '建议句', body: 'Relevant regulations should be improved to keep pace with technological progress, and each individual should learn to maintain a healthy relationship with digital devices.' }
          ]
        },

        { type: 'table', title: '高分替换表（普通词 → 高分词）',
          exam: { freq: '必考', forms: ['写作（大作文 / 小作文）'], score: '大作文 20 分 / 小作文 10 分' },
          summary: '写作提分最快的途径：把口语化动词形容词换成学术化表达，全文替换 5~8 处即可。',
          headers: ['普通表达', '高分替换', '适用语境'],
          rows: [
            ['think / believe', 'argue / maintain / contend', '亮明观点'],
            ['important', 'vital / crucial / indispensable', '强调重要性'],
            ['very + adj.', 'extremely / remarkably / enormously + adj.', '程度加强'],
            ['good', 'beneficial / advantageous / rewarding', '说明益处'],
            ['bad', 'detrimental / adverse / unfavorable', '说明危害'],
            ['many / lots of', 'numerous / a multitude of / an increasing number of', '数量表达'],
            ['people', 'individuals / the public / citizens', '泛指人群'],
            ['now / nowadays', 'currently / at present / in this day and age', '时间状语'],
            ['more and more', 'an ever-growing number of / increasingly', '递增趋势'],
            ['solve', 'address / tackle / cope with', '解决问题'],
            ['show / indicate', 'demonstrate / reveal / illustrate', '图表与论证'],
            ['use', 'employ / utilize / take advantage of', '使用工具'],
            ['get', 'acquire / obtain / attain', '获得知识技能'],
            ['famous', 'renowned / distinguished / celebrated', '描述人物'],
            ['beautiful', 'appealing / picturesque / magnificent', '描述事物'],
            ['big problem', 'severe / pressing / thorny issue', '问题严重性'],
            ['help', 'assist / facilitate / contribute to', '帮助促进'],
            ['make sb. do', 'enable / allow / encourage sb. to do', '致使结构'],
            ['in my opinion', 'from my perspective / as far as I am concerned', '个人观点'],
            ['finally', 'ultimately / in the final analysis', '总结收尾']
          ],
          note: '[[警示]] 替换要==看语境==：facilitate 后接事物不接人；utilize 多指高效利用资源；contend 含「力主」之义，中性陈述慎用。',
          details: [
            { h: '使用策略', body: '每篇作文替换 5~8 处即可，通篇堆砌大词反而失真。优先替换高频动词与 important/good/bad 三个「万金油」，收效最明显。' }
          ]
        },

        { type: 'error', title: '作文避坑指南',
          exam: { freq: '必考', forms: ['写作（大作文 / 小作文）'], score: '大作文 20 分 / 小作文 10 分' },
          summary: '阅卷人 40 秒一篇：语法硬伤、模板痕迹、中式英语是==三大扣分区==。',
          mistakes: [
            { title: '语法硬伤（最致命）',
              wrong: '主谓不一致：The picture show us...；时态混乱：Last year he goes abroad；句子残缺：Because I like reading.（独立成句）',
              right: 'The picture shows us...；Last year he went abroad；单独成句必须含完整主谓：I like reading because it broadens my horizons.',
              why: '语法错误是阅卷「一票否决」区：一个主谓不一致就可能从一档降到二档。写完必留 3 分钟专查：==主谓一致、时态、单复数、冠词==四项。' },
            { title: '模板痕迹过重',
              wrong: '开头必写 With the development of society...；中间套 As we all know, every coin has two sides；通篇无一处与图画细节相关。',
              right: '模板句不超过全文 1/3，且必须与图画细节结合：As is depicted in the drawing, a young man is staring at his smartphone while ignoring his elderly parents beside him.',
              why: '阅卷人一天看数百篇雷同模板，==「无图画细节」直接判为套作==。正确做法：保留功能句骨架，血肉（主语、宾语、例子）全部取自画面。' },
            { title: '中式英语（Chinglish）',
              wrong: '逐字翻译：learn knowledge（学知识）；My English is poor（我英语差）；With the help of the Internet, we can know the world（知世界）；peasant worker（农民工）。',
              right: 'acquire / gain knowledge；My English is limited / I am not proficient in English；keep ourselves informed of what is happening around the world；migrant worker。',
              why: '中式英语暴露「汉译英」思维。积累地道搭配：==acquire knowledge、obtain information、heavy traffic、properly dressed==；不确定时用简单准确的词，胜过生硬直译。' }
          ]
        },

        { type: 'concept', title: '范文 C：大作文（图画作文 · 个人品质类）',
          exam: { freq: '高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '母题语境：两幅对比图——遇挫放弃者 vs 坚持登顶者',
            '学结构：描述 → 点题论证 → 建议，严格三段',
            '学语言：强调句 / 名人事例 / 倒装三件套齐用'
          ],
          summary: '高分范文骨架：概括图画 → 细节与图注 → 寓意+名人例 → 态度+建议+展望。',
          details: [
            { h: '第一段（描述图画）', body: 'As is vividly portrayed in the cartoon, two climbers are facing a steep mountain. The young man on the left, dripping with sweat, gives up halfway and turns back, whereas his companion on the right keeps climbing with determination. The caption at the bottom of the drawing reads: \"Only those who persevere can reach the summit.\"' },
            { h: '第二段（阐释寓意）', body: 'The cartoonist aims to convey the message that perseverance, though frequently mentioned, is truly the cornerstone of success. It is perseverance that separates the winners from the quitters: without it, even the most talented individuals will accomplish nothing. History abounds with such examples. Thomas Edison failed thousands of times before he finally invented the light bulb, and it was precisely his persistence that turned his ideas into reality.' },
            { h: '第三段（评论建议）', body: 'From my perspective, perseverance deserves the serious attention of every young person. For one thing, we should set realistic goals and stick to them even when setbacks occur; for another, schools are supposed to cultivate students\' willpower through challenging activities. Only in this way can we conquer the mountains in our own lives and embrace a promising future.' },
            { h: '亮点句型清单', body: '① whereas 对比连接；② It is...that... 强调句；③ History abounds with examples 万能举例；④ Only in this way can we... 倒装收尾。四件套可直接迁移到任何品质类真题。' }
          ]
        },

        { type: 'concept', title: '范文 D：大作文（图画作文 · 科技伦理类）',
          exam: { freq: '高频', forms: ['写作（大作文）'], score: '大作文 20 分' },
          points: [
            '母题语境：一家人聚餐各自低头刷手机，无人交流',
            '学结构：现象类图画 = 描述 → 双刃剑剖析 → 治理建议',
            '学语言：虚拟语气 + What matters is not...but... 议论句'
          ],
          summary: '科技类范文骨架：画面细节 → 科技之利与弊 → 规制与自律并重。',
          details: [
            { h: '第一段（描述图画）', body: 'As is vividly depicted in the drawing, a family of four is sitting around the dinner table, yet no conversation can be heard: each of them, old and young alike, is absorbed in a glowing smartphone. The caption below the picture reads: \"The distance is so near, yet so far.\"' },
            { h: '第二段（阐释寓意）', body: 'The cartoonist intends to remind us of a pressing issue in the digital age: while smartphones have brought us unprecedented convenience, they are quietly alienating us from those we love. Were we to be controlled by the very devices we created, the consequences would be far beyond loneliness — genuine communication, family bonds and even social trust would gradually wither. What ultimately matters is not the technology itself, but the way we employ it.' },
            { h: '第三段（评论建议）', body: 'In my view, it is high time we struck a balance between the virtual world and real life. For one thing, each individual should learn to put down the phone occasionally and communicate face to face; for another, the media and schools are expected to guide the public, especially teenagers, to use digital devices rationally. Only in this way can technology truly serve us, rather than rule us.' },
            { h: '亮点句型清单', body: '① Hard as the issue is...（本题未用，可替换开头）；② Were we to...虚拟语气；③ not...but... 平行结构；④ It is high time we + 过去式；⑤ serve us rather than rule us 结尾金句。科技类真题可整体套用此骨架。' }
          ]
        }
      ]
    }
  ]
});
