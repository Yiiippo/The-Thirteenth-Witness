(() => {
  "use strict";

  const story = window.GAME_STORY;
  const saveKey = "thirteenth-witness-save-v4";
  const state = {
    nodeId: story.start,
    variables: {
      edward_trust: 0,
      witness_trust: 0,
      independent_evidence: 0,
      contaminated_testimony: 0,
      clue_identity: 0,
      clue_medical: 0,
      clue_timeline: 0,
      clue_archive: 0,
      clue_testimony: 0,
      true_route: 0,
      trust_cecilia: 0,
      trust_lucian: 0,
      trust_margaret: 0
    },
    evidence: [],
    history: [],
    unlockedCharacters: [],
    investigations: {},
    interrogations: {},
    typing: false,
    typeTimer: null,
    fullText: ""
  };

  const $ = (selector) => document.querySelector(selector);
  const titleScreen = $("#title-screen");
  const gameScreen = $("#game-screen");
  const scene = $("#scene");
  const dialogueBox = $("#dialogue-box");
  const dialogueText = $("#dialogue-text");
  const speakerName = $("#speaker-name");
  const speakerRole = $("#speaker-role");
  const sceneLabel = $("#scene-label");
  const chapterKicker = $("#chapter-kicker");
  const chapterTitle = $("#chapter-title");
  const caseNumber = $("#case-number");
  const choicePanel = $("#choice-panel");
  const choicePrompt = $("#choice-prompt");
  const choiceList = $("#choice-list");
  const investigationPanel = $("#investigation-panel");
  const investigationTitle = $("#investigation-title");
  const investigationInstruction = $("#investigation-instruction");
  const investigationCount = $("#investigation-count");
  const investigationHotspots = $("#investigation-hotspots");
  const finishInvestigation = $("#finish-investigation");
  const investigationDialog = $("#investigation-dialog");
  const investigationItemName = $("#investigation-item-name");
  const investigationItemDescription = $("#investigation-item-description");
  const portraitSlot = $("#portrait-slot");
  const portraitImage = $("#portrait-image");
  const progressFill = $("#progress-fill");
  const historyDialog = $("#history-dialog");
  const historyList = $("#history-list");
  const charactersDialog = $("#characters-dialog");
  const characterGrid = $("#character-grid");
  const characterCount = $("#character-count");
  const charactersSummary = $("#characters-summary");
  const cluesDialog = $("#clues-dialog");
  const clueList = $("#clue-list");
  const clueCount = $("#clue-count");
  const cluesSummary = $("#clues-summary");
  const interrogateDialog = $("#interrogate-dialog");
  const interrogateWitness = $("#interrogate-witness");
  const interrogateQuestion = $("#interrogate-question");
  const interrogateResponse = $("#interrogate-response");
  const settingsDialog = $("#settings-dialog");
  const musicToggle = $("#music-toggle");
  const musicVolume = $("#music-volume");
  const musicVolumeValue = $("#music-volume-value");
  const musicNowPlaying = $("#music-now-playing");
  const chapterTransition = $("#chapter-transition");
  const transitionKicker = $("#transition-kicker");
  const transitionTitle = $("#transition-title");
  const toast = $("#toast");
  let renderedChapter = null;
  let chapterTransitionTimers = [];

  const audioSettingsKey = "thirteenth-witness-audio-v1";
  const musicTracks = {
    nocturne: { title: "肖邦｜升C小调夜曲", src: "./assets/audio/艾薇初次进入庄园、调查爱德华的过去、真结局.mp3" },
    gnossienne: { title: "萨蒂｜第一号玄秘曲", src: "./assets/audio/书房调查、翻阅旧档案、发现身份矛盾.mp3" },
    danse: { title: "圣桑｜骷髅之舞", src: "./assets/audio/双胞胎身份揭晓、最后的晚宴、最终反转.mp3" },
    clair: { title: "德彪西｜月光", src: "./assets/audio/艾薇和爱德华的互动、庄园清晨、人物情感结局.mp3" },
    mountain: { title: "格里格｜山魔王的宫殿", src: "./assets/audio/玩家发现证据矛盾、追查温室、最后的紧张推理.mp3" },
    pavane: { title: "福雷｜帕凡舞曲", src: "./assets/audio/塞西莉亚出场、庄园晚宴、奥古斯特的死亡真相.mp3" }
  };
  const musicDecks = [new Audio(), new Audio()];
  musicDecks.forEach((audio) => {
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
  });
  let audioSettings = loadAudioSettings();
  let activeDeck = 0;
  let currentTrackId = null;
  let musicTransition = 0;

  function loadAudioSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(audioSettingsKey));
      return {
        enabled: saved?.enabled !== false,
        volume: Number.isFinite(saved?.volume) ? Math.min(1, Math.max(0, saved.volume)) : 0.38
      };
    } catch {
      return { enabled: true, volume: 0.38 };
    }
  }

  function saveAudioSettings() {
    localStorage.setItem(audioSettingsKey, JSON.stringify(audioSettings));
  }

  function musicForNode(node) {
    const id = state.nodeId;
    if (id.startsWith("end1")) return "nocturne";
    if (id.startsWith("end3")) return "clair";
    if (id.startsWith("end2") || id.startsWith("end5")) return "gnossienne";
    if (id.startsWith("end4")) return "nocturne";
    if (node.chapter === "prologue") return "nocturne";
    if (node.chapter === "chapter1") return "gnossienne";
    if (node.chapter === "chapter2") return /^(cecilia|c2)/.test(id) ? "pavane" : "gnossienne";
    if (node.chapter === "chapter3") return "gnossienne";
    if (node.chapter === "chapter4") return "clair";
    if (node.chapter === "chapter5") return "danse";
    if (node.chapter === "chapter6") {
      if (/^(greenhouse|icehouse)/.test(id)) return "mountain";
      if (id.startsWith("identity")) return "pavane";
      return "danse";
    }
    if (node.chapter === "chapter7") return "mountain";
    return "nocturne";
  }

  function updateMusicUI() {
    musicToggle.textContent = audioSettings.enabled ? "开启" : "关闭";
    musicToggle.setAttribute("aria-pressed", String(audioSettings.enabled));
    musicVolume.value = String(Math.round(audioSettings.volume * 100));
    musicVolumeValue.textContent = `${Math.round(audioSettings.volume * 100)}%`;
    musicNowPlaying.textContent = currentTrackId && musicTracks[currentTrackId]
      ? musicTracks[currentTrackId].title
      : audioSettings.enabled ? "等待剧情开始" : "音乐已关闭";
  }

  function stopMusic() {
    musicTransition += 1;
    musicDecks.forEach((audio) => {
      audio.pause();
      audio.volume = 0;
    });
    currentTrackId = null;
    updateMusicUI();
  }

  function switchMusic(trackId, force = false) {
    if (!audioSettings.enabled) return;
    if (!force && trackId === currentTrackId) return;
    const track = musicTracks[trackId];
    if (!track) return;

    const token = ++musicTransition;
    const oldDeck = musicDecks[activeDeck];
    const nextDeckIndex = activeDeck === 0 ? 1 : 0;
    const nextDeck = musicDecks[nextDeckIndex];
    nextDeck.pause();
    nextDeck.src = track.src;
    nextDeck.currentTime = 0;
    nextDeck.volume = 0;

    nextDeck.play().then(() => {
      const started = performance.now();
      const duration = 1400;
      const oldVolume = oldDeck.volume;
      const fade = (now) => {
        if (token !== musicTransition) return;
        const progress = Math.min(1, (now - started) / duration);
        nextDeck.volume = audioSettings.volume * progress;
        oldDeck.volume = oldVolume * (1 - progress);
        if (progress < 1) {
          requestAnimationFrame(fade);
        } else {
          oldDeck.pause();
          oldDeck.volume = 0;
          activeDeck = nextDeckIndex;
        }
      };
      requestAnimationFrame(fade);
    }).catch(() => {
      currentTrackId = null;
      musicNowPlaying.textContent = "点击游戏画面后播放";
    });

    currentTrackId = trackId;
    updateMusicUI();
  }

  function updateMusicForNode(node, force = false) {
    switchMusic(musicForNode(node), force);
  }

  function startGame(fromSave = false) {
    if (!fromSave) resetState();
    clearChapterTransition();
    renderedChapter = null;
    titleScreen.classList.add("is-hidden");
    gameScreen.classList.remove("is-hidden");
    renderNode();
  }

  function resetState() {
    state.nodeId = story.start;
    state.variables = {
      edward_trust: 0,
      witness_trust: 0,
      independent_evidence: 0,
      contaminated_testimony: 0,
      clue_identity: 0,
      clue_medical: 0,
      clue_timeline: 0,
      clue_archive: 0,
      clue_testimony: 0,
      true_route: 0,
      trust_cecilia: 0,
      trust_lucian: 0,
      trust_margaret: 0
    };
    state.evidence = [];
    state.history = [];
    state.unlockedCharacters = [];
    state.investigations = {};
    state.interrogations = {};
    updateCharacterCount();
    updateClueCount();
  }

  function renderNode(skipChapterTransition = false) {
    const node = story.nodes[state.nodeId];
    if (!node) return;

    if (!skipChapterTransition && node.chapter !== renderedChapter) {
      showChapterTransition(node);
      return;
    }

    renderedChapter = node.chapter;

    clearTyping();
    unlockSpeaker(node.speaker);
    unlockCharacters(node.unlock);
    applyPresentation(node);
    updateProgress();
    choicePanel.classList.add("is-hidden");
    investigationPanel.classList.add("is-hidden");

    if (node.investigation) {
      showInvestigation(node);
      dialogueBox.classList.add("is-hidden");
      return;
    }

    if (node.choice) {
      showChoices(node);
      dialogueBox.classList.add("is-hidden");
      return;
    }

    dialogueBox.classList.remove("is-hidden");
    speakerName.textContent = node.speaker || "旁白";
    speakerRole.textContent = getSpeakerRole(node.speaker);
    sceneLabel.textContent = node.place || "";
    dialogueText.classList.toggle("is-narration", node.speaker === "旁白");

    if (node.evidence && !state.evidence.includes(node.evidence)) {
      state.evidence.push(node.evidence);
      updateClueCount();
      showToast(`获得线索：${node.evidence}`);
    }

    typeText(node.text || "");
  }

  function clearChapterTransition() {
    chapterTransitionTimers.forEach((timer) => window.clearTimeout(timer));
    chapterTransitionTimers = [];
    chapterTransition.classList.add("is-hidden");
    chapterTransition.classList.remove("is-visible", "is-leaving");
  }

  function showChapterTransition(node) {
    const chapter = story.chapters[node.chapter] || story.chapters.prologue;
    clearChapterTransition();
    transitionKicker.textContent = chapter.kicker;
    transitionTitle.textContent = chapter.title;
    chapterTransition.classList.remove("is-hidden");

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => chapterTransition.classList.add("is-visible"));
    });

    const revealTimer = window.setTimeout(() => {
      renderNode(true);
      chapterTransition.classList.add("is-leaving");
      chapterTransition.classList.remove("is-visible");

      const hideTimer = window.setTimeout(() => {
        chapterTransition.classList.add("is-hidden");
        chapterTransition.classList.remove("is-leaving");
      }, 1400);
      chapterTransitionTimers.push(hideTimer);
    }, 3000);
    chapterTransitionTimers.push(revealTimer);
  }

  function getSpeakerRole(speaker) {
    if (!speaker || speaker === "旁白") return "调查叙述";
    if (speaker === "线索") return "案件证据";
    const character = story.characters.find((item) => item.speaker === speaker);
    return character ? character.role : "案件相关人物";
  }

  function applyPresentation(node) {
    const chapter = story.chapters[node.chapter] || story.chapters.prologue;
    chapterKicker.textContent = chapter.kicker;
    chapterTitle.textContent = chapter.title;
    caseNumber.textContent = chapter.caseNumber;

    scene.className = `scene scene-${node.scene || "manor"}`;
    sceneLabel.textContent = node.place || "";
    updateMusicForNode(node);
    portraitSlot.classList.toggle("is-narration", node.speaker === "旁白");

    const speakerCharacter = story.characters.find((item) => item.speaker === node.speaker);
    const portraitSrc = node.portrait || (speakerCharacter ? speakerCharacter.avatar : "");

    if (portraitSrc) {
      portraitImage.src = portraitSrc;
      portraitImage.alt = `${node.speaker || "角色"}立绘`;
      portraitSlot.classList.remove("is-empty");
      portraitSlot.classList.add("has-image");
    } else {
      portraitImage.removeAttribute("src");
      portraitImage.alt = "";
      portraitSlot.classList.add("is-empty");
      portraitSlot.classList.remove("has-image");
    }
  }

  function typeText(text) {
    state.fullText = text;
    state.typing = true;
    dialogueText.textContent = "";
    let index = 0;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      finishTyping();
      return;
    }

    state.typeTimer = window.setInterval(() => {
      index += 1;
      dialogueText.textContent = text.slice(0, index);
      if (index >= text.length) finishTyping();
    }, 24);
  }

  function finishTyping() {
    clearTyping();
    dialogueText.textContent = state.fullText;
  }

  function clearTyping() {
    if (state.typeTimer) window.clearInterval(state.typeTimer);
    state.typeTimer = null;
    state.typing = false;
  }

  function advance() {
    const node = story.nodes[state.nodeId];
    if (!node || node.choice || node.investigation) return;

    if (state.typing) {
      finishTyping();
      return;
    }

    recordHistory(node.speaker, node.text);

    if (node.end) {
      showToast("本次调查已经结束");
      return;
    }

    if (node.next) {
      state.nodeId = node.next;
      renderNode();
    }
  }

  function showInvestigation(node) {
    const investigation = node.investigation;
    const completed = state.investigations[investigation.id] || [];
    state.investigations[investigation.id] = completed;

    investigationTitle.textContent = investigation.title;
    investigationInstruction.textContent = investigation.instruction;
    investigationHotspots.replaceChildren();
    investigationPanel.classList.remove("is-hidden");

    investigation.items.forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `investigation-hotspot ${completed.includes(item.id) ? "is-inspected" : ""}`;
      button.style.left = `${item.x}%`;
      button.style.top = `${item.y}%`;
      button.setAttribute("aria-label", `调查：${item.label}`);
      const label = document.createElement("span");
      label.textContent = item.label;
      button.appendChild(label);
      button.addEventListener("click", () => inspectInvestigationItem(node, item, button));
      investigationHotspots.appendChild(button);
    });

    updateInvestigationProgress(node);
  }

  function inspectInvestigationItem(node, item, button) {
    const completed = state.investigations[node.investigation.id];
    if (!completed.includes(item.id)) {
      completed.push(item.id);
      button.classList.add("is-inspected");
      recordHistory(`搜查 · ${item.label}`, item.description);
    }
    investigationItemName.textContent = item.label;
    investigationItemDescription.textContent = item.description;
    updateInvestigationProgress(node);
    investigationDialog.showModal();
  }

  function updateInvestigationProgress(node) {
    const completed = state.investigations[node.investigation.id] || [];
    const total = node.investigation.items.length;
    investigationCount.textContent = `${completed.length} / ${total}`;
    finishInvestigation.disabled = completed.length < total;
  }

  function finishCurrentInvestigation() {
    const node = story.nodes[state.nodeId];
    if (!node?.investigation || finishInvestigation.disabled) return;

    if (node.evidence && !state.evidence.includes(node.evidence)) {
      state.evidence.push(node.evidence);
      updateClueCount();
      showToast(`获得线索：${node.evidence}`);
    }

    recordHistory("搜查完成", node.investigation.title);
    state.nodeId = node.next;
    renderNode();
  }

  function showChoices(node) {
    choicePrompt.textContent = node.choice;
    choiceList.replaceChildren();
    choicePanel.classList.remove("is-hidden");

    node.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-button";
      button.dataset.key = option.key;
      button.textContent = option.text;
      button.addEventListener("click", () => choose(option, node.choice));
      choiceList.appendChild(button);
    });
  }

  function choose(option, prompt) {
    recordHistory("选择", `${prompt}｜${option.key} ${option.text}`);
    if (option.set) {
      Object.entries(option.set).forEach(([key, value]) => {
        if (typeof value === "number" && typeof state.variables[key] === "number") {
          state.variables[key] += value;
        } else {
          state.variables[key] = value;
        }
      });
    }
    const nextNode = option.resolve === "ending" && typeof story.resolveEnding === "function"
      ? story.resolveEnding(option.key, state.variables, state.evidence)
      : option.next;
    state.nodeId = nextNode;
    renderNode();
  }

  function recordHistory(speaker, text) {
    if (!text) return;
    state.history.push({ speaker: speaker || "旁白", text });
  }

  function updateProgress() {
    const ids = Object.keys(story.nodes);
    const current = Math.max(0, ids.indexOf(state.nodeId));
    const percent = Math.min(100, (current / (ids.length - 1)) * 100);
    progressFill.style.width = `${percent}%`;
  }

  function saveGame() {
    const payload = {
      nodeId: state.nodeId,
      variables: state.variables,
      evidence: state.evidence,
      history: state.history,
      unlockedCharacters: state.unlockedCharacters,
      investigations: state.investigations,
      interrogations: state.interrogations,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(saveKey, JSON.stringify(payload));
    updateContinueButton();
    showToast("调查记录已保存");
  }

  function loadGame() {
    const raw = localStorage.getItem(saveKey);
    if (!raw) {
      showToast("还没有保存记录");
      return;
    }

    try {
      const payload = JSON.parse(raw);
      state.nodeId = story.nodes[payload.nodeId] ? payload.nodeId : story.start;
      state.variables = { ...state.variables, ...(payload.variables || {}) };
      state.evidence = Array.isArray(payload.evidence) ? payload.evidence : [];
      state.history = Array.isArray(payload.history) ? payload.history : [];
      state.investigations = payload.investigations && typeof payload.investigations === "object"
        ? payload.investigations
        : {};
      state.interrogations = payload.interrogations && typeof payload.interrogations === "object"
        ? payload.interrogations
        : {};
      state.unlockedCharacters = Array.isArray(payload.unlockedCharacters)
        ? payload.unlockedCharacters
        : inferUnlockedCharacters(state.history);
      updateCharacterCount();
      updateClueCount();
      startGame(true);
      showToast("调查记录已读取");
    } catch {
      showToast("保存记录无法读取");
    }
  }

  function showHistory() {
    historyList.replaceChildren();
    if (!state.history.length) {
      const empty = document.createElement("p");
      empty.textContent = "调查刚刚开始，还没有可回顾的记录。";
      historyList.appendChild(empty);
    } else {
      state.history.forEach((entry) => {
        const item = document.createElement("article");
        item.className = "history-entry";
        const name = document.createElement("strong");
        const text = document.createElement("p");
        name.textContent = entry.speaker;
        text.textContent = entry.text;
        item.append(name, text);
        historyList.appendChild(item);
      });
    }
    historyDialog.showModal();
  }

  function unlockSpeaker(speaker) {
    if (!speaker || speaker === "旁白") return;
    const character = story.characters.find((item) => item.speaker === speaker);
    if (!character || state.unlockedCharacters.includes(character.id)) return;
    state.unlockedCharacters.push(character.id);
    updateCharacterCount();
    window.setTimeout(() => showToast(`角色档案已更新：${character.name}`), 220);
  }

  function unlockCharacters(characterIds) {
    if (!Array.isArray(characterIds)) return;
    characterIds.forEach((characterId) => {
      const character = story.characters.find((item) => item.id === characterId);
      if (!character || state.unlockedCharacters.includes(character.id)) return;
      state.unlockedCharacters.push(character.id);
    });
    updateCharacterCount();
  }

  function inferUnlockedCharacters(history) {
    const speakers = new Set((history || []).map((entry) => entry.speaker));
    return story.characters
      .filter((character) => speakers.has(character.speaker))
      .map((character) => character.id);
  }

  function updateCharacterCount() {
    const count = state.unlockedCharacters.length;
    characterCount.textContent = count;
    charactersSummary.textContent = `已登记 ${count} / ${story.characters.length} 人`;
  }

  function showCharacters() {
    characterGrid.replaceChildren();

    story.characters.forEach((character, index) => {
      const unlocked = state.unlockedCharacters.includes(character.id);
      const card = document.createElement("article");
      card.className = `character-card ${unlocked ? "is-unlocked" : "is-locked"}`;

      const portrait = document.createElement("div");
      portrait.className = "character-card-portrait";

      if (unlocked && character.avatar) {
        const image = document.createElement("img");
        image.src = character.avatar;
        image.alt = `${character.name}头像`;
        portrait.appendChild(image);
      } else {
        const initials = document.createElement("span");
        initials.textContent = unlocked ? character.initials : "?";
        portrait.appendChild(initials);
      }

      const number = document.createElement("small");
      number.className = "character-index";
      number.textContent = String(index + 1).padStart(2, "0");

      const info = document.createElement("div");
      info.className = "character-card-info";

      const chineseName = document.createElement("h3");
      chineseName.textContent = unlocked ? character.name : "？？？";

      const englishName = document.createElement("p");
      englishName.className = "character-english";
      englishName.textContent = unlocked ? character.english : "尚未登场";

      const role = document.createElement("p");
      role.className = "character-role";
      role.textContent = unlocked ? character.role : "身份未确认";

      const status = document.createElement("span");
      status.className = "character-status";
      status.textContent = unlocked ? "已登记" : "未登记";

      portrait.append(number);
      info.append(chineseName, englishName, role);
      card.append(portrait, info, status);
      characterGrid.appendChild(card);
    });

    updateCharacterCount();
    charactersDialog.showModal();
  }

  function updateClueCount() {
    const count = state.evidence.length;
    clueCount.textContent = count;
    cluesSummary.textContent = `已收集 ${count} 条线索`;
  }

  function showInterrogation() {
    const profiles = story.interrogations || {};
    const available = Object.entries(profiles).filter(([id]) => state.unlockedCharacters.includes(id));
    interrogateWitness.replaceChildren();

    if (!available.length) {
      const option = document.createElement("option");
      option.textContent = "尚无可审问证人";
      option.value = "";
      interrogateWitness.appendChild(option);
      interrogateQuestion.disabled = true;
      $("#ask-interrogate").disabled = true;
    } else {
      available.forEach(([id, profile]) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = profile.name;
        interrogateWitness.appendChild(option);
      });
      interrogateQuestion.disabled = false;
      $("#ask-interrogate").disabled = false;
    }

    interrogateQuestion.value = "";
    interrogateResponse.innerHTML = "<p>输入问题。证人不会主动交代全部秘密，也可能用含糊回答保护自己。</p>";
    interrogateDialog.showModal();
    if (available.length) window.setTimeout(() => interrogateQuestion.focus(), 50);
  }

  function askInterrogation() {
    const witnessId = interrogateWitness.value;
    const question = interrogateQuestion.value.trim();
    const profile = story.interrogations?.[witnessId];
    if (!profile || !question) {
      showToast("请先选择证人并输入问题");
      return;
    }

    const normalized = question.toLowerCase();
    const topic = profile.topics.find((item) => item.keys.some((key) => normalized.includes(key.toLowerCase())));
    let answer;
    if (topic) {
      answer = topic.answer;
      if (topic.evidence && !state.evidence.includes(topic.evidence)) {
        state.evidence.push(topic.evidence);
        updateClueCount();
        showToast(`获得线索：${topic.evidence}`);
      }
    } else if (/你是谁|身份|职业/.test(question)) {
      answer = profile.identity;
    } else if (/记得|记忆/.test(question)) {
      answer = profile.memory;
    } else if (/秘密|隐瞒|撒谎/.test(question)) {
      answer = "我已经回答了与你现有证据有关的部分。若你认为我隐瞒了什么，请指出具体物件、日期或姓名。";
    } else {
      answer = "这个问题太宽泛了。请说出具体的人名、日期或证物；我只回答自己真正看见、听见或记录过的事。";
    }

    const asked = state.interrogations[witnessId] || [];
    asked.push({ question, answer });
    state.interrogations[witnessId] = asked.slice(-20);
    recordHistory(`自由审问 · ${profile.name}`, `问：${question}\n答：${answer}`);
    interrogateResponse.replaceChildren();
    const name = document.createElement("strong");
    name.textContent = profile.name;
    const text = document.createElement("p");
    text.textContent = answer;
    interrogateResponse.append(name, text);
    interrogateQuestion.value = "";
    interrogateQuestion.focus();
  }

  function showClues() {
    clueList.replaceChildren();

    if (!state.evidence.length) {
      const empty = document.createElement("div");
      empty.className = "clue-empty";
      const mark = document.createElement("span");
      mark.textContent = "∅";
      const title = document.createElement("h3");
      title.textContent = "尚未获得线索";
      const copy = document.createElement("p");
      copy.textContent = "调查场景并完成选择，新的观察和证物会自动归入这里。";
      empty.append(mark, title, copy);
      clueList.appendChild(empty);
    } else {
      state.evidence.forEach((name, index) => {
        const clue = story.clues.find((item) => item.name === name) || {
          name,
          category: "线索",
          source: "调查过程中获得",
          description: "这条线索尚未补充详细说明。"
        };

        const card = document.createElement("article");
        card.className = "clue-card";

        const docket = document.createElement("div");
        docket.className = "clue-docket";
        const number = document.createElement("span");
        number.textContent = `E-${String(index + 1).padStart(2, "0")}`;
        const category = document.createElement("small");
        category.textContent = clue.category;
        docket.append(number, category);

        const content = document.createElement("div");
        content.className = "clue-card-content";
        const title = document.createElement("h3");
        title.textContent = clue.name;
        const source = document.createElement("p");
        source.className = "clue-source";
        source.textContent = clue.source;
        const description = document.createElement("p");
        description.className = "clue-description";
        description.textContent = clue.description;
        content.append(title, source, description);

        const seal = document.createElement("span");
        seal.className = "evidence-seal";
        seal.textContent = "已收录";
        card.append(docket, content, seal);
        clueList.appendChild(card);
      });
    }

    updateClueCount();
    cluesDialog.showModal();
  }

  function showSettings() {
    settingsDialog.showModal();
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function updateContinueButton() {
    $("#continue-game").disabled = !localStorage.getItem(saveKey);
  }

  function returnToTitle() {
    clearTyping();
    clearChapterTransition();
    renderedChapter = null;
    gameScreen.classList.add("is-hidden");
    titleScreen.classList.remove("is-hidden");
    updateContinueButton();
    switchMusic("nocturne");
  }

  $("#new-game").addEventListener("click", () => startGame(false));
  $("#continue-game").addEventListener("click", loadGame);
  $("#advance-button").addEventListener("click", (event) => {
    event.stopPropagation();
    advance();
  });
  dialogueBox.addEventListener("click", advance);
  $("#settings-button").addEventListener("click", showSettings);
  $("#close-settings").addEventListener("click", () => settingsDialog.close());
  finishInvestigation.addEventListener("click", finishCurrentInvestigation);
  $("#close-investigation-result").addEventListener("click", () => investigationDialog.close());
  musicToggle.addEventListener("click", () => {
    audioSettings.enabled = !audioSettings.enabled;
    saveAudioSettings();
    if (audioSettings.enabled) {
      updateMusicUI();
      const node = story.nodes[state.nodeId];
      if (node) updateMusicForNode(node, true);
    } else {
      stopMusic();
    }
  });
  musicVolume.addEventListener("input", () => {
    audioSettings.volume = Number(musicVolume.value) / 100;
    musicVolumeValue.textContent = `${musicVolume.value}%`;
    musicDecks[activeDeck].volume = audioSettings.enabled ? audioSettings.volume : 0;
    saveAudioSettings();
  });
  $("#save-button").addEventListener("click", () => {
    settingsDialog.close();
    saveGame();
  });
  $("#load-button").addEventListener("click", () => {
    settingsDialog.close();
    loadGame();
  });
  $("#menu-button").addEventListener("click", () => {
    settingsDialog.close();
    returnToTitle();
  });
  $("#history-button").addEventListener("click", showHistory);
  $("#close-history").addEventListener("click", () => historyDialog.close());
  $("#characters-button").addEventListener("click", showCharacters);
  $("#close-characters").addEventListener("click", () => charactersDialog.close());
  $("#clues-button").addEventListener("click", showClues);
  $("#close-clues").addEventListener("click", () => cluesDialog.close());
  $("#interrogate-button").addEventListener("click", showInterrogation);
  $("#close-interrogate").addEventListener("click", () => interrogateDialog.close());
  $("#ask-interrogate").addEventListener("click", askInterrogation);
  interrogateQuestion.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      askInterrogation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (gameScreen.classList.contains("is-hidden") || historyDialog.open || charactersDialog.open || cluesDialog.open || settingsDialog.open || investigationDialog.open || interrogateDialog.open) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      advance();
    }
  });

  document.addEventListener("pointerdown", () => {
    if (!audioSettings.enabled || currentTrackId || gameScreen.classList.contains("is-hidden")) return;
    const node = story.nodes[state.nodeId];
    if (node) updateMusicForNode(node, true);
  }, { passive: true });

  updateContinueButton();
  updateClueCount();
  updateMusicUI();
})();

