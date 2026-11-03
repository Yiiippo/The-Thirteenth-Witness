window.GAME_STORY = {
  title: "第十三位证人",
  start: "p000",
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
