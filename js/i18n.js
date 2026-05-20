// 国际化模块 - 中英双语支持

const I18N = {
    zh: {
        // 页面标题
        title: '三国风云：霸业',

        // 势力选择
        factionTitle: '选择你的势力',
        factionDesc: '不同的势力将带来不同的初始加成',
        factionWeiName: '魏',
        factionShuName: '蜀',
        factionWuName: '吴',
        factionWeiDesc: '金币产出 +10%',
        factionShuDesc: '声望获取 +10%',
        factionWuDesc: '粮草生产 +10%',

        // 资源名称
        grain: '粮草',
        soldiers: '兵力',
        gold: '金币',
        territory: '领土',
        prestige: '声望',

        // 区域标题
        buildings: '建筑',
        heroes: '武将',
        events: '历史事件',

        // 建筑名称和描述
        farmName: '农田',
        farmDesc: '生产粮草的基础建筑',
        barracksName: '兵营',
        barracksDesc: '消耗粮草训练士兵',
        marketName: '市场',
        marketDesc: '贸易往来，产出金币',
        training_groundName: '校场',
        training_groundDesc: '提升士兵训练效率',
        hero_hallName: '聚贤庄',
        hero_hallDesc: '招募天下名将',
        cityName: '城池',
        cityDesc: '扩张领土，产出大量资源',

        // 按钮文本
        buyOne: '购买 1 个',
        recruit: '招募',
        recruited: '已招募',
        save: '保存',
        exportSave: '导出存档',
        importSave: '导入存档',
        resetGame: '重置游戏',
        langSwitch: 'EN',

        // 武将
        recruitCost: '招募消耗',

        // 事件
        reward: '奖励',
        triggerCondition: '触发条件',
        eventTriggered: '🏆 历史事件触发',

        // 提示信息
        saveSuccess: '游戏已保存！',
        importSuccess: '存档导入成功！',
        importFail: '导入失败：存档代码无效',
        resetConfirm1: '确定要重置游戏吗？所有进度都会丢失！',
        resetConfirm2: '再次确认：真的要重置吗？此操作不可撤销！',
        resetDone: '游戏已重置',
        exportPrompt: '复制以下存档代码：',
        importPrompt: '请粘贴存档代码：',

        // 历史事件名称和描述
        yellow_turbanName: '黄巾之乱',
        yellow_turbanDesc: '天下大乱，群雄并起',
        coalitionName: '讨董联盟',
        coalitionDesc: '十八路诸侯讨伐董卓',
        chibiName: '赤壁之战',
        chibiDesc: '火烧连营，以少胜多',
        guanduName: '官渡之战',
        guanduDesc: '奇袭乌巢，大破袁绍',
        yilingName: '夷陵之战',
        yilingDesc: '火烧连营七百里',
        northern_expeditionName: '北伐中原',
        northern_expeditionDesc: '出师未捷身先死',

        // 武将名称
        guanyuName: '关羽',
        zhuge_liangName: '诸葛亮',
        zhangfeiName: '张飞',
        zhaoyunName: '赵云',
        huangzhongName: '黄忠',
        caocaoName: '曹操',
        sunquanName: '孙权',
        liubeiName: '刘备',
        dianweiName: '典韦',
        xiahoudunName: '夏侯惇',
        guojiaName: '郭嘉',
        zhouyuName: '周瑜',

        // 单位
        perSecond: '/秒'
    },

    en: {
        // Page title
        title: 'Three Kingdoms: Hegemony',

        // Faction selection
        factionTitle: 'Choose Your Faction',
        factionDesc: 'Each faction provides unique starting bonuses',
        factionWeiName: 'Wei',
        factionShuName: 'Shu',
        factionWuName: 'Wu',
        factionWeiDesc: 'Gold +10%',
        factionShuDesc: 'Prestige +10%',
        factionWuDesc: 'Grain +10%',

        // Resource names
        grain: 'Grain',
        soldiers: 'Soldiers',
        gold: 'Gold',
        territory: 'Territory',
        prestige: 'Prestige',

        // Section titles
        buildings: 'Buildings',
        heroes: 'Heroes',
        events: 'Historical Events',

        // Building names and descriptions
        farmName: 'Farm',
        farmDesc: 'Produces grain, the basic resource',
        barracksName: 'Barracks',
        barracksDesc: 'Consumes grain to train soldiers',
        marketName: 'Market',
        marketDesc: 'Trades goods for gold',
        training_groundName: 'Training Ground',
        training_groundDesc: 'Boosts soldier training efficiency',
        hero_hallName: 'Hero Hall',
        hero_hallDesc: 'Recruit legendary heroes',
        cityName: 'City',
        cityDesc: 'Expands territory, yields abundant resources',

        // Button text
        buyOne: 'Buy 1',
        recruit: 'Recruit',
        recruited: 'Recruited',
        save: 'Save',
        exportSave: 'Export',
        importSave: 'Import',
        resetGame: 'Reset',
        langSwitch: '中文',

        // Heroes
        recruitCost: 'Cost',

        // Events
        reward: 'Reward',
        triggerCondition: 'Requirement',
        eventTriggered: '🏆 Historical Event Triggered',

        // Alert messages
        saveSuccess: 'Game saved!',
        importSuccess: 'Save imported successfully!',
        importFail: 'Import failed: Invalid save code',
        resetConfirm1: 'Are you sure you want to reset? All progress will be lost!',
        resetConfirm2: 'Confirm again: Really reset? This cannot be undone!',
        resetDone: 'Game has been reset',
        exportPrompt: 'Copy this save code:',
        importPrompt: 'Paste your save code:',

        // Historical event names and descriptions
        yellow_turbanName: 'Yellow Turban Rebellion',
        yellow_turbanDesc: 'Chaos sweeps the land, warlords rise',
        coalitionName: 'Coalition Against Dong Zhuo',
        coalitionDesc: 'Eighteen warlords unite against Dong Zhuo',
        chibiName: 'Battle of Red Cliffs',
        chibiDesc: 'Fire on the river, victory against odds',
        guanduName: 'Battle of Guandu',
        guanduDesc: 'Surprise attack at Wuchao, crushing Yuan Shao',
        yilingName: 'Battle of Yiling',
        yilingDesc: 'Seven hundred li of burning camps',
        northern_expeditionName: 'Northern Expedition',
        northern_expeditionDesc: 'The campaign ends before success',

        // Hero names
        guanyuName: 'Guan Yu',
        zhuge_liangName: 'Zhuge Liang',
        zhangfeiName: 'Zhang Fei',
        zhaoyunName: 'Zhao Yun',
        huangzhongName: 'Huang Zhong',
        caocaoName: 'Cao Cao',
        sunquanName: 'Sun Quan',
        liubeiName: 'Liu Bei',
        dianweiName: 'Dian Wei',
        xiahoudunName: 'Xiahou Dun',
        guojiaName: 'Guo Jia',
        zhouyuName: 'Zhou Yu',

        // Units
        perSecond: '/s'
    }
};

