window.GAME_STORY = {
  title: "第十三位证人",
  start: "status000",
  characters: [
    {
      id: "ivy",
      name: "艾薇·贝尔",
      english: "Ivy Bell",
      speaker: "艾薇",
      role: "独立调查者；通过独立证据识别身份",
      initials: "IB",
      avatar: ""
    },
    {
      id: "edward",
      name: "爱德华·维尔",
      english: "Edward Vale",
      speaker: "爱德华",
      role: "庄园继承人、调查委托人；第十三位证人",
      initials: "EV",
      avatar: ""
    },
    {
      id: "algernon",
      name: "阿尔杰农·维尔",
      english: "Algernon Vale",
      speaker: "阿尔杰农",
      role: "维尔家族正式继承人；当前存活",
      initials: "AV",
      avatar: ""
    },
    {
      id: "august",
      name: "奥古斯特·维尔",
      english: "August Vale",
      speaker: "奥古斯特",
      role: "阿尔杰农的双胞胎弟弟；当前已经死亡",
      initials: "AV",
      avatar: ""
    },
    {
      id: "edmund",
      name: "埃德蒙·格雷",
      english: "Edmund Grey",
      speaker: "埃德蒙",
      role: "退休事务律师；第十二位公开证人",
      initials: "EG",
      avatar: ""
    }
  ],
  clues: [],
  chapters: {
    status: {
      kicker: "开发状态",
      title: "剧情内容冻结",
      caseNumber: "SRC"
    }
  },
  nodes: {
    status000: {
      chapter: "status",
      scene: "study",
      place: "项目档案室",
      speaker: "旁白",
      text: "当前版本只保留已经确认的视觉小说界面、角色档案、线索档案、存档和历史记录系统。",
      next: "status001"
    },
    status001: {
      chapter: "status",
      scene: "closeup",
      place: "方案 A 原始档案",
      speaker: "旁白",
      text: "此前由 Codex 补写的序章、第一章和选项已经移入未核准草稿，不再作为正式游戏剧情播放。",
      next: "status002"
    },
    status002: {
      chapter: "status",
      scene: "hall",
      place: "等待剧情确认",
      speaker: "旁白",
      text: "正式剧情将在原始对白、原始顺序和可继承选项得到逐项确认后重新接入。",
      end: true
    }
  }
};

