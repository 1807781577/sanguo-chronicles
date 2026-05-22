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
        trade: '交易',
        tradeGrainToGold: '粮草换金币',
        tradeBtn: '交易',
        tradeRecruit: '征兵',
        tradePrestigeBtn: '扬名',
        tradeFrom: '粮草',
        tradeTo: '金币',
        tradeToPrestige: '声望',
        tradeNotEnough: '粮草不足！',
        tradeSuccess: '交易成功！获得 {gold} 金币',
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
        challenge: '挑战',
        challengeReady: '可挑战',
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
        warlordsName: '群雄割据',
        warlordsDesc: '诸侯混战，各据一方',
        guanduName: '官渡之战',
        guanduDesc: '奇袭乌巢，大破袁绍',
        chibiName: '赤壁之战',
        chibiDesc: '火烧连营，以少胜多',
        dingjunshanName: '定军山之战',
        dingjunshanDesc: '老将黄忠，定军斩夏侯',
        yilingName: '夷陵之战',
        yilingDesc: '火烧连营七百里',
        northern_expeditionName: '北伐中原',
        northern_expeditionDesc: '出师未捷身先死',
        unificationName: '三国归晋',
        unificationDesc: '天下一统，分久必合',

        // 武将名称 - 黄巾之乱
        zhangjiaoName: '张角', zhangbaoName: '张宝', zhangliangName: '张梁',
        liubeiName: '刘备', guanyuName: '关羽', zhangfeiName: '张飞',
        gongsunzanName: '公孙瓒', huangfusongName: '皇甫嵩', luzhiName: '卢植',
        chengyuanzhiName: '程远志', gaoshengName: '高升', yanzhengName: '严政', yujiName: '于吉',
        // 讨董联盟
        lvbuName: '吕布', dongzhuoName: '董卓', diaochanName: '貂蝉',
        caocaoName: '曹操', yuanshaoName: '袁绍', yuanshuName: '袁术',
        sunjianName: '孙坚', huaxiongName: '华雄', wangyunName: '王允',
        chengongName: '陈宫', zhangliaoName: '张辽', lijueName: '李傕',
        guosiName: '郭汜', xurongName: '徐荣', lisuName: '李肃', wuxiName: '伍习',
        // 群雄割据
        dianweiName: '典韦', xiahoudunName: '夏侯惇', xiahouyuanName: '夏侯渊',
        xuchuName: '许褚', guojiaName: '郭嘉', xunyuName: '荀彧', chengyuName: '程昱',
        sunceName: '孙策', daqiaoName: '大乔', xiaoqiaoName: '小乔',
        sunshangxiangName: '孙尚香', taishiciName: '太史慈', ganningName: '甘宁',
        huanggaiName: '黄盖', chengpuName: '程普', handangName: '韩当',
        liubiaoName: '刘表', zhangxiuName: '张绣', yanliangName: '颜良',
        wenchouName: '文丑', jilingName: '纪灵', taoqianName: '陶谦',
        kongrongName: '孔融', chendengName: '陈登', huatuoName: '华佗',
        // 官渡之战
        xunyouName: '荀攸', jiaxuName: '贾诩', liuyeName: '刘晔',
        yujinName: '于禁', yuejinName: '乐进', zhangheName: '张郃',
        gaolanName: '高览', tianfengName: '田丰', jusuoName: '沮授',
        shenpeiName: '审配', guotuName: '郭图', fengjiName: '逢纪',
        chunyuqiongName: '淳于琼', xinpiName: '辛毗', jiangjiName: '蒋济', cuiyanName: '崔琰',
        // 赤壁之战
        zhuge_liangName: '诸葛亮', zhaoyunName: '赵云', huangzhongName: '黄忠',
        weiyanName: '魏延', pangtongName: '庞统', zhenjiName: '甄姬',
        caiwenjiName: '蔡文姬', zhouyuName: '周瑜', lusuName: '鲁肃',
        lvmengName: '吕蒙', luxunName: '陆逊', lingtongName: '凌统',
        dingfengName: '丁奉', xushengName: '徐盛', kanzeName: '阚泽',
        buzhiName: '步骘', caimaoName: '蔡瑁', zhangyunName: '张允',
        jiangganName: '蒋干', huangzuName: '黄祖',
        // 定军山之战
        fazhengName: '法正', machaoName: '马超', madaiName: '马岱',
        yanyanName: '严颜', menghuoName: '孟获', zhurongName: '祝融',
        wuyiName: '吴懿', mengdaName: '孟达', liufengName: '刘封',
        caohongName: '曹洪', caoxiuName: '曹休', caozhenName: '曹真',
        xiahoushangName: '夏侯尚', xuhuangName: '徐晃', wangpingName: '王平', zhangniName: '张嶷',
        // 夷陵之战
        sunquanName: '孙权', zhuranName: '朱然', quancongName: '全琮',
        zhuhuanName: '朱桓', panzhangName: '潘璋', heqiName: '贺齐',
        mazhong_wuName: '马忠', shamokeName: '沙摩柯', fengxiName: '冯习',
        zhangnanName: '张南', furongName: '傅肜', xiangchongName: '向宠',
        lukangName: '陆抗', sunhuanName: '孙桓', luotongName: '骆统',
        // 北伐中原
        jiangweiName: '姜维', dengaiName: '邓艾', zhonghuiName: '钟会',
        simayiName: '司马懿', simashiName: '司马师', simazhaoName: '司马昭',
        haozhaoName: '郝昭', caoshuangName: '曹爽', wangshuangName: '王双',
        chentaiName: '陈泰', mazhong_shuName: '马忠', zhangyiName: '张翼',
        liaohuaName: '廖化', feiyiName: '费祎', dongyunName: '董允',
        sunliName: '孙礼', zuociName: '左慈', dailingName: '戴陵',
        // 三国归晋
        simayanName: '司马炎', yanghuName: '羊祜', duyuName: '杜预',
        wangjunName: '王濬', liushanName: '刘禅', sunhaoName: '孙皓',
        jiachongName: '贾充', weiguanName: '卫瓘', wanghunName: '王浑',
        xunxuName: '荀勖', zhanghuaName: '张华', chenqianName: '陈骞',
        hufenName: '胡奋', zhugezhanName: '诸葛瞻', luoxianName: '罗宪', tangziName: '唐咨',

        // 征伐天下
        conquestMap: '征伐天下',
        attack: '攻城',
        conquered: '已征服',
        cityLocked: '未解锁',
        cityRequires: '需要完成',
        unificationTitle: '天下一统',
        unificationDesc: '天下一统，四海归一！全部产出永久 +25%',
        defenseRequired: '防御要求',
        attackCost: '攻城消耗',
        conquestReward: '征服奖励',
        permanentBonus: '永久加成',
        cityProgress: '征服进度',

        // 城市名称
        qiaojunName: '谯郡', chenliuName: '陈留', yechengName: '邺城',
        luoyangName: '洛阳', hefeiName: '合肥', xiangyangName: '襄阳',
        changanName: '长安', xuchangName: '许昌',
        nanzhongName: '南中', zitongName: '梓潼', jianningName: '建宁',
        jiangzhouName: '江州', yonganName: '永安', wuduName: '武都',
        hanzhongName: '汉中', chengduName: '成都',
        jiaozhouName: '交州', lujiangName: '庐江', kuaijiName: '会稽',
        yuzhangName: '豫章', chaisangName: '柴桑', changshaName: '长沙',
        wuchangName: '武昌', jianyeName: '建业',

        // 武将解锁
        unlockEvent: '解锁事件',

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
        trade: 'Trade',
        tradeGrainToGold: 'Grain for Gold',
        tradeBtn: 'Trade',
        tradeRecruit: 'Recruit',
        tradePrestigeBtn: 'Glorify',
        tradeFrom: 'Grain',
        tradeTo: 'Gold',
        tradeToPrestige: 'Prestige',
        tradeNotEnough: 'Not enough grain!',
        tradeSuccess: 'Trade success! Got {gold} gold',
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
        challenge: 'Challenge',
        challengeReady: 'Ready',
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
        warlordsName: 'Warlords Division',
        warlordsDesc: 'Warlords clash, each claiming their domain',
        guanduName: 'Battle of Guandu',
        guanduDesc: 'Surprise attack at Wuchao, crushing Yuan Shao',
        chibiName: 'Battle of Red Cliffs',
        chibiDesc: 'Fire on the river, victory against odds',
        dingjunshanName: 'Battle of Mount Dingjun',
        dingjunshanDesc: 'Veteran Huang Zhong slays Xiahou Yuan',
        yilingName: 'Battle of Yiling',
        yilingDesc: 'Seven hundred li of burning camps',
        northern_expeditionName: 'Northern Expedition',
        northern_expeditionDesc: 'The campaign ends before success',
        unificationName: 'Unification under Jin',
        unificationDesc: 'The empire, long divided, must unite',

        // Hero names - Yellow Turban
        zhangjiaoName: 'Zhang Jiao', zhangbaoName: 'Zhang Bao', zhangliangName: 'Zhang Liang',
        liubeiName: 'Liu Bei', guanyuName: 'Guan Yu', zhangfeiName: 'Zhang Fei',
        gongsunzanName: 'Gongsun Zan', huangfusongName: 'Huangfu Song', luzhiName: 'Lu Zhi',
        chengyuanzhiName: 'Cheng Yuanzhi', gaoshengName: 'Gao Sheng', yanzhengName: 'Yan Zheng', yujiName: 'Yu Ji',
        // Coalition
        lvbuName: 'Lu Bu', dongzhuoName: 'Dong Zhuo', diaochanName: 'Diao Chan',
        caocaoName: 'Cao Cao', yuanshaoName: 'Yuan Shao', yuanshuName: 'Yuan Shu',
        sunjianName: 'Sun Jian', huaxiongName: 'Hua Xiong', wangyunName: 'Wang Yun',
        chengongName: 'Chen Gong', zhangliaoName: 'Zhang Liao', lijueName: 'Li Jue',
        guosiName: 'Guo Si', xurongName: 'Xu Rong', lisuName: 'Li Su', wuxiName: 'Wu Xi',
        // Warlords
        dianweiName: 'Dian Wei', xiahoudunName: 'Xiahou Dun', xiahouyuanName: 'Xiahou Yuan',
        xuchuName: 'Xu Chu', guojiaName: 'Guo Jia', xunyuName: 'Xun Yu', chengyuName: 'Cheng Yu',
        sunceName: 'Sun Ce', daqiaoName: 'Da Qiao', xiaoqiaoName: 'Xiao Qiao',
        sunshangxiangName: 'Sun Shangxiang', taishiciName: 'Taishi Ci', ganningName: 'Gan Ning',
        huanggaiName: 'Huang Gai', chengpuName: 'Cheng Pu', handangName: 'Han Dang',
        liubiaoName: 'Liu Biao', zhangxiuName: 'Zhang Xiu', yanliangName: 'Yan Liang',
        wenchouName: 'Wen Chou', jilingName: 'Ji Ling', taoqianName: 'Tao Qian',
        kongrongName: 'Kong Rong', chendengName: 'Chen Deng', huatuoName: 'Hua Tuo',
        // Guandu
        xunyouName: 'Xun You', jiaxuName: 'Jia Xu', liuyeName: 'Liu Ye',
        yujinName: 'Yu Jin', yuejinName: 'Yue Jin', zhangheName: 'Zhang He',
        gaolanName: 'Gao Lan', tianfengName: 'Tian Feng', jusuoName: 'Ju Shou',
        shenpeiName: 'Shen Pei', guotuName: 'Guo Tu', fengjiName: 'Feng Ji',
        chunyuqiongName: 'Chunyu Qiong', xinpiName: 'Xin Pi', jiangjiName: 'Jiang Ji', cuiyanName: 'Cui Yan',
        // Chibi
        zhuge_liangName: 'Zhuge Liang', zhaoyunName: 'Zhao Yun', huangzhongName: 'Huang Zhong',
        weiyanName: 'Wei Yan', pangtongName: 'Pang Tong', zhenjiName: 'Zhen Ji',
        caiwenjiName: 'Cai Wenji', zhouyuName: 'Zhou Yu', lusuName: 'Lu Su',
        lvmengName: 'Lu Meng', luxunName: 'Lu Xun', lingtongName: 'Ling Tong',
        dingfengName: 'Ding Feng', xushengName: 'Xu Sheng', kanzeName: 'Kan Ze',
        buzhiName: 'Bu Zhi', caimaoName: 'Cai Mao', zhangyunName: 'Zhang Yun',
        jiangganName: 'Jiang Gan', huangzuName: 'Huang Zu',
        // Dingjunshan
        fazhengName: 'Fa Zheng', machaoName: 'Ma Chao', madaiName: 'Ma Dai',
        yanyanName: 'Yan Yan', menghuoName: 'Meng Huo', zhurongName: 'Zhurong',
        wuyiName: 'Wu Yi', mengdaName: 'Meng Da', liufengName: 'Liu Feng',
        caohongName: 'Cao Hong', caoxiuName: 'Cao Xiu', caozhenName: 'Cao Zhen',
        xiahoushangName: 'Xiahou Shang', xuhuangName: 'Xu Huang', wangpingName: 'Wang Ping', zhangniName: 'Zhang Ni',
        // Yiling
        sunquanName: 'Sun Quan', zhuranName: 'Zhu Ran', quancongName: 'Quan Cong',
        zhuhuanName: 'Zhu Huan', panzhangName: 'Pan Zhang', heqiName: 'He Qi',
        mazhong_wuName: 'Ma Zhong', shamokeName: 'Sha Moke', fengxiName: 'Feng Xi',
        zhangnanName: 'Zhang Nan', furongName: 'Fu Rong', xiangchongName: 'Xiang Chong',
        lukangName: 'Lu Kang', sunhuanName: 'Sun Huan', luotongName: 'Luo Tong',
        // Northern Expedition
        jiangweiName: 'Jiang Wei', dengaiName: 'Deng Ai', zhonghuiName: 'Zhong Hui',
        simayiName: 'Sima Yi', simashiName: 'Sima Shi', simazhaoName: 'Sima Zhao',
        haozhaoName: 'Hao Zhao', caoshuangName: 'Cao Shuang', wangshuangName: 'Wang Shuang',
        chentaiName: 'Chen Tai', mazhong_shuName: 'Ma Zhong', zhangyiName: 'Zhang Yi',
        liaohuaName: 'Liao Hua', feiyiName: 'Fei Yi', dongyunName: 'Dong Yun',
        sunliName: 'Sun Li', zuociName: 'Zuo Ci', dailingName: 'Dai Ling',
        // Unification
        simayanName: 'Sima Yan', yanghuName: 'Yang Hu', duyuName: 'Du Yu',
        wangjunName: 'Wang Jun', liushanName: 'Liu Shan', sunhaoName: 'Sun Hao',
        jiachongName: 'Jia Chong', weiguanName: 'Wei Guan', wanghunName: 'Wang Hun',
        xunxuName: 'Xun Xu', zhanghuaName: 'Zhang Hua', chenqianName: 'Chen Qian',
        hufenName: 'Hu Fen', zhugezhanName: 'Zhuge Zhan', luoxianName: 'Luo Xian', tangziName: 'Tang Zi',

        // Conquest Map
        conquestMap: 'Conquest',
        attack: 'Attack',
        conquered: 'Conquered',
        cityLocked: 'Locked',
        cityRequires: 'Requires',
        unificationTitle: 'Unification',
        unificationDesc: 'The empire is united! All production permanently +25%',
        defenseRequired: 'Defense',
        attackCost: 'Cost',
        conquestReward: 'Reward',
        permanentBonus: 'Permanent Bonus',
        cityProgress: 'Conquest Progress',

        // City names
        qiaojunName: 'Qiaojun', chenliuName: 'Chenliu', yechengName: 'Yecheng',
        luoyangName: 'Luoyang', hefeiName: 'Hefei', xiangyangName: 'Xiangyang',
        changanName: "Chang'an", xuchangName: 'Xuchang',
        nanzhongName: 'Nanzhong', zitongName: 'Zitong', jianningName: 'Jianning',
        jiangzhouName: 'Jiangzhou', yonganName: "Yong'an", wuduName: 'Wudu',
        hanzhongName: 'Hanzhong', chengduName: 'Chengdu',
        jiaozhouName: 'Jiaozhou', lujiangName: 'Lujiang', kuaijiName: 'Kuaiji',
        yuzhangName: 'Yuzhang', chaisangName: 'Chaisang', changshaName: 'Changsha',
        wuchangName: 'Wuchang', jianyeName: 'Jianye',

        // Hero unlock
        unlockEvent: 'Unlock Event',

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
    cityCards = {};
    cityListCards = {};
    containers.buildings.innerHTML = '';
    containers.heroes.innerHTML = '';
    containers.events.innerHTML = '';
    const svgCities = document.getElementById('map-cities');
    const svgRoads = document.getElementById('map-roads');
    if (svgCities) svgCities.innerHTML = '';
    if (svgRoads) svgRoads.innerHTML = '';
    containers.mapList.innerHTML = '';
    
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
    document.querySelector('#trade-section h2').textContent = t('trade');
    document.querySelector('#heroes-section h2').textContent = t('heroes');
    document.querySelector('#events-section h2').textContent = t('events');
    document.querySelector('#map-section h2').textContent = t('conquestMap');

    // 交易区
    const trade1From = document.getElementById('trade1-from');
    const trade1To = document.getElementById('trade1-to');
    const trade1Btn = document.getElementById('trade1-btn');
    const trade2From = document.getElementById('trade2-from');
    const trade2To = document.getElementById('trade2-to');
    const trade2Btn = document.getElementById('trade2-btn');
    const trade3From = document.getElementById('trade3-from');
    const trade3To = document.getElementById('trade3-to');
    const trade3Btn = document.getElementById('trade3-btn');
    if (trade1From) trade1From.textContent = `🌾 ${TRADE_RATES.grainToGold.grainCost} ${t('tradeFrom')}`;
    if (trade1To) trade1To.textContent = `💰 ${TRADE_RATES.grainToGold.goldGain} ${t('tradeTo')}`;
    if (trade1Btn) trade1Btn.textContent = t('tradeBtn');
    if (trade2From) trade2From.textContent = `🌾 ${TRADE_RATES.recruit.grainCost} ${t('tradeFrom')} + 💰 ${TRADE_RATES.recruit.goldCost} ${t('tradeTo')}`;
    if (trade2To) trade2To.textContent = `⚔️ ${TRADE_RATES.recruit.soldierGain} ${t('soldiers')}`;
    if (trade2Btn) trade2Btn.textContent = t('tradeRecruit');
    if (trade3From) trade3From.textContent = `⚔️ ${TRADE_RATES.prestige.soldierCost} ${t('soldiers')}`;
    if (trade3To) trade3To.textContent = `⭐ ${TRADE_RATES.prestige.prestigeGain} ${t('tradeToPrestige')}`;
    if (trade3Btn) trade3Btn.textContent = t('tradePrestigeBtn');
    
    // 底部按钮
    document.getElementById('save-btn').textContent = t('save');
    document.getElementById('export-btn').textContent = t('exportSave');
    document.getElementById('import-btn').textContent = t('importSave');
    document.getElementById('reset-btn').textContent = t('resetGame');
    document.getElementById('lang-btn').textContent = t('langSwitch');
}
