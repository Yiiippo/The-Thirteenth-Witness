window.GAME_STORY = {
  title: "第十三位证人",
  start: "p000",
  characters: [
    { id: "ivy", name: "艾薇·贝尔", english: "Ivy Bell", speaker: "艾薇", role: "独立调查者；第十三封邀请函的收件人", initials: "IB", avatar: "" },
    { id: "edward", name: "爱德华·维尔", english: "Edward Vale", speaker: "爱德华", role: "庄园继承人、调查委托人；隐藏的第十三位证人", initials: "EV", avatar: "" },
    { id: "algernon", name: "阿尔杰农·维尔", english: "Algernon Vale", speaker: "阿尔杰农", role: "维尔家长子、庄园正式继承人", initials: "AV", avatar: "" },
    { id: "august", name: "奥古斯特·维尔", english: "August Vale", speaker: "奥古斯特", role: "阿尔杰农的双胞胎弟弟", initials: "AV", avatar: "" },
    { id: "arthur", name: "阿瑟", english: "Arthur", speaker: "阿瑟", role: "雾鸦庄园老管家；书房尸体的发现者", initials: "AR", avatar: "" },
    { id: "julian", name: "朱利安", english: "Julian", speaker: "朱利安", role: "维尔家的家庭医生", initials: "JU", avatar: "" },
    { id: "cecilia", name: "塞西莉亚", english: "Cecilia", speaker: "塞西莉亚", role: "庄园女主人；第一位公开证人", initials: "CE", avatar: "" },
    { id: "margaret", name: "玛格丽特", english: "Margaret", speaker: "玛格丽特", role: "维尔家的家庭教师", initials: "MA", avatar: "" },
    { id: "lucian", name: "卢西安", english: "Lucian", speaker: "卢西安", role: "旅行作家；受邀到场的公开证人", initials: "LU", avatar: "" },
    { id: "isabel", name: "伊莎贝尔", english: "Isabel", speaker: "伊莎贝尔", role: "雾鸦庄园前任女仆", initials: "IS", avatar: "" },
    { id: "thomas", name: "托马斯", english: "Thomas", speaker: "托马斯", role: "维尔家的马车夫", initials: "TH", avatar: "" },
    { id: "henry", name: "亨利", english: "Henry", speaker: "亨利", role: "维尔家的现任家族律师", initials: "HE", avatar: "" },
    { id: "eileen", name: "艾琳", english: "Eileen", speaker: "艾琳", role: "旧温室管理员", initials: "EI", avatar: "" },
    { id: "william", name: "威廉", english: "William", speaker: "威廉", role: "维尔家的家族摄影师", initials: "WI", avatar: "" },
    { id: "george", name: "乔治", english: "George", speaker: "乔治", role: "负责庄园古董钟的维修工", initials: "GE", avatar: "" },
    { id: "edmund", name: "埃德蒙·格雷", english: "Edmund Grey", speaker: "埃德蒙", role: "退休事务律师；第十二位公开证人", initials: "EG", avatar: "" }
  ],
  clues: [
    {
      id: "discovery-chain",
      name: "阿瑟发现尸体",
      category: "证词",
      source: "庄园门前 · 爱德华的回答",
      description: "阿瑟并非偶然进入书房。他按照一张书面指示开门，发现了被认作阿尔杰农的尸体。"
    },
    {
      id: "invitation-wording",
      name: "邀请函的措辞",
      category: "文书",
      source: "第十三封邀请函",
      description: "十二位证人被要求彼此隔离，只写下自己真正记得的事情。这种措辞像是在刻意保存证词差异。"
    },
    {
      id: "unknown-client",
      name: "委托来源不明",
      category: "疑点",
      source: "庄园门前 · 爱德华的回答",
      description: "爱德华承认第十三封信不是他写的，却准确写有艾薇的姓名和住址。真正的邀请者仍不明确。"
    },
    {
      id: "uninjured-hand",
      name: "右手无旧伤",
      category: "身体",
      source: "书房 · 第一次尸体检查",
      description: "死者右手无名指完整，没有旧骨折或明显变形。该观察暂时不绑定任何姓名。"
    },
    {
      id: "watch-number",
      name: "怀表维修编号",
      category: "物证",
      source: "书房 · 死者随身物品",
      description: "怀表外壳上的家徽只能证明它属于维尔家；内盖维修编号可以追查这只表真正的使用记录。"
    },
    {
      id: "cellar-traces",
      name: "酒窖尘土与搬运痕迹",
      category: "现场",
      source: "书房 · 环境检查",
      description: "死者鞋底带有酒窖常见的白色粉尘，地毯边缘留有新擦痕，说明尸体可能被移动过。"
    },
    {
      id: "independent-medical-note",
      name: "独立医学观察",
      category: "医学",
      source: "书房 · 朱利安的初检",
      description: "朱利安同意把亲眼观察到的身体事实与庄园提供的姓名分栏记录，避免预设身份污染鉴定。"
    },
    {
      id: "julian-signature",
      name: "朱利安的旧签名秘密",
      category: "人物",
      source: "书房 · 对医生的追问",
      description: "朱利安承认一份旧签名原件另有隐情。他尚未交出文件，但愿意在取得信任后继续说明。"
    }
  ],
  chapters: {
    prologue: { kicker: "序章", title: "第十三封邀请函", caseNumber: "XIII" },
    chapter1: { kicker: "第一章", title: "一个名字的尸体", caseNumber: "01" }
  },
  nodes: {
    p000: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "旁白", text: "1897年11月2日，20:40。暴雨。马车停在雾鸦庄园门前。",
      next: "p001"
    },
    p001: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "艾薇", text: "您在信里说，死者是您的父亲。",
      portrait: "", next: "p002"
    },
    p002: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "爱德华", text: "至少所有人都这样认为。",
      portrait: "", next: "p003"
    },
    p003: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "艾薇", text: "这不是一个让人安心的回答。",
      portrait: "", next: "p004"
    },
    p004: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "爱德华", text: "所以我请您来。",
      portrait: "", next: "p005"
    },
    p005: {
      chapter: "prologue", scene: "closeup", place: "未署名的邀请函",
      speaker: "旁白", text: "爱德华递出一封没有署名的邀请函。封面只写着：致第十三位到场者。",
      next: "p006"
    },
    p006: {
      chapter: "prologue", scene: "closeup", place: "未署名的邀请函",
      speaker: "艾薇", text: "纸张比信封陈旧。右下角还有一道被人刮去的压印。",
      next: "c001"
    },
    c001: {
      chapter: "prologue", scene: "closeup", place: "未署名的邀请函",
      choice: "先追问什么？",
      options: [
        { key: "A", text: "尸体是谁发现的？", next: "c001a", set: { clue_discovery: true } },
        { key: "B", text: "十二位证人为什么同时到场？", next: "c001b", set: { clue_wording: true } },
        { key: "C", text: "谁知道我的姓名和住址？", next: "c001c", set: { clue_source: true } }
      ]
    },
    c001a: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "爱德华", text: "阿瑟发现的。准确地说，是他按照一张书面指示打开了书房。",
      evidence: "阿瑟发现尸体", next: "p007"
    },
    c001b: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "爱德华", text: "他们都收到同一种邀请——只写下自己真正记得的事情，不要参考其他人的说法。",
      evidence: "邀请函的措辞", next: "p007"
    },
    c001c: {
      chapter: "prologue", scene: "manor", place: "雾鸦庄园 · 门前",
      speaker: "爱德华", text: "我不知道。您的姓名已经写在第十三封信上，但那封信不是我写的。",
      evidence: "委托来源不明", next: "p007"
    },
    p007: {
      chapter: "prologue", scene: "hall", place: "雾鸦庄园 · 门厅",
      speaker: "旁白", text: "大门在身后合拢。雨声被厚重的木板隔开，十二位客人的低语从餐厅方向传来。",
      next: "p008"
    },
    p008: {
      chapter: "prologue", scene: "hall", place: "雾鸦庄园 · 门厅",
      speaker: "阿瑟", text: "贝尔小姐，请跟我来。先生在书房。",
      next: "p009"
    },
    p009: {
      chapter: "prologue", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "旁白", text: "死者穿着黑色礼服，怀表放在胸袋里。家庭医生朱利安站在书桌旁，手套上没有血。",
      next: "p010"
    },
    p010: {
      chapter: "prologue", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "头部有旧伤，但不足以解释死亡。真正的致命伤需要进一步检查。",
      next: "p011"
    },
    p011: {
      chapter: "prologue", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "艾薇", text: "您确认他是阿尔杰农·维尔吗？",
      next: "p012"
    },
    p012: {
      chapter: "prologue", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "庄园里的人这样告诉我。",
      next: "p013"
    },
    p013: {
      chapter: "prologue", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "艾薇", text: "我问的是，您确认了吗？",
      next: "p014"
    },
    p014: {
      chapter: "prologue", scene: "closeup", place: "死者的右手",
      speaker: "旁白", text: "朱利安没有回答。煤气灯的光短暂落在死者完整无损的右手无名指上。",
      next: "p100"
    },
    p100: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "旁白", text: "第一章｜一个名字的尸体。艾薇戴上手套，开始第一次正式检查。",
      next: "c002"
    },
    c002: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      choice: "优先检查什么？",
      options: [
        { key: "A", text: "检查身体特征", next: "c002a", set: { evidence_body: true, independent_evidence: 1 } },
        { key: "B", text: "检查随身物品", next: "c002b", set: { evidence_watch: true, independent_evidence: 1 } },
        { key: "C", text: "检查书房环境", next: "c002c", set: { evidence_room: true, independent_evidence: 1 } }
      ]
    },
    c002a: {
      chapter: "chapter1", scene: "closeup", place: "死者的右手",
      speaker: "艾薇", text: "右手没有旧伤。皮肤完整，指骨也没有明显变形。先把这一点单独记下，不写姓名。",
      evidence: "右手无旧伤", next: "p101"
    },
    c002b: {
      chapter: "chapter1", scene: "closeup", place: "死者的怀表",
      speaker: "艾薇", text: "表盖上的家徽证明不了主人。内盖的维修编号倒是可以追查。",
      evidence: "怀表维修编号", next: "p101"
    },
    c002c: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "艾薇", text: "鞋底带着酒窖常见的白色粉尘。地毯边缘还有搬运重物留下的新擦痕。",
      evidence: "酒窖尘土与搬运痕迹", next: "p101"
    },
    p101: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "艾薇", text: "死亡时间？",
      next: "p102"
    },
    p102: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "至少数日前，不是昨夜。低温延缓了变化。",
      next: "p103"
    },
    p103: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "爱德华", text: "可尸体是今天才在书房发现的。",
      next: "p104"
    },
    p104: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "发现时间不是死亡时间。",
      next: "p105"
    },
    p105: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "旁白", text: "朱利安承认，自己没有取得阿尔杰农的完整旧病历。死者的姓名来自阿瑟、衣着和书房里的物品。",
      next: "c003"
    },
    c003: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      choice: "如何询问医生？",
      options: [
        { key: "A", text: "要求他立即给出死者姓名", next: "c003a", set: { witness_trust: -1, contaminated_testimony: 1 } },
        { key: "B", text: "要求分开记录医学观察与庄园提供的身份", next: "c003b", set: { witness_trust: 1, independent_evidence: 2 } },
        { key: "C", text: "追问他为何使用一个不属于自己的旧签名", next: "c003c", set: { doctor_secret: true, witness_trust: 1 } }
      ]
    },
    c003a: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "如果您一定要我现在回答——庄园说他是阿尔杰农。我不会把这种回答写进正式报告。",
      next: "p106"
    },
    c003b: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "很好。第一栏只写我亲眼所见；第二栏再写别人希望我相信的姓名。",
      evidence: "独立医学观察", next: "p106"
    },
    c003c: {
      chapter: "chapter1", scene: "study", place: "雾鸦庄园 · 书房",
      speaker: "朱利安", text: "那是另一件旧事。等我确认您不是来替维尔家掩埋问题，我会把原件交给您。",
      evidence: "朱利安的旧签名秘密", next: "p106"
    },
    p106: {
      chapter: "chapter1", scene: "hall", place: "书房外的走廊",
      speaker: "旁白", text: "走廊尽头，十二份证词已经摆上餐桌。每一份都声称记录了同一个人。",
      next: "p107"
    },
    p107: {
      chapter: "chapter1", scene: "hall", place: "书房外的走廊",
      speaker: "爱德华", text: "贝尔小姐，您现在相信书房里躺着的是谁？",
      next: "p108"
    },
    p108: {
      chapter: "chapter1", scene: "hall", place: "书房外的走廊",
      speaker: "艾薇", text: "我相信那里有一具尸体。至于姓名——那正是有人急着让我跳过的部分。",
      next: "end"
    },
    end: {
      chapter: "chapter1", scene: "hall", place: "第一章结束",
      speaker: "旁白", text: "第一章结束。下一步将接入十二位证人的第一次询问。",
      end: true
    }
  }
};
