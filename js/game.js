// 核心游戏循环

let lastTick = Date.now();
let lastUIRender = 0;
const UI_RENDER_INTERVAL = 100; // UI渲染间隔100ms（10fps）
let gameStarted = false;

// 游戏主循环
function gameLoop() {
    const now = Date.now();
    const delta = (now - lastTick) / 1000; // 秒
    lastTick = now;

    // 更新资源
    updateResources(delta);

    // 更新UI（降频渲染）
    if (now - lastUIRender > UI_RENDER_INTERVAL) {
        renderUI();
        lastUIRender = now;
    }

    requestAnimationFrame(gameLoop);
}

// 更新资源生产
function updateResources(delta) {
    const production = getProductionPerSecond();

    // 粮草生产
    addResource('grain', production.grain * delta);

    // 士兵训练（需要消耗粮草）
    const barracksCount = getBuildingCount('barracks');
    const trainingGroundCount = getBuildingCount('training_ground');
    if (barracksCount > 0 || trainingGroundCount > 0) {
        // 计算粮草消耗
        const grainCost = production.soldiers * 0.5; // 每训练1士兵消耗0.5粮草
        
        if (getResource('grain') >= grainCost * delta) {
            setResource('grain', getResource('grain') - grainCost * delta);
            addResource('soldiers', production.soldiers * delta);
        } else {
            // 粮草不足时，士兵训练速度减半
            const actualRatio = getResource('grain') / (grainCost * delta + 0.01);
            const reducedProduction = production.soldiers * Math.min(actualRatio, 1);
            setResource('grain', 0);
            addResource('soldiers', reducedProduction * delta);
        }
    }

    // 金币生产
    addResource('gold', production.gold * delta);

    // 领土生产
    if (production.territory > 0) {
        addResource('territory', production.territory * delta);
    }

    // 声望生产
    addResource('prestige', production.prestige * delta);

    // 更新游戏时间
    gameState.stats.totalPlayTime += delta;
}

// 购买建筑
function buyBuilding(buildingId, quantity = 1) {
    let purchased = 0;
    
    for (let i = 0; i < quantity; i++) {
        if (canAffordBuilding(buildingId)) {
            const cost = getBuildingCost(buildingId);
            spendResources(cost);
            gameState.buildings[buildingId]++;
            purchased++;
        } else {
            break;
        }
    }
    
    if (purchased > 0) {
        console.log(`购买了 ${purchased} 个 ${BUILDINGS[buildingId].name}`);
        renderUI(); // 立即渲染反馈
    }
}

// 招募武将
function recruitHero(heroId) {
    if (!canRecruitHero(heroId)) {
        console.log('无法招募该武将');
        return;
    }
    
    spendHeroResources(heroId);
    gameState.heroes[heroId] = true;
    console.log(`成功招募: ${HEROES.find(h => h.id === heroId).name}`);
    renderUI();
}

// 粮草换金币
function tradeGrainForGold(times) {
    const maxTimes = Math.floor(getResource('grain') / TRADE_RATES.grainToGold.grainCost);
    const actual = Math.min(times, maxTimes);
    if (actual <= 0) return;
    
    setResource('grain', getResource('grain') - TRADE_RATES.grainToGold.grainCost * actual);
    addResource('gold', TRADE_RATES.grainToGold.goldGain * actual);
    renderUI();
}

// 粮草+金币换兵力
function tradeRecruitSoldiers(times) {
    const r = TRADE_RATES.recruit;
    const maxByGrain = Math.floor(getResource('grain') / r.grainCost);
    const maxByGold = Math.floor(getResource('gold') / r.goldCost);
    const actual = Math.min(times, maxByGrain, maxByGold);
    if (actual <= 0) return;
    
    setResource('grain', getResource('grain') - r.grainCost * actual);
    setResource('gold', getResource('gold') - r.goldCost * actual);
    addResource('soldiers', r.soldierGain * actual);
    renderUI();
}

// 兵力换声望
function tradeSoldiersForPrestige(times) {
    const maxTimes = Math.floor(getResource('soldiers') / TRADE_RATES.prestige.soldierCost);
    const actual = Math.min(times, maxTimes);
    if (actual <= 0) return;
    
    setResource('soldiers', getResource('soldiers') - TRADE_RATES.prestige.soldierCost * actual);
    addResource('prestige', TRADE_RATES.prestige.prestigeGain * actual);
    renderUI();
}

