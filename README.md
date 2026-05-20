# 三国风云：霸业 | Three Kingdoms: Hegemony

**中文** | [English](#english)

一款三国主题的增量游戏（Incremental/Idle Game），使用纯 HTML/CSS/JavaScript 开发。

## 游戏特色

- **综合策略玩法**：管理粮草、兵力、金币、领土、声望五大资源
- **6种建筑**：农田、兵营、市场、校场、聚贤庄、城池
- **12名武将**：关羽、诸葛亮、曹操、刘备、孙权等名将可招募
- **势力选择**：魏/蜀/吴三种势力，各有独特加成
- **历史事件**：黄巾之乱、赤壁之战、官渡之战等经典事件
- **水墨风格**：中国传统水墨画视觉风格
- **离线进度**：支持离线收益计算（最多8小时）
- **存档系统**：自动存档 + 导出/导入功能

## 技术栈

- 原生 HTML5 / CSS3 / JavaScript (ES6+)
- 无框架依赖
- localStorage 存档

## 快速开始

**在线游玩**：https://1807781577.github.io/sanguo-chronicles/

或者直接在浏览器中打开 `index.html` 即可游玩。

## 项目结构

```
├── index.html          # 主页面
├── css/
│   └── style.css       # 水墨风样式
├── js/
│   ├── config.js       # 游戏配置（建筑、武将、事件数据）
│   ├── state.js        # 游戏状态管理
│   ├── game.js         # 核心游戏循环
│   ├── ui.js           # UI渲染（增量DOM更新）
│   ├── save.js         # 存档系统
│   └── utils.js        # 工具函数
└── assets/
```

## 开发日志

### v0.1.0 (2026-05-20) - 初始版本

**核心系统**
- [x] 资源系统（粮草、兵力、金币、领土、声望）
- [x] 建筑系统（6种建筑，成本递增机制）
- [x] 武将系统（12名武将，SSR/SR/R品质）
- [x] 势力选择（魏/蜀/吴）
- [x] 历史事件（6个里程碑事件）
- [x] 游戏循环（requestAnimationFrame + delta time）
- [x] 离线进度计算
- [x] 存档系统（自动存档、导出/导入）

**已知问题**
- 数值平衡待优化
- 攻城系统（Prestige机制）待实现
- 缺少音效和动画

---

<a name="english"></a>

# Three Kingdoms: Hegemony

An incremental/idle game set in the Three Kingdoms era, built with pure HTML/CSS/JavaScript.

## Features

- **Strategy Gameplay**: Manage 5 resources - Grain, Soldiers, Gold, Territory, Prestige
- **6 Buildings**: Farm, Barracks, Market, Training Ground, Hero Hall, City
- **12 Heroes**: Recruit famous generals like Guan Yu, Zhuge Liang, Cao Cao, Liu Bei, Sun Quan
- **Faction Choice**: Wei / Shu / Wu, each with unique bonuses
- **Historical Events**: Yellow Turban Rebellion, Battle of Red Cliffs, Battle of Guandu, etc.
- **Ink Wash Art Style**: Traditional Chinese visual aesthetic
- **Offline Progress**: Earn resources while away (up to 8 hours)
- **Save System**: Auto-save + Export/Import functionality

## Tech Stack

- Native HTML5 / CSS3 / JavaScript (ES6+)
- No framework dependencies
- localStorage for save data

## Quick Start

**Play Online**: https://1807781577.github.io/sanguo-chronicles/

Or simply open `index.html` in your browser.

## Project Structure

```
├── index.html          # Main page
├── css/
│   └── style.css       # Ink wash style CSS
├── js/
│   ├── config.js       # Game config (buildings, heroes, events)
│   ├── state.js        # Game state management
│   ├── game.js         # Core game loop
│   ├── ui.js           # UI rendering (incremental DOM updates)
│   ├── save.js         # Save system
│   └── utils.js        # Utility functions
└── assets/
```

## Changelog

### v0.1.0 (2026-05-20) - Initial Release

**Core Systems**
- [x] Resource system (Grain, Soldiers, Gold, Territory, Prestige)
- [x] Building system (6 buildings with escalating costs)
- [x] Hero system (12 heroes, SSR/SR/R rarity)
- [x] Faction selection (Wei/Shu/Wu)
- [x] Historical events (6 milestone events)
- [x] Game loop (requestAnimationFrame + delta time)
- [x] Offline progress calculation
- [x] Save system (auto-save, export/import)

**Known Issues**
- Number balancing needs optimization
- Conquest system (Prestige mechanic) not yet implemented
- Missing sound effects and animations

## License

MIT
