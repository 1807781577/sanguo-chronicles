// 游戏配置 - 建筑、武将、历史事件定义

const BUILDINGS = {
    farm: {
        id: 'farm',
        name: '农田',
        description: '生产粮草的基础建筑',
        baseCost: { gold: 10 },
        baseProduction: { grain: 1 },
        costMultiplier: 1.15,
        unlockPrestige: 0
    },
    barracks: {
        id: 'barracks',
        name: '兵营',
        description: '消耗粮草训练士兵',
        baseCost: { grain: 100, gold: 50 },
        baseProduction: { soldiers: 0.5 },
        costMultiplier: 1.15,
        unlockPrestige: 0
    },
    market: {
        id: 'market',
        name: '市场',
        description: '贸易往来，产出金币',
        baseCost: { grain: 200 },
        baseProduction: { gold: 0.2 },
        costMultiplier: 1.15,
        unlockPrestige: 0
    },
    training_ground: {
        id: 'training_ground',
        name: '校场',
        description: '提升士兵训练效率',
        baseCost: { gold: 500, soldiers: 100 },
        baseProduction: { soldiers: 2 },
        costMultiplier: 1.15,
        unlockPrestige: 0,
        bonus: { soldierMultiplier: 0.1 }
    },
    hero_hall: {
        id: 'hero_hall',
        name: '聚贤庄',
        description: '招募天下名将',
        baseCost: { gold: 1000, prestige: 50 },
        baseProduction: { prestige: 0.1 },
        costMultiplier: 1.2,
        unlockPrestige: 0,
        unlocksHeroes: true
    },
    city: {
        id: 'city',
        name: '城池',
        description: '扩张领土，产出大量资源',
        baseCost: { soldiers: 1000, gold: 2000 },
        baseProduction: { gold: 5, grain: 10 },
        costMultiplier: 1.25,
        unlockPrestige: 100,
        producesTerritory: true
    }
};

const HEROES = [
    {
        id: 'guanyu',
        name: '关羽',
        quality: 'ssr',
        bonus: { soldierMultiplier: 0.2 },
        bonusDesc: '士兵训练 +20%',
        cost: { prestige: 500, gold: 5000 },
        unlockPrestige: 100
    },
    {
        id: 'zhuge_liang',
        name: '诸葛亮',
        quality: 'ssr',
        bonus: { grainMultiplier: 0.3, goldMultiplier: 0.2 },
        bonusDesc: '粮草生产 +30%, 金币 +20%',
        cost: { prestige: 600, gold: 6000 },
        unlockPrestige: 150
    },
    {
        id: 'zhangfei',
        name: '张飞',
        quality: 'sr',
        bonus: { soldierMultiplier: 0.15 },
        bonusDesc: '士兵训练 +15%',
        cost: { prestige: 300, gold: 3000 },
        unlockPrestige: 80
    },
    {
        id: 'zhaoyun',
        name: '赵云',
        quality: 'sr',
        bonus: { soldierMultiplier: 0.12, goldMultiplier: 0.1 },
        bonusDesc: '士兵训练 +12%, 金币 +10%',
        cost: { prestige: 350, gold: 3500 },
        unlockPrestige: 90
    },
    {
        id: 'huangzhong',
        name: '黄忠',
        quality: 'sr',
        bonus: { soldierMultiplier: 0.1 },
        bonusDesc: '士兵训练 +10%',
        cost: { prestige: 250, gold: 2500 },
        unlockPrestige: 70
    },
    {
        id: 'caocao',
        name: '曹操',
        quality: 'ssr',
        bonus: { goldMultiplier: 0.25, prestigeMultiplier: 0.15 },
        bonusDesc: '金币 +25%, 声望 +15%',
        cost: { prestige: 800, gold: 8000 },
        unlockPrestige: 200
    },
    {
        id: 'sunquan',
        name: '孙权',
        quality: 'ssr',
        bonus: { grainMultiplier: 0.2, goldMultiplier: 0.2 },
        bonusDesc: '粮草 +20%, 金币 +20%',
        cost: { prestige: 700, gold: 7000 },
        unlockPrestige: 180
    },
    {
        id: 'liubei',
        name: '刘备',
        quality: 'ssr',
        bonus: { prestigeMultiplier: 0.25, soldierMultiplier: 0.15 },
        bonusDesc: '声望 +25%, 士兵 +15%',
        cost: { prestige: 900, gold: 9000 },
        unlockPrestige: 250
    },
    {
        id: 'dianwei',
        name: '典韦',
        quality: 'r',
        bonus: { soldierMultiplier: 0.08 },
        bonusDesc: '士兵训练 +8%',
        cost: { prestige: 150, gold: 1500 },
        unlockPrestige: 50
    },
    {
        id: 'xiahoudun',
        name: '夏侯惇',
        quality: 'r',
        bonus: { soldierMultiplier: 0.07, grainMultiplier: 0.05 },
        bonusDesc: '士兵 +7%, 粮草 +5%',
        cost: { prestige: 180, gold: 1800 },
        unlockPrestige: 60
    },
    {
        id: 'guojia',
        name: '郭嘉',
        quality: 'sr',
        bonus: { goldMultiplier: 0.15, prestigeMultiplier: 0.1 },
        bonusDesc: '金币 +15%, 声望 +10%',
        cost: { prestige: 400, gold: 4000 },
        unlockPrestige: 100
    },
    {
        id: 'zhouyu',
        name: '周瑜',
        quality: 'sr',
        bonus: { goldMultiplier: 0.18, grainMultiplier: 0.12 },
        bonusDesc: '金币 +18%, 粮草 +12%',
        cost: { prestige: 450, gold: 4500 },
        unlockPrestige: 120
    }
];

