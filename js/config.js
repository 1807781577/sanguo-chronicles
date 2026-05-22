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
        productionGrowth: { gold: 0.15 },
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
    // ===== 黄巾之乱 =====
    { id: 'zhangjiao', name: '张角', quality: 'sr', bonus: { grainMultiplier: 0.15 }, bonusDesc: '粮草 +15%', cost: { prestige: 200, gold: 2000 }, unlockEvent: 'yellow_turban' },
    { id: 'zhangbao', name: '张宝', quality: 'r', bonus: { grainMultiplier: 0.05 }, bonusDesc: '粮草 +5%', cost: { prestige: 120, gold: 1200 }, unlockEvent: 'yellow_turban' },
    { id: 'zhangliang', name: '张梁', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 120, gold: 1200 }, unlockEvent: 'yellow_turban' },
    { id: 'liubei', name: '刘备', quality: 'ssr', bonus: { prestigeMultiplier: 0.25, soldierMultiplier: 0.15 }, bonusDesc: '声望 +25%, 士兵 +15%', cost: { prestige: 500, gold: 5000 }, unlockEvent: 'yellow_turban' },
    { id: 'guanyu', name: '关羽', quality: 'ssr', bonus: { soldierMultiplier: 0.2 }, bonusDesc: '士兵 +20%', cost: { prestige: 500, gold: 5000 }, unlockEvent: 'yellow_turban' },
    { id: 'zhangfei', name: '张飞', quality: 'sr', bonus: { soldierMultiplier: 0.15 }, bonusDesc: '士兵 +15%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'yellow_turban' },
    { id: 'gongsunzan', name: '公孙瓒', quality: 'sr', bonus: { soldierMultiplier: 0.1, goldMultiplier: 0.05 }, bonusDesc: '士兵 +10%, 金币 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'yellow_turban' },
    { id: 'huangfusong', name: '皇甫嵩', quality: 'sr', bonus: { soldierMultiplier: 0.12 }, bonusDesc: '士兵 +12%', cost: { prestige: 250, gold: 2500 }, unlockEvent: 'yellow_turban' },
    { id: 'luzhi', name: '卢植', quality: 'sr', bonus: { prestigeMultiplier: 0.1, grainMultiplier: 0.05 }, bonusDesc: '声望 +10%, 粮草 +5%', cost: { prestige: 250, gold: 2500 }, unlockEvent: 'yellow_turban' },
    { id: 'chengyuanzhi', name: '程远志', quality: 'n', bonus: { soldierMultiplier: 0.03 }, bonusDesc: '士兵 +3%', cost: { prestige: 50, gold: 500 }, unlockEvent: 'yellow_turban' },
    { id: 'gaosheng', name: '高升', quality: 'n', bonus: { grainMultiplier: 0.03 }, bonusDesc: '粮草 +3%', cost: { prestige: 50, gold: 500 }, unlockEvent: 'yellow_turban' },
    { id: 'yanzheng', name: '严政', quality: 'n', bonus: { goldMultiplier: 0.03 }, bonusDesc: '金币 +3%', cost: { prestige: 50, gold: 500 }, unlockEvent: 'yellow_turban' },
    { id: 'yuji', name: '于吉', quality: 'sr', bonus: { prestigeMultiplier: 0.12, grainMultiplier: 0.08 }, bonusDesc: '声望 +12%, 粮草 +8%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'yellow_turban' },

    // ===== 讨董联盟 =====
    { id: 'lvbu', name: '吕布', quality: 'ssr', bonus: { soldierMultiplier: 0.25 }, bonusDesc: '士兵 +25%', cost: { prestige: 600, gold: 6000 }, unlockEvent: 'coalition' },
    { id: 'dongzhuo', name: '董卓', quality: 'ssr', bonus: { goldMultiplier: 0.2, soldierMultiplier: 0.1 }, bonusDesc: '金币 +20%, 士兵 +10%', cost: { prestige: 600, gold: 6000 }, unlockEvent: 'coalition' },
    { id: 'diaochan', name: '貂蝉', quality: 'ssr', bonus: { goldMultiplier: 0.15, prestigeMultiplier: 0.15 }, bonusDesc: '金币 +15%, 声望 +15%', cost: { prestige: 550, gold: 5500 }, unlockEvent: 'coalition' },
    { id: 'caocao', name: '曹操', quality: 'ssr', bonus: { goldMultiplier: 0.25, prestigeMultiplier: 0.15 }, bonusDesc: '金币 +25%, 声望 +15%', cost: { prestige: 800, gold: 8000 }, unlockEvent: 'coalition' },
    { id: 'yuanshao', name: '袁绍', quality: 'sr', bonus: { soldierMultiplier: 0.12, prestigeMultiplier: 0.08 }, bonusDesc: '士兵 +12%, 声望 +8%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'coalition' },
    { id: 'yuanshu', name: '袁术', quality: 'sr', bonus: { goldMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +10%, 声望 +5%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'coalition' },
    { id: 'sunjian', name: '孙坚', quality: 'sr', bonus: { soldierMultiplier: 0.15, grainMultiplier: 0.05 }, bonusDesc: '士兵 +15%, 粮草 +5%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'coalition' },
    { id: 'huaxiong', name: '华雄', quality: 'sr', bonus: { soldierMultiplier: 0.1 }, bonusDesc: '士兵 +10%', cost: { prestige: 250, gold: 2500 }, unlockEvent: 'coalition' },
    { id: 'wangyun', name: '王允', quality: 'sr', bonus: { prestigeMultiplier: 0.1 }, bonusDesc: '声望 +10%', cost: { prestige: 250, gold: 2500 }, unlockEvent: 'coalition' },
    { id: 'chengong', name: '陈宫', quality: 'sr', bonus: { goldMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +10%, 声望 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'coalition' },
    { id: 'zhangliao', name: '张辽', quality: 'sr', bonus: { soldierMultiplier: 0.12 }, bonusDesc: '士兵 +12%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'coalition' },
    { id: 'lijue', name: '李傕', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'coalition' },
    { id: 'guosi', name: '郭汜', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'coalition' },
    { id: 'xurong', name: '徐荣', quality: 'r', bonus: { soldierMultiplier: 0.06, goldMultiplier: 0.03 }, bonusDesc: '士兵 +6%, 金币 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'coalition' },
    { id: 'lisu', name: '李肃', quality: 'r', bonus: { goldMultiplier: 0.05 }, bonusDesc: '金币 +5%', cost: { prestige: 120, gold: 1200 }, unlockEvent: 'coalition' },
    { id: 'wuxi', name: '伍习', quality: 'n', bonus: { soldierMultiplier: 0.03 }, bonusDesc: '士兵 +3%', cost: { prestige: 60, gold: 600 }, unlockEvent: 'coalition' },

    // ===== 群雄割据 =====
    { id: 'dianwei', name: '典韦', quality: 'r', bonus: { soldierMultiplier: 0.08 }, bonusDesc: '士兵 +8%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'warlords' },
    { id: 'xiahoudun', name: '夏侯惇', quality: 'r', bonus: { soldierMultiplier: 0.07, grainMultiplier: 0.05 }, bonusDesc: '士兵 +7%, 粮草 +5%', cost: { prestige: 180, gold: 1800 }, unlockEvent: 'warlords' },
    { id: 'xiahouyuan', name: '夏侯渊', quality: 'sr', bonus: { soldierMultiplier: 0.1, goldMultiplier: 0.05 }, bonusDesc: '士兵 +10%, 金币 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'warlords' },
    { id: 'xuchu', name: '许褚', quality: 'sr', bonus: { soldierMultiplier: 0.1 }, bonusDesc: '士兵 +10%', cost: { prestige: 260, gold: 2600 }, unlockEvent: 'warlords' },
    { id: 'guojia', name: '郭嘉', quality: 'sr', bonus: { goldMultiplier: 0.15, prestigeMultiplier: 0.1 }, bonusDesc: '金币 +15%, 声望 +10%', cost: { prestige: 400, gold: 4000 }, unlockEvent: 'warlords' },
    { id: 'xunyu', name: '荀彧', quality: 'sr', bonus: { goldMultiplier: 0.12, grainMultiplier: 0.08 }, bonusDesc: '金币 +12%, 粮草 +8%', cost: { prestige: 380, gold: 3800 }, unlockEvent: 'warlords' },
    { id: 'chengyu', name: '程昱', quality: 'r', bonus: { goldMultiplier: 0.08 }, bonusDesc: '金币 +8%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'warlords' },
    { id: 'sunce', name: '孙策', quality: 'ssr', bonus: { soldierMultiplier: 0.2, prestigeMultiplier: 0.1 }, bonusDesc: '士兵 +20%, 声望 +10%', cost: { prestige: 600, gold: 6000 }, unlockEvent: 'warlords' },
    { id: 'daqiao', name: '大乔', quality: 'sr', bonus: { grainMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '粮草 +10%, 声望 +5%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'warlords' },
    { id: 'xiaoqiao', name: '小乔', quality: 'sr', bonus: { goldMultiplier: 0.1, grainMultiplier: 0.05 }, bonusDesc: '金币 +10%, 粮草 +5%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'warlords' },
    { id: 'sunshangxiang', name: '孙尚香', quality: 'sr', bonus: { soldierMultiplier: 0.08, goldMultiplier: 0.06 }, bonusDesc: '士兵 +8%, 金币 +6%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'warlords' },
    { id: 'taishici', name: '太史慈', quality: 'sr', bonus: { soldierMultiplier: 0.12 }, bonusDesc: '士兵 +12%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'warlords' },
    { id: 'ganning', name: '甘宁', quality: 'sr', bonus: { soldierMultiplier: 0.1, goldMultiplier: 0.08 }, bonusDesc: '士兵 +10%, 金币 +8%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'warlords' },
    { id: 'huanggai', name: '黄盖', quality: 'r', bonus: { soldierMultiplier: 0.07 }, bonusDesc: '士兵 +7%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'warlords' },
    { id: 'chengpu', name: '程普', quality: 'r', bonus: { soldierMultiplier: 0.06, grainMultiplier: 0.03 }, bonusDesc: '士兵 +6%, 粮草 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'warlords' },
    { id: 'handang', name: '韩当', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'warlords' },
    { id: 'liubiao', name: '刘表', quality: 'sr', bonus: { prestigeMultiplier: 0.1, grainMultiplier: 0.05 }, bonusDesc: '声望 +10%, 粮草 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'warlords' },
    { id: 'zhangxiu', name: '张绣', quality: 'sr', bonus: { soldierMultiplier: 0.08, goldMultiplier: 0.05 }, bonusDesc: '士兵 +8%, 金币 +5%', cost: { prestige: 260, gold: 2600 }, unlockEvent: 'warlords' },
    { id: 'yanliang', name: '颜良', quality: 'sr', bonus: { soldierMultiplier: 0.1 }, bonusDesc: '士兵 +10%', cost: { prestige: 250, gold: 2500 }, unlockEvent: 'warlords' },
    { id: 'wenchou', name: '文丑', quality: 'sr', bonus: { soldierMultiplier: 0.1, grainMultiplier: 0.05 }, bonusDesc: '士兵 +10%, 粮草 +5%', cost: { prestige: 250, gold: 2500 }, unlockEvent: 'warlords' },
    { id: 'jiling', name: '纪灵', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'warlords' },
    { id: 'taoqian', name: '陶谦', quality: 'r', bonus: { grainMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '粮草 +5%, 声望 +3%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'warlords' },
    { id: 'kongrong', name: '孔融', quality: 'r', bonus: { prestigeMultiplier: 0.08 }, bonusDesc: '声望 +8%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'warlords' },
    { id: 'chendeng', name: '陈登', quality: 'sr', bonus: { goldMultiplier: 0.08, grainMultiplier: 0.05 }, bonusDesc: '金币 +8%, 粮草 +5%', cost: { prestige: 240, gold: 2400 }, unlockEvent: 'warlords' },
    { id: 'huatuo', name: '华佗', quality: 'ssr', bonus: { grainMultiplier: 0.2, soldierMultiplier: 0.1 }, bonusDesc: '粮草 +20%, 士兵 +10%', cost: { prestige: 500, gold: 5000 }, unlockEvent: 'warlords' },

    // ===== 官渡之战 =====
    { id: 'xunyou', name: '荀攸', quality: 'sr', bonus: { goldMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +10%, 声望 +5%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'guandu' },
    { id: 'jiaxu', name: '贾诩', quality: 'ssr', bonus: { goldMultiplier: 0.18, soldierMultiplier: 0.1 }, bonusDesc: '金币 +18%, 士兵 +10%', cost: { prestige: 600, gold: 6000 }, unlockEvent: 'guandu' },
    { id: 'liuye', name: '刘晔', quality: 'r', bonus: { goldMultiplier: 0.06 }, bonusDesc: '金币 +6%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'guandu' },
    { id: 'yujin', name: '于禁', quality: 'sr', bonus: { soldierMultiplier: 0.08, goldMultiplier: 0.05 }, bonusDesc: '士兵 +8%, 金币 +5%', cost: { prestige: 260, gold: 2600 }, unlockEvent: 'guandu' },
    { id: 'yuejin', name: '乐进', quality: 'r', bonus: { soldierMultiplier: 0.06, goldMultiplier: 0.03 }, bonusDesc: '士兵 +6%, 金币 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'guandu' },
    { id: 'zhanghe', name: '张郃', quality: 'sr', bonus: { soldierMultiplier: 0.1, grainMultiplier: 0.05 }, bonusDesc: '士兵 +10%, 粮草 +5%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'guandu' },
    { id: 'gaolan', name: '高览', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'guandu' },
    { id: 'tianfeng', name: '田丰', quality: 'sr', bonus: { prestigeMultiplier: 0.12 }, bonusDesc: '声望 +12%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'guandu' },
    { id: 'jusuo', name: '沮授', quality: 'sr', bonus: { prestigeMultiplier: 0.1, goldMultiplier: 0.05 }, bonusDesc: '声望 +10%, 金币 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'guandu' },
    { id: 'shenpei', name: '审配', quality: 'r', bonus: { soldierMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 声望 +3%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'guandu' },
    { id: 'guotu', name: '郭图', quality: 'r', bonus: { goldMultiplier: 0.05 }, bonusDesc: '金币 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'guandu' },
    { id: 'fengji', name: '逢纪', quality: 'r', bonus: { prestigeMultiplier: 0.05 }, bonusDesc: '声望 +5%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'guandu' },
    { id: 'chunyuqiong', name: '淳于琼', quality: 'n', bonus: { goldMultiplier: 0.03 }, bonusDesc: '金币 +3%', cost: { prestige: 60, gold: 600 }, unlockEvent: 'guandu' },
    { id: 'xinpi', name: '辛毗', quality: 'r', bonus: { prestigeMultiplier: 0.05, grainMultiplier: 0.03 }, bonusDesc: '声望 +5%, 粮草 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'guandu' },
    { id: 'jiangji', name: '蒋济', quality: 'r', bonus: { goldMultiplier: 0.06 }, bonusDesc: '金币 +6%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'guandu' },
    { id: 'cuiyan', name: '崔琰', quality: 'r', bonus: { prestigeMultiplier: 0.05 }, bonusDesc: '声望 +5%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'guandu' },

    // ===== 赤壁之战 =====
    { id: 'zhuge_liang', name: '诸葛亮', quality: 'ssr', bonus: { grainMultiplier: 0.3, goldMultiplier: 0.2 }, bonusDesc: '粮草 +30%, 金币 +20%', cost: { prestige: 800, gold: 8000 }, unlockEvent: 'chibi' },
    { id: 'zhaoyun', name: '赵云', quality: 'sr', bonus: { soldierMultiplier: 0.12, goldMultiplier: 0.1 }, bonusDesc: '士兵 +12%, 金币 +10%', cost: { prestige: 400, gold: 4000 }, unlockEvent: 'chibi' },
    { id: 'huangzhong', name: '黄忠', quality: 'sr', bonus: { soldierMultiplier: 0.1 }, bonusDesc: '士兵 +10%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'chibi' },
    { id: 'weiyan', name: '魏延', quality: 'sr', bonus: { soldierMultiplier: 0.12, prestigeMultiplier: 0.05 }, bonusDesc: '士兵 +12%, 声望 +5%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'chibi' },
    { id: 'pangtong', name: '庞统', quality: 'ssr', bonus: { grainMultiplier: 0.2, prestigeMultiplier: 0.15 }, bonusDesc: '粮草 +20%, 声望 +15%', cost: { prestige: 700, gold: 7000 }, unlockEvent: 'chibi' },
    { id: 'zhenji', name: '甄姬', quality: 'sr', bonus: { goldMultiplier: 0.1, grainMultiplier: 0.08 }, bonusDesc: '金币 +10%, 粮草 +8%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'chibi' },
    { id: 'caiwenji', name: '蔡文姬', quality: 'sr', bonus: { prestigeMultiplier: 0.12, grainMultiplier: 0.05 }, bonusDesc: '声望 +12%, 粮草 +5%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'chibi' },
    { id: 'zhouyu', name: '周瑜', quality: 'ssr', bonus: { goldMultiplier: 0.18, grainMultiplier: 0.12 }, bonusDesc: '金币 +18%, 粮草 +12%', cost: { prestige: 700, gold: 7000 }, unlockEvent: 'chibi' },
    { id: 'lusu', name: '鲁肃', quality: 'sr', bonus: { goldMultiplier: 0.1, grainMultiplier: 0.08 }, bonusDesc: '金币 +10%, 粮草 +8%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'chibi' },
    { id: 'lvmeng', name: '吕蒙', quality: 'sr', bonus: { soldierMultiplier: 0.1, goldMultiplier: 0.08 }, bonusDesc: '士兵 +10%, 金币 +8%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'chibi' },
    { id: 'luxun', name: '陆逊', quality: 'ssr', bonus: { goldMultiplier: 0.15, soldierMultiplier: 0.1 }, bonusDesc: '金币 +15%, 士兵 +10%', cost: { prestige: 650, gold: 6500 }, unlockEvent: 'chibi' },
    { id: 'lingtong', name: '凌统', quality: 'r', bonus: { soldierMultiplier: 0.07 }, bonusDesc: '士兵 +7%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'chibi' },
    { id: 'dingfeng', name: '丁奉', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'chibi' },
    { id: 'xusheng', name: '徐盛', quality: 'r', bonus: { soldierMultiplier: 0.05, grainMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 粮草 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'chibi' },
    { id: 'kanze', name: '阚泽', quality: 'r', bonus: { goldMultiplier: 0.06 }, bonusDesc: '金币 +6%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'chibi' },
    { id: 'buzhi', name: '步骘', quality: 'r', bonus: { goldMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '金币 +5%, 声望 +3%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'chibi' },
    { id: 'caimao', name: '蔡瑁', quality: 'r', bonus: { goldMultiplier: 0.05 }, bonusDesc: '金币 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'chibi' },
    { id: 'zhangyun', name: '张允', quality: 'n', bonus: { goldMultiplier: 0.03 }, bonusDesc: '金币 +3%', cost: { prestige: 70, gold: 700 }, unlockEvent: 'chibi' },
    { id: 'jianggan', name: '蒋干', quality: 'n', bonus: { goldMultiplier: 0.02 }, bonusDesc: '金币 +2%', cost: { prestige: 50, gold: 500 }, unlockEvent: 'chibi' },
    { id: 'huangzu', name: '黄祖', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'chibi' },

    // ===== 定军山之战 =====
    { id: 'fazheng', name: '法正', quality: 'sr', bonus: { prestigeMultiplier: 0.12, goldMultiplier: 0.08 }, bonusDesc: '声望 +12%, 金币 +8%', cost: { prestige: 400, gold: 4000 }, unlockEvent: 'dingjunshan' },
    { id: 'machao', name: '马超', quality: 'ssr', bonus: { soldierMultiplier: 0.22 }, bonusDesc: '士兵 +22%', cost: { prestige: 700, gold: 7000 }, unlockEvent: 'dingjunshan' },
    { id: 'madai', name: '马岱', quality: 'r', bonus: { soldierMultiplier: 0.07 }, bonusDesc: '士兵 +7%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'dingjunshan' },
    { id: 'yanyan', name: '严颜', quality: 'sr', bonus: { soldierMultiplier: 0.08, prestigeMultiplier: 0.05 }, bonusDesc: '士兵 +8%, 声望 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'dingjunshan' },
    { id: 'menghuo', name: '孟获', quality: 'sr', bonus: { soldierMultiplier: 0.1, grainMultiplier: 0.08 }, bonusDesc: '士兵 +10%, 粮草 +8%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'dingjunshan' },
    { id: 'zhurong', name: '祝融', quality: 'sr', bonus: { soldierMultiplier: 0.08, goldMultiplier: 0.06 }, bonusDesc: '士兵 +8%, 金币 +6%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'dingjunshan' },
    { id: 'wuyi', name: '吴懿', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'dingjunshan' },
    { id: 'mengda', name: '孟达', quality: 'r', bonus: { goldMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '金币 +5%, 声望 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'dingjunshan' },
    { id: 'liufeng', name: '刘封', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'dingjunshan' },
    { id: 'caohong', name: '曹洪', quality: 'r', bonus: { soldierMultiplier: 0.05, goldMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 金币 +3%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'dingjunshan' },
    { id: 'caoxiu', name: '曹休', quality: 'sr', bonus: { soldierMultiplier: 0.08, goldMultiplier: 0.05 }, bonusDesc: '士兵 +8%, 金币 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'dingjunshan' },
    { id: 'caozhen', name: '曹真', quality: 'sr', bonus: { soldierMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '士兵 +10%, 声望 +5%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'dingjunshan' },
    { id: 'xiahoushang', name: '夏侯尚', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'dingjunshan' },
    { id: 'xuhuang', name: '徐晃', quality: 'sr', bonus: { soldierMultiplier: 0.12 }, bonusDesc: '士兵 +12%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'dingjunshan' },
    { id: 'wangping', name: '王平', quality: 'r', bonus: { soldierMultiplier: 0.06, grainMultiplier: 0.03 }, bonusDesc: '士兵 +6%, 粮草 +3%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'dingjunshan' },
    { id: 'zhangni', name: '张嶷', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'dingjunshan' },

    // ===== 夷陵之战 =====
    { id: 'sunquan', name: '孙权', quality: 'ssr', bonus: { grainMultiplier: 0.2, goldMultiplier: 0.2 }, bonusDesc: '粮草 +20%, 金币 +20%', cost: { prestige: 800, gold: 8000 }, unlockEvent: 'yiling' },
    { id: 'zhuran', name: '朱然', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'yiling' },
    { id: 'quancong', name: '全琮', quality: 'r', bonus: { goldMultiplier: 0.05 }, bonusDesc: '金币 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'yiling' },
    { id: 'zhuhuan', name: '朱桓', quality: 'sr', bonus: { soldierMultiplier: 0.08, prestigeMultiplier: 0.05 }, bonusDesc: '士兵 +8%, 声望 +5%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'yiling' },
    { id: 'panzhang', name: '潘璋', quality: 'r', bonus: { soldierMultiplier: 0.05, goldMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 金币 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'yiling' },
    { id: 'heqi', name: '贺齐', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'yiling' },
    { id: 'mazhong_wu', name: '马忠', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'yiling' },
    { id: 'shamoke', name: '沙摩柯', quality: 'r', bonus: { soldierMultiplier: 0.08 }, bonusDesc: '士兵 +8%', cost: { prestige: 170, gold: 1700 }, unlockEvent: 'yiling' },
    { id: 'fengxi', name: '冯习', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'yiling' },
    { id: 'zhangnan', name: '张南', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 130, gold: 1300 }, unlockEvent: 'yiling' },
    { id: 'furong', name: '傅肜', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'yiling' },
    { id: 'xiangchong', name: '向宠', quality: 'r', bonus: { soldierMultiplier: 0.05, grainMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 粮草 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'yiling' },
    { id: 'lukang', name: '陆抗', quality: 'sr', bonus: { soldierMultiplier: 0.1, goldMultiplier: 0.08 }, bonusDesc: '士兵 +10%, 金币 +8%', cost: { prestige: 400, gold: 4000 }, unlockEvent: 'yiling' },
    { id: 'sunhuan', name: '孙桓', quality: 'r', bonus: { soldierMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 声望 +3%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'yiling' },
    { id: 'luotong', name: '骆统', quality: 'r', bonus: { grainMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '粮草 +5%, 声望 +3%', cost: { prestige: 140, gold: 1400 }, unlockEvent: 'yiling' },

    // ===== 北伐中原 =====
    { id: 'jiangwei', name: '姜维', quality: 'sr', bonus: { soldierMultiplier: 0.12, prestigeMultiplier: 0.1 }, bonusDesc: '士兵 +12%, 声望 +10%', cost: { prestige: 500, gold: 5000 }, unlockEvent: 'northern_expedition' },
    { id: 'dengai', name: '邓艾', quality: 'ssr', bonus: { soldierMultiplier: 0.2, goldMultiplier: 0.1 }, bonusDesc: '士兵 +20%, 金币 +10%', cost: { prestige: 800, gold: 8000 }, unlockEvent: 'northern_expedition' },
    { id: 'zhonghui', name: '钟会', quality: 'sr', bonus: { goldMultiplier: 0.12, prestigeMultiplier: 0.08 }, bonusDesc: '金币 +12%, 声望 +8%', cost: { prestige: 450, gold: 4500 }, unlockEvent: 'northern_expedition' },
    { id: 'simayi', name: '司马懿', quality: 'ssr', bonus: { goldMultiplier: 0.2, soldierMultiplier: 0.15 }, bonusDesc: '金币 +20%, 士兵 +15%', cost: { prestige: 900, gold: 9000 }, unlockEvent: 'northern_expedition' },
    { id: 'simashi', name: '司马师', quality: 'sr', bonus: { prestigeMultiplier: 0.12, soldierMultiplier: 0.08 }, bonusDesc: '声望 +12%, 士兵 +8%', cost: { prestige: 450, gold: 4500 }, unlockEvent: 'northern_expedition' },
    { id: 'simazhao', name: '司马昭', quality: 'sr', bonus: { goldMultiplier: 0.1, prestigeMultiplier: 0.08 }, bonusDesc: '金币 +10%, 声望 +8%', cost: { prestige: 420, gold: 4200 }, unlockEvent: 'northern_expedition' },
    { id: 'haozhao', name: '郝昭', quality: 'r', bonus: { soldierMultiplier: 0.06 }, bonusDesc: '士兵 +6%', cost: { prestige: 170, gold: 1700 }, unlockEvent: 'northern_expedition' },
    { id: 'caoshuang', name: '曹爽', quality: 'sr', bonus: { goldMultiplier: 0.08, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +8%, 声望 +5%', cost: { prestige: 300, gold: 3000 }, unlockEvent: 'northern_expedition' },
    { id: 'wangshuang', name: '王双', quality: 'sr', bonus: { soldierMultiplier: 0.1 }, bonusDesc: '士兵 +10%', cost: { prestige: 280, gold: 2800 }, unlockEvent: 'northern_expedition' },
    { id: 'chentai', name: '陈泰', quality: 'r', bonus: { soldierMultiplier: 0.06, goldMultiplier: 0.03 }, bonusDesc: '士兵 +6%, 金币 +3%', cost: { prestige: 170, gold: 1700 }, unlockEvent: 'northern_expedition' },
    { id: 'mazhong_shu', name: '马忠', quality: 'r', bonus: { soldierMultiplier: 0.05, grainMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 粮草 +3%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'northern_expedition' },
    { id: 'zhangyi', name: '张翼', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'northern_expedition' },
    { id: 'liaohua', name: '廖化', quality: 'r', bonus: { soldierMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 声望 +3%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'northern_expedition' },
    { id: 'feiyi', name: '费祎', quality: 'sr', bonus: { prestigeMultiplier: 0.1, goldMultiplier: 0.08 }, bonusDesc: '声望 +10%, 金币 +8%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'northern_expedition' },
    { id: 'dongyun', name: '董允', quality: 'r', bonus: { prestigeMultiplier: 0.06 }, bonusDesc: '声望 +6%', cost: { prestige: 170, gold: 1700 }, unlockEvent: 'northern_expedition' },
    { id: 'sunli', name: '孙礼', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'northern_expedition' },
    { id: 'zuoci', name: '左慈', quality: 'ssr', bonus: { grainMultiplier: 0.15, goldMultiplier: 0.15, prestigeMultiplier: 0.1 }, bonusDesc: '粮草 +15%, 金币 +15%, 声望 +10%', cost: { prestige: 800, gold: 8000 }, unlockEvent: 'northern_expedition' },
    { id: 'dailing', name: '戴陵', quality: 'n', bonus: { soldierMultiplier: 0.03 }, bonusDesc: '士兵 +3%', cost: { prestige: 70, gold: 700 }, unlockEvent: 'northern_expedition' },

    // ===== 三国归晋 =====
    { id: 'simayan', name: '司马炎', quality: 'ssr', bonus: { goldMultiplier: 0.2, prestigeMultiplier: 0.15 }, bonusDesc: '金币 +20%, 声望 +15%', cost: { prestige: 1000, gold: 10000 }, unlockEvent: 'unification' },
    { id: 'yanghu', name: '羊祜', quality: 'ssr', bonus: { grainMultiplier: 0.15, goldMultiplier: 0.12 }, bonusDesc: '粮草 +15%, 金币 +12%', cost: { prestige: 900, gold: 9000 }, unlockEvent: 'unification' },
    { id: 'duyu', name: '杜预', quality: 'sr', bonus: { soldierMultiplier: 0.12, prestigeMultiplier: 0.08 }, bonusDesc: '士兵 +12%, 声望 +8%', cost: { prestige: 500, gold: 5000 }, unlockEvent: 'unification' },
    { id: 'wangjun', name: '王濬', quality: 'sr', bonus: { soldierMultiplier: 0.1, goldMultiplier: 0.05 }, bonusDesc: '士兵 +10%, 金币 +5%', cost: { prestige: 400, gold: 4000 }, unlockEvent: 'unification' },
    { id: 'liushan', name: '刘禅', quality: 'sr', bonus: { prestigeMultiplier: 0.08, grainMultiplier: 0.1 }, bonusDesc: '声望 +8%, 粮草 +10%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'unification' },
    { id: 'sunhao', name: '孙皓', quality: 'sr', bonus: { goldMultiplier: 0.08, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +8%, 声望 +5%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'unification' },
    { id: 'jiachong', name: '贾充', quality: 'sr', bonus: { goldMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +10%, 声望 +5%', cost: { prestige: 380, gold: 3800 }, unlockEvent: 'unification' },
    { id: 'weiguan', name: '卫瓘', quality: 'r', bonus: { goldMultiplier: 0.06, prestigeMultiplier: 0.03 }, bonusDesc: '金币 +6%, 声望 +3%', cost: { prestige: 170, gold: 1700 }, unlockEvent: 'unification' },
    { id: 'wanghun', name: '王浑', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'unification' },
    { id: 'xunxu', name: '荀勖', quality: 'r', bonus: { goldMultiplier: 0.05 }, bonusDesc: '金币 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'unification' },
    { id: 'zhanghua', name: '张华', quality: 'sr', bonus: { goldMultiplier: 0.08, grainMultiplier: 0.05 }, bonusDesc: '金币 +8%, 粮草 +5%', cost: { prestige: 320, gold: 3200 }, unlockEvent: 'unification' },
    { id: 'chenqian', name: '陈骞', quality: 'r', bonus: { soldierMultiplier: 0.05, goldMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 金币 +3%', cost: { prestige: 160, gold: 1600 }, unlockEvent: 'unification' },
    { id: 'hufen', name: '胡奋', quality: 'r', bonus: { soldierMultiplier: 0.05 }, bonusDesc: '士兵 +5%', cost: { prestige: 150, gold: 1500 }, unlockEvent: 'unification' },
    { id: 'zhugezhan', name: '诸葛瞻', quality: 'sr', bonus: { prestigeMultiplier: 0.08, soldierMultiplier: 0.05 }, bonusDesc: '声望 +8%, 士兵 +5%', cost: { prestige: 350, gold: 3500 }, unlockEvent: 'unification' },
    { id: 'luoxian', name: '罗宪', quality: 'r', bonus: { soldierMultiplier: 0.06, prestigeMultiplier: 0.03 }, bonusDesc: '士兵 +6%, 声望 +3%', cost: { prestige: 170, gold: 1700 }, unlockEvent: 'unification' },
    { id: 'tangzi', name: '唐咨', quality: 'n', bonus: { soldierMultiplier: 0.03 }, bonusDesc: '士兵 +3%', cost: { prestige: 70, gold: 700 }, unlockEvent: 'unification' }
];

const HISTORICAL_EVENTS = [
    {
        id: 'yellow_turban',
        name: '黄巾之乱',
        description: '天下大乱，群雄并起',
        trigger: { soldiers: 1000 },
        reward: { prestige: 100 },
        bonus: { soldierMultiplier: 0.05 },
        rewardDesc: '声望 +100, 士兵永久 +5%'
    },
    {
        id: 'coalition',
        name: '讨董联盟',
        description: '十八路诸侯讨伐董卓',
        trigger: { soldiers: 10000, prestige: 200 },
        reward: { prestige: 300, gold: 5000 },
        bonus: { goldMultiplier: 0.05 },
        rewardDesc: '声望 +300, 金币 +5000, 金币永久 +5%'
    },
    {
        id: 'warlords',
        name: '群雄割据',
        description: '诸侯混战，各据一方',
        trigger: { soldiers: 25000, gold: 5000 },
        reward: { prestige: 500, gold: 10000, grain: 5000 },
        bonus: { grainMultiplier: 0.05, goldMultiplier: 0.03 },
        rewardDesc: '声望 +500, 金币 +10000, 粮草 +5000, 粮草永久 +5%, 金币永久 +3%'
    },
    {
        id: 'guandu',
        name: '官渡之战',
        description: '奇袭乌巢，大破袁绍',
        trigger: { soldiers: 50000, gold: 20000 },
        reward: { prestige: 1000, territory: 5 },
        bonus: { goldMultiplier: 0.08 },
        rewardDesc: '声望 +1000, 领土 +5, 金币永久 +8%'
    },
    {
        id: 'chibi',
        name: '赤壁之战',
        description: '火烧连营，以少胜多',
        trigger: { soldiers: 150000, prestige: 1000 },
        reward: { prestige: 2000, territory: 10 },
        bonus: { soldierMultiplier: 0.08, goldMultiplier: 0.05 },
        rewardDesc: '声望 +2000, 领土 +10, 士兵永久 +8%, 金币永久 +5%'
    },
    {
        id: 'dingjunshan',
        name: '定军山之战',
        description: '老将黄忠，定军斩夏侯',
        trigger: { soldiers: 500000, prestige: 2000 },
        reward: { prestige: 3000, territory: 15, gold: 30000 },
        bonus: { soldierMultiplier: 0.1, prestigeMultiplier: 0.05 },
        rewardDesc: '声望 +3000, 领土 +15, 金币 +30000, 士兵永久 +10%, 声望永久 +5%'
    },
    {
        id: 'yiling',
        name: '夷陵之战',
        description: '火烧连营七百里',
        trigger: { soldiers: 1000000, territory: 20 },
        reward: { prestige: 5000, gold: 50000 },
        bonus: { grainMultiplier: 0.1, soldierMultiplier: 0.05 },
        rewardDesc: '声望 +5000, 金币 +50000, 粮草永久 +10%, 士兵永久 +5%'
    },
    {
        id: 'northern_expedition',
        name: '北伐中原',
        description: '出师未捷身先死',
        trigger: { soldiers: 3000000, prestige: 5000 },
        reward: { prestige: 8000, territory: 25 },
        bonus: { goldMultiplier: 0.1, grainMultiplier: 0.1, soldierMultiplier: 0.1, prestigeMultiplier: 0.1 },
        rewardDesc: '声望 +8000, 领土 +25, 全部产出永久 +10%'
    },
    {
        id: 'unification',
        name: '三国归晋',
        description: '天下一统，分久必合',
        trigger: { soldiers: 10000000, prestige: 15000 },
        reward: { prestige: 20000, gold: 200000, territory: 50 },
        bonus: { goldMultiplier: 0.15, grainMultiplier: 0.15, soldierMultiplier: 0.15, prestigeMultiplier: 0.15 },
        rewardDesc: '声望 +20000, 金币 +200000, 领土 +50, 全部产出永久 +15%'
    }
];

const TRADE_RATES = {
    grainToGold: { grainCost: 100, goldGain: 50 },
    recruit: { grainCost: 80, goldCost: 40, soldierGain: 30 },
    prestige: { soldierCost: 200, prestigeGain: 10 }
};

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

const CITIES = [
    // ===== 魏 (Wei) - 北方中原，金币加成 =====
    { id: 'qiaojun', name: '谯郡', faction: 'wei', tier: 1,
      position: { x: 56, y: 38 }, defense: 500, cost: { soldiers: 500, grain: 200 },
      reward: { gold: 500, prestige: 50 }, bonus: { goldMultiplier: 0.02 }, bonusDesc: '金币 +2%', unlockEvent: null },
    { id: 'chenliu', name: '陈留', faction: 'wei', tier: 2,
      position: { x: 52, y: 36 }, defense: 3000, cost: { soldiers: 3000, grain: 800 },
      reward: { gold: 2000, prestige: 100 }, bonus: { goldMultiplier: 0.03 }, bonusDesc: '金币 +3%', unlockEvent: 'yellow_turban' },
    { id: 'yecheng', name: '邺城', faction: 'wei', tier: 4,
      position: { x: 46, y: 22 }, defense: 50000, cost: { soldiers: 50000, grain: 10000, gold: 5000 },
      reward: { gold: 20000, prestige: 800, territory: 3 }, bonus: { goldMultiplier: 0.05, soldierMultiplier: 0.02 }, bonusDesc: '金币 +5%, 士兵 +2%', unlockEvent: 'warlords' },
    { id: 'hefei', name: '合肥', faction: 'wei', tier: 4,
      position: { x: 65, y: 48 }, defense: 40000, cost: { soldiers: 40000, grain: 8000, gold: 4000 },
      reward: { gold: 15000, prestige: 600, territory: 2 }, bonus: { soldierMultiplier: 0.04, goldMultiplier: 0.03 }, bonusDesc: '士兵 +4%, 金币 +3%', unlockEvent: 'warlords' },
    { id: 'xiangyang', name: '襄阳', faction: 'wei', tier: 5,
      position: { x: 44, y: 50 }, defense: 150000, cost: { soldiers: 150000, grain: 25000, gold: 12000 },
      reward: { gold: 50000, prestige: 1500, territory: 5 }, bonus: { goldMultiplier: 0.05, grainMultiplier: 0.03 }, bonusDesc: '金币 +5%, 粮草 +3%', unlockEvent: 'guandu' },
    { id: 'luoyang', name: '洛阳', faction: 'wei', tier: 6,
      position: { x: 40, y: 35 }, defense: 500000, cost: { soldiers: 500000, grain: 80000, gold: 40000 },
      reward: { gold: 100000, prestige: 3000, territory: 10 }, bonus: { goldMultiplier: 0.08, prestigeMultiplier: 0.03 }, bonusDesc: '金币 +8%, 声望 +3%', unlockEvent: 'chibi' },
    { id: 'changan', name: '长安', faction: 'wei', tier: 7,
      position: { x: 28, y: 33 }, defense: 2000000, cost: { soldiers: 2000000, grain: 200000, gold: 100000 },
      reward: { gold: 200000, prestige: 6000, territory: 20 }, bonus: { goldMultiplier: 0.1, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +10%, 声望 +5%', unlockEvent: 'dingjunshan' },
    { id: 'xuchang', name: '许昌', faction: 'wei', tier: 9,
      position: { x: 50, y: 38 }, defense: 10000000, cost: { soldiers: 10000000, grain: 500000, gold: 300000 },
      reward: { gold: 500000, prestige: 15000, territory: 30 }, bonus: { goldMultiplier: 0.12, soldierMultiplier: 0.08, prestigeMultiplier: 0.05 }, bonusDesc: '金币 +12%, 士兵 +8%, 声望 +5%', unlockEvent: 'northern_expedition' },

    // ===== 蜀 (Shu) - 西南巴蜀，士兵/声望加成 =====
    { id: 'nanzhong', name: '南中', faction: 'shu', tier: 1,
      position: { x: 24, y: 72 }, defense: 500, cost: { soldiers: 500, grain: 200 },
      reward: { prestige: 80, grain: 500 }, bonus: { soldierMultiplier: 0.02 }, bonusDesc: '士兵 +2%', unlockEvent: null },
    { id: 'zitong', name: '梓潼', faction: 'shu', tier: 2,
      position: { x: 26, y: 56 }, defense: 3000, cost: { soldiers: 3000, grain: 800 },
      reward: { prestige: 150, grain: 2000 }, bonus: { soldierMultiplier: 0.03 }, bonusDesc: '士兵 +3%', unlockEvent: 'yellow_turban' },
    { id: 'jianning', name: '建宁', faction: 'shu', tier: 3,
      position: { x: 22, y: 68 }, defense: 10000, cost: { soldiers: 10000, grain: 3000, gold: 1500 },
      reward: { prestige: 300, grain: 5000, territory: 1 }, bonus: { grainMultiplier: 0.03, soldierMultiplier: 0.02 }, bonusDesc: '粮草 +3%, 士兵 +2%', unlockEvent: 'coalition' },
    { id: 'jiangzhou', name: '江州', faction: 'shu', tier: 3,
      position: { x: 32, y: 60 }, defense: 12000, cost: { soldiers: 12000, grain: 3500, gold: 1800 },
      reward: { prestige: 350, gold: 5000, territory: 1 }, bonus: { grainMultiplier: 0.02, goldMultiplier: 0.02 }, bonusDesc: '粮草 +2%, 金币 +2%', unlockEvent: 'coalition' },
    { id: 'yongan', name: '永安', faction: 'shu', tier: 5,
      position: { x: 38, y: 54 }, defense: 150000, cost: { soldiers: 150000, grain: 25000, gold: 12000 },
      reward: { prestige: 1500, grain: 20000, territory: 5 }, bonus: { soldierMultiplier: 0.05, prestigeMultiplier: 0.03 }, bonusDesc: '士兵 +5%, 声望 +3%', unlockEvent: 'guandu' },
    { id: 'wudu', name: '武都', faction: 'shu', tier: 5,
      position: { x: 28, y: 48 }, defense: 120000, cost: { soldiers: 120000, grain: 20000, gold: 10000 },
      reward: { prestige: 1200, territory: 4 }, bonus: { soldierMultiplier: 0.04, grainMultiplier: 0.03 }, bonusDesc: '士兵 +4%, 粮草 +3%', unlockEvent: 'guandu' },
    { id: 'hanzhong', name: '汉中', faction: 'shu', tier: 6,
      position: { x: 30, y: 42 }, defense: 500000, cost: { soldiers: 500000, grain: 80000, gold: 40000 },
      reward: { prestige: 3000, grain: 50000, territory: 10 }, bonus: { soldierMultiplier: 0.08, prestigeMultiplier: 0.04 }, bonusDesc: '士兵 +8%, 声望 +4%', unlockEvent: 'chibi' },
    { id: 'chengdu', name: '成都', faction: 'shu', tier: 9,
      position: { x: 26, y: 58 }, defense: 10000000, cost: { soldiers: 10000000, grain: 500000, gold: 300000 },
      reward: { prestige: 15000, grain: 300000, territory: 30 }, bonus: { soldierMultiplier: 0.12, prestigeMultiplier: 0.08, grainMultiplier: 0.05 }, bonusDesc: '士兵 +12%, 声望 +8%, 粮草 +5%', unlockEvent: 'northern_expedition' },

    // ===== 吴 (Wu) - 东南江东，粮草加成 =====
    { id: 'jiaozhou', name: '交州', faction: 'wu', tier: 1,
      position: { x: 50, y: 78 }, defense: 500, cost: { soldiers: 500, grain: 200 },
      reward: { grain: 800, gold: 300 }, bonus: { grainMultiplier: 0.02 }, bonusDesc: '粮草 +2%', unlockEvent: null },
    { id: 'lujiang', name: '庐江', faction: 'wu', tier: 2,
      position: { x: 64, y: 40 }, defense: 3000, cost: { soldiers: 3000, grain: 800 },
      reward: { grain: 2000, gold: 800 }, bonus: { grainMultiplier: 0.03 }, bonusDesc: '粮草 +3%', unlockEvent: 'yellow_turban' },
    { id: 'kuaiji', name: '会稽', faction: 'wu', tier: 3,
      position: { x: 78, y: 48 }, defense: 10000, cost: { soldiers: 10000, grain: 3000, gold: 1500 },
      reward: { grain: 5000, gold: 3000, territory: 1 }, bonus: { grainMultiplier: 0.03, goldMultiplier: 0.02 }, bonusDesc: '粮草 +3%, 金币 +2%', unlockEvent: 'coalition' },
    { id: 'yuzhang', name: '豫章', faction: 'wu', tier: 3,
      position: { x: 64, y: 56 }, defense: 12000, cost: { soldiers: 12000, grain: 3500, gold: 1800 },
      reward: { grain: 5000, prestige: 300, territory: 1 }, bonus: { grainMultiplier: 0.02, prestigeMultiplier: 0.02 }, bonusDesc: '粮草 +2%, 声望 +2%', unlockEvent: 'coalition' },
    { id: 'chaisang', name: '柴桑', faction: 'wu', tier: 4,
      position: { x: 54, y: 52 }, defense: 40000, cost: { soldiers: 40000, grain: 8000, gold: 4000 },
      reward: { grain: 15000, gold: 8000, territory: 2 }, bonus: { grainMultiplier: 0.04, goldMultiplier: 0.02 }, bonusDesc: '粮草 +4%, 金币 +2%', unlockEvent: 'warlords' },
    { id: 'changsha', name: '长沙', faction: 'wu', tier: 5,
      position: { x: 50, y: 60 }, defense: 120000, cost: { soldiers: 120000, grain: 20000, gold: 10000 },
      reward: { grain: 30000, gold: 15000, territory: 4 }, bonus: { grainMultiplier: 0.05, soldierMultiplier: 0.03 }, bonusDesc: '粮草 +5%, 士兵 +3%', unlockEvent: 'guandu' },
    { id: 'wuchang', name: '武昌', faction: 'wu', tier: 6,
      position: { x: 52, y: 48 }, defense: 500000, cost: { soldiers: 500000, grain: 80000, gold: 40000 },
      reward: { grain: 50000, gold: 30000, territory: 10 }, bonus: { grainMultiplier: 0.08, goldMultiplier: 0.04 }, bonusDesc: '粮草 +8%, 金币 +4%', unlockEvent: 'chibi' },
    { id: 'jianye', name: '建业', faction: 'wu', tier: 9,
      position: { x: 74, y: 40 }, defense: 10000000, cost: { soldiers: 10000000, grain: 500000, gold: 300000 },
      reward: { grain: 300000, gold: 200000, territory: 30 }, bonus: { grainMultiplier: 0.12, goldMultiplier: 0.08, soldierMultiplier: 0.05 }, bonusDesc: '粮草 +12%, 金币 +8%, 士兵 +5%', unlockEvent: 'northern_expedition' }
];

// 城市间道路连接
const CITY_CONNECTIONS = [
    // 魏国内部
    ['qiaojun', 'chenliu'], ['chenliu', 'xuchang'], ['xuchang', 'luoyang'],
    ['luoyang', 'changan'], ['yecheng', 'chenliu'], ['yecheng', 'luoyang'],
    ['hefei', 'xuchang'], ['hefei', 'lujiang'],
    // 蜀国内部
    ['nanzhong', 'jianning'], ['jianning', 'chengdu'], ['chengdu', 'zitong'],
    ['zitong', 'hanzhong'], ['chengdu', 'jiangzhou'], ['jiangzhou', 'yongan'],
    ['wudu', 'hanzhong'], ['wudu', 'zitong'],
    // 吴国内部
    ['jiaozhou', 'changsha'], ['changsha', 'chaisang'], ['chaisang', 'wuchang'],
    ['wuchang', 'lujiang'], ['lujiang', 'jianye'], ['lujiang', 'kuaiji'],
    ['yuzhang', 'chaisang'], ['yuzhang', 'kuaiji'],
    // 跨势力要道
    ['xiangyang', 'wuchang'], ['xiangyang', 'yongan'], ['xiangyang', 'luoyang'],
    ['hanzhong', 'changan'], ['hefei', 'chaisang']
];

const SAVE_VERSION = 2;
const SAVE_KEY = 'sanguo_incremental_save';
const AUTOSAVE_INTERVAL = 30000; // 30秒
