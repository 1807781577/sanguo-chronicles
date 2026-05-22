// 游戏状态管理

function getDefaultState() {
    return {
        version: SAVE_VERSION,
        timestamp: Date.now(),
        faction: null,
        resources: {
            grain: 50,
            soldiers: 0,
            gold: 100,
            territory: 0,
            prestige: 0
        },
        buildings: {
            farm: 0,
            barracks: 0,
            market: 0,
            training_ground: 0,
            hero_hall: 0,
            city: 0
        },
        heroes: {}, // { heroId: true }
        triggeredEvents: [], // [eventId]
        conqueredCities: {},
        unificationAchieved: false,
        stats: {
            totalGrainEarned: 0,
            totalSoldiersEarned: 0,
            totalGoldEarned: 0,
            maxPrestige: 0,
            startTime: Date.now(),
            totalPlayTime: 0
        }
    };
}

let gameState = getDefaultState();

// 获取资源
function getResource(resource) {
    return gameState.resources[resource] || 0;
}

// 设置资源
function setResource(resource, amount) {
    gameState.resources[resource] = Math.max(0, amount);
}

// 增加资源
function addResource(resource, amount) {
    gameState.resources[resource] += amount;
    if (resource === 'grain') gameState.stats.totalGrainEarned += amount;
    if (resource === 'soldiers') gameState.stats.totalSoldiersEarned += amount;
    if (resource === 'gold') gameState.stats.totalGoldEarned += amount;
    if (resource === 'prestige' && gameState.resources[resource] > gameState.stats.maxPrestige) {
        gameState.stats.maxPrestige = gameState.resources[resource];
    }
}

// 获取建筑数量
function getBuildingCount(buildingId) {
    return gameState.buildings[buildingId] || 0;
}

// 检查是否拥有武将
function hasHero(heroId) {
    return gameState.heroes[heroId] || false;
}

// 检查事件是否已触发
function isEventTriggered(eventId) {
    return gameState.triggeredEvents.includes(eventId);
}

// 检查事件是否可挑战（条件满足但尚未触发）
function canChallengeEvent(eventId) {
    if (isEventTriggered(eventId)) return false;
    const event = HISTORICAL_EVENTS.find(e => e.id === eventId);
    if (!event) return false;
    for (const [resource, amount] of Object.entries(event.trigger)) {
        if (getResource(resource) < amount) return false;
    }
    return true;
}

// 触发事件
function triggerEvent(eventId) {
    if (!isEventTriggered(eventId)) {
        gameState.triggeredEvents.push(eventId);
    }
}

// 计算建筑成本
function getBuildingCost(buildingId) {
    const config = BUILDINGS[buildingId];
    const count = getBuildingCount(buildingId);
    const cost = {};

    for (const [resource, baseAmount] of Object.entries(config.baseCost)) {
        cost[resource] = Math.floor(baseAmount * Math.pow(config.costMultiplier, count));
    }

    return cost;
}

// 计算总加成倍率
function getMultiplier(type) {
    let multiplier = 1;

    // 势力加成
    if (gameState.faction && FACTIONS[gameState.faction]) {
        const factionBonus = FACTIONS[gameState.faction].bonuses[type];
        if (factionBonus) multiplier += factionBonus;
    }

    // 武将加成
    for (const hero of HEROES) {
        if (hasHero(hero.id) && hero.bonus[type]) {
            multiplier += hero.bonus[type];
        }
    }

    // 历史事件加成
    for (const event of HISTORICAL_EVENTS) {
        if (isEventTriggered(event.id) && event.bonus && event.bonus[type]) {
            multiplier += event.bonus[type];
        }
    }

    // 征服城市加成
    for (const city of CITIES) {
        if (gameState.conqueredCities[city.id] && city.bonus && city.bonus[type]) {
            multiplier += city.bonus[type];
        }
    }

    // 天下一统加成
    if (gameState.unificationAchieved) {
        const unificationBonuses = { goldMultiplier: 0.25, grainMultiplier: 0.25, soldierMultiplier: 0.25, prestigeMultiplier: 0.25 };
        if (unificationBonuses[type]) multiplier += unificationBonuses[type];
    }

    return multiplier;
}