// 当前语言
let currentLang = localStorage.getItem('sanguo_lang') || 'zh';

// 获取翻译文本
function t(key) {
    return I18N[currentLang][key] || I18N['zh'][key] || key;
}

// 切换语言
function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('sanguo_lang', currentLang);
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('title');
    
    // 清除缓存的卡片，强制重新渲染
    buildingCards = {};
    heroCards = {};
    eventCards = {};
    containers.buildings.innerHTML = '';
    containers.heroes.innerHTML = '';
    containers.events.innerHTML = '';
    
    renderAllText();
    renderUI();
}

// 渲染所有静态文本
function renderAllText() {
    // 势力弹窗
    const modal = document.getElementById('faction-modal');
    if (modal) {
        modal.querySelector('h2').textContent = t('factionTitle');
        modal.querySelector('p').textContent = t('factionDesc');
        document.querySelector('[data-faction="wei"] h3').textContent = t('factionWeiName');
        document.querySelector('[data-faction="wei"] p').textContent = t('factionWeiDesc');
        document.querySelector('[data-faction="shu"] h3').textContent = t('factionShuName');
        document.querySelector('[data-faction="shu"] p').textContent = t('factionShuDesc');
        document.querySelector('[data-faction="wu"] h3').textContent = t('factionWuName');
        document.querySelector('[data-faction="wu"] p').textContent = t('factionWuDesc');
    }
    
    // 资源名称
    document.querySelector('#resource-grain .resource-name').textContent = t('grain');
    document.querySelector('#resource-soldiers .resource-name').textContent = t('soldiers');
    document.querySelector('#resource-gold .resource-name').textContent = t('gold');
    document.querySelector('#resource-territory .resource-name').textContent = t('territory');
    document.querySelector('#resource-prestige .resource-name').textContent = t('prestige');
    
    // 区域标题
    document.querySelector('#buildings-section h2').textContent = t('buildings');
    document.querySelector('#heroes-section h2').textContent = t('heroes');
    document.querySelector('#events-section h2').textContent = t('events');
    
    // 底部按钮
    document.getElementById('save-btn').textContent = t('save');
    document.getElementById('export-btn').textContent = t('exportSave');
    document.getElementById('import-btn').textContent = t('importSave');
    document.getElementById('reset-btn').textContent = t('resetGame');
    document.getElementById('lang-btn').textContent = t('langSwitch');
}