// 挑战历史事件（玩家点击触发）
function challengeEvent(eventId) {
    if (isEventTriggered(eventId) || !canChallengeEvent(eventId)) return;
    
    const event = HISTORICAL_EVENTS.find(e => e.id === eventId);
    if (!event) return;
    
    triggerEvent(event.id);
    
    // 发放奖励
    if (event.reward.prestige) {
        addResource('prestige', event.reward.prestige);
    }
    if (event.reward.gold) {
        addResource('gold', event.reward.gold);
    }
    if (event.reward.grain) {
        addResource('grain', event.reward.grain);
    }
    if (event.reward.soldiers) {
        addResource('soldiers', event.reward.soldiers);
    }
    if (event.reward.territory) {
        addResource('territory', event.reward.territory);
    }
    
    console.log(`触发历史事件: ${event.name}`);
    showEventNotification(event);
    renderUI();
}

// 攻城
function attackCity(cityId) {
    if (!canAttackCity(cityId)) return;
    
    const city = CITIES.find(c => c.id === cityId);
    if (!city) return;
    
    // 消耗资源
    spendResources(city.cost);
    
    // 标记征服
    gameState.conqueredCities[cityId] = true;
    
    // 发放奖励
    for (const [res, amt] of Object.entries(city.reward)) {
        addResource(res, amt);
    }
    
    console.log(`征服城市: ${city.name}`);
    
    // 显示征服通知
    const notification = document.createElement('div');
    notification.className = 'event-notification';
    notification.innerHTML = `
        <h3>⚔️ ${t('conquered')}</h3>
        <h4>${t(city.id + 'Name')}</h4>
        <p>${city.bonusDesc}</p>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 1000);
    }, 5000);
    
    // 检查天下一统
    if (checkUnification()) {
        showUnificationVictory();
    }
    
    renderUI();
}

// 天下一统胜利画面
function showUnificationVictory() {
    const overlay = document.createElement('div');
    overlay.className = 'unification-overlay';
    overlay.innerHTML = `
        <div class="unification-content">
            <h1>${t('unificationTitle')}</h1>
            <p>${t('unificationDesc')}</p>
            <button class="trade-btn" style="margin-top:2rem;padding:0.8rem 2rem;font-size:1.2rem">${t('save')}</button>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('button').addEventListener('click', () => overlay.remove());
}

// 显示事件通知
function showEventNotification(event) {
    const notification = document.createElement('div');
    notification.className = 'event-notification';
    notification.innerHTML = `
        <h3>${t('eventTriggered')}</h3>
        <h4>${t(event.id + 'Name')}</h4>
        <p>${t(event.id + 'Desc')}</p>
        <p class="reward">${t('reward')}: ${event.rewardDesc}</p>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 1000);
    }, 5000);
}

// 选择势力
function selectFaction(factionId) {
    if (gameState.faction) {
        console.log('已选择势力，无法更改');
        return;
    }
    
    gameState.faction = factionId;
    console.log(`选择势力: ${FACTIONS[factionId].name}`);
    
    // 播放选中动画：选中卡片高亮，其他卡片淡出
    const cards = document.querySelectorAll('.faction-card');
    cards.forEach(card => {
        if (card.dataset.faction === factionId) {
            card.classList.add('selected');
        } else {
            card.classList.add('unselected');
        }
    });
    
    // 延迟显示确认提示，让选中动画先播放
    setTimeout(() => {
        const faction = FACTIONS[factionId];
        // 创建确认提示
        const toast = document.createElement('div');
        toast.className = 'faction-toast';
        toast.innerHTML = `${faction.name}<div class="toast-desc">${faction.description}</div>`;
        document.body.appendChild(toast);
        
        // 触发toast显示动画
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // 再延迟后关闭弹窗和toast
        setTimeout(() => {
            toast.classList.remove('show');
            
            const modal = document.getElementById('faction-modal');
            if (modal) {
                modal.classList.remove('active');
            }
            
            // 移除toast
            setTimeout(() => toast.remove(), 400);
            
            // 开始游戏循环
            if (!gameStarted) {
                gameStarted = true;
                gameLoop();
            }
            
            renderUI();
        }, 1200);
    }, 600);
}

// 初始化游戏
function initGame() {
    // 应用保存的语言设置
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
    document.title = t('title');
    renderAllText();
    
    // 尝试加载存档
    const loaded = loadGame();
    
    if (loaded && gameState.faction) {
        // 有存档且有势力，直接开始
        gameStarted = true;
        gameLoop();
    } else if (loaded && !gameState.faction) {
        // 有存档但没选势力（极少情况）
        showFactionModal();
    } else {
        // 新游戏，显示势力选择
        showFactionModal();
    }
    
    // 启动自动存档
    startAutosave();
}
