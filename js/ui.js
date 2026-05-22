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
    territoryRate: document.getElementById('territory-rate'),
    prestige: document.getElementById('prestige-amount'),
    prestigeRate: document.getElementById('prestige-rate')
};

const containers = {
    buildings: document.getElementById('buildings-container'),
    heroes: document.getElementById('heroes-container'),
    events: document.getElementById('events-container'),
    map: document.getElementById('map-container'),
    mapList: document.getElementById('map-list-view')
};

// 缓存建筑卡片元素，避免每次重建
let buildingCards = {};
let heroCards = {};
let eventCards = {};
let cityCards = {};
let cityListCards = {};

// 渲染UI
function renderUI() {
    renderResources();
    renderBuildings();
    renderHeroes();
    renderEvents();
    renderMap();
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
    displays.territoryRate.textContent = production.territory > 0 ? formatRate(production.territory) + t('perSecond') : '';
    
    displays.prestige.textContent = formatNumber(getResource('prestige'));
    displays.prestigeRate.textContent = production.prestige > 0 ? formatRate(production.prestige) + t('perSecond') : '';
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
        const unlocked = !hero.unlockEvent || isEventTriggered(hero.unlockEvent);
        
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
                ${hero.unlockEvent ? `<div class="hero-unlock">${t('unlockEvent')}: ${t(hero.unlockEvent + 'Name')}</div>` : ''}
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
        const canChallenge = canChallengeEvent(event.id);
        currentIds.add(event.id);
        
        if (!eventCards[event.id]) {
            const card = document.createElement('div');
            card.className = `event-card ${triggered ? 'triggered' : ''} ${canChallenge ? 'challengeable' : ''}`;
            card.id = `event-${event.id}`;
            
            const progressStr = Object.entries(event.trigger)
                .map(([res, amount]) => {
                    const current = getResource(res);
                    const percent = Math.min((current / amount) * 100, 100).toFixed(0);
                    return `${getResourceName(res)}: ${percent}%`;
                })
                .join(', ');
            
            let inner = `
                <div class="event-name">${triggered ? '✅ ' : ''}${t(event.id + 'Name')}</div>
                <div class="event-desc">${t(event.id + 'Desc')}</div>
                <div class="event-reward">${t('reward')}: ${event.rewardDesc}</div>
            `;
            
            if (triggered) {
                // 已完成，不显示按钮
            } else if (canChallenge) {
                inner += `<button class="challenge-btn">${t('challenge')}</button>`;
            } else {
                inner += `<div class="event-progress">${t('triggerCondition')}: ${progressStr}</div>`;
            }
            
            card.innerHTML = inner;
            
            // 绑定挑战按钮
            const btn = card.querySelector('.challenge-btn');
            if (btn) {
                btn.addEventListener('click', () => challengeEvent(event.id));
            }
            
            containers.events.appendChild(card);
            eventCards[event.id] = card;
        } else {
            const card = eventCards[event.id];
            card.querySelector('.event-name').textContent = `${triggered ? '✅ ' : ''}${t(event.id + 'Name')}`;
            card.querySelector('.event-desc').textContent = t(event.id + 'Desc');
            card.querySelector('.event-reward').textContent = `${t('reward')}: ${event.rewardDesc}`;
            
            if (triggered) {
                if (!card.classList.contains('triggered')) {
                    card.classList.add('triggered');
                    card.classList.remove('challengeable');
                    // 移除挑战按钮
                    const btn = card.querySelector('.challenge-btn');
                    if (btn) btn.remove();
                    const progressEl = card.querySelector('.event-progress');
                    if (progressEl) progressEl.remove();
                }
            } else if (canChallenge) {
                if (!card.classList.contains('challengeable')) {
                    card.classList.add('challengeable');
                    // 移除进度显示，添加挑战按钮
                    const progressEl = card.querySelector('.event-progress');
                    if (progressEl) progressEl.remove();
                    
                    const btn = document.createElement('button');
                    btn.className = 'challenge-btn';
                    btn.textContent = t('challenge');
                    btn.addEventListener('click', () => challengeEvent(event.id));
                    card.appendChild(btn);
                }
                // 更新按钮文本（语言切换）
                const btn = card.querySelector('.challenge-btn');
                if (btn) btn.textContent = t('challenge');
            } else {
                card.classList.remove('challengeable');
                // 更新进度
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
                } else {
                    // 之前是可挑战状态，现在条件不满足了（理论上不会发生，但以防万一）
                    const btn = card.querySelector('.challenge-btn');
                    if (btn) btn.remove();
                    const newProgress = document.createElement('div');
                    newProgress.className = 'event-progress';
                    newProgress.textContent = `${t('triggerCondition')}: ${progressStr}`;
                    card.appendChild(newProgress);
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

// 渲染攻城地图
function renderMap() {
    let conqueredCount = 0;
    const totalCities = CITIES.length;
    const svgCities = document.getElementById('map-cities');
    const svgRoads = document.getElementById('map-roads');
    
    // === 渲染道路连线（仅首次） ===
    if (svgRoads && svgRoads.children.length === 0) {
        for (const [cityAId, cityBId] of CITY_CONNECTIONS) {
            const cityA = CITIES.find(c => c.id === cityAId);
            const cityB = CITIES.find(c => c.id === cityBId);
            if (!cityA || !cityB) continue;
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', cityA.position.x);
            line.setAttribute('y1', cityA.position.y);
            line.setAttribute('x2', cityB.position.x);
            line.setAttribute('y2', cityB.position.y);
            line.setAttribute('class', 'map-road');
            svgRoads.appendChild(line);
        }
    }
    
    for (const city of CITIES) {
        const conquered = isCityConquered(city.id);
        const attackable = canAttackCity(city.id);
        const locked = !conquered && !attackable;
        if (conquered) conqueredCount++;
        
        // === SVG 地图节点 ===
        if (!cityCards[city.id]) {
            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', `city-group ${city.faction} ${conquered ? 'conquered' : attackable ? 'attackable' : 'locked'}`);
            g.setAttribute('data-city', city.id);
            
            // 城市圆形节点
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', city.position.x);
            circle.setAttribute('cy', city.position.y);
            circle.setAttribute('r', conquered ? 2.2 : 1.8);
            circle.setAttribute('class', 'city-circle');
            
            // 城市名称标签
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', city.position.x);
            text.setAttribute('y', city.position.y - 2.8);
            text.setAttribute('class', 'city-label');
            text.textContent = conquered ? '✓' : t(city.id + 'Name').slice(0, 2);
            
            // 悬停提示框背景
            const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            tooltipBg.setAttribute('class', 'city-tooltip-bg');
            tooltipBg.setAttribute('rx', 0.8);
            tooltipBg.setAttribute('ry', 0.8);
            tooltipBg.style.display = 'none';
            
            // 悬停提示文字
            const tooltipText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            tooltipText.setAttribute('class', 'city-tooltip-text');
            tooltipText.style.display = 'none';
            updateCityTooltipContent(tooltipText, tooltipBg, city, conquered, attackable, locked);
            
            g.appendChild(circle);
            g.appendChild(text);
            g.appendChild(tooltipBg);
            g.appendChild(tooltipText);
            
            // 点击攻城
            if (attackable && !conquered) {
                g.style.cursor = 'pointer';
                g.addEventListener('click', () => attackCity(city.id));
            }
            
            // 悬停事件
            g.addEventListener('mouseenter', () => {
                tooltipBg.style.display = '';
                tooltipText.style.display = '';
            });
            g.addEventListener('mouseleave', () => {
                tooltipBg.style.display = 'none';
                tooltipText.style.display = 'none';
            });
            
            svgCities.appendChild(g);
            cityCards[city.id] = g;
        } else {
            const g = cityCards[city.id];
            g.setAttribute('class', `city-group ${city.faction} ${conquered ? 'conquered' : attackable ? 'attackable' : 'locked'}`);
            
            const circle = g.querySelector('.city-circle');
            circle.setAttribute('r', conquered ? 2.2 : 1.8);
            
            const text = g.querySelector('.city-label');
            text.textContent = conquered ? '✓' : t(city.id + 'Name').slice(0, 2);
            
            // 更新tooltip
            const tooltipBg = g.querySelector('.city-tooltip-bg');
            const tooltipText = g.querySelector('.city-tooltip-text');
            updateCityTooltipContent(tooltipText, tooltipBg, city, conquered, attackable, locked);
            
            // 更新点击事件
            if (attackable && !conquered) {
                g.style.cursor = 'pointer';
                g.onclick = () => attackCity(city.id);
            } else {
                g.style.cursor = conquered ? 'default' : 'not-allowed';
                g.onclick = null;
            }
        }
        
        // === 移动端列表 ===
        if (!cityListCards[city.id]) {
            const card = document.createElement('div');
            card.className = `city-card-mobile ${conquered ? 'conquered' : attackable ? 'attackable' : 'locked'}`;
            card.innerHTML = buildCityMobileCard(city, conquered, attackable, locked);
            
            if (attackable && !conquered) {
                const btn = card.querySelector('.attack-btn');
                if (btn) btn.addEventListener('click', () => attackCity(city.id));
            }
            
            containers.mapList.appendChild(card);
            cityListCards[city.id] = card;
        } else {
            const card = cityListCards[city.id];
            card.className = `city-card-mobile ${conquered ? 'conquered' : attackable ? 'attackable' : 'locked'}`;
            card.innerHTML = buildCityMobileCard(city, conquered, attackable, locked);
            
            if (attackable && !conquered) {
                const btn = card.querySelector('.attack-btn');
                if (btn) btn.addEventListener('click', () => attackCity(city.id));
            }
        }
    }
    
    // 更新进度
    const progressText = document.getElementById('map-progress-text');
    const progressFill = document.getElementById('map-progress-fill');
    if (progressText) progressText.textContent = `${conqueredCount} / ${totalCities}`;
    if (progressFill) progressFill.style.width = `${(conqueredCount / totalCities * 100).toFixed(1)}%`;
}

// 更新SVG城市tooltip内容和位置
function updateCityTooltipContent(textEl, bgEl, city, conquered, attackable, locked) {
    const costStr = Object.entries(city.cost)
        .map(([res, amt]) => `${getResourceName(res)}: ${formatNumber(amt)}`)
        .join(', ');
    
    let lines = [`<b>${t(city.id + 'Name')}</b>`];
    if (conquered) {
        lines.push(`✅ ${t('conquered')}`);
        lines.push(`${t('permanentBonus')}: ${city.bonusDesc}`);
    } else if (locked) {
        lines.push(`🔒 ${t('cityLocked')}`);
        if (city.unlockEvent) lines.push(`${t('cityRequires')}: ${t(city.unlockEvent + 'Name')}`);
        lines.push(`${t('defenseRequired')}: ⚔️ ${formatNumber(city.defense)}`);
    } else {
        lines.push(`${t('defenseRequired')}: ⚔️ ${formatNumber(city.defense)}`);
        lines.push(`${t('attackCost')}: ${costStr}`);
        lines.push(`${t('permanentBonus')}: ${city.bonusDesc}`);
    }
    
    // 构建多行tspan
    while (textEl.firstChild) textEl.removeChild(textEl.firstChild);
    const startY = city.position.y - 5;
    const lineHeight = 2;
    
    lines.forEach((line, i) => {
        const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttribute('x', city.position.x);
        tspan.setAttribute('dy', i === 0 ? 0 : lineHeight);
        tspan.textContent = line.replace(/<[^>]+>/g, '');
        if (line.startsWith('<b>')) tspan.style.fontWeight = 'bold';
        textEl.appendChild(tspan);
    });
    
    textEl.setAttribute('x', city.position.x);
    textEl.setAttribute('y', startY);
    
    // 定位背景框
    const textBBox = { width: lines.reduce((max, l) => Math.max(max, l.replace(/<[^>]+>/g, '').length), 0) * 1.8, height: lines.length * lineHeight };
    const bgWidth = Math.max(textBBox.width + 2, 16);
    const bgHeight = textBBox.height + 1.5;
    bgEl.setAttribute('x', city.position.x - bgWidth / 2);
    bgEl.setAttribute('y', startY - 1.5);
    bgEl.setAttribute('width', bgWidth);
    bgEl.setAttribute('height', bgHeight);
}

// 构建移动端城市卡片
function buildCityMobileCard(city, conquered, attackable, locked) {
    const costStr = Object.entries(city.cost)
        .map(([res, amt]) => `${getResourceName(res)}: ${formatNumber(amt)}`)
        .join(', ');
    
    let html = `<div style="font-weight:bold">${t(city.id + 'Name')} (${city.faction.toUpperCase()})</div>`;
    if (conquered) {
        html += `<div style="color:var(--accent-gold)">✅ ${t('conquered')} | ${city.bonusDesc}</div>`;
    } else if (locked) {
        html += `<div style="color:var(--ink-gray)">🔒 ${t('cityLocked')}`;
        if (city.unlockEvent) html += ` - ${t('cityRequires')}: ${t(city.unlockEvent + 'Name')}`;
        html += `</div>`;
        html += `<div style="font-size:0.85rem">${t('defenseRequired')}: ⚔️ ${formatNumber(city.defense)}</div>`;
    } else {
        html += `<div style="font-size:0.85rem">${t('defenseRequired')}: ⚔️ ${formatNumber(city.defense)} | ${t('attackCost')}: ${costStr}</div>`;
        html += `<div style="font-size:0.85rem;color:var(--accent-green)">${t('permanentBonus')}: ${city.bonusDesc}</div>`;
        html += `<button class="attack-btn">${t('attack')}</button>`;
    }
    return html;
}

// 清除缓存的卡片元素（重置游戏时调用）
function clearCachedCards() {
    for (const id of Object.keys(buildingCards)) {
        buildingCards[id].remove();
        delete buildingCards[id];
    }
    for (const id of Object.keys(heroCards)) {
        heroCards[id].remove();
        delete heroCards[id];
    }
    for (const id of Object.keys(eventCards)) {
        eventCards[id].remove();
        delete eventCards[id];
    }
    for (const id of Object.keys(cityCards)) {
        cityCards[id].remove();
        delete cityCards[id];
    }
    for (const id of Object.keys(cityListCards)) {
        cityListCards[id].remove();
        delete cityListCards[id];
    }
    // 清除SVG地图元素
    const svgCities = document.getElementById('map-cities');
    const svgRoads = document.getElementById('map-roads');
    if (svgCities) svgCities.innerHTML = '';
    if (svgRoads) svgRoads.innerHTML = '';
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
    
    // 清除之前的选中状态（重置游戏时）
    document.querySelectorAll('.faction-card').forEach(card => {
        card.classList.remove('selected', 'unselected');
        // 移除旧的事件监听器（通过克隆节点）
        const clone = card.cloneNode(true);
        card.parentNode.replaceChild(clone, card);
    });
    
    // 重新绑定势力选择事件
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
    
    // 交易按钮
    document.getElementById('trade1-btn').addEventListener('click', () => {
        const input = document.getElementById('trade1-amount');
        const times = Math.max(1, parseInt(input.value) || 1);
        tradeGrainForGold(times);
    });
    document.getElementById('trade2-btn').addEventListener('click', () => {
        const input = document.getElementById('trade2-amount');
        const times = Math.max(1, parseInt(input.value) || 1);
        tradeRecruitSoldiers(times);
    });
    document.getElementById('trade3-btn').addEventListener('click', () => {
        const input = document.getElementById('trade3-amount');
        const times = Math.max(1, parseInt(input.value) || 1);
        tradeSoldiersForPrestige(times);
    });
});