// 计算每秒产量
function getProductionPerSecond() {
    const production = {
        grain: 0,
        soldiers: 0,
        gold: 0,
        territory: 0,
        prestige: 0
    };

    // 农田生产粮草
    const farmCount = getBuildingCount('farm');
    if (farmCount > 0) {
        production.grain += farmCount * BUILDINGS.farm.baseProduction.grain * getMultiplier('grainMultiplier');
    }

    // 兵营训练士兵（消耗粮草）
    const barracksCount = getBuildingCount('barracks');
    if (barracksCount > 0) {
        const soldierMultiplier = getMultiplier('soldierMultiplier');
        production.soldiers += barracksCount * BUILDINGS.barracks.baseProduction.soldiers * soldierMultiplier;
    }

    // 校场额外士兵产量
    const trainingGroundCount = getBuildingCount('training_ground');
    if (trainingGroundCount > 0) {
        production.soldiers += trainingGroundCount * BUILDINGS.training_ground.baseProduction.soldiers * getMultiplier('soldierMultiplier');
    }

    // 市场产出金币（逐级递增）
    const marketCount = getBuildingCount('market');
    if (marketCount > 0) {
        const marketGrowth = BUILDINGS.market.productionGrowth ? BUILDINGS.market.productionGrowth.gold : 0;
        const goldMultiplier = getMultiplier('goldMultiplier');
        for (let i = 0; i < marketCount; i++) {
            production.gold += (BUILDINGS.market.baseProduction.gold + marketGrowth * i) * goldMultiplier;
        }
    }

    // 城池产出
    const cityCount = getBuildingCount('city');
    if (cityCount > 0) {
        production.gold += cityCount * BUILDINGS.city.baseProduction.gold * getMultiplier('goldMultiplier');
        production.grain += cityCount * BUILDINGS.city.baseProduction.grain * getMultiplier('grainMultiplier');
        production.territory += cityCount * 0.1;
    }

    // 聚贤庄产出声望
    const heroHallCount = getBuildingCount('hero_hall');
    if (heroHallCount > 0) {
        production.prestige += heroHallCount * BUILDINGS.hero_hall.baseProduction.prestige * getMultiplier('prestigeMultiplier');
    }

    return production;
}

// 重置游戏状态
function resetState() {
    const defaultState = getDefaultState();
    // 保留统计信息的某些部分
    defaultState.stats.startTime = Date.now();
    gameState = defaultState;
}

// 检查城市是否已征服
function isCityConquered(cityId) {
    return gameState.conqueredCities[cityId] || false;
}

// 检查城市是否可攻城
function canAttackCity(cityId) {
    const city = CITIES.find(c => c.id === cityId);
    if (!city) return false;
    if (isCityConquered(cityId)) return false;
    // 检查历史事件解锁
    if (city.unlockEvent && !isEventTriggered(city.unlockEvent)) return false;
    // 检查防御门槛
    if (getResource('soldiers') < city.defense) return false;
    // 检查资源消耗
    for (const [resource, amount] of Object.entries(city.cost)) {
        if (getResource(resource) < amount) return false;
    }
    return true;
}

// 检查天下一统
function checkUnification() {
    if (gameState.unificationAchieved) return false;
    const allConquered = CITIES.every(city => gameState.conqueredCities[city.id]);
    if (allConquered) {
        gameState.unificationAchieved = true;
        // 自动触发三国归晋事件
        if (!isEventTriggered('unification')) {
            triggerEvent('unification');
            const event = HISTORICAL_EVENTS.find(e => e.id === 'unification');
            if (event) {
                for (const [res, amt] of Object.entries(event.reward)) {
                    addResource(res, amt);
                }
            }
        }
        return true;
    }
    return false;
}
