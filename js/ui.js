// UI渲染

// 缓存DOM元素引用
const displays = {
    grain: document.getElementById('grain-amount'),
    grainRate: document.getElementById('grain-rate'),
    soldiers: document.getElementById('soldiers-amount'),
    soldiersRate: document.getElementById('soldiers-rate'),
    gold: document.getElementById('gold-amount'),
    goldRate: document.getElementById('gold-rate'),
    territory: document.getElementById('territory-amount'),
    prestige: document.getElementById('prestige-amount')
};

const containers = {
    buildings: document.getElementById('buildings-container'),
    heroes: document.getElementById('heroes-container'),
    events: document.getElementById('events-container')
};

// 缓存建筑卡片元素，避免每次重建
let buildingCards = {};
let heroCards = {};
let eventCards = {};

// 渲染UI
function renderUI() {
    renderResources();
    renderBuildings();
    renderHeroes();
    renderEvents();
}

// 渲染资源栏
function renderResources() {
    const production = getProductionPerSecond();
    
    displays.grain.textContent = formatNumber(getResource('grain'));
    displays.grainRate.textContent = formatRate(production.grain) + t('perSecond');
    
    displays.soldiers.textContent = formatNumber(getResource('soldiers'));
    displays.soldiersRate.textContent = formatRate(production.soldiers) + t('perSecond');
    
    displays.gold.textContent = formatNumber(getResource('gold'));
    displays.goldRate.textContent = formatRate(production.gold) + t('perSecond');
    
    displays.territory.textContent = formatNumber(getResource('territory'));
    displays.prestige.textContent = formatNumber(getResource('prestige'));
}

// 渲染建筑（增量更新，不重建整个DOM）
function renderBuildings() {
    const currentIds = new Set();
    
    for (const building of Object.values(BUILDINGS)) {
        const count = getBuildingCount(building.id);
        
        // 检查是否解锁
        if (getResource('prestige') < building.unlockPrestige && count === 0) {
            continue;
        }
        
        currentIds.add(building.id);
        const cost = getBuildingCost(building.id);
        const affordable = canAffordBuilding(building.id);
        
        // 如果卡片不存在，创建它
        if (!buildingCards[building.id]) {
            const card = document.createElement('div');
            card.className = `building-card`;
            card.id = `building-${building.id}`;
            
            const costStr = Object.entries(cost)
                .map(([res, amt]) => `${getResourceName(res)}: ${formatNumber(amt)}`)
                .join(', ');
            
            const productionStr = Object.entries(building.baseProduction)
                .map(([res, amt]) => `+${amt} ${getResourceName(res)}${t('perSecond')}`)
                .join(', ');
            
            card.innerHTML = `
                <div class="building-header">
                    <span class="building-name">${t(building.id + 'Name')}</span>
                    <span class="building-count">${count}</span>
                </div>
                <div class="building-info">
                    <span class="building-production">${productionStr}</span>
                    <span class="building-cost">${costStr}</span>
                </div>
                <button class="build-btn" ${affordable ? '' : 'disabled'}>
                    ${t('buyOne')}
                </button>
            `;
            
            const btn = card.querySelector('.build-btn');
            btn.addEventListener('click', () => buyBuilding(building.id));
            
            containers.buildings.appendChild(card);
            buildingCards[building.id] = card;
        } else {
            // 只更新数值
            const card = buildingCards[building.id];
            card.querySelector('.building-name').textContent = t(building.id + 'Name');
            card.querySelector('.building-count').textContent = count;
            card.querySelector('.building-production').textContent = 
                Object.entries(building.baseProduction)
                    .map(([res, amt]) => `+${amt} ${getResourceName(res)}${t('perSecond')}`)
                    .join(', ');
            card.querySelector('.building-cost').textContent = 
                Object.entries(cost)
                    .map(([res, amt]) => `${getResourceName(res)}: ${formatNumber(amt)}`)
                    .join(', ');
            
            const btn = card.querySelector('.build-btn');
            btn.textContent = t('buyOne');
            btn.disabled = !affordable;
            
            // 更新样式类
            card.classList.toggle('affordable', affordable);
            card.classList.toggle('locked', !affordable);
        }
    }
    
    // 移除不再需要的卡片
    for (const id of Object.keys(buildingCards)) {
        if (!currentIds.has(id)) {
            buildingCards[id].remove();
            delete buildingCards[id];
        }
    }
}

