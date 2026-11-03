# 《第十三位证人》浏览器游戏

> 状态：方案 A 第一版完整剧本已经接入序章与第一章；所有正式台词、选项和顺序均可追溯到 A1 原稿。

## 运行

双击 `index.html`，使用常见桌面浏览器打开即可。不需要安装依赖。

当前包含：

- A1 原稿序章《没有写名字的邀请函》
- A1 原稿第一章《第十二份证词》
- 原始选择1的三个选项
- A分支沿用原稿；B/C分支采用用户确认的13号开发补写稿
- 三条分支分别获得“第一发现者”“十月二十七日会面”“预先封好的第十三封信”
- 角色档案：角色在场景中登场后点亮
- 线索档案、调查记录、本地保存与读取
- 庄园门前、门厅、书房和证物特写场景占位
- 左侧透明角色立绘预留位
- 手机和桌面自适应布局

## 来源规则

- 场景、对白、选择和顺序：`../project_docs_v3/10_Scheme_A_Original_Script.md`
- 最终案件事实修订：`../project_docs_v3/10B_Scheme_A_Final_Case_Setting.md`
- 冲突与开放项：`../project_docs_v3/11_Contradictions_and_Open_Questions.md`
- 实施准入：`../project_docs_v3/12_Development_Implementation.md`

## 替换角色立绘

1. 将透明 PNG 放入 `assets/characters/`。
2. 在 `story.js` 对应对白节点填写：

```js
portrait: "./assets/characters/ivy-neutral.png"
```

## 替换正式背景

当前背景由 CSS 生成。正式图片准备好后，可在 `styles.css` 的场景类中添加背景图：

- `.scene-manor`：庄园外景
- `.scene-hall`：门厅与走廊
- `.scene-study`：书房
- `.scene-closeup`：信件、尸体与证物特写

## 后续接入限制

选择2–9的缺失分支已经在13号文档中确认；第二章起将依次接入。第六、七章使用14号锁定的身份鉴定、冰窖和邀请函答案完成真相桥接。

冻结状态版已备份到 `../drafts/content_freeze_game/`；旧 Codex 改编仍位于 `../drafts/unapproved_adaptation/game/`，两者都不会被正式游戏读取。

