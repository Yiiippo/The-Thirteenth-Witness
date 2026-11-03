(() => {
  "use strict";

  const nodes = {};

  function addSequence(prefix, defaults, lines, nextAfter) {
    lines.forEach((line, index) => {
      const id = `${prefix}${String(index).padStart(3, "0")}`;
      const nextId = index === lines.length - 1
        ? nextAfter
        : `${prefix}${String(index + 1).padStart(3, "0")}`;
      nodes[id] = {
        ...defaults,
        ...line,
        ...(nextId ? { next: nextId } : { end: true })
      };
    });
  }

  addSequence("p", {
    chapter: "prologue",
    scene: "manor",
    place: "雾鸦庄园 · 门前"
  }, [
    { speaker: "旁白", text: "1897年11月2日。\n\n英格兰北部，晚上八点四十分。\n\n一辆马车停在雾鸦庄园门前。" },
    { speaker: "旁白", text: "艾薇·贝尔看了看手里的邀请函。\n\n信封没有收件人姓名，只有一个数字。\n\n13。" },
    { speaker: "艾薇", text: "奇怪……为什么没有写名字？" },
    { speaker: "爱德华", text: "因为我不知道你的名字。" },
    { speaker: "旁白", text: "艾薇吓了一跳。\n\n一个穿着黑色礼服的年轻男人站在台阶上。" },
    { speaker: "爱德华", text: "我是爱德华·维尔。欢迎来到雾鸦庄园。" },
    { speaker: "艾薇", text: "您就是委托我调查案件的人？" },
    { speaker: "爱德华", text: "是的。" },
    { speaker: "艾薇", text: "那您怎么知道我会来？" },
    { speaker: "爱德华", text: "我寄了邀请函。" },
    { speaker: "艾薇", text: "可是您刚刚说不知道我的名字。" },
    { speaker: "爱德华", text: "……" },
    { speaker: "爱德华", text: "我开始后悔雇用你了。" },
    { speaker: "旁白", text: "艾薇低头检查邀请函。" },
    { speaker: "艾薇", text: "对了，爱德华先生，您说您的父亲已经死了？" },
    { speaker: "爱德华", text: "是的。" },
    { speaker: "艾薇", text: "那么，我们要调查的是谁杀了他？" },
    { speaker: "爱德华", text: "我希望你调查的，是他究竟什么时候死的。" }
  ], "commission000");

  addSequence("commission", {
    chapter: "prologue",
    scene: "hall",
    place: "雾鸦庄园 · 大厅"
  }, [
    { speaker: "旁白", text: "维尔爵士在当晚被发现死在书房。\n\n奇怪的是，庄园里的十二名宾客都声称自己在当晚见过爵士。\n\n但每个人描述的时间和地点都不一样。\n\n更奇怪的是，爵士的尸体没有被任何人正式辨认。" },
    { speaker: "爱德华", text: "我不想让警方在没有查清楚的情况下带走父亲的遗体。" },
    { speaker: "艾薇", text: "您怀疑那不是您的父亲？" },
    { speaker: "爱德华", text: "我不知道。" },
    { speaker: "艾薇", text: "那您为什么不自己调查？" },
    { speaker: "爱德华", text: "因为我认识这里的每一个人。" },
    { speaker: "艾薇", text: "所以您会有偏见？" },
    { speaker: "爱德华", text: "正是如此。" },
    { speaker: "艾薇", text: "明白了。您负责告诉我他们是谁，我负责怀疑他们。" },
    { speaker: "爱德华", text: "……大致如此。" }
  ], "choice001");

  nodes.choice001 = {
    chapter: "prologue",
    scene: "hall",
    place: "雾鸦庄园 · 大厅",
    choice: "你想先了解什么？",
    options: [
      { key: "A", text: "询问爱德华，尸体究竟是谁发现的。", next: "choice1a000", set: { clue_testimony: 1 } },
      { key: "B", text: "询问爱德华，他最后一次见到父亲是什么时候。", next: "choice1b000", set: { clue_timeline: 1, clue_testimony: 1 } },
      { key: "C", text: "询问爱德华，为什么邀请函上没有我的名字。", next: "choice1c000", set: { clue_invitation: 1 } }
    ]
  };

  addSequence("choice1a", {
    chapter: "prologue",
    scene: "hall",
    place: "雾鸦庄园 · 大厅"
  }, [
    { speaker: "爱德华", text: "是阿瑟。凌晨之前，他进入书房整理文件，发现了父亲。" },
    { speaker: "艾薇", text: "那阿瑟先生是第一个确认爵士死亡的人？" },
    { speaker: "爱德华", text: "是的。" },
    { speaker: "线索", text: "第一发现者\n\n后续可追查阿瑟是否真的第一时间进入书房。", evidence: "第一发现者" }
  ], "guests000");

  addSequence("choice1b", {
    chapter: "prologue",
    scene: "hall",
    place: "雾鸦庄园 · 大厅"
  }, [
    { speaker: "艾薇", text: "您最后一次见到父亲，究竟是什么时候？" },
    { speaker: "爱德华", text: "十月二十七日晚上。在书房。" },
    { speaker: "艾薇", text: "不是三天前？" },
    { speaker: "爱德华", text: "我之前说得不够准确。那次谈话以后，我只收到过他的书面指示。" },
    { speaker: "艾薇", text: "你们谈了什么？" },
    { speaker: "爱德华", text: "他说，一项持续了很多年的安排就要结束了。" },
    { speaker: "艾薇", text: "您看清他的脸了吗？" },
    { speaker: "旁白", text: "爱德华停顿了一下。" },
    { speaker: "爱德华", text: "窗帘拉着，灯在他身后。我记得他用右手拿着茶杯。" },
    { speaker: "艾薇", text: "所以您记得的是习惯，不是脸。" },
    { speaker: "爱德华", text: "……是。" },
    { speaker: "线索", text: "十月二十七日会面\n\n爱德华确实与一名自称阿尔杰农的人交谈，但身份确认依赖拿杯习惯。", evidence: "十月二十七日会面" }
  ], "guests000");

  addSequence("choice1c", {
    chapter: "prologue",
    scene: "hall",
    place: "雾鸦庄园 · 大厅"
  }, [
    { speaker: "艾薇", text: "您说邀请函是您寄的，可您连我的名字都不知道。" },
    { speaker: "爱德华", text: "因为我只是把它寄出去的人。" },
    { speaker: "艾薇", text: "不是写信的人？" },
    { speaker: "爱德华", text: "不是。十月三十一日，我在父亲上锁的抽屉里发现了十三只信封。前十二封写着姓名，最后一封只有地址和数字十三。" },
    { speaker: "艾薇", text: "还有别的指示吗？" },
    { speaker: "爱德华", text: "只有一句话——‘不要拆开，把它寄到这个地址。’" },
    { speaker: "旁白", text: "艾薇翻过信封。" },
    { speaker: "艾薇", text: "也就是说，寄信的人知道我住在哪里，却不愿意写出我的名字。" },
    { speaker: "爱德华", text: "或者，他不希望我在你到达之前知道你的名字。" },
    { speaker: "线索", text: "预先封好的第十三封信\n\n爱德华负责投寄，但信封与收件地址由他人预先准备；真正作者将在后续调查中确认。", evidence: "预先封好的第十三封信" }
  ], "guests000");

  addSequence("guests", {
    chapter: "prologue",
    scene: "hall",
    place: "雾鸦庄园 · 会客厅"
  }, [
    { speaker: "旁白", text: "爱德华带艾薇进入会客厅。\n\n六位主要人物都在场。\n\n塞西莉亚坐在窗边。\n\n朱利安正在整理医疗文件。\n\n阿瑟站在壁炉旁。\n\n玛格丽特抱着一本书。\n\n卢西安正给自己倒茶。", unlock: ["cecilia", "julian", "arthur", "margaret", "lucian"] },
    { speaker: "爱德华", text: "各位，这位是艾薇·贝尔小姐。她将协助调查父亲的事情。" },
    { speaker: "卢西安", text: "一位年轻的女侦探？" },
    { speaker: "艾薇", text: "是的。" },
    { speaker: "卢西安", text: "看起来不像。" },
    { speaker: "艾薇", text: "那我看起来像什么？" },
    { speaker: "卢西安", text: "像一个迷路的学生。" },
    { speaker: "艾薇", text: "那您看起来像一个没有付钱就来吃晚餐的人。" },
    { speaker: "旁白", text: "卢西安笑了。\n\n爱德华轻咳一声。" },
    { speaker: "爱德华", text: "请各位配合调查。" },
    { speaker: "旁白", text: "此时，艾薇发现墙上的十二幅肖像。\n\n每一幅都是庄园过去的访客。\n\n但最右边还有一个空画框。" },
    { speaker: "艾薇", text: "那个位置原本挂着什么？" },
    { speaker: "阿瑟", text: "一幅已经遗失的画像。" },
    { speaker: "艾薇", text: "是谁的？" },
    { speaker: "旁白", text: "阿瑟看了她一眼。" },
    { speaker: "阿瑟", text: "我不记得了。" },
    { speaker: "旁白", text: "空画框。" }
  ], "study000");

  addSequence("study", {
    chapter: "chapter1",
    scene: "study",
    place: "雾鸦庄园 · 书房"
  }, [
    { speaker: "旁白", text: "艾薇和爱德华进入书房。\n\n房间中央摆着一把扶手椅。\n\n桌上有一杯已经凉掉的红茶。\n\n墙上挂着一只古董钟。\n\n地毯上有一道不太明显的压痕。" },
    { speaker: "艾薇", text: "这里就是发现尸体的地方？" },
    { speaker: "爱德华", text: "是的。" },
    { speaker: "艾薇", text: "您看过尸体吗？" },
    { speaker: "爱德华", text: "看过。" },
    { speaker: "艾薇", text: "您认出他了吗？" },
    { speaker: "爱德华", text: "我认为是父亲。" },
    { speaker: "艾薇", text: "您说的是认为，不是确定。" },
    { speaker: "旁白", text: "爱德华没有回答。" },
    { speaker: "调查", text: "玩家可以点击四个调查点。\n\n调查书房：选择你要检查的物品\n\n古董钟点击调查\n\n红茶杯点击调查\n\n扶手椅点击调查\n\n空画框点击调查\n\n正式游戏中，四项调查都可以完成。此处为互动演示。" }
  ], "testimony000");

  addSequence("testimony", {
    chapter: "chapter1",
    scene: "study",
    place: "雾鸦庄园 · 书房"
  }, [
    { speaker: "旁白", text: "艾薇开始逐一整理宾客的证词。\n\n塞西莉亚：九点十五分看见窗边有一个人影。\n朱利安：九点听见爵士说话。\n阿瑟：九点二十分收到爵士的书面指示。\n玛格丽特：九点前看见一封爵士的信。\n卢西安：晚餐时听见爵士的笑声。\n爱德华：三天前与爵士谈过话。\n\n剩余六份证词在庄园的访客记录中。" },
    { speaker: "艾薇", text: "爱德华先生，我发现了一件事。" },
    { speaker: "爱德华", text: "什么？" },
    { speaker: "艾薇", text: "他们好像都没有直接见过您的父亲。" },
    { speaker: "爱德华", text: "你确定？" },
    { speaker: "艾薇", text: "有人看见影子，有人听见声音，有人看见信件。" },
    { speaker: "艾薇", text: "但没有人能告诉我，他当时脸上有什么表情。" },
    { speaker: "旁白", text: "爱德华看向窗外。" },
    { speaker: "爱德华", text: "这不可能。" },
    { speaker: "艾薇", text: "为什么？" },
    { speaker: "爱德华", text: "因为我一直以为父亲就在庄园里。" },
    { speaker: "开发标注", text: "A1 序章与第一章已按原顺序播放完毕。选择1的三个分支均已完成；第二章将按已确认的开发分支稿继续接入。" }
  ], null);

  window.GAME_STORY = {
    title: "第十三位证人",
    start: "p000",
    characters: [
      { id: "ivy", name: "艾薇·贝尔", english: "Ivy Bell", speaker: "艾薇", role: "19岁｜主控角色｜见习侦探", initials: "IB", avatar: "" },
      { id: "edward", name: "爱德华·维尔", english: "Edward Vale", speaker: "爱德华", role: "25岁｜庄园继承人｜案件委托人；第十三位证人", initials: "EV", avatar: "" },
      { id: "cecilia", name: "塞西莉亚·维尔", english: "Cecilia Vale", speaker: "塞西莉亚", role: "42岁｜庄园女主人", initials: "CV", avatar: "" },
      { id: "julian", name: "朱利安·里德", english: "Julian Reed", speaker: "朱利安", role: "28岁｜家庭医生", initials: "JR", avatar: "" },
      { id: "arthur", name: "阿瑟·芬奇", english: "Arthur Finch", speaker: "阿瑟", role: "61岁｜庄园管家；书房尸体的第一发现者", initials: "AF", avatar: "" },
      { id: "margaret", name: "玛格丽特·肖", english: "Margaret Shaw", speaker: "玛格丽特", role: "24岁｜家庭教师", initials: "MS", avatar: "" },
      { id: "lucian", name: "卢西安·克罗", english: "Lucian Crow", speaker: "卢西安", role: "26岁｜旅行作家", initials: "LC", avatar: "" },
      { id: "algernon", name: "阿尔杰农·维尔", english: "Algernon Vale", speaker: "阿尔杰农", role: "维尔家族正式继承人；当前存活", initials: "AV", avatar: "" },
      { id: "august", name: "奥古斯特·维尔", english: "August Vale", speaker: "奥古斯特", role: "阿尔杰农的双胞胎弟弟；当前已经死亡", initials: "AV", avatar: "" },
      { id: "edmund", name: "埃德蒙·格雷", english: "Edmund Grey", speaker: "埃德蒙", role: "退休事务律师；第十二位公开证人", initials: "EG", avatar: "" }
    ],
    clues: [
      {
        name: "第一发现者",
        category: "人物证词",
        source: "选择1 · 询问爱德华",
        description: "阿瑟在凌晨之前进入书房整理文件并发现尸体；后续可追查他是否真的第一时间进入书房。"
      },
      {
        name: "十月二十七日会面",
        category: "时间线",
        source: "选择1 · 询问最后会面",
        description: "爱德华在10月27日与一名自称阿尔杰农的人交谈，但只凭右手拿茶杯的习惯确认身份。"
      },
      {
        name: "预先封好的第十三封信",
        category: "邀请函",
        source: "选择1 · 追问无名信封",
        description: "爱德华只负责投寄预先封好的信；主信作者与夹层秘密仍需调查。"
      }
    ],
    chapters: {
      prologue: { kicker: "序章", title: "没有写名字的邀请函", caseNumber: "XIII" },
      chapter1: { kicker: "第一章", title: "第十二份证词", caseNumber: "01" }
    },
    nodes
  };
})();

