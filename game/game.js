(() => {
  "use strict";

  const story = window.GAME_STORY;
  const saveKey = "thirteenth-witness-save-v1";
  const state = {
    nodeId: story.start,
    variables: {
      edward_trust: 0,
      witness_trust: 0,
      independent_evidence: 0,
      contaminated_testimony: 0
    },
    evidence: [],
    history: [],
    unlockedCharacters: [],
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
  const sceneLabel = $("#scene-label");
  const chapterKicker = $("#chapter-kicker");
  const chapterTitle = $("#chapter-title");
  const caseNumber = $("#case-number");
  const choicePanel = $("#choice-panel");
  const choicePrompt = $("#choice-prompt");
  const choiceList = $("#choice-list");
  const portraitSlot = $("#portrait-slot");
  const portraitImage = $("#portrait-image");
  const progressFill = $("#progress-fill");
  const historyDialog = $("#history-dialog");
  const historyList = $("#history-list");
  const charactersDialog = $("#characters-dialog");
  const characterGrid = $("#character-grid");
  const characterCount = $("#character-count");
  const charactersSummary = $("#characters-summary");
  const toast = $("#toast");

  function startGame(fromSave = false) {
    if (!fromSave) resetState();
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
      contaminated_testimony: 0
    };
    state.evidence = [];
    state.history = [];
    state.unlockedCharacters = [];
    updateCharacterCount();
  }

  function renderNode() {
    const node = story.nodes[state.nodeId];
    if (!node) return;

    clearTyping();
    unlockSpeaker(node.speaker);
    applyPresentation(node);
    updateProgress();

    if (node.choice) {
      showChoices(node);
      dialogueBox.classList.add("is-hidden");
      return;
    }

    choicePanel.classList.add("is-hidden");
    dialogueBox.classList.remove("is-hidden");
    speakerName.textContent = node.speaker || "旁白";
    sceneLabel.textContent = node.place || "";
    dialogueText.classList.toggle("is-narration", node.speaker === "旁白");

    if (node.evidence && !state.evidence.includes(node.evidence)) {
      state.evidence.push(node.evidence);
      showToast(`获得线索：${node.evidence}`);
    }

    typeText(node.text || "");
  }

  function applyPresentation(node) {
    const chapter = story.chapters[node.chapter] || story.chapters.prologue;
    chapterKicker.textContent = chapter.kicker;
    chapterTitle.textContent = chapter.title;
    caseNumber.textContent = chapter.caseNumber;

    scene.className = `scene scene-${node.scene || "manor"}`;

    if (node.portrait) {
      portraitImage.src = node.portrait;
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
    if (!node || node.choice) return;

    if (state.typing) {
      finishTyping();
      return;
    }

    recordHistory(node.speaker, node.text);

    if (node.end) {
      showToast("原型内容已播放完毕");
      return;
    }

    if (node.next) {
      state.nodeId = node.next;
      renderNode();
    }
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
    state.nodeId = option.next;
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
      state.nodeId = payload.nodeId || story.start;
      state.variables = { ...state.variables, ...(payload.variables || {}) };
      state.evidence = Array.isArray(payload.evidence) ? payload.evidence : [];
      state.history = Array.isArray(payload.history) ? payload.history : [];
      state.unlockedCharacters = Array.isArray(payload.unlockedCharacters)
        ? payload.unlockedCharacters
        : inferUnlockedCharacters(state.history);
      updateCharacterCount();
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
        initials.textContent = unlocked ? character.initials : "—";
        portrait.appendChild(initials);
      }

      const number = document.createElement("small");
      number.className = "character-index";
      number.textContent = String(index + 1).padStart(2, "0");

      const info = document.createElement("div");
      info.className = "character-card-info";

      const chineseName = document.createElement("h3");
      chineseName.textContent = character.name;

      const englishName = document.createElement("p");
      englishName.className = "character-english";
      englishName.textContent = character.english;

      const role = document.createElement("p");
      role.className = "character-role";
      role.textContent = character.role;

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
    gameScreen.classList.add("is-hidden");
    titleScreen.classList.remove("is-hidden");
    updateContinueButton();
  }

  $("#new-game").addEventListener("click", () => startGame(false));
  $("#continue-game").addEventListener("click", loadGame);
  $("#advance-button").addEventListener("click", (event) => {
    event.stopPropagation();
    advance();
  });
  dialogueBox.addEventListener("click", advance);
  $("#save-button").addEventListener("click", saveGame);
  $("#load-button").addEventListener("click", loadGame);
  $("#menu-button").addEventListener("click", returnToTitle);
  $("#history-button").addEventListener("click", showHistory);
  $("#close-history").addEventListener("click", () => historyDialog.close());
  $("#characters-button").addEventListener("click", showCharacters);
  $("#close-characters").addEventListener("click", () => charactersDialog.close());

  document.addEventListener("keydown", (event) => {
    if (gameScreen.classList.contains("is-hidden") || historyDialog.open || charactersDialog.open) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      advance();
    }
  });

  updateContinueButton();
})();
