# 《第十三位证人》浏览器可玩原型

## 运行

双击 `index.html`，使用常见桌面浏览器打开即可。不需要安装依赖。

当前包含：

- 标题画面
- 序章《第十三封邀请函》
- 第一章《一个名字的尸体》
- 三组正式选择
- 对话逐字显示
- 调查记录
- 角色档案：角色登场后自动点亮，未登场角色保持灰色
- 线索档案：选择后获得的线索会自动收录，并显示类别、来源和推理说明
- 本地保存与读取
- 庄园门前、门厅、书房、证物特写四种场景占位
- 左侧角色立绘预留位
- 手机和桌面自适应布局

## 替换角色立绘

1. 将透明 PNG 放入 `assets/characters/`。
2. 在 `story.js` 对应对白节点填写：

```js
portrait: "./assets/characters/ivy-neutral.png"
```

建议立绘为透明背景、人物脚部贴近画布底部。页面会自动将图片放入左侧预留位置。

## 替换正式背景

目前背景由 CSS 生成，所以即使没有素材也能运行。正式图片准备好后，可以在 `styles.css` 的场景类中加入：

```css
.scene-study .scene-art {
  background-image:
    linear-gradient(rgba(8, 13, 17, .2), rgba(8, 13, 17, .55)),
    url("./assets/backgrounds/study.webp");
  background-size: cover;
  background-position: center;
}
```

对应场景类：

- `.scene-manor`：庄园外景
- `.scene-hall`：门厅与走廊
- `.scene-study`：书房
- `.scene-closeup`：信件、尸体与证物特写

## 文件说明

- `index.html`：游戏画面结构
- `styles.css`：视觉风格和布局
- `story.js`：剧本、选择和变量
- `game.js`：播放、存档、历史记录等功能
- `assets/`：后续角色、背景和音频素材

下一制作阶段是第二章的十二位证人询问，以及证词卡和时间线整理界面。