const HISTORICAL_EVENTS = [
    {
        id: 'yellow_turban',
        name: '黄巾之乱',
        description: '天下大乱，群雄并起',
        trigger: { soldiers: 1000 },
        reward: { prestige: 100 },
        rewardDesc: '声望 +100'
    },
    {
        id: 'coalition',
        name: '讨董联盟',
        description: '十八路诸侯讨伐董卓',
        trigger: { soldiers: 10000, prestige: 200 },
        reward: { prestige: 300, gold: 5000 },
        rewardDesc: '声望 +300, 金币 +5000'
    },
    {
        id: 'chibi',
        name: '赤壁之战',
        description: '火烧连营，以少胜多',
        trigger: { soldiers: 50000, prestige: 500 },
        reward: { prestige: 1000, territory: 5 },
        rewardDesc: '声望 +1000, 领土 +5'
    },
    {
        id: 'guandu',
        name: '官渡之战',
        description: '奇袭乌巢，大破袁绍',
        trigger: { soldiers: 100000, gold: 50000 },
        reward: { prestige: 2000, territory: 10 },
        rewardDesc: '声望 +2000, 领土 +10'
    },
    {
        id: 'yiling',
        name: '夷陵之战',
        description: '火烧连营七百里',
        trigger: { soldiers: 200000, territory: 20 },
        reward: { prestige: 3000, gold: 20000 },
        rewardDesc: '声望 +3000, 金币 +20000'
    },
    {
        id: 'northern_expedition',
        name: '北伐中原',
        description: '出师未捷身先死',
        trigger: { soldiers: 500000, prestige: 5000 },
        reward: { prestige: 5000, territory: 20 },
        rewardDesc: '声望 +5000, 领土 +20'
    }
];

const FACTIONS = {
    wei: {
        id: 'wei',
        name: '魏',
        description: '金币产出 +10%',
        bonuses: { goldMultiplier: 0.1 }
    },
    shu: {
        id: 'shu',
        name: '蜀',
        description: '声望获取 +10%',
        bonuses: { prestigeMultiplier: 0.1 }
    },
    wu: {
        id: 'wu',
        name: '吴',
        description: '粮草生产 +10%',
        bonuses: { grainMultiplier: 0.1 }
    }
};

const SAVE_VERSION = 1;
const SAVE_KEY = 'sanguo_incremental_save';
const AUTOSAVE_INTERVAL = 30000; // 30秒
