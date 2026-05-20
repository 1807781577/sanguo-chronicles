// 工具函数 - 数字格式化、时间格式化等

// 格式化数字（支持大数）
function formatNumber(num) {
    if (num === undefined || num === null || isNaN(num)) return '0';
    
    const absNum = Math.abs(num);
    
    if (absNum < 1000) {
        return num < 100 ? num.toFixed(1) : Math.floor(num).toString();
    }
    
    const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
    const magnitude = Math.floor(Math.log10(absNum) / 3);
    
    if (magnitude >= suffixes.length) {
        // 使用科学计数法
        return num.toExponential(2);
    }
    
    const scaled = num / Math.pow(1000, magnitude);
    return scaled.toFixed(2) + suffixes[magnitude];
}

// 格式化比率
function formatRate(num) {
    if (num === undefined || num === null || isNaN(num)) return '+0';
    const formatted = formatNumber(num);
    return num >= 0 ? '+' + formatted : formatted;
}

// 格式化时间（秒转可读格式）
function formatTime(seconds) {
    if (seconds < 60) {
        return Math.floor(seconds) + '秒';
    }
    
    if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}分${secs}秒`;
    }
    
    if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}时${minutes}分`;
    }
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}天${hours}时`;
}

// 检查是否可以购买建筑
function canAffordBuilding(buildingId) {
    const cost = getBuildingCost(buildingId);
    
    for (const [resource, amount] of Object.entries(cost)) {
        if (getResource(resource) < amount) {
            return false;
        }
    }
    
    return true;
}

// 消耗资源
function spendResources(cost) {
    for (const [resource, amount] of Object.entries(cost)) {
        setResource(resource, getResource(resource) - amount);
    }
}

// 检查是否可以招募武将
function canRecruitHero(heroId) {
    const hero = HEROES.find(h => h.id === heroId);
    if (!hero) return false;
    if (hasHero(heroId)) return false;
    
    for (const [resource, amount] of Object.entries(hero.cost)) {
        if (getResource(resource) < amount) {
            return false;
        }
    }
    
    if (gameState.resources.prestige < hero.unlockPrestige) {
        return false;
    }
    
    return true;
}

// 消耗武将招募资源
function spendHeroResources(heroId) {
    const hero = HEROES.find(h => h.id === heroId);
    if (!hero) return;
    
    for (const [resource, amount] of Object.entries(hero.cost)) {
        setResource(resource, getResource(resource) - amount);
    }
}

// 深拷贝对象
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 合并对象（用于存档加载时补充新字段）
function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
