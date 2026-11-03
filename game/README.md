# 《第十三位证人》浏览器游戏

> 状态：方案 A 开发实施版已接入序章、全七章、十次选择与五个结局。

## 运行

双击 `index.html`，使用常见桌面浏览器打开即可。不需要安装依赖。

当前包含：

- A1 原稿的章节顺序、主要场景、A分支与正式选择句
- 用户确认的13号开发补写稿全部选择分支
- 14号锁定决议中的温室事故、冰窖时间线、身份鉴定与邀请函真相
- 十次正式选择、分支变量、线索回流与五个结局
- 角色档案：角色在场景中登场后点亮
- 线索档案、调查记录、本地保存与读取
- 庄园外景、大厅、书房、会客厅、档案室、卧室、餐厅、温室、冰窖和清晨场景占位
- 左侧透明角色立绘预留位
- 场景名位于画面顶部中央；底部左侧显示人物姓名与简短身份
- 右上角“设置”集中提供保存、读取和退出
- 六首古典配乐按章节自动切换、循环和淡入淡出；设置中可开关并调节音量
- 序章、每一章和终幕进入前显示全屏章节标题，并缓慢淡出进入剧情
- 六个可交互搜查场景；背景上的放大镜热点完成后才能继续剧情

## 搜查场景与背景物品

- 书房：古董钟、红茶杯、扶手椅、地毯拖痕。
- 肖像长廊：十二幅肖像、空画框、缺失铭牌、画框背面刻痕。
- 旧档案室：访客登记册、被撕页面、V-1877-13空书架、姓名索引卡。
- 庄园主卧室：上锁抽屉、童年照片、写给爱德华的信、旧实验记录。
- 旧温室：松动石阶、清洗过的血迹、壁炉文件灰烬、争执擦痕。
- 地下冰窖：北墙旧门、冷室温度计、亚麻布纤维、搬运架痕迹。

每个热点在 `story.js` 中以百分比坐标 `x`、`y` 定位。替换正式背景后，只需调整对应物品的坐标，不需要修改搜查程序。
- 手机和桌面自适应布局

## 来源规则

- 场景、对白、选择和顺序：`../project_docs_v3/10_Scheme_A_Original_Script.md`
- 最终案件事实修订：`../project_docs_v3/10B_Scheme_A_Final_Case_Setting.md`
- 冲突与开放项：`../project_docs_v3/11_Contradictions_and_Open_Questions.md`
- 实施准入：`../project_docs_v3/12_Development_Implementation.md`
- 已批准分支：`../project_docs_v3/13_Development_Branch_Script.md`
- 最终锁定答案：`../project_docs_v3/14_Locked_Resolutions.md`

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
- `.scene-drawing`、`.scene-archive`、`.scene-bedroom`、`.scene-dining`：室内章节场景
- `.scene-greenhouse`、`.scene-icehouse`、`.scene-dawn`：关键真相与结局场景

## 内容边界

原始方案 A 文档保持逐字存档；游戏读取的是经过用户确认的开发实施层。没有把背景开放项擅自写入既定事实。

冻结状态版已备份到 `../drafts/content_freeze_game/`；旧 Codex 改编仍位于 `../drafts/unapproved_adaptation/game/`，两者都不会被正式游戏读取。