// 渲染武将（增量更新）
function renderHeroes() {
    const currentIds = new Set();
    
    for (const hero of HEROES) {
        const recruited = hasHero(hero.id);
        const affordable = canRecruitHero(hero.id);
        const unlocked = getResource('prestige') >= hero.unlockPrestige;
        
        if (!unlocked && !recruited) {
            continue;
        }
        
        currentIds.add(hero.id);
        
        if (!heroCards[hero.id]) {
            const card = document.createElement('div');
            card.className = `hero-card ${recruited ? 'recruited' : ''} ${hero.quality}`;
            card.id = `hero-${hero.id}`;
            
            const costStr = Object.entries(hero.cost)
                .map(([res, amt]) => `${getResourceName(res)}: ${formatNumber(amt)}`)
                .join(', ');
            
            card.innerHTML = `
                <div class="hero-name">${t(hero.id + 'Name')}</div>
                <div class="hero-quality ${hero.quality}">${hero.quality.toUpperCase()}</div>
                <div class="hero-bonus">${hero.bonusDesc}</div>
                ${!recruited ? `<div class="hero-cost">${t('recruitCost')}: ${costStr}</div>` : ''}
                <button class="recruit-btn ${recruited ? 'recruited' : ''}" ${recruited || !affordable ? 'disabled' : ''}>
                    ${recruited ? t('recruited') : t('recruit')}
                </button>
            `;
            
            if (!recruited) {
                const btn = card.querySelector('.recruit-btn');
                btn.addEventListener('click', () => recruitHero(hero.id));
            }
            
            containers.heroes.appendChild(card);
            heroCards[hero.id] = card;
        } else {
            // 只更新按钮状态
            const card = heroCards[hero.id];
            const btn = card.querySelector('.recruit-btn');
            
            // 更新名称（语言切换时）
            card.querySelector('.hero-name').textContent = t(hero.id + 'Name');
            
            if (recruited) {
                btn.textContent = t('recruited');
                btn.disabled = true;
                btn.classList.add('recruited');
                card.classList.add('recruited');
                
                // 隐藏消耗显示
                const costEl = card.querySelector('.hero-cost');
                if (costEl) costEl.remove();
            } else {
                btn.textContent = t('recruit');
                btn.disabled = !affordable;
            }
        }
    }
    
    // 移除不再需要的卡片
    for (const id of Object.keys(heroCards)) {
        if (!currentIds.has(id)) {
            heroCards[id].remove();
            delete heroCards[id];
        }
    }
}

// 渲染历史事件（增量更新）
function renderEvents() {
    const currentIds = new Set();
    
    for (const event of HISTORICAL_EVENTS) {
        const triggered = isEventTriggered(event.id);
        currentIds.add(event.id);
        
        if (!eventCards[event.id]) {
            const card = document.createElement('div');
            card.className = `event-card ${triggered ? 'triggered' : ''}`;
            card.id = `event-${event.id}`;
            
            const progressStr = Object.entries(event.trigger)
                .map(([res, amount]) => {
                    const current = getResource(res);
                    const percent = Math.min((current / amount) * 100, 100).toFixed(0);
                    return `${getResourceName(res)}: ${percent}%`;
                })
                .join(', ');
            
            card.innerHTML = `
                <div class="event-name">${triggered ? '✅ ' : ''}${t(event.id + 'Name')}</div>
                <div class="event-desc">${t(event.id + 'Desc')}</div>
                <div class="event-reward">${t('reward')}: ${event.rewardDesc}</div>
                ${!triggered ? `<div class="event-progress">${t('triggerCondition')}: ${progressStr}</div>` : ''}
            `;
            
            containers.events.appendChild(card);
            eventCards[event.id] = card;
        } else {
            // 只更新进度和状态
            const card = eventCards[event.id];
            card.querySelector('.event-name').textContent = `${triggered ? '✅ ' : ''}${t(event.id + 'Name')}`;
            card.querySelector('.event-desc').textContent = t(event.id + 'Desc');
            
            if (triggered && !card.classList.contains('triggered')) {
                card.classList.add('triggered');
                
                // 移除进度显示
                const progressEl = card.querySelector('.event-progress');
                if (progressEl) progressEl.remove();
            } else if (!triggered) {
                const progressStr = Object.entries(event.trigger)
                    .map(([res, amount]) => {
                        const current = getResource(res);
                        const percent = Math.min((current / amount) * 100, 100).toFixed(0);
                        return `${getResourceName(res)}: ${percent}%`;
                    })
                    .join(', ');
                
                const progressEl = card.querySelector('.event-progress');
                if (progressEl) {
                    progressEl.textContent = `${t('triggerCondition')}: ${progressStr}`;
                }
            }
        }
    }
    
    // 移除不再需要的卡片
    for (const id of Object.keys(eventCards)) {
        if (!currentIds.has(id)) {
            eventCards[id].remove();
            delete eventCards[id];
        }
    }
}

// 获取资源名称（带emoji和翻译）
function getResourceName(resource) {
    const icons = {
        grain: '🌾',
        soldiers: '⚔️',
        gold: '💰',
        territory: '🏯',
        prestige: '⭐'
    };
    return (icons[resource] || '') + t(resource);
}

// 显示势力选择弹窗
function showFactionModal() {
    const modal = document.getElementById('faction-modal');
    if (modal) {
        modal.classList.add('active');
        renderAllText();
    }
    
    // 绑定势力选择事件
    document.querySelectorAll('.faction-card').forEach(card => {
        card.addEventListener('click', () => {
            const faction = card.dataset.faction;
            selectFaction(faction);
        });
    });
}

// 绑定底部按钮事件
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('save-btn').addEventListener('click', () => {
        saveGame();
        alert(t('saveSuccess'));
    });
    
    document.getElementById('export-btn').addEventListener('click', exportSave);
    document.getElementById('import-btn').addEventListener('click', importSave);
    document.getElementById('reset-btn').addEventListener('click', resetGame);
    document.getElementById('lang-btn').addEventListener('click', toggleLanguage);
});
