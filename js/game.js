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

    // 检查历史事件
    checkHistoricalEvents();

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

// 检查历史事件
function checkHistoricalEvents() {
    for (const event of HISTORICAL_EVENTS) {
        if (isEventTriggered(event.id)) continue;
        
        let triggered = true;
        
        // 检查触发条件
        for (const [resource, amount] of Object.entries(event.trigger)) {
            if (getResource(resource) < amount) {
                triggered = false;
                break;
            }
        }
        
        if (triggered) {
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
                addResource('territory', getResource('territory') + event.reward.territory);
            }
            
            console.log(`触发历史事件: ${event.name}`);
            showEventNotification(event);
        }
    }
}

// 显示事件通知
function showEventNotification(event) {
    const notification = document.createElement('div');
    notification.className = 'event-notification';
    notification.innerHTML = `
        <h3>🏆 历史事件触发</h3>
        <h4>${event.name}</h4>
        <p>${event.description}</p>
        <p class="reward">奖励: ${event.rewardDesc}</p>
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
    
    // 隐藏弹窗
    const modal = document.getElementById('faction-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // 开始游戏循环
    if (!gameStarted) {
        gameStarted = true;
        gameLoop();
    }
    
    renderUI();
}

// 初始化游戏
function initGame() {
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
